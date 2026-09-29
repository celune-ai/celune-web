'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { SectionDivider } from '@/components/celune/grid-frame';
import { URL_APP, SOCIAL_GITHUB } from '@/lib/branding';
import { cn } from '@/lib/cn';

// ─── Billing interval ────────────────────────────────────────────────────────

type Interval = 'monthly' | 'annual';

const CLOUD_PRICE: Record<Interval, { price: string; period: string; note: string }> = {
  monthly: { price: '$25', period: '/seat/mo', note: '' },
  annual: { price: '$20', period: '/seat/mo', note: 'billed annually' },
};

// ─── Pricing data (single source of truth for the tier cards and the table) ───
// Open source and Cloud only — Enterprise is a separate callout, not a plan column.

const PLANS = [
  {
    key: 'open-source',
    name: 'Open source',
    description: 'Self-host Celune under Apache-2.0. No license fees.',
    features: [
      'Apache-2.0 license',
      'Self-hosted on your infrastructure',
      'Unlimited agents, workspaces, and memories',
      'Bring your own model keys',
      'Full source, no license fees',
    ],
    cta: 'View on GitHub',
    ctaHref: SOCIAL_GITHUB,
  },
  {
    key: 'cloud',
    name: 'Celune Cloud',
    description: 'Managed Celune, billed per seat.',
    features: [
      'Bring your own model keys; we never mark up model usage',
      'Unlimited agents, workspaces, and memories',
      'Fair use, no hard caps',
      'Managed hosting and upgrades',
      'Monthly or annual billing',
    ],
    cta: 'Get Started',
    ctaHref: `${URL_APP}/signup`,
  },
] as const;

// ─── Comparison table ───────────────────────────────────────────────────────

type CellValue = string;

const COMPARISON_ROWS: {
  label: string;
  values: Record<(typeof PLANS)[number]['key'], CellValue>;
}[] = [
  { label: 'License', values: { 'open-source': 'Apache-2.0', cloud: 'Commercial' } },
  { label: 'Deployment', values: { 'open-source': 'Self-hosted', cloud: 'Managed cloud' } },
  { label: 'Agents', values: { 'open-source': 'Unlimited', cloud: 'Unlimited' } },
  { label: 'Workspaces', values: { 'open-source': 'Unlimited', cloud: 'Unlimited' } },
  { label: 'Memories', values: { 'open-source': 'Unlimited', cloud: 'Unlimited' } },
  { label: 'Model keys', values: { 'open-source': 'BYOK', cloud: 'BYOK' } },
];

function IntervalToggle({
  billingInterval,
  onChange,
}: {
  billingInterval: Interval;
  onChange: (interval: Interval) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Billing interval"
      className="inline-flex items-center gap-1 rounded-lg bg-white/[0.04] p-1"
    >
      {(['monthly', 'annual'] as const).map((iv) => (
        <button
          key={iv}
          type="button"
          aria-pressed={billingInterval === iv}
          onClick={() => onChange(iv)}
          className={cn(
            'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
            billingInterval === iv
              ? 'bg-white/[0.1] text-white shadow-sm'
              : 'text-neutral-500 hover:text-neutral-300',
          )}
        >
          {iv === 'monthly' ? 'Monthly' : 'Annual'}
        </button>
      ))}
    </div>
  );
}

function EnterpriseCallout() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.015] p-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <p className="text-sm font-medium text-neutral-300">Enterprise</p>
        <p className="mt-1 text-sm text-neutral-500">
          Need custom terms or a dedicated contract? Enterprise pricing is set with you directly.
        </p>
      </div>
      <a
        href="mailto:sales@celune.ai"
        className="shrink-0 rounded-lg border border-white/[0.08] px-5 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-white/[0.15] hover:text-white"
      >
        Contact Sales
      </a>
    </div>
  );
}

export function PricingInteractive() {
  const [billingInterval, setBillingInterval] = useState<Interval>('monthly');
  const cloudPrice = CLOUD_PRICE[billingInterval];

  return (
    <>
      {/* ── Tier cards ── */}
      <section className="relative py-16">
        <div className="container">
          <div className="mb-8 flex justify-center">
            <IntervalToggle billingInterval={billingInterval} onChange={setBillingInterval} />
          </div>

          <div className="mx-auto mb-8 grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
            {PLANS.map((plan) => (
              <div
                key={plan.key}
                className="relative flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-8"
              >
                <div className="mb-6">
                  <h2 className="font-heading text-lg font-medium text-white">{plan.name}</h2>
                  <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>
                </div>
                <div
                  className="mb-8"
                  aria-live={plan.key === 'cloud' ? 'polite' : undefined}
                  aria-atomic="true"
                >
                  {plan.key === 'cloud' ? (
                    <>
                      <span className="font-heading text-4xl font-medium text-white">
                        {cloudPrice.price}
                      </span>
                      <span className="text-neutral-500">{cloudPrice.period}</span>
                      {cloudPrice.note && (
                        <div className="mt-1 text-xs text-neutral-500">{cloudPrice.note}</div>
                      )}
                    </>
                  ) : (
                    <span className="font-heading text-4xl font-medium text-white">Free</span>
                  )}
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <Check className="text-celune-500 mt-0.5 h-4 w-4 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.ctaHref}
                  className="mt-auto block w-full rounded-lg border border-white/[0.08] py-3 text-center text-sm font-medium text-neutral-300 transition-colors hover:border-white/[0.15] hover:text-white"
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Comparison table ── */}
      <section className="relative py-16">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-celune-500 mb-3 text-sm font-medium">Compare plans</p>
            <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
              Everything in detail
            </h2>
            <p className="mt-4 text-neutral-400">See exactly what&apos;s included in each plan.</p>
          </div>

          <div className="mx-auto max-w-3xl overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-[34%] pb-4 text-left text-xs font-normal text-neutral-600" />
                  {PLANS.map((plan) => (
                    <th
                      key={plan.key}
                      className="pb-4 text-center text-xs font-semibold text-neutral-400"
                    >
                      <div className="font-heading text-base font-medium text-white">
                        {plan.name}
                      </div>
                      <div className="mt-0.5 text-neutral-500">
                        {plan.key === 'cloud' ? `${cloudPrice.price}${cloudPrice.period}` : 'Free'}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.label}
                    className="group border-t border-white/[0.04] transition-colors hover:bg-white/[0.015]"
                  >
                    <td className="py-3 pr-4 text-sm text-neutral-400">{row.label}</td>
                    {PLANS.map((plan) => (
                      <td key={plan.key} className="py-3 text-center">
                        <span className="block text-center text-xs text-neutral-400">
                          {row.values[plan.key]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <EnterpriseCallout />
          </div>
        </div>
      </section>
    </>
  );
}
