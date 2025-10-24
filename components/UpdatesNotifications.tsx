"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, TrendingUp, Award, Code, FileCheck, Sparkles } from "lucide-react";

interface Update {
  id: string;
  type: "project" | "achievement" | "certification" | "dsa";
  title: string;
  message: string;
  timestamp: Date;
  icon: JSX.Element;
  color: string;
}

// Simulated updates - in real app, fetch from API or database
const recentUpdates: Update[] = [
  {
    id: "1",
    type: "project",
    title: "New Project Added",
    message: "AWS Fraud Detection System - Check it out in Finest Work!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    icon: <Code size={18} />,
    color: "#0EA5E9",
  },
  {
    id: "2",
    type: "achievement",
    title: "Achievement Unlocked",
    message: "1st Place Winner at DigiPay Pro NPCI Competition IIT Bombay Techfest 2024",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    icon: <Award size={18} />,
    color: "#10B981",
  },
  {
    id: "3",
    type: "dsa",
    title: "DSA Milestone",
    message: "500+ Problems Solved! New milestone achieved 🎯",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    icon: <TrendingUp size={18} />,
    color: "#8B5CF6",
  },
  {
    id: "4",
    type: "certification",
    title: "New Certification",
    message: "AWS Certified - Solutions Architect credential earned!",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    icon: <FileCheck size={18} />,
    color: "#F59E0B",
  },
];

export default function UpdatesNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const [hasNewUpdates, setHasNewUpdates] = useState(true);

  // Auto-cycle through updates
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentUpdate((prev) => (prev + 1) % recentUpdates.length);
      }, 5000); // Change update every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Show notification badge animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNewUpdates(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <>
      {/* Notification Button - Government style */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewUpdates(false);
        }}
        className="fixed top-6 right-24 lg:right-28 z-40 p-3 glassmorphism rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="relative">
          <Bell className="text-heading group-hover:text-accent transition-colors" size={22} />
          
          {/* New updates indicator - Smooth animation */}
          {hasNewUpdates && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-primary"
              style={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
              }}
            >
              {/* Smooth pulse effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.8, 0.4, 0.8]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-red-500 rounded-full"
                style={{
                  filter: "blur(2px)"
                }}
              />
            </motion.div>
          )}
        </div>
        
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-body whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
          Updates
        </div>
      </motion.button>

      {/* Updates Panel - Government notification style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-20 right-6 z-40 w-[380px] max-h-[600px] glassmorphism rounded-3xl shadow-2xl border border-border/50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/50 bg-gradient-to-r from-accent/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-xl">
                  <Sparkles className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-heading">Recent Updates</h3>
                  <p className="text-xs text-body">Stay informed about new additions</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-border/20 rounded-lg transition-colors"
              >
                <X size={20} className="text-textLight" />
              </button>
            </div>

            {/* Updates List */}
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              <div className="p-4 space-y-3">
                <AnimatePresence mode="wait">
                  {recentUpdates.map((update, index) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                      }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="p-4 rounded-2xl border cursor-pointer transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${update.color}08, transparent)`,
                        borderColor: `${update.color}30`,
                      }}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: `${update.color}20`,
                            color: update.color,
                          }}
                        >
                          {update.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 
                              className="text-sm font-bold"
                              style={{ color: update.color }}
                            >
                              {update.title}
                            </h4>
                            <span className="text-xs text-textLight flex-shrink-0">
                              {formatTimestamp(update.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-body leading-relaxed">
                            {update.message}
                          </p>
                        </div>
                      </div>

                      {/* New badge */}
                      {index === 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full"
                        >
                          NEW
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border/50 bg-gradient-to-r from-transparent to-accent/5">
              <div className="text-center">
                <p className="text-xs text-textLight mb-2">More updates coming soon!</p>
                <div className="flex items-center justify-center gap-2">
                  {recentUpdates.map((_, index) => (
                    <motion.div
                      key={index}
                      className="w-1.5 h-1.5 rounded-full bg-border"
                      animate={{
                        backgroundColor: index === currentUpdate ? "#0EA5E9" : "#E4E4E7",
                        scale: index === currentUpdate ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E4E4E7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0EA5E9;
        }
      `}</style>
    </>
  );
}

