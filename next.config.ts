import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Allow dev server to be previewed across origins (required for remote previews)
    allowedDevOrigins: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
