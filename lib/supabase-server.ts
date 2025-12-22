import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * Creates a Supabase client for use in Server Components, Server Actions, and Route Handlers.
 * Uses anon key and respects RLS policies.
 * Note: For cookie-based auth, consider using @supabase/ssr package.
 */
export function createServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Creates a Supabase admin client that bypasses RLS.
 * Use this for server-side API routes that need to read data without RLS restrictions.
 * WARNING: Only use this on the server side, never expose the service role key to the client!
 */
export function createAdminClient() {
  if (!supabaseServiceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set, falling back to anon key. RLS policies will apply.');
    return createClient(supabaseUrl, supabaseAnonKey);
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

