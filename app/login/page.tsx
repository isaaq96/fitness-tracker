import Link from "next/link";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { clsx } from "clsx";

import {
  requestPasswordResetAction,
  signInWithPasswordAction,
  signUpWithPasswordAction,
} from "@/app/actions/auth";
import { AuthBanner } from "@/components/auth/auth-banner";
import { AuthField } from "@/components/auth/auth-field";
import { BrandLockup } from "@/components/auth/brand-lockup";
import { LoginShowcase } from "@/components/auth/login-showcase";
import { env } from "@/lib/env";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const mode = getMode(params.mode);
  const created = params.created === "1";
  const sent = params.sent === "1";
  const passwordReset = params.passwordReset === "1";
  const email = typeof params.email === "string" ? params.email : "";
  const error = typeof params.error === "string" ? params.error : "";

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="soft-orb relative overflow-hidden rounded-[2.75rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(244,235,224,0.98))] px-5 py-6 shadow-[0_30px_90px_rgba(24,18,12,0.10)] sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <BrandLockup subtitle="Training software that stays with the session." />

        <div className="mx-auto mt-10 max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[var(--ink)]">
              Workout logging
            </span>
            <span className="rounded-full bg-[var(--surface-strong)] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]">
              Exercise history
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]">
              Flexible programming
            </span>
          </div>

          <div className="mx-auto mt-8 max-w-4xl text-center">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)] sm:text-6xl">
              One place to run the workout, log the work, and keep the numbers
              close.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--ink-soft)] sm:text-xl">
              ForgeFlow keeps today&apos;s session, exact exercise history, and a
              clean next-set rhythm in one focused training flow.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.96fr_1fr] lg:items-center">
            <LoginShowcase mode={mode} side="left" />

            <section className="rounded-[2.35rem] border border-[var(--line)] bg-white/90 p-6 shadow-[0_24px_60px_rgba(32,22,16,0.08)] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[var(--accent-wash)] p-3 text-[var(--accent-deep)]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="section-title">Account</p>
                  <h2 className="mt-1 text-2xl font-semibold">
                    {mode === "signup"
                      ? "Create your account"
                      : mode === "recover"
                        ? "Reset your password"
                        : "Welcome back"}
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
                {mode === "signup"
                  ? "Create a secure account to keep your training plan, session history, and future edits in one place."
                  : mode === "recover"
                    ? "Enter your email and we&apos;ll send a secure link so you can choose a new password."
                    : "Sign in to pick up today&apos;s session and keep your training history moving forward."}
              </p>

              <div className="mt-6 inline-flex rounded-full border border-[var(--line)] bg-[var(--surface)] p-1">
                <Link
                  href="/login?mode=signin"
                  className={clsx(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    mode === "signin"
                      ? "bg-[var(--ink)] text-white"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]",
                  )}
                >
                  Sign in
                </Link>
                <Link
                  href="/login?mode=signup"
                  className={clsx(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    mode === "signup"
                      ? "bg-[var(--ink)] text-white"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]",
                  )}
                >
                  Create account
                </Link>
              </div>

              {mode === "recover" ? (
                <div className="mt-4">
                  <Link
                    href="/login?mode=signin"
                    className="text-sm font-medium text-[var(--accent-deep)]"
                  >
                    Back to sign in
                  </Link>
                </div>
              ) : null}

              {!env.hasSupabase ? (
                <div className="mt-5 rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--surface-strong)] p-4 text-sm leading-6 text-[var(--ink-soft)]">
                  Supabase env vars are not configured yet. Add
                  `NEXT_PUBLIC_SUPABASE_URL` and
                  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to `.env.local` for
                  local auth and to Vercel for deployment.
                </div>
              ) : null}

              {created ? (
                <AuthBanner tone="success">
                  If this email is new or still awaiting confirmation, check
                  your inbox{email ? ` at ${email}` : ""} before the first sign
                  in.
                </AuthBanner>
              ) : null}

              {sent ? (
                <AuthBanner tone="success">
                  Reset link sent{email ? ` to ${email}` : ""}. Open the email
                  and continue back here to choose a new password.
                </AuthBanner>
              ) : null}

              {passwordReset ? (
                <AuthBanner tone="success">
                  Password updated. Sign in with the new password to continue.
                </AuthBanner>
              ) : null}

              {error ? (
                <AuthBanner tone="warning">{getErrorMessage(error)}</AuthBanner>
              ) : null}

              {mode === "signup" ? (
                <form action={signUpWithPasswordAction} className="mt-6 space-y-4">
                  <input type="hidden" name="next" value="/today" />
                  <AuthField
                    defaultValue={email}
                    icon={<Mail className="h-5 w-5 text-[var(--ink-soft)]" />}
                    label="Email address"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                  />
                  <AuthField
                    icon={<LockKeyhole className="h-5 w-5 text-[var(--ink-soft)]" />}
                    label="Password"
                    name="password"
                    placeholder="At least 8 characters"
                    type="password"
                  />
                  <AuthField
                    icon={<LockKeyhole className="h-5 w-5 text-[var(--ink-soft)]" />}
                    label="Confirm password"
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    type="password"
                  />

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
                    >
                      Create account
                    </button>
                    <Link
                      href="/login?mode=signin"
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--accent)]"
                    >
                      Sign in instead
                    </Link>
                  </div>

                  <p className="text-sm leading-6 text-[var(--ink-soft)]">
                    If email confirmation is enabled in Supabase, we&apos;ll ask you
                    to verify your email before the first sign in.
                  </p>
                </form>
              ) : mode === "recover" ? (
                <form
                  action={requestPasswordResetAction}
                  className="mt-6 space-y-4"
                >
                  <AuthField
                    defaultValue={email}
                    icon={<Mail className="h-5 w-5 text-[var(--ink-soft)]" />}
                    label="Email address"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                  />

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
                    >
                      Send reset link
                    </button>
                    <Link
                      href="/login?mode=signin"
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--accent)]"
                    >
                      Back to sign in
                    </Link>
                  </div>

                  <p className="text-sm leading-6 text-[var(--ink-soft)]">
                    Supabase may briefly rate limit repeat emails on the free
                    tier, so wait a minute before requesting another link.
                  </p>
                </form>
              ) : (
                <form action={signInWithPasswordAction} className="mt-6 space-y-4">
                  <AuthField
                    defaultValue={email}
                    icon={<Mail className="h-5 w-5 text-[var(--ink-soft)]" />}
                    label="Email address"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                  />
                  <AuthField
                    icon={<LockKeyhole className="h-5 w-5 text-[var(--ink-soft)]" />}
                    label="Password"
                    name="password"
                    placeholder="Your password"
                    type="password"
                  />

                  <div className="-mt-1 flex justify-end">
                    <Link
                      href={`/login?mode=recover${email ? `&email=${encodeURIComponent(email)}` : ""}`}
                      className="text-sm font-medium text-[var(--accent-deep)]"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
                    >
                      Sign in
                    </button>
                    <Link
                      href="/login?mode=signup"
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--accent)]"
                    >
                      Create account
                    </Link>
                  </div>
                </form>
              )}
            </section>

            <LoginShowcase mode={mode} side="right" />
          </div>
        </div>
      </section>
    </main>
  );
}

function getMode(
  value: string | string[] | undefined,
): "signin" | "signup" | "recover" {
  if (value === "signup" || value === "recover") {
    return value;
  }

  return "signin";
}

function getErrorMessage(error: string) {
  if (error === "missing-env") {
    return "Supabase env vars are missing.";
  }

  if (error === "invalid-email") {
    return "Please enter a valid email address.";
  }

  if (error === "invalid-password") {
    return "Choose a password with at least 8 characters.";
  }

  if (error === "passwords-dont-match") {
    return "Your passwords do not match.";
  }

  if (error === "invalid-login") {
    return "That email and password combination did not match an account.";
  }

  if (error === "email-not-confirmed") {
    return "Check your inbox and confirm the account before signing in.";
  }

  if (error === "email-rate-limit") {
    return "Too many email requests were sent on the free tier. Wait a little, then try again.";
  }

  if (error === "email-rate-limit-short") {
    return "Please wait a minute before requesting another email.";
  }

  if (error === "invalid-or-expired-link") {
    return "That sign-in or recovery link is no longer valid. Request a fresh one.";
  }

  if (error === "user-already-registered") {
    return "That email already has an account. Try signing in or resetting the password.";
  }

  return decodeURIComponent(error);
}
