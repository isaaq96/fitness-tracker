import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { updatePasswordAction } from "@/app/actions/auth";
import { AuthBanner } from "@/components/auth/auth-banner";
import { AuthField } from "@/components/auth/auth-field";
import { BrandLockup } from "@/components/auth/brand-lockup";
import { env } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ResetPasswordPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : "";
  const updated = params.updated === "1";

  let email = "";
  let hasSession = false;

  if (env.hasSupabase) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

    email = user?.email ?? "";
    hasSession = Boolean(user);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="soft-orb relative overflow-hidden rounded-[2.75rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(244,235,224,0.98))] px-5 py-6 shadow-[0_30px_90px_rgba(24,18,12,0.10)] sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <BrandLockup
          secure
          subtitle="Secure your training account."
        />

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-[2.25rem] border border-[var(--line)] bg-white/90 p-6 shadow-[0_24px_60px_rgba(32,22,16,0.08)] sm:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[var(--accent-wash)] p-3 text-[var(--accent-deep)]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="section-title">Password</p>
                <h1 className="mt-1 text-2xl font-semibold">
                  Choose a new password
                </h1>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
              Set a fresh password for {email || "your account"} and continue
              back into your training flow.
            </p>

            {!env.hasSupabase ? (
              <div className="mt-5 rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--surface-strong)] p-4 text-sm leading-6 text-[var(--ink-soft)]">
                Supabase env vars are not configured yet. Add
                `NEXT_PUBLIC_SUPABASE_URL` and
                `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` before using account
                recovery.
              </div>
            ) : null}

            {error ? (
              <AuthBanner tone="warning">{getResetErrorMessage(error)}</AuthBanner>
            ) : null}

            {updated ? (
              <AuthBanner tone="success">
                Password saved successfully. Your account is ready to use with
                the new password.
              </AuthBanner>
            ) : null}

            {updated ? (
              <Link
                href="/today"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                Continue to dashboard
              </Link>
            ) : null}

            {!updated && !hasSession ? (
              <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                <p className="text-sm leading-6 text-[var(--ink-soft)]">
                  This reset link is missing or has expired. Request a fresh one
                  from the sign-in page.
                </p>
                <Link
                  href="/login?mode=recover"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to recovery
                </Link>
              </div>
            ) : null}

            {!updated && hasSession ? (
              <form action={updatePasswordAction} className="mt-6 space-y-4">
                <AuthField
                  icon={null}
                  label="New password"
                  name="password"
                  placeholder="At least 8 characters"
                  type="password"
                />
                <AuthField
                  icon={null}
                  label="Confirm password"
                  name="confirmPassword"
                  placeholder="Repeat your new password"
                  type="password"
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
                  >
                    Save new password
                  </button>
                  <Link
                    href="/today"
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--accent)]"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function getResetErrorMessage(error: string) {
  if (error === "missing-env") {
    return "Supabase env vars are missing.";
  }

  if (error === "invalid-password") {
    return "Choose a password with at least 8 characters.";
  }

  if (error === "passwords-dont-match") {
    return "Your passwords do not match.";
  }

  if (error === "invalid-or-expired-link") {
    return "This reset link is no longer valid. Request a fresh email from sign in.";
  }

  return decodeURIComponent(error);
}
