import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { cache, cacheKeys } from '@/lib/upstash/redis';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Try cache first
    const cacheKey = cacheKeys.project(slug);
    const cached = await cache.get(cacheKey);
    
    if (cached) {
      return NextResponse.json({ data: cached, cached: true });
    }

    // Fetch from database
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Cache for 1 hour
    await cache.set(cacheKey, data, 3600);

    return NextResponse.json({ data, cached: false });
  } catch (error) {
    console.error('Project detail error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

