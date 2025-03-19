import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    appIsrStatus: false,
  },
  webpack: (config, options) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
