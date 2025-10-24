import { supabaseAdmin } from './client';

// Storage bucket names
export const STORAGE_BUCKETS = {
  PROJECTS: 'projects',
  CERTIFICATIONS: 'certifications',
  ACHIEVEMENTS: 'achievements',
  AVATARS: 'avatars',
  THUMBNAILS: 'thumbnails',
} as const;

/**
 * Upload image to Supabase Storage
 */
export async function uploadImage(
  file: File,
  bucket: keyof typeof STORAGE_BUCKETS,
  path?: string
): Promise<{ url: string; path: string } | { error: string }> {
  try {
    const bucketName = STORAGE_BUCKETS[bucket];
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    // Upload file
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return { error: error.message };
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return { error: 'Failed to upload image' };
  }
}

/**
 * Delete image from Supabase Storage
 */
export async function deleteImage(
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const bucketName = STORAGE_BUCKETS[bucket];

    const { error } = await supabaseAdmin.storage
      .from(bucketName)
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: 'Failed to delete image' };
  }
}

/**
 * Get signed URL for private images (expires in 1 hour)
 */
export async function getSignedUrl(
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string,
  expiresIn: number = 3600
): Promise<{ url: string } | { error: string }> {
  try {
    const bucketName = STORAGE_BUCKETS[bucket];

    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .createSignedUrl(path, expiresIn);

    if (error || !data) {
      console.error('Signed URL error:', error);
      return { error: error?.message || 'Failed to create signed URL' };
    }

    return { url: data.signedUrl };
  } catch (error) {
    console.error('Signed URL error:', error);
    return { error: 'Failed to create signed URL' };
  }
}

/**
 * Upload multiple images at once
 */
export async function uploadMultipleImages(
  files: File[],
  bucket: keyof typeof STORAGE_BUCKETS,
  path?: string
): Promise<Array<{ url: string; path: string }>> {
  const uploadPromises = files.map((file) => uploadImage(file, bucket, path));
  const results = await Promise.all(uploadPromises);
  
  return results
    .filter((result): result is { url: string; path: string } => 'url' in result);
}

/**
 * Optimize image URL (for responsive images)
 */
export function getOptimizedImageUrl(
  url: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpg' | 'png';
  }
): string {
  // If using Supabase Image Transformation (Pro plan)
  // You can add transformation parameters to the URL
  // For now, return the original URL
  
  // Example with Supabase Image Transformation:
  // const params = new URLSearchParams();
  // if (options?.width) params.append('width', options.width.toString());
  // if (options?.height) params.append('height', options.height.toString());
  // if (options?.quality) params.append('quality', options.quality.toString());
  // if (options?.format) params.append('format', options.format);
  // return `${url}?${params.toString()}`;
  
  return url;
}

