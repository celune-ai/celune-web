CREATE TABLE public.rate_limits (
  client_id TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL DEFAULT 0,
  blocked BOOLEAN NOT NULL DEFAULT false,
  first_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-cleanup: rows older than 1 hour are stale
-- (Supabase pg_cron can handle periodic cleanup, or the function checks timestamps)

-- Allow the Edge Function (service role) to read/write
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access" ON public.rate_limits FOR ALL USING (true);
