'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { URL_APP } from '@/lib/branding';

// ─── Pricing data (update here to reflect everywhere) ─────────────────────────

const PLANS_MONTHLY = [
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
      'GitHub integration',
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
      'GitHub + Slack integrations',
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
      'Unlimited memories',
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

const PLANS_ANNUAL = PLANS_MONTHLY.map((plan) => {
  if (plan.price === '$0' || plan.price === 'Custom') return plan;
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-medium text-celune-500">Pricing</p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Start free during beta. Scale as your team grows.
          </p>
        </motion.div>

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

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
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
                <h3 className="font-heading text-lg font-medium text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>
              </div>
              <div className="mb-8">
                <span className="font-heading text-4xl font-medium text-white">{plan.price}</span>
                {plan.period && <span className="ml-1 text-sm text-neutral-500">{plan.period}</span>}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
