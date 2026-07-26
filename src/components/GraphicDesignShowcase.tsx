import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Maximize2, Sparkles, Image as ImageIcon } from 'lucide-react';

export interface GraphicDesignItem {
  id: number;
  title: string;
  category: string;
  src: string;
}

interface GraphicDesignShowcaseProps {
  items: GraphicDesignItem[];
  onOpenModal: (item: GraphicDesignItem) => void;
  isWhiteBg?: boolean;
}

function SkeletonImage({
  src,
  alt,
  className = '',
  imgClassName = '',
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-neutral-900 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900/90 animate-pulse flex items-center justify-center z-10 pointer-events-none">
          <ImageIcon size={28} className="text-white/20 animate-bounce" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}

export default function GraphicDesignShowcase({
  items,
  onOpenModal,
  isWhiteBg = true,
}: GraphicDesignShowcaseProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const currentItem = items[featuredIndex] || items[0];

  const handleNext = () => {
    setFeaturedIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="w-full relative">
      {/* ================= DESKTOP EDITORIAL SPLIT SHOWCASE (md+) ================= */}
      <div className="hidden md:grid grid-cols-12 gap-8 items-start">
        
        {/* Left Column (62% Width - Hero Featured Graphic) */}
        <div className="col-span-7 lg:col-span-8 flex flex-col gap-4 sticky top-28">
          <div className="relative aspect-[4/3] w-full rounded-[2.2rem] overflow-hidden bg-black border-2 border-black shadow-[10px_10px_0px_#0B0B0B] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.97, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full h-full relative cursor-pointer"
                onClick={() => onOpenModal(currentItem)}
              >
                <SkeletonImage
                  src={currentItem.src}
                  alt={currentItem.title}
                  imgClassName="group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Gradient for Caption Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 bg-black/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-[#FF5547] flex items-center gap-2 shadow-[0_0_12px_rgba(255,59,47,0.4)]">
                  <Sparkles size={14} className="text-[#FF5547] animate-pulse" />
                  <span>FEATURED SHOWCASE</span>
                </div>

                {/* Fullscreen Expand Icon */}
                <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-black/80 text-white flex items-center justify-center border border-white/20 shadow-lg group-hover:bg-[#FF3B2F] group-hover:border-[#FF3B2F] transition-all">
                  <Maximize2 size={18} />
                </div>

                {/* Bottom Caption Bar */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#FF3B2F] bg-black/80 px-2.5 py-1 rounded border border-white/10">
                      {currentItem.category}
                    </span>
                    <h3 className="text-white font-display font-black text-2xl lg:text-3xl uppercase tracking-tight mt-2 text-shadow">
                      {currentItem.title}
                    </h3>
                  </div>

                  <span className="bg-white text-black px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-md">
                    TAP TO EXPAND ↗
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column (38% Width - Grid Gallery Selector) */}
        <div className="col-span-5 lg:col-span-4 flex flex-col justify-between h-full space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black/10">
              <span className="text-xs font-black uppercase tracking-widest text-black/70">
                GALLERY SELECTOR ({items.length} DESIGNS)
              </span>
              <span className="text-[11px] font-bold text-[#FF3B2F] uppercase tracking-wider">
                CLICK TO PREVIEW
              </span>
            </div>

            {/* Grid of Small Preview Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              {items.map((item, idx) => {
                const isSelected = idx === featuredIndex;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFeaturedIndex(idx)}
                    className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-[#FF3B2F] shadow-[4px_4px_0px_#FF3B2F] ring-2 ring-[#FF3B2F]/30'
                        : 'border-black/80 hover:border-black shadow-[3px_3px_0px_#0B0B0B]'
                    } bg-black`}
                  >
                    <SkeletonImage
                      src={item.src}
                      alt={item.title}
                      imgClassName={`transition-all duration-500 ${
                        isSelected ? 'scale-105' : 'group-hover:opacity-100'
                      }`}
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                    {/* Badge / Active Marker */}
                    {isSelected && (
                      <div className="absolute top-2 left-2 bg-[#FF3B2F] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest shadow-sm z-10">
                        ACTIVE
                      </div>
                    )}

                    {/* Label at bottom */}
                    <div className="absolute bottom-2 left-2 right-2 text-left pointer-events-none z-10">
                      <div className="text-[9px] font-black uppercase text-[#FF5547] truncate">
                        {item.category}
                      </div>
                      <div className="text-white font-display font-black text-xs uppercase truncate leading-tight">
                        {item.title}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Cycle Navigation Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-black text-white hover:bg-[#FF3B2F] transition-colors rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-[4px_4px_0px_#000] border-2 border-black active:scale-95"
            >
              <span>NEXT DESIGN</span>
              <ChevronRight size={18} className="stroke-[3]" />
            </button>
          </div>
        </div>

      </div>

      {/* ================= MOBILE EDITORIAL SHOWCASE (<md) ================= */}
      <div className="md:hidden flex flex-col space-y-6">
        
        {/* Main Prominent Hero Graphic Card */}
        <div className="relative w-full aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-black border-2 border-black shadow-[6px_6px_0px_#0B0B0B]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={() => onOpenModal(currentItem)}
              className="w-full h-full relative cursor-pointer"
            >
              <SkeletonImage
                src={currentItem.src}
                alt={currentItem.title}
              />

              {/* Gradient for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />

              {/* Floating Next Button on Hero */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/90 text-[#FF3B2F] border border-white/20 flex items-center justify-center shadow-lg active:scale-90 z-20"
                aria-label="Next graphic"
              >
                <ChevronRight size={20} className="stroke-[3]" />
              </button>

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[9px] font-black uppercase tracking-widest text-[#FF5547]">
                {currentItem.category}
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                <h3 className="text-white font-display font-black text-lg uppercase tracking-tight leading-tight">
                  {currentItem.title}
                </h3>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF3B2F] mt-0.5">
                  TAP TO VIEW FULL RESOLUTION ↗
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Gallery Selector Grid (2 per row) */}
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-black/60 mb-2.5 flex items-center justify-between">
            <span>SELECT ARTWORK TO INSPECT</span>
            <span className="text-[#FF3B2F]">{featuredIndex + 1} / {items.length}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {items.map((item, idx) => {
              const isSelected = idx === featuredIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setFeaturedIndex(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 text-left transition-all ${
                    isSelected
                      ? 'border-[#FF3B2F] shadow-[3px_3px_0px_#FF3B2F] ring-2 ring-[#FF3B2F]/40'
                      : 'border-black bg-black shadow-[2px_2px_0px_#0B0B0B]'
                  }`}
                >
                  <SkeletonImage
                    src={item.src}
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {isSelected && (
                    <div className="absolute top-1.5 left-1.5 bg-[#FF3B2F] text-white px-1.5 py-0.5 rounded text-[7px] font-black uppercase z-10">
                      SELECTED
                    </div>
                  )}

                  <div className="absolute bottom-1.5 left-2 right-2 z-10">
                    <div className="text-[8px] font-black uppercase text-[#FF5547] truncate">
                      {item.category}
                    </div>
                    <div className="text-white font-display font-black text-[11px] uppercase truncate leading-none mt-0.5">
                      {item.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
