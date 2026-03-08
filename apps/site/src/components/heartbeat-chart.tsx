'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DecisionData {
  name: string;
  count: number;
  color: string;
}

interface HeartbeatChartProps {
  decisions: { SKIP: number; ROUTINE: number; URGENT: number };
}

export function HeartbeatChart({ decisions }: HeartbeatChartProps) {
  const data: DecisionData[] = [
    { name: 'Skip', count: decisions.SKIP, color: '#71717a' },
    { name: 'Routine', count: decisions.ROUTINE, color: '#3b82f6' },
    { name: 'Urgent', count: decisions.URGENT, color: '#ef4444' },
  ];

  const total = data.reduce((sum, d) => sum + d.count, 0);

  if (total === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-zinc-400">
        No heartbeat runs today
      </div>
    );
  }

  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 0 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={60}
            tick={{ fontSize: 12, fill: '#a1a1aa' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#18181b',
              border: '1px solid #3f3f46',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            cursor={false}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
