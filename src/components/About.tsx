import { motion } from 'framer-motion';
import { Quote, ArrowUpRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Frame2Byte completely transformed our social media presence. Their reels brought us 3x more footfall in the first month!",
    author: "Café De Ollas",
    role: "Restaurant & Lifestyle Brand",
    avatar: "☕"
  },
  {
    quote: "The quality of video editing and storytelling is unmatched. They understand hooks, retention, and viral pacing like pros.",
    author: "Sakaza Schezwan",
    role: "FMCG Brand",
    avatar: "🌶️"
  },
  {
    quote: "Fast turnarounds, incredible graphic design, and a team that genuinely cares about your brand growth. Highly recommended!",
    author: "Oottupura Cafe",
    role: "Culinary & Dining",
    avatar: "🍲"
  }
];

export default function About() {
  return (
    <>
      {/* Testimonials Block */}
      <section className="py-16 sm:py-24 bg-[#FF3B2F] text-black border-b-2 border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-block bg-black text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase mb-4 shadow-md">
              KIND WORDS
            </div>
            <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-[0.98] text-black break-words">
              OUR CLIENTS <br />
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">SAY IT BEST.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto pt-4">
            {testimonials.map((item, i) => {
              const rotation = i === 0 ? '-rotate-2 md:-rotate-2' : i === 1 ? 'rotate-1 md:rotate-2' : '-rotate-1 md:-rotate-1';
              const statsBadge = i === 0 ? '3X FOOTFALL INCREASE' : i === 1 ? '85%+ RETENTION' : '2.6M+ TOTAL VIEWS';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-[#F5F4EF] p-6 sm:p-8 rounded-[2rem] border-2 border-black shadow-[8px_8px_0px_#0B0B0B] flex flex-col justify-between hover:rotate-0 hover:-translate-y-2 hover:shadow-[12px_12px_0px_#0B0B0B] transition-all duration-300 relative ${rotation}`}
                >
                  {/* Top Stats Tag */}
                  <div className="absolute -top-3.5 right-6 bg-black text-[#FF5547] px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border border-white/20 shadow-[0_0_10px_rgba(255,59,47,0.4)]">
                    ⚡ {statsBadge}
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-[#FF3B2F] mb-4">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={15} className="fill-[#FF3B2F]" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm font-extrabold text-black/90 leading-relaxed mb-6 italic">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t-2 border-black/10">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-sm border border-black">
                      {item.avatar}
                    </div>
                    <div>
                      <h4 className="font-display font-black text-sm uppercase text-black">
                        {item.author}
                      </h4>
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-black/60">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial About Founder Block */}
      <section id="about" className="py-16 sm:py-24 bg-[#0B0B0B] text-white border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/20 shadow-[10px_10px_0px_#FF3B2F]">
                <img
                  src="/images/zayanintro.jpg"
                  alt="Zayan Shaikh"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover filter contrast-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 right-4 bg-black text-white p-4 sm:p-5 rounded-2xl border-2 border-white/20 shadow-xl max-w-[240px]">
                <div className="text-[#FF3B2F] font-display font-black text-base uppercase">Zayan Shaikh</div>
                <div className="text-white/60 text-[10px] font-extrabold uppercase tracking-widest mt-0.5">Founder & Creative Director</div>
              </div>
            </motion.div>

            {/* Founder Bio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 text-left"
            >
              <div className="inline-block bg-[#FF3B2F] text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
                ABOUT THE FOUNDER
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-[0.98] mb-6 break-words">
                CREATIVE THINKING. <br />
                <span className="text-[#FF3B2F]">DATA-DRIVEN RESULTS.</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-base font-semibold text-white/70 leading-relaxed mb-8">
                <p>
                  Hi, I’m Zayan Shaikh, founder of Frame2Byte.
                </p>
                <p>
                  I completed my Diploma in IT and am pursuing my degree in AI & Data Science at Thakur College of Engineering & Technology. Frame2Byte is built at the intersection of high-retention storytelling, modern aesthetic design, and AI-driven growth strategy.
                </p>
                <p>
                  Over the past year, Frame2Byte has partnered with 30+ international creators, restaurants, and brands, generating millions of views and helping businesses convert content into real customer revenue.
                </p>
              </div>

              <a
                href="https://www.linkedin.com/in/zayan-shaikh-61413b3ab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF3B2F] text-white rounded-md font-extrabold text-xs uppercase tracking-wider hover:bg-[#E02D21] transition-all shadow-[4px_4px_0px_#FFF]"
              >
                <span>CONNECT WITH ME ON LINKEDIN</span>
                <ArrowUpRight size={16} className="stroke-[3]" />
              </a>

            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}

