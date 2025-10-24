"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { fadeIn, fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { scrollToElement } from "@/lib/utils";
import AnimatedGallery from "./AnimatedGallery";
import TextFillOnScroll from "./TextFillOnScroll";
import InteractiveGrid from "./InteractiveGrid";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Typing animation for role
  const roles = ["AI Enthusiast", "Backend Developer", "Go & Node.js Developer", "Innovation Lover", "Problem Solver"];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Generate static particle data (same on server and client)
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      // Use consistent values that won't change between renders
      xPercent: (i * 3.33) % 100, // Distribute evenly
      yPercent: (i * 7.5) % 100,
      duration: 15 + (i % 5) * 2,
      delay: (i % 10) * 0.5,
    }));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    const currentText = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.substring(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.substring(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  // Safe parallax calculation
  const parallaxX = isMounted ? (mousePosition.x - window.innerWidth / 2) * 0.01 : 0;
  const parallaxY = isMounted ? (mousePosition.y - window.innerHeight / 2) * 0.01 : 0;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0"
    >
      {/* Interactive Grid Effect */}
      <InteractiveGrid />

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient mesh */}
        <motion.div
          className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          }}
        />
        <motion.div
          className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transform: `translate(${-parallaxX}px, ${-parallaxY}px)`,
          }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-accent/20 rounded-full"
            style={{
              left: `${particle.xPercent}%`,
              top: `${particle.yPercent}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left side - Text content (60%) */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="inline-flex items-center gap-2 bg-cardBg px-4 py-2 rounded-full border border-border shadow-md"
            >
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm text-textLight font-medium">Available for new opportunities</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={slideInLeft}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              <span className="text-heading">Hi, I&apos;m</span>{" "}
              <span className="block mt-2">
                <TextFillOnScroll fillColor="#0EA5E9" duration={2}>
                  Ruturaj Sonkamble
                </TextFillOnScroll>
              </span>
            </motion.h1>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-2xl md:text-3xl text-body h-12 flex items-center font-medium"
            >
              <span>{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="ml-1 text-secondary"
              >
                |
              </motion.span>
            </motion.div>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg text-body max-w-2xl leading-relaxed"
            >
              I&apos;m an AI enthusiast passionate about backend development with Go and Node.js. 
              I love building innovative solutions and turning complex problems into elegant, 
              scalable systems. Always exploring new technologies and pushing boundaries.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() => scrollToElement("projects")}
                className="bg-accent text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-accentDark transition-colors"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
              </motion.button>

              <motion.a
                href="mailto:ruturajsonkamble29@gmail.com"
                className="bg-secondary text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-secondary/90 transition-colors inline-block"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>

          {/* Right side - Animated Gallery (40%) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRight}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <AnimatedGallery />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollToElement("projects")}
      >
        <span className="text-textLight text-sm font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={24} className="text-secondary" />
        </motion.div>
      </motion.div>

      {/* Parallax effect on scroll */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: 1 - scrollY / 500,
        }}
      />
    </section>
  );
}

