import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Dumbbell,
  History,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { clsx } from "clsx";

import {
  requestPasswordResetAction,
  signInWithPasswordAction,
  signUpWithPasswordAction,
} from "@/app/actions/auth";
import { env } from "@/lib/env";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const flowSteps = [
  {
    title: "Open the right day",
    body: "Start with the next training day already queued, with room to pick another day when needed.",
  },
  {
    title: "Log without friction",
    body: "Keep weight, reps, and notes moving set by set instead of bouncing between tabs.",
  },
  {
    title: "Train with context",
    body: "See the last two performances for the exact exercise at the moment you need them.",
  },
] as const;

const programDays = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"] as const;

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
        <div className="flex items-center gap-3">
          <div className="logo-badge flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-orange-200/50">
            <Dumbbell className="logo-dumbbell h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold">ForgeFlow</p>
            <p className="text-sm text-[var(--ink-soft)]">
              Training software that stays with the session.
            </p>
          </div>
        </div>

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
            <div className="space-y-5">
              <section className="rounded-[2.15rem] border border-[var(--line)] bg-white/78 p-5 shadow-[0_16px_40px_rgba(32,22,16,0.05)]">
                <div className="flex items-center gap-2 text-[var(--ink-soft)]">
                  <Clock3 className="h-4 w-4" />
                  <p className="section-title">Today in view</p>
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
                  Day 4 - Push
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                  Seven exercises, 24 planned sets, and the right previous
                  numbers ready before the first press.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <MetricCard label="Exercises" value="7" />
                  <MetricCard label="Planned sets" value="24" />
                  <MetricCard label="Last session" value="2" />
                </div>
              </section>

              <section className="rounded-[2.15rem] border border-[var(--line)] bg-[rgba(255,247,241,0.92)] p-5 shadow-[0_16px_40px_rgba(32,22,16,0.05)]">
                <div className="flex items-center gap-2 text-[var(--accent-deep)]">
                  <Dumbbell className="h-4 w-4" />
                  <p className="section-title text-[var(--accent-deep)]">
                    Session rhythm
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  {flowSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="rounded-2xl border border-[rgba(143,67,32,0.12)] bg-white/80 p-4"
                    >
                      <p className="text-sm font-semibold text-[var(--ink)]">
                        {index + 1}. {step.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                        {step.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

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
                <Banner tone="success">
                  If this email is new or still awaiting confirmation, check
                  your inbox{email ? ` at ${email}` : ""} before the first sign
                  in.
                </Banner>
              ) : null}

              {sent ? (
                <Banner tone="success">
                  Reset link sent{email ? ` to ${email}` : ""}. Open the email
                  and continue back here to choose a new password.
                </Banner>
              ) : null}

              {passwordReset ? (
                <Banner tone="success">
                  Password updated. Sign in with the new password to continue.
                </Banner>
              ) : null}

              {error ? (
                <Banner tone="warning">{getErrorMessage(error)}</Banner>
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

            <div className="space-y-5">
              <section className="rounded-[2.15rem] border border-[var(--line)] bg-white/78 p-5 shadow-[0_16px_40px_rgba(32,22,16,0.05)]">
                <div className="flex items-center gap-2 text-[var(--ink-soft)]">
                  <History className="h-4 w-4" />
                  <p className="section-title">At the point of use</p>
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
                  Exact exercise history, not a generic recap
                </h2>
                <div className="mt-4 space-y-3">
                  <HistoryCard
                    dateLabel="10 Jul"
                    summary="Incline dumbbell press"
                    detail="34kg x 8, 34kg x 7, 32kg x 8, 32kg x 8"
                  />
                  <HistoryCard
                    dateLabel="01 Jul"
                    summary="Incline dumbbell press"
                    detail="32kg x 8, 32kg x 8, 30kg x 9, 30kg x 8"
                  />
                </div>
              </section>

              <section className="rounded-[2.15rem] border border-[var(--line)] bg-[rgba(241,249,247,0.92)] p-5 shadow-[0_16px_40px_rgba(32,22,16,0.05)]">
                <p className="section-title text-[var(--accent-alt)]">
                  Program structure
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
                  Built around day-based training, not calendar lock-in
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                  Keep the familiar Day 1 to Day 6 rotation while leaving room
                  to reshape the plan later.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {programDays.map((day) => (
                    <div
                      key={day}
                      className="rounded-2xl border border-[rgba(30,106,96,0.12)] bg-white/80 px-3 py-3 text-center text-sm font-medium text-[var(--ink)]"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <Link
                  href={mode === "signup" ? "/login?mode=signup" : "/login?mode=signin"}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-alt)]"
                >
                  Start with the core flow
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type AuthFieldProps = {
  defaultValue?: string;
  icon: React.ReactNode;
  label: string;
  name: string;
  placeholder: string;
  type: "email" | "password";
};

function AuthField({
  defaultValue,
  icon,
  label,
  name,
  placeholder,
  type,
}: AuthFieldProps) {
  return (
    <label className="block">
      <span className="section-title">{label}</span>
      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-3">
        {icon}
        <input
          required
          defaultValue={defaultValue}
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full bg-transparent text-base outline-none placeholder:text-[var(--ink-soft)]/70"
        />
      </div>
    </label>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4">
      <p className="section-title">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[var(--ink)]">{value}</p>
    </div>
  );
}

function HistoryCard({
  dateLabel,
  summary,
  detail,
}: {
  dateLabel: string;
  summary: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[var(--ink)]">{summary}</p>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--ink-soft)]">
          {dateLabel}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{detail}</p>
    </div>
  );
}

function Banner({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "success" | "warning";
}) {
  return (
    <div
      className={clsx(
        "mt-5 rounded-2xl p-4 text-sm leading-6",
        tone === "success" &&
          "border border-emerald-200 bg-emerald-50 text-emerald-900",
        tone === "warning" &&
          "border border-amber-200 bg-amber-50 text-amber-900",
      )}
    >
      {tone === "success" ? (
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
          <p>{children}</p>
        </div>
      ) : (
        <p>{children}</p>
      )}
    </div>
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
