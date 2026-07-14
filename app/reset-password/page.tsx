import Link from "next/link";
import { ArrowLeft, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";

import { updatePasswordAction } from "@/app/actions/auth";
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
        <div className="flex items-center gap-3">
          <div className="logo-badge flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-orange-200/50">
            <LockKeyhole className="logo-dumbbell h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold">ForgeFlow</p>
            <p className="text-sm text-[var(--ink-soft)]">
              Secure your training account.
            </p>
          </div>
        </div>

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
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                {getResetErrorMessage(error)}
              </div>
            ) : null}

            {updated ? (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700" />
                  <div>
                    <p className="section-title text-emerald-800">Updated</p>
                    <h2 className="mt-2 text-xl font-semibold text-emerald-950">
                      Password saved successfully
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-emerald-900">
                      Your account is ready to use with the new password.
                    </p>
                    <Link
                      href="/today"
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
                    >
                      Continue to dashboard
                    </Link>
                  </div>
                </div>
              </div>
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
                <ResetField
                  label="New password"
                  name="password"
                  placeholder="At least 8 characters"
                />
                <ResetField
                  label="Confirm password"
                  name="confirmPassword"
                  placeholder="Repeat your new password"
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

type ResetFieldProps = {
  label: string;
  name: string;
  placeholder: string;
};

function ResetField({ label, name, placeholder }: ResetFieldProps) {
  return (
    <label className="block">
      <span className="section-title">{label}</span>
      <input
        required
        type="password"
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-base outline-none placeholder:text-[var(--ink-soft)]/70"
      />
    </label>
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
