/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },

  // async redirects() {
  //   return [
  //     {
  //       source: "/view/searchestm/:path*",
  //       destination: "/view/searchestm",
  //       permanent: true,
  //     },
  //   ];
  // },

  async rewrites() {
    return {
      fallback: [
        {
          source: "/api11111111/:path*",
          destination: `https://appwooridev.kosapp.co.kr/api111/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
