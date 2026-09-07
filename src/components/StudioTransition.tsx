import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

interface StudioItem {
  id: string;
  num: string;
  title: string;
  cardLabel: string;
  heading: string;
  description: string;
  tags: string[];
  ctaText: string;
}

const studioItems: StudioItem[] = [
  {
    id: 'video',
    num: '01',
    title: 'Video Production & Editing',
    cardLabel: '/ 01. VIDEO PRODUCTION & EDITING',
    heading: 'Video Production & Editing',
    description: 'High-retention reels, paid social ads, and cinematic edits engineered to stop the scroll.',
    tags: ['Short-Form Reels', 'Viral Edits', 'Sound Design', 'Motion Graphics'],
    ctaText: 'Start a video project',
  },
  {
    id: 'branding',
    num: '02',
    title: 'Graphic Design & Branding',
    cardLabel: '/ 02. GRAPHIC DESIGN & BRANDING',
    heading: 'Graphic Design & Branding',
    description: 'Identities with a distinct point of view, cohesive visual systems that turn heads and build trust.',
    tags: ['Visual Identity', 'Typography', 'Social Creatives', 'Design Systems'],
    ctaText: 'Start a brand project',
  },
  {
    id: 'product',
    num: '03',
    title: 'Product Listing',
    cardLabel: '/ 03. PRODUCT LISTING',
    heading: 'Product Listing',
    description: 'High-converting e-commerce visual assets, showcase graphics, and hero product cards that boost CVR.',
    tags: ['E-Commerce', 'Conversion CVR', 'A+ Content', 'Product Imagery'],
    ctaText: 'Start a listing project',
  },
  {
    id: 'marketing',
    num: '04',
    title: 'Marketing & Growth',
    cardLabel: '/ 04. MARKETING & GROWTH',
    heading: 'Marketing & Growth',
    description: 'Performance creative, paid social, and campaigns engineered to move the needle. Measured, not guessed.',
    tags: ['Paid Social', 'Campaigns', 'Strategy', 'Analytics'],
    ctaText: 'Start a growth project',
  },
  {
    id: 'saas',
    num: '05',
    title: 'SaaS Design & Dev',
    cardLabel: '/ 05. SAAS DESIGN & DEV',
    heading: 'SaaS Design & Dev',
    description: 'From idea to interface, we design and ship digital products and interfaces people love to use.',
    tags: ['UX/UI', 'Prototypes', 'Frontend', 'Design Systems'],
    ctaText: 'Start a product project',
  },
];

export default function StudioTransition() {
  const [activeIndex, setActiveIndex] = useState(3); // Start on Marketing & Growth as in the reference
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto cycle through tabs unless hovered
  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % studioItems.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const activeItem = studioItems[activeIndex];

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#contact';
    }
  };

  return (
    <section 
      id="studio-transition"
      className="py-10 sm:py-12 lg:py-14 bg-white text-black border-b border-black/10 relative overflow-hidden transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Compact Heading + Supporting Statement in Same Top Content Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-black/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B2F] animate-pulse" />
              FRAME2BYTE STUDIO
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-display font-black tracking-tight uppercase leading-[0.95] text-black">
              ONE STUDIO. <br className="hidden sm:inline" />
              <span className="text-[#FF3B2F] sm:ml-2">FIVE WAYS TO STAND OUT.</span>
            </h2>
          </div>

          {/* Supporting Statement: Translucent / Light-Grey Compact Box on Right */}
          <div className="md:max-w-xs lg:max-w-sm w-full md:w-auto shrink-0">
            <div className="bg-neutral-100/90 border border-black/10 rounded-2xl p-3.5 sm:p-4 text-xs sm:text-[13px] font-bold text-black/80 leading-relaxed shadow-xs backdrop-blur-sm">
              Your visuals, story, and product kept in perfect sync, under one roof.
            </div>
          </div>
        </div>

        {/* Connected Visual Module: Left Compact Pills | Right Compact Cinematic Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-start">
          
          {/* Left Column: Compact Oval/Pill Navigation Items */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {studioItems.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  id={`studio-pill-${item.id}`}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`w-full text-left px-4 py-2.5 sm:py-3 rounded-full transition-all duration-200 flex items-center justify-between group cursor-pointer border ${
                    isActive
                      ? 'bg-[#0B0B0B] text-white border-black shadow-[3px_3px_0px_#FF3B2F] translate-x-1 sm:translate-x-1.5'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-black border-black/10 hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span 
                      className={`font-display font-black text-xs tracking-wider shrink-0 transition-colors ${
                        isActive ? 'text-[#FF3B2F]' : 'text-[#FF3B2F]/80 group-hover:text-[#FF3B2F]'
                      }`}
                    >
                      {item.num}
                    </span>
                    <span 
                      className={`text-xs sm:text-sm font-display font-black tracking-tight truncate uppercase transition-colors ${
                        isActive ? 'text-white' : 'text-black/85 group-hover:text-black'
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  <div className="shrink-0 ml-2">
                    {isActive ? (
                      <motion.div
                        layoutId="activePillArrow"
                        className="text-[#FF3B2F]"
                      >
                        <ArrowRight size={15} className="stroke-[3]" />
                      </motion.div>
                    ) : (
                      <ArrowRight size={14} className="text-black/20 group-hover:text-black/50 group-hover:translate-x-0.5 transition-all" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Compact Cinematic Black Visual Box */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B0B0B] text-white rounded-2xl sm:rounded-3xl border-2 border-black p-4 sm:p-5 lg:p-6 shadow-[5px_5px_0px_rgba(11,11,11,0.9)] relative overflow-hidden">
              
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-[#FF3B2F]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Top Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 relative z-10">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF5547]">
                  {activeItem.cardLabel}
                </span>
                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-white/40">
                  FRAME2BYTE STUDIO
                </span>
              </div>

              {/* Dynamic Compact Graphic Box */}
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    {/* Visual Graphic 01: Video Production */}
                    {activeItem.id === 'video' && (
                      <div className="bg-[#141414] border border-white/10 rounded-xl p-3 mb-3">
                        <div className="flex items-center justify-between mb-2 text-[10px] text-white/60">
                          <span className="font-mono text-[#FF5547]">RETENTION TIMELINE</span>
                          <span className="font-black text-white bg-[#FF3B2F] px-1.5 py-0.5 rounded text-[9px]">85%+ HOOK</span>
                        </div>
                        {/* Compact Waveform */}
                        <div className="h-9 bg-black/80 rounded-lg p-1 flex items-center gap-1 overflow-hidden border border-white/5">
                          {[30, 65, 95, 80, 50, 85, 100, 75, 45, 90, 80, 60, 95, 70, 85, 40, 60, 95, 85, 70, 100, 90, 50].map((h, idx) => (
                            <div
                              key={idx}
                              className={`flex-1 rounded-xs ${idx < 6 ? 'bg-[#FF3B2F]' : idx % 3 === 0 ? 'bg-white' : 'bg-[#FF5547]'}`}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Visual Graphic 02: Graphic Design & Branding */}
                    {activeItem.id === 'branding' && (
                      <div className="bg-[#141414] border border-white/10 rounded-xl p-3 mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-lg bg-[#FF3B2F] text-white flex items-center justify-center font-display font-black text-lg shadow-xs border border-white/20">
                            F2B
                          </div>
                          <div>
                            <div className="text-[11px] font-black uppercase text-white tracking-wider">VISUAL IDENTITY SYSTEM</div>
                            <div className="text-[9px] font-mono text-white/50">Aa • Bb • 012345 • RGB #FF3B2F</div>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-[#FF3B2F] border border-white/20" />
                          <span className="w-4 h-4 rounded-full bg-white border border-white/20" />
                          <span className="w-4 h-4 rounded-full bg-black border border-white/40" />
                        </div>
                      </div>
                    )}

                    {/* Visual Graphic 03: Product Listing */}
                    {activeItem.id === 'product' && (
                      <div className="bg-[#141414] border border-white/10 rounded-xl p-3 mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-black border border-[#FF3B2F]/40 flex items-center justify-center text-[#FF5547]">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-[#FF5547] text-[10px]">
                              <Star size={10} fill="#FF5547" />
                              <span className="font-black text-white">4.9</span>
                              <span className="text-white/40 text-[9px]">(Verified)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-display font-black text-base text-white">$49</span>
                              <span className="px-1.5 py-0.2 bg-[#FF3B2F]/20 text-[#FF5547] rounded text-[9px] font-black border border-[#FF3B2F]/40">
                                +38% CVR
                              </span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={handleCtaClick}
                          className="px-3.5 py-1.5 bg-white text-black rounded-lg font-display font-black text-[10px] uppercase tracking-wider hover:bg-[#FF3B2F] hover:text-white transition-colors"
                        >
                          Add to cart
                        </button>
                      </div>
                    )}

                    {/* Visual Graphic 04: Marketing & Growth */}
                    {activeItem.id === 'marketing' && (
                      <div className="bg-[#141414] border border-white/10 rounded-xl p-3 mb-3">
                        <div className="flex items-center justify-between mb-1 text-[10px]">
                          <span className="font-mono font-black uppercase text-white/60">ROAS PERFORMANCE</span>
                          <span className="font-black text-white bg-[#FF3B2F] px-1.5 py-0.2 rounded border border-[#FF3B2F]/50 text-[9px]">
                            +350% SCALED
                          </span>
                        </div>
                        {/* 5 Orange Rising Bars */}
                        <div className="h-12 flex items-end justify-between gap-3 px-2 pt-1">
                          {[
                            { h: '38%', label: 'W1' },
                            { h: '55%', label: 'W2' },
                            { h: '72%', label: 'W3' },
                            { h: '88%', label: 'W4' },
                            { h: '100%', label: 'W5' },
                          ].map((bar, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: bar.h }}
                                transition={{ duration: 0.35, delay: idx * 0.05 }}
                                className="w-full bg-[#FF3B2F] rounded-t-xs shadow-[0_0_8px_rgba(255,59,47,0.5)]"
                              />
                              <span className="text-[8px] font-mono text-white/40">{bar.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Visual Graphic 05: SaaS Design & Dev */}
                    {activeItem.id === 'saas' && (
                      <div className="bg-[#141414] border border-white/10 rounded-xl p-3 mb-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="w-2 h-2 rounded-full bg-[#FF3B2F]" />
                          <span className="w-2 h-2 rounded-full bg-white/60" />
                          <span className="w-2 h-2 rounded-full bg-white/20" />
                          <span className="text-[9px] font-mono text-white/40 ml-1.5">app.frame2byte.com</span>
                        </div>
                        {/* Wireframe UI Blocks */}
                        <div className="grid grid-cols-12 gap-2 h-11">
                          <div className="col-span-3 bg-black/60 rounded-md p-1 flex flex-col gap-1 border border-white/5">
                            <div className="w-3/4 h-1.5 bg-white/20 rounded" />
                            <div className="w-1/2 h-1.5 bg-white/10 rounded" />
                          </div>
                          <div className="col-span-5 bg-black/60 rounded-md p-1.5 flex flex-col justify-between border border-white/5">
                            <div className="w-1/2 h-2 bg-[#FF3B2F] rounded" />
                            <div className="w-full h-2.5 bg-white/10 rounded" />
                          </div>
                          <div className="col-span-4 bg-black/60 rounded-md p-1.5 flex flex-col justify-between border border-white/5">
                            <div className="w-2/3 h-1.5 bg-white/60 rounded" />
                            <div className="w-full h-2 bg-white/10 rounded" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Heading & Supporting Copy */}
                    <h4 className="text-base sm:text-lg font-display font-black text-white tracking-tight uppercase mb-1">
                      {activeItem.heading}
                    </h4>
                    <p className="text-xs sm:text-[13px] font-bold text-white/70 leading-snug mb-3">
                      {activeItem.description}
                    </p>

                    {/* Tags & Action in Single Clean Horizontal Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-white/10">
                      <div className="flex flex-wrap gap-1.5">
                        {activeItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-white/5 text-[#FF9E94] text-[9px] sm:text-[10px] font-mono font-bold rounded border border-[#FF3B2F]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={handleCtaClick}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF3B2F] text-white font-display font-black text-[10px] uppercase tracking-wider hover:bg-[#e03025] transition-all hover:scale-105 shadow-[0_0_12px_rgba(255,59,47,0.35)] shrink-0 ml-auto sm:ml-0"
                      >
                        <span>{activeItem.ctaText}</span>
                        <ArrowRight size={12} className="stroke-[3]" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
