import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { CacheManager, CACHE_DURATIONS } from '@/lib/upstash/cache-manager';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    // Build cache key
    const cacheKey = `projects:all:${category || 'all'}:${featured || 'all'}:${limit || 'all'}`;

    // Try to get from cache
    const cachedData = await CacheManager.get<any[]>(cacheKey);
    if (cachedData) {
      return NextResponse.json({
        data: cachedData,
        cached: true,
      });
    }

    // Build query
    let query = supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    // Execute query
    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    // Cache for 1 hour
    await CacheManager.set(cacheKey, data || [], CACHE_DURATIONS.PROJECTS);

    return NextResponse.json({
      data: data || [],
      cached: false,
    });
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

