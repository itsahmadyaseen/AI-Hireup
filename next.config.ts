import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'], // ✅ Allow Unsplash images
  },
  reactStrictMode: true, // Optional: helps with debugging
  swcMinify: true,       // Optional: enable faster minification
};

export default nextConfig;
