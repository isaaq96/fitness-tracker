"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { env } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.email(),
  next: z.string().default("/today"),
});

export async function sendMagicLinkAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    next: formData.get("next") ?? "/today",
  });

  if (!parsed.success) {
    redirect("/login?error=invalid-email");
  }

  if (!env.hasSupabase) {
    redirect("/login?error=missing-env");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login?error=missing-env");
  }

  const headerStore = await headers();
  const origin =
    headerStore.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(parsed.data.next)}`,
    },
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    `/login?sent=1&email=${encodeURIComponent(parsed.data.email)}`,
  );
}

export async function signOutAction() {
  if (env.hasSupabase) {
    const supabase = await createSupabaseServerClient();
    await supabase?.auth.signOut();
  }

  redirect("/login");
}
