'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  type MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/cn';
import { posthog } from '@/lib/posthog';
import {
  staggerContainer,
  fadeUp,
  reducedVariants,
  duration,
  ease,
} from '@/lib/motion';
import { URL_APP, URL_DOCS } from '@/lib/branding';

const QUICK_START_STEPS = [
  { label: 'Connect', command: 'celune connect --project "my-app"' },
  { label: 'Plan', command: 'celune plan "Build user auth system"' },
  { label: 'Ship', command: 'celune build --agents 3 --auto-review' },
  { label: 'Review', command: 'celune status  # PRs ready to merge' },
];

interface ConversationLine {
  agent?: string;
  color?: string;
  text: string;
  type: 'command' | 'status' | 'agent' | 'divider' | 'result';
  delay: number;
}

const CONVERSATION: ConversationLine[] = [
  { text: 'celune build --project "User Auth System"', type: 'command', delay: 0 },
  { text: '', type: 'divider', delay: 800 },
  {
    agent: 'SAGE',
    color: 'text-purple-400',
    text: 'Drafting PRD — analyzing requirements, edge cases, security constraints...',
    type: 'agent',
    delay: 1200,
  },
  {
    agent: 'SAGE',
    color: 'text-purple-400',
    text: 'PRD complete. 12 tasks created across 3 sprints.',
    type: 'agent',
    delay: 3000,
  },
  { text: '✓ Research phase complete — moving to implementation', type: 'status', delay: 4200 },
  { text: '', type: 'divider', delay: 4800 },
  {
    agent: 'RICK',
    color: 'text-celune-400',
    text: 'Claiming Sprint 1: DB schema + auth middleware',
    type: 'agent',
    delay: 5200,
  },
  {
    agent: 'NOIR',
    color: 'text-pink-400',
    text: 'Claiming Sprint 1: Login/signup UI components',
    type: 'agent',
    delay: 5800,
  },
  { text: '▸ 2 agents working in parallel on Sprint 1', type: 'status', delay: 6400 },
  {
    agent: 'RICK',
    color: 'text-celune-400',
    text: 'Schema migrations applied. Auth middleware passing 23 tests.',
    type: 'agent',
    delay: 8000,
  },
  {
    agent: 'NOIR',
    color: 'text-pink-400',
    text: 'UI complete — login, signup, forgot password flows.',
    type: 'agent',
    delay: 9200,
  },
  { text: '✓ Sprint 1 complete — starting code review', type: 'status', delay: 10000 },
  { text: '', type: 'divider', delay: 10400 },
  {
    agent: 'SCAN',
    color: 'text-blue-400',
    text: 'Code review: 2 issues found — SQL injection risk, missing rate limit on /login',
    type: 'agent',
    delay: 11000,
  },
  {
    agent: 'RICK',
    color: 'text-celune-400',
    text: 'Both fixed. Parameterized queries + rate limiter added.',
    type: 'agent',
    delay: 12400,
  },
  {
    agent: 'SCAN',
    color: 'text-blue-400',
    text: 'Re-review passed. All clear.',
    type: 'agent',
    delay: 13600,
  },
  { text: '', type: 'divider', delay: 14000 },
  { text: '✓ 12/12 tasks complete', type: 'result', delay: 14600 },
  { text: '✓ Type check: PASS (0 errors)', type: 'result', delay: 15000 },
  { text: '✓ Tests: 47/47 passing', type: 'result', delay: 15400 },
  { text: '✓ Security audit: PASS', type: 'result', delay: 15800 },
  { text: '✓ Branch afk/user-auth ready to merge', type: 'result', delay: 16200 },
];

function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Respect reduced-motion preference for in-terminal animations
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    function runCycle() {
      setVisibleLines(0);
      timers = [];
      CONVERSATION.forEach((line, i) => {
        timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
      });
      timers.push(setTimeout(() => runCycle(), 20000));
    }

    runCycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0C0C0F]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-neutral-600">celune agent session</span>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 font-mono text-[13px] leading-[1.7]"
        style={{ scrollbarWidth: 'none' }}
      >
        {CONVERSATION.slice(0, visibleLines).map((line, i) => {
          if (line.type === 'divider') {
            return <div key={i} className="my-2.5 border-t border-white/[0.04]" />;
          }
          if (line.type === 'command') {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-neutral-500"
              >
                <span className="text-celune-400">$</span> {line.text}
              </motion.div>
            );
          }
          if (line.type === 'agent') {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-1.5 flex items-start gap-2"
              >
                <span className={cn('shrink-0 font-bold', line.color)}>{line.agent}</span>
                <span className="text-neutral-400">{line.text}</span>
              </motion.div>
            );
          }
          if (line.type === 'status') {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1.5 text-neutral-500"
              >
                {line.text}
              </motion.div>
            );
          }
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-celune-400 mt-1"
            >
              {line.text}
            </motion.div>
          );
        })}
        {visibleLines < CONVERSATION.length && (
          <div className="mt-2 text-neutral-700">
            <span className="animate-pulse">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface TerminalCardProps {
  terminalOpacity: MotionValue<number>;
  dur: { fast: number; normal: number; slow: number; xSlow: number };
  ez: { enter: number[]; exit: number[]; parallax: number[]; bounce: number[]; fade: number[] };
}

function TerminalCard({ terminalOpacity, dur, ez }: TerminalCardProps) {
  return (
    <motion.div
      initial={{ x: 20 }}
      animate={{ x: 0 }}
      transition={{ duration: dur.xSlow, delay: 0.3, ease: ez.enter as [number, number, number, number] }}
      style={{ opacity: terminalOpacity }}
      className={cn(
        'h-[520px] rounded-xl lg:h-[560px]',
        'shadow-[0_48px_100px_-16px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)]',
      )}
    >
      <div className="h-full">
        <AnimatedTerminal />
      </div>
    </motion.div>
  );
}

export function CeluneHero() {
  const [activeTab, setActiveTab] = useState(0);
  const reduced = useReducedMotion();

  // Terminal opacity — no parallax fade, always fully visible.
  const terminalOpacity = useMotionValue(1);

  // Stagger container variant — respects reduced motion.
  const containerVariant = reduced ? reducedVariants.staggerContainer : staggerContainer;
  // Child reveal variant — respects reduced motion.
  const childVariant = reduced ? reducedVariants.fadeUp : fadeUp;

  return (
    <section id="hero" className="relative overflow-hidden pt-16">
      <div className="relative z-10 container py-[160px]">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — text content with staggered reveal */}
          <motion.div variants={containerVariant} initial="hidden" animate="visible">
            {/* Badge — first staggered child */}
            <motion.div
              variants={childVariant}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5"
            >
              <span className="bg-celune-500 animate-pulse-dot h-1.5 w-1.5 rounded-full" />
              <span className="text-xs font-medium text-neutral-400">Now in Private Beta</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={childVariant}
              className="font-heading text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Ship faster with
              <br />
              <span className="text-celune-500 glow-green-text">autonomous agent teams</span>
            </motion.h1>

            {/* Subtitle — third staggered child */}
            <motion.p
              variants={childVariant}
              className="mt-6 max-w-lg font-sans text-lg font-light leading-relaxed text-neutral-500"
            >
              Agent teams that research, plan, build, review, and ship production code. A full R&D
              process — not a copilot.
            </motion.p>

            {/* Quick-start steps — fourth staggered child */}
            <motion.div variants={childVariant} className="mt-12 max-w-md">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-600">
                How it works
              </p>
              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#111114]">
                <div className="relative flex items-center border-b border-white/[0.06]">
                  {QUICK_START_STEPS.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(i)}
                      className={cn(
                        'relative px-4 py-2.5 text-xs font-medium transition-colors',
                        activeTab === i
                          ? 'text-celune-400'
                          : 'text-neutral-600 hover:text-neutral-400',
                      )}
                    >
                      {tab.label}
                      {activeTab === i && (
                        <motion.div
                          layoutId="hero-tab-indicator"
                          className="bg-celune-500 absolute inset-x-0 bottom-0 h-px"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3 p-4" style={{ minHeight: '4.25rem' }}>
                  <code className="flex-1 font-mono text-sm leading-relaxed text-neutral-300">
                    <span className="text-neutral-600 select-none">$ </span>
                    {QUICK_START_STEPS[activeTab].command}
                  </code>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="mt-8 flex items-center gap-3">
                <motion.a
                  href={`${URL_APP}/signup`}
                  onClick={() => posthog.capture('cta_clicked', { location: 'hero', label: 'Start Free' })}
                  whileHover={reduced ? undefined : { scale: 1.02, boxShadow: '0 4px 20px rgba(34, 197, 94, 0.25)' }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="bg-celune-500 hover:bg-celune-400 inline-block rounded-lg px-6 py-2.5 text-sm font-semibold text-black transition-colors"
                >
                  Start Free
                </motion.a>
                <a
                  href={`${URL_APP}/login`}
                  onClick={() => posthog.capture('cta_clicked', { location: 'hero', label: 'Sign in' })}
                  className="inline-block rounded-lg border border-white/[0.1] bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/[0.08]"
                >
                  Sign in
                </a>
              </div>
            </motion.div>

            {/* Docs link — fifth staggered child */}
            <motion.div variants={childVariant} className="mt-8">
              <a
                href={URL_DOCS}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture('cta_clicked', { location: 'hero', label: 'Docs' })}
                className="inline-block rounded-md border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-[13px] font-medium text-white transition-all hover:bg-white/[0.08]"
              >
                View our docs &rarr;
              </a>
            </motion.div>
          </motion.div>

          {/* Right — animated terminal */}
          <TerminalCard
            terminalOpacity={terminalOpacity}
            dur={duration}
            ez={ease}
          />
        </div>
      </div>

      {/* Decorative rounded border — bottom corners */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <div className="h-12 w-[calc(100%-3rem)] max-w-6xl rounded-b-[20px] border-x border-b border-white/[0.07]" />
      </div>
    </section>
  );
}
