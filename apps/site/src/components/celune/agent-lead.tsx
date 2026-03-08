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
  duration,
  ease,
} from '@/lib/motion';
import { SectionLabel } from './grid-frame';
import { URL_APP } from '@/lib/branding';

// ─── Illustration: Agent Lead Console ────────────────────────────────────────

const AGENT_TASKS = [
  { agent: 'RICK', task: 'DB schema + auth migrations' },
  { agent: 'NOIR', task: 'Login & onboarding UI' },
  { agent: 'SCAN', task: 'Security audit + code review' },
  { agent: 'SAGE', task: 'Sprint retrospective + PRD' },
];

const PERSONAS = ['ATLAS', 'NOVA', 'REX', 'LUNA'];
const VOICES = ['Calm & direct', 'Energetic', 'Methodical', 'Encouraging'];

function AgentLeadIllustration({ hovering }: { hovering: boolean }) {
  const reduced = useReducedMotion();
  const [activeTask, setActiveTask] = useState(0);

  useEffect(() => {
    if (reduced || !hovering) {
      if (!hovering) setActiveTask(0);
      return;
    }
    const iv = setInterval(() => setActiveTask((t) => (t + 1) % AGENT_TASKS.length), 2200);
    return () => clearInterval(iv);
  }, [reduced, hovering]);

  return (
    <div className="flex h-full flex-col justify-between px-6 pt-8 pb-6 font-mono text-[10px]">
      {/* Lead identity card */}
      <div className="mb-4 flex items-center gap-3 border border-celune-500/40 bg-celune-500/[0.06] px-4 py-3">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center border border-celune-500/50 bg-celune-500/10">
          <span className="text-[16px] leading-none">◈</span>
          {hovering && !reduced && (
            <span
              className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-celune-500"
              style={{ animation: 'ping 1.4s cubic-bezier(0,0,0.2,1) infinite' }}
            />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-celune-400">ATLAS</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500">Your Agent Lead</span>
          </div>
          <div className="mt-0.5 text-neutral-600">Calm &amp; direct · ElevenLabs voice</div>
        </div>
      </div>

      {/* Persona options row */}
      <div className="mb-4 grid grid-cols-4 gap-1">
        {PERSONAS.map((p, i) => (
          <div
            key={p}
            className="border px-1 py-1.5 text-center transition-colors duration-500"
            style={{
              borderColor: i === 0 ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.06)',
              color: i === 0 ? '#22c55e' : 'rgba(255,255,255,0.2)',
              backgroundColor: i === 0 ? 'rgba(34,197,94,0.06)' : 'transparent',
            }}
          >
            {p}
          </div>
        ))}
      </div>

      {/* Task delegation log */}
      <div className="space-y-2">
        <div className="mb-1 text-neutral-600">DELEGATING TO TEAM</div>
        {AGENT_TASKS.map((t, i) => {
          const isActive = i === activeTask;
          const isDone = hovering ? i < activeTask : i < 1;
          return (
            <div
              key={t.agent}
              className="flex items-center gap-2.5 border px-2.5 py-2 transition-colors duration-500"
              style={{
                borderColor: isDone
                  ? 'rgba(34,197,94,0.3)'
                  : isActive
                    ? 'rgba(255,255,255,0.12)'
                    : 'rgba(255,255,255,0.05)',
                backgroundColor: isDone ? 'rgba(34,197,94,0.04)' : 'transparent',
              }}
            >
              <span className="w-3 shrink-0 text-center">
                {isDone ? (
                  <span className="text-celune-500">ok</span>
                ) : isActive && hovering ? (
                  <span className="text-yellow-500">▸</span>
                ) : (
                  <span className="text-neutral-700">o</span>
                )}
              </span>
              <span
                className="w-10 shrink-0 font-bold transition-colors duration-500"
                style={{ color: isDone ? '#22c55e' : isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}
              >
                [{t.agent}]
              </span>
              <span
                className="transition-colors duration-500"
                style={{ color: isDone ? 'rgba(255,255,255,0.5)' : isActive ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)' }}
              >
                {t.task}
              </span>
            </div>
          );
        })}
      </div>

      {/* Voice selector */}
      <div className="mt-4 flex items-center gap-2 border border-white/[0.06] px-3 py-2">
        <span className="text-neutral-600">VOICE</span>
        <div className="flex flex-1 gap-1">
          {VOICES.map((v, i) => (
            <div
              key={v}
              className="flex-1 border px-1 py-1 text-center transition-colors duration-300"
              style={{
                borderColor: i === 0 ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.04)',
                color: i === 0 ? '#22c55e' : 'rgba(255,255,255,0.15)',
                fontSize: '9px',
              }}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Key points ──────────────────────────────────────────────────────────────

const AGENT_LEAD_POINTS = [
  {
    label: 'Personalized personality',
    detail: 'Choose how your lead communicates — calm and direct, energetic, methodical, or encouraging.',
  },
  {
    label: 'Real voice, powered by ElevenLabs',
    detail: 'Your Agent Lead speaks to you with a voice you pick. No robotic text-to-speech.',
  },
  {
    label: 'AI-generated avatar',
    detail: "A face that matches their personality — yours from day one, not a generic placeholder.",
  },
  {
    label: 'Orchestrates 9 specialized agents',
    detail: 'SAGE, NOIR, SCAN, DELV, TREK, ECHO, BOND, VITA and more — delegating the right work to the right agent.',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function CeluneAgentLead() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariant = shouldReduceMotion ? reducedVariants.staggerContainer : staggerContainer;
  const headingVariant = shouldReduceMotion ? reducedVariants.fadeUp : fadeUp;
  const leftVariant = shouldReduceMotion ? reducedVariants.slideInLeft : slideInLeft;
  const rightVariant = shouldReduceMotion ? reducedVariants.slideInRight : slideInRight;
  const [hovering, setHovering] = useState(false);

  return (
    <section id="agent-lead" className="relative py-24 md:py-32">
      <div className="dot-grid-bg absolute inset-0 opacity-30" />

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={scrollTrigger.default}
          className="mb-16"
        >
          <SectionLabel>Agent Lead</SectionLabel>
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-white">Meet Your Agent Lead.</span>
            <br />
            <span className="text-neutral-500">Your Closest AI Coworker.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Name them. Choose their personality. Pick their voice. Your Agent Lead becomes the center of your AI team —
            orchestrating specialized agents, delegating tasks, and keeping everything on track.
          </p>
        </motion.div>

        {/* Two-column: illustration + points */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          {/* Illustration */}
          <motion.div
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={scrollTrigger.default}
            className="flex flex-col border border-white/[0.06] bg-white/[0.015] transition-colors duration-500"
            style={{ minHeight: 360 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <AgentLeadIllustration hovering={hovering} />
          </motion.div>

          {/* Key points */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={scrollTrigger.default}
            className="space-y-6"
          >
            {AGENT_LEAD_POINTS.map((point) => (
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
                Create Your Agent Lead
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <path d="M3 7H11M7 3L11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
