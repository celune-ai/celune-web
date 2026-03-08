import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';
import createMDX from '@next/mdx';

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  typescript: {
    // @sentry/nextjs ships Next 15 type defs that conflict with Next 16 — ignore until Sentry updates
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

// Turbopack's MDX loader requires serializable options — function references
// (remark/rehype plugins) cannot be passed. remark-gfm for tables and
// rehypeShiki for syntax highlighting are both blocked by this limitation.
// Tables are converted to HTML in sync-vault.mjs at sync time instead.
// Syntax highlighting uses the <CodeBlock> server component with codeToHtml().
const withMDX = createMDX({});

// Only wrap with Sentry if auth token is available (prevents build failures on Vercel)
const mdxConfig = withMDX(nextConfig);
export default process.env.SENTRY_AUTH_TOKEN
  ? withSentryConfig(mdxConfig, {
      org: process.env.SENTRY_ORG ?? 'smejkal-design',
      project: 'javascript-nextjs',
      silent: !process.env.CI,
    })
  : mdxConfig;
