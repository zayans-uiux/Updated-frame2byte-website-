import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Instagram, 
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Clock
} from 'lucide-react';

export default function CTA() {
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState(false);

  const EMAIL_ADDRESS = "zayanstoodinbuisness@gmail.com";
  const rawSubject = "Frame2Byte Website Inquiry";
  const rawBody = `Hi Frame2Byte,\n\nI'm interested in your services.\n\nWebsite:\n---\n\nBusiness:\n---\n\nMessage:\n---`;

  const GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}&su=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;
  const MAILTO_LINK = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;
  const WHATSAPP_URL = 'https://wa.me/918268278786?text=Hi%20Frame2Byte%2C%20I%20am%20interested%20in%20your%20services.';
  const PHONE_NUMBER = '+91 8268278786';
  const TEL_URL = 'tel:+918268278786';
  const INSTAGRAM_URL = 'https://instagram.com/frame2byte';
  const INSTAGRAM_DM_URL = 'https://ig.me/m/frame2byte';

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PHONE_NUMBER);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleCopyHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('@frame2byte');
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2500);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleEmailClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const opened = window.open(GMAIL_URL, '_blank', 'noopener,noreferrer');
    if (!opened || opened.closed || typeof opened.closed === 'undefined') {
      window.location.href = MAILTO_LINK;
    }
  };

  const contactSteps = [
    {
      num: '01',
      title: 'Choose Channel',
      desc: 'Pick WhatsApp for speed, Call for instant clarity, or Email for proposals.',
    },
    {
      num: '02',
      title: 'Share Goals',
      desc: 'Tell us your niche, target audience, and current growth bottleneck.',
    },
    {
      num: '03',
      title: 'Strategy Plan',
      desc: 'We map out custom hook formulas, editing styles, and content schedules.',
    },
    {
      num: '04',
      title: 'Build & Scale',
      desc: 'Lock in your production queue and start posting high-retention media.',
    },
  ];

  return (
    <section 
      id="contact" 
      className="flex-1 flex flex-col pt-2 sm:pt-3 pb-16 sm:pb-10 bg-[#FF3B2F] text-black relative overflow-hidden scroll-mt-16"
    >
      {/* Subtle Texture Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full flex-1 flex flex-col">
        
        {/* Balanced 50/50 Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN: Heading & Workflow Steps */}
          <div className="flex flex-col justify-between w-full h-full">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase mb-2 shadow-[2px_2px_0px_#000] w-fit">
                <span className="w-2 h-2 rounded-full bg-[#FF3B2F] animate-ping" />
                <span>LET'S TALK</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-[3rem] font-display font-black tracking-tight uppercase leading-[0.96] text-black mb-2">
                LET'S BUILD <br />
                <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">SOMETHING GREAT.</span>
              </h2>

              {/* Supporting Subheading */}
              <p className="text-xs sm:text-sm text-black/90 font-bold leading-relaxed mb-3">
                Have a project, idea, or collaboration in mind? Talk directly with our creative lead. We respond rapidly and cut through all the noise.
              </p>

              {/* Workflow Steps Label: Orange background (matching page) */}
              <div className="inline-flex items-center gap-2 bg-[#FF3B2F] text-black border-2 border-black px-2.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider shadow-[2px_2px_0px_#000] mb-2 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                <span>HOW WE WORK WITH YOU:</span>
              </div>

              {/* 4 Steps - Compact WHITE cards with reduced height */}
              <div className="space-y-1.5 w-full">
                {contactSteps.map((step) => (
                  <div
                    key={step.num}
                    className="flex items-center gap-2.5 py-1 px-2.5 sm:px-3 bg-white text-black border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="text-[10px] font-mono font-black bg-black text-white px-1.5 py-0.5 rounded shrink-0">
                      {step.num}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[11px] sm:text-xs font-display font-black uppercase text-black tracking-tight leading-none mb-0.5">
                        {step.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] font-bold text-black/80 leading-tight">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Guarantee Badge: Orange background (matching page) */}
            <div className="inline-flex items-center gap-2 text-[10.5px] sm:text-xs font-mono font-bold text-black bg-[#FF3B2F] border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_#000] w-fit mt-3">
              <Clock size={13} className="text-black stroke-[2.5]" />
              <span>Typical response time: under 15 minutes</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Cards (50% width, stretched to match top-to-bottom height) */}
          <div className="flex flex-col justify-between gap-3 sm:gap-3.5 w-full h-full">
            
            {/* 1. WHATSAPP CARD - Large Prominent Top Card */}
            <div 
              onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
              className="flex-1 bg-white text-black border-2 border-black rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[5px_5px_0px_#000] relative overflow-hidden group cursor-pointer hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                  <span className="px-2.5 py-0.5 bg-black text-white text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-wider rounded-full">
                    DIRECT CHAT
                  </span>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] sm:text-[11px] font-mono font-black text-black/70 hover:text-black flex items-center gap-1 transition-colors"
                  >
                    <Instagram size={12} />
                    <span>@frame2byte</span>
                  </a>
                </div>

                {/* Content */}
                <div className="mb-2 sm:mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                      <MessageCircle size={16} className="stroke-[2.5]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight text-black">
                      WHATSAPP CHAT
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] font-bold text-black/80 leading-snug">
                    Chat directly with our creative lead for timelines, pricing, and custom scopes.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-black/10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2.5 sm:py-3 px-4 bg-black text-white rounded-xl font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-all shadow-[2px_2px_0px_#000] active:scale-95"
                >
                  <span>START WHATSAPP CHAT</span>
                  <ArrowUpRight size={14} className="stroke-[3]" />
                </a>

                <button
                  onClick={handleCopyNumber}
                  className="py-2.5 sm:py-3 px-4 bg-white hover:bg-neutral-100 text-black rounded-xl font-mono text-[10.5px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000]"
                >
                  {copiedNumber ? (
                    <>
                      <Check size={13} className="text-black stroke-[3]" />
                      <span>COPIED NUMBER</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} className="text-black/60" />
                      <span>COPY: {PHONE_NUMBER}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2. BOTTOM ROW: TWO BALANCED SUBSTANTIAL CARDS */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 items-stretch">
              
              {/* CARD A: INSTAGRAM DM */}
              <div className="h-full bg-white text-black border-2 border-black rounded-2xl p-3.5 sm:p-4 shadow-[4px_4px_0px_#000] flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 bg-black text-white text-[9px] font-mono font-black uppercase tracking-wider rounded">
                      INSTAGRAM DM
                    </span>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono font-black text-black/70 hover:text-black flex items-center gap-1 transition-colors"
                    >
                      <Instagram size={11} />
                      <span>@frame2byte</span>
                    </a>
                  </div>

                  <h4 className="text-sm sm:text-base font-display font-black uppercase tracking-tight text-black mb-1 flex items-center gap-1.5">
                    <Instagram size={15} className="text-black" />
                    <span>INSTAGRAM DM</span>
                  </h4>
                  <p className="text-[11px] sm:text-xs font-bold text-black/75 leading-snug mb-2">
                    Direct message us on Instagram for creative briefs and collaborations.
                  </p>
                </div>

                <div className="pt-2 border-t border-black/10">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-black text-white rounded-xl font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors shadow-[2px_2px_0px_#000] active:scale-95 cursor-pointer"
                  >
                    <span>INSTAGRAM</span>
                    <ArrowUpRight size={14} className="stroke-[3] shrink-0" />
                  </a>
                </div>
              </div>

              {/* CARD B: EMAIL INQUIRY */}
              <div 
                onClick={(e) => handleEmailClick(e)}
                className="h-full bg-white text-black border-2 border-black rounded-2xl p-3.5 sm:p-4 shadow-[4px_4px_0px_#000] flex flex-col justify-between cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={11} className="text-black" />
                      <span className="text-[9px] font-mono font-black uppercase tracking-widest text-black/70">
                        PROPOSALS
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-black text-white bg-black px-1.5 py-0.5 rounded">
                      24H SLA
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-display font-black uppercase tracking-tight text-black mb-1 flex items-center gap-1.5">
                    <Mail size={15} className="text-black" />
                    <span>EMAIL INQUIRY</span>
                  </h4>
                  <p className="text-[11px] sm:text-xs font-bold text-black/75 leading-snug mb-1">
                    Ideal for detailed project briefs and formal RFP submissions.
                  </p>
                  <div className="text-[10px] font-mono font-bold text-black bg-neutral-100 border border-black/15 px-2 py-0.5 rounded truncate mb-2">
                    {EMAIL_ADDRESS}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1.5 border-t border-black/10">
                  <button
                    onClick={(e) => handleEmailClick(e)}
                    className="w-full py-2 bg-black text-white rounded-xl font-display font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors shadow-[2px_2px_0px_#000] active:scale-95 cursor-pointer"
                  >
                    <span>COMPOSE IN GMAIL</span>
                    <ArrowUpRight size={13} className="stroke-[3]" />
                  </button>

                  <button
                    onClick={handleCopyEmail}
                    className="w-full py-1.5 bg-white hover:bg-neutral-100 text-black rounded-xl font-mono text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000]"
                  >
                    {copiedEmail ? (
                      <>
                        <CheckCircle2 size={11} className="text-black" />
                        <span>COPIED EMAIL</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} className="text-black/60" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
