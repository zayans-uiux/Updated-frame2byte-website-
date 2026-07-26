import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Film, Briefcase } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

type TransitionType = 'home' | 'work' | 'plans' | null;

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTransition, setActiveTransition] = useState<TransitionType>(null);

  const handleNav = (target: string, type: 'home' | 'work' | 'plans') => {
    setActiveTransition(type);

    setTimeout(() => {
      if (target === '/') {
        if (location.pathname !== '/') {
          navigate('/');
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        navigate(target);
      }
    }, 180);

    setTimeout(() => {
      setActiveTransition(null);
    }, 450);
  };

  return (
    <>
      {/* Directional Section Color Identity Transition Overlay */}
      <AnimatePresence>
        {activeTransition && (
          <motion.div
            key={activeTransition}
            initial={
              activeTransition === 'home' 
                ? { x: '-100%', opacity: 0.95 }
                : activeTransition === 'work'
                ? { y: '100%', opacity: 0.95 }
                : { x: '100%', opacity: 0.95 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`fixed inset-0 z-[100] pointer-events-none flex items-center justify-center p-6 text-center ${
              activeTransition === 'home'
                ? 'bg-[#FF3B2F]'
                : activeTransition === 'work'
                ? 'bg-white'
                : 'bg-[#0B0B0B]'
            }`}
          >
            <div className={`font-display font-black text-xl sm:text-2xl uppercase tracking-widest ${
              activeTransition === 'work' ? 'text-black' : 'text-white'
            }`}>
              {activeTransition === 'home' && 'FRAME2BYTE • HOME'}
              {activeTransition === 'work' && 'OUR CREATIVE WORK'}
              {activeTransition === 'plans' && 'GROWTH SUBSCRIPTIONS'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden w-auto max-w-[92vw]"
      >
        <div className="bg-white/95 text-black border-2 border-black/90 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md px-5 py-2.5 rounded-full flex items-center justify-between gap-6 sm:gap-8">
          
          {/* Home */}
          <button
            onClick={() => handleNav('/', 'home')}
            className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider transition-colors active:scale-95 ${
              location.pathname === '/' && !location.hash ? 'text-[#FF3B2F]' : 'text-black/80 hover:text-black'
            }`}
          >
            <Home size={16} className={location.pathname === '/' && !location.hash ? 'text-[#FF3B2F]' : 'text-black'} />
            <span>Home</span>
          </button>

          <span className="w-1 h-1 rounded-full bg-black/20" />

          {/* Work */}
          <button
            onClick={() => handleNav('/portfolio', 'work')}
            className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider transition-colors active:scale-95 ${
              location.pathname === '/portfolio' ? 'text-[#FF3B2F]' : 'text-black/80 hover:text-black'
            }`}
          >
            <Film size={16} className={location.pathname === '/portfolio' ? 'text-[#FF3B2F]' : 'text-black'} />
            <span>Work</span>
          </button>

          <span className="w-1 h-1 rounded-full bg-black/20" />

          {/* Plans */}
          <button
            onClick={() => handleNav('/plans', 'plans')}
            className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider transition-colors active:scale-95 ${
              location.pathname === '/plans' ? 'text-[#FF3B2F]' : 'text-black/80 hover:text-black'
            }`}
          >
            <Briefcase size={16} className={location.pathname === '/plans' ? 'text-[#FF3B2F]' : 'text-black'} />
            <span>Plans</span>
          </button>

        </div>
      </motion.div>
    </>
  );
}
