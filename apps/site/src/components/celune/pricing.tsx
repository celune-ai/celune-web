'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { URL_APP } from '@/lib/branding';

// ─── Pricing data (update here to reflect everywhere) ─────────────────────────

const PLANS_MONTHLY = [
  {
    key: 'build',
    name: 'Build',
    price: '$19',
    period: '/month',
    description: 'Get started with AI agents.',
    features: [
      '3 workspaces',
      '3 agents',
      '20,000 memories',
      '1,000 tasks/month',
      'Basic dashboard',
      'Task management',
      'Integrations & Skills',
    ],
    cta: 'Request Access',
    ctaHref: `${URL_APP}/signup`,
    highlighted: false,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'More power and integrations.',
    features: [
      '10 workspaces',
      '5 agents',
      '50,000 memories',
      '10,000 tasks/month',
      'Detailed analytics',
      '3 teammates',
      'Agent personalities',
    ],
    cta: 'Request Access',
    ctaHref: `${URL_APP}/signup?plan=pro`,
    highlighted: true,
  },
  {
    key: 'team',
    name: 'Team',
    price: '$149',
    period: '/month',
    description: 'Coordinate agents across projects.',
    features: [
      '20 workspaces',
      'Unlimited agents',
      'Unlimited memories',
      '100,000 tasks/month',
      'Unlimited teammates',
      '10 included plugins',
      'Audit log',
    ],
    cta: 'Request Access',
    ctaHref: `${URL_APP}/signup?plan=team`,
    highlighted: false,
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Scale with compliance and support.',
    features: [
      'Unlimited workspaces',
      'Unlimited agents',
      'Unlimited memories',
      'Unlimited everything',
      'SSO',
      'Dedicated support',
      'SLA guarantee',
    ],
    cta: 'Contact Us',
    ctaHref: 'https://docs.celune.ai/support',
    highlighted: false,
  },
] as const;

const PLANS_ANNUAL = PLANS_MONTHLY.map((plan) => {
  if (plan.price === 'Custom') return plan;
  const monthly = parseInt(plan.price.replace('$', ''), 10);
  const discounted = Math.round(monthly * 0.8);
  return { ...plan, price: `$${discounted}`, period: '/month, billed annually' };
});

export function CelunePricing() {
  const [annual, setAnnual] = useState(false);
  const plans = annual ? PLANS_ANNUAL : PLANS_MONTHLY;

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-neutral-500">
            <span className="text-neutral-600">[</span>
            <span className="uppercase">Expected Pricing</span>
            <span className="text-neutral-600">]</span>
          </div>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            We&apos;re launching soon. Pricing may change before general availability.
          </p>
        </div>

        {/* Annual / Monthly toggle */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <span className={cn('text-sm', !annual ? 'text-white' : 'text-neutral-500')}>Monthly</span>
          <button
            onClick={() => setAnnual((v) => !v)}
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            className={cn(
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-celune-500',
              annual ? 'bg-celune-500' : 'bg-white/[0.12]'
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
                annual ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </button>
          <span className={cn('text-sm', annual ? 'text-white' : 'text-neutral-500')}>
            Annual
            <span className="ml-1.5 rounded-full bg-celune-500/20 px-2 py-0.5 text-xs font-semibold text-celune-400">
              Save 20%
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={cn(
                'relative flex flex-col rounded-xl border p-6',
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
              <div className="mb-4">
                <h3 className="font-heading text-lg font-medium text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="font-heading text-3xl font-medium text-white">{plan.price}</span>
                {plan.period && <span className="ml-1 text-sm text-neutral-500">{plan.period}</span>}
              </div>
              <ul className="mb-6 space-y-2.5">
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
                  'mt-auto block w-full rounded-lg py-2.5 text-center text-sm font-medium transition-colors',
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
  );
}
