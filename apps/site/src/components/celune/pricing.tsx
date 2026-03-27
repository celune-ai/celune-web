'use client';

import { useState } from 'react';
import { Check, X, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { URL_APP } from '@/lib/branding';

// ─── Plan cards ─────────────────────────────────────────────────────────────────

const PLANS = [
  {
    key: 'builder',
    name: 'Builder',
    price: 'Free',
    period: '',
    description: 'Everything you need to get started.',
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
    cta: 'Start Free Trial',
    ctaHref: `${URL_APP}/signup?plan=pro`,
    highlighted: true,
  },
  {
    key: 'unlimited',
    name: 'Unlimited',
    price: '$49',
    period: '/mo + $10/seat',
    description: 'Scale your team with no limits.',
    cta: 'Start Free Trial',
    ctaHref: `${URL_APP}/signup?plan=unlimited`,
    highlighted: false,
  },
] as const;

// ─── Usage limits table ─────────────────────────────────────────────────────────

const USAGE_ROWS = [
  { label: 'Agents', values: ['5', '20', 'Unlimited'] },
  { label: 'Projects', values: ['50', '1,000', 'Unlimited'] },
  { label: 'Tasks/mo', values: ['200', 'Unlimited', 'Unlimited'] },
  { label: 'Workspaces', values: ['3', '10', 'Unlimited'] },
  { label: 'Memory entries', values: ['Seed & CORE only', 'Unlimited', 'Unlimited'] },
  { label: 'Skills', values: ['Essential (13+)', 'Standard (23+)', 'All (35+)'] },
];

// ─── Feature comparison table ───────────────────────────────────────────────────

const FEATURE_ROWS: Array<{ label: string; values: [boolean, boolean, boolean] }> = [
  { label: 'Dashboard', values: [true, true, true] },
  { label: 'Task management', values: [true, true, true] },
  { label: 'Integrations', values: [true, true, true] },
  { label: 'BYOK (own API key)', values: [true, true, true] },
  { label: 'API access', values: [true, true, true] },
  { label: 'AFK modes', values: [false, true, true] },
  { label: 'Voice', values: [false, true, true] },
  { label: 'Analytics', values: [false, true, true] },
  { label: 'Agent personalities', values: [false, true, true] },
  { label: 'Webhooks', values: [false, true, true] },
  { label: 'Teammates (multi-user)', values: [false, false, true] },
  { label: 'Audit log', values: [false, false, true] },
];

type Tab = 'usage' | 'features';

export function CelunePricing() {
  const [tab, setTab] = useState<Tab>('usage');

  return (
    <section id="pricing" className="relative py-12 md:py-32">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-neutral-500">
            <span className="text-neutral-600">[</span>
            <span className="uppercase">Pricing</span>
            <span className="text-neutral-600">]</span>
          </div>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-neutral-400">Start free. Upgrade when you need more.</p>
        </div>

        {/* Plan cards */}
        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={cn(
                'relative flex flex-col rounded-xl border p-6',
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
              <div className="mb-4">
                <h3 className="font-heading text-lg font-medium text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="font-heading text-3xl font-medium text-white">{plan.price}</span>
                {plan.period && (
                  <span className="ml-1 text-sm text-neutral-500">{plan.period}</span>
                )}
              </div>
              <a
                href={plan.ctaHref}
                className={cn(
                  'mt-auto block w-full rounded-lg py-2.5 text-center text-sm font-medium transition-colors',
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

        {/* Usage / Features toggle */}
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-4 flex w-fit items-center justify-center gap-1 rounded-lg bg-white/[0.04] p-1">
            {(['usage', 'features'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                  tab === t
                    ? 'bg-white/[0.1] text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-300',
                )}
              >
                {t === 'usage' ? 'Usage Limits' : 'Features'}
              </button>
            ))}
          </div>

          {/* Comparison table — horizontally scrollable on mobile, sticky first col */}
          <div className="scrollbar-none overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="sticky left-0 z-10 bg-[#0f0f13] py-3 pr-2 pl-5 text-left font-medium text-neutral-400">
                    {tab === 'usage' ? 'Limit' : 'Feature'}
                  </th>
                  {PLANS.map((plan) => (
                    <th key={plan.key} className="px-3 py-3 text-center font-medium text-white">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {tab === 'usage'
                  ? USAGE_ROWS.map((row) => (
                      <tr key={row.label} className="hover:bg-white/[0.02]">
                        <td className="sticky left-0 z-10 bg-[#0a0a0f] py-2.5 pr-2 pl-5 text-neutral-400">
                          {row.label}
                        </td>
                        {row.values.map((val, i) => (
                          <td
                            key={PLANS[i].key}
                            className="px-3 py-2.5 text-center text-neutral-200"
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))
                  : FEATURE_ROWS.map((row) => (
                      <tr key={row.label} className="hover:bg-white/[0.02]">
                        <td className="sticky left-0 z-10 bg-[#0a0a0f] py-2.5 pr-2 pl-5 text-neutral-400">
                          {row.label}
                        </td>
                        {row.values.map((val, i) => (
                          <td key={PLANS[i].key} className="px-3 py-2.5 text-center">
                            {val ? (
                              <Check className="text-celune-500 mx-auto h-4 w-4" />
                            ) : (
                              <X className="mx-auto h-4 w-4 text-neutral-600" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
