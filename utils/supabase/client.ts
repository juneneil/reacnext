import { createClient } from '@supabase/supabase-js';

// Ensure these values are available as environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("supabaseUrl or supabaseKey is missing");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

