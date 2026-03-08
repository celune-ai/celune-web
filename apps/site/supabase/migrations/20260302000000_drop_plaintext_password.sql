-- Migration: Drop plaintext password column from portfolio_passwords
--
-- PREREQUISITE: Run the backfill script first to ensure all rows have password_hash:
--   node packages/db/scripts/backfill-password-hashes.mjs
--
-- Verify no NULL password_hash rows remain:
--   SELECT COUNT(*) FROM portfolio_passwords WHERE password_hash IS NULL;
--   (must return 0 before running this migration)

-- Safety check: fail if any rows still have NULL password_hash
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM portfolio_passwords WHERE password_hash IS NULL) THEN
    RAISE EXCEPTION 'Cannot drop password column: % row(s) still have NULL password_hash. Run the backfill script first.',
      (SELECT COUNT(*) FROM portfolio_passwords WHERE password_hash IS NULL);
  END IF;
END $$;

-- Make password_hash NOT NULL now that all rows are backfilled
ALTER TABLE portfolio_passwords ALTER COLUMN password_hash SET NOT NULL;

-- Drop the plaintext password column
ALTER TABLE portfolio_passwords DROP COLUMN password;
