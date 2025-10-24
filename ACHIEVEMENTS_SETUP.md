# Achievements Section - Supabase Setup Guide

## 📋 Overview

This guide will help you set up the database for the new **Achievements section** in your portfolio.

The Achievements section includes:
1. **Recognition & Awards** - Text-based awards list with stats
2. **Achievement Gallery** - Photo gallery with descriptions
3. **Stats Cards** - Quick metrics (Awards Won, Recognitions, Speaking Events, Publications)

---

## 🗄️ Database Tables

You'll be creating **3 new tables**:

1. **`achievements`** - Gallery items with photos
2. **`awards`** - Recognition & Awards list
3. **`achievement_stats`** - Stats cards data

---

## 🚀 Step-by-Step Setup

### Step 1: Run Schema SQL

1. Open your **Supabase Dashboard**
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of `supabase/achievements_schema.sql`
5. Click **Run** (or press F5)

This will create:
- ✅ 3 new tables with proper columns
- ✅ Indexes for performance
- ✅ Auto-update timestamps triggers
- ✅ Row Level Security (RLS) policies

### Step 2: Add Sample Data

1. In the **SQL Editor**, click **New Query** again
2. Copy and paste the contents of `supabase/achievements_seed.sql`
3. Click **Run**

This will insert:
- 4 stats cards
- 4 awards
- 6 achievement gallery items

### Step 3: Set Up Storage for Achievement Images

1. Go to **Storage** in Supabase Dashboard
2. Create a new bucket called **`achievements`**
3. Make it **public** (or set appropriate policies)
4. Upload your achievement photos to this bucket

**Recommended image sizes:**
- 600x400px or similar aspect ratio (3:2)
- Optimized for web (JPG/PNG, under 500KB)

### Step 4: Update Image URLs

After uploading your actual achievement photos:

1. Go to **Table Editor** > **achievements**
2. For each row, update the `image_url` field with your Supabase Storage URL:
   ```
   https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/achievements/your-photo.jpg
   ```

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| `supabase/achievements_schema.sql` | Database schema for 3 tables |
| `supabase/achievements_seed.sql` | Sample data for testing |
| `lib/types/database.ts` | TypeScript types (updated) |
| `app/api/achievements/route.ts` | API endpoint to fetch data |
| `ACHIEVEMENTS_SETUP.md` | This setup guide |

---

## 🔌 API Endpoint

Once set up, your achievements data will be available at:

```
GET /api/achievements
```

**Response:**
```json
{
  "achievements": [...],  // Gallery items
  "awards": [...],        // Awards list
  "stats": [...]         // Stats cards
}
```

**Features:**
- ✅ Cached with Upstash Redis (5 minutes)
- ✅ Falls back to database if cache unavailable
- ✅ Error handling with graceful fallbacks

---

## 🎨 Frontend Integration

The **Achievements component** (`components/Achievements.tsx`) currently uses **hardcoded data**.

### Option A: Keep Using Hardcoded Data
Just update the arrays in `components/Achievements.tsx` with your real data.

### Option B: Fetch from Supabase (Recommended)

Update `components/Achievements.tsx` to fetch data:

```typescript
"use client";

import { useEffect, useState } from "react";

export default function Achievements() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/achievements')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading...</div>;

  // Use data.achievements, data.awards, data.stats
  // instead of hardcoded arrays
}
```

---

## 📊 Managing Your Data

### Via Supabase Dashboard (Easy)

1. Go to **Table Editor**
2. Click on `achievements`, `awards`, or `achievement_stats`
3. Click **Insert row** or edit existing rows directly

### Via SQL (Advanced)

```sql
-- Add a new achievement
INSERT INTO achievements (title, description, image_url, category, date, date_display)
VALUES (
  'My New Achievement',
  'Description of what I achieved',
  '/storage/path/to/image.jpg',
  'Award',
  '2024-01-15',
  'January 2024'
);

-- Add a new award
INSERT INTO awards (title, organization, description, year)
VALUES (
  'Excellence Award',
  'Tech Conference 2024',
  'Awarded for outstanding contributions',
  '2024'
);

-- Update stats
UPDATE achievement_stats
SET value = '20+'
WHERE stat_key = 'awards_won';
```

---

## 🎯 Next Steps

1. **Run the SQL scripts** in Supabase
2. **Upload your actual achievement photos** to Storage
3. **Update image URLs** in the database
4. **Customize the data** to match your achievements
5. **Optional:** Connect the frontend to fetch from API

---

## ❓ Troubleshooting

### Images not showing?
- Check if the Storage bucket is public
- Verify image URLs are correct
- Check browser console for errors

### API returning errors?
- Ensure `.env.local` has correct Supabase credentials
- Check Supabase RLS policies are enabled
- Verify tables were created successfully

### Data not appearing?
- Check if seed data was inserted: `SELECT COUNT(*) FROM achievements;`
- Verify data in Table Editor
- Check browser network tab for API responses

---

## 📝 Schema Reference

### achievements
```sql
- id (UUID, Primary Key)
- title (VARCHAR)
- description (TEXT)
- image_url (TEXT)
- category (VARCHAR) -- Competition, Community, Speaking, Award, etc.
- date (DATE)
- date_display (VARCHAR) -- e.g., "March 2024"
- display_order (INT)
- is_featured (BOOLEAN)
- created_at, updated_at
```

### awards
```sql
- id (UUID, Primary Key)
- title (VARCHAR)
- organization (VARCHAR)
- description (TEXT)
- year (VARCHAR)
- category (VARCHAR, optional)
- display_order (INT)
- is_featured (BOOLEAN)
- created_at, updated_at
```

### achievement_stats
```sql
- id (UUID, Primary Key)
- stat_key (VARCHAR, unique) -- awards_won, recognitions, etc.
- label (VARCHAR) -- "Awards Won"
- value (VARCHAR) -- "15+"
- display_order (INT)
- created_at, updated_at
```

---

Need help? Check the Supabase logs in Dashboard > Logs or console.log in your browser! 🚀

