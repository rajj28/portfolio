import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { CacheManager, CACHE_KEYS, CACHE_DURATIONS } from '@/lib/upstash/cache-manager';

export async function GET() {
  try {
    // Try to get from cache first
    const cachedData = await CacheManager.get<{ certifications: any[] }>(CACHE_KEYS.CERTIFICATIONS);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Fetch certifications from database
    const { data, error } = await (supabase
      .from('certifications') as any)
      .select('*')
      .order('issued_date', { ascending: false });

    if (error) {
      console.error('Certifications database error:', error);
      throw new Error('Failed to fetch certifications');
    }

    const responseData = {
      certifications: data || [],
    };

    // Cache for 24 hours (certifications don't change often)
    await CacheManager.set(CACHE_KEYS.CERTIFICATIONS, responseData, CACHE_DURATIONS.CERTIFICATIONS);

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('Certifications API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}

