"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-white to-secondary/10 px-6">
      <div className="text-center max-w-2xl">
        {/* Error Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-96 h-96 mx-auto">
            <Image
              src="/Girl-biking--animation-with-stop-motion-effect.gif"
              alt="Server Error"
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle size={40} className="text-accent" />
            <h1 className="text-6xl font-black text-gradient">Oops!</h1>
          </div>
          
          <h2 className="text-3xl font-bold text-heading mb-6">Something Went Wrong</h2>
          <p className="text-body text-lg mb-8 leading-relaxed">
            Don&apos;t worry! Our team has been notified and we&apos;re working on fixing this. 
            In the meantime, you can try refreshing the page or go back home.
          </p>

          {/* Error Details (Dev Mode) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-left"
            >
              <p className="text-sm font-mono text-red-600 break-all">{error.message}</p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={reset}
              className="inline-flex items-center gap-3 px-8 py-4 glassmorphism border border-accent/20 text-heading font-semibold rounded-full"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={20} />
              Try Again
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

