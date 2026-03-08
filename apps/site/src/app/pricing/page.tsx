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
    'Simple, transparent pricing for AI agents that ship code 24/7. Start free with Build, scale up to Pro, Team, or Enterprise.',
  metadataBase: new URL('https://celune.ai'),
  alternates: {
    canonical: 'https://celune.ai/pricing',
  },
  openGraph: {
    title: 'Pricing — Celune',
    description:
      'Simple, transparent pricing for AI agents that ship code 24/7. Start free with Build, scale up to Pro, Team, or Enterprise.',
    url: 'https://celune.ai/pricing',
    siteName: 'Celune',
    images: [
      {
        url: '/og-image.png',
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
      'Simple, transparent pricing for AI agents that ship code 24/7. Start free with Build, scale up to Pro, Team, or Enterprise.',
    images: ['/og-image.png'],
    creator: '@celune_ai',
  },
};

// ─── Pricing data (single source of truth — update here to reflect everywhere) ─

const PLANS = [
  {
    key: 'build',
    name: 'Build',
    price: '$0',
    period: '/month',
    description: 'For individuals getting started with AI agents.',
    features: [
      '1 workspace',
      '2 agents',
      '1,000 memories',
      '100 tasks/month',
      '10 TTS minutes/month',
      '1,000 API calls/month',
      'Basic dashboard',
      'Task management',
    ],
    cta: 'Get Started Free',
    ctaHref: `${URL_APP}/signup`,
    highlighted: false,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For professionals who need more power and integrations.',
    features: [
      '3 workspaces',
      '5 agents',
      '50,000 memories',
      '1,000 tasks/month',
      '60 TTS minutes/month',
      '10,000 API calls/month',
      'Voice mode',
      'Analytics',
      'API access',
      'BYOK (bring your own key)',
    ],
    cta: 'Start Pro',
    ctaHref: `${URL_APP}/signup?plan=pro`,
    highlighted: true,
  },
  {
    key: 'team',
    name: 'Team',
    price: '$149',
    period: '/month',
    description: 'For teams coordinating agents across projects.',
    features: [
      '10 workspaces',
      'Unlimited agents',
      'Unlimited memories',
      '10,000 tasks/month',
      '300 TTS minutes/month',
      '100,000 API calls/month',
      'AFK modes',
      'Webhooks',
      'Audit log',
      'BYOK (bring your own key)',
    ],
    cta: 'Start Team',
    ctaHref: `${URL_APP}/signup?plan=team`,
    highlighted: false,
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with scale and compliance requirements.',
    features: [
      'Unlimited workspaces',
      'Unlimited agents',
      'Unlimited everything',
      'SSO',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Custom agent personas',
      'BYOK (bring your own key)',
    ],
    cta: 'Contact Us',
    ctaHref: 'mailto:hello@celune.ai',
    highlighted: false,
  },
] as const;

// ─── Feature comparison table ─────────────────────────────────────────────────

type FeatureValue = boolean | string;

interface ComparisonFeature {
  category: string;
  rows: { label: string; build: FeatureValue; pro: FeatureValue; team: FeatureValue; enterprise: FeatureValue }[];
}

const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    category: 'Core',
    rows: [
      { label: 'Workspaces',       build: '1',          pro: '3',           team: '10',          enterprise: 'Unlimited' },
      { label: 'Agents',           build: '2',          pro: '5',           team: 'Unlimited',   enterprise: 'Unlimited' },
      { label: 'Memory storage',   build: '1,000',      pro: '50,000',      team: 'Unlimited',   enterprise: 'Unlimited' },
      { label: 'Tasks / month',    build: '100',        pro: '1,000',       team: '10,000',      enterprise: 'Unlimited' },
    ],
  },
  {
    category: 'Integrations',
    rows: [
      { label: 'BYOK',             build: false,        pro: true,          team: true,          enterprise: true },
      { label: 'Voice (TTS)',      build: false,        pro: '60 min/mo',   team: '300 min/mo',  enterprise: 'Unlimited' },
      { label: 'API access',       build: false,        pro: true,          team: true,          enterprise: true },
      { label: 'Webhooks',         build: false,        pro: false,         team: true,          enterprise: true },
      { label: 'GitHub integration', build: false,      pro: true,          team: true,          enterprise: true },
      { label: 'Slack integration',  build: false,      pro: false,         team: true,          enterprise: true },
    ],
  },
  {
    category: 'Admin & Security',
    rows: [
      { label: 'Analytics',        build: false,        pro: true,          team: true,          enterprise: true },
      { label: 'Audit log',        build: false,        pro: false,         team: true,          enterprise: true },
      { label: 'AFK modes',        build: false,        pro: false,         team: true,          enterprise: true },
      { label: 'SSO',              build: false,        pro: false,         team: false,         enterprise: true },
      { label: 'Custom integrations', build: false,     pro: false,         team: false,         enterprise: true },
    ],
  },
  {
    category: 'Support',
    rows: [
      { label: 'Community support', build: true,        pro: true,          team: true,          enterprise: true },
      { label: 'Priority support',  build: false,       pro: false,         team: true,          enterprise: true },
      { label: 'Dedicated support', build: false,       pro: false,         team: false,         enterprise: true },
      { label: 'SLA guarantee',     build: false,       pro: false,         team: false,         enterprise: true },
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
      "BYOK (Bring Your Own Key) lets you supply your own OpenAI, Anthropic, or other LLM provider API keys. Your keys are encrypted at rest using AES-256 and are never logged or exposed outside your workspace. We recommend BYOK for teams that need cost control or want to use enterprise-tier rate limits from their existing provider agreements.",
  },
  {
    question: 'What happens if I go over my plan limits?',
    answer:
      'If you hit your monthly task or API call limit, new requests will be gracefully queued or rejected (depending on the resource type) until your next billing cycle. We send email warnings at 80% and 95% of your limits. You can upgrade at any time mid-cycle and the new limits take effect immediately.',
  },
  {
    question: 'How does billing work?',
    answer:
      'All paid plans are billed monthly via Stripe. Your subscription starts the day you upgrade and renews on the same day each month. Annual billing (with a 20% discount) is available on Pro and Team — contact us to enable it. You can cancel at any time; your plan remains active until the end of the billing period.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes. You can upgrade or downgrade at any time from the Billing section in the admin app. Upgrades take effect immediately (prorated). Downgrades take effect at the start of your next billing cycle so you keep access to your current plan features until then.',
  },
  {
    question: 'Do you offer a free trial for paid plans?',
    answer:
      'The Build plan is free forever and a great way to explore Celune. For Pro and Team, we offer a 14-day money-back guarantee — if you are not satisfied, email us within 14 days of your first charge and we will issue a full refund, no questions asked.',
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
    <span className={cn('text-xs text-center block', highlighted ? 'text-white' : 'text-neutral-400')}>
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
              <p className="mb-3 text-sm font-medium text-celune-500">Pricing</p>
              <h1 className="font-heading text-4xl font-medium tracking-tight text-white md:text-5xl">
                Simple, transparent pricing
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
                Start free during beta. Scale as your team grows.
                No hidden fees, no surprise overages.
              </p>
            </div>
          </section>

          <SectionDivider />

          {/* ── Tier cards ── */}
          <section className="relative py-16">
            <div className="container">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {PLANS.map((plan) => (
                  <div
                    key={plan.key}
                    className={cn(
                      'relative rounded-xl border p-8',
                      plan.highlighted
                        ? 'border-celune-500/30 bg-celune-500/[0.04]'
                        : 'border-white/[0.06] bg-white/[0.02]'
                    )}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-celune-500 px-3 py-0.5 text-xs font-semibold text-black">
                        Most Popular
                      </div>
                    )}
                    <div className="mb-6">
                      <h2 className="font-heading text-lg font-medium text-white">{plan.name}</h2>
                      <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>
                    </div>
                    <div className="mb-8">
                      <span className="font-heading text-4xl font-medium text-white">{plan.price}</span>
                      {plan.period && <span className="text-neutral-500">{plan.period}</span>}
                    </div>
                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-300">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-celune-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={plan.ctaHref}
                      className={cn(
                        'block w-full rounded-lg py-3 text-center text-sm font-medium transition-colors',
                        plan.highlighted
                          ? 'bg-celune-500 text-black hover:bg-celune-400'
                          : 'border border-white/[0.08] text-neutral-300 hover:border-white/[0.15] hover:text-white'
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
                <p className="mb-3 text-sm font-medium text-celune-500">Compare plans</p>
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
                            plan.highlighted ? 'text-celune-400' : 'text-neutral-400'
                          )}
                        >
                          <div className="font-heading text-base font-medium text-white">{plan.name}</div>
                          <div className={cn('mt-0.5', plan.highlighted ? 'text-celune-500' : 'text-neutral-500')}>
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
                            colSpan={5}
                            className="border-t border-white/[0.06] pt-6 pb-2 text-[11px] font-semibold uppercase tracking-widest text-neutral-600"
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
                                { key: 'build', value: row.build, highlighted: false },
                                { key: 'pro', value: row.pro, highlighted: true },
                                { key: 'team', value: row.team, highlighted: false },
                                { key: 'enterprise', value: row.enterprise, highlighted: false },
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
                <p className="mb-3 text-sm font-medium text-celune-500">FAQ</p>
                <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
                  Common questions
                </h2>
              </div>

              <div className="mx-auto max-w-3xl divide-y divide-white/[0.06]">
                {FAQS.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <span className="font-heading text-base font-medium text-white">{faq.question}</span>
                      <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-open:text-celune-500" />
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
                Join hundreds of engineers already running autonomous agents on Celune.
                Start free — no credit card required.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`${URL_APP}/signup`}
                  className="rounded-lg bg-celune-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-celune-400"
                >
                  Get Started Free
                </a>
                <a
                  href="mailto:hello@celune.ai"
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
