import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, TrendingUp, Sparkles } from 'lucide-react';

export default function MobileHero() {
  return (
    <div className="w-full h-[100dvh] min-h-[580px] max-h-[820px] bg-[#FF3B2F] text-white flex flex-col justify-between pt-20 pb-16 px-4 overflow-hidden relative border-b-2 border-black select-none">
      
      {/* Background Halftone Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

      {/* 1. HEADLINE & SUBHEAD (Top Stack - Compact & Impactful with proper spacing from header) */}
      <div className="text-center pt-3 relative z-10 flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl font-display font-black leading-[1.05] uppercase tracking-tight text-black"
        >
          WE BUILD <br />
          <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">BRANDS PEOPLE</span> <br />
          CAN'T IGNORE.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-[11px] sm:text-xs font-extrabold text-black/90 mt-2.5 max-w-[290px] leading-snug px-1"
        >
          AI marketing strategy, creative direction, and high-retention content systems that scale your business faster.
        </motion.p>
      </div>

      {/* 2. MAIN ILLUSTRATION (Occupies ~38% of height - Visual Hero Centerpiece) */}
      <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] flex items-center justify-center my-auto">
        
        {/* Floating Sticker 1: 2.6M+ Views (Top-Left) */}
        <motion.div
          animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 left-0 z-30 bg-black text-white px-2.5 py-1.5 rounded-xl border border-white/20 shadow-[3px_3px_0px_#000] flex items-center gap-1.5 backdrop-blur-md"
        >
          <div className="w-5 h-5 rounded-md bg-[#FF3B2F] text-white flex items-center justify-center flex-shrink-0">
            <Eye size={12} />
          </div>
          <div className="text-left">
            <div className="text-[7px] font-black uppercase tracking-widest text-white/60 leading-none">REELS REACH</div>
            <div className="text-[11px] font-display font-black text-[#FF5547] drop-shadow-[0_0_8px_rgba(255,59,47,0.8)] leading-none mt-0.5">2.6M+ VIEWS</div>
          </div>
        </motion.div>

        {/* Floating Sticker 2: 85%+ Watch Rate (Top-Right) */}
        <motion.div
          animate={{ y: [3, -3, 3], rotate: [2, -2, 2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute -top-1 right-0 z-30 bg-white text-black px-2.5 py-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 transform rotate-2"
        >
          <div className="w-5 h-5 rounded-md bg-black text-[#FF5547] flex items-center justify-center flex-shrink-0">
            <TrendingUp size={12} />
          </div>
          <div className="text-left">
            <div className="text-[7px] font-black uppercase tracking-widest text-black/60 leading-none">RETENTION</div>
            <div className="text-[11px] font-display font-black text-black leading-none mt-0.5">85%+ HOOK</div>
          </div>
        </motion.div>

        {/* Floating Sticker 3: Scroll Stopper Newspaper Cutout (Center Right) */}
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 -right-1 z-30 transform -translate-y-1/2 flex flex-col items-end pointer-events-none"
        >
          <div className="bg-black text-white px-2 py-0.5 font-display font-black text-[9px] tracking-widest uppercase border border-white/20 shadow-md transform -rotate-3">
            SCROLL STOPPER
          </div>
          <div className="bg-[#FF3B2F] text-white px-2 py-0.5 font-display font-black text-[9px] tracking-widest uppercase border border-black shadow-[0_0_12px_rgba(255,59,47,0.5)] transform rotate-2 mt-0.5">
            CREATIVE AI ⚡
          </div>
        </motion.div>

        {/* Central Megaphone Vector Art */}
        <div className="relative z-20 w-full h-full flex items-center justify-center p-1">
          <svg viewBox="0 0 500 500" className="w-full h-full max-w-[210px] filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mobile-halftone" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#000" />
              </pattern>
            </defs>

            {/* Megaphone & Arm Group */}
            <g transform="translate(10, 20)">
              {/* Star Doodles */}
              <path d="M 120 180 L 128 160 L 136 180 L 156 188 L 136 196 L 128 216 L 120 196 L 100 188 Z" fill="#000" />
              <path d="M 380 100 L 385 85 L 390 100 L 405 105 L 390 110 L 385 125 L 380 110 L 365 105 Z" fill="#000" />
              
              {/* Megaphone Cone */}
              <path d="M 230 250 L 400 130 C 420 120, 440 180, 430 250 C 420 320, 390 380, 370 370 L 220 280 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="12" strokeLinejoin="round"/>
              <path d="M 230 250 L 400 130 C 420 120, 440 180, 430 250 C 420 320, 390 380, 370 370 L 220 280 Z" fill="url(#mobile-halftone)" opacity="0.15"/>
              
              {/* Megaphone Opening */}
              <ellipse cx="400" cy="250" rx="30" ry="120" fill="#111111" stroke="#000000" strokeWidth="8"/>
              <ellipse cx="400" cy="250" rx="20" ry="105" fill="#FFFFFF" />

              {/* Base Body */}
              <rect x="170" y="225" width="60" height="60" rx="8" fill="#111111" stroke="#000000" strokeWidth="8" />
              <circle cx="160" cy="255" r="28" fill="#FFFFFF" stroke="#000000" strokeWidth="8" />
              
              {/* Soundwaves */}
              <path d="M 440 180 Q 470 250 440 320" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
              <path d="M 460 150 Q 500 250 460 350" stroke="#000000" strokeWidth="6" strokeLinecap="round" strokeDasharray="8 8" />

              {/* Hand holding Megaphone */}
              <path d="M 175 285 L 145 420 C 140 440, 190 450, 205 420 L 225 310 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="10" strokeLinejoin="round"/>
              <path d="M 175 285 L 145 420 C 140 440, 190 450, 205 420 L 225 310 Z" fill="url(#mobile-halftone)" opacity="0.3"/>
              
              {/* Sleeve */}
              <path d="M 120 400 L 220 480 L 150 510 L 80 430 Z" fill="#111111" stroke="#000" strokeWidth="6"/>
            </g>
          </svg>
        </div>

        {/* Floating Sticker 4: AI Growth System (Bottom Left) */}
        <motion.div
          animate={{ y: [2, -2, 2] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-1 left-0 z-30 bg-black text-white px-2.5 py-1 rounded-lg border border-white/20 shadow-[2px_2px_0px_#000] flex items-center gap-1"
        >
          <Sparkles size={12} className="text-[#FF5547] animate-pulse drop-shadow-[0_0_8px_rgba(255,59,47,0.8)]" />
          <span className="text-[9px] font-black uppercase tracking-wider">AI CONTENT SYSTEM</span>
        </motion.div>

        {/* Motion Arrow / Doodle pointing down */}
        <div className="absolute -bottom-3 right-4 z-20 text-black font-black text-xs opacity-70 pointer-events-none animate-bounce">
          ↓
        </div>
      </div>

      {/* 3. PRIMARY CTA BUTTON (ONLY ONE BUTTON ON MOBILE -> AI AUDIT) */}
      <div className="w-full flex justify-center pb-2 relative z-10">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="w-full max-w-[280px]"
        >
          <a
            href="#ai-audit"
            onClick={(e) => {
              const el = document.getElementById('ai-audit');
              if (el) {
                e.preventDefault();
                const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
              }
            }}
            className="w-full py-3.5 px-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] border-2 border-black active:scale-95 transition-transform hover:bg-neutral-900 text-center"
          >
            <Sparkles size={16} className="text-[#FF5547] animate-pulse" />
            <span>ANALYZE MY WEBSITE</span>
            <ArrowUpRight size={16} className="stroke-[3]" />
          </a>
        </motion.div>
      </div>

    </div>
  );
}
