"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

// Critical above-the-fold components (load immediately)
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UpdatesNotifications from "@/components/UpdatesNotifications";

// Heavy components (lazy load with dynamic imports for better performance)
const BestWork = dynamic(() => import("@/components/BestWork"), {
  loading: () => <div className="h-screen animate-pulse bg-cardBg/50" />,
  ssr: true,
});

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="h-screen animate-pulse bg-cardBg/50" />,
  ssr: true,
});

const SkillsWithChart = dynamic(() => import("@/components/SkillsWithChart"), {
  loading: () => <div className="h-screen animate-pulse bg-cardBg/50" />,
  ssr: true,
});

const DSAJourney = dynamic(() => import("@/components/DSAJourney"), {
  loading: () => <div className="h-screen animate-pulse bg-cardBg/50" />,
  ssr: true,
});

const Certifications = dynamic(() => import("@/components/Certifications"), {
  loading: () => <div className="h-screen animate-pulse bg-cardBg/50" />,
  ssr: true,
});

const Achievements = dynamic(() => import("@/components/Achievements"), {
  loading: () => <div className="h-screen animate-pulse bg-cardBg/50" />,
  ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-64 animate-pulse bg-cardBg/50" />,
  ssr: true,
});

export default function Home() {
  // Refresh ScrollTrigger after all content loads
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        const { ScrollTrigger } = require("gsap/ScrollTrigger");
        ScrollTrigger.refresh(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Updates/Notifications Button */}
      <UpdatesNotifications />
      
      {/* Content container with padding for navbar */}
      <div className="lg:pr-20">

      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <Projects />

      {/* Best Work Section */}
      <BestWork />

          {/* Skills Section */}
          <SkillsWithChart />

      {/* DSA Journey Section */}
      <DSAJourney />

      {/* Certifications Section */}
      <Certifications />

      {/* Achievements Section */}
      <Achievements />

      {/* Footer */}
      <Footer />
      </div>

          {/* Global background with grid pattern */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Clean white background */}
            <div className="absolute inset-0 bg-primary" />
            
            {/* Grid pattern - inspired by skills section */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #18181B 1px, transparent 1px),
                  linear-gradient(to bottom, #18181B 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            
            {/* Accent grid lines every 5th line */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #0EA5E9 1px, transparent 1px),
                  linear-gradient(to bottom, #0EA5E9 1px, transparent 1px)
                `,
                backgroundSize: '200px 200px',
              }}
            />
            
            {/* Subtle radial gradient for depth */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.03) 0%, transparent 50%)',
              }}
            />
          </div>
    </main>
  );
}

