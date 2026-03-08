-- Add password_hash column for PBKDF2 hashed passwords
-- Format: {hex-salt}:{hex-hash} (PBKDF2-SHA256, 100k iterations, 16-byte salt, 32-byte key)
-- The legacy 'password' column is kept for backward compatibility during migration.
-- Once all rows have password_hash populated, the password column can be dropped.

ALTER TABLE public.portfolio_passwords
ADD COLUMN password_hash TEXT;

-- Note: Backfill of existing plaintext passwords to hashes must be done
-- via the Edge Function's "hash" mode, since PBKDF2 is not available in
-- PostgreSQL natively. Run the backfill script after deploying the updated
-- Edge Function.
