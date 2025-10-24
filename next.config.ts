import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'recharts'],
  },
  
  // Production optimizations (swcMinify removed - enabled by default in Next.js 15)
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;

