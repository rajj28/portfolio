"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Video {
  id: string;
  name: string;
  url: string;
  created_at?: string;
}

export default function AwardsVideoSlideshow() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState<boolean[]>([]);
  const [error, setError] = useState<string | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Fetch videos from API
  useEffect(() => {
    fetch('/api/achievements/videos')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log('Fetched videos:', data.videos?.length, 'Total:', data.count);
          console.log('Video names:', data.videos?.map((v: Video) => v.name));
          setVideos(data.videos || []);
          setIsMuted(new Array(data.videos?.length || 0).fill(true));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch videos:', err);
        setError('Failed to load videos');
        setLoading(false);
      });
  }, []);

  // Auto-play all videos continuously on loop
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== expandedIndex) {
        video.loop = true;
        video.muted = isMuted[index] ?? true;
        video.play().catch(() => {
          // Autoplay blocked - will need user interaction
        });
      }
    });
  }, [videos.length, isMuted, expandedIndex]);

  // Handle expanded video
  useEffect(() => {
    if (expandedIndex !== null && videoRefs.current[expandedIndex]) {
      const video = videoRefs.current[expandedIndex];
      video.loop = true;
      video.muted = isMuted[expandedIndex] ?? true;
      video.play().catch(() => {});
    }
  }, [expandedIndex, isMuted]);

  // GSAP ScrollTrigger for expand on scroll
  useEffect(() => {
    if (!containerRef.current || videos.length === 0) return;

    const container = containerRef.current;

    // Create ScrollTrigger animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => {
        setIsExpanded(true);
        gsap.to(container, {
          scale: 1.1,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onLeave: () => {
        setIsExpanded(false);
        gsap.to(container, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onEnterBack: () => {
        setIsExpanded(true);
        gsap.to(container, {
          scale: 1.1,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        setIsExpanded(false);
        gsap.to(container, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      },
    });

    // Cleanup
    return () => {
      scrollTrigger.kill();
    };
  }, [videos.length]);

  // Toggle mute for specific video
  const toggleMute = (index: number) => {
    if (videoRefs.current[index]) {
      const newMuted = [...isMuted];
      newMuted[index] = !newMuted[index];
      videoRefs.current[index]!.muted = newMuted[index];
      setIsMuted(newMuted);
    }
  };

  // Expand video to full view
  const expandVideo = (index: number) => {
    setExpandedIndex(index);
  };

  // Close expanded view
  const closeExpanded = () => {
    setExpandedIndex(null);
  };

  // Navigate in expanded view
  const navigateExpanded = (direction: 'prev' | 'next') => {
    if (expandedIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (expandedIndex + 1) % videos.length
      : (expandedIndex - 1 + videos.length) % videos.length;
    
    setExpandedIndex(newIndex);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-body">Loading videos...</div>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-body mb-2">
            {error || "No videos found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        ref={containerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="w-full"
      >
        {/* Side by Side Videos - Reduced Size for Better UX */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              variants={fadeInUp}
              className="flex-shrink-0 relative group cursor-pointer"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Video Container - Smaller Size */}
              <div
                className="relative rounded-xl overflow-hidden shadow-xl bg-black transition-transform duration-300"
                style={{
                  width: '200px',
                  height: '356px', // 9:16 aspect ratio (reduced size)
                }}
                onClick={() => expandVideo(index)}
              >
                {/* Video Element - Auto-play, Loop */}
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={video.url}
                  className="w-full h-full object-cover"
                  muted={isMuted[index] ?? true}
                  playsInline
                  loop
                  autoPlay
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Video Number Badge */}
                <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <span className="text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Mute Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute(index);
                  }}
                  className="absolute bottom-2 right-2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
                  aria-label={isMuted[index] ? "Unmute" : "Mute"}
                >
                  {isMuted[index] ? (
                    <VolumeX className="text-white" size={16} />
                  ) : (
                    <Volume2 className="text-white" size={16} />
                  )}
                </button>

                {/* Expand Icon */}
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                    <Maximize2 className="text-white" size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Expanded Video Modal */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeExpanded}
          >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-[320px] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Expanded Video Frame */}
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
              style={{
                aspectRatio: '720/1280',
              }}
            >
              <video
                ref={(el) => {
                  if (expandedIndex !== null) {
                    videoRefs.current[expandedIndex] = el;
                  }
                }}
                key={videos[expandedIndex]?.id}
                src={videos[expandedIndex]?.url}
                className="w-full h-full object-cover"
                muted={expandedIndex !== null ? (isMuted[expandedIndex] ?? true) : true}
                playsInline
                loop
                autoPlay
              />

              {/* Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => expandedIndex !== null && toggleMute(expandedIndex)}
                    className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                  >
                    {expandedIndex !== null && (isMuted[expandedIndex] ?? true) ? (
                      <VolumeX className="text-white" size={20} />
                    ) : (
                      <Volume2 className="text-white" size={20} />
                    )}
                  </button>

                  <div className="flex-1 text-white text-center">
                    <p className="text-xs text-white/70">
                      {expandedIndex !== null ? expandedIndex + 1 : 0} / {videos.length}
                    </p>
                  </div>

                  <button
                    onClick={closeExpanded}
                    className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                    aria-label="Close"
                  >
                    <X className="text-white" size={20} />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              {videos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateExpanded('prev');
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                  >
                    <ChevronLeft className="text-white" size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateExpanded('next');
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                  >
                    <ChevronRight className="text-white" size={24} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
