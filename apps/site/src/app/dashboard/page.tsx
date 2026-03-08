'use client';

import { useCallback, useEffect, useState } from 'react';
import type { HealthData, SystemStatus } from '@/types/health';
import { StatusCard } from '@/components/status-card';
import { Metric } from '@/components/metric';
import { HeartbeatChart } from '@/components/heartbeat-chart';
import { ActivityFeed } from '@/components/activity-feed';

function formatUptime(seconds: number | null): string {
  if (seconds === null || seconds === undefined) return '\u2014';
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hrs}h ${mins}m`;
}

function formatTime(iso: string | null): string {
  if (!iso) return '\u2014';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '\u2014';
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function deriveVaultStatus(vault: HealthData['vault']): SystemStatus {
  if (vault.inbox_oldest_days !== null && vault.inbox_oldest_days > 7) return 'warning';
  if (vault.inbox_items > 10) return 'warning';
  return 'ok';
}

export default function Dashboard() {
  const [data, setData] = useState<HealthData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);

  const fetchHealth = useCallback(async () => {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
      setLastRefresh(new Date().toLocaleTimeString());
    } catch (e) {
      setError(String(e));
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  if (error && !data) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          Failed to load health data: {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-6 text-sm text-zinc-400" role="status">
          Loading...
        </div>
      </div>
    );
  }

  const overallStatus =
    data.slackbot.status === 'online' &&
    data.heartbeat.status === 'ok' &&
    data.memory_db.status === 'connected'
      ? 'ok'
      : data.slackbot.status === 'offline'
        ? 'offline'
        : 'warning';

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Second brain monitoring &mdash; auto-refreshes every 30s
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              overallStatus === 'ok'
                ? 'bg-emerald-500'
                : overallStatus === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-red-500'
            }`}
            role="img"
            aria-label={`Overall status: ${overallStatus}`}
          />
          <span className="text-xs text-zinc-400">{lastRefresh ?? '...'}</span>
        </div>
      </div>

      {/* Stale data warning */}
      {error && data && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400">
          Refresh failed. Showing cached data.
        </div>
      )}

      {/* Status Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatusCard title="Slack Bot" status={data.slackbot.status}>
          <Metric label="Uptime" value={formatUptime(data.slackbot.uptime_seconds)} />
          <p className="text-xs text-zinc-400">Errors/hr: {data.slackbot.errors_last_hour}</p>
        </StatusCard>

        <StatusCard title="Heartbeat" status={data.heartbeat.status}>
          <Metric
            label="Runs today"
            value={data.heartbeat.runs_today}
            sub={`/ ${data.heartbeat.total_runs} total`}
          />
          <p className="text-xs text-zinc-400">Last: {formatTime(data.heartbeat.last_run)}</p>
        </StatusCard>

        <StatusCard title="Memory DB" status={data.memory_db.status}>
          <Metric
            label="Files indexed"
            value={data.memory_db.files_indexed}
            sub={`(${data.memory_db.chunks_indexed} chunks)`}
          />
          <p className="text-xs text-zinc-400">{data.memory_db.size_kb} KB</p>
        </StatusCard>

        <StatusCard title="Vault" status={deriveVaultStatus(data.vault)}>
          <Metric label="Inbox items" value={data.vault.inbox_items} />
          <p className="text-xs text-zinc-400">
            {data.vault.active_projects} projects &middot; {data.vault.daily_notes} daily notes
          </p>
        </StatusCard>
      </div>

      {/* Charts + Activity */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Heartbeat Decisions Today
          </h3>
          <HeartbeatChart decisions={data.heartbeat.decisions_today} />
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Recent Activity
          </h3>
          <ActivityFeed data={data} />
        </div>
      </div>

      {/* Config Footer */}
      <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">Configuration</h3>
        <div className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <span className="text-zinc-400">Model: </span>
            <code className="text-xs">{data.config.model}</code>
          </div>
          <div>
            <span className="text-zinc-400">Active hours: </span>
            {data.config.active_hours} {data.config.timezone}
          </div>
          <div>
            <span className="text-zinc-400">Oldest inbox: </span>
            {data.vault.inbox_oldest_days !== null ? `${data.vault.inbox_oldest_days}d` : '\u2014'}
          </div>
        </div>
      </div>
    </div>
  );
}
