import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Instagram, 
  Youtube, 
  Twitch, 
  Film, 
  Scissors, 
  Zap, 
  Share2, 
  Sliders, 
  Check,
  Linkedin
} from 'lucide-react';

export default function ClippingPage() {
  const WHATSAPP_URL = 'https://wa.me/918268278786?text=Hi%20Frame2Byte%2C%20I%20want%20to%20start%20a%20clipping%20project.';

  const marqueePlatforms = [
    { name: 'Instagram Reels', icon: Instagram },
    { name: 'YouTube Shorts', icon: Youtube },
    { name: 'TikTok Feed', icon: Film },
    { name: 'LinkedIn Video', icon: Linkedin },
    { name: 'Twitch Highlights', icon: Twitch },
  ];

  const pricingFactors = [
    'Type of content',
    'Podcast/stream format',
    'Length of source content',
    'Number of clips required',
    'Editing complexity',
    'Caption/visual requirements',
    'Turnaround time'
  ];

  const workflowSteps = [
    { id: '01', name: 'Brief & Research' },
    { id: '02', name: 'Content Strategy' },
    { id: '03', name: 'Creative Direction' },
    { id: '04', name: 'Edit & Design' },
    { id: '05', name: 'Optimize & Deliver' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 sm:pt-28 lg:pt-32 pb-28 sm:pb-24 bg-white text-black min-h-screen overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">

        {/* ================= 1. HERO / MAIN INTRO ================= */}
        <section className="bg-[#F5F4EF] text-black border-2 border-black rounded-[2rem] sm:rounded-[2.5rem] p-4.5 xs:p-5 sm:p-8 lg:p-10 shadow-[6px_6px_0px_#0B0B0B] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-8 items-center">
            
            {/* LEFT COLUMN: Headings & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full text-[9.5px] sm:text-xs font-mono font-black uppercase tracking-widest mb-2 sm:mb-4 w-fit shadow-xs">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF3B2F] animate-pulse" />
                <span>CLIPPING & REPURPOSING</span>
              </div>

              <h1 className="text-[clamp(1rem,4.6vw,1.3rem)] sm:text-4xl md:text-5xl lg:text-[3.6rem] font-display font-black uppercase tracking-tighter sm:tracking-tight leading-[1.08] sm:leading-[0.96] text-black mb-2 sm:mb-4">
                <span className="block">YOUR LONG-FORM</span>
                <span className="text-[#FF3B2F] block">HAS MORE TO GIVE.</span>
              </h1>

              <p className="text-[11.5px] xs:text-xs sm:text-sm md:text-base font-bold text-black/80 max-w-xl leading-snug sm:leading-relaxed mb-3 sm:mb-7">
                <span className="sm:hidden">
                  We turn podcasts, streams, and long-form videos into high-retention short clips.
                </span>
                <span className="hidden sm:inline">
                  Frame2Byte turns podcasts, streams, interviews and other long-form content into short-form clips designed for attention and distribution.
                </span>
              </p>

              {/* Action CTA Button */}
              <div className="flex items-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-4 bg-[#FF3B2F] hover:bg-[#E02D21] text-white rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[3px_3px_0px_#0B0B0B] sm:shadow-[4px_4px_0px_#0B0B0B] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span>START A CLIPPING PROJECT</span>
                  <ArrowUpRight size={15} className="stroke-[3]" />
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Compact FRAME2BYTE WORKFLOW Spreadsheet Mini Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full pt-1 sm:pt-2 lg:pt-0">
              <div className="w-full max-w-[310px] xs:max-w-[340px] sm:max-w-[360px] bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#0B0B0B] sm:shadow-[5px_5px_0px_#0B0B0B] overflow-hidden">
                
                {/* Header Bar */}
                <div className="bg-black text-white px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between border-b-2 border-black">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF3B2F]" />
                    <span className="text-[10.5px] sm:text-xs font-mono font-black uppercase tracking-wider">
                      FRAME2BYTE WORKFLOW
                    </span>
                  </div>
                  <span className="text-[8.5px] sm:text-[9px] font-mono font-bold text-white/50 uppercase tracking-widest">
                    SHEET
                  </span>
                </div>

                {/* Spreadsheet Table Grid */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F5F4EF] border-b border-black/15 text-[8.5px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-black/60">
                      <th className="w-9 sm:w-10 py-1.5 px-2 text-center border-r border-black/15">#</th>
                      <th className="py-1.5 px-2.5 sm:px-3 text-left border-r border-black/15">PHASE</th>
                      <th className="w-12 sm:w-14 py-1.5 px-2 text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workflowSteps.map((step, idx) => (
                      <tr 
                        key={step.id} 
                        className={`hover:bg-neutral-50/80 transition-colors ${
                          idx !== workflowSteps.length - 1 ? 'border-b border-black/10' : ''
                        }`}
                      >
                        <td className="py-1.5 sm:py-2.5 px-2 text-center font-mono text-[9.5px] sm:text-[11px] font-black text-black/40 border-r border-black/10 bg-[#FAF9F6]">
                          {step.id}
                        </td>
                        <td className="py-1.5 sm:py-2.5 px-2.5 sm:px-3 border-r border-black/10">
                          <span className="text-[11px] sm:text-[13px] font-display font-black text-black uppercase tracking-tight block">
                            {step.name}
                          </span>
                        </td>
                        <td className="py-1.5 sm:py-2.5 px-2 text-center">
                          <div className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-[#FF3B2F]/10 text-[#FF3B2F]">
                            <Check size={11} className="stroke-[3]" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Tiny Footer */}
                <div className="bg-[#F5F4EF] border-t-2 border-black px-3 sm:px-3.5 py-1.5 sm:py-2.5 flex items-center justify-between">
                  <p className="text-[9px] sm:text-[10.5px] font-mono font-bold text-black/70 leading-snug">
                    Built around your brand, audience &amp; goals.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ================= 2. WHAT IS CLIPPING? ================= */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 pb-2 border-b-2 border-black">
            <span className="w-3 h-3 bg-[#FF3B2F] rounded-full" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-black">
              WHAT IS CLIPPING?
            </h2>
            <span className="text-xs font-mono font-bold text-black/50 uppercase tracking-widest ml-auto hidden sm:inline">
              [3-STEP METHOD]
            </span>
          </div>

          {/* Three Visually Distinct Modular Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* BOX 01 */}
            <div className="bg-white border-2 border-black rounded-[2rem] p-6 sm:p-7 shadow-[6px_6px_0px_#0B0B0B] flex flex-col justify-between hover:-translate-y-0.5 transition-all">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl sm:text-4xl font-display font-black text-black">
                    01
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
                    <Scissors size={16} className="text-[#FF3B2F]" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight text-black mb-2">
                  FIND THE MOMENT
                </h3>

                <p className="text-xs sm:text-sm font-bold text-black/75 leading-relaxed">
                  We go through long-form content and identify the strongest conversations, stories and moments.
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-black/10 flex items-center justify-between text-[10px] font-mono font-black uppercase tracking-wider text-black/60">
                <span>PHASE ONE</span>
                <span className="text-[#FF3B2F]">DISCOVERY</span>
              </div>
            </div>

            {/* BOX 02 */}
            <div className="bg-[#F5F4EF] border-2 border-black rounded-[2rem] p-6 sm:p-7 shadow-[6px_6px_0px_#0B0B0B] flex flex-col justify-between hover:-translate-y-0.5 transition-all relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl sm:text-4xl font-display font-black text-[#FF3B2F]">
                    02
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#FF3B2F] text-white flex items-center justify-center">
                    <Zap size={16} className="fill-white" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight text-black mb-2">
                  BUILD THE CLIP
                </h3>

                <p className="text-xs sm:text-sm font-bold text-black/75 leading-relaxed">
                  We turn those moments into engaging short-form videos using pacing, captions, visual emphasis and sound.
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-black/10 flex items-center justify-between text-[10px] font-mono font-black uppercase tracking-wider text-black/60 relative z-10">
                <span>PHASE TWO</span>
                <span className="text-[#FF3B2F]">PRODUCTION</span>
              </div>
            </div>

            {/* BOX 03 */}
            <div className="bg-white border-2 border-black rounded-[2rem] p-6 sm:p-7 shadow-[6px_6px_0px_#0B0B0B] flex flex-col justify-between hover:-translate-y-0.5 transition-all">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl sm:text-4xl font-display font-black text-black">
                    03
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
                    <Share2 size={16} className="text-[#FF3B2F]" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight text-black mb-2">
                  MAKE IT TRAVEL
                </h3>

                <p className="text-xs sm:text-sm font-bold text-black/75 leading-relaxed">
                  The finished clips are prepared for short-form platforms and consistent content distribution.
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-black/10 flex items-center justify-between text-[10px] font-mono font-black uppercase tracking-wider text-black/60">
                <span>PHASE THREE</span>
                <span className="text-[#FF3B2F]">DISTRIBUTION</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= 3. SOCIAL MEDIA DISTRIBUTION VISUAL ================= */}
        <section className="relative">
          <div className="bg-[#0B0B0B] text-white border-2 border-black rounded-2xl sm:rounded-3xl py-3.5 sm:py-4 overflow-hidden shadow-[6px_6px_0px_#FF3B2F]">
            
            {/* Moving distribution marquee belt (Left to Right Animation) */}
            <div className="flex animate-marquee-reverse whitespace-nowrap gap-8 items-center">
              {[1, 2].map((half) => (
                <div key={half} className="flex items-center gap-8 shrink-0">
                  {[1, 2].map((batch) => (
                    <div key={batch} className="flex items-center gap-8 text-xs sm:text-sm font-display font-black uppercase tracking-wider">
                      {marqueePlatforms.map((platform) => {
                        const Icon = platform.icon;
                        return (
                          <div key={platform.name} className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-xl">
                            <Icon size={14} className="text-[#FF3B2F]" />
                            <span>{platform.name}</span>
                          </div>
                        );
                      })}
                      <span className="text-[#FF3B2F] font-mono">CONTENT DISTRIBUTION PIPELINE</span>
                      <span className="text-white/40">•</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 4. PRICING ================= */}
        <section className="bg-white border-2 border-black rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-[6px_6px_0px_#0B0B0B]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest mb-3 w-fit">
              <Sliders size={12} className="text-[#FF3B2F]" />
              <span>PRICING</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-black mb-3 leading-tight">
              PRICING SHAPED <br />
              <span className="text-[#FF3B2F]">AROUND YOUR CONTENT.</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base font-bold text-black/80 leading-relaxed mb-5">
              Clipping is not a fixed one-size-fits-all price. We calibrate each production scope based on your specific format, recording rhythm, and target platforms:
            </p>

            {/* Factor Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
              {pricingFactors.map((factor) => (
                <div 
                  key={factor}
                  className="flex items-center gap-2 bg-[#F5F4EF] border border-black/20 p-2.5 sm:p-3 rounded-xl text-xs font-bold text-black shadow-2xs"
                >
                  <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Check size={10} className="text-[#FF3B2F] stroke-[3]" />
                  </div>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. FINAL CTA (LET'S TALK -> NAVIGATES TO EXISTING CONTACT SECTION) ================= */}
        <section className="bg-[#0B0B0B] text-white border-2 border-black rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 text-center shadow-[6px_6px_0px_#FF3B2F] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FF3B2F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight mb-3 leading-tight">
              READY TO TURN MORE OF YOUR CONTENT INTO REACH?
            </h2>

            <p className="text-xs sm:text-sm font-bold text-white/80 max-w-lg mx-auto mb-6 leading-relaxed">
              Send us your podcast, stream or long-form content and let's discuss what we can turn into short-form.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF3B2F] hover:bg-[#E02D21] text-white rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0px_#FFF] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight size={16} className="stroke-[3]" />
            </Link>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
