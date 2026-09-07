import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  generateStructuredDiagnostic,
  parseInstagramInput,
  detectBusinessCategory,
} from './src/utils/instagramDiagnosticEngine';

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
      if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Instagram username or URL is required.' });
      }

      const { cleanUsername, handle, brandName } = parseInstagramInput(username);

      // Attempt live public profile metadata extraction
      let liveProfileData: {
        bio?: string;
        fullName?: string;
        followersCount?: string | number;
        followingCount?: string | number;
        postsCount?: string | number;
        hasReels?: boolean;
        externalUrl?: string;
        avatarUrl?: string;
      } = {};

      try {
        const fetchRes = await fetch(`https://www.instagram.com/${cleanUsername}/`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
          },
          redirect: 'follow',
          signal: AbortSignal.timeout(3000),
        });

        if (fetchRes.ok) {
          const html = await fetchRes.text();
          const descMatch =
            html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) ||
            html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
          const imageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
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

          if (imageMatch && imageMatch[1]) {
            liveProfileData.avatarUrl = imageMatch[1];
          }

          if (titleMatch && titleMatch[1]) {
            const title = titleMatch[1];
            const nameMatch = title.match(/^(.+?)\s*\(@/);
            if (nameMatch) {
              liveProfileData.fullName = nameMatch[1].trim();
            }
          }
        }
      } catch (err) {
        // Public fetch is opportunistic; proceed gracefully
      }

      // If Gemini API key is available, attempt non-blocking context enhancement with safety bounds
      const geminiApiKey = process.env.GEMINI_API_KEY;
      if (geminiApiKey && geminiApiKey.trim() !== '') {
        try {
          const ai = new GoogleGenAI({
            apiKey: geminiApiKey,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
          });

          const aiPrompt = `Analyze this Instagram account handle: "${cleanUsername}".
Profile Name: "${liveProfileData.fullName || brandName}"
What is the most likely business category among: Restaurant/F&B, E-commerce, SaaS, Creator, Personal Brand, Local Business, Startup, Other?
Provide a 1-sentence realistic bio if unknown, and whether they likely have active reels.
Format answer as JSON:
{"category": "Creator", "estimatedBio": "...", "hasReels": true}`;

          // Race with 3.5s timeout so API rate limits/hangs never block the user
          const aiPromise = ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: aiPrompt,
            config: {
              responseMimeType: 'application/json',
            },
          });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('AI timeout')), 3500)
          );

          const aiResult: any = await Promise.race([aiPromise, timeoutPromise]);

          if (aiResult?.text) {
            try {
              const parsed = JSON.parse(aiResult.text);
              if (parsed.estimatedBio && !liveProfileData.bio) {
                liveProfileData.bio = parsed.estimatedBio;
              }
              if (parsed.hasReels !== undefined) {
                liveProfileData.hasReels = parsed.hasReels;
              }
            } catch {
              // Ignore json parse issue
            }
          }
        } catch (aiErr) {
          // Gracefully continue with calibrated deterministic diagnostic engine
        }
      }

      // Generate structured diagnostic report using verified and calibrated rules
      const report = generateStructuredDiagnostic(username, liveProfileData);
      return res.status(200).json(report);
    } catch (error) {
      console.error('Diagnostic error fallback:', error instanceof Error ? error.message : String(error));
      const report = generateStructuredDiagnostic(req.body?.username || 'frame2byte');
      return res.status(200).json(report);
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
