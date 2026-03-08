'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  scrollTrigger,
  staggerContainer,
  fadeUp,
  slideInLeft,
  slideInRight,
  reducedVariants,
} from '@/lib/motion';
import { SectionLabel } from './grid-frame';
import { URL_APP } from '@/lib/branding';

// ─── Illustration: Semantic Memory Search ─────────────────────────────────────

const MEMORIES = [
  { category: 'DECISION', text: 'Stripe for billing, not Paddle', score: '0.97' },
  { category: 'PREFERENCE', text: 'Dark terminals, green accents', score: '0.94' },
  { category: 'PATTERN', text: 'Auth via Supabase RLS policies', score: '0.91' },
  { category: 'CONTEXT', text: 'solopreneur, B2B SaaS focus', score: '0.88' },
  { category: 'HABIT', text: 'Sprint retros every Friday', score: '0.85' },
];

function SecondBrainIllustration({ hovering }: { hovering: boolean }) {
  const reduced = useReducedMotion();
  const [activeMemory, setActiveMemory] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || !hovering) {
      setActiveMemory(null);
      return;
    }
    let i = 0;
    const iv = setInterval(() => {
      setActiveMemory(i % MEMORIES.length);
      i++;
    }, 1800);
    return () => clearInterval(iv);
  }, [reduced, hovering]);

  return (
    <div className="flex h-full flex-col justify-between px-6 pt-8 pb-6 font-mono text-[10px]">
      {/* Search bar */}
      <div className="mb-4 flex items-center gap-2 border border-white/[0.10] bg-white/[0.02] px-3 py-2.5">
        <span className="text-celune-400">$</span>
        <span className="text-neutral-400">recall --query &quot;payment provider choice&quot;</span>
        {hovering && !reduced && (
          <span
            className="ml-auto inline-block h-3.5 w-0.5 bg-celune-400"
            style={{ animation: 'pulse 1s step-end infinite' }}
          />
        )}
      </div>

      {/* Semantic match header */}
      <div className="mb-2 flex items-center justify-between text-neutral-600">
        <span>SEMANTIC MATCHES</span>
        <span className="text-celune-500/60">pgvector · gte-small</span>
      </div>

      {/* Memory results */}
      <div className="flex-1 space-y-2">
        {MEMORIES.map((m, i) => {
          const isActive = activeMemory === i;
          const isHighlighted = !hovering ? i === 0 : isActive;
          return (
            <div
              key={m.text}
              className="flex items-start gap-2.5 border px-2.5 py-2.5 transition-colors duration-500"
              style={{
                borderColor: isHighlighted
                  ? 'rgba(34,197,94,0.35)'
                  : 'rgba(255,255,255,0.05)',
                backgroundColor: isHighlighted ? 'rgba(34,197,94,0.04)' : 'transparent',
              }}
            >
              {/* Score bar */}
              <div className="flex flex-col items-center gap-1 pt-0.5">
                <span
                  className="font-bold transition-colors duration-500"
                  style={{ color: isHighlighted ? '#22c55e' : 'rgba(255,255,255,0.2)' }}
                >
                  {m.score}
                </span>
                <div
                  className="h-8 w-0.5 transition-colors duration-500"
                  style={{
                    backgroundColor: isHighlighted ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.06)',
                  }}
                />
              </div>
              <div>
                <div
                  className="mb-0.5 transition-colors duration-500"
                  style={{ color: isHighlighted ? 'rgba(34,197,94,0.7)' : 'rgba(255,255,255,0.2)' }}
                >
                  [{m.category}]
                </div>
                <div
                  className="transition-colors duration-500"
                  style={{ color: isHighlighted ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}
                >
                  {m.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer stats */}
      <div className="mt-4 flex items-center justify-between border border-white/[0.06] px-3 py-2">
        <span className="text-neutral-600">MEMORY BANK</span>
        <span className="text-celune-400">1,247 stored · 384-dim embeddings</span>
      </div>
    </div>
  );
}

// ─── Key points ──────────────────────────────────────────────────────────────

const SECOND_BRAIN_POINTS = [
  {
    label: 'Semantic memory search',
    detail: 'Ask in plain language. pgvector finds the most relevant memories — not just keyword matches.',
  },
  {
    label: 'Auto-learns from every conversation',
    detail: 'Decisions, preferences, and patterns are captured automatically. No manual note-taking.',
  },
  {
    label: '1K to unlimited memories by plan',
    detail: 'Start free with 1,000 memories. Scale to unlimited as your knowledge base grows.',
  },
  {
    label: 'Privacy-first — your data stays yours',
    detail: 'All memory is stored in your own Supabase instance. We never train on your data.',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function CeluneSecondBrain() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariant = shouldReduceMotion ? reducedVariants.staggerContainer : staggerContainer;
  const headingVariant = shouldReduceMotion ? reducedVariants.fadeUp : fadeUp;
  const leftVariant = shouldReduceMotion ? reducedVariants.slideInLeft : slideInLeft;
  const rightVariant = shouldReduceMotion ? reducedVariants.slideInRight : slideInRight;
  const [hovering, setHovering] = useState(false);

  return (
    <section id="second-brain" className="relative py-24 md:py-32">
      {/* Decorative rounded border — top corners (mirrors features section) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-12 w-[calc(100%-3rem)] max-w-6xl rounded-t-[20px] border-x border-t border-white/[0.07]" />
      </div>

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={scrollTrigger.default}
          className="mb-16"
        >
          <SectionLabel>Second Brain</SectionLabel>
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-white">AI That Remembers Everything.</span>
            <br />
            <span className="text-neutral-500">Gets Smarter Every Session.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Every conversation, decision, and preference is stored and recalled. Your agents learn from past
            interactions — so you never repeat yourself, and they never forget what matters.
          </p>
        </motion.div>

        {/* Two-column: points + illustration (reversed) */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          {/* Key points — left on desktop */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={scrollTrigger.default}
            className="space-y-6 md:order-1"
          >
            {SECOND_BRAIN_POINTS.map((point) => (
              <motion.div key={point.label} variants={headingVariant} className="flex gap-4">
                <div className="mt-0.5 shrink-0">
                  <div className="flex h-5 w-5 items-center justify-center border border-celune-500/30 bg-celune-500/[0.08]">
                    <div className="h-1.5 w-1.5 bg-celune-500" />
                  </div>
                </div>
                <div>
                  <p className="font-medium text-white">{point.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">{point.detail}</p>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              variants={headingVariant}
              initial="hidden"
              whileInView="visible"
              viewport={scrollTrigger.default}
              className="pt-2"
            >
              <a
                href={`${URL_APP}/signup`}
                className="inline-flex items-center gap-2 border border-celune-500/40 bg-celune-500/10 px-6 py-3 font-mono text-sm font-medium text-celune-400 transition-colors duration-200 hover:border-celune-500/60 hover:bg-celune-500/15 hover:text-celune-300"
              >
                Start Building Your Brain
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <path d="M3 7H11M7 3L11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Illustration — right on desktop */}
          <motion.div
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={scrollTrigger.default}
            className="flex flex-col border border-white/[0.06] bg-white/[0.015] transition-colors duration-500 md:order-2"
            style={{ minHeight: 380 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <SecondBrainIllustration hovering={hovering} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
