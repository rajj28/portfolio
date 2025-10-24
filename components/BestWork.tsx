"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useMotionValue } from "framer-motion";
import { ExternalLink, Github, Award, Star } from "lucide-react";
import Image from "next/image";
import TextFillOnScroll from "./TextFillOnScroll";

interface BestWorkItem {
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  testimonial?: { text: string; author: string; position: string };
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
}

// Database project type
interface ProjectFromDB {
  id: string;
  title: string;
  description: string;
  detailed_description: string;
  thumbnail_url: string;
  tags: string[];
  metrics: any;
  github_url: string;
  demo_url: string;
}

// Fallback data if database is empty
const fallbackWorks: BestWorkItem[] = [
  {
    title: "Award-Winning E-Learning Platform",
    description: "Revolutionary online learning platform serving 100K+ students",
    detailedDescription:
      "Designed and developed a comprehensive e-learning platform that revolutionized online education. Features include interactive courses, real-time collaboration, AI-powered recommendations, and gamification elements.",
    image: "",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "AWS", "WebRTC"],
    metrics: [
      { label: "Active Users", value: "100K+" },
      { label: "Course Completion Rate", value: "87%" },
      { label: "User Satisfaction", value: "4.8/5" },
    ],
    testimonial: {
      text: "This platform transformed our educational approach and doubled our student engagement.",
      author: "Jane Doe",
      position: "CEO, EduTech Inc.",
    },
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    accentColor: "#0EA5E9", // Modern sky blue
  },
  {
    title: "Enterprise SaaS Dashboard",
    description: "Multi-tenant analytics platform for Fortune 500 companies",
    detailedDescription:
      "Built a scalable, enterprise-grade analytics dashboard handling millions of data points daily. Features advanced visualizations, custom reporting, role-based access control, and real-time data processing.",
    image: "",
    tags: ["React", "Node.js", "GraphQL", "Redis", "Kubernetes"],
    metrics: [
      { label: "Data Points/Day", value: "5M+" },
      { label: "Response Time", value: "<100ms" },
      { label: "Uptime", value: "99.9%" },
    ],
    testimonial: {
      text: "The dashboard exceeded our expectations and became essential to our operations.",
      author: "John Smith",
      position: "CTO, TechCorp",
    },
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    accentColor: "#4F46E5", // Professional indigo
  },
  {
    title: "AI-Powered Mobile App",
    description: "Smart assistant app with 50M+ downloads worldwide",
    detailedDescription:
      "Developed an intelligent mobile application leveraging machine learning for personalized recommendations. Features voice commands, predictive analytics, and seamless cross-platform experience.",
    image: "",
    tags: ["React Native", "Python", "TensorFlow", "Firebase", "ML"],
    metrics: [
      { label: "Downloads", value: "50M+" },
      { label: "Daily Active Users", value: "2M+" },
      { label: "App Rating", value: "4.9/5" },
    ],
    testimonial: {
      text: "This app revolutionized how our users interact with technology daily.",
      author: "Sarah Chen",
      position: "Product Lead, AI Corp",
    },
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    accentColor: "#EC4899", // Vibrant pink
  },
  {
    title: "E-Commerce Marketplace",
    description: "High-performance platform processing $10M+ monthly",
    detailedDescription:
      "Built a scalable e-commerce solution with advanced search, AI recommendations, secure payments, and vendor management. Handles 100K concurrent users during peak sales.",
    image: "",
    tags: ["Next.js", "Stripe", "Elasticsearch", "Redis", "AWS"],
    metrics: [
      { label: "Monthly Revenue", value: "$10M+" },
      { label: "Concurrent Users", value: "100K+" },
      { label: "Conversion Rate", value: "3.2%" },
    ],
    testimonial: {
      text: "Our revenue tripled within 6 months of launching this platform.",
      author: "Emily Rodriguez",
      position: "CEO, ShopHub",
    },
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    accentColor: "#F59E0B", // Warm amber
  },
  {
    title: "Real-Time Collaboration Suite",
    description: "Team productivity platform used by 10K+ companies",
    detailedDescription:
      "Created a comprehensive collaboration platform with real-time editing, video conferencing, project management, and analytics. Scales from 2 to 2000+ team members seamlessly.",
    image: "",
    tags: ["Vue.js", "WebSocket", "Docker", "MongoDB", "WebRTC"],
    metrics: [
      { label: "Companies", value: "10K+" },
      { label: "Max Team Size", value: "2000+" },
      { label: "Messages/Day", value: "100M+" },
    ],
    testimonial: {
      text: "Increased our team productivity by 40% in the first quarter.",
      author: "Michael Lee",
      position: "Director, GlobalCorp",
    },
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    accentColor: "#10B981", // Fresh green
  },
];

// Color palette for featured projects
const accentColors = [
  "#0EA5E9", // Sky blue
  "#4F46E5", // Indigo
  "#EC4899", // Pink
  "#10B981", // Green
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
];

// Convert database project to BestWorkItem format
function convertToBestWorkItem(project: ProjectFromDB, index: number): BestWorkItem {
  // Extract metrics from JSONB field or create defaults
  const metrics = project.metrics 
    ? Object.entries(project.metrics).map(([label, value]) => ({
        label: label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' '),
        value: String(value)
      })).slice(0, 3)
    : [];

  return {
    title: project.title,
    description: project.description,
    detailedDescription: project.detailed_description || project.description,
    image: project.thumbnail_url || '',
    tags: project.tags || [],
    metrics,
    githubUrl: project.github_url,
    liveUrl: project.demo_url,
    accentColor: accentColors[index % accentColors.length],
  };
}

export default function BestWork() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [bestWorks, setBestWorks] = useState<BestWorkItem[]>(fallbackWorks);
  const [loading, setLoading] = useState(true);
  
  // Fetch featured projects from database
  useEffect(() => {
    fetch('/api/projects?featured=true&limit=6')
      .then(res => res.json())
      .then(response => {
        const projects = response.data || [];
        if (projects.length > 0) {
          const convertedProjects = projects.map((p: ProjectFromDB, i: number) => 
            convertToBestWorkItem(p, i)
          );
          setBestWorks(convertedProjects);
        }
        // If no featured projects, keep fallback data
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch featured projects:', err);
        // Keep fallback data on error
        setLoading(false);
      });
  }, []);
  
  // Card dimensions
  const CARD_WIDTH = 400; // Width per card
  const GAP = 32; // Gap between cards
  
  // Calculate total width and drag constraints
  const totalCards = bestWorks.length;
  const cardsVisible = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 2 : 1;
  const maxDragDistance = (totalCards - cardsVisible) * (CARD_WIDTH + GAP);
  
  // Motion value for drag position
  const x = useMotionValue(0);

  return (
    <section id="best-work" className="relative py-24 overflow-hidden">
      {/* Solid background to block grid effect */}
      <div className="absolute inset-0 bg-primary -z-10" />
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-cardBg px-4 py-2 rounded-full border border-border shadow-md mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(14, 165, 233, 0.2)",
                "0 0 0 8px rgba(14, 165, 233, 0)",
              ] 
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Star size={20} className="text-accent fill-accent" />
            <span className="text-sm text-textLight font-medium">Finest Work Showcase</span>
            <Star size={20} className="text-accent fill-accent" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-heading">My </span>
            <TextFillOnScroll fillColor="#0EA5E9" duration={1.8}>
              Finest
            </TextFillOnScroll>
            <span className="text-heading"> Work</span>
          </h2>
          <motion.p 
            className="text-textLight text-sm flex items-center justify-center gap-2"
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>←</span>
            <span>Swipe to explore projects</span>
            <span>→</span>
          </motion.p>
        </motion.div>

        {/* Horizontal Slider */}
        <div ref={constraintsRef} className="relative overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{
              left: -maxDragDistance,
              right: 0
            }}
            dragElastic={0.1}
            dragTransition={{
              power: 0.2,
              timeConstant: 200,
              modifyTarget: (target) => {
                // Snap to nearest card
                const cardSize = CARD_WIDTH + GAP;
                return Math.round(target / cardSize) * cardSize;
              }
            }}
            style={{ x }}
            className="flex gap-8 cursor-grab active:cursor-grabbing py-4 px-4"
            whileTap={{ cursor: "grabbing" }}
          >
            {bestWorks.map((work, index) => (
              <motion.div
                key={work.title}
                style={{ 
                  width: `${CARD_WIDTH}px`,
                  flexShrink: 0
                }}
              >
                <BestWorkCard work={work} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BestWorkCard({ work, index }: { work: BestWorkItem; index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <motion.div
      className="relative h-full pointer-events-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        ref={ref}
        className="relative h-full"
      >
        <motion.div
          animate={inView ? { scale: 1.01 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden h-full flex flex-col bg-white shadow-xl"
          style={{
            border: `2px solid ${work.accentColor}20`,
          }}
        >
          {/* Image section - Square */}
          <motion.div
            className="relative aspect-square overflow-hidden"
            animate={inView ? { scale: 1.03 } : { scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            {work.image ? (
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${work.accentColor}15, ${work.accentColor}05)`,
                }}
              >
                <span
                  className="text-8xl font-bold opacity-30"
                  style={{ color: work.accentColor }}
                >
                  {work.title[0]}
                </span>
              </div>
            )}

            {/* Subtle dark gradient for better text readability */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            />

            {/* Links - Clean solid style */}
            <div className="absolute top-4 right-4 flex gap-2">
              {work.githubUrl && (
                <motion.a
                  href={work.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white rounded-full border-2 transition-all shadow-lg"
                  style={{
                    borderColor: work.accentColor,
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: `0 8px 20px ${work.accentColor}40`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View on GitHub"
                >
                  <Github size={18} style={{ color: work.accentColor }} />
                </motion.a>
              )}
              {work.liveUrl && (
                <motion.a
                  href={work.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white rounded-full border-2 transition-all shadow-lg"
                  style={{
                    borderColor: work.accentColor,
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: `0 8px 20px ${work.accentColor}40`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View live demo"
                >
                  <ExternalLink size={18} style={{ color: work.accentColor }} />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Content section - Clean and elegant */}
          <div className="p-6 space-y-4 flex-1 flex flex-col">
            <div>
              <h3
                className="text-xl font-bold mb-2 line-clamp-2"
                style={{ color: work.accentColor }}
              >
                {work.title}
              </h3>
              <p className="text-body text-sm line-clamp-2 mb-2">{work.description}</p>
              
              {/* Small description */}
              <p className="text-textLight text-xs leading-relaxed line-clamp-3">
                {work.detailedDescription}
              </p>
            </div>

            {/* Metrics - Clean solid style */}
            {work.metrics && work.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {work.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="text-center p-3 rounded-xl border-2"
                    style={{
                      background: `${work.accentColor}08`,
                      borderColor: `${work.accentColor}25`,
                    }}
                  >
                    <div
                      className="text-lg font-bold mb-1"
                      style={{ color: work.accentColor }}
                    >
                      {metric.value}
                    </div>
                    <div className="text-[10px] text-body leading-tight">{metric.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tags - Clean solid style */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {work.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded-full font-medium border-2"
                  style={{ 
                    background: `${work.accentColor}12`,
                    borderColor: `${work.accentColor}35`,
                    color: work.accentColor,
                  }}
                >
                  {tag}
                </span>
              ))}
              {work.tags.length > 3 && (
                <span 
                  className="px-2.5 py-1 text-xs font-medium"
                  style={{ color: work.accentColor, opacity: 0.7 }}
                >
                  +{work.tags.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Subtle hover shadow */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={
              inView
                ? {
                    boxShadow: `0 8px 30px ${work.accentColor}15`,
                  }
                : {
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  }
            }
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

