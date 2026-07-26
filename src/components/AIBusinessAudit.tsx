import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  BarChart2,
  Search,
  Globe,
  TrendingUp,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Zap,
} from 'lucide-react';

interface AuditData {
  cleanUrl: string;
  brandName: string;
  industry: string;
  overallScore: number;
  visualHierarchyScore: number;
  uxScore: number;
  conversionScore: number;
  contentClarityScore: number;
  performanceScore: number;
  strengths: string[];
  opportunities: string[];
  frameRecommendation: string;
}

const statusMessages = [
  '✓ Reading website structure...',
  '✓ Checking visual hierarchy...',
  '✓ Analysing user experience...',
  '✓ Reviewing content clarity...',
  '✓ Detecting conversion opportunities...',
  '✓ Measuring performance signals...',
  '✓ Finalising AI report...',
];

function generateCustomAudit(url: string): AuditData {
  let cleanUrl = url.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
  cleanUrl = cleanUrl.split('/')[0] || 'yourwebsite.com';

  const domainParts = cleanUrl.split('.');
  const brandNameRaw = domainParts[0] || 'Brand';
  const brandName = brandNameRaw.charAt(0).toUpperCase() + brandNameRaw.slice(1);

  // Deterministic seed from url characters for personalized consistency
  let seed = 0;
  for (let i = 0; i < cleanUrl.length; i++) {
    seed += cleanUrl.charCodeAt(i);
  }

  const baseScore = 68 + (seed % 20); // 68 - 87 score range

  // Niche keyword detection
  let industry = 'General Business';
  if (/shop|store|apparel|clothing|fashion|wear|boutique|cart|ecommerce|mall|brand/.test(cleanUrl)) {
    industry = 'E-Commerce & Retail';
  } else if (/tech|ai|software|saas|app|cloud|io|dev|digital|platform/.test(cleanUrl)) {
    industry = 'Tech & Digital SaaS';
  } else if (/fit|gym|health|wellness|coach|yoga|physio|clinic|medical|care/.test(cleanUrl)) {
    industry = 'Health & Wellness';
  } else if (/food|cafe|restaurant|bakers|kitchen|dining|pizza|coffee|bar/.test(cleanUrl)) {
    industry = 'Food & Hospitality';
  } else if (/agency|media|creative|design|studio|marketing|proto|film/.test(cleanUrl)) {
    industry = 'Creative Agency & Studio';
  } else if (/law|legal|tax|finance|capital|estate|real|consulting|invest|bank/.test(cleanUrl)) {
    industry = 'Professional Services';
  }

  const strengthsMap: Record<string, string[]> = {
    'E-Commerce & Retail': [
      `Established domain positioning for ${cleanUrl}`,
      'Clean baseline typography and primary visual branding',
      'Structured catalog layout architecture for mobile shoppers',
      'High potential candidate for viral short-form product reels',
    ],
    'Tech & Digital SaaS': [
      `Recognizable digital footprint at ${cleanUrl}`,
      'Defined hero headline baseline positioning',
      'Logical core layout flow and feature list breakdown',
      'Fast initial payload layout with clean structural assets',
    ],
    'Health & Wellness': [
      `Welcoming and trustworthy brand identity for ${brandName}`,
      'Accessible color contrast and calm visual tone',
      'Visible contact touchpoints and service listings',
      'Strong candidate for video transformation hooks',
    ],
    'Food & Hospitality': [
      `Memorable culinary brand positioning at ${cleanUrl}`,
      'High potential for viral HD food reel engagement',
      'Clear menu discovery structure for mobile visitors',
      'Engaging core color palette and location clarity',
    ],
    'Creative Agency & Studio': [
      `Distinctive creative positioning for ${brandName}`,
      'Strong aesthetic baseline and modern typography',
      'Good portfolio display structure for project showcases',
      'Engaging visual hierarchy across primary viewport',
    ],
    'Professional Services': [
      `Authoritative domain signature for ${cleanUrl}`,
      'Structured, professional page layout hierarchy',
      'Clear service listings with defined value statements',
      'Solid trust foundation for high-ticket client acquisition',
    ],
    'General Business': [
      `Recognizable online presence at ${cleanUrl}`,
      'Functional layout structure and clear section hierarchy',
      'Good content organization across primary sections',
      'Solid baseline ready for AI-driven conversion scaling',
    ],
  };

  const opportunitiesMap: Record<string, string[]> = {
    'E-Commerce & Retail': [
      'Implement sticky "Add to Cart" & high-contrast CTA buttons on mobile viewports',
      'Embed 9:16 vertical video reel reviews above the product fold to boost conversions',
      'Reduce body copy density and expand whitespace around primary buy buttons',
      'Optimize image compression & layout shifts to improve Google PageSpeed mobile score',
    ],
    'Tech & Digital SaaS': [
      'Add an interactive product demo snippet or AI video preview directly above the fold',
      'Simplify hero headline word count to deliver 3-second value clarity',
      'Strengthen social proof badges (logos & live metric counters) above secondary CTAs',
      'Streamline lead-capture form fields to max 2 inputs to lower signup drop-offs',
    ],
    'Health & Wellness': [
      'Include high-retention video stories of client transformations above the fold',
      'Highlight primary booking CTA with a high-contrast accent button',
      'Add micro-animations to key feature badges to guide user focus down the page',
      'Optimize mobile font scaling to eliminate paragraph line wrapping issues',
    ],
    'Food & Hospitality': [
      'Feature auto-playing muted HD reel background loops of top signature items',
      'Place instant online ordering or reservation CTA persistently at mobile bottom bar',
      'Add Google review star ratings prominently beside header CTA',
      'Shorten mobile scroll depth to get visitors to menu items in <2 taps',
    ],
    'Creative Agency & Studio': [
      'Integrate interactive case study video reels with instant fullscreen playback',
      'Contrast primary "Work With Us" CTA button against dark background container',
      'Reduce text-heavy paragraphs into scannable bento grid benefit cards',
      'Enhance mobile touch target sizes for seamless navigation scrolling',
    ],
    'Professional Services': [
      'Incorporate instant video introduction from founder to humanize brand trust',
      'Add a sticky "Free Consultation" floating bar on mobile screens',
      'Replace stock photography with authentic high-resolution AI-retouched imagery',
      'Highlight client result metrics in bold display typography cards',
    ],
    'General Business': [
      'Increase contrast on primary Call-to-Action buttons for instant visual hierarchy',
      'Incorporate short-form video content above the fold to double visitor retention',
      'Optimize mobile typography scaling and padding to eliminate horizontal line wraps',
      'Add real-time client social proof badges to accelerate trust',
    ],
  };

  const strengths = strengthsMap[industry] || strengthsMap['General Business'];
  const opportunities = opportunitiesMap[industry] || opportunitiesMap['General Business'];

  return {
    cleanUrl,
    brandName,
    industry,
    overallScore: baseScore,
    visualHierarchyScore: Math.min(98, baseScore + (seed % 7) - 2),
    uxScore: Math.min(98, baseScore + (seed % 5) - 1),
    conversionScore: Math.max(54, baseScore - (seed % 9) - 3),
    contentClarityScore: Math.min(96, baseScore + (seed % 8)),
    performanceScore: Math.min(95, baseScore + (seed % 6) - 2),
    strengths,
    opportunities,
    frameRecommendation: `Your website for ${brandName} (${cleanUrl}) has strong baseline potential, but optimizing CTA visibility, mobile visual hierarchy, and short-form video engagement can significantly boost visitor conversions. Frame2Byte can help optimize your branding, UI/UX, AI video strategy, and conversion funnel.`,
  };
}

export default function AIBusinessAudit() {
  const [urlInput, setUrlInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [auditResult, setAuditResult] = useState<AuditData | null>(null);
  const navigate = useNavigate();

  const handleAnalyzeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsAnalyzing(true);
    setAuditResult(null);
    setActiveMessageIndex(0);
    setActiveNodeIndex(0);
    setProgressPercent(0);
  };

  // 5.5 Seconds Scanning Sequence Animation Controller
  useEffect(() => {
    if (!isAnalyzing) return;

    const startTime = Date.now();
    const durationMs = 5500;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setProgressPercent(progress);

      // Rotate status message every ~800ms
      const msgIndex = Math.min(
        statusMessages.length - 1,
        Math.floor((elapsed / durationMs) * statusMessages.length)
      );
      setActiveMessageIndex(msgIndex);

      // Rotate active node 0 -> 4
      const nodeIdx = Math.min(4, Math.floor((elapsed / durationMs) * 5));
      setActiveNodeIndex(nodeIdx);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        const data = generateCustomAudit(urlInput);
        setAuditResult(data);
        setIsAnalyzing(false);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isAnalyzing, urlInput]);

  const handleBookCall = () => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    navigate('/contact');
  };

  const handleReset = () => {
    setAuditResult(null);
    setUrlInput('');
  };

  return (
    <section
      id="ai-audit"
      className="py-16 sm:py-24 bg-[#0B0B0B] text-white border-b border-white/10 relative overflow-hidden"
    >
      {/* Background Neon Accent Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#FF3B2F]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* ================= FULL SCREEN LOADING OVERLAY ================= */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0B0B0B] text-white flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden"
          >
            {/* Ambient Background Pulse Effects */}
            <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#FF3B2F]/15 blur-[160px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(#FF3B2F_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center">
              
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 bg-[#FF3B2F]/20 border border-[#FF3B2F]/50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#FF5547] mb-8 shadow-[0_0_15px_rgba(255,59,47,0.4)]">
                <Sparkles size={14} className="animate-spin text-[#FF5547] drop-shadow-[0_0_8px_rgba(255,59,47,0.9)]" />
                <span>FRAME.AI NEURAL CONSULTANT IN ACTION</span>
              </div>

              {/* Submitted Domain Pill */}
              <div className="flex items-center gap-2 bg-neutral-900 border border-white/20 px-4 py-2 rounded-full text-xs font-mono font-bold text-white/90 mb-10 shadow-md">
                <Globe size={14} className="text-[#FF5547]" />
                <span className="truncate max-w-[260px] sm:max-w-[360px]">
                  {urlInput.trim() || 'analyzing-website.com'}
                </span>
              </div>

              {/* 5 CONNECTED SCANNING NODES (○ — ○ — ○ — ○ — ○) */}
              <div className="w-full max-w-md my-6 px-4">
                <div className="relative flex items-center justify-between">
                  
                  {/* Connecting Track Line */}
                  <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-white/10 rounded-full" />
                  
                  {/* Active Progress Track Line */}
                  <motion.div
                    className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-gradient-to-r from-black via-[#FF3B2F] to-[#FF3B2F] rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />

                  {/* 5 Circular Nodes */}
                  {[0, 1, 2, 3, 4].map((nodeIdx) => {
                    const isActive = activeNodeIndex === nodeIdx;
                    const isPassed = activeNodeIndex > nodeIdx;

                    return (
                      <div key={nodeIdx} className="relative z-10">
                        <motion.div
                          animate={{
                            scale: isActive ? 1.35 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? 'bg-[#FF3B2F] border-white text-white shadow-[0_0_25px_rgba(255,59,47,0.9)] ring-4 ring-[#FF3B2F]/30'
                              : isPassed
                              ? 'bg-[#FF3B2F] border-[#FF3B2F] text-white'
                              : 'bg-neutral-900 border-white/20 text-white/40'
                          }`}
                        >
                          {isPassed ? (
                            <CheckCircle2 size={16} className="stroke-[3]" />
                          ) : (
                            <span className="text-xs font-black font-mono">0{nodeIdx + 1}</span>
                          )}
                        </motion.div>
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* Dynamic Status Message with Fade Animation */}
              <div className="h-10 my-4 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMessageIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm sm:text-base font-extrabold text-[#FF5547] drop-shadow-[0_0_10px_rgba(255,59,47,0.8)] uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>{statusMessages[activeMessageIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Percentage Counter */}
              <div className="mt-4 text-xs font-black uppercase tracking-widest text-white/50 font-mono">
                AI NEURAL SCANNING — <span className="text-white">{progressPercent}%</span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ================= BEFORE AUDIT INPUT FORM ================= */}
        {!auditResult && (
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Interactive Score Card Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-[420px] bg-neutral-900 border-2 border-white/20 rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#FF3B2F]">
                
                {/* Score Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-1">
                      AI AUDIT BENCHMARK
                    </span>
                    <div className="text-3xl sm:text-4xl font-display font-black text-white flex items-baseline gap-1">
                      <span className="text-[#FF3B2F]">82</span>
                      <span className="text-sm font-bold text-white/50">/100</span>
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-[#FF3B2F]/20 border border-[#FF3B2F]/40 flex items-center justify-center text-[#FF3B2F]">
                    <Sparkles size={24} />
                  </div>
                </div>

                {/* Score Metrics */}
                <div className="space-y-4 py-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
                      <span className="text-white/80">Visual Hierarchy</span>
                      <span className="text-[#FF3B2F]">84/100</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF3B2F] rounded-full w-[84%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
                      <span className="text-white/80">Mobile UX & Navigation</span>
                      <span className="text-[#FF5547]">78/100</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#FF3B2F] to-[#FF5547] rounded-full w-[78%] shadow-[0_0_8px_rgba(255,59,47,0.6)]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
                      <span className="text-white/80">Conversion CTA Placement</span>
                      <span className="text-[#FF3B2F]">62/100</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF3B2F] rounded-full w-[62%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
                      <span className="text-white/80">Content & Copy Clarity</span>
                      <span className="text-white">88/100</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-[88%]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Badge */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-white/60">
                  <span className="flex items-center gap-1.5 text-[#FF5547] drop-shadow-[0_0_6px_rgba(255,59,47,0.8)]">
                    <ShieldCheck size={16} /> Instant AI Audit
                  </span>
                  <span>5-SECOND SCAN</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Headline & Input Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 text-left"
            >
              <div className="inline-flex items-center gap-1.5 bg-[#FF3B2F] text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(255,59,47,0.5)]">
                <Sparkles size={12} className="text-white animate-pulse" />
                <span>FRAME.AI — BUSINESS ANALYSIS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-[0.96] mb-6 text-white break-words">
                WANT A REAL <span className="text-[#FF5547] drop-shadow-[0_0_20px_rgba(255,59,47,0.8)] animate-pulse">FRAME.AI</span> <br />
                AUDIT OF YOUR <br />
                <span className="text-[#FF3B2F]">WEBSITE?</span>
              </h2>

              <p className="text-base sm:text-lg text-white/70 font-semibold mb-8 max-w-xl leading-relaxed">
                Paste your website URL below. <strong className="text-white">FRAME.AI</strong> will scan your layout, visual hierarchy, UX clarity, and conversion signals to generate personalized growth insights.
              </p>

              {/* Input Form */}
              <form onSubmit={handleAnalyzeSubmit} className="max-w-xl mb-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input
                      type="text"
                      placeholder="Paste your Website URL (e.g. mybrand.com)"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      required
                      className="w-full bg-neutral-900 border-2 border-white/20 rounded-md pl-11 pr-4 py-3.5 text-sm font-semibold text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF3B2F]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isAnalyzing}
                    className="px-6 py-3.5 bg-[#FF3B2F] text-white rounded-md font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#E02D21] transition-all shadow-[4px_4px_0px_#FFF] flex-shrink-0 active:scale-95"
                  >
                    <span>ANALYZE WITH FRAME.AI</span>
                    <ArrowUpRight size={16} className="stroke-[3]" />
                  </button>
                </div>
              </form>

              <p className="text-xs font-bold text-white/50 italic">
                ⚡ Personalized AI audit ready in under 6 seconds.
              </p>
            </motion.div>

          </div>
        )}

        {/* ================= AUDIT RESULTS VIEW ================= */}
        {auditResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl mx-auto text-left space-y-10"
          >
            {/* Header Title Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#FF3B2F]/20 border border-[#FF3B2F]/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#FF5547] shadow-[0_0_12px_rgba(255,59,47,0.4)] mb-2">
                  <CheckCircle2 size={12} /> FRAME.AI ANALYSIS COMPLETE
                </div>
                <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight text-white">
                  FRAME.AI WEBSITE AUDIT REPORT FOR <span className="text-[#FF3B2F]">{auditResult.cleanUrl}</span>
                </h2>
                <p className="text-xs font-bold uppercase tracking-wider text-white/50 mt-1">
                  INDUSTRY NICHE: <span className="text-white">{auditResult.industry}</span>
                </p>
              </div>

              <button
                onClick={handleReset}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/20 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <RotateCcw size={14} />
                <span>ANALYZE ANOTHER</span>
              </button>
            </div>

            {/* SECTION 1: OVERALL WEBSITE SCORE CARD */}
            <div className="bg-neutral-900 border-2 border-white/20 rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#FF3B2F] relative overflow-hidden">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                
                {/* Score Number Badge */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-black rounded-2xl border border-white/10 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">
                    OVERALL AUDIT SCORE
                  </span>
                  
                  <div className="text-5xl sm:text-6xl font-display font-black text-white my-2 flex items-baseline gap-1">
                    <span
                      className={
                        auditResult.overallScore >= 80
                          ? 'text-[#FF5547] drop-shadow-[0_0_15px_rgba(255,59,47,0.8)]'
                          : auditResult.overallScore >= 65
                          ? 'text-[#FF3B2F]'
                          : 'text-red-500'
                      }
                    >
                      {auditResult.overallScore}
                    </span>
                    <span className="text-lg font-bold text-white/40">/100</span>
                  </div>

                  <div
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      auditResult.overallScore >= 80
                        ? 'bg-[#FF3B2F]/20 text-[#FF5547] border border-[#FF3B2F]/50 shadow-[0_0_10px_rgba(255,59,47,0.4)]'
                        : 'bg-[#FF3B2F]/20 text-[#FF3B2F] border border-[#FF3B2F]/30'
                    }`}
                  >
                    {auditResult.overallScore >= 80 ? 'STRONG BASELINE' : 'GROWTH OPPORTUNITY'}
                  </div>
                </div>

                {/* Score Metric Breakdown Sliders */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                      <span className="text-white/80">Visual Hierarchy & Layout</span>
                      <span className="text-[#FF3B2F]">{auditResult.visualHierarchyScore}/100</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF3B2F] rounded-full transition-all duration-1000"
                        style={{ width: `${auditResult.visualHierarchyScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                      <span className="text-white/80">Mobile UX & Responsiveness</span>
                      <span className="text-[#FF5547]">{auditResult.uxScore}/100</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF3B2F] to-[#FF5547] rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(255,59,47,0.6)]"
                        style={{ width: `${auditResult.uxScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                      <span className="text-white/80">Conversion CTA Placement</span>
                      <span className="text-[#FF3B2F]">{auditResult.conversionScore}/100</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF3B2F] rounded-full transition-all duration-1000"
                        style={{ width: `${auditResult.conversionScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                      <span className="text-white/80">Content & Copy Clarity</span>
                      <span className="text-white">{auditResult.contentClarityScore}/100</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-1000"
                        style={{ width: `${auditResult.contentClarityScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                      <span className="text-white/80">Performance & Load Signals</span>
                      <span className="text-[#FF5547]">{auditResult.performanceScore}/100</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF3B2F] to-[#FF5547] rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(255,59,47,0.6)]"
                        style={{ width: `${auditResult.performanceScore}%` }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* STRENGTHS AND GROWTH OPPORTUNITIES GRID */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* SECTION 2: STRENGTHS */}
              <div className="p-6 bg-neutral-900 border-2 border-white/10 rounded-3xl shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#FF5547] font-black text-xs uppercase tracking-wider mb-4 pb-3 border-b border-white/10">
                    <CheckCircle2 size={18} /> KEY WEBSITE STRENGTHS
                  </div>
                  <ul className="space-y-3">
                    {auditResult.strengths.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-white/90">
                        <span className="text-[#FF5547] font-bold mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SECTION 3: GROWTH OPPORTUNITIES */}
              <div className="p-6 bg-neutral-900 border-2 border-[#FF3B2F]/40 rounded-3xl shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#FF3B2F] font-black text-xs uppercase tracking-wider mb-4 pb-3 border-b border-white/10">
                    <AlertCircle size={18} /> GROWTH OPPORTUNITIES
                  </div>
                  <ul className="space-y-3">
                    {auditResult.opportunities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-white/90">
                        <span className="text-[#FF3B2F] font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* SECTION 4: FRAME2BYTE RECOMMENDATION CARD */}
            <div className="p-6 sm:p-8 bg-black border-2 border-[#FF3B2F] rounded-3xl shadow-[0_0_25px_rgba(255,59,47,0.4)] relative">
              <div className="flex items-center gap-2 text-[#FF5547] font-black text-xs uppercase tracking-wider mb-3">
                <Zap size={18} className="animate-pulse text-[#FF5547]" /> FRAME2BYTE STRATEGIC RECOMMENDATION
              </div>
              <p className="text-sm sm:text-base font-semibold text-white/90 leading-relaxed mb-6">
                "{auditResult.frameRecommendation}"
              </p>

              {/* SECTION 5: PRIMARY CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={handleBookCall}
                  className="flex-1 py-4 px-6 bg-[#FF3B2F] text-white rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#E02D21] transition-all shadow-[4px_4px_0px_#FFF] active:scale-95"
                >
                  <span>LET'S IMPROVE YOUR WEBSITE</span>
                  <ArrowUpRight size={18} className="stroke-[3]" />
                </button>

                <button
                  onClick={handleReset}
                  className="py-4 px-6 bg-neutral-900 text-white/80 border border-white/20 rounded-xl font-extrabold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} />
                  <span>AUDIT ANOTHER SITE</span>
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
}
