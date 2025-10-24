"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflineScreen() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-primary via-white to-secondary/10"
    >
      <div className="text-center px-6">
        {/* Offline Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-80 h-80 mx-auto">
            <Image
              src="/offline.gif"
              alt="No Internet Connection"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </motion.div>

        {/* Offline Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <WifiOff size={32} className="text-accent" />
            <h1 className="text-4xl font-bold text-heading">No Internet Connection</h1>
          </div>
          
          <p className="text-body text-lg mb-8">
            Oops! It looks like you&apos;re offline. Please check your internet connection and try again.
          </p>

          {/* Retry Button */}
          <motion.button
            onClick={handleRetry}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-full shadow-lg"
            whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={20} />
            Try Again
          </motion.button>

          <motion.div
            className="mt-8 text-sm text-body/60"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Waiting for connection...
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

