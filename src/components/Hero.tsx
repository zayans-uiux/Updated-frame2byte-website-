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
      <section className="hidden md:block relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-20 bg-[#FF3B2F] text-white overflow-hidden border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-12 gap-8 items-center min-h-[520px]">
            
            {/* Left Column (Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-7 lg:col-span-6 text-left z-10"
            >
              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6 shadow-md border border-white/20"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF5547] shadow-[0_0_8px_rgba(255,59,47,0.9)] animate-pulse" />
                BUSINESS MARKETING & AI GROWTH STRATEGISTS
              </motion.div>
              
              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[0.95] tracking-tighter mb-6 text-black uppercase">
                WE BUILD BRANDS <br />
                <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">PEOPLE CAN'T</span> <br />
                <span className="text-black">IGNORE.</span>
              </h1>
              
              {/* Subhead Description */}
              <p className="text-base lg:text-lg text-black font-extrabold max-w-lg mb-8 leading-relaxed">
                We combine AI marketing strategy, creative direction, and high-retention short-form systems to scale your business faster.
              </p>
              
              {/* Dual CTAs */}
              <div className="flex items-center gap-4 mb-10">
                <a
                  href="#ai-audit"
                  className="px-7 py-4 bg-black text-white rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-900 transition-all hover:scale-105 shadow-[4px_4px_0px_#000] border border-black"
                >
                  <Sparkles size={16} className="text-[#FF5547] animate-pulse" />
                  <span>BOOK FREE STRATEGY CALL</span>
                  <ArrowUpRight size={18} className="stroke-[3]" />
                </a>
                
                <Link
                  to="/portfolio"
                  className="px-7 py-4 bg-transparent text-black border-2 border-black rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-black/10 transition-all hover:scale-105"
                >
                  <span>SEE OUR WORK</span>
                  <ArrowUpRight size={18} className="stroke-[3]" />
                </Link>
              </div>

              {/* Trusted By Strip */}
              <div className="pt-6 border-t border-black/20">
                <p className="text-xs font-black uppercase tracking-widest text-black/80 mb-3">
                  TRUSTED BY <span className="text-black font-black">30+ BRANDS & CREATORS</span>
                </p>
                
                <div className="flex flex-wrap items-center gap-2.5 opacity-95">
                  {['GRIND UP', 'INTERNATIONAL CLIENTS', 'CONCERT PROJECTS', 'LOCAL BRANDS'].map((brand) => (
                    <div key={brand} className="px-3 py-1 bg-black text-white rounded-md font-display font-black text-xs tracking-tight border border-black shadow-sm">
                      {brand}
                    </div>
                  ))}
                  <span className="text-xs font-black text-black ml-1">+25 MORE</span>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column (Hero Visual Collage) */}
            <div className="col-span-5 lg:col-span-6 relative">
              <HeroVisual isMobile={false} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


