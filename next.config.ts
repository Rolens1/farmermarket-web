import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pprn26i7.us-east.insforge.app" },
      { protocol: "https", hostname: "retnublhhysifyftziao.supabase.co" },
    ],
  },
};

export default nextConfig;
