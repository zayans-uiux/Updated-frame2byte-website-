import { motion } from 'framer-motion';
import { Video, Layers, LineChart, Cpu } from 'lucide-react';

const servicePillars = [
  {
    num: '01',
    title: 'SHORT-FORM CONTENT SYSTEMS',
    desc: 'High-retention reel edits, viral hooks, and scripted storytelling engineered to maximize watch time and organic reach.',
    icon: <Video className="text-black stroke-[2.5]" size={28} />,
    illustration: (
      <div className="w-11 h-11 rounded-lg bg-black text-[#FF3B2F] flex items-center justify-center font-display font-black text-xl shadow-md border border-black">
        ▶
      </div>
    )
  },
  {
    num: '02',
    title: 'BRANDING & CREATIVE DIRECTION',
    desc: 'Cohesive visual identity systems, graphic assets, and premium layouts that position your business as an industry authority.',
    icon: <Layers className="text-black stroke-[2.5]" size={28} />,
    illustration: (
      <div className="px-3 py-1.5 rounded-md bg-black text-white font-display font-black text-xs uppercase flex items-center gap-1.5 shadow-md">
        <span>🎨</span> <span>F2B</span>
      </div>
    )
  },
  {
    num: '03',
    title: 'GROWTH MARKETING STRATEGY',
    desc: 'Data-backed audience positioning, offer framing, and creative testing frameworks designed for measurable business growth.',
    icon: <LineChart className="text-black stroke-[2.5]" size={28} />,
    illustration: (
      <div className="px-3 py-1.5 rounded-md bg-[#FF3B2F] text-white font-display font-black text-xs uppercase shadow-md">
        +350% ROI
      </div>
    )
  },
  {
    num: '04',
    title: 'AI-POWERED CONTENT ENGINES',
    desc: 'Instant business audits, AI-synthesized research, and automated creative workflows that produce high-performing assets 10x faster.',
    icon: <Cpu className="text-black stroke-[2.5]" size={28} />,
    illustration: (
      <div className="w-11 h-11 rounded-lg bg-black text-[#FF5547] flex items-center justify-center font-display font-black text-xs shadow-[0_0_12px_rgba(255,59,47,0.5)] uppercase border border-black">
        ⚡ AI
      </div>
    )
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-[#FF3B2F] text-black border-b-2 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block bg-black text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase mb-4 shadow-md border border-white/20">
            WHAT WE DO
          </div>
          <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-[0.98] text-black break-words">
            FROM IDEAS TO IMPACT, <br />
            <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]">WE DO IT ALL.</span>
          </h2>
        </div>

        {/* 4 Cream Card Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {servicePillars.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F5F4EF] p-6 sm:p-8 rounded-[1.8rem] border-2 border-black shadow-[6px_6px_0px_#0B0B0B] flex flex-col justify-between hover:-translate-y-2 hover:shadow-[10px_10px_0px_#0B0B0B] transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-black text-3xl sm:text-4xl text-black/30 group-hover:text-[#FF3B2F] transition-colors">
                    {service.num}
                  </span>
                  {service.illustration}
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-black text-black uppercase tracking-tight mb-3 leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm font-bold text-black/70 leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-black uppercase tracking-widest text-black group-hover:text-[#FF3B2F] transition-colors">
                <span>STRATEGIC CAPABILITY</span>
                <span>↗</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


