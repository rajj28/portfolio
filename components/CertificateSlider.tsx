"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CertificateSlider() {
  const [certificates, setCertificates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const response = await fetch('/api/participation-certificates');
        
        if (!response.ok) {
          throw new Error('Failed to fetch certificates');
        }
        
        const data = await response.json();
        setCertificates(data.certificates || []);
      } catch (error) {
        console.error("Failed to load certificates:", error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchCertificates();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false,
    centerMode: true,
    centerPadding: "80px",
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    touchMove: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: { 
          slidesToShow: 3,
          centerPadding: "60px",
          speed: 3000,
        }
      },
      {
        breakpoint: 1024,
        settings: { 
          slidesToShow: 2,
          centerPadding: "50px",
          speed: 3000,
        }
      },
      {
        breakpoint: 768,
        settings: { 
          slidesToShow: 1,
          centerPadding: "100px",
          speed: 3000,
        }
      },
      {
        breakpoint: 640,
        settings: { 
          slidesToShow: 1,
          centerPadding: "40px",
          speed: 3000,
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="mt-16 text-center py-12">
        <div className="inline-flex items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
          <p className="text-lg text-body font-medium">Loading certificates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 text-center py-12">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-full">
          <span className="text-red-500">⚠️</span>
          <p className="text-red-500 font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="mt-16 text-center py-12">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-cardBg border border-border rounded-full">
          <Award className="text-textLight" size={20} />
          <p className="text-body font-medium">No certificates found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-16 w-full overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary via-primary/80 to-transparent z-10 pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <Slider {...settings}>
        {certificates.map((url, idx) => (
          <div 
            key={idx} 
            className="px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="cursor-pointer group relative"
              onClick={() => setSelectedCert(url)}
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-accent/30 bg-gradient-to-br from-cardBg to-cardBg/80 border border-border/50 group-hover:border-accent/30">
                {/* Badge indicator */}
                <div className="absolute top-4 right-4 z-20">
                  <motion.div
                    className="bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-full p-2"
                    whileHover={{ scale: 1.1, rotate: 12 }}
                  >
                    <Sparkles className="text-accent" size={16} />
                  </motion.div>
                </div>

                {/* Image container */}
                <div className="relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <img 
                    src={url} 
                    alt={`Certificate ${idx + 1}`} 
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    style={{ aspectRatio: '4/3' }}
                  />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
                  >
                    <Award className="text-white" size={18} />
                    <span className="text-white font-semibold text-sm">View Certificate</span>
                  </motion.div>
                </div>

                {/* Border gradient animation */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-secondary to-accent animate-spin-slow" 
                       style={{ padding: '2px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
                </div>
              </div>

              {/* Number badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-accent to-secondary px-4 py-1 rounded-full text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  #{idx + 1}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>

      {/* Bottom decorative line */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/50" />
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-accent"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/50" />
        </div>
      </div>

      {/* Modal for expanded certificate */}
      <Modal
        isOpen={!!selectedCert}
        onRequestClose={() => setSelectedCert(null)}
        className="flex items-center justify-center p-4 outline-none"
        overlayClassName="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999] flex items-center justify-center"
        ariaHideApp={false}
      >
        {selectedCert && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-7xl w-full"
          >
            {/* Close button */}
            <motion.button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-14 right-0 text-white hover:text-accent transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center border border-white/20"
              aria-label="Close modal"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>

            {/* Certificate image with glow */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 rounded-2xl blur-2xl" />
              <img
                src={selectedCert}
                alt="Expanded Certificate"
                className="relative max-h-[90vh] w-auto mx-auto rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Download hint */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-6"
            >
              <p className="text-white/60 text-sm">Press ESC to close</p>
            </motion.div>
          </motion.div>
        )}
      </Modal>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}