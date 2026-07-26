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

export interface PlanDeliverable {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface Plan {
  id: string;
  name: string;
  badge: string;
  badgeIcon: string;
  tagline: string;
  price: string;
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
    badge: '🚀 Launch',
    badgeIcon: '🚀',
    tagline: 'Simple starter package for a professional social media presence.',
    price: '₹4,999',
    period: '/ month',
    targetAudience: 'New startups, local cafés, small businesses, new creators, and businesses testing social media marketing.',
    suitedFor: 'Startups, Local Cafés, Small Shops, Individual Creators',
    ctaText: 'View Details →',
    timeline: '3–5 days initial asset delivery on a monthly cycle',
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
    valueProposition: 'A simple, budget-friendly starter package to establish a clean online presence without high upfront costs.',
    deliverables: [
      {
        icon: <Video className="text-[#FF3B2F]" size={20} />,
        title: '🎬 2 High-Retention Reels',
        description: 'Professionally edited reels with engaging hooks, clear subtitles, and audio design tailored to your niche.'
      },
      {
        icon: <Palette className="text-[#FF3B2F]" size={20} />,
        title: '🎨 4 Premium Graphic Posts',
        description: 'Custom social media creatives for promotions, product showcases, or announcements.'
      },
      {
        icon: <PenTool className="text-[#FF3B2F]" size={20} />,
        title: '✍ Caption Assistance',
        description: 'SEO-friendly captions with engaging copywriting and targeted hashtags to boost post reach.'
      },
      {
        icon: <Calendar className="text-[#FF3B2F]" size={20} />,
        title: '💡 Basic Content Guidance',
        description: 'Strategic recommendations on what and when to post for optimal audience engagement.'
      },
      {
        icon: <MessageSquare className="text-[#FF3B2F]" size={20} />,
        title: '💬 WhatsApp Support',
        description: 'Direct messaging channel for project discussions, file updates, and feedback.'
      },
      {
        icon: <RotateCcw className="text-[#FF3B2F]" size={20} />,
        title: '🔄 1 Revision per Content',
        description: 'One complete round of revisions per asset to ensure total brand satisfaction.'
      }
    ]
  },
  {
    id: 'starter',
    name: 'Starter Plan',
    badge: '⭐ Starter',
    badgeIcon: '⭐',
    tagline: 'Consistent branding and steady audience growth.',
    price: '₹9,499',
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
        title: '🎬 4 High-Retention Reels',
        description: 'Engaging short-form videos with kinetic captions, smooth cuts, and trend-aligned sound design.'
      },
      {
        icon: <Palette className="text-[#FF3B2F]" size={20} />,
        title: '🎨 6 Premium Graphic Posts',
        description: 'High-converting graphics and multi-slide carousels aligned with your brand palette.'
      },
      {
        icon: <PenTool className="text-[#FF3B2F]" size={20} />,
        title: '✍ Caption & Hashtag Strategy',
        description: 'Conversion copywriting, audience prompts, and search-optimized hashtag research.'
      },
      {
        icon: <Calendar className="text-[#FF3B2F]" size={20} />,
        title: '📅 Monthly Content Suggestions',
        description: 'Structured monthly topic ideas mapped out to match promotional goals.'
      },
      {
        icon: <Bot className="text-[#FF3B2F]" size={20} />,
        title: '⚙ Profile Optimization',
        description: 'Bio polish, highlight cover graphics, and Instagram grid layout recommendations.'
      },
      {
        icon: <MessageSquare className="text-[#FF3B2F]" size={20} />,
        title: '💬 Priority WhatsApp Support',
        description: 'Fast response line with up to 2 rounds of revisions per content item.'
      }
    ]
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    badge: '🔥 Growth',
    badgeIcon: '🔥',
    highlight: true,
    tagline: 'High quality content coupled with a structured marketing strategy.',
    price: '₹18,999',
    period: '/ month',
    targetAudience: 'Growing businesses ready to scale their online presence and dominate their niche with strategic video & graphics.',
    suitedFor: 'High-Growth Startups, E-commerce Brands, D2C Brands, Professional Services',
    ctaText: 'View Details →',
    timeline: 'Structured weekly publishing schedule + monthly review',
    support: 'Dedicated Priority WhatsApp & Performance Syncs',
    revisionPolicy: 'Fast-Track Alignment Revisions',
    quickFeatures: [
      '6 High-Retention Reels',
      '8 Premium Graphic Posts',
      'Monthly Content Calendar',
      'Caption & Copywriting',
      'Basic Hook & Script Assistance',
      'Content Planning & Strategy'
    ],
    valueProposition: 'Designed for businesses scaling up that require strategic direction alongside high-performing creative production.',
    deliverables: [
      {
        icon: <Video className="text-[#FF3B2F]" size={20} />,
        title: '🎬 6 High-Retention Reels',
        description: 'Scroll-stopping videos with custom hooks, kinetic subtitles, sound design, and retention frameworks.'
      },
      {
        icon: <Palette className="text-[#FF3B2F]" size={20} />,
        title: '🎨 8 Premium Graphic Posts',
        description: 'Custom graphic assets, multi-slide carousels, and ad creative variations.'
      },
      {
        icon: <Calendar className="text-[#FF3B2F]" size={20} />,
        title: '📅 Monthly Content Calendar',
        description: 'Complete content schedule aligning post dates, captions, and key promotion milestones.'
      },
      {
        icon: <PenTool className="text-[#FF3B2F]" size={20} />,
        title: '✍ Caption & Copywriting',
        description: 'Persuasive copywriting crafted to encourage comments, shares, and website clicks.'
      },
      {
        icon: <Zap className="text-[#FF3B2F]" size={20} />,
        title: '📜 Basic Hook & Script Assistance',
        description: 'Expert scripting feedback to refine your video messaging prior to recording.'
      },
      {
        icon: <MessageSquare className="text-[#FF3B2F]" size={20} />,
        title: '📊 Strategy & Performance Review',
        description: 'Monthly insights review and priority communication channel for continuous optimization.'
      }
    ]
  },
  {
    id: 'business',
    name: 'Business Plan',
    badge: '👑 Business',
    badgeIcon: '👑',
    tagline: 'Acts as a complete creative partner rather than just an editing service.',
    price: '₹34,999',
    period: '/ month',
    targetAudience: 'Established businesses looking for a long-term dedicated creative partner to handle full monthly content pipelines.',
    suitedFor: 'Market Leaders, Established Brands, Agencies, Scale-ups',
    ctaText: 'View Details →',
    timeline: 'Dedicated weekly production pipeline + monthly 1-on-1 strategy call',
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
        title: '🎬 8 Premium High-Retention Reels',
        description: 'Cinema-grade editing, advanced motion graphics, viral hook scripting, and sound design.'
      },
      {
        icon: <Palette className="text-[#FF3B2F]" size={20} />,
        title: '🎨 10 Premium Graphic Designs',
        description: 'High-end visual collateral, carousel slides, banner designs, and campaign assets.'
      },
      {
        icon: <PenTool className="text-[#FF3B2F]" size={20} />,
        title: '📜 Script Writing & Copywriting',
        description: 'Word-for-word reel scripts, brand tone-of-voice alignment, and high-converting ad copy.'
      },
      {
        icon: <Calendar className="text-[#FF3B2F]" size={20} />,
        title: '📅 Complete Monthly Content Planning',
        description: 'Full-funnel content roadmap mapping awareness reels directly to conversion offers.'
      },
      {
        icon: <Bot className="text-[#FF3B2F]" size={20} />,
        title: '🧠 Creative Direction & Strategy Call',
        description: 'Dedicated monthly 1-on-1 consultation session to analyze metrics and map future campaigns.'
      },
      {
        icon: <MessageSquare className="text-[#FF3B2F]" size={20} />,
        title: '💬 Priority VIP Support',
        description: 'VIP direct line with senior video editors and graphic designers for rapid turnaround.'
      }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: '⚡ Enterprise',
    badgeIcon: '⚡',
    isEnterprise: true,
    tagline: 'Completely custom solution built for enterprise scale & multi-brand pipelines.',
    price: 'Custom',
    period: 'Pricing',
    targetAudience: 'Large corporations, global brands, or specialized campaigns requiring custom deliverables and dedicated production teams.',
    suitedFor: 'Enterprise Corporations, Multi-Brand Groups, Large Agencies',
    ctaText: "Let's Talk",
    timeline: 'Custom dedicated team agreement & continuous production pipeline',
    support: '24/7 Account Director & SLA Guarantees',
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
        title: '🎬 Custom Production Volume',
        description: 'Tailored video and design production volume built for enterprise scale across multiple channels.'
      },
      {
        icon: <Palette className="text-[#FF3B2F]" size={20} />,
        title: '👥 Dedicated Creative Team',
        description: 'Dedicated team of senior video editors, graphic designers, copywriters, and account managers.'
      },
      {
        icon: <PenTool className="text-[#FF3B2F]" size={20} />,
        title: '🧠 Marketing Consultation',
        description: 'CMO-level strategy, campaign ROI tracking, and executive performance dashboards.'
      },
      {
        icon: <Bot className="text-[#FF3B2F]" size={20} />,
        title: '🤖 AI Content Strategy',
        description: 'Custom AI asset generation and automated video rendering pipelines built exclusively for your brand.'
      },
      {
        icon: <Zap className="text-[#FF3B2F]" size={20} />,
        title: '⚡ Priority Execution & SLAs',
        description: 'Guaranteed turnaround times backed by formal Service Level Agreements (SLAs).'
      },
      {
        icon: <MessageSquare className="text-[#FF3B2F]" size={20} />,
        title: '🤝 Long-Term Partnership',
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
    <section id="plans" className="py-20 sm:py-28 bg-[#0B0B0B] text-white relative overflow-hidden">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF3B2F_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#FF3B2F]/15 border border-[#FF3B2F]/40 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#FF5547] mb-5 shadow-[0_0_12px_rgba(255,59,47,0.25)]"
          >
            <Sparkles size={14} className="text-[#FF5547] animate-pulse" />
            <span>TRANSPARENT VALUE PACKAGES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-[0.98] mb-5"
          >
            MONTHLY CREATIVE <br />
            <span className="text-[#FF3B2F] drop-shadow-[0_0_20px_rgba(255,59,47,0.4)]">POWER PACKAGES</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-neutral-400 font-semibold max-w-2xl mx-auto leading-relaxed"
          >
            Realistic, profitable content systems designed for startups and growing businesses. Select a package to inspect full deliverables.
          </motion.p>
        </div>

        {/* 5 Plans Grid - Apple x Framer clean, spacious visual cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-20">
          {plansData.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className={`relative rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.highlight
                  ? 'bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-2 border-[#FF3B2F] shadow-[0_0_30px_rgba(255,59,47,0.3)] scale-[1.02] lg:-translate-y-2 z-20'
                  : 'bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Most Popular Choice Badge */}
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF3B2F] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_12px_rgba(255,59,47,0.8)] border border-white/20 whitespace-nowrap flex items-center gap-1.5">
                  <Star size={11} className="fill-white" /> MOST POPULAR CHOICE
                </div>
              )}

              <div>
                {/* Plan Badge Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#FF5547] bg-[#FF3B2F]/10 border border-[#FF3B2F]/30 px-3 py-1 rounded-full">
                    {pkg.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white mb-2">
                  {pkg.name}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-neutral-400 mb-6 min-h-[38px] leading-relaxed">
                  {pkg.tagline}
                </p>

                {/* Clean, Refined Pricing Typography (Linear / Framer / Apple style) */}
                <div className="mb-6 pb-6 border-b border-neutral-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      {pkg.period}
                    </span>
                  </div>
                </div>

                {/* Quick Feature Bullet Checklist */}
                <ul className="space-y-3 mb-8">
                  {pkg.quickFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-neutral-300 leading-snug">
                      <CheckCircle2 size={16} className="text-[#FF5547] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenPlan(pkg)}
                className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm ${
                  pkg.highlight
                    ? 'bg-[#FF3B2F] text-white hover:bg-[#E02D21] shadow-[0_0_15px_rgba(255,59,47,0.4)] active:scale-95'
                    : 'bg-white text-black hover:bg-neutral-200 active:scale-95'
                }`}
              >
                <span>{pkg.ctaText}</span>
                <ArrowUpRight size={16} className="stroke-[3]" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Standalone Project Banner */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white p-8 sm:p-10 rounded-[2rem] text-center max-w-4xl mx-auto border border-[#FF3B2F]/40 shadow-[0_0_25px_rgba(255,59,47,0.2)]">
          <h3 className="text-xl sm:text-3xl font-display font-black uppercase tracking-tight mb-3">
            NEED A STANDALONE <span className="text-[#FF3B2F]">ONE-TIME PROJECT?</span>
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-neutral-400 max-w-xl mx-auto mb-6 leading-relaxed">
            Start with a single reel, startup landing page, or graphic creative before subscribing to a full monthly plan.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF3B2F] text-white rounded-xl font-extrabold text-xs uppercase tracking-wider hover:bg-[#E02D21] transition-all shadow-[4px_4px_0px_#FFF] active:scale-95"
          >
            <span>EXPLORE INDIVIDUAL SERVICES</span>
            <ArrowUpRight size={16} className="stroke-[3]" />
          </Link>
        </div>

      </div>

      {/* FULLSCREEN / MOBILE BOTTOM SHEET POPUP MODAL */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-6 overflow-hidden">
            
            {/* Dark Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Window Container */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-neutral-950 border-t-2 md:border-2 border-[#FF3B2F]/50 md:rounded-[2.5rem] rounded-t-[2.5rem] shadow-[0_0_50px_rgba(255,59,47,0.3)] max-h-[92vh] md:max-h-[88vh] flex flex-col z-10 overflow-hidden text-left"
            >
              
              {/* Sticky Top Header Bar */}
              <div className="p-5 sm:p-6 bg-neutral-900/90 backdrop-blur-lg border-b border-neutral-800 flex items-center justify-between sticky top-0 z-20">
                {/* Back Button */}
                <button
                  onClick={handleCloseModal}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-full border border-neutral-700 transition-all hover:border-[#FF3B2F]"
                >
                  <ArrowLeft size={16} className="text-[#FF5547]" />
                  <span>← Back</span>
                </button>

                {/* Package Badge */}
                <div className="inline-flex items-center gap-2 bg-[#FF3B2F]/20 border border-[#FF3B2F]/50 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#FF5547]">
                  <span>{selectedPlan.badge}</span>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
                
                {/* Title & Pricing Header */}
                <div className="border-b border-neutral-800 pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4">
                    <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
                      {selectedPlan.name}
                    </h2>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-display font-black text-[#FF5547]">
                        {selectedPlan.price}
                      </span>
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        {selectedPlan.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-neutral-300 leading-relaxed max-w-3xl mb-4">
                    <strong className="text-[#FF5547]">Target Audience:</strong> {selectedPlan.targetAudience}
                  </p>

                  {/* Best Suited Business Types */}
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                    <Users size={16} className="text-[#FF5547]" />
                    <span><strong>Best Suited For:</strong> {selectedPlan.suitedFor}</span>
                  </div>
                </div>

                {/* Grid of Key Modal Specs (Timeline, Support, Revision Policy) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-start gap-3">
                    <Clock size={20} className="text-[#FF5547] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-0.5">
                        EXPECTED TIMELINE
                      </div>
                      <div className="text-xs font-bold text-white">
                        {selectedPlan.timeline}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-start gap-3">
                    <MessageSquare size={20} className="text-[#FF5547] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-0.5">
                        SUPPORT INCLUDED
                      </div>
                      <div className="text-xs font-bold text-white">
                        {selectedPlan.support}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-start gap-3">
                    <RotateCcw size={20} className="text-[#FF5547] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-0.5">
                        REVISION POLICY
                      </div>
                      <div className="text-xs font-bold text-white">
                        {selectedPlan.revisionPolicy}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Value Proposition */}
                <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl flex items-start gap-4">
                  <Zap className="text-[#FF5547] flex-shrink-0 mt-1" size={22} />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">
                      PACKAGE PURPOSE & VALUE
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                      {selectedPlan.valueProposition}
                    </div>
                  </div>
                </div>

                {/* Detailed Deliverables Breakdown */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF5547] mb-6">
                    <Sparkles size={16} />
                    <span>FULL DELIVERABLES BREAKDOWN</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPlan.deliverables.map((item, i) => (
                      <div 
                        key={i} 
                        className="p-4 sm:p-5 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-[#FF3B2F]/40 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-black rounded-xl border border-neutral-800">
                            {item.icon}
                          </div>
                          <h4 className="text-sm sm:text-base font-display font-black uppercase tracking-tight text-white">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs font-medium text-neutral-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-neutral-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#FF5547]" />
                    <span>Transparent Pricing & No Hidden Fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-[#FF5547]" />
                    <span>Dedicated Frame2Byte Creative Team</span>
                  </div>
                </div>

              </div>

              {/* Sticky Footer CTA */}
              <div className="p-5 sm:p-6 bg-neutral-900/90 backdrop-blur-lg border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                    READY TO START WITH {selectedPlan.name.toUpperCase()}?
                  </div>
                  <div className="text-xs font-semibold text-neutral-200">
                    Connect with Frame2Byte to get started.
                  </div>
                </div>

                <button
                  onClick={scrollToContact}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#FF3B2F] text-white rounded-xl font-extrabold text-xs uppercase tracking-wider hover:bg-[#E02D21] transition-all shadow-[0_0_20px_rgba(255,59,47,0.5)] active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span>Contact Frame2Byte</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
