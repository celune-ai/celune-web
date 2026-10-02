import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
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

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
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
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Celune — Agentic Engineering on Autopilot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Celune — Agentic Engineering on Autopilot',
    description:
      'Deploy autonomous engineering agents that write code, open PRs, manage tasks, and run your development pipeline — 24/7.',
    images: ['/og-image.jpg'],
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
        className={`${urwDockExt.variable} ${inter.variable} ${jetbrainsMono.variable} bg-[#08080A] font-sans text-white antialiased`}
      >
        <PostHogProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ER2ZZKGMWN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ER2ZZKGMWN');
          `}
        </Script>
      </body>
    </html>
  );
}
