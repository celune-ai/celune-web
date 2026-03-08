export type SystemStatus =
  | 'ok'
  | 'online'
  | 'connected'
  | 'warning'
  | 'offline'
  | 'error'
  | 'not_found';

export interface HealthData {
  timestamp: string;
  heartbeat: HeartbeatStats;
  slackbot: SlackbotStats;
  memory_db: MemoryDbStats;
  vault: VaultStats;
  config: ConfigInfo;
}

export interface HeartbeatStats {
  last_run: string | null;
  runs_today: number;
  total_runs: number;
  decisions_today: {
    SKIP: number;
    ROUTINE: number;
    URGENT: number;
  };
  last_error: string | null;
  status: SystemStatus;
}

export interface SlackbotStats {
  status: SystemStatus;
  started_at: string | null;
  last_connected: string | null;
  uptime_seconds: number | null;
  errors_last_hour: number;
}

export interface MemoryDbStats {
  status: SystemStatus;
  files_indexed: number;
  chunks_indexed: number;
  size_kb: number;
  last_indexed: string;
}

export interface VaultStats {
  inbox_items: number;
  inbox_oldest_days: number | null;
  active_projects: number;
  session_logs: number;
  daily_notes: number;
}

export interface ConfigInfo {
  model: string;
  active_hours: string;
  timezone: string;
}
