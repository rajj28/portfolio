import { supabase } from './client';
import { cache, cacheKeys } from '../upstash/redis';
import type { Project, Certification, Skill, Testimonial } from '../types/database';

/**
 * Fetch all published projects with caching
 */
export async function getProjects(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Project[]> {
  const cacheKey = `${cacheKeys.projects()}:${options?.category || 'all'}:${options?.featured || 'all'}`;
  
  // Try cache first
  const cached = await cache.get<Project[]>(cacheKey);
  if (cached) return cached;

  // Build query
  let query = (supabase
    .from('projects') as any)
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }

  // Cache for 1 hour
  await cache.set(cacheKey, data || [], 3600);

  return data || [];
}

/**
 * Fetch single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const cacheKey = cacheKeys.project(slug);
  
  // Try cache first
  const cached = await cache.get<Project>(cacheKey);
  if (cached) return cached;

  const { data, error } = await (supabase
    .from('projects') as any)
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    console.error('Failed to fetch project:', error);
    return null;
  }

  // Cache for 1 hour
  await cache.set(cacheKey, data, 3600);

  return data;
}

/**
 * Fetch all certifications
 */
export async function getCertifications(options?: {
  featured?: boolean;
  limit?: number;
}): Promise<Certification[]> {
  const cacheKey = `${cacheKeys.certifications()}:${options?.featured || 'all'}`;
  
  // Try cache first
  const cached = await cache.get<Certification[]>(cacheKey);
  if (cached) return cached;

  let query = (supabase
    .from('certifications') as any)
    .select('*')
    .order('issued_date', { ascending: false });

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Failed to fetch certifications:', error);
    return [];
  }

  // Cache for 1 hour
  await cache.set(cacheKey, data || [], 3600);

  return data || [];
}

/**
 * Fetch all skills grouped by category
 */
export async function getSkills(): Promise<{
  [category: string]: Skill[];
}> {
  const cacheKey = cacheKeys.skills();
  
  // Try cache first
  const cached = await cache.get<{ [category: string]: Skill[] }>(cacheKey);
  if (cached) return cached;

  const { data, error } = await (supabase
    .from('skills') as any)
    .select('*')
    .order('category')
    .order('display_order');

  if (error) {
    console.error('Failed to fetch skills:', error);
    return {};
  }

  // Group by category
  const grouped = (data || []).reduce((acc: { [category: string]: Skill[] }, skill: any) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as { [category: string]: Skill[] });

  // Cache for 1 day (skills don't change often)
  await cache.set(cacheKey, grouped, 86400);

  return grouped;
}

/**
 * Fetch approved testimonials
 */
export async function getTestimonials(options?: {
  featured?: boolean;
  projectId?: string;
  limit?: number;
}): Promise<Testimonial[]> {
  const cacheKey = `${cacheKeys.testimonials()}:${options?.featured || 'all'}:${options?.projectId || 'all'}`;
  
  // Try cache first
  const cached = await cache.get<Testimonial[]>(cacheKey);
  if (cached) return cached;

  let query = (supabase
    .from('testimonials') as any)
    .select('*')
    .eq('is_approved', true)
    .order('display_order');

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.projectId) {
    query = query.eq('project_id', options.projectId);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Failed to fetch testimonials:', error);
    return [];
  }

  // Cache for 1 hour
  await cache.set(cacheKey, data || [], 3600);

  return data || [];
}

/**
 * Invalidate cache for a specific resource
 */
export async function invalidateCache(resource: 'projects' | 'certifications' | 'skills' | 'testimonials') {
  const patterns = {
    projects: 'projects:*',
    certifications: 'certifications:*',
    skills: 'skills:*',
    testimonials: 'testimonials:*',
  };

  // Note: Redis SCAN would be better for production
  // For now, we'll just delete the main keys
  const keys = {
    projects: [cacheKeys.projects()],
    certifications: [cacheKeys.certifications()],
    skills: [cacheKeys.skills()],
    testimonials: [cacheKeys.testimonials()],
  };

  for (const key of keys[resource]) {
    await cache.delete(key);
  }
}

