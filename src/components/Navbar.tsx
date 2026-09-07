import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'WORK', href: '/works' },
  { name: 'SERVICES', href: '/services' },
  { name: 'CLIPPING', href: '/clipping' },
  { name: 'PLANS', href: '/plans' },
  { name: 'FRAMEAI', href: '/frameai' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash links on home page
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300 py-2.5 sm:py-3.5 bg-[#111111] border-b border-white/10 shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg sm:text-2xl font-display font-black tracking-tighter text-white uppercase flex items-center gap-1.5"
            >
              <span className="bg-[#FF3B2F] text-white px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-black">F2B</span>
              <span><span className="text-white">FRAME</span><span className="text-[#FF3B2F]">2</span><span className="text-white">BYTE</span></span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 md:gap-2.5 lg:gap-3.5 xl:gap-4">
            {navLinks.map((link, i) => {
              const isFrameAi = link.name === 'FRAMEAI';
              const isActive = location.pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`text-[10px] md:text-[10.5px] lg:text-[11px] font-black tracking-wider transition-all uppercase flex items-center gap-1 ${
                      isFrameAi
                        ? 'bg-[#FF3B2F]/20 text-[#FF5547] border border-[#FF3B2F]/60 px-2 py-0.5 rounded-full hover:bg-[#FF3B2F] hover:text-white shadow-[0_0_10px_rgba(255,59,47,0.4)] hover:shadow-[0_0_18px_rgba(255,59,47,0.7)] hover:scale-105'
                        : isActive 
                        ? 'text-[#FF3B2F]'
                        : 'text-white/90 hover:text-[#FF3B2F]'
                    }`}
                  >
                    {isFrameAi && <Sparkles size={11} className="text-[#FF5547] animate-pulse drop-shadow-[0_0_8px_rgba(255,59,47,0.9)]" />}
                    <span>{link.name}</span>
                  </Link>
                </motion.div>
              );
            })}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Link
                to="/contact"
                className="px-3 lg:px-3.5 py-1.5 rounded-lg text-[10px] md:text-[10.5px] lg:text-[11px] font-black uppercase tracking-wider flex items-center gap-1 transition-all duration-300 bg-[#FF3B2F] text-white hover:bg-[#E02D21] hover:scale-105 shadow-[2px_2px_0px_#FFF]"
              >
                <span>LETS TALK</span>
                <ArrowUpRight size={12} className="stroke-[3]" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Toggle Button (White circular button with Orange hamburger lines) */}
          <button
            className="md:hidden w-9 h-9 rounded-full bg-white text-[#FF3B2F] flex items-center justify-center transition-all active:scale-90 shadow-md border border-white/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={18} className="text-[#FF3B2F] stroke-[2.5]" /> : <Menu size={18} className="text-[#FF3B2F] stroke-[2.5]" />}
          </button>
        </div>
      </nav>

      {/* Full-Screen Premium Editorial Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#0B0B0B] text-white md:hidden flex flex-col justify-between p-6 overflow-y-auto border-4 border-[#FF3B2F]"
          >
            {/* Header with Logo & Close */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="text-lg font-display font-black tracking-tight text-white uppercase flex items-center gap-1.5">
                <span className="bg-[#FF3B2F] text-white px-2 py-0.5 rounded text-xs font-black">F2B</span>
                <span>FRAME<span className="text-[#FF3B2F]">2</span>BYTE</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-[#FF3B2F] text-white border border-white/20 flex items-center justify-center active:scale-95"
                aria-label="Close Menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Links with Bold Editorial Hierarchy */}
            <div className="py-6 space-y-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#FF5547] mb-4 flex items-center gap-1.5 drop-shadow-[0_0_8px_rgba(255,59,47,0.8)]">
                <Sparkles size={14} /> NAVIGATION DIRECTORY
              </div>

              {[
                { name: 'HOME', href: '/' },
                { name: 'WORK', href: '/works' },
                { name: 'SERVICES', href: '/services' },
                { name: 'CLIPPING', href: '/clipping' },
                { name: 'PLANS', href: '/plans' },
                { name: 'FRAMEAI', href: '/frameai' },
                { name: 'LETS TALK', href: '/contact' },
              ].map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                >
                  <Link
                    to={link.href}
                    className="group py-2.5 border-b border-white/10 flex items-center justify-between hover:text-[#FF3B2F] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl sm:text-2xl font-display font-black tracking-tight uppercase">
                      {link.name}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-white/40 group-hover:text-[#FF5547]">
                      0{idx + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Contact & Call to Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href="https://wa.me/918268278786?text=Hi%20Frame2Byte%2C%20I%20am%20interested%20in%20scaling%20my%20brand%27s%20content!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 bg-[#FF3B2F] text-white font-black text-xs uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-2 shadow-[4px_4px_0px_#FFF]"
              >
                <MessageSquare size={16} className="text-white" />
                <span>CHAT ON WHATSAPP (+91 8268278786)</span>
              </a>

              <a
                href="#ai-audit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-2 border-2 border-black"
              >
                <span>BOOK FREE AI AUDIT</span>
                <ArrowUpRight size={16} className="stroke-[3]" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

