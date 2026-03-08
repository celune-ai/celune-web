import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  eslint: {
    // Lint is run separately in CI — don't block deploys
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
