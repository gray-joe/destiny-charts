import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bungie.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lsovkbfxdhcnxpaunabw.supabase.co',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
