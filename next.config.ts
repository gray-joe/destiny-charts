import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bungie.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
