// import { createBrowserClient } from "@supabase/ssr";

// export const createClient = () =>
//   createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   );


// utils/supabase/client.ts

// utils/supabase/client.ts

import { createClient } from '@supabase/supabase-js';  // Use createClient directly

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

