import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/types'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
