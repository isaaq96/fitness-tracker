import Link from "next/link";
import {
  CheckCircle2,
  Dumbbell,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { clsx } from "clsx";

import {
  signInWithPasswordAction,
  signUpWithPasswordAction,
} from "@/app/actions/auth";
import { env } from "@/lib/env";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const featureCards = [
  {
    title: "Suggested today",
    body: "Start with the next training day already lined up when you open the app.",
  },
  {
    title: "Quick logging",
    body: "Capture weights, reps, and notes without slowing the workout down.",
  },
  {
    title: "Recent context",
    body: "See the last two performances for the exact exercise before you load up.",
  },
] as const;

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const mode = params.mode === "signup" ? "signup" : "signin";
  const created = params.created === "1";
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
              Training that stays out of the way.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[var(--ink)]">
              Strength training
            </span>
            <span className="rounded-full bg-[var(--surface-strong)] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]">
              Daily clarity
            </span>
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)] sm:text-6xl">
            A cleaner way to open the workout and get moving.
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--ink-soft)] sm:text-xl">
            Create an account or sign in with email and password. ForgeFlow
            keeps today&apos;s session, recent exercise history, and fast logging
            in one simple flow.
          </p>

          <div className="mx-auto mt-10 w-full max-w-[32rem] rounded-[2.25rem] border border-[var(--line)] bg-white/88 p-6 text-left shadow-[0_24px_60px_rgba(32,22,16,0.08)] backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[var(--accent-wash)] p-3 text-[var(--accent-deep)]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="section-title">Account</p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Your training account
                </h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
              Sign in to continue, or create an account to start your training
              profile.
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

            {!env.hasSupabase ? (
              <div className="mt-5 rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--surface-strong)] p-4 text-sm leading-6 text-[var(--ink-soft)]">
                Supabase env vars are not configured yet. Add
                `NEXT_PUBLIC_SUPABASE_URL` and
                `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to `.env.local` for local
                auth and to Vercel for deployment.
              </div>
            ) : null}

            {created ? (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                Account created{email ? ` for ${email}` : ""}. If email
                confirmation is enabled for this environment, check your inbox
                before signing in.
              </div>
            ) : null}

            {error ? (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                {getErrorMessage(error)}
              </div>
            ) : null}

            {mode === "signup" ? (
              <form action={signUpWithPasswordAction} className="mt-6 space-y-4">
                <input type="hidden" name="next" value="/today" />
                <AuthField
                  name="email"
                  label="Email address"
                  type="email"
                  placeholder="name@example.com"
                  icon={<Mail className="h-5 w-5 text-[var(--ink-soft)]" />}
                  defaultValue={email}
                />
                <AuthField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="At least 8 characters"
                  icon={<LockKeyhole className="h-5 w-5 text-[var(--ink-soft)]" />}
                />
                <AuthField
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  placeholder="Repeat your password"
                  icon={<LockKeyhole className="h-5 w-5 text-[var(--ink-soft)]" />}
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
                    Sign in
                  </Link>
                </div>

                <p className="text-sm leading-6 text-[var(--ink-soft)]">
                  If email confirmation is enabled in Supabase, we&apos;ll ask you
                  to verify your email before the first sign-in.
                </p>
              </form>
            ) : (
              <form action={signInWithPasswordAction} className="mt-6 space-y-4">
                <AuthField
                  name="email"
                  label="Email address"
                  type="email"
                  placeholder="name@example.com"
                  icon={<Mail className="h-5 w-5 text-[var(--ink-soft)]" />}
                  defaultValue={email}
                />
                <AuthField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Your password"
                  icon={<LockKeyhole className="h-5 w-5 text-[var(--ink-soft)]" />}
                />

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

            <p className="mt-5 text-sm leading-6 text-[var(--ink-soft)]">
              Want to look around first? You can still inspect the product flow
              in{" "}
              <Link className="font-semibold text-[var(--accent-deep)]" href="/today">
                preview mode
              </Link>
              .
            </p>
          </div>

          <div className="mt-10 grid gap-4 text-left lg:grid-cols-3">
            {featureCards.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-[var(--line)] bg-white/80 p-5 shadow-[0_16px_40px_rgba(32,22,16,0.05)]"
              >
                <p className="text-2xl font-semibold text-[var(--ink)]">
                  {item.title}
                </p>
                <div className="mt-3 flex items-start gap-3 text-sm leading-7 text-[var(--ink-soft)]">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-[var(--accent)]" />
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
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

function getErrorMessage(error: string) {
  if (error === "missing-env") {
    return "Supabase env vars are missing.";
  }

  if (error === "invalid-email") {
    return "Please enter a valid email address.";
  }

  if (error === "invalid-password") {
    return "Please enter a valid password.";
  }

  if (error === "passwords-dont-match") {
    return "Your passwords do not match.";
  }

  return decodeURIComponent(error);
}
