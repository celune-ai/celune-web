import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['@repo/ui'],
  eslint: {
    // Lint is run separately in CI — don't block deploys
    ignoreDuringBuilds: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

// Cast needed: monorepo hoists Next 16 types from docs app, causing
// NextConfig type mismatch with createMDX's expected parameter type.
export default withMDX(nextConfig as Parameters<typeof withMDX>[0]);
