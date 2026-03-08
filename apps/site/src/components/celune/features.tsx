'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { scrollTrigger, staggerContainer, fadeUp, reducedVariants } from '@/lib/motion';

// ─── Illustration: Agent Network (card 1) ───────────────────────────────────

function AgentNetworkIllustration({ hovering }: { hovering: boolean }) {
  const reduced = useReducedMotion();
  const [activeAgent, setActiveAgent] = useState(-1);

  useEffect(() => {
    if (reduced || !hovering) {
      if (!hovering) setActiveAgent(-1);
      return;
    }
    const iv = setInterval(() => setActiveAgent((a) => (a + 1) % 4), 2500);
    return () => clearInterval(iv);
  }, [reduced, hovering]);

  const agents = [
    { id: 'SAGE', duties: ['PRD', 'SPEC', 'PLAN'] },
    { id: 'NOIR', duties: ['UI', 'UX', 'THEME'] },
    { id: 'SCAN', duties: ['REVIEW', 'TEST', 'AUDIT'] },
    { id: 'DELV', duties: ['RESEARCH', 'DOCS', 'LEARN'] },
  ];

  const green = '#22c55e';

  // Static: show first agent highlighted
  const isHighlighted = (i: number) => hovering ? i === activeAgent : i < 1;

  return (
    <div className="flex h-full items-start justify-center px-6 pt-8">
      <div className="w-full space-y-4 font-mono text-[10px]">
        {/* RICK — lead node */}
        <div className="mx-auto flex w-fit items-center gap-2 border border-green-500/40 bg-green-500/[0.08] px-4 py-2.5">
          <span className="inline-block h-3.5 w-3.5 border border-green-500/60 bg-green-500/20" />
          <span className="font-bold text-green-400">RICK</span>
          <span className="text-neutral-500">Lead</span>
        </div>

        {/* Connection lines from RICK to agents */}
        <div className="relative mx-auto h-7 w-full max-w-[90%]">
          <div className="absolute left-1/2 top-0 h-2.5 w-px bg-white/[0.08]" />
          <div className="absolute left-[15%] right-[15%] top-2.5 h-px bg-white/[0.08]" />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute top-2.5 h-2.5 w-px bg-white/[0.08]"
              style={{ left: `${15 + i * (70 / 3)}%` }}
            />
          ))}
        </div>

        {/* Agent row */}
        <div className="grid grid-cols-4 gap-1">
          {agents.map((agent, i) => (
            <div
              key={agent.id}
              className="border px-1 py-2 text-center transition-colors duration-500"
              style={{
                borderColor: isHighlighted(i) ? green : 'rgba(255,255,255,0.06)',
                backgroundColor: isHighlighted(i) ? 'rgba(34,197,94,0.07)' : 'transparent',
              }}
            >
              <div className="flex items-center justify-center gap-1">
                <span className="font-bold transition-colors duration-500" style={{ color: isHighlighted(i) ? green : 'rgba(255,255,255,0.3)' }}>{agent.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Duty rows — each agent's tasks below */}
        {[0, 1, 2].map((row) => (
          <div key={row} className="grid grid-cols-4 gap-1">
            {agents.map((agent, i) => {
              const duty = agent.duties[row];
              const lit = isHighlighted(i);
              return (
                <div
                  key={`${agent.id}-${row}`}
                  className="border px-1 py-1 text-center transition-colors duration-500"
                  style={{
                    borderColor: lit ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.04)',
                    color: lit ? green : 'rgba(255,255,255,0.2)',
                    backgroundColor: lit ? 'rgba(34,197,94,0.05)' : 'transparent',
                  }}
                >
                  {duty}
                </div>
              );
            })}
          </div>
        ))}

        {/* Status bar */}
        <div className="flex items-center justify-between border border-white/[0.06] px-2 py-2">
          <span className="text-neutral-600">STATUS</span>
          <span className="flex items-center gap-1.5">
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-green-500">
              <span
                className="absolute inset-0 rounded-full bg-green-500 transition-opacity duration-300"
                style={{
                  opacity: hovering && !reduced ? 1 : 0,
                  animation: hovering && !reduced ? 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none',
                }}
              />
            </span>
            <span className="text-green-400">ALL ACTIVE</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Illustration: Sprint Pipeline (card 2) ─────────────────────────────────

function SprintPipelineIllustration({ hovering }: { hovering: boolean }) {
  const reduced = useReducedMotion();
  // Static default: show first step completed (PRD)
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduced || !hovering) {
      if (!hovering) setActiveStep(0);
      return;
    }
    const iv = setInterval(() => setActiveStep((s) => (s + 1) % 5), 2000);
    return () => clearInterval(iv);
  }, [reduced, hovering]);

  const steps = ['PRD', 'S1', 'S2', 'REVIEW', 'SHIP'];
  const forks = [
    { label: 'Auth', y: 0 },
    { label: 'UI', y: 1 },
    { label: 'API', y: 2 },
  ];

  return (
    <div className="flex h-full items-start justify-center px-6 pt-8">
      <div className="w-full space-y-3 font-mono text-[10px]">
        {/* Main pipeline */}
        <div className="flex items-center justify-between gap-1">
          {steps.map((step, i) => (
            <div
              key={step}
              className="flex-1 whitespace-nowrap border px-1.5 py-2 text-center transition-colors duration-500"
              style={{
                borderColor: i <= activeStep ? '#22c55e' : 'rgba(255,255,255,0.08)',
                color: i <= activeStep ? '#22c55e' : 'rgba(255,255,255,0.3)',
                backgroundColor: i === activeStep ? 'rgba(34,197,94,0.08)' : 'transparent',
              }}
            >
              {step}
            </div>
          ))}
        </div>

        {/* Fork lines */}
        <div className="mx-auto h-7 w-px bg-white/[0.08]" />

        {/* Parallel forks */}
        <div className="space-y-2.5">
          {forks.map((fork) => {
            const isActive = activeStep >= 1 && activeStep <= 2;
            const isDone = activeStep > 2;
            return (
              <div
                key={fork.label}
                className="flex items-center gap-2 border px-2 py-2.5 transition-colors duration-500"
                style={{
                  borderColor: isDone
                    ? '#22c55e'
                    : isActive
                      ? 'rgba(34,197,94,0.3)'
                      : 'rgba(255,255,255,0.06)',
                }}
              >
                <span className="text-neutral-500">-&gt;</span>
                <span className={`transition-colors duration-500 ${isDone ? 'text-green-400' : isActive ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {fork.label}
                </span>
                <span className="ml-auto">
                  {isDone ? (
                    <span className="text-green-500">ok</span>
                  ) : isActive && hovering ? (
                    <span className="text-yellow-500">*</span>
                  ) : (
                    <span className="text-neutral-700">o</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Merge line */}
        <div className="mx-auto h-7 w-px bg-white/[0.08]" />

        {/* Result */}
        <div
          className="border px-2 py-2.5 text-center transition-colors duration-500"
          style={{
            borderColor: activeStep === 4 ? '#22c55e' : 'rgba(255,255,255,0.06)',
            color: activeStep === 4 ? '#22c55e' : 'rgba(255,255,255,0.25)',
            backgroundColor: activeStep === 4 ? 'rgba(34,197,94,0.06)' : 'transparent',
          }}
        >
          {activeStep === 4 ? 'MERGED' : 'PENDING'}
        </div>
      </div>
    </div>
  );
}

// ─── Illustration: Quality Gates (card 3) ────────────────────────────────────

function QualityGatesIllustration({ hovering }: { hovering: boolean }) {
  const reduced = useReducedMotion();
  // Static default: first 2 gates passed
  const [checked, setChecked] = useState(2);

  useEffect(() => {
    if (reduced) {
      setChecked(6);
      return;
    }
    if (!hovering) {
      setChecked(2);
      return;
    }
    const iv = setInterval(() => {
      setChecked((c) => {
        if (c >= 6) {
          setTimeout(() => setChecked(0), 3000);
          return 6;
        }
        return c + 1;
      });
    }, 1200);
    return () => clearInterval(iv);
  }, [reduced, hovering]);

  const gates = [
    { label: 'Type check', stat: '0 errors' },
    { label: 'Unit tests', stat: '47/47 pass' },
    { label: 'Security audit', stat: 'PASS' },
    { label: 'Code review', stat: '0 issues' },
    { label: 'Design QA', stat: 'Approved' },
    { label: 'Coverage', stat: '94%' },
  ];

  return (
    <div className="flex h-full items-start justify-center px-6 pt-8">
      <div className="w-full space-y-3 font-mono text-[10px]">
        {gates.map((gate, i) => {
          const passed = i < checked;
          const active = hovering && i === checked && checked < 6;
          return (
            <div
              key={gate.label}
              className="flex items-center gap-2.5 border px-2.5 py-3 transition-colors duration-300"
              style={{
                borderColor: passed ? 'rgba(34,197,94,0.3)' : active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
                backgroundColor: passed ? 'rgba(34,197,94,0.04)' : 'transparent',
              }}
            >
              <span className="w-3 text-center">
                {passed ? (
                  <span className="text-green-500">ok</span>
                ) : active ? (
                  <svg className="inline h-3 w-3 animate-spin text-neutral-500" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" opacity={0.25} />
                    <path d="M6 1.5 A4.5 4.5 0 0 1 10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <span className="text-neutral-700">o</span>
                )}
              </span>
              <span className={`transition-colors duration-300 ${passed ? 'text-neutral-300' : 'text-neutral-600'}`}>{gate.label}</span>
              <span className={`ml-auto transition-colors duration-300 ${passed ? 'text-green-400' : 'text-neutral-700'}`}>{passed ? gate.stat : '--'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Feature cards data ─────────────────────────────────────────────────────

const FEATURE_CARDS = [
  {
    title: 'Autonomous Agent Teams',
    titleAccent: 'for AI Development',
    description: 'Specialized agents for engineering, design, QA, and product — each with persistent memory and dedicated tooling.',
    Illustration: AgentNetworkIllustration,
  },
  {
    title: 'Full Sprint Orchestration',
    titleAccent: 'with Parallel Execution',
    description: 'Agents self-organize into sprints with dependency tracking, parallel branches, and automated handoffs.',
    Illustration: SprintPipelineIllustration,
  },
  {
    title: 'Built-in Quality Gates',
    titleAccent: 'Before Every Merge',
    description: 'Every build ends with automated type checks, tests, security audits, code review, and design QA.',
    Illustration: QualityGatesIllustration,
  },
];

// ─── Feature Card with hover state ──────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FeatureCard({ card, childVariant }: { card: (typeof FEATURE_CARDS)[number]; childVariant: any }) {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      variants={childVariant}
      className="flex h-full flex-col border border-white/[0.06] transition-colors duration-500"
      style={{ backgroundColor: hovering ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.015)' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Text content */}
      <div className="p-6 pb-0 lg:p-8 lg:pb-0">
        <h3 className="font-heading text-lg font-medium leading-snug text-white lg:text-xl">
          {card.title}
          <br />
          <span className="text-neutral-500">{card.titleAccent}</span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          {card.description}
        </p>
      </div>

      {/* Illustration area — fixed height to prevent layout shifts */}
      <div className="mt-auto h-[360px] overflow-hidden">
        <card.Illustration hovering={hovering} />
      </div>
    </motion.div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function CeluneFeatures() {
  const shouldReduceMotion = useReducedMotion();
  const containerVariant = shouldReduceMotion ? reducedVariants.staggerContainer : staggerContainer;
  const childVariant = shouldReduceMotion ? reducedVariants.fadeUp : fadeUp;

  return (
    <section id="features" className="relative py-24 md:py-32">
      {/* Decorative rounded border — top corners */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-12 w-[calc(100%-3rem)] max-w-6xl rounded-t-[20px] border-x border-t border-white/[0.07]" />
      </div>

      <div className="container">
        {/* Heading */}
        <motion.div
          variants={childVariant}
          initial="hidden"
          whileInView="visible"
          viewport={scrollTrigger.default}
          className="mb-16"
        >
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-white">Built for Agentic</span>
            <br />
            <span className="text-neutral-500">Engineering at Scale.</span>
          </h2>
        </motion.div>

        {/* 3-card grid */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={scrollTrigger.default}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {FEATURE_CARDS.map((card) => (
            <FeatureCard key={card.title} card={card} childVariant={childVariant} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
