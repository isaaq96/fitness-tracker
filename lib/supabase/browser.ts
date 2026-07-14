import { createBrowserClient } from "@supabase/ssr";

import { env } from "@/lib/env";

export function createSupabaseBrowserClient() {
  if (!env.hasSupabase) {
    return null;
  }

  return createBrowserClient(
    env.supabaseUrl,
    env.supabasePublishableKey,
  );
}
