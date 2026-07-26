import { motion } from 'framer-motion';
import Pricing from '../components/Pricing';

export default function PlansPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-[#0B0B0B] text-white"
    >
      <Pricing />
    </motion.div>
  );
}
