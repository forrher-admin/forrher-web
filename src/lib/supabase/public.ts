import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

/** Cookie-free client for build-time / public reads only. */
export function createPublicClient() {
  const { url, publishableKey } = getSupabaseEnv();
  return createClient(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
