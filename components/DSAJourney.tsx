"use client";

import { motion } from "framer-motion";
import { Github, Youtube, ExternalLink, Trophy, Code, BookOpen, Target } from "lucide-react";
import TextFillOnScroll from "./TextFillOnScroll";

const youtubeChannels = [
  {
    name: "Striver (TakeUForward)",
    url: "https://www.youtube.com/@takeUforward",
    description: "Complete DSA playlist with A-Z solutions",
    icon: "🎯"
  },
  {
    name: "Kunal Kushwaha",
    url: "https://www.youtube.com/@KunalKushwaha",
    description: "DSA Bootcamp & Interview Prep",
    icon: "💻"
  },
  {
    name: "CodeHelp by Babbar",
    url: "https://www.youtube.com/@CodeHelp",
    description: "Love Babbar's DSA Supreme Course",
    icon: "📚"
  },
];

const platforms = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/",
    color: "#FFA116",
    icon: Code,
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/",
    color: "#00EA64",
    icon: Trophy,
  },
  {
    name: "CodeForces",
    url: "https://codeforces.com/",
    color: "#1F8ACB",
    icon: Target,
  },
];

const stats = [
  { label: "Lectures Completed", value: "65+", color: "#0EA5E9" },
  { label: "Problems Solved", value: "500+", color: "#10B981" },
  { label: "Topics Mastered", value: "20+", color: "#8B5CF6" },
  { label: "Hours Invested", value: "1000+", color: "#F59E0B" },
];

export default function DSAJourney() {
  return (
    <section id="dsa" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-cardBg px-4 py-2 rounded-full border border-border shadow-md mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Code size={20} className="text-accent" />
            <span className="text-sm text-textLight font-medium">Problem Solving Mastery</span>
            <Code size={20} className="text-accent" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-heading">My </span>
            <TextFillOnScroll fillColor="#0EA5E9" duration={1.8}>
              DSA Journey
            </TextFillOnScroll>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glassmorphism p-6 rounded-2xl text-center border border-border/50"
            >
              <div
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-body">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Journey Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphism p-8 rounded-3xl border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-accent" size={28} />
              <h3 className="text-2xl font-bold text-heading">My Journey</h3>
            </div>
            
            <div className="space-y-4 text-body leading-relaxed">
              <p>
                Data Structures and Algorithms have been one of my favorite areas to explore. 
                It's really epic and challenging to solve DSA problems, pushing my logical thinking 
                and problem-solving skills to new heights every single day.
              </p>
              
              <p>
                I've completed <span className="text-accent font-semibold">65+ comprehensive lectures</span> covering 
                everything from basic data structures like arrays and linked lists to advanced topics like dynamic 
                programming, graph algorithms, and complex tree structures.
              </p>
              
              <p>
                Through consistent practice and dedication, I've solved <span className="text-secondary font-semibold">500+ problems</span> across 
                multiple platforms, mastering over 20 different topics. Each problem teaches something new, 
                and the satisfaction of optimizing a solution is unmatched.
              </p>

              <p className="text-textLight italic">
                "The journey of a thousand problems begins with a single line of code."
              </p>
            </div>

            {/* GitHub Link */}
            <motion.a
              href="https://github.com/rajj28/My_DSA_Journey"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-all group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="text-secondary group-hover:text-accent transition-colors" size={24} />
              <div className="flex-1">
                <div className="text-heading font-semibold group-hover:text-secondary transition-colors">
                  My DSA Journey Repository
                </div>
                <div className="text-sm text-body">
                  65+ Lectures | Full Code & Solutions
                </div>
              </div>
              <ExternalLink className="text-textLight group-hover:text-accent transition-colors" size={20} />
            </motion.a>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* YouTube Channels */}
            <div className="glassmorphism p-8 rounded-3xl border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Youtube className="text-red-500" size={28} />
                <h3 className="text-2xl font-bold text-heading">Learning Resources</h3>
              </div>
              
              <div className="space-y-3">
                {youtubeChannels.map((channel, index) => (
                  <motion.a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-primary/30 hover:bg-primary/50 transition-all group"
                  >
                    <span className="text-3xl">{channel.icon}</span>
                    <div className="flex-1">
                      <div className="text-heading font-semibold group-hover:text-accent transition-colors">
                        {channel.name}
                      </div>
                      <div className="text-xs text-body">{channel.description}</div>
                    </div>
                    <ExternalLink className="text-textLight group-hover:text-accent transition-colors" size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Practice Platforms */}
            <div className="glassmorphism p-8 rounded-3xl border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Target className="text-accent" size={28} />
                <h3 className="text-2xl font-bold text-heading">Practice Platforms</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border/30 bg-primary/30 hover:bg-primary/50 transition-all group"
                  >
                    <platform.icon 
                      size={32} 
                      style={{ color: platform.color }}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span className="text-xs font-semibold text-center text-heading group-hover:text-accent transition-colors">
                      {platform.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glassmorphism p-8 rounded-3xl border border-border/50"
        >
          <h3 className="text-2xl font-bold text-heading mb-6 text-center">Learning Path</h3>
          
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent via-secondary to-accent/30" />
            
            <div className="space-y-8">
              {[
                { title: "Foundation", topics: "Arrays, Strings, Basics", progress: 100 },
                { title: "Intermediate", topics: "Linked Lists, Stacks, Queues, Trees", progress: 100 },
                { title: "Advanced", topics: "Graphs, DP, Advanced Trees", progress: 85 },
                { title: "Expert", topics: "System Design, Complex Algorithms", progress: 60 },
              ].map((phase, index) => (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="flex-1 text-right" style={{ opacity: index % 2 === 0 ? 1 : 0 }}>
                    <div className="text-lg font-bold text-heading">{phase.title}</div>
                    <div className="text-sm text-body">{phase.topics}</div>
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{
                        background: `conic-gradient(${phase.progress >= 100 ? '#10B981' : '#0EA5E9'} ${phase.progress * 3.6}deg, #1F2937 0deg)`,
                        boxShadow: `0 0 20px ${phase.progress >= 100 ? '#10B98140' : '#0EA5E940'}`,
                      }}
                    >
                      <span className="text-sm">{phase.progress}%</span>
                    </motion.div>
                  </div>
                  
                  <div className="flex-1" style={{ opacity: index % 2 === 1 ? 1 : 0 }}>
                    <div className="text-lg font-bold text-heading">{phase.title}</div>
                    <div className="text-sm text-body">{phase.topics}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

