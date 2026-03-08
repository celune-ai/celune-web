import type { HealthData } from '@/types/health';

interface ActivityFeedProps {
  data: HealthData;
}

interface FeedItem {
  icon: string;
  label: string;
  detail: string;
  time: string;
}

function formatRelativeTime(isoString: string | null): string {
  if (!isoString) return '\u2014';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '\u2014';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

export function ActivityFeed({ data }: ActivityFeedProps) {
  const items: FeedItem[] = [];

  if (data.slackbot.last_connected) {
    items.push({
      icon: '\uD83D\uDCAC',
      label: 'Slack bot connected',
      detail: `Session active, ${data.slackbot.errors_last_hour} errors/hr`,
      time: formatRelativeTime(data.slackbot.last_connected),
    });
  }

  if (data.heartbeat.last_run) {
    const decisions = data.heartbeat.decisions_today;
    const total = decisions.SKIP + decisions.ROUTINE + decisions.URGENT;
    items.push({
      icon: '\uD83D\uDC93',
      label: 'Last heartbeat',
      detail: `${total} runs today (${decisions.ROUTINE} routine, ${decisions.SKIP} skip)`,
      time: formatRelativeTime(data.heartbeat.last_run),
    });
  }

  if (data.memory_db.last_indexed) {
    items.push({
      icon: '\uD83D\uDDC4\uFE0F',
      label: 'Memory DB indexed',
      detail: `${data.memory_db.files_indexed} files, ${data.memory_db.chunks_indexed} chunks`,
      time: formatRelativeTime(data.memory_db.last_indexed),
    });
  }

  if (items.length === 0) {
    return <div className="py-6 text-center text-sm text-zinc-400">No recent activity</div>;
  }

  return (
    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {items.map((item) => (
        <div key={item.label} className="flex items-start gap-3 py-3">
          <span className="mt-0.5 text-base" aria-hidden="true">
            {item.icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.label}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.detail}</p>
          </div>
          <span className="shrink-0 text-xs text-zinc-400">{item.time}</span>
        </div>
      ))}
    </div>
  );
}
