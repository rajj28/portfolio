-- =====================================================
-- ACHIEVEMENTS TABLE SCHEMA
-- =====================================================
-- This adds support for the new Achievements section
-- Run this in your Supabase SQL Editor

-- 1. Create achievements table for the gallery (photos with descriptions)
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL, -- 'Competition', 'Community', 'Speaking', 'Award', 'Recognition', 'Academic'
  date DATE NOT NULL,
  date_display VARCHAR(50), -- e.g., "March 2024" for display
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create awards table for Recognition & Awards section
CREATE TABLE IF NOT EXISTS awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  year VARCHAR(10) NOT NULL,
  category VARCHAR(100), -- Optional categorization
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create achievement_stats table for the stats cards
CREATE TABLE IF NOT EXISTS achievement_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_key VARCHAR(100) UNIQUE NOT NULL, -- 'awards_won', 'recognitions', 'speaking_events', 'publications'
  label VARCHAR(100) NOT NULL,
  value VARCHAR(50) NOT NULL, -- e.g., "15+", "30+"
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(category);
CREATE INDEX IF NOT EXISTS idx_achievements_date ON achievements(date DESC);
CREATE INDEX IF NOT EXISTS idx_achievements_featured ON achievements(is_featured);
CREATE INDEX IF NOT EXISTS idx_achievements_order ON achievements(display_order);

CREATE INDEX IF NOT EXISTS idx_awards_year ON awards(year DESC);
CREATE INDEX IF NOT EXISTS idx_awards_featured ON awards(is_featured);
CREATE INDEX IF NOT EXISTS idx_awards_order ON awards(display_order);

CREATE INDEX IF NOT EXISTS idx_achievement_stats_order ON achievement_stats(display_order);

-- =====================================================
-- AUTO-UPDATE TIMESTAMPS
-- =====================================================

CREATE OR REPLACE FUNCTION update_achievement_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER achievements_updated_at
  BEFORE UPDATE ON achievements
  FOR EACH ROW
  EXECUTE FUNCTION update_achievement_updated_at();

CREATE TRIGGER awards_updated_at
  BEFORE UPDATE ON awards
  FOR EACH ROW
  EXECUTE FUNCTION update_achievement_updated_at();

CREATE TRIGGER achievement_stats_updated_at
  BEFORE UPDATE ON achievement_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_achievement_updated_at();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_stats ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view achievements"
  ON achievements FOR SELECT
  USING (true);

CREATE POLICY "Public can view awards"
  ON awards FOR SELECT
  USING (true);

CREATE POLICY "Public can view achievement stats"
  ON achievement_stats FOR SELECT
  USING (true);

-- Admin write access (you'll need to set up proper auth for this)
-- For now, these allow authenticated users to manage data
CREATE POLICY "Authenticated users can insert achievements"
  ON achievements FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update achievements"
  ON achievements FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete achievements"
  ON achievements FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert awards"
  ON awards FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update awards"
  ON awards FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete awards"
  ON awards FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage achievement stats"
  ON achievement_stats FOR ALL
  USING (auth.role() = 'authenticated');

