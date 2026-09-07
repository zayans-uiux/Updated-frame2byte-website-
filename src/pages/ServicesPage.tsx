import { motion } from 'framer-motion';
import { Video, Instagram, Sparkles, Layout, PlayCircle, Check, ArrowUpRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import CurrencyToggle from '../components/CurrencyToggle';
import AnimatedPrice from '../components/AnimatedPrice';

const individualServices = [
  {
    title: 'Startup Landing Page',
    priceINR: '₹2,499',
    priceUSD: '$39',
    unit: 'one-time design',
    icon: <Globe size={24} />,
    desc: 'A modern one-page website designed for startups, personal brands, and small businesses that need a professional online presence without investing in a full website.',
    points: [
      'Mobile Responsive Design',
      'Hero Section',
      'About Section',
      'Services Section',
      'Contact / Call-to-Action Section',
      'Modern Animations',
      'Fast Loading Design',
      'Basic SEO Structure'
    ],
    highlight: true,
    badge: 'RECOMMENDED FOR STARTUPS',
    ctaText: 'Get Your Landing Page',
    cardBg: 'bg-[#0B0B0B] text-white',
    buttonBg: 'bg-[#FF3B2F] text-white hover:bg-[#E02D21]'
  },
  {
    title: 'Reel Editing',
    priceINR: '₹1,400',
    priceUSD: '$19',
    unit: 'starting price',
    icon: <Video size={24} />,
    desc: 'High-retention video editing designed for maximum virality and viewer retention.',
    points: ['Subtitles & Captions', 'Motion Graphics / VFX', 'Sound FX & Matching Tracks', 'Cinematic Color Grading', 'Hook Optimization', 'Custom Templates'],
    cardBg: 'bg-white text-black',
    buttonBg: 'bg-black text-white hover:bg-neutral-800'
  },
  {
    title: 'Graphic Design',
    priceINR: '₹1,000',
    priceUSD: '$16',
    unit: 'starting price',
    icon: <Instagram size={24} />,
    desc: 'Bespoke design creatives crafted to match and elevate your social visual style.',
    points: ['Branded Visuals', 'Single Post Creatives', 'Grid Design Consistency', 'High-Res Deliverables', 'Commercial Use License'],
    cardBg: 'bg-white text-black',
    buttonBg: 'bg-black text-white hover:bg-neutral-800'
  },
  {
    title: 'AI Graphic Posters',
    priceINR: '₹800',
    priceUSD: '$12',
    unit: 'starting price',
    icon: <Sparkles size={24} />,
    desc: 'Cutting-edge AI-synthesized graphics and posters tailored for your campaigns.',
    points: ['AI Concept Synthesis', 'Custom Composites', 'Upscaled High Definition', 'Creative Brand Themes', 'Fast Turnaround'],
    cardBg: 'bg-white text-black',
    buttonBg: 'bg-black text-white hover:bg-neutral-800'
  },
  {
    title: 'Branding Assets',
    priceINR: '₹3,999',
    priceUSD: '$49',
    unit: 'starting price',
    icon: <Layout size={24} />,
    desc: 'Platform-optimized assets packs to scale your identity across the web consistency.',
    points: ['Brand Banner Graphics', 'Intro / Outro Elements', 'Video Frame Overlays', 'Optimized Profile Layouts', 'Brand Color Presets'],
    cardBg: 'bg-white text-black',
    buttonBg: 'bg-black text-white hover:bg-neutral-800'
  },
  {
    title: 'Custom Creative Work',
    priceINR: 'Contact Us',
    priceUSD: 'Contact Us',
    unit: 'custom pricing',
    icon: <PlayCircle size={24} />,
    desc: 'Individually scope-tailored premium visual projects, cinematic VFX, or unique campaign launches.',
    points: ['Advanced 3D/VFX Layouts', 'Full Storyboard Mapping', 'Strategic Campaign Assets', 'Priority Studio Delivery', 'Premium Custom Assets'],
    cardBg: 'bg-white text-black',
    buttonBg: 'bg-black text-white hover:bg-neutral-800'
  }
];

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 sm:pt-24 lg:pt-28 pb-16 min-h-screen bg-[#FF3B2F] text-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Centered Header with Currency Toggle */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-block bg-black text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase mb-3 shadow-md border border-white/20">
            INDIVIDUAL SERVICES
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight uppercase leading-snug break-words max-w-full text-black mb-4">
            STANDALONE <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">CREATIVE SOLUTIONS</span>
          </h1>

          <div className="flex justify-center sm:justify-end">
            <CurrencyToggle variant="orange" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-20">
          {individualServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative p-6 sm:p-8 rounded-[2rem] border-2 border-black flex flex-col justify-between shadow-[6px_6px_0px_#0B0B0B] hover:-translate-y-2 transition-transform duration-300 ${service.cardBg}`}
            >
              {service.highlight && service.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF3B2F] text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-md whitespace-nowrap border border-black">
                  {service.badge}
                </div>
              )}

              <div>
                <div className="w-10 h-10 rounded-xl bg-current/10 flex items-center justify-center mb-4">
                  {service.icon}
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight mb-2">
                  {service.title}
                </h3>

                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-2xl sm:text-4xl font-display font-black">
                    <AnimatedPrice
                      inrPrice={service.priceINR}
                      usdPrice={service.priceUSD}
                      period={service.unit}
                    />
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold opacity-80 mb-6 leading-relaxed">
                  {service.desc}
                </p>

                <div className="space-y-2 mb-8 pt-4 border-t border-current/10">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">WHAT IS INCLUDED:</p>
                  {service.points.map((pt, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs font-bold">
                      <Check size={12} className="stroke-[3] opacity-80" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/contact#instagram-contact"
                className={`w-full py-3.5 rounded-md font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_#000] ${service.buttonBg}`}
              >
                <span>{service.ctaText || 'INQUIRE PROJECT'}</span>
                <ArrowUpRight size={16} className="stroke-[3]" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Conversion Banner */}
        <div className="bg-[#0B0B0B] text-white p-8 sm:p-12 rounded-[2.5rem] text-center max-w-4xl mx-auto border-2 border-black shadow-[8px_8px_0px_#000]">
          <h3 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight mb-4">
            NEED CONSISTENT CONTENT <span className="text-[#FF3B2F] drop-shadow-sm">EVERY MONTH?</span>
          </h3>
          <p className="text-xs sm:text-base font-extrabold text-white/70 max-w-xl mx-auto mb-8">
            Our monthly subscription plans are designed for high-growth brands and creators looking for bundled value and dedicated turnarounds.
          </p>
          <Link
            to="/plans"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF3B2F] text-white rounded-md font-extrabold text-xs uppercase tracking-wider hover:bg-[#E02D21] transition-all shadow-[4px_4px_0px_#FFF]"
          >
            <span>VIEW MONTHLY PLANS</span>
            <ArrowUpRight size={16} className="stroke-[3]" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}

