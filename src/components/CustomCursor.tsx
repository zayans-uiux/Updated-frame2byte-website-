import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [onclick], .cursor-pointer, label, iframe'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block overflow-hidden">
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed rounded-full border pointer-events-none flex items-center justify-center"
        animate={{
          x: mousePosition.x - (isHovered ? 26 : 16),
          y: mousePosition.y - (isHovered ? 26 : 16),
          width: isHovered ? 52 : 32,
          height: isHovered ? 52 : 32,
          borderColor: isHovered ? 'rgba(255, 59, 47, 0.9)' : 'rgba(255, 59, 47, 0.5)',
          backgroundColor: isHovered ? 'rgba(255, 59, 47, 0.18)' : 'rgba(255, 59, 47, 0.05)',
          boxShadow: isHovered
            ? '0 0 25px rgba(255, 59, 47, 0.8), inset 0 0 15px rgba(255, 59, 47, 0.4)'
            : '0 0 12px rgba(255, 59, 47, 0.3)',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.3,
        }}
      />

      {/* Center High-Precision Neon Dot */}
      <motion.div
        className="fixed rounded-full bg-[#FF3B2F] pointer-events-none shadow-[0_0_8px_#FF3B2F]"
        animate={{
          x: mousePosition.x - (isHovered ? 4 : 3),
          y: mousePosition.y - (isHovered ? 4 : 3),
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 450,
        }}
      />
    </div>
  );
}
