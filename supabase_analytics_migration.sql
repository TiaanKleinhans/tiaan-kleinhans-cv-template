-- Analytics Migration: Visitors and Section Views
-- This migration creates tables for tracking visitors and section views

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create section_views table
CREATE TABLE IF NOT EXISTS section_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
  section_name TEXT NOT NULL CHECK (section_name IN ('hero', 'cv', 'skills', 'mountain')),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(visitor_id, section_name)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_visitors_user_id ON visitors(user_id);
CREATE INDEX IF NOT EXISTS idx_visitors_session_id ON visitors(session_id);
CREATE INDEX IF NOT EXISTS idx_section_views_visitor_id ON section_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_section_views_section_name ON section_views(section_name);
CREATE INDEX IF NOT EXISTS idx_section_views_user_id_section ON section_views(visitor_id, section_name);

-- Create updated_at trigger function (if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_visitors_updated_at
  BEFORE UPDATE ON visitors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies for visitors table
-- Allow anyone to insert (for tracking)
CREATE POLICY "Allow insert on visitors" ON visitors
  FOR INSERT
  WITH CHECK (true);

-- Allow select for service role (for analytics)
CREATE POLICY "Allow select on visitors for analytics" ON visitors
  FOR SELECT
  USING (true);

-- RLS Policies for section_views table
-- Allow anyone to insert (for tracking)
CREATE POLICY "Allow insert on section_views" ON section_views
  FOR INSERT
  WITH CHECK (true);

-- Allow select for service role (for analytics)
CREATE POLICY "Allow select on section_views for analytics" ON section_views
  FOR SELECT
  USING (true);

