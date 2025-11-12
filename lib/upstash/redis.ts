import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Initialize Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiters for different use cases
export const rateLimiters = {
  // Contact form: 5 submissions per hour per IP
  contact: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    analytics: true,
    prefix: 'ratelimit:contact',
  }),

  // Newsletter: 3 subscriptions per day per IP
  newsletter: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 d'),
    analytics: true,
    prefix: 'ratelimit:newsletter',
  }),

  // API: 100 requests per minute per IP
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'),
    analytics: true,
    prefix: 'ratelimit:api',
  }),

  // Page views: Unlimited, but cache for 1 minute per visitor
  pageView: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, '1 m'),
    analytics: false,
    prefix: 'ratelimit:pageview',
  }),
};

// Cache utilities
export const cache = {
  // Get cached data
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data as T | null;
  },

  // Set cached data with TTL (in seconds)
  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    await redis.set(key, JSON.stringify(value), { ex: ttl });
  },

  // Delete cached data
  async delete(key: string): Promise<void> {
    await redis.del(key);
  },

  // Increment counter (for view counts, etc.)
  async increment(key: string, by: number = 1): Promise<number> {
    return await redis.incrby(key, by);
  },

  // Get counter value
  async getCount(key: string): Promise<number> {
    const count = await redis.get(key);
    return typeof count === 'number' ? count : 0;
  },
};

// Cache keys generator
export const cacheKeys = {
  projects: () => 'projects:all',
  project: (slug: string) => `projects:${slug}`,
  certifications: () => 'certifications:all',
  skills: () => 'skills:all',
  views: (path: string) => `views:${path}`,
  testimonials: () => 'testimonials:approved',
  achievements: () => 'achievements:all',
  awards: () => 'awards:all',
  achievementStats: () => 'achievement-stats:all',
  participationCertificates: () => 'participation_certificates:all',
};

