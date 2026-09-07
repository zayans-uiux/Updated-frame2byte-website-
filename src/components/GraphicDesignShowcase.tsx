import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';

export interface GraphicDesignItem {
  id: number | string;
  title: string;
  category: string;
  src: string;
}

interface GraphicDesignShowcaseProps {
  items: GraphicDesignItem[];
  onOpenModal: (item: GraphicDesignItem) => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  categoryNumber?: string;
  categoryTitle?: string;
  categoryTag?: string;
  actionButton?: ReactNode;
  isWhiteBg?: boolean;
}

function SkeletonPinImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center z-10 pointer-events-none rounded-[inherit]">
          <ImageIcon size={26} className="text-white/20 animate-bounce" />
        </div>
      )}
      {/* Ambient background blur for edge bleed */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
      />
      {/* High-res artwork with object-contain to make all square and varied designs fully visible */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        className={`relative z-10 max-w-full max-h-full object-contain p-2 sm:p-3 transition-opacity duration-300 rounded-xl ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default function GraphicDesignShowcase({
  items,
  onOpenModal,
  title,
  subtitle,
  categoryNumber = '02',
  categoryTag = '[PINS]',
  actionButton,
}: GraphicDesignShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(600);

  // Measure stage width for responsive 3D offset
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
    setActiveIndex((prev) => Math.min(items.length - 1, prev + 1));
  }, [items.length]);

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

  // Draggable scrubber logic
  const activeTrackRef = useRef<HTMLDivElement | null>(null);

  const updateIndexFromPointer = useCallback(
    (clientX: number, targetTrack?: HTMLElement | null) => {
      const track = targetTrack || activeTrackRef.current || trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = offsetX / rect.width;
      const newIndex = Math.round(percentage * (items.length - 1));
      const clampedIndex = Math.max(0, Math.min(newIndex, items.length - 1));
      setActiveIndex(clampedIndex);
    },
    [items.length]
  );

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

  const progressPercent =
    items.length > 1 ? (activeIndex / (items.length - 1)) * 100 : 0;

  // Spacing offset for cards - calibrated to keep peek cards cleanly separated without bleeding into text
  const xOffset =
    stageWidth < 380 ? 95 : stageWidth < 500 ? 120 : stageWidth < 650 ? 145 : 170;

  // Reusable Scrubber Component (Horizontal, low-profile height, fitting both mobile & laptop)
  const renderScrubber = () => (
    <div className="w-full max-w-xl select-none bg-black/[0.035] py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl border border-black/10 shadow-xs">
      {/* Header / Counter */}
      <div className="flex items-center justify-between w-full mb-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-black/75">
        <span className="flex items-center gap-1.5 text-black font-extrabold">
          <span className="w-2 h-2 rounded-full bg-[#FF3B2F] animate-pulse shrink-0" />
          <span>
            HOLD OR <span className="text-[#FF3B2F]">SLIDE</span>
          </span>
        </span>
        <span className="text-[#FF3B2F] font-mono font-black bg-white border border-black/10 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs shadow-xs">
          PIN {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      {/* Draggable Capsule Scrubber Track & Buttons */}
      <div className="relative w-full flex items-center justify-between gap-2.5 sm:gap-3">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FF3B2F] transition-colors shadow-xs shrink-0 active:scale-95 cursor-pointer"
          aria-label="Previous Pin"
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
          disabled={activeIndex === items.length - 1}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FF3B2F] transition-colors shadow-xs shrink-0 active:scale-95 cursor-pointer"
          aria-label="Next Pin"
        >
          <ChevronRight size={15} className="stroke-[3]" />
        </button>
      </div>

      {/* Numbered Indicators */}
      <div className="flex items-center justify-between px-9 sm:px-11 pt-1.5 text-[10px] sm:text-[11px] font-mono">
        {items.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`cursor-pointer transition-all duration-150 px-1.5 py-0.5 rounded font-black ${
                isActive
                  ? 'text-[#FF3B2F] scale-110'
                  : 'text-black/40 hover:text-black hover:scale-105'
              }`}
              aria-label={`Jump to Pin ${idx + 1}`}
            >
              {String(idx + 1).padStart(2, '0')}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* 
        GRID ARCHITECTURE:
        Desktop/Laptop: Graphic Designs Carousel on LEFT (col-span-7), Text & Scrubber on RIGHT (col-span-5)
        Generous gap and column margins provide spacious breathing room between designs and typography.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
        
        {/* ================= MOBILE-ONLY TOP HEADER ================= */}
        <div className="block lg:hidden text-left mb-2">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B2F] shrink-0 shadow-[0_0_8px_#FF3B2F]" />
            <span className="text-xs sm:text-sm font-mono font-black text-[#FF3B2F] uppercase tracking-wider">
              {categoryNumber} / {categoryTag}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase leading-[0.96] text-black mb-3">
            {title || (
              <>
                GRAPHIC <br />
                <span className="text-[#FF3B2F]">DESIGN.</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base font-extrabold text-black/80 uppercase tracking-wide leading-relaxed">
            {subtitle || (
              <>
                HIGH-IMPACT BRAND ARTWORK, SOCIAL CREATIVES, AND CAMPAIGN POSTERS CRAFTED FOR VIRAL ATTRACTION.
              </>
            )}
          </p>
        </div>

        {/* ================= LEFT 3-ITEM GRAPHIC DESIGNS STAGE (COMPACT HEIGHT TO FIT SCREEN) ================= */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center select-none overflow-visible py-2 sm:py-3 w-full order-1 lg:order-1 lg:pr-2 xl:pr-4">
          <div
            ref={stageRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] xl:max-w-[660px] h-[310px] xs:h-[340px] sm:h-[380px] md:h-[420px] lg:h-[450px] xl:h-[470px] flex items-center justify-center overflow-visible mx-auto"
          >
            {items.map((item, i) => {
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
                targetScale = 0.81;
                targetOpacity = 0.38;
                targetZIndex = 10;
              } else if (isRight) {
                targetX = xOffset;
                targetScale = 0.81;
                targetOpacity = 0.38;
                targetZIndex = 10;
              } else if (offset < -1) {
                targetX = -xOffset * 1.5;
                targetScale = 0.65;
                targetOpacity = 0;
                targetZIndex = 0;
              } else {
                targetX = xOffset * 1.5;
                targetScale = 0.65;
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
                    duration: 0.38,
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
                  <PinCard
                    item={item}
                    isCenter={isCenter}
                    onOpenModal={() => onOpenModal(item)}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Only: Scrubber placed below the stage */}
          <div className="block lg:hidden w-full max-w-lg mt-4 select-none px-1">
            {renderScrubber()}
          </div>
        </div>

        {/* ================= RIGHT CONTROLS & TYPOGRAPHY (DESKTOP / LAPTOP) ================= */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-center text-left py-2 pl-2 lg:pl-6 xl:pl-8 order-2 lg:order-2">
          
          {/* Category Chip */}
          <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B2F] shrink-0 shadow-[0_0_8px_#FF3B2F] animate-pulse" />
            <span className="text-xs sm:text-sm font-mono font-black text-[#FF3B2F] uppercase tracking-wider">
              {categoryNumber} / {categoryTag}
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.1rem] font-display font-black tracking-tight uppercase leading-[0.96] text-black mb-3 sm:mb-4 max-w-md xl:max-w-xl">
            {title || (
              <>
                GRAPHIC <br />
                <span className="text-[#FF3B2F]">DESIGN.</span>
              </>
            )}
          </h2>

          {/* Subtitle / Body Text (Balanced Height & Contrast) */}
          <p className="text-sm sm:text-base md:text-[1.05rem] font-extrabold text-black/80 uppercase tracking-wide leading-relaxed mb-4 sm:mb-5 max-w-lg">
            {subtitle || (
              <>
                HIGH-IMPACT BRAND ARTWORK, SOCIAL CREATIVES, AND CAMPAIGN POSTERS CRAFTED FOR VIRAL ATTRACTION.
              </>
            )}
          </p>

          {/* Action Button (if any) */}
          {actionButton && (
            <div className="mb-4 sm:mb-5">
              {actionButton}
            </div>
          )}

          {/* Desktop Scrubber Slider */}
          {renderScrubber()}

        </div>

      </div>
    </div>
  );
}

interface PinCardProps {
  item: GraphicDesignItem;
  isCenter: boolean;
  onOpenModal: () => void;
}

function PinCard({ item, isCenter, onOpenModal }: PinCardProps) {
  return (
    <div
      onClick={(e) => {
        if (isCenter) {
          e.stopPropagation();
          onOpenModal();
        }
      }}
      className={`relative aspect-[4/5] w-[210px] xs:w-[235px] sm:w-[265px] md:w-[295px] lg:w-[320px] xl:w-[340px] overflow-hidden bg-neutral-950 transition-all duration-300 rounded-[1.6rem] sm:rounded-[2rem] lg:rounded-[2.2rem] border-[2px] border-black ${
        isCenter
          ? 'shadow-[6px_6px_0px_#FF3B2F]'
          : 'shadow-[3px_3px_0px_rgba(0,0,0,0.25)]'
      }`}
    >
      {/* High-res artwork with skeleton loader & blur bleed */}
      <SkeletonPinImage
        src={item.src}
        alt={item.title}
      />

      {/* Subtle Vignette Overlay for Title Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none rounded-[inherit]" />

      {/* Top Header Row (Category + Expand Icon) */}
      <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10 pointer-events-none">
        <div className="bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-[#FF5547] flex items-center gap-1.5 shadow-xs">
          <Sparkles size={11} className="text-[#FF5547]" />
          <span>{item.category}</span>
        </div>

        {/* Maximize Icon */}
        {isCenter && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 hover:bg-[#FF3B2F] text-white flex items-center justify-center transition-colors border border-white/20 shadow-xs pointer-events-auto cursor-pointer"
            title="Expand Artwork"
            aria-label="Expand"
          >
            <Maximize2 size={15} />
          </button>
        )}
      </div>

      {/* Bottom Footer Row: Title + "tap to expand" badge */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between z-10">
        <div className="text-left max-w-[62%]">
          <div className="text-white font-display font-black text-sm sm:text-base md:text-lg uppercase tracking-tight leading-tight drop-shadow truncate">
            {item.title}
          </div>
        </div>

        {/* "tap to expand" short line badge */}
        {isCenter && (
          <span className="px-3 py-1.5 bg-white/95 text-black hover:bg-[#FF3B2F] hover:text-white font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-full shadow-sm transition-colors flex items-center gap-1 cursor-pointer">
            <span>tap to expand</span>
            <span className="text-[#FF3B2F] hover:text-white font-black">↗</span>
          </span>
        )}
      </div>
    </div>
  );
}
