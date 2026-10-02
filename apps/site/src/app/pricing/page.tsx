import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { CeluneNav } from '@/components/celune/nav';
import { CeluneFooter } from '@/components/celune/footer';
import { GridFrame, SectionDivider } from '@/components/celune/grid-frame';
import { StarField } from '@/components/celune/star-field';
import { PricingInteractive } from '@/components/celune/pricing-interactive';
import { URL_APP } from '@/lib/branding';

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Pricing — Celune',
  description:
    'Self-host Celune for free under Apache-2.0, or run it on Celune Cloud starting at $25 per seat per month. Enterprise available by contact.',
  metadataBase: new URL('https://celune.ai'),
  alternates: {
    canonical: 'https://celune.ai/pricing',
  },
  openGraph: {
    title: 'Pricing — Celune',
    description:
      'Self-host Celune for free under Apache-2.0, or run it on Celune Cloud starting at $25 per seat per month. Enterprise available by contact.',
    url: 'https://celune.ai/pricing',
    siteName: 'Celune',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Celune Pricing — Agentic Engineering on Autopilot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Celune',
    description:
      'Self-host Celune for free under Apache-2.0, or run it on Celune Cloud starting at $25 per seat per month. Enterprise available by contact.',
    images: ['/og-image.jpg'],
    creator: '@celune_ai',
  },
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: 'What is the difference between open source and Cloud?',
    answer:
      'The open source edition is Apache-2.0 licensed and free to self-host on your own infrastructure. Celune Cloud is the same product, hosted and managed by us, billed per seat.',
  },
  {
    question: 'What counts as a seat?',
    answer:
      'A seat is an active human member of your organization. Agents are not seats. The minimum is one seat.',
  },
  {
    question: 'What is BYOK and is it secure?',
    answer:
      'BYOK (Bring Your Own Key) lets you supply your own OpenAI, Anthropic, or other LLM provider API keys. Your keys are encrypted at rest and are never logged or exposed outside your workspace. We do not mark up or bill for model usage; you pay your provider directly.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Celune Cloud is paid from day one. The open source edition is free to self-host, so you can run Celune yourself before deciding whether to move to Cloud.',
  },
  {
    question: 'How does billing work?',
    answer:
      'Celune Cloud is billed per seat, monthly or annually, through Stripe. Adding or removing an active member updates your seat count and bill automatically. You can switch between monthly and annual billing at any time.',
  },
  {
    question: 'What does Enterprise include?',
    answer:
      'Enterprise is for teams that need pricing or terms outside the standard Cloud plan. Contact sales@celune.ai and we will work out what fits.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <StarField />
        <CeluneNav />
        <GridFrame>
          {/* ── Hero ── */}
          <section className="relative pt-32 pb-16 text-center">
            <div className="container">
              <div className="mb-3 inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-neutral-500">
                <span className="text-neutral-600">[</span>
                <span className="uppercase">Pricing</span>
                <span className="text-neutral-600">]</span>
              </div>
              <h1 className="font-heading text-4xl font-medium tracking-tight text-white md:text-5xl">
                Simple, transparent pricing
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
                Self-host for free, or let us run it on Celune Cloud.
              </p>
            </div>
          </section>

          <SectionDivider />

          {/* ── Tier cards + comparison table ── */}
          <PricingInteractive />

          <SectionDivider />

          {/* ── FAQ ── */}
          <section className="relative py-16">
            <div className="container">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <p className="text-celune-500 mb-3 text-sm font-medium">FAQ</p>
                <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
                  Common questions
                </h2>
              </div>

              <div className="mx-auto max-w-3xl divide-y divide-white/[0.06]">
                {FAQS.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <span className="font-heading text-base font-medium text-white">
                        {faq.question}
                      </span>
                      <HelpCircle className="group-open:text-celune-500 mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ── Bottom CTA ── */}
          <section className="relative py-20 text-center">
            <div className="container">
              <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
                Ready to ship faster?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-neutral-400">
                Start on Celune Cloud, or self-host the open source edition for free.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`${URL_APP}/signup`}
                  className="bg-celune-500 hover:bg-celune-400 rounded-lg px-6 py-3 text-sm font-semibold text-black transition-colors"
                >
                  Get Started
                </a>
                <a
                  href="mailto:sales@celune.ai"
                  className="rounded-lg border border-white/[0.08] px-6 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-white/[0.15] hover:text-white"
                >
                  Talk to Sales
                </a>
              </div>
            </div>
          </section>

          <SectionDivider />
          <CeluneFooter />
        </GridFrame>
      </div>
    </>
  );
}
