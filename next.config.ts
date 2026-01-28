import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure Turbopack with empty config 
  turbopack: {},
  // Properly handle ESM packages
  transpilePackages: ['@react-pdf/renderer'],
  webpack: (config, { isServer }) => {
    // Handle canvas and other node modules for PDF rendering
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
