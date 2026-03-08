'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { cn } from '@/lib/cn';
import { SectionLabel } from './grid-frame';
import { staggerContainer, fadeUp, scaleIn, reducedVariants, scrollTrigger } from '@/lib/motion';

// ─── Mini chart data ────────────────────────────────────────────────────────

// Stacked bar data: [success, warning, error] per bar — 14 bars like Supabase logs chart
const VELOCITY_STACKED = [
  [320, 90, 40],
  [410, 120, 30],
  [520, 80, 50],
  [380, 140, 60],
  [610, 100, 45],
  [490, 160, 35],
  [550, 70, 80],
  [680, 110, 40],
  [590, 130, 55],
  [720, 90, 70],
  [640, 150, 30],
  [760, 80, 50],
  [690, 120, 60],
  [812, 95, 45],
];
const UTILIZATION_POINTS = [72, 78, 81, 76, 84, 88, 82, 91, 86, 93, 89, 91];

// ─── Animated counter ───────────────────────────────────────────────────────

function AnimatedCount({
  value,
  suffix = '',
  decimals = 0,
  inView,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  inView: boolean;
}) {
  const [display, setDisplay] = useState('0');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    let frame: number;
    const start = performance.now();
    const dur = 1400;
    function tick(now: number) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay((value * eased).toFixed(decimals));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, decimals, reduced]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

// ─── Mini bar chart (velocity) ──────────────────────────────────────────────

function MiniBarChart() {
  const max = Math.max(...VELOCITY_STACKED.map(([s, w, e]) => s + w + e));
  const barW = 120 / VELOCITY_STACKED.length;
  const colors = ['#22c55e', '#f59e0b', '#ef4444']; // success, warning, error

  return (
    <svg viewBox="0 0 120 40" className="h-10 w-full" preserveAspectRatio="none">
      {VELOCITY_STACKED.map((segments, i) => {
        const total = segments[0] + segments[1] + segments[2];
        const totalH = (total / max) * 36;
        const x = i * barW;
        let yOffset = 40;

        return (
          <g key={i}>
            {segments.map((val, si) => {
              const segH = (val / total) * totalH;
              yOffset -= segH;
              return (
                <rect
                  key={si}
                  x={x + 1}
                  y={yOffset}
                  width={barW - 2}
                  height={segH}
                  rx={si === segments.length - 1 ? 1.5 : 0}
                  fill={colors[si]}
                  opacity={si === 0 ? 1 : 0.8}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Mini donut chart (pass rate) ───────────────────────────────────────────

function MiniDonut({ percent }: { percent: number }) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - percent / 100);
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <circle cx={24} cy={24} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={4} />
      <circle
        cx={24}
        cy={24}
        r={r}
        fill="none"
        stroke="#22c55e"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 24 24)"
        className="transition-all duration-1000"
      />
    </svg>
  );
}

// ─── Mini sparkline (utilization) ───────────────────────────────────────────

function MiniSparkline() {
  const max = Math.max(...UTILIZATION_POINTS);
  const min = Math.min(...UTILIZATION_POINTS);
  const range = max - min || 1;
  const points = UTILIZATION_POINTS.map(
    (v, i) => `${(i / (UTILIZATION_POINTS.length - 1)) * 120},${36 - ((v - min) / range) * 32}`,
  ).join(' ');
  return (
    <svg viewBox="0 0 120 40" className="h-10 w-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke="#22c55e" strokeWidth={1.5} strokeLinejoin="round" />
      <polyline
        points={`0,40 ${points} 120,40`}
        fill="url(#sparkGrad)"
        stroke="none"
      />
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Stacked analytics cards ────────────────────────────────────────────────

function AnalyticsStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const cardVariant = shouldReduceMotion ? reducedVariants.scaleIn : scaleIn;

  return (
    <motion.div ref={ref} className="flex flex-col gap-4">
      {/* Peak Tasks / Week */}
      <motion.div
        variants={cardVariant}
        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
      >
        <div className="mb-1 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
          Peak Tasks / Week
        </div>
        <div className="flex items-end justify-between">
          <div className="font-heading text-4xl font-medium text-white">
            <AnimatedCount value={920} inView={inView} />
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-celune-400">
            <svg viewBox="0 0 12 12" className="h-3 w-3">
              <path d="M6 2 L10 7 H2Z" fill="currentColor" />
            </svg>
            +18%
          </div>
        </div>
        <div className="mt-3">
          <MiniBarChart />
        </div>
      </motion.div>

      {/* Code Review Pass Rate */}
      <motion.div
        variants={cardVariant}
        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
      >
        <div className="mb-1 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
          Review Pass Rate
        </div>
        <div className="flex items-center justify-between">
          <div className="font-heading text-4xl font-medium text-white">
            <AnimatedCount value={94} suffix="%" inView={inView} />
          </div>
          <MiniDonut percent={94} />
        </div>
        <div className="mt-2 text-[11px] text-neutral-500">
          First-pass approval across 342 reviews
        </div>
      </motion.div>

      {/* Avg Utilization */}
      <motion.div
        variants={cardVariant}
        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
      >
        <div className="mb-1 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
          Avg Utilization
        </div>
        <div className="flex items-end justify-between">
          <div className="font-heading text-4xl font-medium text-white">
            <AnimatedCount value={91} suffix="%" inView={inView} />
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-celune-400">
            <svg viewBox="0 0 12 12" className="h-3 w-3">
              <path d="M6 2 L10 7 H2Z" fill="currentColor" />
            </svg>
            +8%
          </div>
        </div>
        <div className="mt-3">
          <MiniSparkline />
        </div>
      </motion.div>

      {/* Model Token Usage */}
      <motion.div
        variants={cardVariant}
        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
      >
        <div className="mb-1 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
          Model Token Usage
        </div>
        <div className="flex items-end justify-between">
          <div className="font-heading text-4xl font-medium text-white">
            <AnimatedCount value={4.2} suffix="M" decimals={1} inView={inView} />
          </div>
          <div className="text-[11px] text-neutral-500">this week</div>
        </div>
        <div className="mt-3 space-y-2">
          {[
            { label: 'Opus', tokens: '2.1M', pct: 50, color: '#22c55e' },
            { label: 'Sonnet', tokens: '1.4M', pct: 33, color: '#a78bfa' },
            { label: 'Haiku', tokens: '0.7M', pct: 17, color: '#60a5fa' },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-2">
              <span className="w-10 font-mono text-[10px] text-neutral-500">{m.label}</span>
              <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${m.pct}%`, backgroundColor: m.color }}
                />
              </div>
              <span className="w-8 text-right font-mono text-[10px] text-neutral-500">{m.tokens}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Tiny spinner ───────────────────────────────────────────────────────────

function TinySpinner() {
  return (
    <svg className="h-3 w-3 shrink-0 animate-spin text-neutral-500" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" opacity={0.25} />
      <path
        d="M6 1.5 A4.5 4.5 0 0 1 10.5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Activity feed pool ─────────────────────────────────────────────────────

const ACTIVITY_POOL = [
  { agent: 'RICK', action: 'Committed 3 files to afk/auth', color: 'text-celune-400' },
  { agent: 'SCAN', action: 'Code review: 2 issues found', color: 'text-blue-400' },
  { agent: 'SAGE', action: 'PRD approved, moving to build', color: 'text-purple-400' },
  { agent: 'NOIR', action: 'Design feedback submitted', color: 'text-pink-400' },
  { agent: 'RICK', action: 'Sprint 2 complete, all tests pass', color: 'text-celune-400' },
  { agent: 'SAGE', action: 'Created 8 tasks for Sprint 3', color: 'text-purple-400' },
  { agent: 'SCAN', action: 'Security audit passed — 0 findings', color: 'text-blue-400' },
  { agent: 'RICK', action: 'Merged afk/auth into main', color: 'text-celune-400' },
  { agent: 'NOIR', action: 'UI components pushed to afk/ui', color: 'text-pink-400' },
  { agent: 'RICK', action: 'Claimed: rate limiter middleware', color: 'text-celune-400' },
  { agent: 'SAGE', action: 'PRD draft: notification system', color: 'text-purple-400' },
  { agent: 'SCAN', action: 'Type check passed — 0 errors', color: 'text-blue-400' },
  { agent: 'RICK', action: 'Deployed edge function: verify-password', color: 'text-celune-400' },
  { agent: 'NOIR', action: 'Figma export: 12 components synced', color: 'text-pink-400' },
  { agent: 'SAGE', action: 'Retrospective complete — 3 action items', color: 'text-purple-400' },
  { agent: 'SCAN', action: 'Dependency audit: 0 vulnerabilities', color: 'text-blue-400' },
  { agent: 'RICK', action: 'Rebased afk/settings onto main', color: 'text-celune-400' },
  { agent: 'NOIR', action: 'Dark mode tokens updated', color: 'text-pink-400' },
];

function formatElapsed(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  if (s < 60) return `${s}s ago`;
  return `${Math.floor(s / 60)}m ago`;
}

interface FeedEntry {
  id: number;
  agent: string;
  action: string;
  color: string;
  addedAt: number;
  loading: boolean;
}

function ActivityFeed() {
  const shouldReduceMotion = useReducedMotion();
  const nextId = useRef(0);
  const poolIdx = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const doneTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Seed initial entries
  const [entries, setEntries] = useState<FeedEntry[]>(() => {
    const now = Date.now();
    return ACTIVITY_POOL.slice(0, 10).map((e, i) => ({
      ...e,
      id: nextId.current++,
      addedAt: now - (10 - i) * 25000,
      loading: false,
    }));
  });

  // Live clock for relative times
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const iv = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(iv);
  }, []);

  // Add entries on a random cadence
  const scheduleNext = useCallback(() => {
    const delay = 2500 + Math.random() * 4500; // 2.5–7s
    timerRef.current = setTimeout(() => {
      const pool = ACTIVITY_POOL[poolIdx.current % ACTIVITY_POOL.length];
      poolIdx.current++;
      const id = nextId.current++;

      setEntries((prev) => {
        const updated = prev.map((e) => ({ ...e, loading: false }));
        return [{ ...pool, id, addedAt: Date.now(), loading: true }, ...updated].slice(0, 12);
      });

      // Mark done after 1.5–3.5s
      doneTimerRef.current = setTimeout(() => {
        setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, loading: false } : e)));
      }, 1500 + Math.random() * 2000);

      scheduleNext();
    }, delay);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    scheduleNext();
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(doneTimerRef.current);
    };
  }, [shouldReduceMotion, scheduleNext]);

  return (
    <div className="relative h-[340px] overflow-hidden">
      <div className="space-y-3">
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 font-mono text-xs"
          >
            {entry.loading ? (
              <TinySpinner />
            ) : (
              <span className={cn('shrink-0 font-bold', entry.color)}>{entry.agent}</span>
            )}
            <span className="text-neutral-400">{entry.action}</span>
            <span className="ml-auto shrink-0 text-neutral-600">
              {entry.loading ? 'now' : formatElapsed(now - entry.addedAt)}
            </span>
          </motion.div>
        ))}
      </div>
      {/* Bottom fade overlay */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(12, 12, 15, 0.95))',
        }}
      />
    </div>
  );
}

function PRActivity() {
  const shouldReduceMotion = useReducedMotion();
  const prs = [
    { number: '#142', title: 'feat: add auth middleware', status: 'merged', checks: 'all pass' },
    { number: '#143', title: 'feat: user settings page', status: 'open', checks: '3/3 pass' },
    { number: '#141', title: 'fix: session expiry handler', status: 'merged', checks: 'all pass' },
  ];

  return (
    <div className="space-y-2">
      {prs.map((pr, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : i * 0.08 }}
          className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 font-mono text-xs"
        >
          <span
            className={cn(
              'h-2 w-2 shrink-0 rounded-full',
              pr.status === 'merged' ? 'bg-purple-500' : 'bg-celune-500',
            )}
          />
          <span className="text-neutral-500">{pr.number}</span>
          <span className="truncate text-neutral-300">{pr.title}</span>
          <span className="ml-auto shrink-0 text-neutral-600">{pr.checks}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Overnight log lines ────────────────────────────────────────────────────

const OVERNIGHT_LINES = [
  { icon: 'info', text: '10:42 PM — Session started' },
  { icon: 'check', text: '10:43 PM — Claimed: "Add RBAC middleware"' },
  { icon: 'check', text: '11:15 PM — Build passed (47 tests)' },
  { icon: 'check', text: '11:16 PM — Committed to afk/rbac' },
  { icon: 'check', text: '11:18 PM — Claimed: "User management UI"' },
  { icon: 'check', text: '11:52 PM — UI components scaffolded' },
  { icon: 'check', text: '12:14 AM — Login flow passing e2e tests' },
  { icon: 'check', text: '12:31 AM — Settings page complete' },
  { icon: 'check', text: '1:05 AM — Claimed: "API rate limiter"' },
  { icon: 'check', text: '1:38 AM — Rate limiter passing 12 tests' },
  { icon: 'check', text: '2:10 AM — Committed to afk/rate-limit' },
  { icon: 'check', text: '6:52 AM — All 8 tasks done. Branch ready.' },
];

function OvernightLog() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentLoading, setCurrentLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleCount(OVERNIGHT_LINES.length);
      return;
    }

    function revealNext() {
      // Show spinner on current line
      setCurrentLoading(true);

      // After 8–15s, "complete" it
      const spinDuration = 8000 + Math.random() * 7000;
      timerRef.current = setTimeout(() => {
        setCurrentLoading(false);
        setVisibleCount((prev) => {
          const next = prev + 1;
          if (next >= OVERNIGHT_LINES.length) {
            // Restart cycle after a long pause
            setTimeout(() => {
              setVisibleCount(1);
              setTimeout(revealNext, 2000);
            }, 12000);
            return OVERNIGHT_LINES.length;
          }
          // Schedule next reveal (30–50s)
          const nextDelay = 30000 + Math.random() * 20000;
          setTimeout(revealNext, nextDelay);
          return next;
        });
      }, spinDuration);
    }

    const initial = setTimeout(revealNext, 20000);
    return () => {
      clearTimeout(initial);
      clearTimeout(timerRef.current);
    };
  }, [shouldReduceMotion]);

  const lines = OVERNIGHT_LINES.slice(0, visibleCount);

  return (
    <div className="font-mono text-xs leading-relaxed">
      <div className="text-neutral-500">
        <span className="text-celune-400">$</span> celune overnight --mode build
      </div>
      <div className="mt-3 space-y-1.5">
        <AnimatePresence initial={false}>
          {lines.map((line, i) => {
            const isNewest = i === lines.length - 1;
            const showSpinner = isNewest && currentLoading;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 text-neutral-400"
              >
                {showSpinner ? (
                  <TinySpinner />
                ) : line.icon === 'info' ? (
                  <span className="text-yellow-400">i</span>
                ) : (
                  <span className="text-celune-500">✓</span>
                )}
                <span>{line.text}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {visibleCount < OVERNIGHT_LINES.length && !currentLoading && (
          <div className="text-neutral-700">
            <span className="animate-pulse">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function CeluneDemoShowcase() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariant = shouldReduceMotion ? reducedVariants.staggerContainer : staggerContainer;

  const panelVariant = shouldReduceMotion ? reducedVariants.fadeUp : fadeUp;

  const headingVariant = shouldReduceMotion ? reducedVariants.fadeUp : fadeUp;

  return (
    <section id="demo" className="relative py-24 md:py-32">
      <div className="container">
        {/* Section heading — fades up once */}
        <motion.div
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={scrollTrigger.default}
          className="mb-16"
        >
          <SectionLabel>Live dashboard</SectionLabel>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
            See agents in action
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Real-time coordination across your entire development pipeline.
          </p>
        </motion.div>

        {/* Two-column layout: analytics stack + dashboard panels */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={scrollTrigger.early}
          className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]"
        >
          {/* Left — stacked analytics cards */}
          <AnalyticsStack />

          {/* Right — dashboard panels */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Activity feed — spans 2 cols */}
            <motion.div
              variants={panelVariant}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:col-span-2"
            >
              <div className="mb-4 flex items-center gap-2">
                <div className="bg-celune-500 animate-pulse-dot h-1.5 w-1.5 rounded-full" />
                <span className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
                  Agent Activity — Live
                </span>
              </div>
              <ActivityFeed />
            </motion.div>

            {/* Overnight log */}
            <motion.div
              variants={panelVariant}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <div className="mb-4 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
                Overnight Build Log
              </div>
              <OvernightLog />
            </motion.div>

            {/* PR activity — spans full */}
            <motion.div
              variants={panelVariant}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:col-span-3"
            >
              <div className="mb-4 font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
                Pull Requests
              </div>
              <PRActivity />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
