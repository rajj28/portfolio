import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { rateLimiters } from '@/lib/upstash/redis';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous';
    const { success, remaining } = await rateLimiters.newsletter.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many subscription attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { email, name, interests = [] } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const { data: existing } = await (supabaseAdmin
      .from('newsletter_subscribers') as any)
      .select('id, status')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        );
      } else if (existing.status === 'unsubscribed') {
        // Reactivate subscription
        const { error } = await (supabaseAdmin
          .from('newsletter_subscribers') as any)
          .update({
            status: 'active',
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null,
          })
          .eq('id', existing.id);

        if (error) {
          return NextResponse.json(
            { error: 'Failed to reactivate subscription' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        });
      }
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Insert new subscriber
    const { error } = await (supabaseAdmin
      .from('newsletter_subscribers') as any)
      .insert({
        email,
        name: name || null,
        status: 'active',
        verified: false,
        verification_token: verificationToken,
        interests: interests.length > 0 ? interests : null,
        source: 'website',
        ip_address: ip,
      });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    // TODO: Send verification email
    // await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for subscribing! Check your email to confirm.',
        remaining,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
