import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 모든 HTTPS 도메인에서 이미지 허용
      },
      {
        protocol: 'http',
        hostname: '**', // 모든 HTTP 도메인에서 이미지 허용
      },
    ],
  },
};

export default nextConfig;
