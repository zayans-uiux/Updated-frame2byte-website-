import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Film, Scissors } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

type TransitionType = 'work' | 'home' | 'clipping' | null;

interface NavItem {
  id: string;
  label: string;
  path: string;
  type: TransitionType;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'work', label: 'WORK', path: '/works', type: 'work', icon: Film },
  { id: 'home', label: 'HOME', path: '/', type: 'home', icon: Home },
  { id: 'clippit', label: 'CLIPPIT', path: '/clipping', type: 'clipping', icon: Scissors },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTransition, setActiveTransition] = useState<TransitionType>(null);

  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clearTransitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNav = (target: string, type: TransitionType) => {
    // Clear any pending transition timeouts for rapid clicks
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    if (clearTransitionTimeoutRef.current) clearTimeout(clearTransitionTimeoutRef.current);

    // Trigger subtle haptic feedback if available on mobile
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(8);
      }
    } catch {
      // Ignore
    }

    // Set active transition state immediately
    setActiveTransition(type);

    // Perform navigation immediately
    if (target === '/') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (location.pathname !== target) {
        navigate(target);
      }
    }

    // Dismiss transition overlay rapidly for ultra responsive feel
    clearTransitionTimeoutRef.current = setTimeout(() => {
      setActiveTransition(null);
    }, 320);
  };

  const getIsActive = (item: NavItem) => {
    if (item.path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    return location.pathname === item.path;
  };

  const getTransitionVariants = (type: TransitionType) => {
    switch (type) {
      case 'work': // Left button -> Slide from Left to Right
        return {
          initial: { x: '-100%', y: 0, opacity: 0.95 },
          animate: { x: '0%', y: 0, opacity: 1 },
          exit: { x: '100%', y: 0, opacity: 0 },
        };
      case 'clipping': // Right button -> Coming from Right side
        return {
          initial: { x: '100%', y: 0, opacity: 0.95 },
          animate: { x: '0%', y: 0, opacity: 1 },
          exit: { x: '-100%', y: 0, opacity: 0 },
        };
      case 'home': // Center button -> Slide from Bottom to Top
      default:
        return {
          initial: { x: 0, y: '100%', opacity: 0.95 },
          animate: { x: 0, y: '0%', opacity: 1 },
          exit: { x: 0, y: '-100%', opacity: 0 },
        };
    }
  };

  return (
    <>
      {/* Directional Section Color Identity Transition Overlay */}
      <AnimatePresence>
        {activeTransition && (
          <motion.div
            key={activeTransition}
            initial={getTransitionVariants(activeTransition).initial}
            animate={getTransitionVariants(activeTransition).animate}
            exit={getTransitionVariants(activeTransition).exit}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-x-0 top-[56px] sm:top-[60px] bottom-0 z-[40] pointer-events-none flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl shadow-2xl ${
              activeTransition === 'home'
                ? 'bg-[#FF3B2F] text-white'
                : activeTransition === 'work'
                ? 'bg-white text-black'
                : activeTransition === 'clipping'
                ? 'bg-white text-black'
                : 'bg-[#0B0B0B] text-white border-t border-[#FF3B2F]/30'
            }`}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.2 }}
              className="flex flex-col items-center gap-2 mb-12"
            >
              {activeTransition === 'clipping' && (
                <div className="w-12 h-12 rounded-2xl bg-black text-[#FF3B2F] flex items-center justify-center mb-1 shadow-[3px_3px_0px_#FF3B2F]">
                  <Scissors size={22} className="stroke-[2.5]" />
                </div>
              )}
              <div className={`font-display font-black text-xl sm:text-2xl uppercase tracking-widest ${
                activeTransition === 'work' || activeTransition === 'clipping' ? 'text-black' : 'text-white'
              }`}>
                {activeTransition === 'home' && 'FRAME2BYTE • HOME'}
                {activeTransition === 'work' && 'OUR CREATIVE PORTFOLIO'}
                {activeTransition === 'clipping' && 'FRAME2BYTE • CLIPPING & REPURPOSING'}
              </div>
              <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                activeTransition === 'work' || activeTransition === 'clipping'
                  ? 'bg-black/10 text-black/80'
                  : 'bg-white/10 text-white/80'
              }`}>
                {activeTransition === 'home' && 'LOADING HOME EXPERIENCE'}
                {activeTransition === 'work' && 'LOADING SHOWCASE REELS'}
                {activeTransition === 'clipping' && 'LOADING CLIPPING STUDIO'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= BOTTOM CENTER FLOATING DYNAMIC ISLAND (MOBILE UI) ================= */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.1 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] md:hidden flex items-center select-none max-w-[92vw]"
      >
        <div className="relative bg-[#0B0B0B]/95 border-2 border-[#FF3B2F]/40 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(255,59,47,0.25)] backdrop-blur-2xl p-1.5 rounded-full flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = getIsActive(item);
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.path, item.type)}
                className={`relative z-10 flex items-center justify-center gap-2 h-11 px-4 rounded-full transition-all duration-300 active:scale-95 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
                aria-label={item.label}
              >
                {/* Active Waterdrop / Liquid Bubble Expandable Pill */}
                {isActive && (
                  <motion.div
                    layoutId="dynamicIslandActivePill"
                    transition={{
                      type: 'spring',
                      stiffness: 600,
                      damping: 35,
                      mass: 0.5,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-[#FF5547] to-[#FF3B2F] rounded-full shadow-[0_0_20px_rgba(255,59,47,0.85)] border border-white/30 z-0"
                  >
                    {/* Inner liquid waterdrop specular highlight */}
                    <div className="absolute top-1.5 left-3 w-4 h-1.5 bg-white/40 rounded-full blur-[0.5px]" />
                  </motion.div>
                )}

                <Icon size={19} className={`relative z-10 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />

                {/* Smooth label text expansion for active item */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="relative z-10 text-[11px] font-black uppercase tracking-wider whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}


