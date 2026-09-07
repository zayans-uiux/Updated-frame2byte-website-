import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../context/CurrencyContext';

interface AnimatedPriceProps {
  inrPrice: string;
  usdPrice?: string;
  className?: string;
  period?: string;
  prefix?: string;
}

export default function AnimatedPrice({
  inrPrice,
  usdPrice,
  className = '',
  period,
  prefix,
}: AnimatedPriceProps) {
  const { currency } = useCurrency();

  // If no usdPrice provided or if inrPrice is custom/text
  if (!usdPrice || inrPrice === 'Custom' || inrPrice === 'Contact Us') {
    return (
      <span className={`inline-flex items-baseline ${className}`}>
        {prefix && <span className="mr-1">{prefix}</span>}
        <span>{inrPrice}</span>
        {period && <span className="text-xs sm:text-sm font-semibold opacity-70 ml-1.5">{period}</span>}
      </span>
    );
  }

  const currentPrice = currency === 'USD' ? usdPrice : inrPrice;

  return (
    <span className={`inline-flex items-baseline overflow-hidden ${className}`}>
      {prefix && <span className="mr-1">{prefix}</span>}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currency + currentPrice}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {currentPrice}
        </motion.span>
      </AnimatePresence>
      {period && (
        <span className="text-xs sm:text-sm font-semibold opacity-70 ml-1.5 whitespace-nowrap">
          {period}
        </span>
      )}
    </span>
  );
}
