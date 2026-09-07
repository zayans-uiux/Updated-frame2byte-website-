import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Video as VideoIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export interface ReelItem {
  id: number | string;
  title: string;
  category: string;
  src: string;
  poster?: string;
}

interface ReelShowcaseProps {
  reels: ReelItem[];
  onOpenModal: (reel: ReelItem) => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  categoryNumber?: string;
  categoryTitle?: string;
  categoryTag?: string;
  actionButton?: ReactNode;
}

// Helper to derive poster thumbnail path from video filename
function getPosterForVideo(src: string): string {
  const filename = src.split('/').pop() || '';
  const baseName = filename.replace(/\.[^/.]+$/, '');
  return `/videos/posters/${baseName}.jpg`;
}

export default function ReelShowcase({ 
  reels, 
  onOpenModal,
  title,
  subtitle,
  categoryNumber = '01',
  categoryTitle = 'SHORT-FORM REEL EDITS',
  categoryTag = '[HIGH-RETENTION REELS]',
  actionButton
}: ReelShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(600);

  // Measure stage width to compute responsive spacing
  useEffect(() => {
    const updateWidth = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(reels.length - 1, prev + 1));
  }, [reels.length]);

  // Touch swipe support on stage
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -30) {
      handleNext();
    } else if (deltaX > 30) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Scrubber drag logic
  const activeTrackRef = useRef<HTMLDivElement | null>(null);

  const updateIndexFromPointer = useCallback((clientX: number, targetTrack?: HTMLElement | null) => {
    const track = targetTrack || activeTrackRef.current || trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = offsetX / rect.width;
    const newIndex = Math.round(percentage * (reels.length - 1));
    const clampedIndex = Math.max(0, Math.min(newIndex, reels.length - 1));
    setActiveIndex(clampedIndex);
  }, [reels.length]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    activeTrackRef.current = e.currentTarget;
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateIndexFromPointer(e.clientX, e.currentTarget);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateIndexFromPointer(e.clientX, e.currentTarget);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      } catch {
        // fallback
      }
    }
  };

  const progressPercent = reels.length > 1 ? (activeIndex / (reels.length - 1)) * 100 : 0;

  // Spacing offset to keep side reels tucked neatly with full curved borders visible and cleanly separated
  const xOffset = stageWidth < 420 ? 110 : stageWidth < 540 ? 135 : 160;

  // Reusable Scrubber Component (Horizontal, low-profile height, fitting both mobile & laptop)
  const renderScrubber = () => (
    <div className="w-full max-w-xl select-none bg-black/[0.035] py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl border border-black/10 shadow-xs">
      {/* Header / Counter */}
      <div className="flex items-center justify-between w-full mb-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-black/75">
        <span className="flex items-center gap-1.5 text-black font-extrabold">
          <span className="w-2 h-2 rounded-full bg-[#FF3B2F] animate-pulse shrink-0" />
          <span>SLIDE TO <span className="text-[#FF3B2F]">SWITCH</span></span>
        </span>
        <span className="text-[#FF3B2F] font-mono font-black bg-white border border-black/10 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs shadow-xs">
          REEL {String(activeIndex + 1).padStart(2, '0')} / {String(reels.length).padStart(2, '0')}
        </span>
      </div>

      {/* Draggable Capsule Scrubber Track & Buttons */}
      <div className="relative w-full flex items-center justify-between gap-2.5 sm:gap-3">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FF3B2F] transition-colors shadow-xs shrink-0 active:scale-95 cursor-pointer"
          aria-label="Previous Reel"
        >
          <ChevronLeft size={15} className="stroke-[3]" />
        </button>

        {/* Draggable Track */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative flex-1 h-2.5 sm:h-3 bg-white rounded-full border border-black/20 shadow-inner cursor-pointer touch-none select-none group"
        >
          {/* Active Track Fill */}
          <div
            className="absolute top-0 left-0 bottom-0 bg-[#FF3B2F] rounded-full pointer-events-none"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Circular Draggable Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -ml-3 sm:-ml-3.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black border-2 border-white shadow-md flex items-center justify-center transition-transform duration-100 ${
              isDragging ? 'scale-125 bg-[#FF3B2F]' : 'group-hover:scale-110'
            }`}
            style={{ left: `${progressPercent}%` }}
          >
            <div className="w-2 h-2 rounded-full bg-[#FF3B2F] group-hover:bg-white transition-colors" />
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          disabled={activeIndex === reels.length - 1}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FF3B2F] transition-colors shadow-xs shrink-0 active:scale-95 cursor-pointer"
          aria-label="Next Reel"
        >
          <ChevronRight size={15} className="stroke-[3]" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
        
        {/* ================= LEFT CONTROLS & TYPOGRAPHY ================= */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left py-2 pr-2 lg:pr-6 xl:pr-8">
          
          {/* Category Chip */}
          <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B2F] shrink-0 shadow-[0_0_8px_#FF3B2F] animate-pulse" />
            <span className="text-xs sm:text-sm font-mono font-black text-[#FF3B2F] uppercase tracking-wider">
              {categoryNumber} / {categoryTag}
            </span>
          </div>

          {/* Main Headline - Short Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.1rem] font-display font-black tracking-tight uppercase leading-[0.96] text-black mb-3 sm:mb-4 max-w-md xl:max-w-xl">
            {title || (
              <>
                REELS N <br />
                <span className="text-[#FF3B2F]">CLIPPING.</span>
              </>
            )}
          </h2>

          {/* Subtitle / Body Text */}
          <p className="text-sm sm:text-base md:text-[1.05rem] font-extrabold text-black/80 uppercase tracking-wide leading-relaxed mb-4 sm:mb-5 max-w-lg">
            {subtitle || (
              <>
                AI-POWERED BRANDING, <span className="text-[#FF3B2F]">HIGH-RETENTION</span> SHORT-FORM CONTENT, AND CREATIVE DIRECTION.
              </>
            )}
          </p>

          {/* Desktop Only: Action Button + Scrubber */}
          <div className="hidden lg:block">
            {actionButton && (
              <div className="mb-4 sm:mb-5">
                {actionButton}
              </div>
            )}
            {renderScrubber()}
          </div>

        </div>

        {/* ================= RIGHT 3-REEL SHOWCASE (PROPORTIONED TO FIT SCREEN) ================= */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center select-none overflow-visible py-2 sm:py-3 w-full lg:pl-2 xl:pl-4">
          <div
            ref={stageRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] xl:max-w-[660px] h-[350px] xs:h-[390px] sm:h-[440px] md:h-[480px] lg:h-[510px] xl:h-[530px] flex items-center justify-center overflow-visible mx-auto"
          >
            {reels.map((item, i) => {
              const offset = i - activeIndex;
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              let targetX = 0;
              let targetScale = 1;
              let targetOpacity = 1;
              let targetZIndex = 20;

              if (isCenter) {
                targetX = 0;
                targetScale = 1;
                targetOpacity = 1;
                targetZIndex = 20;
              } else if (isLeft) {
                targetX = -xOffset;
                targetScale = 0.82;
                targetOpacity = 0.45;
                targetZIndex = 10;
              } else if (isRight) {
                targetX = xOffset;
                targetScale = 0.82;
                targetOpacity = 0.45;
                targetZIndex = 10;
              } else if (offset < -1) {
                targetX = -xOffset * 1.6;
                targetScale = 0.7;
                targetOpacity = 0;
                targetZIndex = 0;
              } else {
                targetX = xOffset * 1.6;
                targetScale = 0.7;
                targetOpacity = 0;
                targetZIndex = 0;
              }

              return (
                <motion.div
                  key={item.id}
                  animate={{
                    x: targetX,
                    scale: targetScale,
                    opacity: targetOpacity,
                    zIndex: targetZIndex,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => {
                    if (isLeft) {
                      handlePrev();
                    } else if (isRight) {
                      handleNext();
                    }
                  }}
                  style={{
                    position: 'absolute',
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                  className="cursor-pointer"
                >
                  <ReelCard
                    item={item}
                    isCenter={isCenter}
                    isVisible={isVisible}
                    onOpenModal={() => onOpenModal(item)}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Only: Action Button and Slide to Switch Scrubber placed below the reels */}
          <div className="block lg:hidden w-full max-w-md mt-4 select-none px-1">
            {actionButton && (
              <div className="mb-3 flex justify-start">
                {actionButton}
              </div>
            )}
            {renderScrubber()}
          </div>
        </div>

      </div>
    </div>
  );
}

interface ReelCardProps {
  item: ReelItem;
  isCenter: boolean;
  isVisible: boolean;
  onOpenModal: () => void;
}

function ReelCard({ item, isCenter, isVisible, onOpenModal }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [posterLoaded, setPosterLoaded] = useState(true);
  const posterUrl = item.poster || getPosterForVideo(item.src);

  // Auto-play when reel comes to the center; pause when off-center
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Ensure DOM muted property is set to satisfy browser autoplay policy
    vid.muted = isMuted;
    vid.defaultMuted = isMuted;

    if (isCenter && isVisible) {
      vid.currentTime = 0;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            // Autoplay policy prevented immediate playback
            setIsPlaying(false);
          });
      }
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, [isCenter, isVisible, item.src]);

  // Handle Play/Pause toggle
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  // Handle Sound toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;

    const nextMuted = !isMuted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div
      className={`relative aspect-[9/16] w-[190px] sm:w-[220px] md:w-[245px] lg:w-[260px] xl:w-[270px] overflow-hidden bg-neutral-900 transition-all duration-300 rounded-[2rem] border-[2.5px] border-black ${
        isCenter
          ? 'shadow-[6px_6px_0px_#FF3B2F]'
          : 'shadow-[4px_4px_0px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* Background Poster Image (Guarantees no black box while video loads) */}
      <img
        src={posterUrl}
        alt={item.title}
        onError={() => setPosterLoaded(false)}
        className="absolute inset-0 w-full h-full object-cover rounded-[inherit] pointer-events-none"
      />

      {/* Primary Video Player */}
      <video
        ref={videoRef}
        src={item.src}
        poster={posterUrl}
        muted={isMuted}
        loop
        playsInline
        autoPlay={isCenter}
        preload={isCenter ? 'auto' : 'metadata'}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover rounded-[inherit]"
      />

      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 pointer-events-none rounded-[inherit]" />

      {/* Top Header Row (Category + Sound Toggle + Expand) */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#FF5547] flex items-center gap-1.5 shadow-xs">
          <VideoIcon size={10} className="text-[#FF5547]" />
          <span>{item.category}</span>
        </div>

        {/* Action icons for center reel */}
        {isCenter && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-[#FF3B2F] text-white flex items-center justify-center transition-colors border border-white/20 shadow-xs cursor-pointer"
              title={isMuted ? 'Unmute Reel' : 'Mute Reel'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal();
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-[#FF3B2F] text-white flex items-center justify-center transition-colors border border-white/20 shadow-xs cursor-pointer"
              title="Expand Reel"
              aria-label="Expand"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        )}
      </div>

      {/* Center Play / Pause Indicator (Click to toggle playback or open modal) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {(!isPlaying || !isCenter) && (
          <div
            onClick={togglePlay}
            className={`rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer ${
              isCenter
                ? 'w-12 h-12 sm:w-14 sm:h-14 bg-[#FF3B2F] text-white border-2 border-black hover:scale-110 shadow-[0_0_18px_rgba(255,59,47,0.85)]'
                : 'w-8 h-8 sm:w-10 sm:h-10 bg-black/70 text-white/80 border border-white/20 hover:scale-105'
            }`}
          >
            <Play size={isCenter ? 22 : 16} className="fill-current ml-0.5" />
          </div>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div 
        onClick={isCenter ? togglePlay : undefined}
        className="absolute bottom-3 left-3 right-3 text-left z-10 cursor-pointer"
      >
        <h4 className="text-white font-display font-black text-xs sm:text-sm leading-tight uppercase tracking-tight truncate">
          {item.title}
        </h4>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-[#FF3B2F]">
            {isCenter ? (isPlaying ? 'PLAYING • TAP TO PAUSE' : 'TAP TO PLAY') : 'TAP TO SELECT'}
          </p>
          {isCenter && (
            <span 
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal();
              }}
              className="text-[8px] sm:text-[9px] font-mono font-bold text-white/70 hover:text-white underline cursor-pointer"
            >
              EXPAND ↗
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
