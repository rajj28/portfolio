import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/database';

// Client-side Supabase client (for browser)
export const supabase = createSupabaseClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side Supabase client (for API routes) - with service role key
export const supabaseAdmin = createSupabaseClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use this carefully - has admin privileges
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Export createClient function for API routes
export function createClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

