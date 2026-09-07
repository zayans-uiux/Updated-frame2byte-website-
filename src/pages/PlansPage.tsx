import { motion } from 'framer-motion';
import Pricing from '../components/Pricing';

export default function PlansPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 sm:pt-24 min-h-screen bg-[#FF3B2F] text-black"
    >
      <Pricing />
    </motion.div>
  );
}
