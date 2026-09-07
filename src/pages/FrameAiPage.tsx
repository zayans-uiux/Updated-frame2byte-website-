import { motion } from 'framer-motion';
import AIBusinessAudit from '../components/AIBusinessAudit';

export default function FrameAiPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-black flex flex-col justify-center"
    >
      <AIBusinessAudit theme="white" isPage={true} />
    </motion.div>
  );
}
