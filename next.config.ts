import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.legit.ng',
      },
      {
        protocol: 'https',
        hostname: 'dailypost.ng',
      },
      {
        protocol: 'https',
        hostname: '**.bytvi.com',
      }
    ]
  }
  /* config options here */

};

export default nextConfig;
