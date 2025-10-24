"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      {/* Subtle animated background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #0EA5E9 2px, transparent 2px), radial-gradient(circle at 75% 75%, #0EA5E9 2px, transparent 2px)',
          backgroundSize: '50px 50px',
        }}
      />
      
      <div className="text-center relative z-10">
        {/* Loading Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-96 h-96 mx-auto">
            <Image
              src="/loading.gif"
              alt="Loading"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-heading mb-4">{message}</h2>
          
          {/* Animated Dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-accent rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

