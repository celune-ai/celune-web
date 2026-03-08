-- Create table for portfolio passwords
CREATE TABLE public.portfolio_passwords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL UNIQUE,
  project_title TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.portfolio_passwords ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view passwords (admin only)
CREATE POLICY "Authenticated users can view portfolio passwords" 
ON public.portfolio_passwords 
FOR SELECT 
TO authenticated
USING (true);

-- Only authenticated users can insert passwords
CREATE POLICY "Authenticated users can insert portfolio passwords" 
ON public.portfolio_passwords 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Only authenticated users can update passwords
CREATE POLICY "Authenticated users can update portfolio passwords" 
ON public.portfolio_passwords 
FOR UPDATE 
TO authenticated
USING (true);

-- Only authenticated users can delete passwords
CREATE POLICY "Authenticated users can delete portfolio passwords" 
ON public.portfolio_passwords 
FOR DELETE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_portfolio_passwords_updated_at
BEFORE UPDATE ON public.portfolio_passwords
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default passwords for existing projects
INSERT INTO public.portfolio_passwords (project_id, project_title, password) VALUES
  ('01', 'Notable Health', '4n1m3333'),
  ('02', 'Facebook', '4n1m3333'),
  ('03', 'Philosophie', '4n1m3333'),
  ('04', 'C-Star League', '4n1m3333'),
  ('05', 'Freelance', '4n1m3333');