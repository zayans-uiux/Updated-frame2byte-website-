import { motion } from 'framer-motion';
import { Play, TrendingUp, Sparkles, Video, Eye, Award } from 'lucide-react';

export default function HeroVisual({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div className={`w-full relative flex flex-col items-center justify-center ${isMobile ? 'h-[200px] sm:h-[260px]' : 'min-h-[360px] sm:min-h-[460px] lg:min-h-[500px]'}`}>
      {/* Background Subtle Halftone Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:18px_18px] opacity-15 pointer-events-none" />

      {/* Main Container */}
      <div className={`relative w-full ${isMobile ? 'max-w-[300px]' : 'max-w-[480px] sm:max-w-[520px]'} aspect-square flex items-center justify-center`}>
        
        {/* Floating Card 1: 2.6M+ Viral Views (Top Left) */}
        <motion.div
          animate={isMobile ? { y: [-2, 2, -2] } : { y: [-6, 6, -6], rotate: [-2, 2, -2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute z-30 bg-black text-white rounded-xl border border-white/20 shadow-[4px_4px_0px_#000] flex items-center backdrop-blur-md ${
            isMobile 
              ? '-top-2 left-0 p-1.5 gap-2 text-[9px]' 
              : 'top-0 sm:top-4 left-0 sm:-left-4 p-3 sm:p-4 gap-3 text-xs sm:text-sm border-2'
          }`}
        >
          <div className={`${isMobile ? 'w-6 h-6 rounded-md' : 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl'} bg-[#FF3B2F] text-white flex items-center justify-center font-black flex-shrink-0`}>
            <Eye size={isMobile ? 12 : 20} />
          </div>
          <div className="text-left">
            <div className={`${isMobile ? 'text-[7px]' : 'text-[10px]'} font-black uppercase tracking-widest text-white/60`}>REELS REACH</div>
            <div className={`${isMobile ? 'text-[11px]' : 'text-sm sm:text-base'} font-display font-black text-[#FF5547] drop-shadow-[0_0_8px_rgba(255,59,47,0.8)]`}>2.6M+ VIEWS</div>
          </div>
        </motion.div>

        {/* Floating Card 2: 85% Retention Hook (Top Right) */}
        <motion.div
          animate={isMobile ? { y: [2, -2, 2] } : { y: [6, -6, 6], rotate: [2, -2, 2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className={`absolute z-30 bg-white text-black rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] flex items-center transform rotate-2 ${
            isMobile 
              ? '-top-2 right-0 p-1.5 gap-2 text-[9px]' 
              : 'top-2 sm:top-6 right-0 sm:-right-4 p-3 sm:p-4 gap-3 text-xs sm:text-sm'
          }`}
        >
          <div className={`${isMobile ? 'w-6 h-6 rounded-md' : 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl'} bg-black text-[#FF5547] flex items-center justify-center font-black flex-shrink-0`}>
            <TrendingUp size={isMobile ? 12 : 20} />
          </div>
          <div className="text-left">
            <div className={`${isMobile ? 'text-[7px]' : 'text-[10px]'} font-black uppercase tracking-widest text-black/60`}>RETENTION</div>
            <div className={`${isMobile ? 'text-[11px]' : 'text-sm sm:text-base'} font-display font-black text-black`}>85%+ HOOK</div>
          </div>
        </motion.div>

        {/* Newspaper Cutout Badge: "SCROLL STOPPER" */}
        <motion.div
          animate={isMobile ? {} : { y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 -right-2 sm:-right-8 z-30 transform -translate-y-12 flex-col items-end pointer-events-none hidden sm:flex"
        >
          <div className="bg-black text-white px-3 sm:px-4 py-1 font-display font-black text-xs sm:text-sm tracking-widest uppercase border border-white/20 shadow-xl transform -rotate-3">
            SCROLL STOPPER
          </div>
          <div className="bg-[#FF3B2F] text-white px-3 sm:px-4 py-1 font-display font-black text-xs sm:text-sm tracking-widest uppercase border-2 border-black shadow-[0_0_15px_rgba(255,59,47,0.5)] transform rotate-2 mt-1">
            CREATIVE AI ⚡
          </div>
        </motion.div>

        {/* Central Megaphone & Vector Art Illustration */}
        <div className={`relative z-20 w-full h-full flex items-center justify-center ${isMobile ? 'p-0' : 'p-4'}`}>
          <svg viewBox="0 0 500 500" className={`w-full h-full ${isMobile ? 'max-w-[220px]' : 'max-w-[420px]'} filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="halftone" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#000" />
              </pattern>
            </defs>

            {/* Hand holding megaphone */}
            <g transform="translate(10, 20)">
              {/* Star Doodles & Scribbles Background */}
              <path d="M 120 180 L 128 160 L 136 180 L 156 188 L 136 196 L 128 216 L 120 196 L 100 188 Z" fill="#000" />
              <path d="M 380 100 L 385 85 L 390 100 L 405 105 L 390 110 L 385 125 L 380 110 L 365 105 Z" fill="#000" />
              
              {/* Megaphone Cone */}
              <path d="M 230 250 L 400 130 C 420 120, 440 180, 430 250 C 420 320, 390 380, 370 370 L 220 280 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="12" strokeLinejoin="round"/>
              <path d="M 230 250 L 400 130 C 420 120, 440 180, 430 250 C 420 320, 390 380, 370 370 L 220 280 Z" fill="url(#halftone)" opacity="0.15"/>
              
              {/* Megaphone Cone Opening Ring */}
              <ellipse cx="400" cy="250" rx="30" ry="120" fill="#111111" stroke="#000000" strokeWidth="8"/>
              <ellipse cx="400" cy="250" rx="20" ry="105" fill="#FFFFFF" />

              {/* Megaphone Base Body & Joint */}
              <rect x="170" y="225" width="60" height="60" rx="8" fill="#111111" stroke="#000000" strokeWidth="8" />
              <circle cx="160" cy="255" r="28" fill="#FFFFFF" stroke="#000000" strokeWidth="8" />
              
              {/* Soundwaves / Flare Lines */}
              <path d="M 440 180 Q 470 250 440 320" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
              <path d="M 460 150 Q 500 250 460 350" stroke="#000000" strokeWidth="6" strokeLinecap="round" strokeDasharray="8 8" />

              {/* Halftone B&W Hand Holding Handle */}
              <path d="M 175 285 L 145 420 C 140 440, 190 450, 205 420 L 225 310 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="10" strokeLinejoin="round"/>
              <path d="M 175 285 L 145 420 C 140 440, 190 450, 205 420 L 225 310 Z" fill="url(#halftone)" opacity="0.3"/>
              
              {/* Arm Sleeve B&W Cutout */}
              <path d="M 120 400 L 220 480 L 150 510 L 80 430 Z" fill="#111111" stroke="#000" strokeWidth="6"/>
            </g>
          </svg>
        </div>

        {/* Floating Card 3: AI Growth Engine (Bottom Left) */}
        <motion.div
          animate={isMobile ? { y: [2, -2, 2] } : { y: [5, -5, 5], rotate: [-1, 1, -1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute z-30 bg-black text-white rounded-lg border border-white/20 shadow-[3px_3px_0px_#000] flex items-center gap-1.5 ${
            isMobile 
              ? '-bottom-1 left-0 px-2 py-1 text-[8px]' 
              : 'bottom-2 sm:bottom-4 left-0 sm:-left-2 px-3.5 py-2.5 text-xs border-2 shadow-[5px_5px_0px_#000]'
          }`}
        >
          <Sparkles size={isMobile ? 12 : 16} className="text-[#FF5547] animate-pulse drop-shadow-[0_0_8px_rgba(255,59,47,0.9)]" />
          <span className="font-black uppercase tracking-wider">AI CONTENT SYSTEM</span>
        </motion.div>

        {/* Newspaper Cutout Stack Bottom Right */}
        <motion.div
          animate={isMobile ? {} : { y: [6, -6, 6], rotate: [2, -1, 2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-1 right-0 z-30 flex flex-col items-start pointer-events-none"
        >
          <div className={`bg-white text-black font-display font-black tracking-widest uppercase border border-black shadow-[2px_2px_0px_#000] transform -rotate-1 ${
            isMobile ? 'px-1.5 py-0.5 text-[8px]' : 'px-3 py-1 text-xs sm:text-sm border-2 shadow-[3px_3px_0px_#000]'
          }`}>
            WE MAKE IT
          </div>
          <div className={`bg-[#FF3B2F] text-white font-display font-black tracking-widest uppercase border border-black shadow-[3px_3px_0px_#000] transform rotate-1 -mt-0.5 ${
            isMobile ? 'px-2 py-0.5 text-[9px]' : 'px-3.5 py-1 text-sm sm:text-xl border-2 shadow-[4px_4px_0px_#000] -mt-1'
          }`}>
            UNMISSABLE
          </div>
        </motion.div>
      </div>
    </div>
  );
}

