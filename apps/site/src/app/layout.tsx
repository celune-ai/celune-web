import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { PostHogProvider } from '@/components/posthog-provider';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import './globals.css';

const urwDockExt = localFont({
  src: '../fonts/urwdockext-medium.otf',
  variable: '--font-dock',
  display: 'swap',
  weight: '500',
});

const soehne = localFont({
  src: '../../public/fonts/soehne-buch.woff2',
  variable: '--font-soehne',
  display: 'swap',
  weight: '400',
});

const soehneMono = localFont({
  src: '../../public/fonts/soehne-mono-buch.woff2',
  variable: '--font-soehne-mono',
  display: 'swap',
  weight: '400',
});

const soehneMonoLeicht = localFont({
  src: '../../public/fonts/soehne-mono-leicht.woff2',
  variable: '--font-soehne-mono-leicht',
  display: 'swap',
  weight: '300',
});

export const metadata: Metadata = {
  title: 'Celune — Agentic Engineering on Autopilot',
  description:
    'Deploy autonomous engineering agents that write code, open PRs, manage tasks, and run your development pipeline — 24/7.',
  icons: { icon: '/favicon.png' },
  metadataBase: new URL('https://celune.ai'),
  openGraph: {
    title: 'Celune — Agentic Engineering on Autopilot',
    description:
      'Deploy autonomous engineering agents that write code, open PRs, manage tasks, and run your development pipeline — 24/7.',
    url: 'https://celune.ai',
    siteName: 'Celune',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Celune — Agentic Engineering on Autopilot' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Celune — Agentic Engineering on Autopilot',
    description:
      'Deploy autonomous engineering agents that write code, open PRs, manage tasks, and run your development pipeline — 24/7.',
    images: ['/og-image.png'],
    creator: '@celune_ai',
  },
  alternates: {
    canonical: 'https://celune.ai',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${urwDockExt.variable} ${soehne.variable} ${soehneMono.variable} ${soehneMonoLeicht.variable} bg-[#08080A] font-sans text-white antialiased`}
      >
        <PostHogProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
