import { motion } from 'framer-motion';
import CTA from '../components/CTA';

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16 sm:pt-20 min-h-screen bg-[#FF3B2F]"
    >
      <CTA />
    </motion.div>
  );
}

