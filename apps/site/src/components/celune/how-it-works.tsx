import { SectionLabel } from './grid-frame';

const STEPS = [
  {
    number: '01',
    title: 'Sign up and meet your Agent Lead',
    description:
      'Create your workspace in seconds. Your Agent Lead introduces themselves, walks you through setup, and is ready to take your first project brief.',
    details: [
      'Workspace provisioned instantly',
      'Agent Lead onboarding',
      'Connect your GitHub repos',
    ],
  },
  {
    number: '02',
    title: 'Describe what you want built',
    description:
      'Tell your agents what you need — a feature, a product, a fix. They create a PRD, break it into sprints, and self-assign tasks based on their specialization.',
    details: [
      'Auto-generated PRD',
      'Sprint planning & task breakdown',
      'Agents self-assign by skill',
    ],
  },
  {
    number: '03',
    title: 'Review, approve, and ship',
    description:
      'Agents open pull requests, run automated code review, and flag anything that needs your eyes. You approve what matters. Everything else ships automatically.',
    details: ['Automated code review', 'Security & type-check gates', 'One-click merge & deploy'],
  },
];

export function CeluneHowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="dot-grid-bg absolute inset-0 opacity-50" />

      <div className="relative z-10 container">
        <div className="mb-16">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
            From idea to shipped product in three steps
          </h2>
          <p className="mt-4 text-lg text-neutral-400">Describe it. Delegate it. Ship it.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 transition-colors hover:border-white/[0.1] hover:bg-white/[0.03]"
            >
              {/* Step number */}
              <span className="text-celune-500/70 font-mono text-sm font-medium">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="font-heading mt-4 text-xl font-medium text-white">{step.title}</h3>

              {/* Description */}
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
                {step.description}
              </p>

              {/* Detail list */}
              <ul className="mt-6 space-y-2.5">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2.5 text-sm text-neutral-500">
                    <span className="bg-celune-500/10 flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px]">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2.5 5L4.5 7L7.5 3.5"
                          stroke="#22c55e"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
