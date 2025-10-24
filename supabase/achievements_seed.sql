-- =====================================================
-- SEED DATA FOR ACHIEVEMENTS SECTION
-- =====================================================
-- Run this AFTER achievements_schema.sql

-- Insert achievement stats (for the stats cards)
INSERT INTO achievement_stats (stat_key, label, value, display_order) VALUES
  ('awards_won', 'Awards Won', '15+', 1),
  ('recognitions', 'Recognitions', '30+', 2),
  ('speaking_events', 'Speaking Events', '20+', 3),
  ('publications', 'Publications', '10+', 4)
ON CONFLICT (stat_key) DO UPDATE SET
  label = EXCLUDED.label,
  value = EXCLUDED.value,
  display_order = EXCLUDED.display_order;

-- Insert awards (for Recognition & Awards section)
INSERT INTO awards (title, organization, description, year, display_order, is_featured) VALUES
  (
    'Best Innovator Award 2024',
    'Tech Innovation Summit',
    'Recognized for exceptional contribution to sustainable technology solutions',
    '2024',
    1,
    true
  ),
  (
    'Developer of the Year',
    'Code Excellence Awards',
    'Awarded for outstanding technical expertise and community contributions',
    '2023',
    2,
    true
  ),
  (
    'Rising Star in Tech',
    'TechCrunch',
    'Featured as one of the top 30 rising developers under 30',
    '2023',
    3,
    true
  ),
  (
    'Open Source Champion',
    'GitHub',
    'Recognized for significant contributions to open source community',
    '2022',
    4,
    true
  );

-- Insert achievements (for Achievement Gallery with photos)
INSERT INTO achievements (title, description, image_url, category, date, date_display, display_order, is_featured) VALUES
  (
    'Hackathon Winner 2024',
    'First place at National Tech Innovation Hackathon for developing an AI-powered healthcare solution',
    '/achievements/hackathon-2024.jpg',
    'Competition',
    '2024-03-15',
    'March 2024',
    1,
    true
  ),
  (
    'Open Source Contributor',
    'Contributed to 50+ open source projects with over 1000+ stars on GitHub repositories',
    '/achievements/opensource.jpg',
    'Community',
    '2023-01-01',
    '2023 - Present',
    2,
    true
  ),
  (
    'Tech Speaker',
    'Delivered keynote speech at WebDev Summit 2024 on Modern Web Architecture to 500+ attendees',
    '/achievements/speaker.jpg',
    'Speaking',
    '2024-01-20',
    'January 2024',
    3,
    true
  ),
  (
    'Innovation Award',
    'Received Best Innovation Award for developing a sustainable tech solution that reduced carbon footprint by 40%',
    '/achievements/innovation.jpg',
    'Award',
    '2023-12-10',
    'December 2023',
    4,
    true
  ),
  (
    'Mentor of the Year',
    'Recognized for mentoring 100+ junior developers and helping them land their dream jobs in tech',
    '/achievements/mentor.jpg',
    'Recognition',
    '2023-11-15',
    'November 2023',
    5,
    true
  ),
  (
    'Research Publication',
    'Published research paper on AI optimization techniques in IEEE Journal with 200+ citations',
    '/achievements/research.jpg',
    'Academic',
    '2023-08-01',
    'August 2023',
    6,
    true
  );

-- Verify data
SELECT 'Achievement Stats:' as table_name, COUNT(*) as count FROM achievement_stats
UNION ALL
SELECT 'Awards:' as table_name, COUNT(*) as count FROM awards
UNION ALL
SELECT 'Achievements:' as table_name, COUNT(*) as count FROM achievements;

