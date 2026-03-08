'use client';

import { motion } from 'framer-motion';
import { SectionLabel } from './grid-frame';

/* ─── Step Illustrations ─── */
/* Palette: black bg, white/green strokes, squared corners */

function WorkspaceSVG() {
  return (
    <svg viewBox="0 0 340 200" fill="none" className="h-full w-full">
      {/* Browser chrome */}
      <rect x="30" y="20" width="280" height="160" rx="1" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" fill="none" />
      <rect x="30" y="20" width="280" height="24" fill="#111111" />
      <line x1="30" y1="44" x2="310" y2="44" stroke="#ffffff" strokeWidth="0.5" opacity="0.12" />
      {/* Window dots */}
      <circle cx="46" cy="32" r="2.5" fill="#ffffff" opacity="0.25" />
      <circle cx="57" cy="32" r="2.5" fill="#ffffff" opacity="0.18" />
      <circle cx="68" cy="32" r="2.5" fill="#ffffff" opacity="0.12" />
      {/* URL bar */}
      <rect x="90" y="26" width="155" height="12" rx="1" stroke="#ffffff" strokeWidth="0.5" opacity="0.12" fill="none" />
      <text x="167" y="35" textAnchor="middle" fill="#ffffff" opacity="0.2" fontSize="7" fontFamily="monospace">app.celune.ai/workspace</text>
      {/* Workspace panel */}
      <rect x="42" y="56" width="90" height="114" rx="1" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" fill="#0a0a0a" />
      {/* Sidebar items */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="52" y={68 + i * 22} width="6" height="6" rx="0" fill={i === 0 ? '#22c55e' : '#ffffff'} opacity={i === 0 ? 0.7 : 0.2} />
          <rect x="64" y={69 + i * 22} width={i === 0 ? 52 : 40 - i * 4} height="4" rx="0" fill={i === 0 ? '#ffffff' : '#ffffff'} opacity={i === 0 ? 0.35 : 0.12} />
        </g>
      ))}
      {/* Main content area */}
      <rect x="142" y="56" width="158" height="114" rx="1" fill="none" />
      {/* Welcome card */}
      <rect x="150" y="64" width="142" height="48" rx="1" stroke="#22c55e" strokeWidth="0.8" opacity="0.4" fill="none" />
      <rect x="160" y="73" width="80" height="5" rx="0" fill="#ffffff" opacity="0.3" />
      <rect x="160" y="84" width="110" height="3" rx="0" fill="#ffffff" opacity="0.15" />
      <rect x="160" y="92" width="90" height="3" rx="0" fill="#ffffff" opacity="0.1" />
      {/* Agent roster */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={150 + i * 50} y="124" width="40" height="36" rx="1" stroke="#ffffff" strokeWidth="0.5" opacity="0.18" fill="none" />
          <rect x={158 + i * 50} y="131" width="12" height="12" rx="0" fill={i === 0 ? '#22c55e' : '#ffffff'} opacity={i === 0 ? 0.45 : 0.12} />
          <rect x={157 + i * 50} y="147" width="24" height="3" rx="0" fill="#ffffff" opacity="0.18" />
          <rect x={160 + i * 50} y="152" width="16" height="2" rx="0" fill="#ffffff" opacity="0.1" />
        </g>
      ))}
    </svg>
  );
}

function AgentsBuildingSVG() {
  return (
    <svg viewBox="0 0 340 200" fill="none" className="h-full w-full">
      {/* Central task board */}
      <rect x="100" y="30" width="140" height="140" rx="1" stroke="#ffffff" strokeWidth="0.7" opacity="0.15" fill="none" />
      <rect x="100" y="30" width="140" height="22" fill="#111111" />
      <line x1="100" y1="52" x2="240" y2="52" stroke="#ffffff" strokeWidth="0.5" opacity="0.12" />
      <text x="170" y="44" textAnchor="middle" fill="#ffffff" opacity="0.25" fontSize="8" fontFamily="monospace">Sprint 1 — Active</text>
      {/* Task rows */}
      {[
        { label: 'DB schema + migrations', agent: 'RICK', done: true },
        { label: 'Auth middleware', agent: 'RICK', done: true },
        { label: 'API routes + validation', agent: 'RICK', done: false },
        { label: 'Login UI components', agent: 'NOIR', done: false },
        { label: 'Code review + audit', agent: 'SCAN', done: false },
      ].map((task, i) => (
        <g key={i}>
          <rect x="110" y={60 + i * 21} width={task.done ? 6 : 6} height="6" rx="0"
            fill={task.done ? '#22c55e' : 'none'}
            stroke={task.done ? '#22c55e' : '#ffffff'}
            strokeWidth="0.7"
            opacity={task.done ? 0.7 : 0.25} />
          <rect x="122" y={61 + i * 21} width={task.done ? 88 : 75} height="3" rx="0"
            fill="#ffffff" opacity={task.done ? 0.25 : 0.15} />
          <rect x="220" y={59 + i * 21} width="14" height="8" rx="0"
            stroke={task.agent === 'SCAN' ? '#F59E0B' : task.agent === 'NOIR' ? '#818cf8' : '#22c55e'}
            strokeWidth="0.6"
            opacity={0.5}
            fill="none" />
          <text x="227" y={65 + i * 21} textAnchor="middle"
            fill={task.agent === 'SCAN' ? '#F59E0B' : task.agent === 'NOIR' ? '#818cf8' : '#22c55e'}
            opacity="0.6" fontSize="5" fontFamily="monospace">{task.agent.slice(0, 4)}</text>
        </g>
      ))}
      {/* Left agent bubble */}
      <rect x="28" y="72" width="56" height="36" rx="1" stroke="#22c55e" strokeWidth="0.7" opacity="0.5" fill="none" />
      <rect x="36" y="80" width="10" height="10" rx="0" fill="#22c55e" opacity="0.4" />
      <rect x="50" y="81" width="26" height="3" rx="0" fill="#ffffff" opacity="0.25" />
      <rect x="50" y="87" width="18" height="2" rx="0" fill="#ffffff" opacity="0.15" />
      <rect x="36" y="95" width="34" height="7" rx="0" stroke="#22c55e" strokeWidth="0.5" opacity="0.4" fill="none" />
      <text x="53" y="100" textAnchor="middle" fill="#22c55e" opacity="0.5" fontSize="6" fontFamily="monospace">RICK</text>
      <line x1="84" y1="90" x2="100" y2="90" stroke="#22c55e" strokeWidth="0.6" opacity="0.3" strokeDasharray="3 2" />
      {/* Right agent bubble */}
      <rect x="256" y="95" width="56" height="36" rx="1" stroke="#818cf8" strokeWidth="0.7" opacity="0.4" fill="none" />
      <rect x="264" y="103" width="10" height="10" rx="0" fill="#818cf8" opacity="0.3" />
      <rect x="278" y="104" width="26" height="3" rx="0" fill="#ffffff" opacity="0.2" />
      <rect x="278" y="110" width="18" height="2" rx="0" fill="#ffffff" opacity="0.12" />
      <rect x="264" y="118" width="34" height="7" rx="0" stroke="#818cf8" strokeWidth="0.5" opacity="0.35" fill="none" />
      <text x="281" y="123" textAnchor="middle" fill="#818cf8" opacity="0.45" fontSize="6" fontFamily="monospace">NOIR</text>
      <line x1="240" y1="113" x2="256" y2="113" stroke="#818cf8" strokeWidth="0.6" opacity="0.25" strokeDasharray="3 2" />
      {/* Progress bar */}
      <rect x="110" y="162" width="120" height="4" rx="0" fill="#ffffff" opacity="0.08" />
      <rect x="110" y="162" width="48" height="4" rx="0" fill="#22c55e" opacity="0.5" />
      <text x="238" y="166" fill="#ffffff" opacity="0.3" fontSize="7" fontFamily="monospace">40%</text>
    </svg>
  );
}

function ReviewShipSVG() {
  return (
    <svg viewBox="0 0 340 200" fill="none" className="h-full w-full">
      {/* PR card */}
      <rect x="38" y="22" width="175" height="120" rx="1" stroke="#ffffff" strokeWidth="0.7" opacity="0.18" fill="none" />
      <rect x="38" y="22" width="175" height="22" fill="#111111" />
      <line x1="38" y1="44" x2="213" y2="44" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
      <text x="58" y="36" fill="#ffffff" opacity="0.25" fontSize="7" fontFamily="monospace">Pull Request #47</text>
      {/* PR title */}
      <rect x="48" y="52" width="130" height="5" rx="0" fill="#ffffff" opacity="0.25" />
      <rect x="48" y="62" width="100" height="3" rx="0" fill="#ffffff" opacity="0.13" />
      {/* Diff lines */}
      <rect x="38" y="74" width="175" height="12" fill="#22c55e" fillOpacity="0.04" />
      <text x="50" y="82" fill="#22c55e" opacity="0.45" fontSize="7" fontFamily="monospace">+</text>
      <rect x="62" y="78" width="110" height="3" rx="0" fill="#22c55e" opacity="0.3" />
      <rect x="38" y="86" width="175" height="12" fill="#22c55e" fillOpacity="0.04" />
      <text x="50" y="94" fill="#22c55e" opacity="0.45" fontSize="7" fontFamily="monospace">+</text>
      <rect x="62" y="90" width="80" height="3" rx="0" fill="#22c55e" opacity="0.25" />
      <rect x="48" y="104" width="100" height="3" rx="0" fill="#ffffff" opacity="0.1" />
      <rect x="48" y="112" width="75" height="3" rx="0" fill="#ffffff" opacity="0.08" />
      {/* SCAN review badge */}
      <rect x="48" y="122" width="55" height="14" rx="1" stroke="#22c55e" strokeWidth="0.7" opacity="0.6" fill="none" />
      <rect x="56" y="127" width="5" height="5" rx="0" fill="#22c55e" opacity="0.6" />
      <text x="65" y="132" fill="#22c55e" opacity="0.6" fontSize="6" fontFamily="monospace">SCAN</text>
      <rect x="112" y="122" width="38" height="14" rx="1" stroke="#22c55e" strokeWidth="0.6" opacity="0.5" fill="none" />
      <text x="131" y="132" textAnchor="middle" fill="#22c55e" opacity="0.5" fontSize="6" fontFamily="monospace">PASS</text>
      {/* Merge button */}
      <rect x="48" y="144" width="155" height="18" rx="1" fill="#22c55e" opacity="0.15" />
      <rect x="48" y="144" width="155" height="18" rx="1" stroke="#22c55e" strokeWidth="0.7" opacity="0.5" fill="none" />
      <text x="125" y="156" textAnchor="middle" fill="#22c55e" opacity="0.7" fontSize="8" fontFamily="monospace">Merge &amp; Ship</text>
      {/* Right panel — retro */}
      <rect x="227" y="22" width="98" height="60" rx="1" stroke="#ffffff" strokeWidth="0.6" opacity="0.15" fill="none" />
      <text x="276" y="36" textAnchor="middle" fill="#ffffff" opacity="0.2" fontSize="7" fontFamily="monospace">Retro</text>
      <line x1="227" y1="44" x2="325" y2="44" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />
      {[
        { w: 70, green: true },
        { w: 55, green: false },
        { w: 60, green: false },
      ].map((r, i) => (
        <g key={i}>
          <rect x="237" y={50 + i * 10} width={r.w} height="3" rx="0"
            fill={r.green ? '#22c55e' : '#ffffff'} opacity={r.green ? 0.3 : 0.12} />
        </g>
      ))}
      {/* Right panel — deploy */}
      <rect x="227" y="96" width="98" height="46" rx="1" stroke="#22c55e" strokeWidth="0.7" opacity="0.35" fill="none" />
      <text x="276" y="110" textAnchor="middle" fill="#22c55e" opacity="0.4" fontSize="7" fontFamily="monospace">Deployed</text>
      <line x1="227" y1="116" x2="325" y2="116" stroke="#22c55e" strokeWidth="0.4" opacity="0.2" />
      {/* Checkmarks */}
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x="237" y={122 + i * 12} width="5" height="5" rx="0" fill="#22c55e" opacity="0.55" />
          <rect x="247" y={124 + i * 12} width={i === 0 ? 60 : 45} height="3" rx="0" fill="#ffffff" opacity="0.2" />
        </g>
      ))}
    </svg>
  );
}

/* ─── Step Data ─── */

const STEPS = [
  {
    number: '01',
    title: 'Sign up and meet your Agent Lead',
    description:
      'Create your workspace in seconds. Your Agent Lead introduces themselves, walks you through setup, and is ready to take your first project brief.',
    Illustration: WorkspaceSVG,
  },
  {
    number: '02',
    title: 'Describe what you want built',
    description:
      'Tell your agents what you need — a feature, a product, a fix. They create a PRD, break it into sprints, and self-assign tasks based on their specialization. You stay in the loop, not in the weeds.',
    Illustration: AgentsBuildingSVG,
  },
  {
    number: '03',
    title: 'Review, approve, and ship',
    description:
      'Agents open pull requests, run automated code review, and flag anything that needs your eyes. You approve what matters. Everything else ships automatically.',
    Illustration: ReviewShipSVG,
  },
];

export function CeluneHowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="dot-grid-bg absolute inset-0 opacity-50" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <SectionLabel>How it works</SectionLabel>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
            From idea to shipped product in three steps
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Describe it. Delegate it. Ship it.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl space-y-16 md:space-y-24">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid gap-8 md:grid-cols-2 md:items-center"
            >
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-celune-500/20 bg-celune-500/[0.06] px-3 py-1">
                  <span className="font-mono text-xs font-medium text-celune-400">Step {step.number}</span>
                </div>
                <h3 className="mt-2 font-heading text-2xl font-medium text-white">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-neutral-400">{step.description}</p>
              </div>

              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-sm">
                  <div className="h-[200px]">
                    <step.Illustration />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
