import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  MessageSquare, 
  Mail, 
  ArrowUpRight, 
  CheckCircle2, 
  MousePointerClick,
  Target,
  Zap,
  Rocket
} from 'lucide-react';

export default function CTA() {
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const EMAIL_ADDRESS = "zayanstoodinbuisness@gmail.com";
  const rawSubject = "Frame2Byte Website Inquiry";
  const rawBody = `Hi Frame2Byte,\n\nI'm interested in your services.\n\nWebsite:\n---\n\nBusiness:\n---\n\nMessage:\n---`;

  const GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}&su=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;
  const MAILTO_LINK = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('+91 8268278786');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 3000);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleEmailClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const opened = window.open(GMAIL_URL, '_blank', 'noopener,noreferrer');
    if (!opened || opened.closed || typeof opened.closed === 'undefined') {
      window.location.href = MAILTO_LINK;
    }
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/frame2byte', '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918268278786?text=Hi%20Frame2Byte%2C%20I%20am%20interested%20in%20your%20services.', '_blank', 'noopener,noreferrer');
  };

  const steps = [
    {
      num: '01',
      title: 'Choose Method',
      desc: 'Select Instagram, WhatsApp, or Email.',
      icon: <MousePointerClick size={18} className="text-[#FF5547]" />
    },
    {
      num: '02',
      title: 'Share Goals',
      desc: 'Tell us your business & content goals.',
      icon: <Target size={18} className="text-[#FF5547]" />
    },
    {
      num: '03',
      title: 'Get AI Plan',
      desc: 'Frame2Byte recommends the best strategy.',
      icon: <Zap size={18} className="text-[#FF5547]" />
    },
    {
      num: '04',
      title: 'Build Brand',
      desc: 'Lock in your spot & start publishing.',
      icon: <Rocket size={18} className="text-[#FF5547]" />
    }
  ];

  return (
    <section id="contact" className="pt-6 sm:pt-10 pb-16 sm:pb-24 bg-[#FF3B2F] text-black relative overflow-hidden">
      
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title - Positioned right at the top just below header bar */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-[0.95] text-black drop-shadow-sm"
          >
            LET'S BUILD SOMETHING <br />
            <span className="text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">GREAT TOGETHER</span>
          </motion.h2>
        </div>

        {/* 1ST PRIORITY: THREE POP-STYLE CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16 sm:mb-20">
          
          {/* CARD 1: INSTAGRAM */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onClick={handleInstagramClick}
            className="p-7 sm:p-9 bg-black text-white rounded-[2.2rem] border-3 border-black shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white flex items-center justify-center p-3 shadow-md group-hover:scale-110 transition-transform">
                  <Instagram size={28} />
                </div>
                <span className="px-3 py-1 bg-[#FF3B2F] text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/20">
                  ⚡ DIRECT DM
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white mb-2">
                INSTAGRAM
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-white/70 leading-relaxed mb-6">
                Perfect for quick conversations, project ideas, portfolio requests, and creative discussions.
              </p>
            </div>

            <a
              href="https://instagram.com/frame2byte"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-4 bg-[#FF3B2F] text-white rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#E02D21] transition-all shadow-[4px_4px_0px_#FFF] active:scale-95"
            >
              <span>OPEN INSTAGRAM</span>
              <ArrowUpRight size={18} className="stroke-[3]" />
            </a>
          </motion.div>

          {/* CARD 2: WHATSAPP */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            onClick={handleWhatsAppClick}
            className="p-7 sm:p-9 bg-black text-white rounded-[2.2rem] border-3 border-black shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-[#25D366] text-black flex items-center justify-center p-3 shadow-md group-hover:scale-110 transition-transform">
                  <MessageSquare size={28} className="fill-black" />
                </div>
                <span className="px-3 py-1 bg-[#25D366] text-black text-[9px] font-black uppercase tracking-widest rounded-full">
                  🔥 FASTEST
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white mb-2">
                WHATSAPP
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-white/70 leading-relaxed mb-6">
                Need a faster response? Start a WhatsApp conversation to discuss requirements, pricing, or projects.
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href="https://wa.me/918268278786?text=Hi%20Frame2Byte%2C%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full py-4 bg-[#25D366] text-black rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#1ebc5a] transition-all shadow-[4px_4px_0px_#FFF] active:scale-95"
              >
                <span>CHAT ON WHATSAPP</span>
                <ArrowUpRight size={18} className="stroke-[3]" />
              </a>

              <button
                onClick={handleCopyNumber}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white/80 rounded-lg text-[9px] font-extrabold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedNumber ? (
                  <>
                    <CheckCircle2 size={12} className="text-[#25D366]" />
                    <span>COPIED +91 8268278786</span>
                  </>
                ) : (
                  <span>COPY: +91 8268278786</span>
                )}
              </button>
            </div>
          </motion.div>

          {/* CARD 3: EMAIL */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            onClick={(e) => handleEmailClick(e)}
            className="p-7 sm:p-9 bg-black text-white rounded-[2.2rem] border-3 border-black shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-white text-black flex items-center justify-center p-3 shadow-md group-hover:scale-110 transition-transform">
                  <Mail size={28} />
                </div>
                <span className="px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full">
                  ✉️ FORMAL
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white mb-2">
                EMAIL
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-white/70 leading-relaxed mb-6">
                Ideal for business proposals, partnerships, large enterprise projects, or detailed enquiries.
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href={GMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleEmailClick(e)}
                className="w-full py-4 bg-white text-black hover:bg-neutral-200 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_#000] active:scale-95"
              >
                <span>OPEN GMAIL</span>
                <ArrowUpRight size={18} className="stroke-[3]" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white/80 rounded-lg text-[9px] font-extrabold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 size={12} className="text-white" />
                    <span>COPIED EMAIL ADDRESS</span>
                  </>
                ) : (
                  <span>COPY: zayanstoodinbuisness@gmail.com</span>
                )}
              </button>
            </div>
          </motion.div>

        </div>

        {/* 2ND PRIORITY: 4 SMALL BOXES EXPLAINING CONTACT METHOD STEPS BELOW CONTACT CARDS */}
        {/* Mobile: 2x2 grid (grid-cols-2). Laptop/Tablet: 4 in same row (grid-cols-2 md:grid-cols-4) */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-black/80 bg-white/30 backdrop-blur-sm px-4 py-1 rounded-full border border-black/10">
              4-STEP CONTACT PROCESS
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 sm:p-5 bg-black text-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between hover:bg-neutral-900 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-black text-base sm:text-lg text-[#FF5547]">
                      {step.num}
                    </span>
                    <div className="p-1.5 bg-white/10 rounded-lg">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="font-display font-black text-xs sm:text-sm uppercase text-white mb-1 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-semibold text-white/70 leading-normal">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
