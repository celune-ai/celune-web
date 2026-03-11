import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { DocsLayout } from './docs-layout';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  variable: '--font-source-code-pro',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const soehneLeicht = localFont({
  src: '../public/fonts/soehne-leicht.woff2',
  variable: '--font-soehne-leicht',
  display: 'swap',
  weight: '300',
});

const soehneKraftig = localFont({
  src: '../public/fonts/soehne-kraftig.woff2',
  variable: '--font-soehne-kraftig',
  display: 'swap',
  weight: '500',
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
        className={`${inter.variable} ${sourceCodePro.variable} ${soehneLeicht.variable} ${soehneKraftig.variable} bg-background font-sans antialiased`}
      >
        <DocsLayout>{children}</DocsLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
