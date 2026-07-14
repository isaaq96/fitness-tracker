import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { env } from "@/lib/env";

export async function createSupabaseServerClient() {
  if (!env.hasSupabase) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(env.supabaseUrl, env.supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Writable cookies are not available in every server context.
        }
      },
    },
  });
}
