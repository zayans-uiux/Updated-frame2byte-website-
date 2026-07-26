import { motion } from 'framer-motion';
import { Video, Instagram, Sparkles, Layout, PlayCircle, Check, ArrowUpRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const individualServices = [
  {
    title: 'Startup Landing Page',
    price: '₹2,499',
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
    cardBg: 'bg-[#FF3B2F] text-white',
    buttonBg: 'bg-black text-white hover:bg-neutral-900'
  },
  {
    title: 'Reel Editing',
    price: '₹600',
    unit: 'starting price',
    icon: <Video size={24} />,
    desc: 'High-retention video editing designed for maximum virality and viewer retention.',
    points: ['Subtitles & Captions', 'Motion Graphics / VFX', 'Sound FX & Matching Tracks', 'Cinematic Color Grading', 'Hook Optimization', 'Custom Templates'],
    cardBg: 'bg-[#F5F4EF] text-black',
    buttonBg: 'bg-black text-white hover:bg-[#FF3B2F]'
  },
  {
    title: 'Graphic Design',
    price: '₹500',
    unit: 'starting price',
    icon: <Instagram size={24} />,
    desc: 'Bespoke design creatives crafted to match and elevate your social visual style.',
    points: ['Branded Visuals', 'Single Post Creatives', 'Grid Design Consistency', 'High-Res Deliverables', 'Commercial Use License'],
    cardBg: 'bg-[#F5F4EF] text-black',
    buttonBg: 'bg-black text-white hover:bg-[#FF3B2F]'
  },
  {
    title: 'AI Poster Design',
    price: '₹1,200',
    unit: 'starting price',
    icon: <Sparkles size={24} />,
    desc: 'Cutting-edge AI-synthesized graphics and posters tailored for your campaigns.',
    points: ['AI Concept Synthesis', 'Custom Composites', 'Upscaled High Definition', 'Creative Brand Themes', 'Fast Turnaround'],
    cardBg: 'bg-[#F5F4EF] text-black',
    buttonBg: 'bg-black text-white hover:bg-[#FF3B2F]'
  },
  {
    title: 'Branding Assets',
    price: '₹2,500',
    unit: 'starting price',
    icon: <Layout size={24} />,
    desc: 'Platform-optimized assets packs to scale your identity across the web consistency.',
    points: ['Brand Banner Graphics', 'Intro / Outro Elements', 'Video Frame Overlays', 'Optimized Profile Layouts', 'Brand Color Presets'],
    cardBg: 'bg-[#F5F4EF] text-black',
    buttonBg: 'bg-black text-white hover:bg-[#FF3B2F]'
  },
  {
    title: 'Custom Creative Work',
    price: 'Contact Us',
    unit: 'custom pricing',
    icon: <PlayCircle size={24} />,
    desc: 'Individually scope-tailored premium visual projects, cinematic VFX, or unique campaign launches.',
    points: ['Advanced 3D/VFX Layouts', 'Full Storyboard Mapping', 'Strategic Campaign Assets', 'Priority Studio Delivery', 'Premium Custom Assets'],
    cardBg: 'bg-[#F5F4EF] text-black',
    buttonBg: 'bg-black text-white hover:bg-[#FF3B2F]'
  }
];

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 min-h-screen bg-[#0B0B0B] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[#FF3B2F] text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
            INDIVIDUAL SERVICES
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-tight whitespace-nowrap">
            STANDALONE <span className="text-[#FF3B2F]">CREATIVE SOLUTIONS</span>
          </h1>
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
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-md whitespace-nowrap border border-white/20">
                  ✨ {service.badge}
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
                    {service.price}
                  </span>
                  <span className="text-xs font-bold opacity-70">{service.unit}</span>
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
        <div className="bg-[#FF3B2F] text-black p-8 sm:p-12 rounded-[2.5rem] text-center max-w-4xl mx-auto border-2 border-black shadow-[8px_8px_0px_#FFF]">
          <h3 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight mb-4">
            NEED CONSISTENT CONTENT <span className="text-white drop-shadow-sm">EVERY MONTH?</span>
          </h3>
          <p className="text-xs sm:text-base font-extrabold text-black/80 max-w-xl mx-auto mb-8">
            Our monthly subscription plans are designed for high-growth brands and creators looking for bundled value and dedicated turnarounds.
          </p>
          <Link
            to="/plans"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-md font-extrabold text-xs uppercase tracking-wider hover:bg-neutral-900 transition-all shadow-[4px_4px_0px_#000]"
          >
            <span>VIEW MONTHLY PLANS</span>
            <ArrowUpRight size={16} className="stroke-[3]" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}

