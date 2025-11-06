import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

/**
 * GET /api/achievements/videos
 * Fetch all videos from achievementsvedios bucket
 */
export async function GET() {
  try {
    const bucketName = 'achievementsvedios';

    // List all files in the bucket - fetch all with pagination
    let allFiles: any[] = [];
    let hasMore = true;
    let offset = 0;
    const limit = 100;

    while (hasMore) {
      const { data: files, error } = await (supabaseAdmin.storage
        .from(bucketName) as any)
        .list('', {
          limit,
          offset,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) {
        console.error('Error fetching videos:', error);
        return NextResponse.json(
          { error: 'Failed to fetch videos', details: error.message },
          { status: 500 }
        );
      }

      if (files && files.length > 0) {
        allFiles = [...allFiles, ...files];
        offset += limit;
        hasMore = files.length === limit;
      } else {
        hasMore = false;
      }
    }

    // Filter for video files (case-insensitive, including more formats)
    // Also log all files to debug
    console.log('All files in bucket:', allFiles.map(f => ({ name: f.name, metadata: f.metadata })));
    
    const videoFiles = allFiles.filter(file => {
      // Get file extension - handle multiple dots in filename
      const fileName = file.name.toLowerCase();
      const ext = fileName.split('.').pop()?.toLowerCase();
      
      // Check if it's a video by extension
      const videoExtensions = ['mp4', 'webm', 'mov', 'avi', 'mkv', 'm4v', 'flv', 'wmv', '3gp'];
      const isVideoByExt = videoExtensions.includes(ext || '');
      
      // Also check metadata if available (Supabase sometimes stores mime type)
      const mimeType = file.metadata?.mimetype || file.metadata?.contentType || '';
      const isVideoByMime = mimeType.startsWith('video/');
      
      // Check if filename contains video-related keywords (for files with wrong extensions like .55)
      const hasVideoKeyword = fileName.includes('video') || fileName.includes('vedio') || fileName.includes('whatsapp');
      
      // Include if: has video extension OR has video mime type OR (has video keyword AND extension is not a known non-video type)
      const knownNonVideoExts = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'txt', 'zip'];
      const isVideo = isVideoByExt || isVideoByMime || (hasVideoKeyword && !knownNonVideoExts.includes(ext || ''));
      
      if (!isVideo) {
        console.log(`Skipping non-video file: ${file.name} (ext: ${ext}, mime: ${mimeType})`);
      } else {
        console.log(`Including video file: ${file.name} (ext: ${ext}, mime: ${mimeType})`);
      }
      
      return isVideo;
    });
    
    console.log(`Filtered ${videoFiles.length} video files:`, videoFiles.map(f => f.name));

    // Get public URLs for each video
    const videos = videoFiles.map(file => {
      const { data: urlData } = (supabaseAdmin.storage
        .from(bucketName) as any)
        .getPublicUrl(file.name);

      return {
        id: file.id || file.name,
        name: file.name,
        url: urlData.publicUrl,
        created_at: file.created_at,
        updated_at: file.updated_at,
        size: file.metadata?.size || 0,
      };
    });

    console.log(`Found ${allFiles.length} total files, ${videoFiles.length} video files`);

    return NextResponse.json({
      videos,
      count: videos.length,
      debug: {
        totalFiles: allFiles.length,
        videoFiles: videoFiles.length,
      },
    });
  } catch (error: any) {
    console.error('Videos API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos', details: error.message },
      { status: 500 }
    );
  }
}

