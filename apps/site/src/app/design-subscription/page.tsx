import type { Metadata } from 'next';
import { CeluneNav } from '@/components/celune/nav';
import { CeluneFooter } from '@/components/celune/footer';
import { GridFrame } from '@/components/celune/grid-frame';

export const metadata: Metadata = {
  title: 'Design Subscription — Smejkal Design | $2,500/mo',
  description:
    'Unlimited design requests for $2,500/month. One active request at a time, 48–72hr turnaround. UI/UX, landing pages, marketing assets, and brand work. Powered by AI-assisted production.',
  openGraph: {
    title: 'Design Subscription — Smejkal Design',
    description:
      'Quality design at a fraction of agency cost. $2,500/mo, pause or cancel anytime. One active request at a time, 48–72hr turnaround.',
    url: 'https://celune.ai/design-subscription',
  },
};

const SCOPE_IN = [
  'Landing pages and marketing sites (design only)',
  'UI/UX design for web and mobile apps',
  'Marketing assets — ads, social banners, email headers',
  'Brand identity refreshes (logo, color, typography)',
  'Pitch deck design',
  'Wireframes and interactive prototypes (Figma)',
  'Design system components and documentation',
  'Icon sets and illustration direction',
];

const SCOPE_OUT = [
  'Development / engineering (design deliverables only)',
  'Photography and photo editing',
  'Video production',
  'Print production beyond PDF-ready files',
  'Custom 3D modeling',
  'Logo animation / motion graphics',
  'Social media management',
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Subscribe and get onboarded',
    description:
      'Pay via Stripe. You\'ll receive a Trello board link, brand intake questionnaire, and a short Loom walkthrough within 24 hours.',
  },
  {
    step: '02',
    title: 'Submit a design request',
    description:
      'Add a request card to the board with description, reference links, and any assets. Be as specific or as loose as you like — we\'ll ask if we need clarification.',
  },
  {
    step: '03',
    title: 'Receive your design in 48–72 hours',
    description:
      'Finished work delivered as a Figma file or export package with a Loom walkthrough. Unlimited revisions until you\'re happy.',
  },
  {
    step: '04',
    title: 'Queue the next request',
    description:
      'One active request at a time. As soon as the current one is approved, the next one in your queue starts immediately.',
  },
];

const FAQS = [
  {
    q: 'Why one request at a time?',
    a: "Context switching between multiple complex projects degrades quality. One active request means your work gets full attention, not a fraction of it. If you have a high-volume need, contact me and we'll figure out a custom arrangement.",
  },
  {
    q: 'What does "unlimited requests" actually mean?',
    a: "You can have as many requests queued as you want. One moves to 'active' at a time. As soon as you approve it, the next one starts. In a typical month with focused requests, expect 6–12 completed deliverables.",
  },
  {
    q: 'What if I need a rush turnaround?',
    a: "Standard turnaround is 48–72 hours. Rush (under 24 hours) can be arranged on a case-by-case basis for an additional fee, subject to availability. Mention it when submitting the request.",
  },
  {
    q: 'Can I pause or cancel?',
    a: "Yes, anytime. Pause to bank your subscription for a month you're not ready with requests. Cancel before your next billing date and you won't be charged again. No contracts, no cancellation fees.",
  },
  {
    q: 'What tools do you deliver in?',
    a: 'Figma for all screen design, prototypes, and design systems. Illustrator/Affinity for print-ready brand assets. All files exported in appropriate formats (PNG, SVG, PDF) on delivery.',
  },
  {
    q: 'How is this different from hiring a full-time designer?',
    a: "A full-time senior designer costs $120–180k/year plus benefits — roughly $10–15k/month. At $2,500, you get comparable output without the hiring risk, onboarding lag, equity discussion, or HR overhead. Pause when you don't need it.",
  },
  {
    q: "What's the catch?",
    a: "Capacity is limited to 3 clients at a time to maintain quality. There's a waitlist when full. Response time for questions during off-hours may be next business day. You're getting one designer, not a team.",
  },
];

export default function DesignSubscriptionPage() {
  return (
    <>
      <CeluneNav />
      <GridFrame>
        <main className="pt-28 pb-24">
          {/* Hero */}
          <section className="container max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-celune-500/20 bg-celune-500/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-celune-500 animate-pulse" />
              <span className="font-mono text-[11px] text-celune-400 tracking-wider uppercase">Accepting clients — 1 spot available</span>
            </div>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Design on demand.
              <br />
              <span className="text-celune-400">$2,500/month.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-neutral-400 leading-relaxed">
              Unlimited design requests at a flat monthly rate. One active at a time, 48–72 hour turnaround.
              Pause or cancel anytime. UI/UX, landing pages, marketing assets, and brand work — by a senior
              designer, accelerated by AI production tools.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://buy.stripe.com/smejkal-design-sub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-celune-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-celune-400"
              >
                Subscribe — $2,500/mo
                <span aria-hidden>→</span>
              </a>
              <a
                href="mailto:hello@celune.ai?subject=Design subscription — question"
                className="inline-flex items-center gap-2 rounded-md border border-white/[0.1] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
              >
                Ask a question
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-dashed border-white/[0.06] pt-8">
              <div>
                <div className="text-2xl font-bold text-white">$2,500</div>
                <div className="mt-0.5 text-xs text-neutral-500">Per month, flat rate</div>
              </div>
              <div className="h-8 w-px bg-white/[0.06]" />
              <div>
                <div className="text-2xl font-bold text-white">48–72hr</div>
                <div className="mt-0.5 text-xs text-neutral-500">Standard turnaround</div>
              </div>
              <div className="h-8 w-px bg-white/[0.06]" />
              <div>
                <div className="text-2xl font-bold text-white">Unlimited</div>
                <div className="mt-0.5 text-xs text-neutral-500">Queued requests</div>
              </div>
              <div className="h-8 w-px bg-white/[0.06]" />
              <div>
                <div className="text-2xl font-bold text-white">Pause</div>
                <div className="mt-0.5 text-xs text-neutral-500">Cancel anytime</div>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="container max-w-4xl mt-24">
            <p className="font-mono text-xs text-celune-500/70 tracking-widest uppercase">How it works</p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Simple async workflow</h2>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {HOW_IT_WORKS.map((step) => (
                <div
                  key={step.step}
                  className="rounded-lg border border-border bg-surface-50 p-6 transition-colors hover:border-celune-500/20"
                >
                  <div className="mb-3 font-mono text-[11px] text-celune-500/70 tracking-wider">{step.step}</div>
                  <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-400">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Scope */}
          <section className="container max-w-4xl mt-24">
            <p className="font-mono text-xs text-celune-500/70 tracking-widest uppercase">Scope</p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">What's in. What's out.</h2>
            <p className="mt-3 text-neutral-400 max-w-2xl">
              Clarity on scope prevents disappointment. Read this before subscribing.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-lg border border-celune-500/20 bg-celune-500/5 p-6">
                <h3 className="mb-4 text-sm font-semibold text-celune-400">Included</h3>
                <ul className="space-y-2">
                  {SCOPE_IN.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-neutral-300">
                      <span className="mt-0.5 shrink-0 text-celune-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-surface-50 p-6">
                <h3 className="mb-4 text-sm font-semibold text-neutral-500">Not included</h3>
                <ul className="space-y-2">
                  {SCOPE_OUT.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-neutral-500">
                      <span className="mt-0.5 shrink-0 text-neutral-600">–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section className="container max-w-4xl mt-24">
            <p className="font-mono text-xs text-celune-500/70 tracking-widest uppercase">Pricing context</p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">How $2,500/mo compares</h2>

            <div className="mt-8 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-100">
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500">Option</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500">Monthly Cost</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500">Speed</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500">Flexibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { option: 'Full-time senior designer', cost: '$10–15k', speed: '5-day sprint cycles', flex: 'Hire/fire lag — 6 months' },
                    { option: 'Design agency', cost: '$8–20k', speed: '2-3 week projects', flex: 'Contract lock-in' },
                    { option: 'DesignJoy (Brett Williams)', cost: '$5,995', speed: '2-3 days', flex: 'Pause anytime' },
                    { option: 'Fiverr / Upwork', cost: '$500–2k', speed: '5-7 days typical', flex: 'Per project, inconsistent' },
                    { option: 'Smejkal Design ← you are here', cost: '$2,500', speed: '48–72 hours', flex: 'Pause anytime, no contract', highlight: true },
                  ].map((row) => (
                    <tr key={row.option} className={row.highlight ? 'bg-celune-500/5' : ''}>
                      <td className={`px-5 py-3.5 text-xs font-medium ${row.highlight ? 'text-celune-400' : 'text-white'}`}>{row.option}</td>
                      <td className="px-5 py-3.5 text-xs text-neutral-400">{row.cost}</td>
                      <td className="px-5 py-3.5 text-xs text-neutral-400">{row.speed}</td>
                      <td className="px-5 py-3.5 text-xs text-neutral-400">{row.flex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="container max-w-4xl mt-24">
            <p className="font-mono text-xs text-celune-500/70 tracking-widest uppercase">FAQ</p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Common questions</h2>

            <div className="mt-8 space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.q} className="border-b border-dashed border-white/[0.06] pb-6 last:border-0">
                  <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="container max-w-4xl mt-24">
            <div className="rounded-xl border border-dashed border-white/[0.08] bg-surface-50 p-10 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-celune-500/20 bg-celune-500/5 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-celune-500 animate-pulse" />
                <span className="font-mono text-[11px] text-celune-400 tracking-wider uppercase">1 spot available now</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Ready to get started?</h2>
              <p className="mt-3 text-neutral-400 max-w-xl mx-auto">
                Subscribe and receive your Trello board and onboarding within 24 hours.
                First month pro-rated from the day you start.
              </p>
              <a
                href="https://buy.stripe.com/smejkal-design-sub"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-celune-500 px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-celune-400"
              >
                Subscribe — $2,500/month
                <span aria-hidden>→</span>
              </a>
              <p className="mt-4 text-xs text-neutral-600">
                Not ready yet?{' '}
                <a href="mailto:hello@celune.ai" className="text-neutral-400 hover:text-white transition-colors">
                  Email hello@celune.ai
                </a>{' '}
                with any questions.
              </p>
            </div>
          </section>
        </main>
      </GridFrame>
      <CeluneFooter />
    </>
  );
}
