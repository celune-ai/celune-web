'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useReducedMotion, animate } from 'framer-motion';
import { ease } from '@/lib/motion';

// ---------------------------------------------------------------------------
// Stat definitions
// ---------------------------------------------------------------------------

/**
 * Each stat may carry an optional `count` descriptor so the counter knows
 * how to format the animated number back into the display string.
 *
 * `raw`    — the numeric value to count up to
 * `prefix` — prepended to the number (e.g. "<")
 * `suffix` — appended to the number  (e.g. "M+", "min")
 * `decimals` — decimal places to display (default 0)
 *
 * When `count` is absent the value is rendered verbatim (no counter).
 */
interface StatDef {
  value: string;
  label: string;
  count?: {
    raw: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  };
}

const STATS: StatDef[] = [
  {
    value: '1,348',
    label: 'Tasks Completed',
    count: { raw: 1348, suffix: '' },
  },
  {
    // Non-numeric — no counter, just reveal
    value: '24/7',
    label: 'Always Building',
  },
  {
    value: '9',
    label: 'Specialized AI Agents',
    count: { raw: 9, suffix: '' },
  },
  {
    value: '<3min',
    label: 'Avg. Task Claim Time',
    count: { raw: 3, prefix: '<', suffix: 'min' },
  },
];

// ---------------------------------------------------------------------------
// AnimatedNumber
// ---------------------------------------------------------------------------

interface AnimatedNumberProps {
  raw: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Whether the parent card is currently in view */
  inView: boolean;
}

function AnimatedNumber({
  raw,
  prefix = '',
  suffix = '',
  decimals = 0,
  inView,
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState('0');
  const [glowing, setGlowing] = useState(false);
  // useReducedMotion is SSR-safe and avoids hydration mismatches
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      // Skip counting — jump straight to the final value
      setDisplay(`${prefix}${raw.toFixed(decimals)}${suffix}`);
      return;
    }

    const controls = animate(motionValue, raw, {
      duration: 1.6,
      ease: ease.enter,
      onComplete: () => {
        // Brief green glow pulse when counter finishes
        setGlowing(true);
        setTimeout(() => setGlowing(false), 600);
      },
    });

    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span
      className="transition-all duration-500"
      style={glowing ? { textShadow: '0 0 20px rgba(34, 197, 94, 0.4)' } : undefined}
    >
      {display}
    </span>
  );
}

// ---------------------------------------------------------------------------
// StatCard
// ---------------------------------------------------------------------------

interface StatCardProps {
  stat: StatDef;
}

function StatCard({ stat }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger once when 30 % of the card is visible — mirrors scrollTrigger.default
  const inView = useInView(ref, { once: true, amount: 0.3 });
  // useReducedMotion is SSR-safe and avoids hydration mismatches
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="px-6 py-16 text-center transition-colors duration-300 hover:bg-white/[0.015]">
      <div className="font-heading text-3xl font-medium text-white md:text-4xl">
        {stat.count ? (
          <AnimatedNumber
            raw={stat.count.raw}
            prefix={stat.count.prefix}
            suffix={stat.count.suffix}
            decimals={stat.count.decimals}
            inView={inView}
          />
        ) : (
          stat.value
        )}
      </div>
      <div className="mt-2 text-sm text-neutral-500">{stat.label}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CeluneStats
// ---------------------------------------------------------------------------

export function CeluneStats() {
  return (
    <section id="stats" className="relative overflow-hidden">
      <div className="container">
        <div
          className="grid grid-cols-2 divide-x divide-dashed divide-white/[0.08] border-x border-dashed border-white/[0.08] md:grid-cols-4"
        >
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
