import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Sparkles, 
  ArrowLeft, 
  Video, 
  Palette, 
  PenTool, 
  Calendar, 
  Bot, 
  MessageSquare, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Clock, 
  RotateCcw, 
  Users, 
  Send 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyToggle from './CurrencyToggle';
import AnimatedPrice from './AnimatedPrice';

export interface PlanDeliverable {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface Plan {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  priceINR: string;
  priceUSD: string;
  period: string;
  targetAudience: string;
  highlight?: boolean;
  ctaText: string;
  isEnterprise?: boolean;
  quickFeatures: string[];
  deliverables: PlanDeliverable[];
  valueProposition: string;
  timeline: string;
  support: string;
  revisionPolicy: string;
  suitedFor: string;
}

const plansData: Plan[] = [
  {
    id: 'launch',
    name: 'Launch Plan',
    badge: 'Launch',
    tagline: 'Simple starter package for a professional social media presence.',
    priceINR: '₹5,999',
    priceUSD: '$99',
    period: '/ month',
    targetAudience: 'New startups, local cafes, small businesses, and creators testing social media marketing.',
    suitedFor: 'Startups, Local Cafes, Small Shops, Individual Creators',
    ctaText: 'View Details →',
    timeline: '3 to 5 days initial asset delivery on a monthly cycle',
    support: 'Standard WhatsApp Support',
    revisionPolicy: '1 Revision per content item',
    quickFeatures: [
      '2 High-Retention Reels',
      '4 Premium Graphic Posts',
      'Caption Assistance',
      'Basic Content Guidance',
      'WhatsApp Support',
      '1 Revision per content item'
    ],
    valueProposition: 'A budget-friendly starter package to establish a clean online presence without high upfront costs.',
    deliverables: [
      {
        icon: <Video className="text-[#FF3B2F]" size={20} />,
        title: '2 High-Retention Reels',
        description: 'Professionally edited reels with engaging hooks, clear subtitles, and audio design tailored to your niche.'
      },
      {
        icon: <Palette className="text-[#FF3B2F]" size={20} />,
        title: '4 Premium Graphic Posts',
        description: 'Custom social media creatives for promotions, product showcases, or announcements.'
      },
      {
        icon: <PenTool className="text-[#FF3B2F]" size={20} />,
        title: 'Caption Assistance',
        description: 'Engaging captions with targeted hashtags to boost post reach.'
      },
      {
        icon: <Calendar className="text-[#FF3B2F]" size={20} />,
        title: 'Basic Content Guidance',
        description: 'Strategic recommendations on what and when to post for optimal audience engagement.'
      },
      {
        icon: <MessageSquare className="text-[#FF3B2F]" size={20} />,
        title: 'WhatsApp Support',
        description: 'Direct messaging channel for project discussions, file updates, and feedback.'
      },
      {
        icon: <RotateCcw className="text-[#FF3B2F]" size={20} />,
        title: '1 Revision per Content',
        description: 'One complete round of revisions per asset to ensure total brand satisfaction.'
      }
    ]
  },
  {
    id: 'starter',
    name: 'Starter Plan',
    badge: 'Starter',
    tagline: 'Consistent branding and steady audience growth.',
    priceINR: '₹9,999',
    priceUSD: '$169',
    period: '/ month',
    targetAudience: 'Businesses starting consistent content marketing looking for reliable brand visibility and organic reach.',
    suitedFor: 'Growing SMBs, Retail Stores, E-commerce, Local Agencies',
    ctaText: 'View Details →',
    timeline: 'Weekly rolling delivery schedule throughout the month',
    support: 'Priority WhatsApp Support',
    revisionPolicy: '2 Revisions per content item',
    quickFeatures: [
      '4 High-Retention Reels',
      '6 Premium Graphic Posts',
      'Caption & Hashtag Strategy',
      'Monthly Content Suggestions',
      'Profile Optimization',
      'Priority WhatsApp Support & 2 Revisions'
    ],
    valueProposition: 'Ideal for businesses wanting a reliable content cadence to build authority and trust.',
    deliverables: [
      {
        icon: <Video className="text-[#FF3B2F]" size={20} />,
        title: '4 High-Retention Reels',
        description: 'Engaging short-form videos with kinetic captions, smooth cuts, and trend-aligned sound design.'
      },
      {
        icon: <Palette className="text-[#FF3B2F]" size={20} />,
        title: '6 Premium Graphic Posts',
        description: 'High-converting graphics and multi-slide carousels aligned with your brand palette.'
      },
      {
        icon: <PenTool className="text-[#FF3B2F]" size={20} />,
        title: 'Caption & Hashtag Strategy',
        description: 'Conversion copywriting, audience prompts, and search-optimized hashtag research.'
      },
      {
        icon: <Calendar className="text-[#FF3B2F]" size={20} />,
        title: 'Monthly Content Suggestions',
        description: 'Structured monthly topic ideas mapped out to match promotional goals.'
      },
      {
        icon: <Bot className="text-[#FF3B2F]" size={20} />,
        title: 'Profile Optimization',
        description: 'Bio polish, highlight cover graphics, and Instagram grid layout recommendations.'
      },
      {
        icon: <MessageSquare className="text-[#FF3B2F]" size={20} />,
        title: 'Priority WhatsApp Support',
        description: 'Fast response line with up to 2 rounds of revisions per content item.'
      }
    ]
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    badge: 'Growth Partner',
    highlight: true,
    tagline: 'High quality content coupled with a structured marketing strategy.',
    priceINR: '₹18,999',
    priceUSD: '$259',
    period: '/ month',
    targetAudience: 'Growing businesses ready to scale their online presence and dominate their niche with strategic video & graphics.',
    suitedFor: 'High-Growth Startups, E-commerce Brands, D2C Brands, Professional Services',
    ctaText: 'View Details →',
    timeline: 'Structured weekly publishing schedule and monthly review',
    support: 'Dedicated Priority WhatsApp & Performance Syncs',
    revisionPolicy: 'Fast-Track Alignment Revisions',
    quickFeatures: [
      '6 High-Retention Reels',
      '8 Premium Graphic Posts',
      'Monthly Content Calendar',
      'Caption & Copywriting',
      'Hook & Script Assistance',
      'Content Planning & Strategy'
    ],
    valueProposition: 'Designed for businesses scaling up that require strategic direction alongside high-performing creative production.',
    deliverables: [
      {
        icon: <Video className="text-[#FF3B2F]" size={20} />,
        title: '6 High-Retention Reels',
        description: 'Scroll-stopping videos with custom hooks, kinetic subtitles, sound design, and retention frameworks.'
      },
      {
        icon: <Palette className="text-[#FF3B2F]" size={20} />,
        title: '8 Premium Graphic Posts',
        description: 'Custom graphic assets, multi-slide carousels, and ad creative variations.'
      },
      {
        icon: <Calendar className="text-[#FF3B2F]" size={20} />,
        title: 'Monthly Content Calendar',
        description: 'Complete content schedule aligning post dates, captions, and key promotion milestones.'
      },
      {
        icon: <PenTool className="text-[#FF3B2F]" size={20} />,
        title: 'Caption & Copywriting',
        description: 'Persuasive copywriting crafted to encourage comments, shares, and website clicks.'
      },
      {
        icon: <Zap className="text-[#FF3B2F]" size={20} />,
        title: 'Hook & Script Assistance',
        description: 'Scripting feedback to refine your video messaging prior to recording.'
      },
      {
        icon: <MessageSquare className="text-[#FF3B2F]" size={20} />,
        title: 'Strategy & Performance Review',
        description: 'Monthly insights review and priority communication channel for continuous optimization.'
      }
    ]
  },
  {
    id: 'business',
    name: 'Business Plan',
    badge: 'Scale Master',
    tagline: 'Acts as a complete creative partner rather than just an editing service.',
    priceINR: '₹35,999',
    priceUSD: '$499',
    period: '/ month',
    targetAudience: 'Established businesses looking for a long-term dedicated creative partner to handle full monthly content pipelines.',
    suitedFor: 'Market Leaders, Established Brands, Agencies, Scale-ups',
    ctaText: 'View Details →',
    timeline: 'Dedicated weekly production pipeline and monthly 1-on-1 strategy call',
    support: 'VIP WhatsApp Support + Dedicated Strategist',
    revisionPolicy: 'Priority Alignment Revisions',
    quickFeatures: [
      '8 Premium High-Retention Reels',
      '10 Premium Graphic Designs',
      'Carousel Strategy & Designs',
      'Complete Monthly Content Planning',
      'Script Writing & Copywriting',
      'Creative Direction & Strategy Call'
    ],
    valueProposition: 'A full end-to-end creative partnership taking full ownership of your visual and short-form video presence.',
    deliverables: [
      {
        icon: <Video className="text-[#FF3B2F]" size={20} />,
        title: '8 Premium High-Retention Reels',
        description: 'High-grade editing, advanced motion graphics, viral hook scripting, and sound design.'
      },
      {
        icon: <Palette className="text-[#FF3B2F]" size={20} />,
        title: '10 Premium Graphic Designs',
        description: 'High-end visual collateral, carousel slides, banner designs, and campaign assets.'
      },
      {
        icon: <PenTool className="text-[#FF3B2F]" size={20} />,
        title: 'Script Writing & Copywriting',
        description: 'Word-for-word reel scripts, brand tone-of-voice alignment, and high-converting copy.'
      },
      {
        icon: <Calendar className="text-[#FF3B2F]" size={20} />,
        title: 'Complete Monthly Content Planning',
        description: 'Full content roadmap mapping awareness reels directly to conversion offers.'
      },
      {
        icon: <Bot className="text-[#FF3B2F]" size={20} />,
        title: 'Creative Direction & Strategy Call',
        description: 'Dedicated monthly 1-on-1 consultation session to analyze metrics and map future campaigns.'
      },
      {
        icon: <MessageSquare className="text-[#FF3B2F]" size={20} />,
        title: 'Priority VIP Support',
        description: 'VIP direct line with senior video editors and graphic designers for rapid turnaround.'
      }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Enterprise',
    isEnterprise: true,
    tagline: 'Completely custom solution built for enterprise scale and multi-brand pipelines.',
    priceINR: 'Custom',
    priceUSD: 'Custom',
    period: 'Pricing',
    targetAudience: 'Corporations, global brands, or specialized campaigns requiring custom deliverables and dedicated production teams.',
    suitedFor: 'Enterprise Corporations, Multi-Brand Groups, Large Agencies',
    ctaText: "Let's Talk",
    timeline: 'Custom dedicated team agreement and continuous production pipeline',
    support: 'Account Director & Priority SLAs',
    revisionPolicy: 'Custom SLA Revisions',
    quickFeatures: [
      'Unlimited Custom Deliverables',
      'Dedicated Creative Team',
      'Marketing Consultation',
      'AI Content Strategy',
      'Priority Execution',
      'Long-Term Partnership'
    ],
    valueProposition: 'A bespoke enterprise agreement providing dedicated creative manpower and strategic marketing oversight.',
    deliverables: [
      {
        icon: <Video className="text-[#FF3B2F]" size={20} />,
        title: 'Custom Production Volume',
        description: 'Tailored video and design production volume built for enterprise scale across multiple channels.'
      },
      {
        icon: <Palette className="text-[#FF3B2F]" size={20} />,
        title: 'Dedicated Creative Team',
        description: 'Dedicated team of senior video editors, graphic designers, copywriters, and account managers.'
      },
      {
        icon: <PenTool className="text-[#FF3B2F]" size={20} />,
        title: 'Marketing Consultation',
        description: 'Strategic marketing direction, campaign ROI tracking, and executive performance dashboards.'
      },
      {
        icon: <Bot className="text-[#FF3B2F]" size={20} />,
        title: 'AI Content Strategy',
        description: 'Custom AI asset generation and automated video rendering pipelines built exclusively for your brand.'
      },
      {
        icon: <Zap className="text-[#FF3B2F]" size={20} />,
        title: 'Priority Execution & SLAs',
        description: 'Guaranteed turnaround times backed by formal Service Level Agreements.'
      },
      {
        icon: <MessageSquare className="text-[#FF3B2F]" size={20} />,
        title: 'Long-Term Partnership',
        description: 'Dedicated account director for ongoing strategic alignment and seamless campaign launches.'
      }
    ]
  }
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const navigate = useNavigate();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPlan) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPlan]);

  const handleOpenPlan = (plan: Plan) => {
    if (plan.isEnterprise) {
      scrollToContact();
    } else {
      setSelectedPlan(plan);
    }
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  const scrollToContact = () => {
    setSelectedPlan(null);
    document.body.style.overflow = 'unset';
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const topOffset = contactSection.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
      } else {
        navigate('/contact');
      }
    }, 120);
  };

  return (
    <section id="plans" className="pt-4 sm:pt-6 pb-16 bg-[#FF3B2F] text-black relative overflow-hidden">
      
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-2 shadow-[2px_2px_0px_#000]"
          >
            <Sparkles size={13} className="text-[#FF3B2F]" />
            <span>TRANSPARENT VALUE PACKAGES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase leading-tight mb-2 text-black"
          >
            MONTHLY CREATIVE <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">PACKAGES</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-xs sm:text-sm text-black/90 font-bold leading-normal max-w-xl mx-auto mb-4"
          >
            Realistic, profitable content systems designed for startups and growing businesses. Select a package to inspect full deliverables.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center sm:justify-end"
          >
            <CurrencyToggle variant="orange" />
          </motion.div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-16">
          {plansData.map((pkg, idx) => {
            const isHighlighted = pkg.highlight;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className={`relative rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border-2 border-black ${
                  isHighlighted
                    ? 'bg-black text-white shadow-[8px_8px_0px_#FFF] scale-[1.02] lg:-translate-y-2 z-20'
                    : 'bg-[#F5F4EF] text-black shadow-[6px_6px_0px_#0B0B0B] hover:-translate-y-1'
                }`}
              >
                {/* Most Popular Choice Badge */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF3B2F] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0px_#0B0B0B] border-2 border-black whitespace-nowrap flex items-center gap-1.5">
                    <Star size={11} className="fill-white" />
                    <span>MOST POPULAR CHOICE</span>
                  </div>
                )}

                <div>
                  {/* Plan Badge Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      isHighlighted 
                        ? 'bg-[#FF3B2F] text-white' 
                        : 'bg-black text-white'
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-display font-black uppercase tracking-tight mb-2 ${
                    isHighlighted ? 'text-white' : 'text-black'
                  }`}>
                    {pkg.name}
                  </h3>

                  <p className={`text-xs sm:text-sm font-bold mb-6 min-h-[38px] leading-relaxed ${
                    isHighlighted ? 'text-neutral-300' : 'text-black/75'
                  }`}>
                    {pkg.tagline}
                  </p>

                  {/* Pricing Typography */}
                  <div className={`mb-6 pb-6 border-b ${
                    isHighlighted ? 'border-neutral-800' : 'border-black/15'
                  }`}>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl sm:text-3xl font-display font-black tracking-tight ${
                        isHighlighted ? 'text-white' : 'text-black'
                      }`}>
                        <AnimatedPrice
                          inrPrice={pkg.priceINR}
                          usdPrice={pkg.priceUSD}
                          period={pkg.period}
                        />
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8">
                    {pkg.quickFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold leading-snug">
                        <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${
                          isHighlighted ? 'text-[#FF3B2F]' : 'text-black'
                        }`} />
                        <span className={isHighlighted ? 'text-neutral-200' : 'text-black'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleOpenPlan(pkg)}
                  className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isHighlighted
                      ? 'bg-[#FF3B2F] text-white hover:bg-[#E02D21] shadow-[3px_3px_0px_#FFF] active:scale-95'
                      : 'bg-black text-white hover:bg-neutral-800 shadow-[3px_3px_0px_#0B0B0B] active:scale-95'
                  }`}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowUpRight size={16} className="stroke-[3]" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Standalone Project Banner */}
        <div className="bg-[#F5F4EF] text-black p-8 sm:p-10 rounded-[2rem] text-center max-w-4xl mx-auto border-2 border-black shadow-[8px_8px_0px_#0B0B0B]">
          <h3 className="text-xl sm:text-3xl font-display font-black uppercase tracking-tight mb-2">
            NEED A STANDALONE <span className="text-[#FF3B2F]">ONE-TIME PROJECT?</span>
          </h3>
          <p className="text-xs sm:text-sm font-bold text-black/75 max-w-xl mx-auto mb-6 leading-relaxed">
            Start with a single reel, startup landing page, or graphic creative before subscribing to a full monthly plan.
          </p>
          <div className="flex justify-center">
            <Link
              to="/services"
              className="px-6 py-3 bg-[#FF3B2F] text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#E02D21] transition-all shadow-[3px_3px_0px_#0B0B0B] hover:-translate-y-0.5"
            >
              <span>EXPLORE STANDALONE SERVICES</span>
              <ArrowUpRight size={15} className="stroke-[3]" />
            </Link>
          </div>
        </div>

      </div>

      {/* PLAN DETAILS MODAL */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 sm:p-6">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-white text-black border-2 border-black md:rounded-[2.5rem] rounded-t-[2.5rem] shadow-[12px_12px_0px_#0B0B0B] max-h-[92vh] md:max-h-[88vh] flex flex-col z-10 overflow-hidden text-left"
            >
              
              {/* Sticky Top Header Bar */}
              <div className="p-5 sm:p-6 bg-[#F5F4EF] border-b-2 border-black flex items-center justify-between sticky top-0 z-20">
                <button
                  onClick={handleCloseModal}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-black uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-all cursor-pointer shadow-[2px_2px_0px_#0B0B0B]"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>

                <div className="inline-flex items-center gap-2 bg-[#FF3B2F] text-white px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-black">
                  <span>{selectedPlan.badge}</span>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1">
                
                {/* Title & Pricing Header */}
                <div className="border-b-2 border-black/15 pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4">
                    <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
                      {selectedPlan.name}
                    </h2>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-display font-black text-[#FF3B2F]">
                        <AnimatedPrice
                          inrPrice={selectedPlan.priceINR}
                          usdPrice={selectedPlan.priceUSD}
                          period={selectedPlan.period}
                        />
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-black/80 leading-relaxed max-w-3xl mb-4">
                    <strong className="text-black">Target Audience:</strong> {selectedPlan.targetAudience}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-black/70">
                    <Users size={16} className="text-[#FF3B2F]" />
                    <span><strong>Best Suited For:</strong> {selectedPlan.suitedFor}</span>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#F5F4EF] border-2 border-black rounded-2xl flex items-start gap-3 shadow-[3px_3px_0px_#0B0B0B]">
                    <Clock size={20} className="text-[#FF3B2F] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-black/60 mb-0.5">
                        EXPECTED TIMELINE
                      </div>
                      <div className="text-xs font-bold text-black">
                        {selectedPlan.timeline}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F5F4EF] border-2 border-black rounded-2xl flex items-start gap-3 shadow-[3px_3px_0px_#0B0B0B]">
                    <MessageSquare size={20} className="text-[#FF3B2F] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-black/60 mb-0.5">
                        SUPPORT INCLUDED
                      </div>
                      <div className="text-xs font-bold text-black">
                        {selectedPlan.support}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F5F4EF] border-2 border-black rounded-2xl flex items-start gap-3 shadow-[3px_3px_0px_#0B0B0B]">
                    <RotateCcw size={20} className="text-[#FF3B2F] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-black/60 mb-0.5">
                        REVISION POLICY
                      </div>
                      <div className="text-xs font-bold text-black">
                        {selectedPlan.revisionPolicy}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Value Proposition */}
                <div className="p-5 bg-[#F5F4EF] border-2 border-black rounded-2xl flex items-start gap-4 shadow-[3px_3px_0px_#0B0B0B]">
                  <Zap className="text-[#FF3B2F] flex-shrink-0 mt-1" size={22} />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-black/60 mb-1">
                      PACKAGE PURPOSE & VALUE
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-black leading-relaxed">
                      {selectedPlan.valueProposition}
                    </div>
                  </div>
                </div>

                {/* Detailed Deliverables Breakdown */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black mb-4">
                    <Sparkles size={16} className="text-[#FF3B2F]" />
                    <span>FULL DELIVERABLES BREAKDOWN</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPlan.deliverables.map((item, i) => (
                      <div 
                        key={i} 
                        className="p-4 sm:p-5 bg-[#F5F4EF] border-2 border-black rounded-2xl shadow-[3px_3px_0px_#0B0B0B]"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                            {item.icon}
                          </div>
                          <h4 className="text-xs sm:text-sm font-display font-black text-black uppercase tracking-tight">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-black/75 leading-relaxed font-bold">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Bottom CTA Footer */}
                <div className="pt-6 border-t-2 border-black/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-bold text-black/70 text-center sm:text-left">
                    Direct Onboarding. No Hidden Setup Fees.
                  </div>

                  <button
                    onClick={scrollToContact}
                    className="w-full sm:w-auto px-8 py-4 bg-[#FF3B2F] text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-[#E02D21] transition-all shadow-[3px_3px_0px_#0B0B0B] flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span>GET STARTED WITH {selectedPlan.name.toUpperCase()}</span>
                    <ArrowUpRight size={18} className="stroke-[3]" />
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
