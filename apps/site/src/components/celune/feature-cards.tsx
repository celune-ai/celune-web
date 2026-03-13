'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/* ─── Shared mini avatar for card illustrations ─── */

function CardAvatar({ name, color, size = 'sm' }: { name: string; color: string; size?: 'sm' | 'xs' }) {
  const s = size === 'xs' ? 'h-5 w-5 text-[7px]' : 'h-6 w-6 text-[8px]';
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border font-bold tracking-wide ${s}`}
      style={{ borderColor: `${color}40`, backgroundColor: `${color}15`, color }}
    >
      {name.slice(0, 2)}
    </div>
  );
}

/* ─── Dashboard-style Card Illustrations ─── */

function AgentTeamsIllustration() {
  const agents = [
    { id: 'RICK', role: 'Lead', color: '#22c55e' },
    { id: 'SAGE', role: 'Product', color: '#a78bfa' },
    { id: 'NOIR', role: 'Design', color: '#f472b6' },
    { id: 'SCAN', role: 'QA', color: '#60a5fa' },
    { id: 'DELV', role: 'Research', color: '#fbbf24' },
    { id: 'BOLT', role: 'DevOps', color: '#f97316' },
    { id: 'ARIA', role: 'Analytics', color: '#06b6d4' },
    { id: 'FLUX', role: 'Backend', color: '#8b5cf6' },
  ];
  return (
    <div className="flex h-full flex-col gap-2 px-5 pt-5">
      {agents.map((a, i) => (
        <div
          key={a.id}
          className="flex items-center gap-2.5 rounded-lg border px-2.5 py-2"
          style={{
            borderColor: i === 0 ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.06)',
            backgroundColor: i === 0 ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.02)',
          }}
        >
          <CardAvatar name={a.id} color={a.color} />
          <span className="text-[11px] font-semibold" style={{ color: i === 0 ? a.color : 'rgba(255,255,255,0.5)' }}>{a.id}</span>
          <span className="text-[10px] text-neutral-600">{a.role}</span>
          <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ backgroundColor: a.color }} />
        </div>
      ))}
    </div>
  );
}

function ToolUseIllustration() {
  const tools = [
    { name: 'GitHub', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
    )},
    { name: 'Slack', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.163 0a2.528 2.528 0 012.523 2.522v6.312zM15.163 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.163 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 01-2.52-2.523 2.527 2.527 0 012.52-2.52h6.315A2.528 2.528 0 0124 15.163a2.528 2.528 0 01-2.522 2.523h-6.315z"/></svg>
    )},
    { name: 'Supabase', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.7 21.8c-.4.5-1.3.2-1.3-.5V13h8.3c.8 0 1.3.9.7 1.5l-7.7 7.3zM10.3 2.2c.4-.5 1.3-.2 1.3.5V11H3.3c-.8 0-1.3-.9-.7-1.5l7.7-7.3z"/></svg>
    )},
    { name: 'Figma', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 13.01h-4.588c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zm-4.588-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019h3.117V13.01h-3.117zm4.588-5.51h-4.588c-2.476 0-4.49-2.014-4.49-4.49S5.671 0 8.147 0h4.588v7.51zm-4.588-6.04c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019h3.117V1.47h-3.117zM8.147 15.989c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.51c-1.665 0-3.019 1.354-3.019 3.02s1.354 3.019 3.019 3.019 3.019-1.354 3.019-3.02-1.354-3.019-3.019-3.019z"/></svg>
    )},
    { name: 'Linear', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2.886 10.32a10.18 10.18 0 001.67 4.128l6.272-6.272H4.056a10.13 10.13 0 00-1.17 2.144zm.603-3.258h9.449L3.49 16.51A10.2 10.2 0 012 12c0-1.758.447-3.413 1.233-4.859l.256-.079zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.954 9.954 0 01-6.294-2.236l12.058-12.058A9.953 9.953 0 0112 2z"/></svg>
    )},
    { name: 'Vercel', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L24 22H0L12 1z"/></svg>
    )},
    { name: 'Sentry', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.91 2.505c-.873-1.448-2.972-1.448-3.844 0L6.572 8.17a2.238 2.238 0 00-.382-.034h-.03c-.094 0-.186.006-.278.016L9.91 2.505c.577-.96 2.012-.96 2.59 0l3.012 5.005a7.342 7.342 0 00-1.293.793L11.205 3.16a.224.224 0 00-.386 0L4.266 14.745a.225.225 0 00.193.338h1.357a7.225 7.225 0 00-.242 1.847H4.459c-1.104 0-1.793-1.19-1.238-2.14L6.92 8.173c-.157.012-.312.03-.465.054L3.22 14.79c-.555.95.134 2.14 1.238 2.14h1.15a7.3 7.3 0 005.2 4.578l.36.07-.747-1.282a5.965 5.965 0 01-3.4-3.366h3.4l.8 1.372.8-1.372h2.26c.066-.248.119-.5.157-.757H12.88l2.36 4.043c.578.96 2.013.96 2.59 0l3.95-6.56c.555-.95-.134-2.14-1.238-2.14h-4.088l-.8 1.372h4.888a.225.225 0 01.193.338l-3.95 6.56a.224.224 0 01-.386 0L13.91 2.505z"/></svg>
    )},
    { name: 'Notion', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.29 2.17c-.466-.373-.84-.186-1.633-.14L3.667 2.96c-.466.047-.56.28-.373.466l1.165.782zm.793 3.36v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.166V6.63c0-.606-.233-.933-.746-.886l-15.177.886c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.886l-.7.14v10.264c-.607.327-1.166.514-1.633.514-.746 0-.933-.234-1.493-.934l-4.571-7.186v6.953l1.446.327s0 .84-1.166.84l-3.22.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.62c-.093-.42.14-1.026.793-1.073l3.453-.233 4.757 7.28v-6.44l-1.213-.14c-.093-.514.28-.886.747-.933l3.227-.186z"/></svg>
    )},
    { name: 'Stripe', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
    )},
    { name: 'Resend', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4h14v2H4v12h12v-5h2v7H2V4zm18 0h2v8h-2V6.414l-8.293 8.293-1.414-1.414L18.586 5H14V4h6z"/></svg>
    )},
    { name: 'Postgres', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
    )},
    { name: 'Redis', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    )},
  ];
  return (
    <div className="flex h-full flex-col px-5 pt-5">
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2.5 mb-4">
        <span className="font-mono text-[9px] tracking-wider text-neutral-600 uppercase">MCP Integrations</span>
        <span className="ml-auto rounded bg-celune-500/15 px-1.5 py-0.5 text-[9px] font-medium text-celune-400">50+</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {tools.map((t) => (
          <div
            key={t.name}
            className="flex flex-col items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-3"
          >
            <div className="text-neutral-500">{t.icon}</div>
            <span className="text-[10px] text-neutral-500">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PersistentMemoryIllustration() {
  const memories = [
    { type: 'Decision', text: 'Use SSE over WebSockets for dashboard', time: '2m ago', active: true },
    { type: 'Pattern', text: 'Team prefers Zod for validation schemas', time: '1h ago', active: false },
    { type: 'Context', text: 'Auth system uses JWT with refresh tokens', time: '3h ago', active: false },
    { type: 'Feedback', text: 'Keep PR descriptions under 3 paragraphs', time: '1d ago', active: false },
    { type: 'Decision', text: 'Rate limit auth endpoints at 100 req/min', time: '2d ago', active: false },
    { type: 'Pattern', text: 'Use server actions for form mutations', time: '3d ago', active: false },
    { type: 'Context', text: 'Staging deploys to preview.celune.ai', time: '4d ago', active: false },
    { type: 'Feedback', text: 'Always add migration rollback scripts', time: '5d ago', active: false },
  ];
  return (
    <div className="flex h-full flex-col gap-2 px-5 pt-5">
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
        <span className="font-mono text-[9px] tracking-wider text-neutral-600 uppercase">Memory Store</span>
        <span className="ml-auto text-[9px] text-neutral-700">pgvector</span>
      </div>
      {memories.map((m) => (
        <div
          key={m.text}
          className="rounded-lg border px-2.5 py-2"
          style={{
            borderColor: m.active ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.06)',
            backgroundColor: m.active ? 'rgba(34,197,94,0.03)' : 'rgba(255,255,255,0.02)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="rounded bg-white/[0.06] px-1 py-0.5 text-[8px] font-medium text-neutral-500">{m.type}</span>
            <span className="ml-auto text-[9px] text-neutral-700">{m.time}</span>
          </div>
          <p className="mt-1 text-[10px] leading-relaxed text-neutral-500">{m.text}</p>
        </div>
      ))}
    </div>
  );
}

function SkillIcon({ d }: { d: string }) {
  return (
    <svg className="h-4 w-4 text-neutral-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function SkillLibraryIllustration() {
  const skills = [
    { name: '/build', icon: 'M5 4L2 8l3 4M11 4l3 4-3 4M9 3L7 13' },
    { name: '/deploy', icon: 'M8 12V4m0 0L5 7m3-3l3 3M3 14h10' },
    { name: '/research', icon: 'M10.5 10.5L14 14M6.5 11a4.5 4.5 0 110-9 4.5 4.5 0 010 9z' },
    { name: '/security', icon: 'M8 1L3 4v4c0 3.5 2.1 6.4 5 7.5 2.9-1.1 5-4 5-7.5V4L8 1z' },
    { name: '/project', icon: 'M3 3h10v10H3zM3 6h10M6 6v7' },
    { name: '/task', icon: 'M3 8l3 3 7-7' },
    { name: '/afk-build', icon: 'M2 13h12M5 9V5a3 3 0 016 0v4M4 9h8v4H4z' },
    { name: '/review', icon: 'M1 3h14M1 7h14M1 11h8' },
    { name: '/plan', icon: 'M4 2v2M8 2v2M12 2v2M2 6h12v8H2zM2 9h12' },
    { name: '/slack', icon: 'M5 10V8a1 1 0 112 0v2a1 1 0 01-2 0zM9 6V8a1 1 0 102 0V6a1 1 0 00-2 0zM6 5H8a1 1 0 100-2H6a1 1 0 000 2zM10 11H8a1 1 0 100 2h2a1 1 0 000-2z' },
    { name: '/blogging', icon: 'M2 2h12v12H2zM5 5h6M5 8h6M5 11h3' },
    { name: '/flush', icon: 'M4 2v4l4 2-4 2v4M12 2v12' },
  ];
  return (
    <div className="flex h-full flex-col px-5 pt-5">
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2.5 mb-4">
        <span className="font-mono text-[9px] tracking-wider text-neutral-600 uppercase">Skill Library</span>
        <span className="ml-auto rounded bg-celune-500/15 px-1.5 py-0.5 text-[9px] font-medium text-celune-400">24+</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {skills.map((s) => (
          <div
            key={s.name}
            className="flex flex-col items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-3"
          >
            <SkillIcon d={s.icon} />
            <span className="font-mono text-[10px] text-neutral-500">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NightModeIllustration() {
  const tasks = [
    { label: 'Migrate user schema', status: 'done' },
    { label: 'Build notification endpoints', status: 'done' },
    { label: 'E2E test suite for auth', status: 'done' },
    { label: 'Refactor token refresh logic', status: 'running' },
    { label: 'Update API documentation', status: 'queued' },
    { label: 'Add webhook retry logic', status: 'queued' },
    { label: 'Set up error monitoring alerts', status: 'queued' },
    { label: 'Write integration test for billing', status: 'queued' },
    { label: 'Optimize database query performance', status: 'queued' },
  ];
  return (
    <div className="flex h-full flex-col gap-2 px-5 pt-5">
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
        <span className="font-mono text-[9px] tracking-wider text-neutral-600 uppercase">Overnight Run</span>
        <span className="ml-auto text-[9px] text-neutral-600">10:42 PM — 6:15 AM</span>
      </div>
      {tasks.map((t) => (
        <div
          key={t.label}
          className="flex items-center gap-2 rounded-lg border px-2.5 py-2"
          style={{
            borderColor: t.status === 'done' ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.06)',
            backgroundColor: t.status === 'done' ? 'rgba(34,197,94,0.03)' : 'rgba(255,255,255,0.02)',
          }}
        >
          {t.status === 'done' ? (
            <svg className="h-3.5 w-3.5 shrink-0 text-celune-500" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : t.status === 'running' ? (
            <svg className="h-3.5 w-3.5 shrink-0 text-neutral-500" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" opacity={0.25} />
              <path d="M6 1.5 A4.5 4.5 0 0 1 10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/[0.1]" />
          )}
          <span className="text-[11px]" style={{ color: t.status === 'done' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)' }}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

function CodeReviewIllustration() {
  const lines = [
    { type: 'context', text: 'async function refreshToken(userId)' },
    { type: 'add', text: '  const token = await jwt.sign({ sub: userId })' },
    { type: 'add', text: '  await cache.set(`token:${userId}`, token)' },
    { type: 'context', text: '  return { accessToken: token }' },
  ];
  return (
    <div className="flex h-full flex-col gap-2 px-5 pt-5">
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
        <CardAvatar name="SCAN" color="#60a5fa" size="xs" />
        <span className="font-mono text-[9px] tracking-wider text-neutral-600 uppercase">Code Review</span>
        <span className="ml-auto rounded bg-celune-500/15 px-1.5 py-0.5 text-[9px] font-medium text-celune-400">1164/1164 Passed</span>
      </div>
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-2 py-0.5" style={{ backgroundColor: l.type === 'add' ? 'rgba(34,197,94,0.04)' : 'transparent' }}>
            <span className="w-3 text-right font-mono text-[9px]" style={{ color: l.type === 'add' ? '#22c55e' : 'transparent' }}>+</span>
            <span className="font-mono text-[9px]" style={{ color: l.type === 'add' ? 'rgba(34,197,94,0.7)' : 'rgba(255,255,255,0.25)' }}>{l.text}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <span className="font-mono text-[9px] tracking-wider text-neutral-600 uppercase">Tasks Created</span>
        {[
          'Add token expiry validation',
          'Write refresh token E2E tests',
          'Update auth middleware docs',
          'Add rate limiting to /refresh',
          'Cache token validation results',
          'Add session revocation endpoint',
          'Log auth failures to Sentry',
        ].map((task) => (
          <div key={task} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/[0.1]" />
            <span className="text-[10px] text-neutral-500">{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SandboxIllustration() {
  const envs = [
    { name: 'RICK-auth-api', status: 'active', color: '#22c55e' },
    { name: 'NOIR-login-ui', status: 'active', color: '#f472b6' },
    { name: 'SCAN-e2e-tests', status: 'idle', color: '#60a5fa' },
    { name: 'SAGE-prd-draft', status: 'active', color: '#a78bfa' },
    { name: 'DELV-api-research', status: 'idle', color: '#fbbf24' },
    { name: 'BOLT-ci-pipeline', status: 'active', color: '#f97316' },
    { name: 'ARIA-metrics-dash', status: 'idle', color: '#06b6d4' },
  ];
  return (
    <div className="flex h-full flex-col gap-2 px-5 pt-5">
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
        <span className="font-mono text-[9px] tracking-wider text-neutral-600 uppercase">Sandboxes</span>
        <span className="ml-auto text-[9px] text-neutral-600">3 environments</span>
      </div>
      {envs.map((e) => (
        <div
          key={e.name}
          className="rounded-lg border px-2.5 py-2"
          style={{
            borderColor: e.status === 'active' ? `${e.color}30` : 'rgba(255,255,255,0.06)',
            backgroundColor: e.status === 'active' ? `${e.color}08` : 'rgba(255,255,255,0.02)',
          }}
        >
          <div className="flex items-center gap-2">
            <CardAvatar name={e.name.split('-')[0]!} color={e.color} size="xs" />
            <span className="font-mono text-[10px] text-neutral-400">{e.name}</span>
            <span className="ml-auto flex items-center gap-1 text-[9px]" style={{ color: e.status === 'active' ? e.color : 'rgba(255,255,255,0.25)' }}>
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: e.status === 'active' ? e.color : 'rgba(255,255,255,0.15)' }} />
              {e.status}
            </span>
          </div>
          <div className="mt-1.5 flex gap-1">
            <span className="rounded bg-white/[0.04] px-1 py-0.5 text-[8px] text-neutral-600">isolated</span>
            <span className="rounded bg-white/[0.04] px-1 py-0.5 text-[8px] text-neutral-600">reproducible</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function HumanInLoopIllustration() {
  const steps = [
    { label: 'PRD complete', status: 'approved' },
    { label: 'Implementation done', status: 'approved' },
    { label: 'Code review', status: 'waiting' },
    { label: 'Deploy to staging', status: 'pending' },
    { label: 'Run load tests', status: 'pending' },
    { label: 'Security sign-off', status: 'pending' },
    { label: 'Merge to main', status: 'pending' },
    { label: 'Production rollout', status: 'pending' },
  ];
  return (
    <div className="flex h-full flex-col gap-2 px-5 pt-5">
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
        <span className="font-mono text-[9px] tracking-wider text-neutral-600 uppercase">Approval Gates</span>
      </div>
      {steps.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2.5 rounded-lg border px-2.5 py-2"
          style={{
            borderColor: s.status === 'approved' ? 'rgba(34,197,94,0.25)' : s.status === 'waiting' ? 'rgba(251,191,36,0.25)' : 'rgba(255,255,255,0.06)',
            backgroundColor: s.status === 'approved' ? 'rgba(34,197,94,0.03)' : s.status === 'waiting' ? 'rgba(251,191,36,0.04)' : 'rgba(255,255,255,0.02)',
          }}
        >
          {s.status === 'approved' ? (
            <svg className="h-3.5 w-3.5 shrink-0 text-celune-500" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : s.status === 'waiting' ? (
            <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-amber-400/40">
              <span className="text-[7px] font-bold text-amber-400">!</span>
            </div>
          ) : (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/[0.1]" />
          )}
          <span className="text-[11px]" style={{ color: s.status === 'approved' ? 'rgba(255,255,255,0.6)' : s.status === 'waiting' ? 'rgba(251,191,36,0.7)' : 'rgba(255,255,255,0.3)' }}>
            {s.label}
          </span>
          <span className="ml-auto rounded px-1.5 py-0.5 text-[9px] font-medium" style={{
            backgroundColor: s.status === 'approved' ? 'rgba(34,197,94,0.1)' : s.status === 'waiting' ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.04)',
            color: s.status === 'approved' ? '#22c55e' : s.status === 'waiting' ? '#fbbf24' : 'rgba(255,255,255,0.25)',
          }}>
            {s.status === 'approved' ? 'Approved' : s.status === 'waiting' ? 'Review' : 'Queued'}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Feature Card Data ─── */

const FEATURES = [
  {
    title: 'Agent Teams',
    description: 'Specialized agents for code, design, QA, and product — orchestrated in parallel.',
    Illustration: AgentTeamsIllustration,
  },
  {
    title: 'Integrations',
    description: 'Native MCP protocol with 50+ integrations. GitHub, Slack, Supabase, and more.',
    Illustration: ToolUseIllustration,
  },
  {
    title: 'Persistent Memory',
    description: 'Semantic recall with pgvector. Agents remember decisions and patterns across sessions.',
    Illustration: PersistentMemoryIllustration,
  },
  {
    title: 'Skill Library',
    description: 'Composable agent workflows. Build once, reuse across agents and projects.',
    Illustration: SkillLibraryIllustration,
  },
  {
    title: 'Code Review',
    description: 'Automated SAST, security audits, and design QA before any code ships.',
    Illustration: CodeReviewIllustration,
  },
  {
    title: 'Sandboxed Execution',
    description: 'Isolated environments for every agent run with full reproducibility.',
    Illustration: SandboxIllustration,
  },
  {
    title: 'Night Mode',
    description: 'Deploy agents before bed. Wake to completed tasks and passing tests.',
    Illustration: NightModeIllustration,
  },
  {
    title: 'Human-in-the-Loop',
    description: 'Configurable approval gates at every stage without slowing the pipeline.',
    Illustration: HumanInLoopIllustration,
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
    <section id="platform" className="relative z-[1] overflow-hidden py-24 md:py-32">
      <div className="container">
        {/* Header row */}
        <div className="mb-10 flex items-end justify-between">
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
        </div>
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
            className="flex flex-none flex-col overflow-hidden border border-white/[0.06] bg-transparent"
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
            <div className="relative mt-auto h-[308px]">
              <card.Illustration />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
                style={{ background: 'linear-gradient(to bottom, transparent 0%, #08080A 70%)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
