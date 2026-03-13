'use client';

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';

const AsciiWaves = dynamic(() => import('./ascii-waves'), { ssr: false });

class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// ─── Agent avatar helper ─────────────────────────────────────────────────────

function MiniAvatar({ name, color, active }: { name: string; color: string; active?: boolean }) {
  return (
    <div
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[8px] font-bold tracking-wide transition-all duration-500"
      style={{
        borderColor: active ? color : 'rgba(255,255,255,0.08)',
        backgroundColor: active ? `${color}15` : 'rgba(255,255,255,0.04)',
        color: active ? color : 'rgba(255,255,255,0.35)',
      }}
    >
      {name.slice(0, 2)}
    </div>
  );
}

// ─── Illustration: Agent Communication (card 1) ─────────────────────────────

const CHAT_MESSAGES = [
  { agent: 'RICK', color: '#22c55e', text: 'Should we use WebSockets or SSE for the real-time updates? SSE is simpler but WebSockets give us bidirectional.' },
  { agent: 'SAGE', color: '#a78bfa', text: 'SSE fits better here — we only need server→client. Saves us connection overhead and works through proxies.' },
  { agent: 'RICK', color: '#22c55e', text: 'Agreed. I\'ll build the SSE endpoint with reconnect logic. NOIR, the event stream will emit typed JSON payloads.' },
  { agent: 'NOIR', color: '#f472b6', text: 'Got it. I\'ll wire up an EventSource hook with optimistic UI updates while we wait on the stream.' },
  { agent: 'SCAN', color: '#60a5fa', text: 'Adding SSE timeout + retry tests to the E2E suite. I\'ll also verify the connection drops cleanly on unmount.' },
];

function AgentNetworkIllustration({ hovering }: { hovering: boolean }) {
  const reduced = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (reduced) return;
    if (!hovering) {
      setVisibleCount(1);
      return;
    }
    setVisibleCount(1);
    const iv = setInterval(() => setVisibleCount((c) => {
      if (c >= CHAT_MESSAGES.length) return CHAT_MESSAGES.length;
      return c + 1;
    }), 1800);
    return () => clearInterval(iv);
  }, [reduced, hovering]);

  return (
    <div className="flex h-full flex-col gap-3 px-5 pt-6">
      {/* Lead agent card */}
      <div className="rounded-xl border border-celune-500/30 bg-celune-500/[0.04] p-3">
        <div className="flex items-center gap-2.5">
          <MiniAvatar name="RICK" color="#22c55e" active />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-celune-400">RICK</span>
              <span className="rounded bg-celune-500/15 px-1.5 py-0.5 text-[10px] font-medium text-celune-400">Lead</span>
            </div>
            <p className="text-[11px] text-neutral-500">Coordinating team discussion</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="relative h-1.5 w-1.5 rounded-full bg-celune-500">
              {hovering && !reduced && (
                <span className="absolute inset-0 animate-ping rounded-full bg-celune-500" />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Chat thread */}
      <div className="flex-1 space-y-3 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
          <span className="font-mono text-[10px] tracking-wider text-neutral-600 uppercase">#real-time-updates</span>
          <span className="ml-auto text-[10px] text-neutral-700">{visibleCount} of {CHAT_MESSAGES.length}</span>
        </div>
        <div className="space-y-3">
          {CHAT_MESSAGES.slice(0, visibleCount).map((msg, i) => (
            <div
              key={i}
              className="flex gap-2.5 transition-all duration-500"
              style={{ opacity: i < visibleCount ? 1 : 0 }}
            >
              <MiniAvatar name={msg.agent} color={msg.color} active={i === visibleCount - 1} />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold transition-colors duration-500" style={{ color: msg.color }}>
                  {msg.agent}
                </span>
                <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Illustration: Sprint Pipeline (card 2) ─────────────────────────────────

function SprintPipelineIllustration({ hovering }: { hovering: boolean }) {
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (reduced) return;
    if (!hovering) {
      setActiveStep(1);
      return;
    }
    setActiveStep(1);
    const iv = setInterval(() => setActiveStep((s) => {
      if (s >= 6) return 6;
      return s + 1;
    }), 1500);
    return () => clearInterval(iv);
  }, [reduced, hovering]);

  const sprintSteps = [
    { label: 'Create PRD & requirements', agent: 'SAGE' },
    { label: 'Auth middleware & endpoints', agent: 'RICK' },
    { label: 'Login & signup UI', agent: 'NOIR' },
    { label: 'Code review', agent: 'SCAN' },
    { label: 'Design review', agent: 'NOIR' },
    { label: 'Retrospective', agent: 'SAGE' },
  ];

  return (
    <div className="flex h-full flex-col gap-3 px-5 pt-6">
      {/* Sprint tabs — horizontal, same height as RICK lead / QA cards */}
      <div className="flex gap-2">
        {/* Sprint 1 — active */}
        <div className="flex-1 rounded-xl border border-celune-500/30 bg-celune-500/[0.04] p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-celune-500/40 bg-celune-500/15 text-[9px] font-bold text-celune-400">
              S1
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-semibold text-celune-400">Sprint 1</span>
                <span className="rounded bg-celune-500/15 px-1 py-0.5 text-[9px] font-medium text-celune-400">
                  {activeStep >= 6 ? '6/6' : `${Math.min(activeStep, 6)}/6`}
                </span>
              </div>
              <p className="text-[10px] text-neutral-500">Auth System</p>
            </div>
          </div>
        </div>
        {/* Sprint 2 — disabled */}
        <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 opacity-70">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-[9px] font-bold text-neutral-500">
              S2
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-medium text-neutral-500">Sprint 2</span>
                <span className="text-[9px] text-neutral-600">0/5</span>
              </div>
              <p className="text-[10px] text-neutral-600">Dashboard</p>
            </div>
          </div>
        </div>
        {/* Sprint 3 — disabled */}
        <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 opacity-70">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-[9px] font-bold text-neutral-500">
              S3
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-medium text-neutral-500">Sprint 3</span>
                <span className="text-[9px] text-neutral-600">0/4</span>
              </div>
              <p className="text-[10px] text-neutral-600">Notifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sprint steps */}
      <div className="space-y-2">
        {sprintSteps.map((step, i) => {
          const done = i < activeStep;
          const current = i === activeStep && hovering;
          return (
            <div
              key={step.label}
              className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all duration-500"
              style={{
                borderColor: done ? 'rgba(34,197,94,0.25)' : current ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
                backgroundColor: done ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.02)',
              }}
            >
              {done ? (
                <svg className="h-3.5 w-3.5 shrink-0 text-celune-500" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : current ? (
                <svg className="h-3.5 w-3.5 shrink-0 animate-spin text-neutral-500" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" opacity={0.25} />
                  <path d="M6 1.5 A4.5 4.5 0 0 1 10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/[0.1]" />
              )}
              <div className="min-w-0 flex-1">
                <span className="text-[12px] transition-colors duration-500" style={{ color: done ? 'rgba(255,255,255,0.7)' : current ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)' }}>
                  {step.label}
                </span>
              </div>
              <span className="text-[10px] transition-colors duration-500" style={{ color: done ? 'rgba(34,197,94,0.6)' : 'rgba(255,255,255,0.15)' }}>
                {step.agent}
              </span>
            </div>
          );
        })}
      </div>

      {/* Merge status */}
      <div
        className="mt-auto rounded-xl border px-3 py-2.5 transition-all duration-500"
        style={{
          borderColor: activeStep >= 6 ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.06)',
          backgroundColor: activeStep >= 6 ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.02)',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-wider text-neutral-600 uppercase">Status</span>
          <span
            className="text-[11px] font-medium transition-colors duration-500"
            style={{ color: activeStep >= 6 ? '#22c55e' : 'rgba(255,255,255,0.25)' }}
          >
            {activeStep >= 6 ? 'Sprint complete' : activeStep >= 4 ? 'In review' : 'Building'}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Illustration: Quality Gates (card 3) ────────────────────────────────────

function QualityGatesIllustration({ hovering }: { hovering: boolean }) {
  const reduced = useReducedMotion();
  const [checked, setChecked] = useState(1);

  useEffect(() => {
    if (reduced) {
      setChecked(6);
      return;
    }
    if (!hovering) {
      setChecked(1);
      return;
    }
    setChecked(1);
    const iv = setInterval(() => {
      setChecked((c) => {
        if (c >= 6) return 6;
        return c + 1;
      });
    }, 800);
    return () => clearInterval(iv);
  }, [reduced, hovering]);

  const gates = [
    { label: 'Type check', stat: '0 errors', icon: 'T' },
    { label: 'Unit tests', stat: '47/47 pass', icon: 'U' },
    { label: 'Security audit', stat: 'PASS', icon: 'S' },
    { label: 'Code review', stat: '0 issues', icon: 'C' },
    { label: 'Design QA', stat: 'Approved', icon: 'D' },
    { label: 'Coverage', stat: '94%', icon: '%' },
  ];

  const passedCount = Math.min(checked, 6);
  const allPassed = passedCount === 6;

  return (
    <div className="flex h-full flex-col gap-3 px-5 pt-6">
      {/* Summary card — same height as RICK lead card */}
      <div className="rounded-xl border border-celune-500/30 bg-celune-500/[0.04] p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-celune-500/40 bg-celune-500/15 text-[10px] font-bold text-celune-400">
            QA
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-celune-400">Quality Gates</span>
              <span
                className="rounded bg-celune-500/15 px-1.5 py-0.5 text-[10px] font-medium transition-colors duration-500"
                style={{ color: allPassed ? '#22c55e' : 'rgba(34,197,94,0.6)' }}
              >
                {passedCount}/6
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">Pre-merge validation</p>
          </div>
        </div>
      </div>

      {/* Gate items */}
      <div className="space-y-2">
        {gates.map((gate, i) => {
          const passed = i < checked;
          const active = hovering && i === checked && checked < 6;
          return (
            <div
              key={gate.label}
              className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all duration-300"
              style={{
                borderColor: passed ? 'rgba(34,197,94,0.25)' : active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
                backgroundColor: passed ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {passed ? (
                  <svg className="h-3.5 w-3.5 text-celune-500" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : active ? (
                  <svg className="h-3.5 w-3.5 animate-spin text-neutral-500" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" opacity={0.25} />
                    <path d="M6 1.5 A4.5 4.5 0 0 1 10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-white/[0.1]" />
                )}
              </span>
              <span className={`flex-1 text-[12px] transition-colors duration-300 ${passed ? 'text-neutral-300' : 'text-neutral-600'}`}>
                {gate.label}
              </span>
              <span className={`text-[11px] font-mono transition-colors duration-300 ${passed ? 'text-celune-400' : 'text-neutral-700'}`}>
                {passed ? gate.stat : '--'}
              </span>
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
    title: 'Full Sprint Orchestration',
    titleAccent: 'with Parallel Execution',
    description: 'Agents self-organize into sprints with dependency tracking, parallel branches, and automated handoffs.',
    Illustration: SprintPipelineIllustration,
  },
  {
    title: 'Agents That Communicate',
    titleAccent: 'and Learn Together',
    description: 'Your agents debate approaches, share context, and build collective memory — every conversation makes the whole team smarter.',
    Illustration: AgentNetworkIllustration,
  },
  {
    title: 'Built-in Quality Gates',
    titleAccent: 'Before Every Merge',
    description: 'Every build ends with automated type checks, tests, security audits, code review, and design QA.',
    Illustration: QualityGatesIllustration,
  },
];

// ─── Feature Card with hover state ──────────────────────────────────────────

function FeatureCard({ card }: { card: (typeof FEATURE_CARDS)[number] }) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="flex h-full flex-col rounded-xl border border-white/[0.06] transition-colors duration-500"
      style={{ backgroundColor: hovering ? '#141418' : '#111114' }}
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

      {/* Illustration area — fixed height with bottom fade */}
      <div className="relative mt-auto h-[360px] overflow-hidden">
        <card.Illustration hovering={hovering} />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{
            background: `linear-gradient(to bottom, transparent, ${hovering ? '#141418' : '#111114'})`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function CeluneFeatures() {
  return (
    <section id="features" className="relative overflow-hidden py-24 md:py-32">
      {/* ASCII Waves background — inside page rails */}
      <div className="pointer-events-none absolute left-12 right-12 z-0 overflow-hidden opacity-[0.15]" style={{ top: -1, bottom: 0 }}>
        <CanvasErrorBoundary>
          <AsciiWaves
            characters=" .:-+*=%@#"
            color="#22c55e"
            speed={0.4}
            intensity={0.8}
            noiseScale={2.0}
            elementSize={14}
            hasCursorInteraction={false}
            waveTension={0.3}
            waveTwist={0.08}
          />
        </CanvasErrorBoundary>
      </div>

      <div className="container relative z-[1]">
        {/* Heading */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-white">Built for Agentic</span>
            <br />
            <span className="text-neutral-500">Engineering at Scale.</span>
          </h2>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURE_CARDS.map((card) => (
            <FeatureCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
