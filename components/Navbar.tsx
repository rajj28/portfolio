"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, Award, Code, MessageCircle, Star, Trophy } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { fadeIn } from "@/lib/animations";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", icon: <Home size={20} /> },
  { id: "projects", label: "Projects", icon: <Briefcase size={20} /> },
  { id: "best-work", label: "Best Work", icon: <Star size={20} /> },
  { id: "skills", label: "Skills", icon: <Code size={20} /> },
  { id: "certifications", label: "Certifications", icon: <Award size={20} /> },
  { id: "achievements", label: "Achievements", icon: <Trophy size={20} /> },
  { id: "contact", label: "Contact", icon: <MessageCircle size={20} /> },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  // Smooth section detection with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -60% 0px", // Trigger when section is near center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the most visible section
      let mostVisible = entries[0];
      let maxRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisible = entry;
        }
      });

      if (mostVisible && mostVisible.isIntersecting) {
        setActiveSection(mostVisible.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
          {/* Desktop Navbar - Right Side, Glassy & Modern - Truly Fixed */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2 rounded-3xl px-3 py-6"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Navigation dots with glassmorphism */}
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToElement(item.id)}
                  className={`group relative p-3 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white bg-accent shadow-lg"
                      : "text-secondary/80 hover:text-secondary hover:bg-white/30 hover:drop-shadow-2xl"
                  }`}
                  style={{
                    backdropFilter: activeSection !== item.id ? "blur(10px)" : "none",
                  }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                >
                  {item.icon}
                  
                  {/* Tooltip - Left side with glassmorphism */}
                  <span
                    className="absolute right-full mr-3 px-3 py-1.5 text-secondary text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator - electric blue glow */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: "0 0 20px rgba(14, 165, 233, 0.6)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

      </motion.nav>

          {/* Mobile Navbar - Top, Glassy */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:hidden fixed top-0 left-0 right-0 z-50"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center justify-center gap-2 px-6 py-3">
              {/* Navigation items */}
              {navItems.slice(0, 6).map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToElement(item.id)}
                  className={`p-2.5 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white bg-accent shadow-lg"
                      : "text-secondary/80 hover:text-secondary hover:drop-shadow-2xl"
                  }`}
                  style={{
                    background: activeSection !== item.id ? "rgba(255, 255, 255, 0.3)" : undefined,
                    backdropFilter: activeSection !== item.id ? "blur(10px)" : "none",
                  }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                >
                  {item.icon}
                </motion.button>
              ))}
            </div>
      </motion.nav>
    </>
  );
}

