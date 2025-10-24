"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ProjectCard from "./ProjectCard";
import TextFillOnScroll from "./TextFillOnScroll";

// Database types
interface ProjectFromDB {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailed_description: string;
  category: string;
  tags: string[];
  tech_stack: any;
  thumbnail_url: string;
  images: string[];
  demo_url: string;
  github_url: string;
  video_url: string;
  metrics: any;
  features: string[];
  status: string;
  is_featured: boolean;
  display_order: number;
  views_count: number;
  likes_count: number;
  start_date: string;
  end_date: string;
}

interface ApiResponse {
  data: ProjectFromDB[];
  cached: boolean;
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<ProjectFromDB[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then((response: ApiResponse) => {
        const projectsData = response.data || [];
        
        // Exclude featured projects (they're shown in "Finest Work" section)
        const nonFeaturedProjects = projectsData.filter(p => !p.is_featured);
        setProjects(nonFeaturedProjects);
        
        // Extract unique categories from non-featured projects
        const uniqueCategories = ["All", ...new Set(nonFeaturedProjects.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err);
        setLoading(false);
      });
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Show loading state
  if (loading) {
    return (
      <section id="projects" className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center text-body">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-secondary text-sm font-semibold tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-heading">My </span>
            <TextFillOnScroll fillColor="#0EA5E9" duration={1.8}>
              Work
            </TextFillOnScroll>
          </h2>
          <p className="text-body text-lg max-w-2xl mx-auto">
            Explore more of my work across different domains and technologies.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-secondary text-white shadow-lg"
                  : "glassmorphism text-body hover:border-secondary hover:shadow-md"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.thumbnail_url || ''}
              tags={project.tags || []}
              githubUrl={project.github_url}
              liveUrl={project.demo_url}
              index={index}
            />
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-textLight text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
