-- Drop the unique constraint on project_id to allow multiple passwords per project
ALTER TABLE public.portfolio_passwords DROP CONSTRAINT portfolio_passwords_project_id_key;

-- Add an index for faster lookups
CREATE INDEX idx_portfolio_passwords_project_id ON public.portfolio_passwords(project_id);