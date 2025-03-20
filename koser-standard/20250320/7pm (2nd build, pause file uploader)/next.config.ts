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

    config.module.rules.push({
      test: /\.temp\.tsx?$/,
      use: "ignore-loader",
    });

    return config;
  },
};

export default nextConfig;
