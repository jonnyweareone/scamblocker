-- Create table to store HubSpot OAuth tokens
CREATE TABLE IF NOT EXISTS hubspot_tokens (
  id INTEGER PRIMARY KEY DEFAULT 1,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE hubspot_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything
CREATE POLICY "Service role has full access to hubspot_tokens"
  ON hubspot_tokens
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
