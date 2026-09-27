import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { DocsLayout } from './docs-layout';
import { CommandSearch } from '../components/command-search';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
});

const interMedium = Inter({
  variable: '--font-inter-medium',
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Celune Documentation',
  description: 'Documentation for Celune - Agentic Engineering on Autopilot',
  icons: { icon: '/favicon.png' },
  metadataBase: new URL('https://docs.celune.ai'),
  openGraph: {
    title: 'Celune Documentation',
    description: 'Documentation for Celune - Agentic Engineering on Autopilot',
    url: 'https://docs.celune.ai',
    siteName: 'Celune Docs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Celune Documentation',
    description: 'Documentation for Celune - Agentic Engineering on Autopilot',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${interMedium.variable} ${jetbrainsMono.variable} bg-background font-sans antialiased`}
      >
        <DocsLayout>{children}</DocsLayout>
        <CommandSearch />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
