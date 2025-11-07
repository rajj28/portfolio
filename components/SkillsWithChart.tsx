"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Palette, Wrench } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import TextFillOnScroll from "./TextFillOnScroll";
import InteractiveGrid from "./InteractiveGrid";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Skill {
  name: string;
  level: number;
  description?: string;
}

interface SkillCategory {
  title: string;
  icon: JSX.Element;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code2 size={28} />,
    color: "#0EA5E9",
    skills: [
      { name: "React/Next.js", level: 95, description: "Building modern, performant web applications with server-side rendering" },
      { name: "TypeScript", level: 90, description: "Type-safe development with advanced TypeScript patterns" },
      { name: "Tailwind CSS", level: 92, description: "Rapid UI development with utility-first CSS framework" },
      { name: "Vue.js", level: 85, description: "Progressive framework for building user interfaces" },
      { name: "HTML/CSS", level: 98, description: "Semantic markup and responsive design fundamentals" },
    ],
  },
  {
    title: "Backend",
    icon: <Database size={28} />,
    color: "#8B5CF6",
    skills: [
      { name: "Node.js", level: 90, description: "Building scalable server-side applications and APIs" },
      { name: "Python", level: 88, description: "Data processing, automation, and backend development" },
      { name: "PostgreSQL", level: 85, description: "Relational database design and optimization" },
      { name: "MongoDB", level: 82, description: "NoSQL database for flexible data storage" },
      { name: "GraphQL", level: 80, description: "Efficient API queries with GraphQL" },
    ],
  },
  {
    title: "Design",
    icon: <Palette size={28} />,
    color: "#EC4899",
    skills: [
      { name: "Figma", level: 92, description: "UI/UX design and prototyping" },
      { name: "UI/UX Design", level: 88, description: "User-centered design principles and methodologies" },
      { name: "Prototyping", level: 85, description: "Interactive prototypes and user flows" },
      { name: "Design Systems", level: 87, description: "Creating consistent, scalable design systems" },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: <Wrench size={28} />,
    color: "#F59E0B",
    skills: [
      { name: "Git/GitHub", level: 93, description: "Version control and collaborative development" },
      { name: "Docker", level: 85, description: "Containerization and deployment" },
      { name: "AWS", level: 80, description: "Cloud infrastructure and services" },
      { name: "CI/CD", level: 82, description: "Automated testing and deployment pipelines" },
      { name: "Testing", level: 88, description: "Unit, integration, and E2E testing" },
    ],
  },
];

export default function SkillsWithChart() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(null);

  const radarData = skillCategories.flatMap((category) =>
    category.skills.slice(0, 3).map((skill) => ({
      skill: skill.name,
      level: skill.level,
      fullMark: 100,
      category: category.title,
      color: category.color,
    }))
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skill-card-minimal").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Interactive Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <InteractiveGrid />
      </div>

      {/* Subtle animated gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 -left-1/4 w-1/3 h-1/3 bg-secondary/8 rounded-full blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -right-1/4 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-accent/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-body font-medium tracking-wide uppercase">
              Skills & Expertise
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-heading">What I </span>
            <TextFillOnScroll fillColor="#0EA5E9" duration={1.8}>
              Bring
            </TextFillOnScroll>
            <span className="text-heading"> to the Table</span>
          </h2>

          <p className="text-body text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills and expertise
          </p>
        </motion.div>

        {/* === SIDE-BY-SIDE LAYOUT === */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16 mb-20">
          {/* LEFT: Radar Chart Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 bg-white rounded-3xl p-8 shadow-lg border border-border relative overflow-hidden transform lg:scale-90"
          >
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent rounded-br-3xl" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-center mb-8 text-heading">
                Skills Overview
              </h3>
              <div className="w-full h-[350px] md:h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#E4E4E7" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "#3F3F46", fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#71717A", fontSize: 10 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white px-4 py-3 rounded-lg shadow-xl border border-accent/20">
                              <p className="font-bold text-heading mb-1">{data.skill}</p>
                              <p className="text-sm text-textLight mb-1">{data.category}</p>
                              <p className="text-2xl font-bold" style={{ color: data.color }}>
                                {data.level}%
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Radar
                      name="Skill Level"
                      dataKey="level"
                      stroke="#0EA5E9"
                      fill="#0EA5E9"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Detailed Skills Breakdown */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold text-heading mb-2">
                Detailed Skills Breakdown
              </h3>
              <p className="text-textLight text-sm">
                Hover over any category to view individual skills and proficiency levels
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {skillCategories.map((category, index) => {
                const isExpanded = hoveredCategory === category.title;
                return (
                  <motion.div
                    key={category.title}
                    className="skill-card-minimal"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: index * 0.1,
                    }}
                    onMouseEnter={() => setHoveredCategory(category.title)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <motion.div
                      className={`relative bg-white rounded-2xl border-2 transition-all duration-300 shadow-sm overflow-hidden ${
                        isExpanded
                          ? "border-accent shadow-xl"
                          : "border-border hover:border-accent/50 hover:shadow-lg"
                      }`}
                      layout
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="p-6 pb-4 select-none">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300"
                            style={{ background: `${category.color}15` }}
                            animate={{
                              scale: isExpanded ? 1.1 : 1,
                              rotate: isExpanded ? 5 : 0,
                            }}
                          >
                            <div style={{ color: category.color }}>{category.icon}</div>
                          </motion.div>

                          <motion.div
                            className="text-xs text-textLight font-medium"
                            animate={{
                              opacity: isExpanded ? 0 : 1,
                              scale: isExpanded ? 0.8 : 1,
                            }}
                          >
                            Hover me
                          </motion.div>
                        </div>

                        <h3
                          className="text-xl font-bold mb-2"
                          style={{ color: category.color }}
                        >
                          {category.title}
                        </h3>
                        <p className="text-sm text-textLight">
                          {category.skills.length} skills
                        </p>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? "auto" : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 space-y-3 border-t border-border/50">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.name}
                              initial={false}
                              animate={{
                                opacity: isExpanded ? 1 : 0,
                                x: isExpanded ? 0 : -20,
                              }}
                              transition={{
                                duration: 0.3,
                                delay: isExpanded ? skillIndex * 0.05 : 0,
                              }}
                              className="space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-heading">
                                  {skill.name}
                                </span>
                                <span
                                  className="text-xs font-bold"
                                  style={{ color: category.color }}
                                >
                                  {skill.level}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: category.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: isExpanded ? `${skill.level}%` : 0 }}
                                  transition={{
                                    duration: 0.8,
                                    delay: isExpanded
                                      ? skillIndex * 0.05 + 0.2
                                      : 0,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                        style={{ backgroundColor: category.color }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-body max-w-xl mx-auto">
            Always learning, always growing. I believe in continuous improvement
            and staying current with the latest technologies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
