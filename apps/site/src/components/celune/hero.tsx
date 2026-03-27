'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { posthog } from '@/lib/posthog';

// Quick-start install commands — hidden for now, will re-enable post-launch
// const QUICK_START_STEPS = [
//   { label: 'npx', command: 'npx celune init' },
//   { label: 'curl', command: 'curl -fsSL celune.ai/install | sh' },
//   { label: 'brew', command: 'brew install celune' },
//   { label: 'pip', command: 'pip install celune' },
// ];

// ─── Hero data ──────────────────────────────────────────────────────────────

const HOURS_SAVED_POINTS = [80, 120, 140, 115, 180, 210, 195, 260, 235, 290, 320, 380];

type TaskStatus = 'Planned' | 'In Progress' | 'Review' | 'Done';
type Priority = 'High' | 'Normal' | 'Low';
type Agent = 'RICK' | 'SCAN' | 'SAGE' | 'NOIR' | 'Eric';

interface HeroTask {
  title: string;
  project?: string;
  status: TaskStatus;
  priority: Priority;
  agent: Agent;
}

const STATUS_COLOR: Record<TaskStatus, string> = {
  Planned: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  'In Progress': 'border-celune-500/30 bg-celune-500/10 text-celune-400',
  Review: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
  Done: 'border-celune-500/30 bg-celune-500/10 text-celune-400',
};

const PRIORITY_COLOR: Record<Priority, string> = {
  High: 'border-red-500/30 bg-red-500/10 text-red-400',
  Normal: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  Low: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
};

const AGENT_COLOR: Record<Agent, string> = {
  RICK: 'border-celune-500/30 bg-celune-500/10 text-celune-400',
  SCAN: 'border-celune-500/30 bg-celune-500/10 text-celune-400',
  SAGE: 'border-celune-500/30 bg-celune-500/10 text-celune-400',
  NOIR: 'border-pink-500/30 bg-pink-500/10 text-pink-400',
  Eric: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
};

const TASK_GROUPS: { label: TaskStatus; count: number; tasks: HeroTask[] }[] = [
  {
    label: 'Planned',
    count: 4,
    tasks: [
      {
        title: 'Add Stripe subscription billing flow',
        status: 'Planned',
        priority: 'High',
        agent: 'RICK',
      },
      {
        title: 'Write onboarding email drip sequence',
        status: 'Planned',
        priority: 'Normal',
        agent: 'SAGE',
      },
      {
        title: 'Design mobile-responsive dashboard',
        status: 'Planned',
        priority: 'Normal',
        agent: 'NOIR',
      },
      {
        title: 'Build team invite and permissions system',
        status: 'Planned',
        priority: 'High',
        agent: 'RICK',
      },
    ],
  },
  {
    label: 'In Progress',
    count: 2,
    tasks: [
      {
        title: 'Implement OAuth login with Google and GitHub',
        status: 'In Progress',
        priority: 'High',
        agent: 'RICK',
      },
      {
        title: 'Set up CI/CD pipeline with staging deploys',
        status: 'In Progress',
        priority: 'High',
        agent: 'SCAN',
      },
    ],
  },
  {
    label: 'Review',
    count: 1,
    tasks: [
      {
        title: 'Landing page copy and SEO meta tags',
        status: 'Review',
        priority: 'Normal',
        agent: 'Eric',
      },
    ],
  },
  {
    label: 'Done',
    count: 2,
    tasks: [
      {
        title: 'Security audit: user auth and API keys',
        status: 'Done',
        priority: 'High',
        agent: 'SCAN',
      },
      {
        title: 'Brand kit — logo, colors, and typography',
        status: 'Done',
        priority: 'Normal',
        agent: 'NOIR',
      },
    ],
  },
];

// ─── Mini sparkline ─────────────────────────────────────────────────────────

function MiniSparkline({ data, color = '#22c55e' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 120},${36 - ((v - min) / range) * 32}`)
    .join(' ');
  const gradId = `heroSparkGrad-${color.replace('#', '')}`;
  return (
    <svg viewBox="0 0 120 40" className="h-8 w-full" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <polyline points={`0,40 ${points} 120,40`} fill={`url(#${gradId})`} stroke="none" />
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.15} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Badge helper ───────────────────────────────────────────────────────────

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span
      className={cn('shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-medium', colorClass)}
    >
      {label}
    </span>
  );
}

// ─── Hero dashboard preview ─────────────────────────────────────────────────

function HeroDashboard() {
  return (
    <div className="relative min-w-0">
      <div className="grid grid-cols-[200px_1fr] gap-3">
        {/* Left — ROI metric cards */}
        <div className="flex flex-col gap-3">
          {/* Hours Saved */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0d0d0f] p-4">
            <div className="mb-1 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
              Hours Saved / Week
            </div>
            <div className="flex items-end justify-between">
              <div className="font-heading text-3xl font-medium text-white">380h</div>
              <div className="text-celune-400 flex items-center gap-1 text-[11px] font-medium">
                <svg viewBox="0 0 12 12" className="h-3 w-3">
                  <path d="M6 2 L10 7 H2Z" fill="currentColor" />
                </svg>
                +18%
              </div>
            </div>
            <div className="mt-2">
              <MiniSparkline data={HOURS_SAVED_POINTS} />
            </div>
          </div>

          {/* Cost per Task */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0d0d0f] p-4">
            <div className="mb-1 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
              Cost per Task
            </div>
            <div className="flex items-end justify-between">
              <div className="font-heading text-3xl font-medium text-white">$0.42</div>
              <div className="text-celune-400 flex items-center gap-1 text-[11px] font-medium">
                <svg viewBox="0 0 12 12" className="h-3 w-3">
                  <path d="M6 10 L10 5 H2Z" fill="currentColor" />
                </svg>
                -18%
              </div>
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">vs $3.80 manual avg</div>
          </div>

          {/* Avg Time to Ship */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0d0d0f] p-4">
            <div className="mb-1 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
              Avg Time to Ship
            </div>
            <div className="flex items-end justify-between">
              <div className="font-heading text-3xl font-medium text-white">45m</div>
              <div className="text-celune-400 flex items-center gap-1 text-[11px] font-medium">
                <svg viewBox="0 0 12 12" className="h-3 w-3">
                  <path d="M6 10 L10 5 H2Z" fill="currentColor" />
                </svg>
                -82%
              </div>
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">From task to merged PR</div>
          </div>

          {/* Code Quality */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0d0d0f] p-4">
            <div className="mb-1 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
              Code Quality Score
            </div>
            <div className="flex items-end justify-between">
              <div className="font-heading text-3xl font-medium text-white">9.4</div>
              <div className="text-[11px] text-neutral-500">/ 10</div>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/[0.06]">
              <div className="bg-celune-500 h-full rounded-full" style={{ width: '94%' }} />
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">First-pass approval: 94%</div>
          </div>
        </div>

        {/* Right — task table */}
        <div className="relative min-w-0 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0d0d0f]">
          {TASK_GROUPS.map((group) => (
            <div key={group.label}>
              {/* Group header */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2">
                <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-neutral-600">
                  <path
                    d="M2 3 L5 6 L8 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[11px] font-semibold text-neutral-300">{group.label}</span>
                <span className="bg-celune-500/15 text-celune-400 rounded px-1.5 py-0.5 text-[9px] font-bold">
                  {group.count}
                </span>
              </div>
              {/* Task rows */}
              {group.tasks.length > 0 && (
                <div>
                  {group.tasks.map((task, i) => (
                    <div
                      key={i}
                      className="relative flex items-center gap-3 border-b border-white/[0.04] px-4 py-2.5"
                    >
                      {/* Pulsing green background for in-progress rows */}
                      {task.status === 'In Progress' && (
                        <div className="bg-celune-500/[0.04] pointer-events-none absolute inset-0 animate-pulse" />
                      )}
                      {/* Checkbox circle */}
                      <span className="relative h-4 w-4 shrink-0 rounded-full border border-white/[0.12]" />
                      {/* Title */}
                      <span className="relative min-w-0 flex-1 truncate text-[12px] text-neutral-300">
                        {task.title}
                      </span>
                      {/* Agent badge */}
                      <Badge label={task.agent} colorClass={AGENT_COLOR[task.agent]} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
            style={{ background: 'linear-gradient(to bottom, transparent, rgb(10 10 15))' }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main hero ──────────────────────────────────────────────────────────────

function HeroEmailInput() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'hero' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setLoading(false);
        return;
      }
      posthog.capture('waitlist_signup', { location: 'hero', email });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border-celune-500/20 bg-celune-500/10 mt-8 inline-flex w-full items-center gap-2.5 rounded-lg border px-4 py-3 sm:w-auto">
        <svg className="text-celune-400 h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8.5L6.5 12L13 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-celune-400 text-sm font-medium">
          Welcome! We will reach out with your access code soon.
        </span>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="focus:border-celune-500/50 flex-1 rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors outline-none placeholder:text-white/60"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-celune-500 hover:bg-celune-400 cursor-pointer rounded-lg px-6 py-3 text-sm font-semibold whitespace-nowrap text-black transition-colors disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Get Early Access'}
          </button>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </form>
    </div>
  );
}

export function CeluneHero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-16">
      <div className="relative z-10 container py-[160px]">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — text content */}
          <div>
            {/* Badge */}
            <div className="border-celune-500/20 bg-celune-500/5 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
              <span className="bg-celune-500 animate-pulse-dot h-1.5 w-1.5 rounded-full" />
              <span className="text-celune-400 text-xs font-medium">Now in Beta</span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ship faster with
              <br />
              <span className="text-celune-500 glow-green-text">autonomous agent teams</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed font-light text-white/80">
              Agent teams that research, plan, build, review, and ship your ideas, all while
              following a fully visible end-to-end process.
            </p>

            {/* Email signup */}
            <HeroEmailInput />

            {/* Trust badges */}
            <div className="mt-6 flex items-center gap-3 text-white/80">
              <div className="flex items-center gap-1.5">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 1.5L2.5 4v4c0 3.5 2.3 6 5.5 7 3.2-1 5.5-3.5 5.5-7V4L8 1.5z" />
                  <path d="M5.5 8.5L7 10l3.5-3.5" />
                </svg>
                <span className="text-xs">SOC 2 Type II</span>
              </div>
              <span className="text-white/40">|</span>
              <span className="text-xs">AES-256 encryption</span>
              <span className="text-white/40">|</span>
              <span className="text-xs">GDPR ready</span>
            </div>
          </div>

          {/* Right — dashboard preview (z-20 so stars render behind it) */}
          <div className="relative z-20 hidden lg:block">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
