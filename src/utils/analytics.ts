/// <reference types="vite/client" />

/**
 * Lightweight, privacy-first analytics helper for Frame2Byte & Frame.AI.
 *
 * 1. Google Analytics 4 (via VITE_GA_MEASUREMENT_ID):
 *    - Injects GA4 script only when VITE_GA_MEASUREMENT_ID is defined.
 *    - Safely no-ops when missing, without throwing or logging errors.
 *    - Tracks page views across HashRouter route transitions.
 *    - Captures device type, session info, traffic sources, approximate location (via GA4 platform).
 *    - No PII (names, emails, phones, passwords) collected or sent.
 *
 * 2. Private Frame.AI Activity Logger (/api/analytics/frame-ai):
 *    - Minimal fire-and-forget logging to existing Express backend.
 *    - Non-blocking, completely failsafe.
 *    - Only logs voluntary handle, event status, and high-level score/accountType.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

let isGaInitialized = false;

/**
 * Initialize Google Analytics 4 if VITE_GA_MEASUREMENT_ID is provided.
 * If missing, all GA calls remain safe no-ops.
 */
export function initGoogleAnalytics(): void {
  try {
    if (typeof window === 'undefined' || isGaInitialized) return;

    const measurementId = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID;
    if (!measurementId || typeof measurementId !== 'string' || !measurementId.trim()) {
      return;
    }

    const cleanId = measurementId.trim();

    // Prevent duplicate injection
    if (document.querySelector(`script[src*="${cleanId}"]`)) {
      isGaInitialized = true;
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', cleanId, {
      send_page_view: false, // We manually send page_views on route change for HashRouter
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanId)}`;
    document.head.appendChild(script);

    isGaInitialized = true;
  } catch {
    // Fail silently without disrupting user experience
  }
}

/**
 * Track a pageview in Google Analytics
 */
export function trackPageView(pagePath: string): void {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  } catch {
    // Fail silently
  }
}

/**
 * Fire-and-forget helper to send minimal Frame.AI activity to backend logger
 */
export function sendFrameAiServerLog(payload: {
  event: string;
  instagram?: string;
  score?: number;
  accountType?: string;
}): void {
  try {
    if (typeof window === 'undefined') return;

    fetch('/api/analytics/frame-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Silently ignore any tracking failure
    });
  } catch {
    // Silently ignore any tracking failure
  }
}

/**
 * Event: frame_ai_opened
 * When a visitor opens/enters the Frame.AI section.
 */
export function trackFrameAiOpened(): void {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'frame_ai_opened');
    }
  } catch {
    // Fail silently
  }

  sendFrameAiServerLog({ event: 'frame_ai_opened' });
}

/**
 * Event: frame_ai_analysis_started
 * When a visitor submits an Instagram username/profile for analysis.
 */
export function trackFrameAiStarted(instagramHandle: string): void {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'frame_ai_analysis_started', {
        account_handle: instagramHandle,
      });
    }
  } catch {
    // Fail silently
  }

  sendFrameAiServerLog({
    event: 'analysis_started',
    instagram: instagramHandle,
  });
}

/**
 * Event: frame_ai_analysis_completed
 * Only when the existing Frame.AI analysis successfully finishes.
 */
export function trackFrameAiCompleted(
  instagramHandle: string,
  score?: number,
  accountType?: string
): void {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'frame_ai_analysis_completed', {
        account_handle: instagramHandle,
        frame_score: score,
        account_type: accountType,
      });
    }
  } catch {
    // Fail silently
  }

  sendFrameAiServerLog({
    event: 'analysis_completed',
    instagram: instagramHandle,
    score,
    accountType,
  });
}

/**
 * Event: frame_ai_analysis_failed
 * Only when the existing analysis genuinely fails.
 */
export function trackFrameAiFailed(instagramHandle: string): void {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'frame_ai_analysis_failed', {
        account_handle: instagramHandle,
      });
    }
  } catch {
    // Fail silently
  }

  sendFrameAiServerLog({
    event: 'analysis_failed',
    instagram: instagramHandle,
  });
}
