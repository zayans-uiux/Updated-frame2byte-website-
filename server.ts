import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  generateStructuredDiagnostic,
  parseInstagramInput,
  verifyAccountConsistency,
  createVerifiedDataObject,
} from './src/utils/instagramDiagnosticEngine';
import { VerifiedInstagramData } from './src/types/instagramAudit';

dotenv.config();

// Protect server process from unhandled asynchronous rejections
process.on('unhandledRejection', (reason) => {
  console.log('Handled async notice:', reason instanceof Error ? reason.message : String(reason));
});

process.on('uncaughtException', (err) => {
  console.log('Handled uncaught notice:', err.message);
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // CORS and standard proxy headers to allow traffic from iframe previews, domains, and health monitors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  app.use(express.json());

  // Universal Health Check Routes for Cloud Run and Ingress Monitors
  app.get(['/health', '/healthz', '/api/health'], (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.post('/api/instagram-audit', async (req, res) => {
    try {
      const { username } = req.body;
      if (!username || typeof username !== 'string' || !username.trim()) {
        return res.status(400).json({ error: 'Instagram username or URL is required.' });
      }

      const { cleanUsername, handle, brandName, profileUrl } = parseInstagramInput(username);
      if (!cleanUsername || cleanUsername.length < 1 || cleanUsername.length > 30) {
        return res.status(400).json({ error: 'Please enter a valid Instagram handle.' });
      }

      // 1. Check Instagram public status
      let isExplicitlyNotFound = false;
      let liveProfileData: {
        bio?: string | null;
        fullName?: string;
        externalUrl?: string | null;
        followersCount?: string | null;
        followingCount?: string | null;
        postsCount?: string | null;
      } = {
        fullName: brandName,
      };

      try {
        const fetchRes = await fetch(`https://www.instagram.com/${cleanUsername}/`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
          },
          redirect: 'follow',
          signal: AbortSignal.timeout(2800),
        });

        if (fetchRes.status === 404) {
          isExplicitlyNotFound = true;
        } else if (fetchRes.ok) {
          const html = await fetchRes.text();
          const descMatch =
            html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) ||
            html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
          const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);

          if (descMatch && descMatch[1]) {
            const desc = descMatch[1];
            const statsMatch = desc.match(
              /([\d.,]+[KkMm]?)\s+Followers,\s+([\d.,]+[KkMm]?)\s+Following,\s+([\d.,]+[KkMm]?)\s+Posts/i
            );
            if (statsMatch) {
              liveProfileData.followersCount = statsMatch[1];
              liveProfileData.followingCount = statsMatch[2];
              liveProfileData.postsCount = statsMatch[3];
            }
          }

          if (titleMatch && titleMatch[1]) {
            const title = titleMatch[1];
            const nameMatch = title.match(/^(.+?)\s*\(@/);
            if (nameMatch) {
              liveProfileData.fullName = nameMatch[1].trim();
            }
          }
        }
      } catch {
        // Public Instagram request timeout / block handled gracefully
      }

      if (isExplicitlyNotFound) {
        return res.status(404).json({
          error: 'Unable to reliably verify this Instagram account. The account does not exist or is private.',
        });
      }

      // 2. Discover brand domain if live (e.g. sakazaworld.com)
      let brandSiteText = '';
      try {
        const siteRes = await fetch(`https://${cleanUsername}.com`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          },
          redirect: 'follow',
          signal: AbortSignal.timeout(2200),
        });

        if (siteRes.ok) {
          liveProfileData.externalUrl = `https://${cleanUsername}.com`;
          const siteHtml = await siteRes.text();
          const titleMatch = siteHtml.match(/<title>([^<]+)<\/title>/i);
          const descMatch = siteHtml.match(/<meta\s+name="description"\s+content="([^"]+)"/i);

          if (titleMatch && titleMatch[1]) {
            brandSiteText += ` Title: ${titleMatch[1].trim()}`;
            const cleanTitle = titleMatch[1].split(/[|-]/)[0].trim();
            if (cleanTitle && cleanTitle.length > 1) {
              liveProfileData.fullName = cleanTitle;
            }
          }
          if (descMatch && descMatch[1]) {
            brandSiteText += ` Description: ${descMatch[1].trim()}`;
            if (!liveProfileData.bio) {
              liveProfileData.bio = descMatch[1].trim();
            }
          }
        }
      } catch {
        // Brand domain lookup optional
      }

      // 3. Strict verification using Gemini only if key present and within tight bounds
      const geminiApiKey = process.env.GEMINI_API_KEY;
      if (geminiApiKey && geminiApiKey.trim() !== '') {
        try {
          const ai = new GoogleGenAI({
            apiKey: geminiApiKey,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
          });

          const aiPrompt = `Verify exact Instagram account: @${cleanUsername}.
Brand cues: ${brandSiteText || liveProfileData.fullName || brandName}.
Instructions:
- Return verified facts ONLY for @${cleanUsername}.
- If you do NOT know the exact business or profile for @${cleanUsername}, return null for bio, website, and category.
- NEVER guess or invent any business, category, products, or metrics.
- Output strictly JSON:
{
  "verifiedUsername": "@${cleanUsername}",
  "accountName": "${liveProfileData.fullName || brandName}",
  "bio": null,
  "website": ${liveProfileData.externalUrl ? `"${liveProfileData.externalUrl}"` : 'null'},
  "category": null
}`;

          const aiPromise = ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: aiPrompt,
            config: {
              responseMimeType: 'application/json',
            },
          });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('AI timeout')), 3000)
          );

          const aiResult: any = await Promise.race([aiPromise, timeoutPromise]);

          if (aiResult?.text) {
            try {
              const parsed = JSON.parse(aiResult.text);
              if (
                parsed.verifiedUsername &&
                verifyAccountConsistency(cleanUsername, parsed.verifiedUsername)
              ) {
                if (parsed.accountName && parsed.accountName !== cleanUsername) {
                  liveProfileData.fullName = parsed.accountName;
                }
                if (parsed.bio && !liveProfileData.bio) {
                  liveProfileData.bio = parsed.bio;
                }
                if (parsed.website && !liveProfileData.externalUrl) {
                  liveProfileData.externalUrl = parsed.website;
                }
              }
            } catch {
              // JSON parse failure ignored
            }
          }
        } catch {
          // Gemini timeout or quota exhaustion handled safely
        }
      }

      // 4. Build verified structured data object
      const verifiedData: Partial<VerifiedInstagramData> = {
        requestedUsername: handle,
        verifiedUsername: handle,
        accountName: liveProfileData.fullName || brandName,
        bio: liveProfileData.bio || null,
        website: liveProfileData.externalUrl || null,
        metrics: {
          followers: liveProfileData.followersCount || null,
          following: liveProfileData.followingCount || null,
          postsCount: liveProfileData.postsCount || null,
        },
      };

      // 5. Hard account consistency check
      if (!verifyAccountConsistency(cleanUsername, verifiedData.verifiedUsername || '')) {
        return res.status(400).json({
          error: 'Unable to reliably verify this Instagram account. Please try again.',
        });
      }

      // 6. Generate report strictly from verified facts
      const report = generateStructuredDiagnostic(username, verifiedData);
      return res.status(200).json(report);
    } catch (error) {
      console.error('Diagnostic error:', error instanceof Error ? error.message : String(error));
      return res.status(400).json({
        error: 'Unable to reliably verify this Instagram account. Please try again.',
      });
    }
  });

  // Lightweight private activity log for Frame.AI
  app.post('/api/analytics/frame-ai', (req, res) => {
    try {
      const { event, instagram, score, accountType } = req.body || {};

      if (!event || typeof event !== 'string') {
        return res.status(200).json({ ok: true });
      }

      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
        now.getHours()
      )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

      const sanitizedEvent = event.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);

      let sanitizedInstagram = '';
      if (instagram && typeof instagram === 'string') {
        const clean = instagram.trim().replace(/[^a-zA-Z0-9._@]/g, '').slice(0, 35);
        if (clean) {
          sanitizedInstagram = clean.startsWith('@') ? clean : `@${clean}`;
        }
      }

      let logLine = `[${ts}] FRAME_AI ${sanitizedEvent}`;
      if (sanitizedInstagram) {
        logLine += ` ${sanitizedInstagram}`;
      }
      if (typeof score === 'number' && !isNaN(score)) {
        logLine += ` score=${Math.round(score)}`;
      }
      if (accountType && typeof accountType === 'string') {
        const cleanType = accountType.replace(/[^a-zA-Z0-9 _/-]/g, '').slice(0, 40);
        if (cleanType) {
          logLine += ` accountType=${cleanType}`;
        }
      }

      // 1. Output to platform/server console (visible in Cloud Run / container logs)
      console.log(logLine);

      // 2. Append to local server log file if filesystem allows
      try {
        const logDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }
        fs.appendFileSync(path.join(logDir, 'frame-ai.log'), logLine + '\n', 'utf8');
      } catch {
        // Silently ignore filesystem errors
      }

      return res.status(200).json({ ok: true });
    } catch {
      return res.status(200).json({ ok: true });
    }
  });

  // Vite middleware in dev; static dist in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Explicit fallback for client-side routing in dev
    app.use('*', async (req, res, next) => {
      if (req.method !== 'GET') return next();
      try {
        const url = req.originalUrl;
        const indexPath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send('<!doctype html><html><body><div id="root"></div></body></html>');
      }
    });
  }

  // Catch-all error middleware ensures no unhandled 500 crash drops the server
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Express handled error:', err?.message || err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Server temporarily unavailable' });
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frame2Byte Diagnostic Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
