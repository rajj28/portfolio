import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data: files, error: listError } = await supabaseAdmin
      .storage
      .from('participationcertificate')
      .list('', { 
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (listError || !files) {
      console.error('Failed to fetch certificates:', listError);
      return NextResponse.json({ certificates: [] });
    }

    // Get public URLs
    const certificates = files.map(file =>
      supabaseAdmin
        .storage
        .from('participationcertificate')
        .getPublicUrl(file.name)
        .data.publicUrl
    );

    return NextResponse.json({ 
      certificates,
      count: certificates.length
    });

  } catch (error) {
    console.error('Exception fetching certificates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
}

// Optional: Add caching
export const revalidate = 3600; // Revalidate every hour