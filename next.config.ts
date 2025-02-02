import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: 'imgix', // Or any other loader that works for static files
    path: '/',
  },
  /* config options here */

};

export default nextConfig;
