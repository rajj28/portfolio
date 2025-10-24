import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { rateLimiters } from '@/lib/upstash/redis';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous';
    const { success, limit, remaining, reset } = await rateLimiters.contact.limit(ip);

    if (!success) {
      return NextResponse.json(
        { 
          error: 'Too many submissions. Please try again later.',
          limit,
          remaining,
          reset: new Date(reset).toISOString(),
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { name, email, phone, company, subject, message, type = 'general' } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get metadata
    const userAgent = req.headers.get('user-agent') || null;
    const referrer = req.headers.get('referer') || null;

    // Insert into database
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject: subject || null,
        message,
        type,
        priority: 'normal',
        status: 'new',
        ip_address: ip,
        user_agent: userAgent,
        referrer,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to submit message' },
        { status: 500 }
      );
    }

    // TODO: Send email notification (optional)
    // await sendContactNotificationEmail(data);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        remaining,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
