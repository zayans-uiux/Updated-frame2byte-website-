import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import StudioTransition from '../components/StudioTransition';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import AIBusinessAudit from '../components/AIBusinessAudit';
import Pricing from '../components/Pricing';
import About from '../components/About';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <SocialProof />
      <StudioTransition />
      <Services />
      <Portfolio />
      <AIBusinessAudit />
      <Pricing />
      <About />
      <CTA />
    </motion.div>
  );
}

