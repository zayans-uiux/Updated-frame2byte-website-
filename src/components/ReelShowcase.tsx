import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Video as VideoIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export interface ReelItem {
  id: number | string;
  title: string;
  category: string;
  src: string;
}

interface ReelShowcaseProps {
  reels: ReelItem[];
  onOpenModal: (reel: ReelItem) => void;
}

export default function ReelShowcase({ reels, onOpenModal }: ReelShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Center active reel in scroll container
  const scrollToReel = useCallback((index: number, smooth = true) => {
    const gallery = galleryRef.current;
    const card = cardRefs.current[index];
    if (gallery && card) {
      const containerWidth = gallery.clientWidth;
      const cardWidth = card.clientWidth;
      const cardLeft = card.offsetLeft;
      const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);

      gallery.scrollTo({
        left: targetScroll,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  }, []);

  // Update active index on scroll
  const handleScroll = useCallback(() => {
    if (isDragging) return;
    const gallery = galleryRef.current;
    if (!gallery) return;

    const galleryCenter = gallery.scrollLeft + gallery.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(galleryCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  }, [activeIndex, isDragging]);

  // Handle click or drag on the slider scrubber track
  const updateIndexFromPointer = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = offsetX / rect.width;
    const newIndex = Math.round(percentage * (reels.length - 1));

    const clampedIndex = Math.max(0, Math.min(newIndex, reels.length - 1));
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
      scrollToReel(clampedIndex, true);
    }
  }, [reels.length, activeIndex, scrollToReel]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateIndexFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateIndexFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // Ignore if pointer capture fails
      }
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1);
    setActiveIndex(nextIdx);
    scrollToReel(nextIdx, true);
  };

  const handleNext = () => {
    const nextIdx = Math.min(reels.length - 1, activeIndex + 1);
    setActiveIndex(nextIdx);
    scrollToReel(nextIdx, true);
  };

  useEffect(() => {
    // Initial center alignment
    scrollToReel(activeIndex, false);
  }, []);

  const progressPercent = reels.length > 1 ? (activeIndex / (reels.length - 1)) * 100 : 0;

  return (
    <div className="w-full relative flex flex-col items-center">
      
      {/* Horizontal Reel Gallery Container */}
      <div
        ref={galleryRef}
        onScroll={handleScroll}
        className="w-full flex items-center gap-4 sm:gap-6 pt-4 pb-8 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory px-[25vw] sm:px-[35vw]"
        style={{ scrollBehavior: 'smooth' }}
      >
        {reels.map((item, i) => {
          const distance = Math.abs(i - activeIndex);
          const isFocused = i === activeIndex;

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => {
                if (i !== activeIndex) {
                  setActiveIndex(i);
                  scrollToReel(i, true);
                } else {
                  onOpenModal(item);
                }
              }}
              className="snap-center flex-shrink-0 transition-all duration-500 ease-out py-2 cursor-pointer"
            >
              <ReelCard
                item={item}
                index={i}
                isFocused={isFocused}
                distance={distance}
                onPlayClick={() => onOpenModal(item)}
              />
            </div>
          );
        })}
      </div>

      {/* ================= TIMELINE SCRUBBER SLIDER ================= */}
      <div className="w-full max-w-lg px-4 flex flex-col items-center mt-2">
        
        {/* Helper Label */}
        <div className="flex items-center justify-between w-full mb-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-black/60">
          <span className="flex items-center gap-1.5 text-[#FF3B2F]">
            <span className="w-2 h-2 rounded-full bg-[#FF3B2F] animate-pulse" />
            HOLD & SLIDE TO EXPLORE REELS
          </span>
          <span className="text-black font-extrabold">
            REEL {String(activeIndex + 1).padStart(2, '0')} / {String(reels.length).padStart(2, '0')}
          </span>
        </div>

        {/* Scrubber Capsule & Drag Controls */}
        <div className="relative w-full flex items-center justify-between gap-3">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FF3B2F] transition-colors shadow-sm flex-shrink-0 active:scale-95"
            aria-label="Previous Reel"
          >
            <ChevronLeft size={16} className="stroke-[3]" />
          </button>

          {/* Draggable Capsule Track */}
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative flex-1 h-3 sm:h-3.5 bg-black rounded-full border border-black/20 shadow-[0_4px_12px_rgba(0,0,0,0.2)] cursor-pointer touch-none select-none my-2 group"
          >
            {/* Active Track Fill */}
            <div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-black via-[#FF3B2F] to-[#FF3B2F] rounded-full transition-all duration-150 pointer-events-none"
              style={{ width: `${progressPercent}%` }}
            />

            {/* Circular Draggable Thumb */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -ml-3.5 sm:-ml-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF3B2F] border-2 border-white shadow-[0_0_12px_rgba(255,59,47,0.7)] flex items-center justify-center transition-transform duration-150 ${
                isDragging ? 'scale-125 shadow-[0_0_20px_rgba(255,59,47,0.9)] bg-black text-[#FF3B2F] border-[#FF3B2F]' : 'group-hover:scale-110'
              }`}
              style={{ left: `${progressPercent}%` }}
            >
              <div className="w-2 h-2 rounded-full bg-white animate-ping opacity-75" />
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            disabled={activeIndex === reels.length - 1}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FF3B2F] transition-colors shadow-sm flex-shrink-0 active:scale-95"
            aria-label="Next Reel"
          >
            <ChevronRight size={16} className="stroke-[3]" />
          </button>

        </div>

      </div>

    </div>
  );
}

interface ReelCardProps {
  item: ReelItem;
  index: number;
  isFocused: boolean;
  distance: number;
  onPlayClick: () => void;
}

function ReelCard({ item, isFocused, distance, onPlayClick }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isFocused) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [isFocused]);

  // Compute depth styles based on distance from center
  let scaleStyle = 'scale-100 opacity-100 blur-0 shadow-[8px_8px_0px_#FF3B2F] border-[#FF3B2F] z-20 brightness-100';
  if (distance === 1) {
    scaleStyle = 'scale-90 opacity-80 blur-[0.5px] shadow-[4px_4px_0px_#0B0B0B] border-black z-10 brightness-90';
  } else if (distance >= 2) {
    scaleStyle = 'scale-80 opacity-50 blur-[1px] shadow-none border-black/70 z-0 brightness-75';
  }

  return (
    <div
      className={`relative aspect-[9/16] w-[210px] sm:w-[250px] md:w-[270px] rounded-[1.8rem] overflow-hidden bg-black border-2 transition-all duration-500 ease-out ${scaleStyle}`}
    >
      {/* Video element with lazy loading & poster fallback */}
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
          <VideoIcon size={24} className="text-white/20 animate-bounce" />
        </div>
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

      {/* Play Icon Badge */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onPlayClick();
          }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-300 pointer-events-auto cursor-pointer ${
            isFocused
              ? 'bg-[#FF3B2F] text-white border-black hover:scale-110 shadow-[0_0_20px_rgba(255,59,47,0.6)]'
              : 'bg-black/80 text-white/80 border-white/20 scale-90'
          }`}
        >
          <Play size={22} className="fill-current ml-1" />
        </div>
      </div>

      {/* Top Label */}
      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[9px] font-black uppercase tracking-widest text-[#FF5547] flex items-center gap-1 shadow-[0_0_8px_rgba(255,59,47,0.4)]">
        <VideoIcon size={12} className="text-[#FF5547]" />
        <span>{item.category}</span>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-4 text-left z-10 pointer-events-none">
        <h4 className="text-white font-display font-black text-sm sm:text-base leading-tight uppercase tracking-tight">
          {item.title}
        </h4>
        <p className="text-[9px] font-extrabold uppercase tracking-widest text-[#FF3B2F] mt-0.5">
          {isFocused ? 'TAP TO EXPAND ↗' : 'TAP TO SELECT'}
        </p>
      </div>
    </div>
  );
}
