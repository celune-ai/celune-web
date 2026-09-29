'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { URL_APP, SOCIAL_GITHUB } from '@/lib/branding';

// ─── Billing interval ────────────────────────────────────────────────────────

type Interval = 'monthly' | 'annual';

const CLOUD_PRICE: Record<Interval, { price: string; suffix: string }> = {
  monthly: { price: '$25', suffix: '/seat/mo' },
  annual: { price: '$20', suffix: '/seat/mo, billed annually' },
};

// ─── Plan cards ─────────────────────────────────────────────────────────────────
// Open source and Cloud only — Enterprise is a separate callout, not a plan card.

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
    ],
    cta: 'Get Started',
    ctaHref: `${URL_APP}/signup`,
  },
] as const;

export function CelunePricing() {
  const [billingInterval, setBillingInterval] = useState<Interval>('monthly');

  return (
    <section id="pricing" className="relative py-12 md:py-32">
      <div className="container">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-neutral-500">
            <span className="text-neutral-600">[</span>
            <span className="uppercase">Pricing</span>
            <span className="text-neutral-600">]</span>
          </div>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Self-host for free, or let us run it on Celune Cloud.
          </p>
        </div>

        {/* Billing interval toggle */}
        <div className="mb-10 flex justify-center">
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
                onClick={() => setBillingInterval(iv)}
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
        </div>

        {/* Plan cards */}
        <div className="mx-auto mb-6 grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className="relative flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <div className="mb-4">
                <h3 className="font-heading text-lg font-medium text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>
              </div>
              <div
                className="mb-6"
                aria-live={plan.key === 'cloud' ? 'polite' : undefined}
                aria-atomic="true"
              >
                {plan.key === 'cloud' ? (
                  <>
                    <span className="font-heading text-3xl font-medium text-white">
                      {CLOUD_PRICE[billingInterval].price}
                    </span>
                    <span className="ml-1 text-sm text-neutral-500">
                      {CLOUD_PRICE[billingInterval].suffix}
                    </span>
                  </>
                ) : (
                  <span className="font-heading text-3xl font-medium text-white">Free</span>
                )}
              </div>
              <ul className="mb-6 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-neutral-300">
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.ctaHref}
                className="mt-auto block w-full rounded-lg border border-white/[0.08] py-2.5 text-center text-sm font-medium text-neutral-300 transition-colors hover:border-white/[0.15] hover:text-white"
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Enterprise callout */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.015] p-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-medium text-neutral-300">Enterprise</p>
            <p className="mt-1 text-sm text-neutral-500">
              Need SSO, custom terms, or dedicated support? Talk to us about Enterprise. Custom
              pricing.
            </p>
          </div>
          <a
            href="mailto:sales@celune.ai"
            className="shrink-0 rounded-lg border border-white/[0.08] px-5 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-white/[0.15] hover:text-white"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
}
