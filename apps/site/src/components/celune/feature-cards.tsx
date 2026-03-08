'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { scrollTrigger, duration, ease } from '@/lib/motion';

/* ─── Minimal SVG Illustrations ─── */
/* Palette: black bg, white/green strokes, squared corners, bright enough to read */

function AgentTeamsSVG() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      {/* Central hub */}
      <rect x="148" y="68" width="24" height="24" rx="1" stroke="#22c55e" strokeWidth="1" opacity="0.7" fill="none" />
      <rect x="156" y="76" width="8" height="8" rx="0" fill="#22c55e" opacity="0.8" />
      {/* Outer agents */}
      {[
        { x: 72, y: 42 },
        { x: 232, y: 42 },
        { x: 52, y: 112 },
        { x: 252, y: 112 },
        { x: 112, y: 152 },
        { x: 192, y: 152 },
      ].map((p, i) => (
        <g key={i}>
          <line x1="160" y1="80" x2={p.x + 8} y2={p.y + 8} stroke="#ffffff" strokeWidth="0.7" opacity="0.15" />
          <rect x={p.x} y={p.y} width="16" height="16" rx="1" stroke="#ffffff" strokeWidth="0.7" opacity="0.3" fill="none" />
          <rect x={p.x + 5} y={p.y + 5} width="6" height="6" rx="0" fill="#ffffff" opacity={0.3 + i * 0.05} />
        </g>
      ))}
      {/* Dashed orbit */}
      <ellipse cx="160" cy="100" rx="120" ry="70" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 6" />
    </svg>
  );
}

function ToolUseSVG() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      {/* Terminal window */}
      <rect x="50" y="25" width="220" height="150" rx="1" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" fill="none" />
      <rect x="50" y="25" width="220" height="20" fill="#111111" />
      <line x1="50" y1="45" x2="270" y2="45" stroke="#ffffff" strokeWidth="0.5" opacity="0.15" />
      {/* Dots */}
      <circle cx="64" cy="35" r="2.5" fill="#ffffff" opacity="0.25" />
      <circle cx="74" cy="35" r="2.5" fill="#ffffff" opacity="0.2" />
      <circle cx="84" cy="35" r="2.5" fill="#ffffff" opacity="0.15" />
      {/* Cursor */}
      <text x="62" y="65" fill="#22c55e" opacity="0.7" fontSize="10" fontFamily="monospace">$</text>
      {/* Code lines */}
      <rect x="78" y="57" width="100" height="3" rx="0" fill="#ffffff" opacity="0.15" />
      <rect x="62" y="72" width="140" height="3" rx="0" fill="#ffffff" opacity="0.1" />
      <rect x="62" y="87" width="80" height="3" rx="0" fill="#22c55e" opacity="0.25" />
      {/* Connection arrows going out */}
      <line x1="270" y1="70" x2="300" y2="55" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" />
      <line x1="270" y1="100" x2="305" y2="100" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" />
      <line x1="270" y1="130" x2="300" y2="145" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" />
      {/* Integration squares */}
      <rect x="293" y="47" width="10" height="10" rx="1" stroke="#22c55e" strokeWidth="0.8" opacity="0.6" fill="none" />
      <rect x="298" y="95" width="10" height="10" rx="1" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" fill="none" />
      <rect x="293" y="140" width="10" height="10" rx="1" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" fill="none" />
    </svg>
  );
}

function PersistentMemorySVG() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      {/* Database stack — squared */}
      <g transform="translate(110, 20)">
        {/* Bottom */}
        <rect x="0" y="110" width="100" height="30" rx="1" stroke="#ffffff" strokeWidth="0.6" opacity="0.15" fill="none" />
        <line x1="0" y1="120" x2="100" y2="120" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />
        {/* Middle */}
        <rect x="0" y="70" width="100" height="30" rx="1" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" fill="none" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />
        {/* Top — green accent */}
        <rect x="0" y="30" width="100" height="30" rx="1" stroke="#22c55e" strokeWidth="0.8" opacity="0.6" fill="none" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="#22c55e" strokeWidth="0.5" opacity="0.3" />
        {/* Side lines */}
        <line x1="0" y1="30" x2="0" y2="140" stroke="#ffffff" strokeWidth="0.5" opacity="0.12" />
        <line x1="100" y1="30" x2="100" y2="140" stroke="#ffffff" strokeWidth="0.5" opacity="0.12" />
      </g>
      {/* Neural paths — left */}
      <rect x="42" y="64" width="5" height="5" rx="0" fill="#ffffff" opacity="0.35" />
      <rect x="30" y="114" width="4" height="4" rx="0" fill="#ffffff" opacity="0.25" />
      <line x1="47" y1="67" x2="110" y2="55" stroke="#ffffff" strokeWidth="0.6" opacity="0.15" />
      <line x1="34" y1="116" x2="110" y2="95" stroke="#ffffff" strokeWidth="0.5" opacity="0.12" />
      {/* Neural paths — right */}
      <rect x="268" y="74" width="5" height="5" rx="0" fill="#ffffff" opacity="0.3" />
      <rect x="278" y="124" width="4" height="4" rx="0" fill="#ffffff" opacity="0.2" />
      <line x1="268" y1="77" x2="210" y2="60" stroke="#ffffff" strokeWidth="0.6" opacity="0.15" />
      <line x1="278" y1="126" x2="210" y2="100" stroke="#ffffff" strokeWidth="0.5" opacity="0.12" />
      {/* Label */}
      <rect x="140" y="168" width="60" height="16" rx="1" stroke="#ffffff" strokeWidth="0.5" opacity="0.2" fill="none" />
      <text x="170" y="179" textAnchor="middle" fill="#ffffff" opacity="0.35" fontSize="8" fontFamily="monospace">pgvector</text>
    </svg>
  );
}

function SkillLibrarySVG() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      {/* Grid of skill blocks — squared */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const x = 55 + col * 58;
          const y = 28 + row * 58;
          const isActive = row === 0 && col === 1;
          return (
            <g key={`${row}-${col}`}>
              <rect
                x={x}
                y={y}
                width="48"
                height="46"
                rx="1"
                stroke={isActive ? '#22c55e' : '#ffffff'}
                strokeWidth={isActive ? '1' : '0.6'}
                opacity={isActive ? 0.6 : 0.15}
                fill="none"
              />
              {/* Inner content lines */}
              <rect x={x + 8} y={y + 12} width={22 + (col % 3) * 5} height="3" rx="0" fill={isActive ? '#22c55e' : '#ffffff'} opacity={isActive ? 0.4 : 0.15} />
              <rect x={x + 8} y={y + 22} width={16 + (row % 2) * 8} height="3" rx="0" fill="#ffffff" opacity="0.1" />
              {/* Status square */}
              <rect x={x + 38} y={y + 36} width="4" height="4" rx="0" fill={isActive ? '#22c55e' : '#ffffff'} opacity={isActive ? 0.7 : 0.15} />
            </g>
          );
        }),
      )}
    </svg>
  );
}

function NightModeSVG() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      {/* Moon */}
      <circle cx="250" cy="40" r="18" fill="#ffffff" opacity="0.08" />
      <circle cx="258" cy="33" r="17" fill="#08080a" />
      <circle cx="250" cy="40" r="18" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" fill="none" />
      {/* Stars */}
      <rect x="178" y="26" width="3" height="3" rx="0" fill="#ffffff" opacity="0.4" />
      <rect x="198" y="53" width="2" height="2" rx="0" fill="#ffffff" opacity="0.3" />
      <rect x="288" y="63" width="3" height="3" rx="0" fill="#ffffff" opacity="0.35" />
      <rect x="140" y="18" width="2" height="2" rx="0" fill="#ffffff" opacity="0.2" />
      <rect x="100" y="42" width="2" height="2" rx="0" fill="#ffffff" opacity="0.15" />
      {/* Timeline */}
      <line x1="25" y1="130" x2="295" y2="130" stroke="#ffffff" strokeWidth="0.6" opacity="0.12" />
      <text x="25" y="150" fill="#ffffff" opacity="0.3" fontSize="8" fontFamily="monospace">10PM</text>
      <text x="115" y="150" fill="#ffffff" opacity="0.3" fontSize="8" fontFamily="monospace">1AM</text>
      <text x="205" y="150" fill="#ffffff" opacity="0.3" fontSize="8" fontFamily="monospace">4AM</text>
      {/* Pulse */}
      <path d="M 25 125 L 55 125 L 65 110 L 75 135 L 90 118 L 125 120 L 135 105 L 145 132 L 165 115 L 215 118 L 225 103 L 235 130 L 255 113 L 295 116" stroke="#ffffff" strokeWidth="1.2" opacity="0.3" fill="none" />
      {/* Completion squares */}
      <rect x="71" y="131" width="8" height="8" rx="1" fill="#22c55e" opacity="0.7" />
      <rect x="141" y="128" width="8" height="8" rx="1" fill="#22c55e" opacity="0.7" />
      <rect x="231" y="126" width="8" height="8" rx="1" fill="#22c55e" opacity="0.7" />
    </svg>
  );
}

function CodeReviewSVG() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      {/* Review panel */}
      <rect x="45" y="20" width="230" height="160" rx="1" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" fill="none" />
      <rect x="45" y="20" width="230" height="20" fill="#111111" />
      <line x1="45" y1="40" x2="275" y2="40" stroke="#ffffff" strokeWidth="0.5" opacity="0.15" />
      {/* Diff lines */}
      <rect x="45" y="48" width="230" height="14" fill="#ffffff" fillOpacity="0.02" />
      <rect x="65" y="52" width="130" height="3" rx="0" fill="#ffffff" opacity="0.15" />
      <rect x="45" y="62" width="230" height="14" fill="#22c55e" fillOpacity="0.04" />
      <text x="58" y="72" fill="#22c55e" opacity="0.5" fontSize="8" fontFamily="monospace">+</text>
      <rect x="70" y="67" width="160" height="3" rx="0" fill="#22c55e" opacity="0.35" />
      <rect x="45" y="76" width="230" height="14" fill="#22c55e" fillOpacity="0.04" />
      <text x="58" y="86" fill="#22c55e" opacity="0.5" fontSize="8" fontFamily="monospace">+</text>
      <rect x="70" y="81" width="120" height="3" rx="0" fill="#22c55e" opacity="0.3" />
      <rect x="65" y="98" width="100" height="3" rx="0" fill="#ffffff" opacity="0.1" />
      <rect x="65" y="110" width="150" height="3" rx="0" fill="#ffffff" opacity="0.1" />
      {/* Warning annotation */}
      <rect x="175" y="92" width="90" height="22" rx="1" stroke="#F59E0B" strokeWidth="0.6" opacity="0.35" fill="none" />
      <rect x="185" y="99" width="4" height="4" rx="0" fill="#F59E0B" opacity="0.5" />
      <rect x="194" y="100" width="55" height="3" rx="0" fill="#ffffff" opacity="0.2" />
      {/* Pass badge */}
      <rect x="185" y="152" width="45" height="16" rx="1" stroke="#22c55e" strokeWidth="0.8" opacity="0.6" fill="none" />
      <text x="207" y="163" textAnchor="middle" fill="#22c55e" opacity="0.7" fontSize="8" fontFamily="monospace">PASS</text>
    </svg>
  );
}

function SandboxSVG() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      {/* Outer container — dashed */}
      <rect x="50" y="25" width="220" height="150" rx="1" stroke="#ffffff" strokeWidth="0.7" opacity="0.15" fill="none" strokeDasharray="5 4" />
      {/* Inner sandboxed boxes — squared */}
      <rect x="70" y="45" width="80" height="55" rx="1" stroke="#22c55e" strokeWidth="0.8" opacity="0.5" fill="none" />
      <rect x="80" y="56" width="35" height="3" rx="0" fill="#22c55e" opacity="0.35" />
      <rect x="80" y="66" width="50" height="3" rx="0" fill="#ffffff" opacity="0.15" />
      <rect x="80" y="76" width="25" height="3" rx="0" fill="#ffffff" opacity="0.1" />

      <rect x="170" y="45" width="80" height="55" rx="1" stroke="#ffffff" strokeWidth="0.7" opacity="0.2" fill="none" />
      <rect x="180" y="56" width="40" height="3" rx="0" fill="#ffffff" opacity="0.18" />
      <rect x="180" y="66" width="45" height="3" rx="0" fill="#ffffff" opacity="0.1" />
      <rect x="180" y="76" width="30" height="3" rx="0" fill="#ffffff" opacity="0.08" />

      <rect x="70" y="115" width="80" height="55" rx="1" stroke="#ffffff" strokeWidth="0.7" opacity="0.2" fill="none" />
      <rect x="80" y="126" width="32" height="3" rx="0" fill="#ffffff" opacity="0.15" />
      <rect x="80" y="136" width="48" height="3" rx="0" fill="#ffffff" opacity="0.1" />

      <rect x="170" y="115" width="80" height="55" rx="1" stroke="#ffffff" strokeWidth="0.7" opacity="0.2" fill="none" />
      <rect x="180" y="126" width="38" height="3" rx="0" fill="#ffffff" opacity="0.15" />
      <rect x="180" y="136" width="42" height="3" rx="0" fill="#ffffff" opacity="0.1" />
      {/* Lock icon — squared */}
      <rect x="148" y="88" width="24" height="20" rx="1" stroke="#22c55e" strokeWidth="0.8" opacity="0.6" fill="none" />
      <path d="M153 88 V80 A7 7 0 0 1 167 80 V88" stroke="#22c55e" strokeWidth="0.8" opacity="0.5" fill="none" />
      <rect x="158" y="94" width="4" height="6" rx="0" fill="#22c55e" opacity="0.5" />
    </svg>
  );
}

function HumanInLoopSVG() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      {/* Pipeline flow */}
      <line x1="35" y1="80" x2="285" y2="80" stroke="#ffffff" strokeWidth="0.7" opacity="0.15" />
      {/* Stages — squared */}
      {[
        { x: 55, active: true },
        { x: 115, active: true },
        { x: 175, gate: true },
        { x: 235, active: false },
      ].map((s, i) => (
        <g key={i}>
          {s.gate ? (
            <>
              <rect x={s.x - 14} y="66" width="28" height="28" rx="1" stroke="#22c55e" strokeWidth="1" opacity="0.7" fill="none" />
              {/* Checkmark */}
              <path d="M168 80 L173 85 L184 74" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              {/* Gate label */}
              <text x={s.x} y="56" textAnchor="middle" fill="#22c55e" opacity="0.5" fontSize="8" fontFamily="monospace">APPROVE</text>
            </>
          ) : (
            <>
              <rect x={s.x - 8} y="72" width="16" height="16" rx="1" stroke="#ffffff" strokeWidth="0.7" opacity={s.active ? 0.35 : 0.12} fill="none" />
              {s.active && <rect x={s.x - 3} y="77" width="6" height="6" rx="0" fill="#ffffff" opacity="0.4" />}
            </>
          )}
        </g>
      ))}
      {/* Human figure — squared style */}
      <rect x="170" y="120" width="10" height="10" rx="1" stroke="#ffffff" strokeWidth="0.7" opacity="0.3" fill="none" />
      <line x1="175" y1="130" x2="175" y2="150" stroke="#ffffff" strokeWidth="0.7" opacity="0.25" />
      <line x1="163" y1="140" x2="187" y2="140" stroke="#ffffff" strokeWidth="0.7" opacity="0.25" />
      <line x1="168" y1="150" x2="182" y2="150" stroke="#ffffff" strokeWidth="0.5" opacity="0.15" />
      {/* Connection to gate */}
      <line x1="175" y1="94" x2="175" y2="120" stroke="#ffffff" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 3" />
    </svg>
  );
}

/* ─── Feature Card Data ─── */

const FEATURES = [
  {
    title: 'Agent Teams',
    description: 'Specialized agents for code, design, QA, and product — orchestrated in parallel.',
    Illustration: AgentTeamsSVG,
  },
  {
    title: 'Tool Use',
    description: 'Native MCP protocol with 50+ integrations. GitHub, Slack, Supabase, and more.',
    Illustration: ToolUseSVG,
  },
  {
    title: 'Persistent Memory',
    description: 'Semantic recall with pgvector. Agents remember decisions and patterns across sessions.',
    Illustration: PersistentMemorySVG,
  },
  {
    title: 'Skill Library',
    description: 'Composable agent workflows. Build once, reuse across agents and projects.',
    Illustration: SkillLibrarySVG,
  },
  {
    title: 'Code Review',
    description: 'Automated SAST, security audits, and design QA before any code ships.',
    Illustration: CodeReviewSVG,
  },
  {
    title: 'Sandboxed Execution',
    description: 'Isolated environments for every agent run with full reproducibility.',
    Illustration: SandboxSVG,
  },
  {
    title: 'Night Mode',
    description: 'Deploy agents before bed. Wake to completed tasks and passing tests.',
    Illustration: NightModeSVG,
  },
  {
    title: 'Human-in-the-Loop',
    description: 'Configurable approval gates at every stage without slowing the pipeline.',
    Illustration: HumanInLoopSVG,
  },
];

/* ─── Infinite Carousel ─── */

// Triple the items for seamless looping
const LOOP_ITEMS = [...FEATURES, ...FEATURES, ...FEATURES];
const ITEM_COUNT = FEATURES.length;

export function CeluneFeatureCards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isScrolling = useRef(false);
  const [index, setIndex] = useState(0);

  // Card width = container content / 3
  const getCardWidth = useCallback(() => {
    const card = trackRef.current?.querySelector<HTMLElement>('[data-card]');
    return card?.offsetWidth ?? 400;
  }, []);

  // Get the left padding (distance from viewport edge to container content)
  const getContainerPad = useCallback(() => {
    const vw = window.innerWidth;
    const maxW = Math.min(vw, 1536);
    return Math.max(24, (vw - maxW) / 2 + 24);
  }, []);

  // Scroll to a given index (in the middle set) without animation
  const jumpTo = useCallback(
    (i: number) => {
      if (!trackRef.current) return;
      const cw = getCardWidth();
      const pad = getContainerPad();
      // Position so item[i] in middle set aligns with container left
      // Middle set starts at ITEM_COUNT cards in
      const targetScroll = (ITEM_COUNT + i) * cw - pad + cw; // +cw for the bleed card
      trackRef.current.scrollLeft = targetScroll;
    },
    [getCardWidth, getContainerPad],
  );

  // Smooth scroll by one card
  const scroll = useCallback(
    (dir: 'left' | 'right') => {
      if (!trackRef.current || isScrolling.current) return;
      isScrolling.current = true;
      const cw = getCardWidth();
      trackRef.current.scrollBy({
        left: dir === 'left' ? -cw : cw,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
      setIndex((prev) => {
        const next = dir === 'left' ? prev - 1 : prev + 1;
        return ((next % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT;
      });
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    },
    [shouldReduceMotion, getCardWidth],
  );

  // Initialize scroll position and handle loop reset
  useEffect(() => {
    jumpTo(0);

    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      if (isScrolling.current) return;
      const cw = getCardWidth();
      const totalSetWidth = ITEM_COUNT * cw;
      // If scrolled into the first or third set, silently jump to middle
      if (el.scrollLeft < totalSetWidth * 0.5) {
        el.scrollLeft += totalSetWidth;
      } else if (el.scrollLeft > totalSetWidth * 2.5) {
        el.scrollLeft -= totalSetWidth;
      }
    };

    el.addEventListener('scrollend', onScroll);
    return () => el.removeEventListener('scrollend', onScroll);
  }, [jumpTo, getCardWidth]);

  // Recalculate on resize
  useEffect(() => {
    const onResize = () => jumpTo(index);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [jumpTo, index]);

  return (
    <section id="platform" className="relative overflow-hidden py-24 md:py-32">
      <div className="container">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollTrigger.default}
          transition={{ duration: duration.slow, ease: ease.enter }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl lg:text-[2.75rem]">
              <span className="text-white">AI-First Infrastructure.</span>
              <br />
              <span className="text-neutral-500">Built for Agents, not Copilots.</span>
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => scroll('left')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-neutral-500 transition-colors hover:border-white/[0.15] hover:text-white"
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-neutral-500 transition-colors hover:border-white/[0.15] hover:text-white"
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Carousel track — full viewport width, no scrollbar */}
      <div
        ref={trackRef}
        className="scrollbar-none flex overflow-x-auto"
        style={{ scrollBehavior: 'auto' }}
      >
        {LOOP_ITEMS.map((card, i) => (
          <div
            key={`${card.title}-${i}`}
            data-card
            className="flex flex-none flex-col border border-white/[0.06] bg-transparent"
            style={{ width: `calc((min(100vw, 96rem) - 3rem) / 3)` }}
          >
            {/* Text */}
            <div className="px-6 pt-6 pb-0">
              <h3 className="font-heading text-[20px] font-medium text-white">{card.title}</h3>
              <p className="mt-2 text-[16px] leading-snug text-neutral-500">
                {card.description}
              </p>
            </div>

            {/* Illustration */}
            <div className="mt-auto h-[308px] overflow-hidden">
              <card.Illustration />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
