import { motion } from 'framer-motion';
import { Target, Clapperboard, Zap, LineChart, Sparkles } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'AUDIENCE & AI RESEARCH',
    desc: 'Deep-dive audience profiling, viral hook analysis, and AI-synthesized trend mapping before filming a single frame.',
    icon: <Target className="text-[#FF3B2F]" size={24} />,
    tag: 'STRATEGY FIRST'
  },
  {
    num: '02',
    title: 'HIGH-RETENTION EDITING',
    desc: 'Pacing, motion graphics, sound design, and custom typography structured to keep viewers locked in past 3 seconds.',
    icon: <Clapperboard className="text-[#FF3B2F]" size={24} />,
    tag: 'CREATIVE SYSTEM'
  },
  {
    num: '03',
    title: 'VIRAL HOOK OPTIMIZATION',
    desc: 'Deploying psychological triggers, scroll-stopping visual overlays, and multi-format testing for maximum algorithmic reach.',
    icon: <Zap className="text-[#FF5547]" size={24} />,
    tag: 'ENGAGEMENT HOOK'
  },
  {
    num: '04',
    title: 'SCALE & ITERATE',
    desc: 'Continuous performance tracking, retention curve analytics, and scaling winning content angles month over month.',
    icon: <LineChart className="text-[#FF3B2F]" size={24} />,
    tag: 'GROWTH ENGINE'
  },
];

export default function Process() {
  return (
    <section className="py-16 sm:py-24 bg-[#0B0B0B] text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block bg-[#FF3B2F] text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
            THE GROWTH BLUEPRINT
          </div>
          <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-[0.98] break-words">
            HOW WE SCALE <br />
            <span className="text-[#FF3B2F]">YOUR BRAND.</span>
          </h2>
        </div>

        {/* 4 Steps Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-900 p-6 sm:p-7 rounded-[1.8rem] border-2 border-white/15 shadow-[6px_6px_0px_#FF3B2F] flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 relative group"
            >
              {/* Step Tag */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-display font-black text-3xl sm:text-4xl text-white/30 group-hover:text-[#FF5547] transition-colors">
                  {step.num}
                </span>
                <div className="p-2.5 rounded-xl bg-black border border-white/20">
                  {step.icon}
                </div>
              </div>

              <div>
                <div className="inline-block bg-[#FF3B2F]/20 text-[#FF5547] border border-[#FF3B2F]/40 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest mb-3">
                  {step.tag}
                </div>

                <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight mb-3 text-white">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-white/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Step Indicator */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>STEP 0{i + 1} OF 04</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
