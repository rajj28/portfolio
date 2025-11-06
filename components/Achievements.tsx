"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Star, Zap } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import Image from "next/image";
import TextFillOnScroll from "./TextFillOnScroll";
import { useState, useEffect } from "react";
import AwardsVideoSlideshow from "./AwardsVideoSlideshow";

// Database types (from API)
interface AchievementFromDB {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  date: string;
  date_display: string;
  display_order: number;
  is_featured: boolean;
}

interface AwardFromDB {
  id: string;
  title: string;
  organization: string;
  description: string;
  year: string;
  category: string;
  display_order: number;
  is_featured: boolean;
}

interface AchievementStatFromDB {
  id: string;
  stat_key: string;
  label: string;
  value: string;
  display_order: number;
}

interface ApiResponse {
  achievements: AchievementFromDB[];
  awards: AwardFromDB[];
  stats: AchievementStatFromDB[];
}

// Helper function to get icon based on category
const getCategoryIcon = (category: string) => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('competition') || lowerCategory.includes('award')) {
    return <Trophy className="text-accent" />;
  } else if (lowerCategory.includes('speaking') || lowerCategory.includes('event')) {
    return <Zap className="text-accent" />;
  } else if (lowerCategory.includes('community') || lowerCategory.includes('open source')) {
    return <Star className="text-accent" />;
  } else {
    return <Award className="text-accent" />;
  }
};

// Helper function to get stat icon based on label
const getStatIcon = (label: string) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes('award')) {
    return <Trophy size={24} className="text-accent" />;
  } else if (lowerLabel.includes('recognition')) {
    return <Award size={24} className="text-accent" />;
  } else if (lowerLabel.includes('speaking') || lowerLabel.includes('event')) {
    return <Zap size={24} className="text-accent" />;
  } else {
    return <Star size={24} className="text-accent" />;
  }
};

export default function Achievements() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/achievements')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch achievements:', err);
        setLoading(false);
      });
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section id="achievements" className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center text-body">Loading achievements...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-accent/20 mb-6"
          >
            <Trophy size={20} className="text-accent" />
            <span className="text-sm text-body font-medium tracking-wide uppercase">
              Accomplishments
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-heading">My </span>
            <TextFillOnScroll fillColor="#0EA5E9" duration={1.8}>
              Achievements
            </TextFillOnScroll>
          </h2>

          <motion.p
            variants={staggerItem}
            className="text-body text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Milestones, awards, and recognitions that mark my journey in technology and innovation
          </motion.p>
        </motion.div>

        {/* Achievement Highlights Section with Video Slideshow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24"
        >
          {/* Section Title */}
          <motion.h3
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-heading mb-12 text-center"
          >
            Achievement <span className="text-accent">Highlights</span>
          </motion.h3>

          {/* Video Slideshow - Prominently Displayed */}
          <motion.div
            variants={fadeInUp}
            className="mb-16"
          >
            <AwardsVideoSlideshow />
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={staggerContainer}
            className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {(data?.stats || []).map((stat, index) => (
              <motion.div
                key={stat.id}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -8 }}
                className="glassmorphism rounded-xl p-6 text-center hover:shadow-xl transition-all group"
              >
                <motion.div 
                  className="flex justify-center mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {getStatIcon(stat.label)}
                </motion.div>
                <div className="text-3xl font-black text-accent mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-textLight font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Awards List */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {(data?.awards || []).map((award, index) => (
              <motion.div
                key={award.id}
                variants={staggerItem}
                whileHover={{ x: 10, scale: 1.02 }}
                className="glassmorphism rounded-xl p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <Award className="text-accent" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-heading group-hover:text-accent transition-colors">
                        {award.title}
                      </h4>
                      <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {award.year}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-secondary mb-2">
                      {award.organization}
                    </p>
                    <p className="text-sm text-body leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Achievements Gallery Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-heading mb-12 text-center"
          >
            Achievement <span className="text-accent">Gallery</span>
          </motion.h3>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(data?.achievements || []).map((achievement, index) => (
            <motion.div
              key={achievement.id}
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="glassmorphism rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={achievement.image_url}
                    alt={achievement.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-xs font-bold text-secondary">{achievement.date_display}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-accent/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {getCategoryIcon(achievement.category)}
                    <span className="text-xs font-bold text-white">{achievement.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-heading mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-body text-sm leading-relaxed line-clamp-3 mb-4">
                    {achievement.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div className="mt-auto pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-textLight">
                      <span className="font-medium">{achievement.category}</span>
                      <motion.div
                        className="w-8 h-0.5 bg-accent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(14,165,233,0.3)]" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
