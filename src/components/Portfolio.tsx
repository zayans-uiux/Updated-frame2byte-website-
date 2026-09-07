import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import GraphicDesignShowcase from './GraphicDesignShowcase';
import ReelShowcase from './ReelShowcase';

const showcaseReels = [
  { id: 1, title: 'REEL 01', category: 'SHORT-FORM EDIT', src: '/videos/video3.mp4' },
  { id: 2, title: 'REEL 02', category: 'GROWTH CONTENT', src: '/videos/video7.mp4' },
  { id: 3, title: 'REEL 03', category: 'VIRAL CAMPAIGN', src: '/videos/video8.mp4' },
  { id: 4, title: 'REEL 04', category: 'HIGH RETENTION', src: '/videos/video9.mp4' },
  { id: 5, title: 'REEL 05', category: 'MOTION EDIT', src: '/videos/video12.mp4' },
];

const showcaseDesigns = [
  { id: 101, title: 'GRAPHIC 01', category: 'BRAND IDENTITY', src: '/images/image8.jpeg' },
  { id: 102, title: 'GRAPHIC 02', category: 'AI CAMPAIGN', src: '/images/image10.jpeg' },
  { id: 103, title: 'GRAPHIC 03', category: 'BRANDING POST', src: '/images/images3.png' },
  { id: 104, title: 'GRAPHIC 04', category: 'MARKETING ASSET', src: '/images/whatsapp_post.jpeg' },
  { id: 105, title: 'GRAPHIC 05', category: 'E-COMMERCE DESIGN', src: '/images/grindup_post1.png' },
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
    <section id="portfolio" className="py-14 sm:py-20 bg-[#F5F4EF] text-black border-b border-black/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ================= SECTION 1: REELS N CLIPPING ================= */}
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <ReelShowcase
            reels={showcaseReels}
            onOpenModal={(item) => openModal({ ...item, type: 'video' })}
            title={
              <>
                REELS N <br />
                <span className="text-[#FF3B2F]">CLIPPING.</span>
              </>
            }
            subtitle={
              <>
                HIGH-RETENTION SHORT-FORM EDITS AND VIRAL CLIPS DESIGNED FOR <span className="text-[#FF3B2F]">RAPID AUDIENCE GROWTH.</span>
              </>
            }
            categoryNumber="01"
            categoryTitle="SHORT-FORM REEL EDITS"
            categoryTag="[HIGH-RETENTION REELS]"
            actionButton={
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#FF3B2F] transition-colors shadow-[4px_4px_0px_#FF3B2F] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <span>EXPLORE FULL PORTFOLIO</span>
                <ArrowUpRight size={16} className="stroke-[3]" />
              </Link>
            }
          />
        </div>

        {/* ================= SLIM HORIZONTAL DIVIDER LINE (REFERENCE IMAGE 2) ================= */}
        <div className="w-full my-8 sm:my-12 lg:my-14 flex items-center justify-center px-2 sm:px-6">
          <div className="w-full h-px bg-black/15 max-w-6xl mx-auto" />
        </div>

        {/* ================= SECTION 2: GRAPHIC DESIGNS & PINS ================= */}
        <div>
          <GraphicDesignShowcase
            items={showcaseDesigns}
            onOpenModal={(item) => openModal({ ...item, type: 'image' })}
            title={
              <>
                GRAPHIC <br />
                <span className="text-[#FF3B2F]">DESIGN.</span>
              </>
            }
            subtitle={
              <>
                HIGH-IMPACT BRAND ARTWORK, SOCIAL CREATIVES, AND CAMPAIGN POSTERS CRAFTED FOR VIRAL ATTRACTION.
              </>
            }
            categoryNumber="02"
            categoryTitle="CURATED ARTWORK"
            categoryTag="[PINS]"
            actionButton={
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#FF3B2F] transition-colors shadow-[4px_4px_0px_#FF3B2F] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <span>VIEW ALL PINS</span>
                <ArrowUpRight size={16} className="stroke-[3]" />
              </Link>
            }
            isWhiteBg={false}
          />
        </div>

      </div>

      {/* Modal Lightbox */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMedia?.type === 'video' ? (
          <video
            controls
            autoPlay
            playsInline
            {...({ 'webkit-playsinline': 'true' } as Record<string, string>)}
            preload="auto"
            className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl bg-black"
          >
            <source src={selectedMedia.src} type="video/mp4; codecs=avc1.42E01E, mp4a.40.2" />
            <source src={selectedMedia.src} type="video/mp4" />
          </video>
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


