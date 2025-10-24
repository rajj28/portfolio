# 📊 Database Design Documentation

## Overview

This database is designed for a modern portfolio website with the following goals:
- **Scalability**: Handle growing data without performance degradation
- **Flexibility**: Easy to extend with new features
- **Performance**: Optimized queries with proper indexing
- **Security**: Row-level security for data protection
- **Future-proof**: Support for upcoming features (blog, testimonials, etc.)

---

## 🗂️ Table Structure

### Core Tables

#### 1. **projects**
Stores portfolio projects with rich metadata.

**Key Features:**
- **JSONB fields** for flexible structured data (tech_stack, metrics)
- **Array fields** for tags, images, features
- **Slug-based routing** for SEO-friendly URLs
- **Status workflow**: draft → published → archived
- **View/like counters** for engagement metrics

**Why JSONB?**
- **Flexibility**: Different projects have different metrics
- **Performance**: Indexed and queryable
- **Type safety**: Can validate structure client-side

```typescript
// Example tech_stack structure
{
  "frontend": ["Next.js", "TypeScript"],
  "backend": ["Node.js", "PostgreSQL"],
  "devops": ["Vercel", "Docker"]
}
```

#### 2. **certifications**
Professional credentials and achievements.

**Design Decisions:**
- Separate from projects (different lifecycle)
- **Expiry tracking** for renewable certifications
- **Credential verification** URLs for authenticity
- **Skills mapping** for portfolio skill validation

#### 3. **contact_messages**
Inquiry submissions with spam protection.

**Features:**
- **Priority system** for triage
- **Status workflow**: new → read → replied → archived
- **Metadata tracking** (IP, user agent) for spam detection
- **Type categorization** for routing (job, project, general)

#### 4. **newsletter_subscribers**
Email list management with preferences.

**Features:**
- **Double opt-in** with verification tokens
- **Preference management** (frequency, interests)
- **Status tracking**: active/unsubscribed/bounced
- **GDPR compliance** ready (unsubscribe tracking)

#### 5. **page_views**
Anonymous analytics without cookies.

**Design:**
- **Visitor fingerprinting** (hashed IP + user agent)
- **Session tracking** for bounce rate calculation
- **Device/browser detection** for insights
- **Minimal PII** for privacy

**Future:** Partition by month when > 1M rows

#### 6. **testimonials**
Social proof and client feedback.

**Features:**
- **Approval workflow** for moderation
- **Project linking** for context
- **Relationship tracking** (client, colleague, manager)
- **Rating system** (1-5 stars)

#### 7. **skills**
Technical skills with proficiency tracking.

**Features:**
- **Category grouping** (Frontend, Backend, Design, Tools)
- **Proficiency scoring** (0-100)
- **Icon integration** (URL or icon library name)
- **Project counting** for validation

#### 8. **blog_posts** (Future)
Content management for technical writing.

**Prepared for:**
- Markdown/MDX content
- SEO optimization
- Draft workflow
- Reading time calculation
- View tracking

---

## 🔐 Security: Row Level Security (RLS)

### Public Read Policies

```sql
-- Anyone can read published projects
CREATE POLICY "Public projects" ON projects
  FOR SELECT USING (status = 'published');

-- Anyone can read approved testimonials  
CREATE POLICY "Public testimonials" ON testimonials
  FOR SELECT USING (is_approved = true);
```

### Write Policies

```sql
-- Anyone can submit contact forms
CREATE POLICY "Contact submission" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can manage data
-- (You'll use service role key for admin operations)
```

### Why This Approach?

1. **Frontend**: Use anon key (public read only)
2. **Admin**: Use service role key (full access)
3. **API Routes**: Server-side with service key
4. **No auth needed**: For portfolio sites (you control all content)

---

## 📈 Performance Optimizations

### Indexes

```sql
-- Frequently queried columns
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);

-- Partial indexes for efficiency
CREATE INDEX idx_projects_featured ON projects(is_featured) 
  WHERE is_featured = true;

-- Composite indexes for complex queries
CREATE INDEX idx_contact_status_created 
  ON contact_messages(status, created_at DESC);
```

### Caching Strategy

**Upstash Redis** handles:
- Project listings: 1 hour TTL
- Individual projects: 1 hour TTL
- Skills: 24 hour TTL (rarely change)
- View counts: Real-time (Redis counter)

**Cache invalidation:**
- Manual: After admin updates
- Automatic: TTL expiration
- Webhook: On Supabase updates (Pro plan)

---

## 🎯 Query Patterns

### Efficient Queries

```typescript
// ✅ GOOD: Use indexes
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('status', 'published')  // Indexed
  .eq('category', 'Web Apps')  // Indexed
  .order('display_order');     // Indexed

// ❌ BAD: Full table scan
const { data } = await supabase
  .from('projects')
  .select('*')
  .filter('description', 'ilike', '%keyword%');  // No index

// ✅ BETTER: Full-text search
const { data } = await supabase
  .from('projects')
  .select('*')
  .textSearch('title', 'keyword');  // GIN index (if created)
```

### Avoiding N+1 Queries

```typescript
// ✅ GOOD: Single query with join
const { data } = await supabase
  .from('testimonials')
  .select(`
    *,
    projects (
      title,
      slug
    )
  `)
  .eq('is_approved', true);

// ❌ BAD: N+1 queries
const testimonials = await getTestimonials();
for (const t of testimonials) {
  const project = await getProject(t.project_id);  // N queries!
}
```

---

## 🔄 Data Lifecycle

### Projects
```
Create (draft) → Review → Publish → Update → Archive
```

### Contact Messages
```
Submit → New → Read → Reply → Archive
           ↓
         Spam (filtered)
```

### Newsletter
```
Subscribe → Verify Email → Active → Unsubscribe
```

---

## 📊 Analytics Queries

### Top Projects by Views

```sql
SELECT 
  p.title,
  COUNT(pv.id) as total_views,
  COUNT(DISTINCT pv.visitor_id) as unique_visitors
FROM projects p
LEFT JOIN page_views pv ON pv.page_path LIKE '/projects/' || p.slug || '%'
WHERE pv.viewed_at > NOW() - INTERVAL '30 days'
GROUP BY p.id
ORDER BY total_views DESC
LIMIT 10;
```

### Contact Form Conversion Rate

```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_messages,
  COUNT(*) FILTER (WHERE status = 'replied') as replied,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'replied')::numeric / 
    COUNT(*)::numeric * 100, 
    2
  ) as reply_rate
FROM contact_messages
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## 🚀 Scaling Considerations

### When to Partition

**page_views** table (at 1M+ rows):
```sql
-- Partition by month
CREATE TABLE page_views_2024_01 PARTITION OF page_views
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

### When to Archive

**contact_messages** (at 100K+ rows):
```sql
-- Move old messages to archive table
INSERT INTO contact_messages_archive
SELECT * FROM contact_messages
WHERE created_at < NOW() - INTERVAL '1 year';

DELETE FROM contact_messages
WHERE created_at < NOW() - INTERVAL '1 year';
```

### When to Add Full-Text Search

When project count > 100:
```sql
-- Add GIN index for full-text search
CREATE INDEX idx_projects_fts 
ON projects 
USING GIN(to_tsvector('english', title || ' ' || description));

-- Query with search
SELECT * FROM projects
WHERE to_tsvector('english', title || ' ' || description) 
  @@ to_tsquery('english', 'ecommerce & platform');
```

---

## 🎨 Image Storage Strategy

### Supabase Storage Buckets

```
projects/
  ├── thumbnails/
  │   └── {slug}-{timestamp}.webp
  ├── gallery/
  │   └── {slug}/
  │       ├── image1.webp
  │       └── image2.webp
  └── og-images/
      └── {slug}.png

certifications/
  ├── badges/
  │   └── {credential-id}.png
  └── certificates/
      └── {credential-id}.pdf
```

### Image Optimization

1. **Upload**: Original size
2. **Transform**: Use Next.js Image Optimization
3. **Serve**: WebP/AVIF format
4. **CDN**: Automatic via Supabase

```typescript
// Next.js Image component handles optimization
<Image
  src={project.thumbnail_url}
  width={800}
  height={600}
  quality={90}
  format="webp"
  alt={project.title}
/>
```

---

## 🔄 Migration Strategy

### Version Control

```
supabase/
├── schema.sql        # Initial schema
├── seed.sql          # Sample data
└── migrations/       # Future changes
    ├── 001_add_blog_posts.sql
    ├── 002_add_tags_table.sql
    └── 003_add_fulltext_search.sql
```

### Running Migrations

```bash
# Supabase CLI (recommended)
supabase migration new add_feature
supabase db push

# Or manual via SQL Editor in dashboard
```

---

## 📝 Best Practices

### DO ✅

- Use prepared statements (SQL injection protection)
- Validate data server-side
- Cache expensive queries
- Use indexes for frequent WHERE clauses
- Store images in Storage, not DB
- Use JSONB for flexible data
- Enable RLS on all tables
- Monitor query performance

### DON'T ❌

- Store PII without encryption
- Use SELECT * in production
- Create indexes on every column
- Store large files in database
- Expose service role key client-side
- Skip validation
- Ignore N+1 query issues

---

## 🆘 Troubleshooting

### Slow Queries

```sql
-- Check query plan
EXPLAIN ANALYZE
SELECT * FROM projects WHERE category = 'Web Apps';

-- Check missing indexes
SELECT schemaname, tablename, attname, n_distinct, correlation
FROM pg_stats
WHERE tablename = 'projects';
```

### Storage Issues

```sql
-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 📚 Resources

- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don't_Do_This)
- [Supabase Database Guide](https://supabase.com/docs/guides/database)
- [JSONB Performance](https://www.postgresql.org/docs/current/datatype-json.html)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)

---

**This design supports:**
- ✅ 100K+ projects
- ✅ 1M+ page views
- ✅ 10K+ newsletter subscribers
- ✅ Real-time analytics
- ✅ Future blog/testimonials
- ✅ Easy content management

