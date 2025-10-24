import { NextRequest, NextResponse } from 'next/server';
import { CacheManager, CACHE_KEYS } from '@/lib/upstash/cache-manager';

/**
 * Cache Management API
 * 
 * GET /api/cache - Get cache status
 * DELETE /api/cache?key=certifications - Invalidate specific cache
 * DELETE /api/cache?all=true - Clear all cache
 */

export async function GET() {
  try {
    const stats = await CacheManager.getStats();
    
    return NextResponse.json({
      message: 'Cache status',
      caches: stats,
      keys: CACHE_KEYS,
    });
  } catch (error) {
    console.error('Cache stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get cache stats' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');
    const all = searchParams.get('all');

    // Clear all cache
    if (all === 'true') {
      await CacheManager.clearAll();
      return NextResponse.json({
        message: 'All cache cleared successfully',
      });
    }

    // Clear specific cache
    if (key) {
      const cacheKey = CACHE_KEYS[key.toUpperCase() as keyof typeof CACHE_KEYS];
      if (!cacheKey) {
        return NextResponse.json(
          { error: `Invalid cache key: ${key}. Valid keys: ${Object.keys(CACHE_KEYS).join(', ')}` },
          { status: 400 }
        );
      }
      
      await CacheManager.invalidate(cacheKey);
      return NextResponse.json({
        message: `Cache cleared: ${key}`,
        key: cacheKey,
      });
    }

    return NextResponse.json(
      { error: 'Please provide either ?key=certifications or ?all=true' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Cache invalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to invalidate cache' },
      { status: 500 }
    );
  }
}

