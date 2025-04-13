import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Intercepts calls to /api/*
        destination: "http://localhost:3012/api/:path*", // Proxies them to your Node.js server
      },
    ];
  },
};

export default nextConfig;
