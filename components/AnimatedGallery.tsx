"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// Gallery images from public/gallery-images folder
const galleryImages = [
  "/gallery-images/1735059144203.jpg",
  "/gallery-images/1735059144513.jpg",
  "/gallery-images/1735059144697.jpg",
  "/gallery-images/1745753699633.jpg",
  "/gallery-images/1745753700310.jpg",
];

export default function AnimatedGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stack, setStack] = useState<number[]>([0, 1, 2]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePos({
          x: (e.clientX - centerX) / 30,
          y: (e.clientY - centerY) / 30,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Apply parallax to top card
  useEffect(() => {
    if (cardsRef.current[0]) {
      gsap.to(cardsRef.current[0], {
        rotateY: mousePos.x * 0.5,
        rotateX: -mousePos.y * 0.5,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [mousePos]);

  // Floating animation for stack
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          y: -15 - index * 5,
          duration: 2 + index * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        });
      }
    });
  }, [stack]);

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      peelCard();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const peelCard = () => {
    const topCard = cardsRef.current[0];
    if (!topCard) return;

    // Peel off animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Update stack - move to next set of cards
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
        setStack((prev) => {
          const next = [...prev];
          next.shift(); // Remove first
          const newIndex = (prev[prev.length - 1] + 1) % galleryImages.length;
          next.push(newIndex); // Add new to end
          return next;
        });
      },
    });

    tl.to(topCard, {
      rotateX: -15,
      y: -100,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(topCard, {
        y: -600,
        rotateX: -45,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      }, "-=0.1");

    // Bring back cards forward
    cardsRef.current.forEach((card, index) => {
      if (card && index > 0) {
        gsap.to(card, {
          z: index === 1 ? 0 : -80,
          scale: index === 1 ? 1 : 0.9,
          opacity: index === 1 ? 1 : 0.6,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[550px] flex items-center justify-center"
      style={{ perspective: "1500px" }}
    >
      {/* Card Stack */}
      <div 
        className="relative" 
        style={{ 
          transformStyle: "preserve-3d",
          transform: "translateX(-50px)" // Shift left to center better
        }}
      >
        {stack.map((imageIndex, stackIndex) => (
          <div
            key={`${imageIndex}-${stackIndex}`}
            ref={(el) => {
              cardsRef.current[stackIndex] = el;
            }}
            className="absolute"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(${-stackIndex * 80}px) scale(${1 - stackIndex * 0.1})`,
              opacity: stackIndex === 0 ? 1 : 0.6 - stackIndex * 0.2,
              zIndex: 10 - stackIndex,
              top: "50%",
              left: "50%",
              marginTop: "-225px", // Half of card height (450/2)
              marginLeft: "-200px", // Half of card width (400/2)
            }}
          >
            {/* Card */}
            <div
              className="relative bg-white rounded-3xl overflow-hidden"
              style={{
                width: "400px",
                height: "450px",
                boxShadow: `
                  0 ${20 + stackIndex * 10}px ${40 + stackIndex * 20}px rgba(0, 0, 0, ${0.2 + stackIndex * 0.1}),
                  0 0 0 1px rgba(14, 165, 233, ${0.3 - stackIndex * 0.1}),
                  0 0 ${60 - stackIndex * 20}px rgba(14, 165, 233, ${0.2 - stackIndex * 0.1})
                `,
              }}
            >
              <Image
                src={galleryImages[imageIndex]}
                alt={`Gallery image ${imageIndex + 1}`}
                fill
                className="object-cover"
                sizes="400px"
                priority={stackIndex === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Accent Elements */}
      <div
        className="absolute -top-8 -right-8 w-20 h-20 bg-accent/20 rounded-full blur-2xl pointer-events-none"
        style={{
          animation: "float 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/20 rounded-full blur-2xl pointer-events-none"
        style={{
          animation: "float 4s ease-in-out infinite reverse",
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: scale(1) translateY(0); opacity: 0.3; }
          50% { transform: scale(1.2) translateY(-10px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

