# 🚀 Modern Portfolio Website

A production-ready, full-stack portfolio website built with Next.js 15, featuring a powerful backend, database integration, caching, rate limiting, and real-time analytics. This portfolio showcases projects, skills, certifications, and achievements with smooth animations and modern UI/UX.

![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=flat&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat&logo=supabase)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat&logo=vercel)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [Performance Optimizations](#-performance-optimizations)
- [Project Structure](#-project-structure)
- [Customization](#-customization)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Frontend Features
- 🎨 **Modern UI/UX** - Glassmorphism design with smooth animations
- 🌊 **Smooth Animations** - Framer Motion & GSAP for fluid interactions
- 📱 **Fully Responsive** - Mobile-first design, works on all devices
- 🎭 **Interactive Elements** - Parallax effects, hover animations, and scroll effects
- ⚡ **Optimized Performance** - Image optimization, lazy loading, code splitting
- 🎯 **Intersection Observer** - Animate elements as they enter viewport
- 🔄 **Loading States** - Custom loading screens with animations
- 📴 **Offline Support** - Graceful offline state handling

### Backend Features
- 🗄️ **Supabase Integration** - PostgreSQL database with real-time capabilities
- 🚦 **Rate Limiting** - Upstash Redis for API rate limiting
- 💾 **Smart Caching** - Multi-layer caching strategy for optimal performance
- 📊 **Analytics** - Page view tracking with visitor fingerprinting
- 📧 **Contact Form** - Full contact form with validation and spam protection
- 📮 **Newsletter System** - Email subscription management with verification
- 🔐 **Security** - Environment variable protection, input validation
- 🎯 **Type Safety** - Full TypeScript support across frontend and backend

### Content Management
- 📂 **Dynamic Projects** - CRUD operations for projects with categories
- 🏆 **Achievements Showcase** - Awards, stats, and milestones
- 🎓 **Certifications** - Professional credentials with verification links
- 💬 **Testimonials** - Client feedback and recommendations
- 🛠️ **Skills Matrix** - Proficiency levels with visual representation
- 📸 **Image Gallery** - Animated gallery with Supabase Storage

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.0.3 | React framework with App Router |
| **React** | 19.0.0 | UI library |
| **TypeScript** | 5.6.3 | Type safety |
| **Tailwind CSS** | 3.4.15 | Utility-first CSS framework |
| **Framer Motion** | 11.11.17 | Animation library |
| **GSAP** | 3.13.0 | Advanced animations |
| **Lucide React** | 0.460.0 | Icon library |
| **Recharts** | 3.3.0 | Data visualization |

### Backend & Database
| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | 2.39.0 | PostgreSQL database & storage |
| **Upstash Redis** | 1.28.0 | Caching & rate limiting |
| **@upstash/ratelimit** | 1.0.0 | API rate limiting |
| **EmailJS** | 4.4.1 | Email service integration |

### Developer Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 🏗️ Architecture

### Application Structure

```
┌─────────────────────────────────────────────┐
│              Next.js Frontend               │
│  (Pages, Components, Client-side Logic)     │
└───────────────┬─────────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────────┐
│            API Routes Layer                 │
│  /api/projects, /api/contact, /api/views   │
└───────────┬──────────────────┬──────────────┘
            │                  │
            ↓                  ↓
┌──────────────────┐  ┌──────────────────┐
│  Upstash Redis   │  │   Supabase DB    │
│   (Caching &     │  │  (PostgreSQL +   │
│  Rate Limiting)  │  │    Storage)      │
└──────────────────┘  └──────────────────┘
```

### Data Flow

1. **User Request** → Next.js Frontend
2. **API Call** → Backend API Routes
3. **Cache Check** → Upstash Redis (if cache miss ↓)
4. **Database Query** → Supabase PostgreSQL
5. **Response** → Cache → Frontend

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Upstash account (for Redis)
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/rajj28/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# EmailJS Configuration (Optional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

4. **Set up the database**

Run the SQL scripts in `supabase/` directory:
```bash
# In Supabase SQL Editor, run these in order:
# 1. schema.sql (creates tables)
# 2. seed.sql (adds sample data)
# 3. achievements_schema.sql (achievements tables)
# 4. achievements_seed.sql (achievements data)
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (⚠️ Keep secret!) | Supabase Dashboard → Settings → API |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis endpoint | Upstash Console → Database → REST API |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token | Upstash Console → Database → REST API |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID for contact form |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |

---

## 🗄️ Database Schema

### Tables

#### **projects**
Stores portfolio projects with details, tech stack, and metadata.

```sql
- id (uuid, primary key)
- title (text)
- slug (text, unique)
- description (text)
- detailed_description (text)
- category (text)
- tags (text[])
- tech_stack (jsonb)
- thumbnail_url (text)
- images (text[])
- demo_url (text)
- github_url (text)
- status (enum: draft, published, archived)
- is_featured (boolean)
- display_order (integer)
- views_count (integer)
- created_at, updated_at (timestamp)
```

#### **certifications**
Professional certifications and courses.

```sql
- id (uuid)
- title (text)
- issuer (text)
- description (text)
- badge_url (text)
- certificate_url (text)
- issued_date (date)
- expiry_date (date)
- credential_id (text)
- is_featured (boolean)
```

#### **contact_messages**
Contact form submissions.

```sql
- id (uuid)
- name (text)
- email (text)
- phone (text)
- company (text)
- subject (text)
- message (text)
- type (text)
- priority (text)
- status (enum: new, read, replied, archived, spam)
- ip_address (text)
- user_agent (text)
- created_at (timestamp)
```

#### **newsletter_subscribers**
Email newsletter subscriptions.

```sql
- id (uuid)
- email (text, unique)
- name (text)
- status (enum: active, unsubscribed, bounced)
- verified (boolean)
- verification_token (text)
- interests (text[])
- source (text)
- subscribed_at (timestamp)
```

#### **page_views**
Analytics for page visits.

```sql
- id (uuid)
- page_path (text)
- visitor_id (text)
- ip_address (text)
- user_agent (text)
- device_type (text)
- viewed_at (timestamp)
```

#### **achievements, awards, achievement_stats**
Professional accomplishments and statistics.

#### **testimonials**
Client and colleague recommendations.

#### **skills**
Technical skills with proficiency levels.

---

## 🔌 API Routes

### **GET /api/projects**
Fetch all published projects with optional filters.

**Query Parameters:**
- `category` - Filter by category (e.g., web, mobile)
- `featured` - true/false to get only featured projects
- `limit` - Maximum number of results

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Project Name",
      "slug": "project-slug",
      "category": "web",
      "is_featured": true,
      ...
    }
  ],
  "cached": false
}
```

### **GET /api/projects/[slug]**
Fetch single project by slug.

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "title": "Project Name",
    "detailed_description": "...",
    "tech_stack": {
      "frontend": ["React", "Next.js"],
      "backend": ["Node.js"]
    }
  }
}
```

### **POST /api/contact**
Submit contact form message.

**Rate Limit:** 3 requests per 15 minutes per IP

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Inquiry",
  "message": "Hello!",
  "type": "general"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message!",
  "remaining": 2
}
```

### **POST /api/newsletter**
Subscribe to newsletter.

**Rate Limit:** 2 requests per hour per IP

**Body:**
```json
{
  "email": "user@example.com",
  "name": "User Name",
  "interests": ["web-dev", "design"]
}
```

### **POST /api/views**
Track page view (for analytics).

**Rate Limit:** 1 view per path per visitor per minute

**Body:**
```json
{
  "path": "/projects/my-project",
  "title": "My Project"
}
```

### **GET /api/certifications**
Fetch all certifications.

### **GET /api/achievements**
Fetch achievements, awards, and stats.

### **GET /api/cache**
Get cache statistics (admin).

### **DELETE /api/cache**
Invalidate cache (admin).

**Query Parameters:**
- `key` - Specific cache key to clear
- `all=true` - Clear all cache

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

#### Method 1: Via Git Integration

1. **Push to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Add Environment Variables:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add all required env variables
   - Select Production, Preview, and Development

4. **Deploy:**
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

#### Method 2: Via Vercel CLI

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

### Deploy to Other Platforms

#### Build for Production
```bash
npm run build
npm start
```

The app will run on `http://localhost:3000`

#### Static Export (if needed)
Add to `next.config.ts`:
```typescript
module.exports = {
  output: 'export',
}
```

Then:
```bash
npm run build
```

Output in `/out` directory.

---

## ⚡ Performance Optimizations

### Implemented Optimizations

1. **Caching Strategy**
   - Redis caching for API responses
   - Cache durations: Projects (1h), Certifications (24h), Skills (24h)
   - Automatic cache invalidation

2. **Rate Limiting**
   - Contact form: 3 requests / 15 min
   - Newsletter: 2 requests / hour
   - Page views: 1 view / path / visitor / minute

3. **Image Optimization**
   - Next.js Image component
   - Automatic WebP conversion
   - Lazy loading
   - Responsive images

4. **Code Splitting**
   - Automatic route-based code splitting
   - Dynamic imports for heavy components
   - Tree shaking

5. **Database Optimization**
   - Indexed queries
   - Efficient query patterns
   - Connection pooling via Supabase

6. **Frontend Optimization**
   - CSS purging (Tailwind)
   - Minification
   - Gzip compression
   - HTTP/2 push

### Performance Metrics

- ⚡ **First Contentful Paint (FCP):** < 1.5s
- ⚡ **Largest Contentful Paint (LCP):** < 2.5s
- ⚡ **Time to Interactive (TTI):** < 3.5s
- ⚡ **Cumulative Layout Shift (CLS):** < 0.1

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/                    # API routes
│   │   ├── projects/           # Projects CRUD
│   │   ├── contact/            # Contact form
│   │   ├── newsletter/         # Newsletter subscriptions
│   │   ├── certifications/     # Certifications API
│   │   ├── achievements/       # Achievements API
│   │   ├── views/              # Analytics API
│   │   └── cache/              # Cache management
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── error.tsx               # Error boundary
│   └── not-found.tsx           # 404 page
│
├── components/
│   ├── Hero.tsx                # Hero section
│   ├── Projects.tsx            # Projects showcase
│   ├── BestWork.tsx            # Featured work
│   ├── SkillsWithChart.tsx     # Skills display
│   ├── Certifications.tsx      # Certifications
│   ├── Achievements.tsx        # Achievements
│   ├── DSAJourney.tsx          # Coding journey
│   ├── Navbar.tsx              # Navigation
│   ├── Footer.tsx              # Footer
│   ├── LoadingScreen.tsx       # Loading state
│   ├── OfflineScreen.tsx       # Offline state
│   ├── Toast.tsx               # Notifications
│   └── ui/                     # Reusable UI components
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Supabase client
│   │   ├── queries.ts          # Database queries
│   │   └── storage.ts          # File storage
│   ├── upstash/
│   │   ├── redis.ts            # Redis client
│   │   └── cache-manager.ts    # Cache utilities
│   ├── types/
│   │   └── database.ts         # TypeScript types
│   ├── animations.ts           # Animation utilities
│   └── utils.ts                # Helper functions
│
├── hooks/
│   └── useLoadingState.ts      # Custom hooks
│
├── public/
│   ├── images/                 # Static images
│   ├── gallery-images/         # Gallery photos
│   └── svgs/                   # SVG icons
│
├── supabase/
│   ├── schema.sql              # Database schema
│   ├── seed.sql                # Sample data
│   ├── achievements_schema.sql # Achievements tables
│   └── achievements_seed.sql   # Achievements data
│
├── Documentation Files
│   ├── PROJECT_OVERVIEW.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── CACHE_MANAGEMENT_GUIDE.md
│   ├── SUPABASE_SETUP_GUIDE.md
│   └── ... (20+ guide files)
│
├── Configuration Files
│   ├── next.config.ts          # Next.js config
│   ├── tailwind.config.ts      # Tailwind config
│   ├── tsconfig.json           # TypeScript config
│   ├── package.json            # Dependencies
│   └── vercel.json             # Vercel config
│
└── README.md                   # This file
```

---

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`components/Hero.tsx`)
```typescript
const name = "Your Name";
const roles = ["Developer", "Designer"];
```

2. **Metadata** (`app/layout.tsx`)
```typescript
export const metadata = {
  title: "Your Name - Portfolio",
  description: "Your description",
};
```

3. **Social Links** (`components/Footer.tsx`)
```typescript
const socialLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
};
```

### Customize Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: "#0F172A",      // Dark blue background
  secondary: "#7C3AED",    // Purple accent
  accent: "#06B6D4",       // Cyan accent
  textLight: "#F8FAFC",    // Light text
  subtle: "#64748B",       // Muted text
}
```

### Add New Sections

1. Create component in `components/`
2. Import in `app/page.tsx`
3. Add to navigation in `components/Navbar.tsx`

---

## 📊 Analytics & Monitoring

### Page View Tracking

Automatically tracks:
- Page path
- Visitor fingerprint (hashed IP + user agent)
- Device type (mobile/tablet/desktop)
- Referrer
- Timestamp

### View Analytics

Query the database:
```sql
SELECT 
  page_path, 
  COUNT(*) as views,
  COUNT(DISTINCT visitor_id) as unique_visitors
FROM page_views
WHERE viewed_at >= NOW() - INTERVAL '30 days'
GROUP BY page_path
ORDER BY views DESC;
```

### Cache Performance

Check cache hit rates:
```bash
GET /api/cache
```

---

## 🔒 Security

### Implemented Security Measures

1. **Environment Variables** - Sensitive data not exposed
2. **Rate Limiting** - Prevents API abuse
3. **Input Validation** - Email, phone, text validation
4. **SQL Injection Protection** - Supabase parameterized queries
5. **XSS Protection** - React's built-in escaping
6. **CORS Configuration** - Restricted origins
7. **Service Role Key** - Kept server-side only

### Best Practices

- ✅ Never commit `.env` files
- ✅ Rotate API keys regularly
- ✅ Use Supabase Row Level Security (RLS)
- ✅ Implement CAPTCHA for forms (optional)
- ✅ Monitor rate limit violations

---

## 🧪 Testing

### Run Tests (if configured)

```bash
npm run test
```

### Manual Testing Checklist

- [ ] Contact form submission
- [ ] Newsletter subscription
- [ ] Project filtering
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states
- [ ] Error handling
- [ ] Offline mode
- [ ] Page view tracking
- [ ] Rate limiting
- [ ] Cache functionality

---

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules/.cache
npm run build
```

**Database connection fails:**
- Check Supabase URL and keys in `.env.local`
- Verify IP is allowed in Supabase settings
- Check network connectivity

**Redis rate limiting not working:**
- Verify Upstash credentials
- Check Redis connection in Upstash dashboard
- Ensure rate limiter is properly initialized

**Images not loading:**
- Check Supabase Storage bucket permissions
- Verify image URLs are correct
- Enable CORS in Supabase Storage

---

## 📚 Additional Resources

### Documentation Files

This project includes 20+ detailed guide files:

- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `SUPABASE_SETUP_GUIDE.md` - Database setup guide
- `CACHE_MANAGEMENT_GUIDE.md` - Caching strategies
- `EMAIL_SETUP_GUIDE.md` - EmailJS integration
- `PROJECTS_SETUP_GUIDE.md` - Managing projects
- `OPTIMIZATION_COMPLETE.md` - Performance tips
- And many more in the root directory!

### Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Upstash Redis](https://docs.upstash.com/redis)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m "Add amazing feature"
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation if needed
- Test your changes thoroughly
- Add comments for complex logic

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🌟 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For seamless deployment
- **Supabase** - For the powerful backend
- **Upstash** - For Redis caching
- **Open Source Community** - For incredible tools and libraries

---

## 📞 Contact

**Your Name**
- Portfolio: [your-portfolio.vercel.app](https://portfolio-nbytkw50u-rajj28s-projects.vercel.app)
- GitHub: [@rajj28](https://github.com/rajj28)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

**Star History:**

[![Star History Chart](https://api.star-history.com/svg?repos=rajj28/portfolio&type=Date)](https://star-history.com/#rajj28/portfolio&Date)

---

<div align="center">
  <strong>Made with ❤️ using Next.js, TypeScript, and Supabase</strong>
  
  <br/>
  <br/>
  
  **[View Live Demo](https://portfolio-nbytkw50u-rajj28s-projects.vercel.app)** • **[Report Bug](https://github.com/rajj28/portfolio/issues)** • **[Request Feature](https://github.com/rajj28/portfolio/issues)**
</div>
