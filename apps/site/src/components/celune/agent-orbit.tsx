'use client';

import { motion } from 'framer-motion';
import { CeluneLogo } from './logo';

const AGENTS = [
  { name: 'RICK', role: 'Engineering Lead', color: '#22c55e', angle: 0 },
  { name: 'SAGE', role: 'Product', color: '#a78bfa', angle: 51 },
  { name: 'NOIR', role: 'Design', color: '#f472b6', angle: 103 },
  { name: 'SCAN', role: 'QA', color: '#60a5fa', angle: 154 },
  { name: 'DELV', role: 'Research', color: '#fbbf24', angle: 206 },
  { name: 'TREK', role: 'Career', color: '#fb923c', angle: 257 },
  { name: 'ECHO', role: 'Brand', color: '#34d399', angle: 309 },
];

function AgentNode({ agent, index }: { agent: (typeof AGENTS)[number]; index: number }) {
  const radius = 140;
  const angle = (agent.angle * Math.PI) / 180;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
      className="absolute left-1/2 top-1/2"
      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
        className="group relative"
      >
        {/* Connection line to center */}
        <div
          className="absolute left-1/2 top-1/2 h-px origin-left"
          style={{
            width: `${radius}px`,
            transform: `rotate(${agent.angle + 180}deg)`,
            background: `linear-gradient(to right, ${agent.color}20, transparent)`,
          }}
        />

        {/* Node */}
        <div
          className="relative flex h-10 w-10 items-center justify-center rounded-full border text-[10px] font-bold"
          style={{
            borderColor: `${agent.color}40`,
            background: `${agent.color}10`,
            color: agent.color,
          }}
        >
          {agent.name.slice(0, 2)}
        </div>

        {/* Tooltip */}
        <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
          <span className="font-mono text-[9px] text-neutral-500">{agent.role}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AgentOrbit() {
  return (
    <div className="relative mx-auto h-[320px] w-[320px]">
      {/* Orbit ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-[20px] rounded-full border border-dashed border-border"
      />

      {/* Center node */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-celune-500/30 bg-celune-500/10">
          <svg width="20" height="16" viewBox="0 0 94 76" fill="none" className="text-celune-500">
            <path d="M92.7506 53.6471C93.7506 55.8824 94.2506 58.1176 94.0006 60.6013C93.7506 63.085 92.7506 65.5686 91.2506 67.8039C89.7506 70.0392 87.5006 71.7778 85.0006 73.268C82.5006 74.7582 79.5006 75.7516 76.2506 75.7516C73.0006 75.7516 69.5006 75.2549 65.5006 73.5163C61.7506 72.0261 57.7506 69.0457 53.5006 65.0719C53.2506 64.8235 53.0006 64.5752 52.7506 64.0784C52.5006 63.8301 52.2506 63.5817 52.0006 63.3333C50.0006 64.8235 48.2506 66.3137 46.2506 67.3072C42.7506 69.2941 38.5006 70.5359 34.0006 71.281C29.5006 72.0261 25.2506 72.2745 21.0006 72.2745C16.7506 72.2745 13.0006 72.0261 9.50062 71.281C6.25062 70.5359 4.00062 69.7908 2.75062 68.7974C0.500619 66.8105-0.499381 64.5752 0.250619 61.5948C1.00062 58.6144 2.00062 55.634 4.00062 52.4052C5.75062 49.6732 7.75062 46.6928 10.0006 44.2091C12.2506 41.4771 13.7506 39.7386 14.7506 38.7451C15.7506 37.7516 17.0006 37.0065 18.2506 36.7582C19.7506 36.5098 21.0006 36.5098 22.5006 36.5098C24.0006 36.5098 25.5006 37.0065 27.0006 37.5033C28.5006 38 29.7506 38.4967 30.7506 38.9935C34.0006 40.2353 37.0006 41.7255 40.2506 43.2157C43.2506 44.4575 46.0006 46.1961 49.0006 47.6863C49.2506 47.9346 49.7506 47.6863 50.0006 47.4379C51.0006 46.1961 51.7506 44.9542 52.5006 43.7124C53.2506 42.2222 54.0006 40.9804 54.5006 39.7386C55.0006 38.4967 55.2506 37.5033 55.5006 36.7582C55.5006 36.0131 55.2506 35.5163 54.7506 35.0196C53.2506 34.2745 50.7506 33.5294 47.7506 33.281C44.7506 33.0327 41.7506 32.5359 38.5006 32.2876C35.5006 32.0392 32.5006 31.5425 30.0006 31.0457C27.5006 30.549 25.7506 29.8039 25.0006 28.5621C24.2506 27.5686 24.2506 26.0784 24.5006 24.0915C25.0006 22.1046 25.7506 19.8693 26.7506 17.634C28.0006 15.3987 29.2506 13.1634 31.0006 10.9281C32.7506 8.69281 34.5006 6.70588 36.5006 5.21569C39.0006 3.22876 41.7506 1.73856 45.0006 0.993464C48.5006 0.496732 51.7506 0 55.0006 0C58.2506 0 61.2506 0.248366 64.0006 0.745098C66.7506 1.24183 69.0006 1.98693 70.5006 2.73203C72.0006 3.47712 72.7506 4.47059 73.0006 6.20915C73.2506 7.69935 73.0006 9.43791 72.5006 11.4248C72.0006 13.1634 71.2506 15.1503 70.2506 16.8889C69.2506 18.6275 68.2506 20.1176 67.5006 21.3595C67.0006 22.1046 65.7506 22.6013 64.2506 23.098C62.7506 23.5948 61.2506 23.5948 59.5006 23.8431C57.7506 23.8431 56.2506 23.8431 55.0006 23.8431C53.5006 23.8431 52.7506 23.5948 52.2506 23.3464C52.2506 23.3464 52.7506 22.6013 54.0006 21.3595C55.2506 20.1176 56.5006 18.3791 57.7506 16.6405C59.0006 14.902 60.0006 13.1634 60.5006 11.4248C61.0006 9.68627 60.7506 8.44444 59.5006 7.69935C57.7506 6.70588 55.7506 6.20915 53.5006 6.70588C51.2506 7.20261 49.2506 8.19608 47.2506 9.43791C45.2506 10.6797 43.5006 12.4183 41.7506 14.1569C40.2506 16.1438 39.0006 17.8824 38.2506 19.6209C37.5006 21.3595 37.5006 22.8497 37.7506 24.3399C38.2506 25.5817 39.5006 26.3268 41.5006 26.8235C42.5006 26.8235 44.0006 27.0719 46.2506 27.3203C48.5006 27.5686 50.7506 27.817 53.2506 28.3137C55.7506 28.8105 58.2506 29.3072 60.5006 30.3007C62.7506 31.0457 64.5006 32.2876 65.2506 33.7778C67.0006 36.0131 67.2506 38.9935 66.5006 42.9673C65.5006 46.6928 64.0006 50.4183 61.5006 53.8954C61.2506 54.1438 61.5006 54.6405 61.7506 54.8889C63.0006 55.634 64.0006 56.1307 65.2506 56.6274C66.5006 57.3725 68.0006 57.8693 69.2506 58.6144C73.5006 60.3529 77.0006 60.8497 79.2506 60.1046C81.7506 59.3595 83.5006 58.1176 84.7506 56.3791C86.2506 54.3922 87.0006 51.9085 87.5006 48.9281C89.0006 48.6797 90.0006 48.9281 90.5006 49.6732C91.0006 50.1699 91.7506 51.4118 92.7506 53.6471ZM16.2506 61.5948C16.5006 62.0915 17.5006 62.3399 18.7506 62.8366C20.2506 63.3333 22.0006 63.5817 24.2506 63.3333C26.5006 63.3333 29.0006 62.8366 31.5006 62.0915C34.2506 61.3464 36.7506 60.1046 39.5006 58.366C40.0006 57.8693 40.5006 57.6209 41.0006 57.1242C41.5006 56.6274 42.2506 56.1307 42.7506 55.634C39.0006 52.4052 35.5006 49.6732 32.2506 47.6863C29.2506 45.6993 25.0006 46.4444 23.0006 49.4248C21.7506 51.1634 20.5006 52.902 19.5006 54.3922C18.5006 56.1307 17.5006 57.3725 17.0006 58.8627C16.0006 60.1046 16.0006 61.098 16.2506 61.5948Z" fill="currentColor"/>
            <path d="M80.2499 48.6796C79.7499 50.1698 78.7499 51.1633 77.4999 52.1568C75.9999 53.1502 74.7499 53.6469 73.2499 53.3986C71.7499 53.3986 70.7499 52.6535 70.2499 51.66C69.7499 50.6666 69.7499 49.1764 70.2499 47.6862C70.7499 46.4443 71.7499 45.2025 72.9999 44.4574C74.4999 43.4639 75.7499 43.2156 77.2499 43.2156C78.7499 43.4639 79.7499 43.9607 80.2499 44.9541C80.7499 46.196 80.7499 47.4378 80.2499 48.6796Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="mt-1 text-center font-mono text-[10px] text-celune-500">celune</div>
      </motion.div>

      {/* Agent nodes */}
      {AGENTS.map((agent, i) => (
        <AgentNode key={agent.name} agent={agent} index={i} />
      ))}

      {/* Pulse rings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-celune-500/20"
      />
    </div>
  );
}
