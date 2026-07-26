import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import GraphicDesignShowcase from './GraphicDesignShowcase';
import ReelShowcase from './ReelShowcase';

const showcaseReels = [
  { id: 1, title: 'REEL 01', category: 'BRAND SHOWCASE', src: '/videos/video1.mp4' },
  { id: 2, title: 'REEL 02', category: 'SHORT-FORM EDIT', src: '/videos/video3.mp4' },
  { id: 3, title: 'REEL 03', category: 'GROWTH CONTENT', src: '/videos/video7.mp4' },
  { id: 4, title: 'REEL 04', category: 'VIRAL CAMPAIGN', src: '/videos/video8.mp4' },
  { id: 5, title: 'REEL 05', category: 'HIGH RETENTION', src: '/videos/video9.mp4' },
  { id: 6, title: 'REEL 06', category: 'MOTION EDIT', src: '/videos/video12.mp4' },
];

const showcaseDesigns = [
  { id: 101, title: 'GRAPHIC 01', category: 'BRAND IDENTITY', src: '/images/image8.jpeg' },
  { id: 102, title: 'GRAPHIC 02', category: 'CREATIVE POSTER', src: '/images/image9.jpeg' },
  { id: 103, title: 'GRAPHIC 03', category: 'AI CAMPAIGN', src: '/images/image10.jpeg' },
  { id: 104, title: 'GRAPHIC 04', category: 'SOCIAL CREATIVE', src: '/images/images2.png' },
  { id: 105, title: 'GRAPHIC 05', category: 'BRANDING POST', src: '/images/images3.png' },
  { id: 106, title: 'GRAPHIC 06', category: 'MARKETING ASSET', src: '/images/whatsapp_post.jpeg' },
  { id: 107, title: 'GRAPHIC 07', category: 'E-COMMERCE DESIGN', src: '/images/grindup_post1.png' },
  { id: 108, title: 'GRAPHIC 08', category: 'EDITORIAL ARTWORK', src: '/images/image7.jpg' },
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

export default function Portfolio() {
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
    <section id="portfolio" className="py-16 sm:py-24 bg-[#F5F4EF] text-black border-b border-black/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="text-left">
            <div className="inline-block bg-black text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
              PORTFOLIO SHOWCASE
            </div>
            <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-[0.98] break-words">
              REAL WORK. <br />
              <span className="text-[#FF3B2F]">REAL RESULTS.</span>
            </h2>
          </div>

          <Link
            to="/portfolio"
            className="self-start md:self-end px-6 py-3.5 bg-black text-white rounded-md font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#FF3B2F] transition-colors shadow-[4px_4px_0px_#000]"
          >
            <span>EXPLORE FULL PORTFOLIO</span>
            <ArrowUpRight size={16} className="stroke-[3]" />
          </Link>
        </div>

        {/* ================= SECTION 1: FEATURED REELS ================= */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-black">
            <span className="w-3 h-3 bg-[#FF3B2F] rounded-full" />
            <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-black">
              01 / FEATURED VIRAL REELS
            </h3>
            <span className="text-xs font-bold text-black/50 uppercase tracking-widest ml-auto hidden sm:inline">
              [VERTICAL SHORT-FORM CONTENT]
            </span>
          </div>

          <ReelShowcase
            reels={showcaseReels}
            onOpenModal={(item) => openModal({ ...item, type: 'video' })}
          />
        </div>

        {/* ================= SECTION 2: AI & CANVA DESIGNS ================= */}
        <div>
          <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-black">
            <span className="w-3 h-3 bg-black rounded-full" />
            <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-black">
              02 / GRAPHIC DESIGNS & VISUAL BRANDING
            </h3>
            <span className="text-xs font-bold text-black/50 uppercase tracking-widest ml-auto hidden sm:inline">
              [CURATED CREATIVE SHOWCASE]
            </span>
          </div>

          <GraphicDesignShowcase
            items={showcaseDesigns}
            onOpenModal={(item) => openModal({ ...item, type: 'image' })}
            isWhiteBg={false}
          />
        </div>

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
    </section>
  );
}


