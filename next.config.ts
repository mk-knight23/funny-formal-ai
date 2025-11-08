import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove output: 'export' to enable API routes for Vercel deployment
  // This allows server-side functionality including API routes
  experimental: {
    // Enable React 19 features if needed
  },
  images: {
    unoptimized: true, // Required for static export if needed later
  },
};

export default nextConfig;
