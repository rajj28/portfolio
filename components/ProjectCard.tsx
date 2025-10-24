"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { cardHover } from "@/lib/animations";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  index,
}: ProjectCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  
  const maxTagsToShow = 4;
  const visibleTags = showAllTags ? tags : tags.slice(0, maxTagsToShow);
  const hasMoreTags = tags.length > maxTagsToShow;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px", amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      variants={cardHover}
      whileHover="hover"
      className="group relative glassmorphism rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Project image - Reduced height */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-secondary/10 to-accent/10">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl font-bold opacity-20 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">{title[0]}</span>
            </div>
          )}
        </motion.div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cardBg/90 via-transparent to-transparent" />

        {/* Links overlay */}
        <div className="absolute top-3 right-3 flex gap-2">
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 backdrop-blur-md bg-primary/80 rounded-full hover:bg-secondary/20 transition-colors border border-border/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View on GitHub"
            >
              <Github size={18} className="text-heading" />
            </motion.a>
          )}
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 backdrop-blur-md bg-primary/80 rounded-full hover:bg-secondary/20 transition-colors border border-border/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View live demo"
            >
              <ExternalLink size={18} className="text-heading" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Project info - More compact */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-heading line-clamp-1 group-hover:text-secondary transition-colors duration-300">
          {title}
        </h3>

        {/* Expandable description */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.p 
              key={showFullDescription ? 'full' : 'short'}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-body text-sm leading-relaxed ${!showFullDescription ? 'line-clamp-2' : ''}`}
            >
              {description}
            </motion.p>
          </AnimatePresence>
          
          {description.length > 100 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-1 text-xs text-secondary hover:text-accent transition-colors flex items-center gap-1 font-medium"
            >
              {showFullDescription ? (
                <>Show less <ChevronUp size={14} /></>
              ) : (
                <>Read more <ChevronDown size={14} /></>
              )}
            </button>
          )}
        </div>

        {/* Expandable tech stack tags */}
        <div className="space-y-2">
          <AnimatePresence mode="wait">
            <motion.div 
              key={showAllTags ? 'all' : 'few'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-2"
            >
              {visibleTags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: tagIndex * 0.05,
                    duration: 0.3
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-2.5 py-1 text-xs bg-secondary/10 border border-secondary/20 rounded-full text-secondary font-medium hover:bg-secondary/20 transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {hasMoreTags && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-xs text-secondary hover:text-accent transition-colors flex items-center gap-1 font-medium"
            >
              {showAllTags ? (
                <>Show less <ChevronUp size={14} /></>
              ) : (
                <>+{tags.length - maxTagsToShow} more <ChevronDown size={14} /></>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.1)",
        }}
      />
    </motion.div>
  );
}
