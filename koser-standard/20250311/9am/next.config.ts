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
};

export default nextConfig;
