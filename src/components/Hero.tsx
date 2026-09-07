import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import HeroVisual from './HeroVisual';
import MobileHero from './MobileHero';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* ================= MOBILE LAYOUT (<md) ================= */}
      {/* Bespoke single-screen ~100vh Mobile Hero App Layout */}
      <div className="md:hidden">
        <MobileHero />
      </div>

      {/* ================= DESKTOP LAYOUT (md+) ================= */}
      {/* Desktop Hero Section - Left Column + Right Visual Collage */}
      <section className="hidden md:block relative pt-16 sm:pt-18 md:pt-20 lg:pt-20 pb-8 sm:pb-12 lg:pb-14 bg-[#FF3B2F] text-white overflow-hidden border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center min-h-[calc(100vh-5.5rem)] max-h-[880px]">
            
            {/* Left Column (Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-7 lg:col-span-6 text-left z-10 -mt-2 lg:-mt-4"
            >
              {/* Dual Capabilities Badges */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-3.5 lg:mb-4 flex-wrap"
              >
                <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase shadow-md border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#FF5547] shadow-[0_0_8px_rgba(255,59,47,0.9)] animate-pulse" />
                  <span>BUSINESS MARKETING</span>
                </div>
                <span className="text-black font-black text-sm">+</span>
                <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase shadow-md border-2 border-black">
                  <span className="w-2 h-2 rounded-full bg-black" />
                  <span>CREATOR CLIPPING</span>
                </div>
              </motion.div>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-display font-black leading-[0.92] tracking-tighter mb-4 lg:mb-5 text-black uppercase">
                WE TURN CONTENT <br />
                <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">INTO ATTENTION.</span>
              </h1>
              
              {/* Subhead Description */}
              <p className="text-sm md:text-base lg:text-lg text-black font-extrabold max-w-lg mb-5 lg:mb-6 leading-relaxed">
                We help brands and creators turn content into attention and growth.
              </p>
              
              {/* Primary CTA */}
              <div className="flex items-center gap-3.5 mb-6 lg:mb-8 flex-wrap xl:flex-nowrap">
                <Link
                  to="/portfolio"
                  className="px-7 py-4 bg-black text-white rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-900 transition-all hover:scale-105 shadow-[4px_4px_0px_#000] border border-black cursor-pointer shrink-0"
                >
                  <span>SEE OUR WORK</span>
                  <ArrowUpRight size={18} className="stroke-[3]" />
                </Link>

                <button
                  onClick={() => {
                    const el = document.getElementById('ai-audit') || document.getElementById('frame-ai');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.hash = '#ai-audit';
                    }
                  }}
                  className="px-7 py-4 bg-white text-black rounded-xl font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-100 transition-all hover:scale-105 shadow-[4px_4px_0px_#000] border-2 border-black cursor-pointer shrink-0"
                >
                  <Sparkles size={16} className="text-black" />
                  <span>VIEW YOUR INSTAGRAM</span>
                  <ArrowUpRight size={18} className="stroke-[3]" />
                </button>
              </div>

              {/* Trusted By Strip */}
              <div className="pt-4 lg:pt-5 border-t border-black/20">
                <p className="text-xs font-black uppercase tracking-widest text-black/80 mb-2.5">
                  TRUSTED BY <span className="text-black font-black">30+ BRANDS & CREATORS</span>
                </p>
                
                <div className="flex flex-wrap items-center gap-2 opacity-95">
                  {['GRIND UP', 'SAKAZAWORLD', 'CONCERT PROJECTS', 'LOCAL BRANDS'].map((brand) => (
                    <div 
                      key={brand} 
                      className="px-2.5 py-1 bg-[#FF3B2F] text-white rounded-lg font-display font-black text-[11px] tracking-tight border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      <span>{brand}</span>
                    </div>
                  ))}
                  <span className="text-[11px] font-black text-black ml-1">+25 MORE</span>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column (Hero Visual Collage) */}
            <div className="col-span-5 lg:col-span-6 relative -mt-3 lg:-mt-6">
              <HeroVisual isMobile={false} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


