import React from 'react';
import type { Metadata } from 'next';
import { Check, Minus, HelpCircle } from 'lucide-react';
import { CeluneNav } from '@/components/celune/nav';
import { CeluneFooter } from '@/components/celune/footer';
import { GridFrame, SectionDivider } from '@/components/celune/grid-frame';
import { StarField } from '@/components/celune/star-field';
import { URL_APP } from '@/lib/branding';
import { cn } from '@/lib/cn';

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Pricing — Celune',
  description:
    'Simple, transparent pricing for AI agents that ship code 24/7. Start free with Builder, scale up to Pro or Unlimited.',
  metadataBase: new URL('https://celune.ai'),
  alternates: {
    canonical: 'https://celune.ai/pricing',
  },
  openGraph: {
    title: 'Pricing — Celune',
    description:
      'Simple, transparent pricing for AI agents that ship code 24/7. Start free with Builder, scale up to Pro or Unlimited.',
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
      'Simple, transparent pricing for AI agents that ship code 24/7. Start free with Builder, scale up to Pro or Unlimited.',
    images: ['/og-image.jpg'],
    creator: '@celune_ai',
  },
};

// ─── Pricing data (single source of truth — update here to reflect everywhere) ─

const PLANS = [
  {
    key: 'builder',
    name: 'Builder',
    price: 'Free',
    period: '',
    description: 'Everything you need to get started.',
    features: [
      '5 agents',
      '3 workspaces',
      '50 projects',
      '200 tasks/mo',
      'Seed & CORE memory',
      'Dashboard',
      'Task management',
      'Integrations',
      'BYOK',
      'API access',
    ],
    cta: 'Get Started',
    ctaHref: `${URL_APP}/signup`,
    highlighted: false,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'More agents, more capacity, more power.',
    features: [
      '20 agents',
      '10 workspaces',
      '1,000 projects',
      'Unlimited tasks',
      'Unlimited memories',
      'AFK modes',
      'Voice',
      'Analytics',
      'Agent personalities',
      'Webhooks',
    ],
    cta: 'Request Access',
    ctaHref: `${URL_APP}/signup?plan=pro`,
    highlighted: true,
  },
  {
    key: 'unlimited',
    name: 'Unlimited',
    price: '$49',
    period: '/mo + $10/seat',
    description: 'Scale your team with no limits.',
    features: [
      'Unlimited agents',
      'Unlimited workspaces',
      'Unlimited everything',
      'Teammates (multi-user)',
      'Audit log',
      'Priority support',
    ],
    cta: 'Request Access',
    ctaHref: `${URL_APP}/signup?plan=unlimited`,
    highlighted: false,
  },
] as const;

// ─── Feature comparison table ─────────────────────────────────────────────────

type FeatureValue = boolean | string;

interface ComparisonFeature {
  category: string;
  rows: { label: string; builder: FeatureValue; pro: FeatureValue; unlimited: FeatureValue }[];
}

const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    category: 'Core',
    rows: [
      { label: 'Agents', builder: '5', pro: '20', unlimited: 'Unlimited' },
      { label: 'Workspaces', builder: '3', pro: '10', unlimited: 'Unlimited' },
      { label: 'Projects', builder: '50', pro: '1,000', unlimited: 'Unlimited' },
      { label: 'Tasks / month', builder: '200', pro: 'Unlimited', unlimited: 'Unlimited' },
      { label: 'Memories', builder: 'Seed & CORE', pro: 'Unlimited', unlimited: 'Unlimited' },
    ],
  },
  {
    category: 'Features',
    rows: [
      { label: 'Dashboard', builder: true, pro: true, unlimited: true },
      { label: 'Task management', builder: true, pro: true, unlimited: true },
      { label: 'Integrations', builder: true, pro: true, unlimited: true },
      { label: 'BYOK', builder: true, pro: true, unlimited: true },
      { label: 'API access', builder: true, pro: true, unlimited: true },
      { label: 'Voice', builder: false, pro: true, unlimited: true },
      { label: 'Analytics', builder: false, pro: true, unlimited: true },
      { label: 'AFK modes', builder: false, pro: true, unlimited: true },
      { label: 'Agent personalities', builder: false, pro: true, unlimited: true },
      { label: 'Webhooks', builder: false, pro: true, unlimited: true },
    ],
  },
  {
    category: 'Team & Admin',
    rows: [
      { label: 'Teammates (multi-user)', builder: false, pro: false, unlimited: true },
      { label: 'Audit log', builder: false, pro: false, unlimited: true },
      { label: 'Priority support', builder: false, pro: false, unlimited: true },
    ],
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: 'What are credits?',
    answer:
      'Credits are our unit of compute consumption. Every LLM call, TTS minute, and API request consumes credits from your monthly allowance. Each plan comes with a fixed credit budget — unused credits do not roll over. You can see your real-time usage on the Usage dashboard inside the app.',
  },
  {
    question: 'What is BYOK and is it secure?',
    answer:
      'BYOK (Bring Your Own Key) lets you supply your own OpenAI, Anthropic, or other LLM provider API keys. Your keys are encrypted at rest using AES-256 and are never logged or exposed outside your workspace. We recommend BYOK for teams that need cost control or want to use enterprise-tier rate limits from their existing provider agreements.',
  },
  {
    question: 'What happens if I go over my plan limits?',
    answer:
      'If you hit your monthly task or API call limit, new requests will be gracefully queued or rejected (depending on the resource type) until your next billing cycle. We send email warnings at 80% and 95% of your limits. You can upgrade at any time mid-cycle and the new limits take effect immediately.',
  },
  {
    question: 'How does billing work?',
    answer:
      'Paid plans (Pro at $19/mo, Unlimited at $49/mo + $10/seat) are billed monthly via Stripe. Your subscription starts the day you upgrade and renews on the same day each month. You can cancel at any time; your plan remains active until the end of the billing period.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes. You can upgrade or downgrade at any time from the Billing section in the admin app. Upgrades take effect immediately (prorated). Downgrades take effect at the start of your next billing cycle so you keep access to your current plan features until then.',
  },
  {
    question: 'Do you offer a free trial for paid plans?',
    answer:
      'The Builder plan is free forever and a great way to explore Celune. For Pro ($19/mo) and Unlimited ($49/mo), we offer a 14-day money-back guarantee — if you are not satisfied, email us within 14 days of your first charge and we will issue a full refund, no questions asked.',
  },
];

// ─── Cell renderer ────────────────────────────────────────────────────────────

function FeatureCell({ value, highlighted }: { value: FeatureValue; highlighted?: boolean }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <Check
          className={cn('h-4 w-4', highlighted ? 'text-celune-500' : 'text-celune-600')}
          aria-label="Included"
        />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <Minus className="h-4 w-4 text-neutral-700" aria-label="Not included" />
      </div>
    );
  }
  return (
    <span
      className={cn('block text-center text-xs', highlighted ? 'text-white' : 'text-neutral-400')}
    >
      {value}
    </span>
  );
}

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
                <span className="uppercase">Expected Pricing</span>
                <span className="text-neutral-600">]</span>
              </div>
              <h1 className="font-heading text-4xl font-medium tracking-tight text-white md:text-5xl">
                Simple, transparent pricing
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
                We&apos;re launching soon. Pricing may change before general availability.
              </p>
            </div>
          </section>

          <SectionDivider />

          {/* ── Tier cards ── */}
          <section className="relative py-16">
            <div className="container">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {PLANS.map((plan) => (
                  <div
                    key={plan.key}
                    className={cn(
                      'relative rounded-xl border p-8',
                      plan.highlighted
                        ? 'border-celune-500/30 bg-celune-500/[0.04]'
                        : 'border-white/[0.06] bg-white/[0.02]',
                    )}
                  >
                    {plan.highlighted && (
                      <div className="bg-celune-500 absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold text-black">
                        Most Popular
                      </div>
                    )}
                    <div className="mb-6">
                      <h2 className="font-heading text-lg font-medium text-white">{plan.name}</h2>
                      <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>
                    </div>
                    <div className="mb-8">
                      <span className="font-heading text-4xl font-medium text-white">
                        {plan.price}
                      </span>
                      {plan.period && <span className="text-neutral-500">{plan.period}</span>}
                    </div>
                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-neutral-300"
                        >
                          <Check className="text-celune-500 mt-0.5 h-4 w-4 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={plan.ctaHref}
                      className={cn(
                        'block w-full rounded-lg py-3 text-center text-sm font-medium transition-colors',
                        plan.highlighted
                          ? 'bg-celune-500 hover:bg-celune-400 text-black'
                          : 'border border-white/[0.08] text-neutral-300 hover:border-white/[0.15] hover:text-white',
                      )}
                    >
                      {plan.cta}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ── Feature comparison table ── */}
          <section className="relative py-16">
            <div className="container">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <p className="text-celune-500 mb-3 text-sm font-medium">Compare plans</p>
                <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
                  Everything in detail
                </h2>
                <p className="mt-4 text-neutral-400">
                  See exactly what&apos;s included in each plan.
                </p>
              </div>

              <div className="mx-auto max-w-5xl overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  {/* Column headers */}
                  <thead>
                    <tr>
                      <th className="w-[34%] pb-4 text-left text-xs font-normal text-neutral-600" />
                      {PLANS.map((plan) => (
                        <th
                          key={plan.key}
                          className={cn(
                            'pb-4 text-center text-xs font-semibold',
                            plan.highlighted ? 'text-celune-400' : 'text-neutral-400',
                          )}
                        >
                          <div className="font-heading text-base font-medium text-white">
                            {plan.name}
                          </div>
                          <div
                            className={cn(
                              'mt-0.5',
                              plan.highlighted ? 'text-celune-500' : 'text-neutral-500',
                            )}
                          >
                            {plan.price}
                            {plan.period}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {COMPARISON_FEATURES.map((section) => (
                      <React.Fragment key={section.category}>
                        {/* Category row */}
                        <tr>
                          <td
                            colSpan={4}
                            className="border-t border-white/[0.06] pt-6 pb-2 text-[11px] font-semibold tracking-widest text-neutral-600 uppercase"
                          >
                            {section.category}
                          </td>
                        </tr>

                        {/* Feature rows */}
                        {section.rows.map((row) => (
                          <tr
                            key={row.label}
                            className="group border-t border-white/[0.04] transition-colors hover:bg-white/[0.015]"
                          >
                            <td className="py-3 pr-4 text-sm text-neutral-400">{row.label}</td>
                            {(
                              [
                                { key: 'builder', value: row.builder, highlighted: false },
                                { key: 'pro', value: row.pro, highlighted: true },
                                { key: 'unlimited', value: row.unlimited, highlighted: false },
                              ] as const
                            ).map((col) => (
                              <td key={col.key} className="py-3 text-center">
                                <FeatureCell value={col.value} highlighted={col.highlighted} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

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
                Join hundreds of engineers already running autonomous agents on Celune. Request
                early access — we&apos;re onboarding select teams now.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`${URL_APP}/signup`}
                  className="bg-celune-500 hover:bg-celune-400 rounded-lg px-6 py-3 text-sm font-semibold text-black transition-colors"
                >
                  Request Access
                </a>
                <a
                  href="https://docs.celune.ai/support"
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
