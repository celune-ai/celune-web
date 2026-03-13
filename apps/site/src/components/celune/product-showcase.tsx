'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { SectionLabel } from './grid-frame';
import { LightRays } from './light-rays';

/* ─── Cycling words, one per agent ─── */

const CYCLE_WORDS = [
  { word: 'Shipping', agent: 'RICK', color: '#22c55e' },
  { word: 'Planning', agent: 'SAGE', color: '#a78bfa' },
  { word: 'Designing', agent: 'NOIR', color: '#f472b6' },
  { word: 'Scanning', agent: 'SCAN', color: '#60a5fa' },
  { word: 'Researching', agent: 'DELV', color: '#fbbf24' },
  { word: 'Deploying', agent: 'FLOW', color: '#34d399' },
  { word: 'Organizing', agent: 'ATLAS', color: '#f97316' },
];

/* ─── Agent avatar helper ─── */

function AgentAvatar({ name, className = 'h-8 w-8' }: { name: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06] text-[10px] font-bold tracking-wide text-neutral-400',
        className
      )}
    >
      {name.slice(0, 2)}
    </div>
  );
}

/* ─── Task pipeline ─── */

interface Task {
  id: string;
  title: string;
  agent: string;
  tags: { label: string }[];
  priority?: string;
}

const ALL_TASKS: Task[] = [
  { id: 'CEL-301', title: 'Create PRD', agent: 'SAGE', tags: [{ label: 'Planning' }] },
  { id: 'CEL-302', title: 'Design system tokens', agent: 'NOIR', tags: [{ label: 'Design' }] },
  { id: 'CEL-303', title: 'Database schema', agent: 'RICK', tags: [{ label: 'Backend' }], priority: '!!' },
  { id: 'CEL-304', title: 'API endpoints', agent: 'RICK', tags: [{ label: 'Backend' }] },
  { id: 'CEL-305', title: 'Chart components', agent: 'NOIR', tags: [{ label: 'Frontend' }] },
  { id: 'CEL-306', title: 'Dashboard layout', agent: 'NOIR', tags: [{ label: 'Design' }] },
  { id: 'CEL-307', title: 'Auth middleware', agent: 'RICK', tags: [{ label: 'Backend' }], priority: '!!' },
  { id: 'CEL-308', title: 'E2E test suite', agent: 'SCAN', tags: [{ label: 'Testing' }] },
  { id: 'CEL-309', title: 'Security audit', agent: 'SCAN', tags: [{ label: 'Security' }] },
];

type BoardState = { todo: number[]; inProgress: number[]; done: number[] };

const STEPS: BoardState[] = [
  { todo: [0, 1, 2, 3, 4, 5, 6, 7, 8], inProgress: [], done: [] },
  { todo: [1, 2, 3, 4, 5, 6, 7, 8], inProgress: [0], done: [] },
  { todo: [2, 3, 4, 5, 6, 7, 8], inProgress: [1], done: [0] },
  { todo: [4, 5, 6, 7, 8], inProgress: [2, 3], done: [0, 1] },
  { todo: [6, 7, 8], inProgress: [4, 5], done: [0, 1, 2, 3] },
  { todo: [7, 8], inProgress: [6], done: [0, 1, 2, 3, 4, 5] },
  { todo: [], inProgress: [7, 8], done: [0, 1, 2, 3, 4, 5, 6] },
  { todo: [], inProgress: [7, 8], done: [0, 1, 2, 3, 4, 5, 6] },
];

const STEP_DURATION = 3000; // 3s per step ≈ 24s cycle

/* ─── Thread messages ─── */

const THREAD_MESSAGES = [
  {
    agent: 'SAGE',
    time: '2:14 PM',
    text: 'PRD drafted for the analytics dashboard. 8 tasks across 2 sprints — want me to break down the data layer first?',
  },
  {
    agent: 'RICK',
    time: '2:14 PM',
    text: 'Already on it. Schema migrations are running. I\'ll have the time-series endpoints ready in ~20 min.',
  },
  {
    agent: 'NOIR',
    time: '2:15 PM',
    text: 'I\'ll start on the chart components while Rick builds the API. Using recharts with our design tokens.',
  },
  {
    agent: 'SCAN',
    time: '2:15 PM',
    text: 'I\'ll queue up the security review once Sprint 1 lands. Rate limiting on the new endpoints is on my list.',
  },
];

/* ─── Sub-components ─── */

function TaskCard({ task, isActive, isDone }: { task: Task; isActive: boolean; isDone: boolean }) {
  return (
    <div
      className={cn(
        'relative rounded-lg border p-3 transition-all duration-700',
        isActive
          ? 'border-celune-500/30 bg-celune-500/[0.03] shadow-[0_0_12px_-4px_rgba(34,197,94,0.15)]'
          : 'border-white/[0.06] bg-white/[0.02]',
        isDone && 'opacity-50'
      )}
    >
      {isActive && (
        <div className="pointer-events-none absolute inset-0 rounded-lg border border-celune-500/20 animate-pulse" />
      )}
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="font-mono text-[10px] text-neutral-600">{task.id}</span>
        <AgentAvatar name={task.agent} className="h-5 w-5 text-[7px]" />
      </div>
      <p className="mb-2.5 flex items-center gap-1.5 text-[13px] leading-snug text-neutral-300">
        {isDone && (
          <svg className="h-3.5 w-3.5 shrink-0 text-celune-500" viewBox="0 0 16 16" fill="none">
            <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {task.title}
      </p>
      <div className="flex items-center gap-1.5">
        {task.priority && (
          <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-neutral-400">
            {task.priority}
          </span>
        )}
        {task.tags.map((tag) => (
          <span
            key={tag.label}
            className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-neutral-500"
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function KanbanColumn({
  title,
  icon,
  taskIndices,
  isActiveColumn,
  isDoneColumn,
}: {
  title: string;
  icon: string;
  taskIndices: number[];
  isActiveColumn: boolean;
  isDoneColumn?: boolean;
}) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs text-neutral-600">{icon}</span>
        <span className="text-[13px] font-medium text-neutral-400">{title}</span>
        <span className="rounded-full bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-neutral-600">
          {taskIndices.length}
        </span>
      </div>
      <div className="space-y-2">
        {taskIndices.map((idx) => (
          <motion.div
            key={ALL_TASKS[idx].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          >
            <TaskCard task={ALL_TASKS[idx]} isActive={isActiveColumn} isDone={!!isDoneColumn} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export function ProductShowcase() {
  const [step, setStep] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLE_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const board = STEPS[step];
  const current = CYCLE_WORDS[wordIndex];

  return (
    <section className="relative overflow-hidden">
      {/* Light rays — inside page rails (mx-12), flush to top divider */}
      <div className="pointer-events-none absolute left-12 right-12 z-0 overflow-hidden" style={{ top: -1, bottom: '40%' }}>
        <LightRays
          raysOrigin="bottom-center"
          raysColor="#00ff87"
          raysSpeed={0.3}
          lightSpread={1.8}
          rayLength={2}
          pulsating={false}
          fadeDistance={1.4}
          saturation={2}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.5}
          distortion={0}
        />
      </div>

      <div className="container relative z-[1]" style={{ paddingTop: 'calc(6rem + 80px)', paddingBottom: '8rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 text-center" style={{ maxWidth: '46.25rem' }}
        >
          <SectionLabel>The experience</SectionLabel>
          <h2 className="font-heading text-3xl font-medium tracking-tight whitespace-nowrap text-white md:text-4xl lg:text-5xl">
            A team that never stops{' '}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.word}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
                  className="inline-block"
                  style={{ color: current.color }}
                >
                  {current.word}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            You and your Lead agent will plan your projects, deploying a coordinated effort with your agent team to research, develop, review code, design, and debate the process in retros. This cycle ensures quality, consistency, and an ever growing and learning team of Agents.
          </p>
        </motion.div>

        {/* Wrapper for light rays + product mock */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
          className="relative"
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#08080A] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#08080A] to-transparent" />

          {/* Product mock container — full width */}
          <div className="relative z-[1] flex gap-4 bg-[#0C0C0F] p-4 shadow-[0_48px_100px_-16px_rgba(0,0,0,0.6)]">
            {/* Left: Agent thread */}
            <div className="w-[380px] shrink-0 rounded-xl border border-white/[0.06] bg-[#0a0a0d]">
              {/* Thread header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <span className="text-[13px] font-medium text-neutral-400">
                  Thread in <span className="text-neutral-300">#analytics-dashboard</span>
                </span>
                <span className="text-neutral-700">...</span>
              </div>

              {/* Messages */}
              <div className="space-y-5 p-4">
                {THREAD_MESSAGES.map((msg, i) => (
                  <div key={i} className="flex gap-3">
                    <AgentAvatar name={msg.agent} />
                    <div className="min-w-0">
                      <div className="mb-1 flex items-baseline gap-2">
                        <span className="text-[13px] font-semibold text-neutral-300">{msg.agent}</span>
                        <span className="text-[11px] text-neutral-700">{msg.time}</span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-neutral-500">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compose bar */}
              <div className="border-t border-white/[0.06] p-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                  <p className="text-[13px] text-neutral-600">
                    <span className="rounded bg-white/[0.06] px-1 text-neutral-400">@RICK</span>
                    {' '}assign the caching layer to Sprint 2
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <span className="text-sm">+</span>
                    <span className="text-xs font-bold">Aa</span>
                    <span className="text-sm">@</span>
                  </div>
                  <div className="flex h-7 items-center gap-0.5 rounded-md bg-neutral-700 pl-2.5 pr-1.5">
                    <span className="text-xs font-medium text-neutral-300">Send</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Animated Kanban board */}
            <div className="flex min-w-0 flex-1 gap-3 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a0d] p-4" style={{ height: 600 }}>
              <KanbanColumn title="Todo" icon="○" taskIndices={board.todo} isActiveColumn={false} />
              <KanbanColumn title="In Progress" icon="◑" taskIndices={board.inProgress} isActiveColumn={board.inProgress.length > 0} />
              <KanbanColumn title="Done" icon="●" taskIndices={board.done} isActiveColumn={false} isDoneColumn />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
