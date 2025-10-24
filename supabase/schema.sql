-- ============================================
-- PORTFOLIO DATABASE SCHEMA (Future-Proof)
-- ============================================
-- Created for Vercel + Next.js + Supabase
-- Supports: Projects, Certifications, Contact, Analytics, Newsletter
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROJECTS TABLE
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL, -- URL-friendly (e.g., "e-commerce-platform")
  description TEXT NOT NULL,
  detailed_description TEXT,
  
  -- Categorization
  category VARCHAR(100), -- "Web Apps", "Mobile", "Design", "Backend"
  tags TEXT[], -- Array: ["Next.js", "TypeScript", "PostgreSQL"]
  tech_stack JSONB, -- {frontend: [...], backend: [...], database: [...]}
  
  -- Media
  thumbnail_url TEXT, -- Main image
  images TEXT[], -- Array of additional images
  demo_url TEXT,
  github_url TEXT,
  video_url TEXT,
  
  -- Metrics & Features
  metrics JSONB, -- {users: "100K+", rating: "4.8/5", uptime: "99.9%"}
  features TEXT[], -- Array of key features
  
  -- Status & Display
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Analytics
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  
  -- Timestamps
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  og_image TEXT
);

-- Indexes for performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(is_featured) WHERE is_featured = true;
CREATE INDEX idx_projects_display_order ON projects(display_order);

-- ============================================
-- 2. CERTIFICATIONS & ACHIEVEMENTS
-- ============================================
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL, -- "AWS", "Google", "Meta"
  type VARCHAR(100), -- "certification", "achievement", "award"
  
  -- Details
  description TEXT,
  skills_gained TEXT[], -- Array of skills
  
  -- Media
  badge_url TEXT,
  certificate_url TEXT,
  credential_url TEXT, -- Verification link
  
  -- Dates & Validity
  issued_date DATE NOT NULL,
  expiry_date DATE,
  credential_id VARCHAR(255),
  
  -- Display
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_certifications_type ON certifications(type);
CREATE INDEX idx_certifications_issuer ON certifications(issuer);
CREATE INDEX idx_certifications_featured ON certifications(is_featured);

-- ============================================
-- 3. CONTACT MESSAGES
-- ============================================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Contact Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  
  -- Message
  subject VARCHAR(500),
  message TEXT NOT NULL,
  
  -- Categorization
  type VARCHAR(100) DEFAULT 'general', -- general, project, job, collaboration
  priority VARCHAR(50) DEFAULT 'normal', -- low, normal, high
  
  -- Status
  status VARCHAR(50) DEFAULT 'new', -- new, read, replied, archived, spam
  replied_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_created ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_email ON contact_messages(email);

-- ============================================
-- 4. NEWSLETTER SUBSCRIBERS
-- ============================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Subscriber Info
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- active, unsubscribed, bounced
  verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  
  -- Preferences
  interests TEXT[], -- Topics they're interested in
  frequency VARCHAR(50) DEFAULT 'weekly', -- daily, weekly, monthly
  
  -- Tracking
  source VARCHAR(100), -- Where they subscribed from
  ip_address INET,
  
  -- Timestamps
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  last_email_sent_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);

-- ============================================
-- 5. ANALYTICS & PAGE VIEWS
-- ============================================
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Page Info
  page_path VARCHAR(500) NOT NULL, -- "/projects/my-project"
  page_title VARCHAR(255),
  
  -- Visitor Info (anonymous)
  visitor_id VARCHAR(255), -- Hashed fingerprint
  session_id VARCHAR(255),
  
  -- Metadata
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  country VARCHAR(100),
  city VARCHAR(100),
  
  -- Device Info
  device_type VARCHAR(50), -- desktop, mobile, tablet
  browser VARCHAR(100),
  os VARCHAR(100),
  
  -- Timestamps
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partitioning by month for better performance
CREATE INDEX idx_page_views_path ON page_views(page_path);
CREATE INDEX idx_page_views_date ON page_views(viewed_at DESC);
CREATE INDEX idx_page_views_visitor ON page_views(visitor_id);

-- ============================================
-- 6. TESTIMONIALS / RECOMMENDATIONS
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Person Info
  author_name VARCHAR(255) NOT NULL,
  author_position VARCHAR(255),
  author_company VARCHAR(255),
  author_image_url TEXT,
  author_linkedin TEXT,
  
  -- Content
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  
  -- Context
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  relationship VARCHAR(100), -- "client", "colleague", "manager", "mentor"
  
  -- Display
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_testimonials_project ON testimonials(project_id);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX idx_testimonials_approved ON testimonials(is_approved);

-- ============================================
-- 7. BLOG POSTS (Future Extension)
-- ============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Content
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  
  -- Categorization
  category VARCHAR(100),
  tags TEXT[],
  
  -- Media
  cover_image TEXT,
  images TEXT[],
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Analytics
  views_count INTEGER DEFAULT 0,
  reading_time INTEGER, -- Minutes
  
  -- Timestamps
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_status ON blog_posts(status);
CREATE INDEX idx_blog_published ON blog_posts(published_at DESC);

-- ============================================
-- 8. SKILLS & TECH STACK
-- ============================================
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Skill Info
  name VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL, -- "Frontend", "Backend", "Design", "Tools"
  
  -- Details
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  description TEXT,
  
  -- Media
  icon_url TEXT,
  icon_name VARCHAR(100), -- For icon libraries
  color VARCHAR(50), -- Hex color for UI
  
  -- Usage Stats
  years_of_experience DECIMAL(3,1),
  projects_count INTEGER DEFAULT 0,
  
  -- Display
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_featured ON skills(is_featured);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_updated_at BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public projects are viewable by everyone"
  ON projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public certifications are viewable by everyone"
  ON certifications FOR SELECT
  USING (true);

CREATE POLICY "Public testimonials are viewable by everyone"
  ON testimonials FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Public blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public skills are viewable by everyone"
  ON skills FOR SELECT
  USING (true);

-- Allow anyone to insert contact messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Allow anyone to subscribe to newsletter
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Allow anonymous page view tracking
CREATE POLICY "Anyone can record page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

-- ============================================
-- SAMPLE DATA (Optional)
-- ============================================

-- You can add sample data here for testing
-- INSERT INTO projects (title, slug, description, ...) VALUES (...);

-- ============================================
-- NOTES FOR FUTURE SCALING
-- ============================================

-- 1. PARTITIONING: Consider partitioning page_views by month when you hit 1M+ rows
--    ALTER TABLE page_views PARTITION BY RANGE (viewed_at);

-- 2. ARCHIVING: Move old contact_messages to an archive table after 6 months
--    CREATE TABLE contact_messages_archive (LIKE contact_messages INCLUDING ALL);

-- 3. FULL-TEXT SEARCH: Add if you need advanced search
--    CREATE INDEX idx_projects_search ON projects USING GIN(to_tsvector('english', title || ' ' || description));

-- 4. MATERIALIZED VIEWS: For complex analytics queries
--    CREATE MATERIALIZED VIEW project_stats AS ...

-- 5. MEDIA STORAGE: Use Supabase Storage for images
--    Images should be stored in buckets, not as URLs in DB initially

