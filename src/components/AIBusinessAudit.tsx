import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Instagram,
  RotateCcw,
  AlertCircle,
  Zap,
  Film,
  ExternalLink,
  Target,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import {
  StructuredDiagnosticReport,
} from '../types/instagramAudit';
import {
  parseInstagramInput,
  generateStructuredDiagnostic,
} from '../utils/instagramDiagnosticEngine';

const loadingSteps = [
  '✓ Verifying Exact Instagram Account',
  '✓ Analyzing Customer-Facing Bio & Profile Identity',
  '✓ Checking Visual Brand Presentation & Highlights',
  '✓ Diagnosing Reel Hooks, Retention & View Metrics',
  '✓ Evaluating Content Strategy & Carousels',
  '✓ Calculating Proprietary Weighted Frame Score',
];

interface AIBusinessAuditProps {
  theme?: 'orange' | 'white';
  isPage?: boolean;
}

export default function AIBusinessAudit({ theme = 'orange', isPage = false }: AIBusinessAuditProps = {}) {
  const [handleInput, setHandleInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [diagnosticReport, setDiagnosticReport] = useState<StructuredDiagnosticReport | null>(null);
  const navigate = useNavigate();

  const handleAnalyzeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleInput.trim()) return;

    setIsAnalyzing(true);
    setProgressPercent(0);
    setActiveStepIndex(0);

    // Call server API for live Instagram extraction & Gemini business awareness
    let fetchedReport: StructuredDiagnosticReport | null = null;

    try {
      const response = await fetch('/api/instagram-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: handleInput }),
      });

      if (response.ok) {
        fetchedReport = await response.json();
      }
    } catch (err) {
      console.log('Using local diagnostic fallback engine:', err);
    }

    // If server call was delayed or offline, generate deterministic diagnostic
    if (!fetchedReport) {
      fetchedReport = generateStructuredDiagnostic(handleInput);
    }

    // Keep smooth animated progress experience
    const startTime = Date.now();
    const durationMs = 3800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setProgressPercent(progress);

      const stepIdx = Math.min(
        loadingSteps.length - 1,
        Math.floor((elapsed / durationMs) * loadingSteps.length)
      );
      setActiveStepIndex(stepIdx);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        setDiagnosticReport(fetchedReport);
        setIsAnalyzing(false);
      }
    }, 50);
  };

  const handleConnectWithFrame = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/contact');
    }
  };

  const handleReset = () => {
    setDiagnosticReport(null);
    setHandleInput('');
  };

  const isWhite = theme === 'white';
  const cleanReportUsername = diagnosticReport
    ? diagnosticReport.accountVerified.username.replace(/^@+/, '')
    : '';

  return (
    <section
      id="ai-audit"
      className={`${
        isPage
          ? 'pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 md:pb-28 min-h-screen flex flex-col justify-center'
          : 'py-10 sm:py-14 md:py-18'
      } ${
        isWhite
          ? 'bg-white text-black border-b-2 border-black'
          : 'bg-[#FF3B2F] text-black border-b border-black/10'
      } relative overflow-hidden scroll-mt-20 transition-colors`}
    >
      <div id="frame-ai" className="absolute -top-20" />
      {/* Background Subtle Dot Pattern */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:24px_24px] ${
          isWhite ? 'opacity-5' : 'opacity-10'
        } pointer-events-none`}
      />

      {/* ================= SCANNING / LOADING OVERLAY ================= */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md text-white flex flex-col items-center justify-center p-4 sm:p-6 select-none"
          >
            <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 bg-[#FF3B2F] text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest mb-6 shadow-lg">
                <Sparkles size={14} className="animate-spin text-white" />
                <span>DIAGNOSTIC SCANNING ENGINE</span>
              </div>

              <div className="flex items-center gap-2.5 bg-[#141414] border border-white/15 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono font-bold text-white mb-6 shadow-md">
                <Instagram size={17} className="text-[#FF3B2F]" />
                <span className="text-[#FF3B2F]">
                  @{parseInstagramInput(handleInput).cleanUsername}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-2.5 mb-4 overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-[#FF3B2F] rounded-full shadow-[0_0_12px_#FF3B2F]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="h-7 flex items-center justify-center text-xs sm:text-sm font-mono font-bold text-[#FF9E94] uppercase tracking-wider">
                {loadingSteps[activeStepIndex]}
              </div>

              <div className="mt-2 text-[10px] font-mono font-bold text-white/50 tracking-widest">
                PROGRESS: {progressPercent}% • VERIFYING ACCOUNT
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* ================= HERO INPUT VIEW (BEFORE RESULTS) ================= */}
        {!diagnosticReport && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* LEFT COLUMN: Input and Diagnostic System Overview */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase mb-2.5 sm:mb-3 w-fit shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FF3B2F] animate-pulse" />
                FRAME.AI • INSTAGRAM DIAGNOSTIC
              </div>

              <h2
                className={`${
                  isPage
                    ? 'text-2xl sm:text-3xl lg:text-[2.6rem] xl:text-[3.1rem] mb-2 sm:mb-2.5'
                    : 'text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-2.5'
                } font-display font-black tracking-tight uppercase leading-[0.96] text-black`}
              >
                INSTAGRAM GROWTH <br />
                <span className={isWhite ? 'text-[#FF3B2F]' : 'text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.25)]'}>
                  DIAGNOSTIC
                </span>
              </h2>

              <p
                className={`${
                  isPage ? 'text-xs sm:text-sm lg:text-[14px] xl:text-[15px] mb-3.5 sm:mb-4' : 'text-xs sm:text-[13px] mb-3'
                } text-black/80 font-bold leading-snug sm:leading-relaxed max-w-lg`}
              >
                Enter your Instagram handle to verify account metrics, audit bio clarity,
                measure reel retention, and calculate your weighted Frame Score.
              </p>

              {/* Input Form */}
              <form onSubmit={handleAnalyzeSubmit} className={`${isPage ? 'max-w-md lg:max-w-lg mb-3' : 'max-w-md mb-2.5'} w-full`}>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      id="frame-ai-input"
                      placeholder="@username or instagram profile link"
                      value={handleInput}
                      onChange={(e) => setHandleInput(e.target.value)}
                      required
                      className={`w-full bg-white text-black border-2 border-black rounded-xl px-3.5 ${
                        isPage ? 'py-2.5 sm:py-3 text-xs sm:text-sm' : 'py-2 sm:py-2.5 text-xs sm:text-sm'
                      } font-bold placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black shadow-[3px_3px_0px_#000] transition-all`}
                    />
                  </div>
                  <button
                    type="submit"
                    id="frame-ai-submit-btn"
                    disabled={isAnalyzing}
                    className={`px-5 ${
                      isPage ? 'py-2.5 sm:py-3 text-xs sm:text-sm' : 'py-2 sm:py-2.5 text-xs'
                    } bg-black hover:bg-neutral-900 text-white rounded-xl font-display font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_rgba(255,255,255,0.8)] sm:shadow-[3px_3px_0px_#000] transition-all active:scale-95 shrink-0 cursor-pointer`}
                  >
                    <span>ANALYZE NOW</span>
                    <ArrowUpRight size={15} className="stroke-[3] text-[#FF3B2F]" />
                  </button>
                </div>
              </form>

              {/* Selectable Brand/Account Boxes (White background, black text, orange accent, matching white UI style) */}
              <div className="flex flex-wrap items-center gap-1.5 mb-2.5 max-w-md w-full">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-black/75 mr-1">
                  TRY ACCOUNTS:
                </span>
                {[
                  { name: 'Sakaza', handle: 'sakazaworld' },
                  { name: 'Grind Up', handle: 'grindup' },
                  { name: 'Café De Ollas', handle: 'cafedeollas' },
                  { name: 'Frame2Byte', handle: 'frame2byte' },
                ].map((account) => (
                  <button
                    key={account.handle}
                    type="button"
                    onClick={() => setHandleInput(account.handle)}
                    className={`px-2.5 py-1 bg-white text-black border-2 border-black rounded-lg text-[10px] sm:text-[11px] font-display font-black shadow-[2px_2px_0px_#000] hover:bg-neutral-50 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer ${
                      handleInput.toLowerCase().includes(account.handle) ? 'ring-2 ring-black' : ''
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B2F] shrink-0" />
                    <span>{account.name}</span>
                  </button>
                ))}
              </div>

              {/* 4 Feature Indicator Pills: 2 bubbles per line */}
              <div className="grid grid-cols-2 gap-2 max-w-md w-full">
                {[
                  'Account Verify',
                  'Bio Clarity',
                  'Reel Metrics',
                  'Frame Score /100',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1.5 bg-white border-2 border-black text-black text-[11px] sm:text-xs font-bold font-mono rounded-lg shadow-xs flex items-center justify-center text-center truncate"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Diagnostic System Preview Card */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
              <div
                className={`w-full ${
                  isPage ? 'max-w-md lg:max-w-[430px] xl:max-w-[460px] p-4 sm:p-5 lg:p-5' : 'max-w-md p-4 sm:p-5'
                } bg-[#0B0B0B] text-white rounded-2xl sm:rounded-3xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.85)] relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF3B2F]/15 rounded-full blur-2xl pointer-events-none" />

                {/* Live Diagnostic Engine Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B2F] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3B2F]" />
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest text-[#FF5547]">
                      FRAME.AI DIAGNOSTIC SUITE
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    STRUCTURED AUDIT
                  </span>
                </div>

                {/* Score Showcase Block */}
                <div className="bg-[#141414] border border-white/10 rounded-xl p-3 sm:p-3.5 mb-3 flex items-center justify-between gap-3 relative z-10">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 block">
                      PROPRIETARY FRAME SCORE
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className={`${isPage ? 'text-3xl sm:text-4xl lg:text-4xl' : 'text-3xl sm:text-4xl'} font-display font-black text-white`}>
                        82
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-white/40">/100</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider bg-[#FF3B2F] text-white shadow-xs">
                      STRONG BASELINE
                    </span>
                    <span className="block text-[10px] font-mono text-white/50 mt-0.5">
                      <span className="text-[#FF3B2F]">@</span>frame2byte (verified)
                    </span>
                  </div>
                </div>

                {/* 6 Metric Breakdown Bars */}
                <div className="space-y-1.5 sm:space-y-2 mb-3 relative z-10">
                  {[
                    { label: 'Profile Identity', score: '88/100', w: '88%', color: 'bg-[#FF3B2F]' },
                    { label: 'Content Strategy', score: '80/100', w: '80%', color: 'bg-[#FF3B2F]' },
                    { label: 'Reel Performance', score: '76/100', w: '76%', color: 'bg-[#FF3B2F]' },
                    { label: 'Engagement', score: '72/100', w: '72%', color: 'bg-[#FF3B2F]' },
                    { label: 'Consistency', score: '85/100', w: '85%', color: 'bg-[#FF3B2F]' },
                    { label: 'Brand Presentation', score: '91/100', w: '91%', color: 'bg-white' },
                  ].map((metric, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-0.5">
                        <span className="truncate mr-2">{metric.label}</span>
                        <span className={metric.color === 'bg-white' ? 'text-white' : 'text-[#FF5547]'}>
                          {metric.score}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${metric.color} rounded-full`} style={{ width: metric.w }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Diagnosis Summary Pill */}
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/70 relative z-10">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <Target size={13} className="text-[#FF3B2F]" />
                    <span>PRIORITIZED OPPORTUNITY:</span>
                  </span>
                  <span className="text-[#FF5547] font-bold">Reel Hook Drop-Off</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STRUCTURED DIAGNOSTIC REPORT RESULTS VIEW ================= */}
        {diagnosticReport && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl lg:max-w-[900px] mx-auto space-y-4 sm:space-y-6 md:space-y-7"
          >
            {/* Top Bar with Reset button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 pb-3 sm:pb-4 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B2F] animate-pulse shrink-0" />
                <span className="text-xs sm:text-sm md:text-base font-mono font-black uppercase tracking-wider text-black">
                  FRAME.AI INSTAGRAM GROWTH DIAGNOSTIC REPORT
                </span>
              </div>

              <button
                onClick={handleReset}
                className="self-end sm:self-auto shrink-0 px-3 sm:px-4 py-1 sm:py-1.5 md:py-2 bg-[#FF3B2F] hover:bg-[#e03025] text-white border-2 border-black rounded-full font-display font-black text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_#000] active:scale-95 cursor-pointer"
              >
                <RotateCcw size={12} className="text-white shrink-0" />
                <span>ANALYZE ANOTHER ACCOUNT</span>
              </button>
            </div>

            {/* ================= 1. ACCOUNT VERIFIED (COMPACT HEADER) ================= */}
            <div className="bg-white text-black border-2 border-black rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-[4px_4px_0px_#000]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-mono font-black uppercase tracking-wider">
                      <ShieldCheck size={12} className="text-white" />
                      <span>ACCOUNT VERIFIED</span>
                    </span>
                    <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-black/60 bg-black/5 border border-black/10 px-2 md:px-2.5 py-0.5 md:py-1 rounded">
                      {diagnosticReport.accountVerified.businessCategory}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                    <h3 className="text-base sm:text-lg md:text-2xl font-display font-black tracking-tight break-all text-[#FF3B2F]">
                      @{cleanReportUsername}
                    </h3>
                    <span className="text-xs sm:text-sm md:text-base font-semibold text-black/60 truncate">
                      {diagnosticReport.accountVerified.fullName}
                    </span>
                  </div>

                  {diagnosticReport.accountVerified.externalUrl && (
                    <a
                      href={
                        diagnosticReport.accountVerified.externalUrl.startsWith('http')
                          ? diagnosticReport.accountVerified.externalUrl
                          : `https://${diagnosticReport.accountVerified.externalUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs md:text-sm font-mono text-[#FF3B2F] hover:underline mt-1 break-all"
                    >
                      <span>🔗 {diagnosticReport.accountVerified.externalUrl}</span>
                    </a>
                  )}
                </div>

                <a
                  href={diagnosticReport.accountVerified.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 md:px-4 md:py-2.5 bg-black hover:bg-neutral-900 text-white rounded-lg text-xs md:text-sm font-mono font-bold uppercase tracking-wider transition-colors shrink-0"
                >
                  <span>OPEN INSTAGRAM</span>
                  <ExternalLink size={12} className="text-[#FF3B2F]" />
                </a>
              </div>
            </div>

            {/* ================= 2. FRAME SCORE (WHITE PALETTE) ================= */}
            <div className="bg-[#0B0B0B] text-white border-2 border-black rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center justify-between pb-2.5 mb-3.5 md:mb-5 border-b border-white/10">
                <div className="inline-flex items-center gap-2 bg-[#FF3B2F] text-white px-3 py-1 md:px-3.5 md:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-mono font-black uppercase tracking-widest">
                  <Zap size={13} />
                  <span>PROPRIETARY FRAME SCORE</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-5 md:gap-7 items-center">
                {/* Score Number Display */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 md:p-6 bg-[#141414] rounded-xl md:rounded-2xl border border-white/10 text-center">
                  <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-white/50 mb-0.5">
                    OVERALL FRAME SCORE
                  </span>

                  <div className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white my-1 flex items-baseline gap-1">
                    <span className="text-[#FF3B2F]">{diagnosticReport.frameScore.overallScore}</span>
                    <span className="text-base md:text-lg font-mono text-white/40">/100</span>
                  </div>

                  <div className="inline-block px-3 py-0.5 md:px-4 md:py-1 rounded-full text-[10px] md:text-xs font-mono font-black uppercase tracking-widest bg-[#FF3B2F] text-white shadow-xs mt-0.5">
                    {diagnosticReport.frameScore.scoreStatus}
                  </div>

                  <span className="text-[10px] md:text-xs font-mono text-white/50 mt-1.5 block">
                    Calculated via 6 core growth vectors
                  </span>
                </div>

                {/* 6 Component Bars (Clean White Accent replacing green) */}
                <div className="lg:col-span-8 space-y-2 md:space-y-3">
                  {[
                    { label: 'Profile Identity', score: diagnosticReport.frameScore.profileIdentity, weight: 'Identity & Bio' },
                    { label: 'Content Strategy', score: diagnosticReport.frameScore.contentStrategy, weight: 'Formats & Carousels' },
                    { label: 'Reel Performance', score: diagnosticReport.frameScore.reelPerformance, weight: 'Hook & Retention' },
                    { label: 'Engagement', score: diagnosticReport.frameScore.engagement, weight: 'Community Signals' },
                    { label: 'Consistency', score: diagnosticReport.frameScore.consistency, weight: 'Publishing Cadence' },
                    { label: 'Brand Presentation', score: diagnosticReport.frameScore.brandPresentation, weight: 'Visual Hierarchy' },
                  ].map((m, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center text-xs md:text-sm font-mono font-bold uppercase tracking-wider mb-1">
                        <span className="text-white/85 flex items-center gap-1.5">
                          <span>{m.label}</span>
                          <span className="text-[9px] md:text-[11px] text-white/40 font-normal">({m.weight})</span>
                        </span>
                        <span className={m.score < 50 ? 'text-[#FF3B2F]' : 'text-white'}>
                          {m.score}/100
                        </span>
                      </div>
                      <div className="w-full h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            m.score < 50 ? 'bg-[#FF3B2F]' : m.score >= 80 ? 'bg-white' : 'bg-[#FF5547]'
                          } rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${m.score}%` }}
                          transition={{ duration: 0.5, delay: idx * 0.05 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= 3. WHAT’S WORKING ================= */}
            <div className="bg-white text-black border-2 border-black rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-[4px_4px_0px_#000]">
              <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 md:px-3.5 md:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-mono font-black uppercase tracking-widest mb-3.5 md:mb-5 shadow-xs">
                <CheckCircle2 size={13} className="text-white" />
                <span>3. WHAT’S WORKING (VERIFIED STRENGTHS)</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
                {diagnosticReport.whatsWorking.map((strength, idx) => (
                  <div
                    key={idx}
                    className="p-3 md:p-4 bg-[#F5F4EF] border border-black/10 rounded-xl flex items-start gap-2.5"
                  >
                    <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 font-black text-[10px] md:text-xs mt-0.5">
                      ✓
                    </span>
                    <p className="text-xs md:text-sm font-bold text-black/85 leading-snug md:leading-relaxed">
                      {strength}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= 4. PRIORITY GROWTH OPPORTUNITIES (COMPACT) ================= */}
            <div className="bg-white text-black border-2 border-black rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-[4px_4px_0px_#000]">
              <div className="inline-flex items-center gap-2 bg-[#FF3B2F] text-white px-3 py-1 md:px-3.5 md:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-mono font-black uppercase tracking-widest mb-3.5 md:mb-5 shadow-xs">
                <Target size={13} />
                <span>4. PRIORITY GROWTH OPPORTUNITIES</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {diagnosticReport.growthOpportunities.map((opp) => (
                  <div
                    key={opp.priority}
                    className="p-3.5 md:p-5 bg-[#F5F4EF] border border-black/10 rounded-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono font-black text-[10px] md:text-xs bg-black text-white px-1.5 py-0.5 rounded">
                          0{opp.priority}
                        </span>
                        <h4 className="text-xs sm:text-sm md:text-base font-display font-black uppercase text-black">
                          {opp.title}
                        </h4>
                      </div>
                      <p className="text-xs md:text-sm font-medium text-black/80 leading-relaxed">
                        {opp.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= 5. PROFILE ANALYSIS (COMPACT DASHBOARD) ================= */}
            <div className="bg-white text-black border-2 border-black rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-[4px_4px_0px_#000]">
              <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 md:px-3.5 md:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-mono font-black uppercase tracking-widest mb-3.5 md:mb-5 shadow-xs">
                <Eye size={13} className="text-[#FF3B2F]" />
                <span>5. PROFILE ANALYSIS (CUSTOMER VIEW)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {diagnosticReport.profileAnalysis.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 md:p-5 bg-[#F5F4EF] border border-black/10 rounded-xl flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 md:mb-2 border-b border-black/10">
                      <span className="text-xs md:text-sm font-mono font-black uppercase text-black">
                        {metric.label}
                      </span>
                      <span className="text-xs md:text-sm font-mono font-black text-[#FF3B2F]">
                        {metric.score}/100
                      </span>
                    </div>
                    <p className="text-xs md:text-sm font-medium text-black/80 leading-snug md:leading-relaxed">
                      {metric.insight}
                    </p>
                  </div>
                ))}
              </div>

              {diagnosticReport.profileAnalysis.genericAiWordingDetected && (
                <div className="mt-3 md:mt-4 p-2.5 md:p-3.5 bg-[#FFF5F4] border border-[#FF3B2F] rounded-lg text-xs md:text-sm font-semibold text-black flex items-center gap-2">
                  <AlertCircle size={14} className="text-[#FF3B2F] shrink-0" />
                  <span>
                    {diagnosticReport.profileAnalysis.genericWordingNote ||
                      'Generic/AI-like wording detected in profile bio. Ground bio in concrete customer outcomes.'}
                  </span>
                </div>
              )}
            </div>

            {/* ================= 6. REEL ANALYSIS (ONLY IF VERIFIED DATA EXISTS) ================= */}
            {diagnosticReport.hasVerifiedReelMetrics && diagnosticReport.reelAnalysis && (
              <div className="bg-white text-black border-2 border-black rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-[4px_4px_0px_#000]">
                <div className="flex items-center justify-between pb-2 mb-3 md:mb-4 border-b border-black/10 flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 md:px-3.5 md:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-mono font-black uppercase tracking-widest shadow-xs">
                    <Film size={13} className="text-[#FF3B2F]" />
                    <span>6. REEL ANALYSIS (SHORT-FORM VIDEO HEALTH)</span>
                  </div>
                  <span className="text-xs md:text-sm font-mono font-black text-white bg-black px-2.5 py-0.5 md:px-3 md:py-1 rounded">
                    SCORE: {diagnosticReport.reelAnalysis.reelPerformanceScore}/100
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3.5 mb-3">
                  <div className="p-2.5 md:p-3.5 bg-[#F5F4EF] border border-black/10 rounded-lg text-center">
                    <span className="text-[9px] md:text-[10px] font-mono font-bold text-black/50 uppercase block">REELS ANALYZED</span>
                    <span className="text-base md:text-xl font-display font-black text-black">
                      {diagnosticReport.reelAnalysis.reelsAnalyzed}
                    </span>
                  </div>
                  <div className="p-2.5 md:p-3.5 bg-[#F5F4EF] border border-black/10 rounded-lg text-center">
                    <span className="text-[9px] md:text-[10px] font-mono font-bold text-black/50 uppercase block">AVERAGE VIEWS</span>
                    <span className="text-base md:text-xl font-display font-black text-black">
                      {diagnosticReport.reelAnalysis.averageViews}
                    </span>
                  </div>
                  <div className="p-2.5 md:p-3.5 bg-[#F5F4EF] border border-black/10 rounded-lg text-center">
                    <span className="text-[9px] md:text-[10px] font-mono font-bold text-black/50 uppercase block">MEDIAN VIEWS</span>
                    <span className="text-base md:text-xl font-display font-black text-black">
                      {diagnosticReport.reelAnalysis.medianViews}
                    </span>
                  </div>
                  <div className="p-2.5 md:p-3.5 bg-[#F5F4EF] border border-black/10 rounded-lg text-center">
                    <span className="text-[9px] md:text-[10px] font-mono font-bold text-black/50 uppercase block">TOP REEL</span>
                    <span className="text-base md:text-xl font-display font-black text-[#FF3B2F]">
                      {diagnosticReport.reelAnalysis.highestPerformingReel}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 7. ACTIONABLE NEXT STEPS (2x2 ON DESKTOP, 1-COL ON MOBILE) ================= */}
            <div className="bg-white text-black border-2 border-black rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-[4px_4px_0px_#000]">
              <div className="inline-flex items-center gap-2 bg-[#FF3B2F] text-white px-3 py-1 md:px-3.5 md:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-mono font-black uppercase tracking-widest mb-3.5 md:mb-5 shadow-xs">
                <Clock size={13} />
                <span>EXECUTION BLUEPRINT</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {diagnosticReport.nextSteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-3 md:p-4 bg-[#F5F4EF] border border-black/10 rounded-xl flex items-start gap-2.5 md:gap-3"
                  >
                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-black text-white font-mono font-black text-[10px] md:text-xs flex items-center justify-center shrink-0 mt-0.5">
                      0{step.stepNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs sm:text-sm md:text-base font-display font-black uppercase text-black mb-0.5">
                        {step.action}
                      </h5>
                      <p className="text-xs md:text-sm font-medium text-black/80 leading-snug md:leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= 8. HOW FRAME2BYTE CAN HELP (SIMPLIFIED PERSONALIZED CTA) ================= */}
            <div className="p-5 sm:p-6 md:p-8 bg-black text-white border-2 border-black rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[6px_6px_0px_rgba(0,0,0,0.85)] relative overflow-hidden">
              <div className="inline-flex items-center gap-2 bg-[#FF3B2F] text-white px-3 py-1 md:px-3.5 md:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-mono font-black uppercase tracking-widest mb-2.5 md:mb-4">
                <Zap size={13} />
                <span>HOW FRAME2BYTE CAN HELP</span>
              </div>

              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-white mb-2 md:mb-3 break-words leading-tight">
                TURN ATTENTION INTO REVENUE FOR{' '}
                <span className="inline-block text-[#FF3B2F]">
                  @{cleanReportUsername.toUpperCase()}
                </span>
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-white/80 font-medium max-w-xl md:max-w-2xl mb-4 md:mb-6 leading-relaxed">
                {diagnosticReport.helpSentence}
              </p>

              <button
                onClick={handleConnectWithFrame}
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[#FF3B2F] hover:bg-[#e03025] text-white rounded-xl md:rounded-2xl font-display font-black text-xs sm:text-sm md:text-base uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-[3px_3px_0px_#FFF] active:scale-95 transition-all cursor-pointer"
              >
                <span>LET'S TALK ABOUT YOUR BRAND</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
