import { motion } from 'framer-motion';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] text-white py-16 sm:py-20 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="text-3xl sm:text-4xl font-display font-black tracking-tighter uppercase mb-4 block">
              FRAME<span className="text-[#FF3B2F]">2</span>BYTE
            </Link>
            <p className="text-xs sm:text-sm font-semibold text-white/60 leading-relaxed mb-6 max-w-sm">
              We don't create content. We build businesses people remember. High-retention short-form video & visual strategy.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/frame2byte"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center text-white hover:bg-[#FF3B2F] hover:border-[#FF3B2F] transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/zayan-shaikh-61413b3ab/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center text-white hover:bg-[#FF3B2F] hover:border-[#FF3B2F] transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://wa.me/918268278786"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center text-white hover:bg-[#FF3B2F] hover:border-[#FF3B2F] transition-all"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FF3B2F] mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-white/70">
              <li><Link to="/" className="hover:text-[#FF3B2F] transition-colors">Home</Link></li>
              <li><Link to="/#about" className="hover:text-[#FF3B2F] transition-colors">About Me</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#FF3B2F] transition-colors">Our Work</Link></li>
              <li><Link to="/services" className="hover:text-[#FF3B2F] transition-colors">Services</Link></li>
              <li><Link to="/plans" className="hover:text-[#FF3B2F] transition-colors">Plans</Link></li>
              <li><Link to="/contact" className="hover:text-[#FF3B2F] transition-colors">Connect With Me</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FF3B2F] mb-4">
              CONTACT AGENCY
            </h4>
            <div className="space-y-3 text-xs font-bold text-white/70">
              <p>📍 Mumbai, Maharashtra, India</p>
              <p>📧 zayanstoodinbuisness@gmail.com</p>
              <p>📱 +91 8268278786</p>
            </div>

            {/* Sticker Badge */}
            <div className="mt-6 inline-flex items-center gap-3 bg-[#FF3B2F] text-white px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(255,59,47,0.5)]">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse" />
              TAKING NEW CLIENTS FOR 2026
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold text-white/40 uppercase tracking-wider">
          <p>© 2026 FRAME2BYTE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            <Link to="/contact" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

