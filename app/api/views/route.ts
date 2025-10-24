import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { cache, cacheKeys, rateLimiters } from '@/lib/upstash/redis';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, title } = body;

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    // Get visitor information
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous';
    const userAgent = req.headers.get('user-agent') || '';
    const referrer = req.headers.get('referer') || null;

    // Create visitor fingerprint
    const visitorId = crypto
      .createHash('sha256')
      .update(`${ip}:${userAgent}`)
      .digest('hex');

    // Rate limit: Only count 1 view per path per visitor per minute
    const { success } = await rateLimiters.pageView.limit(`${visitorId}:${path}`);
    
    if (!success) {
      // Already viewed recently, return cached count
      const count = await cache.getCount(cacheKeys.views(path));
      return NextResponse.json({ views: count, counted: false });
    }

    // Parse user agent for device info (basic)
    const isMobile = /mobile/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    // Insert page view
    const { error } = await (supabaseAdmin.from('page_views') as any).insert({
      page_path: path,
      page_title: title || null,
      visitor_id: visitorId,
      session_id: null, // You can implement session tracking if needed
      referrer,
      user_agent: userAgent,
      ip_address: ip,
      device_type: deviceType,
      viewed_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Failed to record page view:', error);
    }

    // Increment cached view count
    const viewCount = await cache.increment(cacheKeys.views(path));

    return NextResponse.json({ 
      views: viewCount,
      counted: true,
    });
  } catch (error) {
    console.error('Views API error:', error);
    return NextResponse.json(
      { error: 'Failed to record view' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    // Get cached view count
    const views = await cache.getCount(cacheKeys.views(path));

    return NextResponse.json({ views });
  } catch (error) {
    console.error('Views API error:', error);
    return NextResponse.json(
      { error: 'Failed to get views' },
      { status: 500 }
    );
  }
}
