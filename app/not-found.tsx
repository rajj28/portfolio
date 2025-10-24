"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-white to-secondary/10 px-6">
      <div className="text-center max-w-2xl">
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-96 h-96 mx-auto">
            <Image
              src="/Girl-biking--animation-with-stop-motion-effect.gif"
              alt="404 Not Found"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-8xl font-black text-gradient mb-4">404</h1>
          <h2 className="text-4xl font-bold text-heading mb-6">Page Not Found</h2>
          <p className="text-body text-lg mb-8 leading-relaxed">
            Oops! The page you&apos;re looking for seems to have taken a detour. 
            Let&apos;s get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-3 px-8 py-4 glassmorphism border border-accent/20 text-heading font-semibold rounded-full"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              Go Back
            </motion.button>

            <Link href="/">
              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-full shadow-lg"
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Home size={20} />
                Back to Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
