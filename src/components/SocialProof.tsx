import { motion } from 'framer-motion';
import { Eye, TrendingUp, Rocket, Users } from 'lucide-react';

const stats = [
  {
    icon: <Eye className="text-white" size={22} />,
    value: '2.6M+',
    label: 'Views Generated',
  },
  {
    icon: <TrendingUp className="text-white" size={22} />,
    value: '30+',
    label: 'Happy Clients',
  },
  {
    icon: <Rocket className="text-white" size={22} />,
    value: '100+',
    label: 'Projects Completed',
  },
  {
    icon: <Users className="text-white" size={22} />,
    value: '595K+',
    label: 'Accounts Reached',
  },
];

export default function SocialProof() {
  return (
    <section className="py-12 sm:py-16 bg-[#0B0B0B] text-white border-b border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10 py-6 sm:py-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 sm:p-6 flex flex-col items-center text-center ${i % 2 === 0 ? '' : 'max-md:border-l max-md:border-white/10'}`}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="p-1.5 rounded-md bg-white/10 text-[#FF3B2F]">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white">
                  <span className="text-[#FF3B2F]">{stat.value.slice(0, -1)}</span>{stat.value.slice(-1)}
                </div>
              </div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

