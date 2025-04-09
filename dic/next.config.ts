import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  typescript: {
    // Set to false to disable TypeScript type checking during the build
    ignoreBuildErrors: true,
  },  
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'localhost'
    ],
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
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.bytvi.com',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dic.0ps.tech/api/:path*',
      },
    ];
  },

  /* config options here */

};

export default nextConfig;
