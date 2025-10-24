# 🚀 Portfolio Backend Setup Guide

Complete guide to set up Supabase, Upstash, and deploy to Vercel.

---

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- Accounts on:
  - [Supabase](https://supabase.com) (Free tier)
  - [Upstash](https://upstash.com) (Free tier)
  - [Vercel](https://vercel.com) (Free tier)

---

## 1️⃣ Supabase Setup

### Create Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `my-portfolio`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click **"Create new project"** (takes ~2 minutes)

### Create Storage Buckets

1. Go to **Storage** in left sidebar
2. Create these buckets:
   - `projects` (Public)
   - `certifications` (Public)
   - `avatars` (Public)
   - `thumbnails` (Public)

3. For each bucket, set policies:
   ```sql
   -- Allow public read access
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'projects' );
   
   -- Allow authenticated uploads (you'll upload via admin key)
   CREATE POLICY "Authenticated Upload"
   ON storage.objects FOR INSERT
   WITH CHECK ( bucket_id = 'projects' );
   ```

### Run Database Schema

1. Go to **SQL Editor** in Supabase dashboard
2. Copy entire contents of `supabase/schema.sql`
3. Paste and click **"Run"**
4. ✅ You should see "Success. No rows returned"

### Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key
   - **service_role** secret key (⚠️ Keep this secret!)

---

## 2️⃣ Upstash Redis Setup

### Create Database

1. Go to [Upstash Console](https://console.upstash.com)
2. Click **"Create Database"**
3. Fill in:
   - **Name**: `portfolio-cache`
   - **Region**: Same as Vercel deployment region
   - **Type**: Regional (free tier)
4. Click **"Create"**

### Get Credentials

1. Click on your database
2. Scroll to **"REST API"** section
3. Copy:
   - **UPSTASH_REDIS_REST_URL**
   - **UPSTASH_REDIS_REST_TOKEN**

---

## 3️⃣ Local Development Setup

### Install Dependencies

```bash
npm install @supabase/supabase-js @upstash/redis @upstash/ratelimit
```

### Environment Variables

1. Copy `env.example.txt` to `.env.local`:
   ```bash
   cp env.example.txt .env.local
   ```

2. Fill in your values:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
   SUPABASE_SERVICE_ROLE_KEY=eyJhb...

   # Upstash Redis
   UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=AXX...

   # App Config
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **⚠️ Important**: Never commit `.env.local` to Git!

### Test Connection

```bash
npm run dev
```

Visit: `http://localhost:3000/api/projects`

You should see: `{"data":[],"cached":false}`

---

## 4️⃣ Seed Sample Data

### Option A: Via Supabase Dashboard

1. Go to **Table Editor** → **projects**
2. Click **"Insert row"**
3. Fill in sample project:
   ```json
   {
     "title": "E-Commerce Platform",
     "slug": "ecommerce-platform",
     "description": "A modern e-commerce solution",
     "category": "Web Apps",
     "tags": ["Next.js", "TypeScript", "Stripe"],
     "status": "published",
     "is_featured": true
   }
   ```

### Option B: Via SQL

```sql
INSERT INTO projects (
  title, slug, description, category, tags, 
  tech_stack, status, is_featured, display_order
) VALUES (
  'E-Commerce Platform',
  'ecommerce-platform',
  'A modern, scalable e-commerce solution with AI-powered recommendations',
  'Web Apps',
  ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
  '{"frontend": ["Next.js", "TypeScript", "Tailwind"], "backend": ["Node.js", "PostgreSQL"], "devops": ["Vercel", "Supabase"]}',
  'published',
  true,
  1
);
```

---

## 5️⃣ Test API Endpoints

### Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great portfolio!"
  }'
```

### Newsletter Subscribe
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "name": "John Doe"
  }'
```

### Track Page View
```bash
curl -X POST http://localhost:3000/api/views \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/projects/ecommerce-platform",
    "title": "E-Commerce Platform"
  }'
```

---

## 6️⃣ Deploy to Vercel

### Connect Repository

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Click **"Import Project"**
4. Select your repository
5. Click **"Import"**

### Configure Environment Variables

1. In Vercel project settings, go to **Settings** → **Environment Variables**
2. Add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)

3. Click **"Save"**

### Deploy

1. Click **"Deploy"**
2. Wait for build to complete
3. Visit your live site! 🎉

---

## 7️⃣ Upload Images

### Via Supabase Dashboard

1. Go to **Storage** → **projects**
2. Click **"Upload file"**
3. Select your project images
4. Copy the public URL
5. Update your project in **Table Editor**:
   ```json
   {
     "thumbnail_url": "https://xxxxx.supabase.co/storage/v1/object/public/projects/image.png"
   }
   ```

### Via API (Admin Dashboard - Future)

You can create an admin dashboard to upload images programmatically using the functions in `lib/supabase/storage.ts`.

---

## 8️⃣ Database Best Practices

### Indexes (Already Created)

The schema includes indexes on frequently queried columns:
- `slug`, `category`, `status` on projects
- `email` on newsletter subscribers
- `created_at` on contact messages

### Backups

Supabase auto-backups on Pro plan. For free tier:
1. Go to **Database** → **Backups**
2. Manual backup: **"Download"**

### Monitoring

1. **Database** → **Database** → Check usage
2. **Storage** → Monitor file sizes
3. **Authentication** → View auth logs

---

## 9️⃣ Security Checklist

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Service role key only in server-side code
- ✅ Rate limiting on contact form & newsletter
- ✅ Email validation
- ✅ Input sanitization
- ✅ Environment variables secured
- ✅ CORS configured properly

---

## 🔟 Advanced Features

### Email Notifications (Optional)

Install Resend:
```bash
npm install resend
```

Create `lib/email.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactNotification(data: any) {
  await resend.emails.send({
    from: 'Portfolio <noreply@yourdomain.com>',
    to: 'your@email.com',
    subject: `New Contact: ${data.name}`,
    html: `<p>${data.message}</p>`,
  });
}
```

### Analytics Dashboard

Query page views:
```sql
SELECT 
  page_path,
  COUNT(*) as views,
  COUNT(DISTINCT visitor_id) as unique_visitors
FROM page_views
WHERE viewed_at > NOW() - INTERVAL '30 days'
GROUP BY page_path
ORDER BY views DESC;
```

### Scheduled Jobs (Vercel Cron)

Create `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 0 * * *"
    }
  ]
}
```

---

## 📊 Monitoring & Analytics

### Supabase Dashboard
- **Database** → Query performance
- **Storage** → File usage
- **Logs** → API requests

### Upstash Dashboard
- **Metrics** → Request count
- **Data Browser** → View cached data

### Vercel Dashboard
- **Analytics** → Traffic insights
- **Logs** → Function logs
- **Speed Insights** → Performance

---

## 🆘 Troubleshooting

### Issue: "Failed to fetch projects"
**Solution**: Check Supabase URL and anon key in `.env.local`

### Issue: "Rate limit error"
**Solution**: Wait 1 hour or adjust rate limits in `lib/upstash/redis.ts`

### Issue: "CORS error"
**Solution**: Ensure `NEXT_PUBLIC_APP_URL` matches your domain

### Issue: "Image upload failed"
**Solution**: Check storage bucket policies and service role key

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Upstash Docs](https://docs.upstash.com)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 🎉 You're All Set!

Your portfolio now has:
- ✅ Scalable database (Supabase)
- ✅ Fast caching (Upstash Redis)
- ✅ Rate limiting
- ✅ Image storage
- ✅ Analytics tracking
- ✅ Contact form
- ✅ Newsletter
- ✅ Deployed on Vercel

**Need help?** Check the troubleshooting section or open an issue!

