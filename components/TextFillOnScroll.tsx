"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextFillOnScrollProps {
  children: React.ReactNode;
  className?: string;
  fillColor?: string;
  duration?: number;
  delay?: number;
}

export default function TextFillOnScroll({
  children,
  className = "",
  fillColor = "#0EA5E9",
  duration = 1.5,
  delay = 0,
}: TextFillOnScrollProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Trigger grid effect on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (textRef.current && typeof window !== "undefined") {
      const rect = textRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      window.dispatchEvent(
        new CustomEvent('headingHover', {
          detail: { x: centerX, y: centerY, active: true },
        })
      );
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent('headingHover', {
          detail: { x: 0, y: 0, active: false },
        })
      );
    }
  };

  useEffect(() => {
    if (!textRef.current || typeof window === "undefined") return;

    const element = textRef.current;
    let animation: gsap.core.Tween | null = null;
    let shockAnimation: gsap.core.Timeline | null = null;

    // Set initial state immediately
    gsap.set(element, {
      backgroundImage: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} 0%, #1F2937 0%, #1F2937 100%)`,
      backgroundSize: "100% 100%",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
    });

    // Wait for layout to be ready
    const timer = setTimeout(() => {
      if (!element) return;

      // Create left-to-right fill animation
      animation = gsap.to(element, {
        backgroundImage: `linear-gradient(to right, ${fillColor} 100%, ${fillColor} 100%, ${fillColor} 100%, ${fillColor} 100%)`,
        duration: duration,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 75%",  // Start when entering viewport
          end: "top 50%",    // Complete when halfway (50% mark)
          scrub: 1,          // Smooth scrubbing
          toggleActions: "play none none reverse",
          once: false,
          invalidateOnRefresh: true,
          markers: false,
          onUpdate: (self) => {
            // Trigger shock when animation reaches 100%
            if (self.progress === 1 && !element.classList.contains('shocked')) {
              element.classList.add('shocked');
              
              // Shock animation when fill completes
              shockAnimation = gsap.timeline({
                onComplete: () => {
                  element.classList.remove('shocked');
                }
              });
              
              shockAnimation
                .to(element, {
                  scale: 1.08,
                  duration: 0.15,
                  ease: "back.out(3)",
                })
                .to(element, {
                  x: -4,
                  duration: 0.04,
                  ease: "power2.inOut",
                })
                .to(element, {
                  x: 4,
                  duration: 0.04,
                  ease: "power2.inOut",
                })
                .to(element, {
                  x: -3,
                  duration: 0.04,
                  ease: "power2.inOut",
                })
                .to(element, {
                  x: 3,
                  duration: 0.04,
                  ease: "power2.inOut",
                })
                .to(element, {
                  x: -2,
                  duration: 0.04,
                  ease: "power2.inOut",
                })
                .to(element, {
                  x: 0,
                  scale: 1,
                  duration: 0.25,
                  ease: "elastic.out(1, 0.4)",
                });
            }
          },
        },
      });

      // Force refresh all ScrollTriggers
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, 150);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (animation) {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      }
      if (shockAnimation) {
        shockAnimation.kill();
      }
    };
  }, [fillColor, duration, delay]);

  return (
    <span
      ref={textRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className} cursor-pointer transition-transform duration-300 ${
        isHovered ? "scale-105" : ""
      }`}
      style={{
        fontWeight: "inherit",
        backgroundImage: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} 0%, #1F2937 0%, #1F2937 100%)`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}

