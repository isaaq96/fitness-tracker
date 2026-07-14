"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { env } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const signUpSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    next: z.string().default("/today"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords-dont-match",
    path: ["confirmPassword"],
  });

export async function signInWithPasswordAction(formData: FormData) {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0]?.path[0];
    redirect(
      `/login?mode=signin&error=${issue === "email" ? "invalid-email" : "invalid-password"}`,
    );
  }

  if (!env.hasSupabase) {
    redirect("/login?mode=signin&error=missing-env");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login?mode=signin&error=missing-env");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    redirect(`/login?mode=signin&error=${encodeURIComponent(error.message)}`);
  }

  redirect("/today");
}

export async function signUpWithPasswordAction(formData: FormData) {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    next: formData.get("next") ?? "/today",
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const issuePath = firstIssue?.path[0];
    const error =
      firstIssue?.message === "passwords-dont-match"
        ? "passwords-dont-match"
        : issuePath === "email"
          ? "invalid-email"
          : "invalid-password";

    redirect(`/login?mode=signup&error=${error}`);
  }

  if (!env.hasSupabase) {
    redirect("/login?mode=signup&error=missing-env");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login?mode=signup&error=missing-env");
  }

  const headerStore = await headers();
  const origin = getSiteOrigin(headerStore);

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(parsed.data.next)}`,
    },
  });

  if (error) {
    redirect(`/login?mode=signup&error=${encodeURIComponent(error.message)}`);
  }

  if (data.session) {
    redirect("/today");
  }

  redirect(`/login?mode=signin&created=1&email=${encodeURIComponent(parsed.data.email)}`);
}

function getSiteOrigin(headerStore: Headers) {
  const directOrigin = headerStore.get("origin");

  if (directOrigin) {
    return directOrigin.replace(/\/$/, "");
  }

  const forwardedHost = headerStore.get("x-forwarded-host");

  if (forwardedHost) {
    const forwardedProto = headerStore.get("x-forwarded-proto") ?? "https";
    return `${forwardedProto}://${forwardedHost}`.replace(/\/$/, "");
  }

  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000";

  const normalizedUrl = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;

  return normalizedUrl.replace(/\/$/, "");
}

export async function signOutAction() {
  if (env.hasSupabase) {
    const supabase = await createSupabaseServerClient();
    await supabase?.auth.signOut();
  }

  redirect("/login");
}
