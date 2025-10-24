import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { redis } from '@/lib/upstash/redis';

export async function GET() {
  try {
    const supabase = createClient();

    // Try to get from cache first
    let cachedData;
    try {
      cachedData = await redis.get('achievements:all');
      if (cachedData) {
        return NextResponse.json(cachedData);
      }
    } catch (redisError) {
      console.warn('Redis cache unavailable, fetching from database:', redisError);
    }

    // Fetch all achievements data in parallel
    const [achievementsRes, awardsRes, statsRes] = await Promise.all([
      supabase
        .from('achievements')
        .select('*')
        .order('display_order', { ascending: true })
        .order('date', { ascending: false }),
      
      supabase
        .from('awards')
        .select('*')
        .order('display_order', { ascending: true })
        .order('year', { ascending: false }),
      
      supabase
        .from('achievement_stats')
        .select('*')
        .order('display_order', { ascending: true }),
    ]);

    if (achievementsRes.error) throw achievementsRes.error;
    if (awardsRes.error) throw awardsRes.error;
    if (statsRes.error) throw statsRes.error;

    const data = {
      achievements: achievementsRes.data || [],
      awards: awardsRes.data || [],
      stats: statsRes.data || [],
    };

    // Cache for 5 minutes
    try {
      await redis.set('achievements:all', data, { ex: 300 });
    } catch (cacheError) {
      console.warn('Failed to cache achievements:', cacheError);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Achievements API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    );
  }
}

