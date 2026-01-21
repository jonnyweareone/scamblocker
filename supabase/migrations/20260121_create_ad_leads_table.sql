-- Create ad_leads table for Facebook Ad lead capture
-- This table stores leads from the /stop-scam-calls landing page

CREATE TABLE IF NOT EXISTS public.ad_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Form data
  protecting text NOT NULL, -- 'myself', 'parent', 'parents', etc.
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  wants_call boolean DEFAULT false,
  
  -- Tracking metadata
  source text NOT NULL DEFAULT 'facebook_ad', -- 'facebook_ad', 'google_ad', etc.
  landing_page text NOT NULL, -- e.g., '/stop-scam-calls'
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  
  -- Lead status
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'disqualified')),
  assigned_to uuid REFERENCES auth.users(id),
  notes text,
  
  -- Conversion tracking
  converted_to_order_id uuid, -- Reference to consumer_orders when they convert
  converted_at timestamptz,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ad_leads_email ON public.ad_leads(email);
CREATE INDEX IF NOT EXISTS idx_ad_leads_phone ON public.ad_leads(phone);
CREATE INDEX IF NOT EXISTS idx_ad_leads_status ON public.ad_leads(status);
CREATE INDEX IF NOT EXISTS idx_ad_leads_source ON public.ad_leads(source);
CREATE INDEX IF NOT EXISTS idx_ad_leads_created_at ON public.ad_leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.ad_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (for public form submissions)
CREATE POLICY "Anyone can insert ad leads"
  ON public.ad_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can view all leads (for admin dashboard)
CREATE POLICY "Authenticated users can view all leads"
  ON public.ad_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update leads (for admin management)
CREATE POLICY "Authenticated users can update leads"
  ON public.ad_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_ad_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_ad_leads_updated_at_trigger
  BEFORE UPDATE ON public.ad_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_ad_leads_updated_at();

-- Grant permissions
GRANT INSERT ON public.ad_leads TO anon;
GRANT SELECT, UPDATE, DELETE ON public.ad_leads TO authenticated;

COMMENT ON TABLE public.ad_leads IS 'Leads captured from Facebook Ads landing pages';
