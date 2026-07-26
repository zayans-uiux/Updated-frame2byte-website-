import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import GraphicDesignShowcase from '../components/GraphicDesignShowcase';
import ReelShowcase from '../components/ReelShowcase';

const reelVideos = [
  { id: 1, title: 'REEL 01', category: 'BRAND SHOWCASE', src: '/videos/video1.mp4' },
  { id: 2, title: 'REEL 02', category: 'SHORT-FORM EDIT', src: '/videos/video3.mp4' },
  { id: 3, title: 'REEL 03', category: 'GROWTH CONTENT', src: '/videos/video7.mp4' },
  { id: 4, title: 'REEL 04', category: 'VIRAL CAMPAIGN', src: '/videos/video8.mp4' },
  { id: 5, title: 'REEL 05', category: 'HIGH RETENTION', src: '/videos/video9.mp4' },
  { id: 6, title: 'REEL 06', category: 'MOTION EDIT', src: '/videos/video12.mp4' },
];

const visualDesigns = [
  { id: 1, title: 'GRAPHIC 01', category: 'BRAND IDENTITY', src: '/images/image8.jpeg' },
  { id: 2, title: 'GRAPHIC 02', category: 'CREATIVE POSTER', src: '/images/image9.jpeg' },
  { id: 3, title: 'GRAPHIC 03', category: 'AI CAMPAIGN', src: '/images/image10.jpeg' },
  { id: 4, title: 'GRAPHIC 04', category: 'SOCIAL CREATIVE', src: '/images/images2.png' },
  { id: 5, title: 'GRAPHIC 05', category: 'BRANDING POST', src: '/images/images3.png' },
  { id: 6, title: 'GRAPHIC 06', category: 'MARKETING ASSET', src: '/images/whatsapp_post.jpeg' },
  { id: 7, title: 'GRAPHIC 07', category: 'E-COMMERCE DESIGN', src: '/images/grindup_post1.png' },
  { id: 8, title: 'GRAPHIC 08', category: 'EDITORIAL ARTWORK', src: '/images/image7.jpg' },
];

function Modal({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-3xl cursor-default p-4 sm:p-8"
        >
          <div className="w-full flex justify-between items-center mb-4 max-w-5xl mx-auto">
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-[#FF3B2F] px-4 py-2 rounded-md text-white font-black tracking-widest text-xs uppercase shadow-lg hover:bg-[#E02D21] transition-all"
            >
              <ChevronLeft size={18} />
              <span>CLOSE PREVIEW</span>
            </button>
          </div>
          
          <div className="flex-1 w-full flex items-center justify-center relative max-w-5xl mx-auto overflow-hidden">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full max-h-[80vh] flex items-center justify-center rounded-2xl overflow-hidden border-2 border-white/20 bg-black"
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PortfolioPage() {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (media: any) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMedia(null), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen bg-white text-black overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block bg-black text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
            PORTFOLIO SHOWCASE
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-6xl md:text-7xl font-display font-black tracking-tight uppercase leading-[0.95] text-black break-words"
          >
            OUR CREATIVE <br />
            <span className="text-[#FF3B2F] text-[0.85em] inline-block tracking-tight">PORTFOLIO.</span>
          </motion.h1>
          <p className="text-black/70 text-xs sm:text-sm md:text-base max-w-xl mx-auto uppercase tracking-widest font-black mt-4">
            AI-POWERED BRANDING, HIGH-RETENTION SHORT-FORM CONTENT, AND CREATIVE DIRECTION.
          </p>
        </div>

        {/* Section 1: Short-Form Reel Edits */}
        <section className="mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-black">
            <span className="w-3 h-3 bg-[#FF3B2F] rounded-full" />
            <h2 className="text-xl sm:text-3xl font-display font-black uppercase tracking-tight text-black">
              01 / SHORT-FORM REEL EDITS
            </h2>
            <span className="text-xs font-bold text-black/50 uppercase tracking-widest ml-auto hidden sm:inline">
              [HIGH-RETENTION REELS]
            </span>
          </div>

          <ReelShowcase
            reels={reelVideos}
            onOpenModal={(video) => openModal({ ...video, type: 'video' })}
          />
        </section>

        {/* Section 2: Graphic Designs Editorial Showcase */}
        <section className="mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-black">
            <span className="w-3 h-3 bg-black rounded-full" />
            <h2 className="text-xl sm:text-3xl font-display font-black uppercase tracking-tight text-black">
              02 / GRAPHIC DESIGNS & BRANDING SHOWCASE
            </h2>
            <span className="text-xs font-bold text-black/50 uppercase tracking-widest ml-auto hidden sm:inline">
              [FEATURED ARTWORK & CREATIVE DIRECTION]
            </span>
          </div>

          <GraphicDesignShowcase
            items={visualDesigns}
            onOpenModal={(item) => openModal({ ...item, type: 'image' })}
            isWhiteBg={true}
          />
        </section>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-16 rounded-[2.5rem] bg-[#0B0B0B] text-white border-2 border-black text-center relative overflow-hidden shadow-[12px_12px_0px_#FF3B2F]"
        >
          <div className="inline-block bg-[#FF3B2F] text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest mb-4">
            LET'S SCALE YOUR BRAND
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-6 leading-tight break-words max-w-2xl mx-auto">
            READY TO BUILD SOMETHING <span className="text-[#FF3B2F]">LEGENDARY?</span>
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8 font-extrabold leading-relaxed">
            Join forward-thinking businesses and creators scaling their organic reach with Frame2Byte's high-retention content engine.
          </p>
          <div className="flex justify-center">
            <a 
              href="/#ai-audit"
              className="px-8 py-4 bg-[#FF3B2F] text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#E02D21] transition-transform hover:scale-105 shadow-[4px_4px_0px_#FFF] border border-white"
            >
              <span>GET FREE AI MARKETING AUDIT</span>
              <ArrowUpRight size={18} className="stroke-[3]" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modal Lightbox */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMedia?.type === 'video' ? (
          <video
            src={selectedMedia.src}
            controls
            autoPlay
            className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
          />
        ) : selectedMedia?.type === 'image' ? (
          <img
            src={selectedMedia.src}
            alt={selectedMedia.title}
            className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
          />
        ) : null}
      </Modal>
    </motion.div>
  );
}

