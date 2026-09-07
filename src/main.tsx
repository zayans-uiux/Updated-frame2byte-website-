import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initGoogleAnalytics } from './utils/analytics';

// Initialize minimal, privacy-first Google Analytics if VITE_GA_MEASUREMENT_ID is configured
initGoogleAnalytics();

// Prevent noisy browser error banners from benign HMR websocket reconnection attempts in container environments
if (typeof window !== 'undefined') {
  const isWsError = (msg: string) =>
    msg.includes('WebSocket') ||
    msg.includes('websocket') ||
    msg.includes('failed to connect') ||
    msg.includes('ws://') ||
    msg.includes('wss://');

  const origError = console.error;
  console.error = (...args: any[]) => {
    const text = args.map((a) => String(a?.message || a || '')).join(' ');
    if (isWsError(text)) return;
    origError.apply(console, args);
  };

  const origWarn = console.warn;
  console.warn = (...args: any[]) => {
    const text = args.map((a) => String(a?.message || a || '')).join(' ');
    if (isWsError(text)) return;
    origWarn.apply(console, args);
  };

  window.addEventListener('error', (event) => {
    const msg = String(event.message || '');
    if (isWsError(msg)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reasonStr = String(event.reason?.message || event.reason || '');
    if (isWsError(reasonStr)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
