import { useEffect } from 'react';

const FIRST_VIDEO = '/videos/video12.mp4'; // Lightest video ~4.8MB

export default function VideoPreloader() {
  useEffect(() => {
    // Only warm up metadata for the primary featured reel, and only on desktop fast connections
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      const vid = document.createElement('video');
      vid.src = FIRST_VIDEO;
      vid.preload = 'metadata';
      vid.muted = true;
      vid.playsInline = true;
    }
  }, []);

  return null;
}
