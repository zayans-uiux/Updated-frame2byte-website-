import { motion } from 'framer-motion';
import { useCurrency } from '../context/CurrencyContext';

interface CurrencyToggleProps {
  className?: string;
  variant?: 'dark' | 'light' | 'orange';
}

export default function CurrencyToggle({
  className = '',
  variant = 'dark',
}: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();

  // Black oval cell container with white text across all variants for high contrast impact
  const containerStyle =
    variant === 'orange'
      ? 'bg-black text-white border-2 border-black shadow-md'
      : variant === 'light'
      ? 'bg-black text-white border border-black/20 shadow-sm'
      : 'bg-black text-white border border-white/20 shadow-lg';

  return (
    <div className={`flex justify-end items-center ${className}`}>
      <div
        className={`relative inline-flex items-center p-1 rounded-full backdrop-blur-md transition-all ${containerStyle}`}
      >
        {/* INR Option */}
        <button
          type="button"
          onClick={() => setCurrency('INR')}
          aria-label="Switch to INR pricing"
          className={`relative z-10 px-3 py-1.5 min-h-[34px] rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center transition-colors duration-300 select-none ${
            currency === 'INR'
              ? 'text-white'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {currency === 'INR' && (
            <motion.div
              layoutId="activeCurrencyPill"
              className="absolute inset-0 bg-[#FF3B2F] rounded-full shadow-[0_2px_8px_rgba(255,59,47,0.5)] border border-white/20 z-0"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10 whitespace-nowrap">INR (₹)</span>
        </button>

        {/* USD Option */}
        <button
          type="button"
          onClick={() => setCurrency('USD')}
          aria-label="Switch to USD pricing"
          className={`relative z-10 px-3 py-1.5 min-h-[34px] rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center transition-colors duration-300 select-none ${
            currency === 'USD'
              ? 'text-white'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {currency === 'USD' && (
            <motion.div
              layoutId="activeCurrencyPill"
              className="absolute inset-0 bg-[#FF3B2F] rounded-full shadow-[0_2px_8px_rgba(255,59,47,0.5)] border border-white/20 z-0"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10 whitespace-nowrap">USD ($)</span>
        </button>
      </div>
    </div>
  );
}

