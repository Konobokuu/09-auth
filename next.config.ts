import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "ac.goit.global",
      },
    ],
  },
};

export default nextConfig;
