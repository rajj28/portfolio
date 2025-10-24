import { redis } from './redis';

/**
 * Cache duration constants (in seconds)
 * OPTIMIZED FOR FREE TIER: Longer durations = fewer Redis commands
 */
export const CACHE_DURATIONS = {
  // Static content (rarely changes) - EXTENDED for free tier
  CERTIFICATIONS: 604800,     // 7 days (rarely updated)
  SKILLS: 604800,             // 7 days (rarely updated)
  
  // Semi-static content - OPTIMIZED
  PROJECTS: 21600,            // 6 hours (balanced freshness/cache hits)
  ACHIEVEMENTS: 86400,        // 24 hours (don't change often)
  AWARDS: 86400,              // 24 hours (don't change often)
  STATS: 86400,               // 24 hours (stats can be stale)
  
  // Dynamic content - REDUCED (but still reasonable)
  TESTIMONIALS: 1800,         // 30 minutes
  BLOG_POSTS: 1800,           // 30 minutes
  
  // Page views - REMOVED (too frequent, use client-side)
  PAGE_VIEWS: 0,              // Don't cache (handle client-side or in-memory)
} as const;

/**
 * Cache key patterns
 */
export const CACHE_KEYS = {
  CERTIFICATIONS: 'certifications:all',
  PROJECTS: 'projects:all',
  ACHIEVEMENTS: 'achievements:all',
  AWARDS: 'awards:all',
  STATS: 'achievement-stats:all',
  SKILLS: 'skills:all',
  TESTIMONIALS: 'testimonials:approved',
} as const;

/**
 * Cache Manager - Utilities for managing Redis cache
 */
export class CacheManager {
  /**
   * Get data from cache
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      // Only log in development
      if (process.env.NODE_ENV !== 'production') {
        if (data) {
          console.log(`✅ Cache HIT: ${key}`);
        } else {
          console.log(`❌ Cache MISS: ${key}`);
        }
      }
      return data as T | null;
    } catch (error) {
      console.warn(`Cache GET error for ${key}:`, error);
      return null;
    }
  }

  /**
   * Set data in cache with TTL
   */
  static async set<T>(key: string, value: T, ttl: number): Promise<void> {
    try {
      // Skip caching if TTL is 0 (free tier optimization)
      if (ttl === 0) return;
      
      await redis.set(key, JSON.stringify(value), { ex: ttl });
      if (process.env.NODE_ENV !== 'production') {
        console.log(`💾 Cached: ${key} (TTL: ${ttl}s)`);
      }
    } catch (error) {
      console.warn(`Cache SET error for ${key}:`, error);
    }
  }

  /**
   * Delete specific cache key
   */
  static async invalidate(key: string): Promise<void> {
    try {
      await redis.del(key);
      console.log(`🗑️  Cache invalidated: ${key}`);
    } catch (error) {
      console.warn(`Cache DELETE error for ${key}:`, error);
    }
  }

  /**
   * Delete all cache keys matching a pattern
   */
  static async invalidatePattern(pattern: string): Promise<void> {
    try {
      // For projects, we need to clear all variations
      // projects:all:*, projects:all:all:*, etc.
      if (pattern === 'projects') {
        // Delete known project cache key variations
        const projectKeys = [
          'projects:all',
          'projects:all:all:all:all',
          'projects:all:all:true:6',
          'projects:all:all:true:all',
          'projects:all:all:false:all',
        ];
        for (const key of projectKeys) {
          await redis.del(key);
          console.log(`🗑️  Deleted: ${key}`);
        }
      } else {
        const keys = Object.values(CACHE_KEYS).filter(k => k.includes(pattern));
        for (const key of keys) {
          await redis.del(key);
        }
      }
      console.log(`🗑️  Cache pattern invalidated: ${pattern}`);
    } catch (error) {
      console.warn(`Cache pattern DELETE error for ${pattern}:`, error);
    }
  }

  /**
   * Clear ALL cache (use with caution!)
   */
  static async clearAll(): Promise<void> {
    try {
      // Clear base cache keys
      const keys = Object.values(CACHE_KEYS);
      for (const key of keys) {
        await redis.del(key);
      }
      
      // Clear ALL project variations (dynamic keys)
      // Use SCAN to find all project keys instead of hardcoding
      try {
        // Manually clear known patterns
        const projectKeys = [
          'projects:all',
          'projects:all:all:all:all',
          'projects:all:all:true:6',
          'projects:all:all:true:all',
          'projects:all:all:false:all',
          'projects:all:all:true:1',
          'projects:all:all:true:10',
        ];
        for (const key of projectKeys) {
          await redis.del(key);
        }
      } catch (err) {
        console.warn('Error clearing project cache variations:', err);
      }
      
      console.log('🗑️  ALL cache cleared!');
    } catch (error) {
      console.warn('Cache CLEAR ALL error:', error);
    }
  }

  /**
   * Get cache stats
   */
  static async getStats(): Promise<{ key: string; exists: boolean }[]> {
    const stats = [];
    for (const [name, key] of Object.entries(CACHE_KEYS)) {
      try {
        const exists = await redis.exists(key);
        stats.push({ key: name, exists: exists === 1 });
      } catch (error) {
        stats.push({ key: name, exists: false });
      }
    }
    return stats;
  }
}

/**
 * Convenience functions for specific resources
 */
export const cacheHelpers = {
  // Invalidate certifications cache (call this after adding/updating certs)
  invalidateCertifications: () => CacheManager.invalidate(CACHE_KEYS.CERTIFICATIONS),
  
  // Invalidate projects cache
  invalidateProjects: () => CacheManager.invalidate(CACHE_KEYS.PROJECTS),
  
  // Invalidate achievements cache
  invalidateAchievements: () => CacheManager.invalidate(CACHE_KEYS.ACHIEVEMENTS),
  
  // Invalidate all achievement-related caches
  invalidateAllAchievements: async () => {
    await CacheManager.invalidate(CACHE_KEYS.ACHIEVEMENTS);
    await CacheManager.invalidate(CACHE_KEYS.AWARDS);
    await CacheManager.invalidate(CACHE_KEYS.STATS);
  },
};

