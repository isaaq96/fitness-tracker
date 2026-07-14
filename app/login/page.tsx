import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";

import { sendMagicLinkAction } from "@/app/actions/auth";
import { env } from "@/lib/env";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const sent = params.sent === "1";
  const email = typeof params.email === "string" ? params.email : "";
  const error = typeof params.error === "string" ? params.error : "";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-10 sm:px-6">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel grid-paper rounded-[2.5rem] p-6 sm:p-10">
          <p className="section-title">Backsafe Tracker</p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Track the next workout, not the next spreadsheet tab.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--ink-soft)] sm:text-lg">
            This build is set up for a cheap personal rollout: Next.js on Vercel,
            Supabase auth, and a workout flow built around full-session logging,
            exact exercise history, and a simple next-set rhythm.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Auto-suggests the next day in the rotation",
              "Shows the last two times you did each exact exercise",
              "Keeps workout-by-workout history easy to scan",
              "Leaves room to add more users later",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--line)] bg-white/70 p-4 text-sm leading-6 text-[var(--ink-soft)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[var(--accent-wash)] p-3 text-[var(--accent-deep)]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="section-title">Sign in</p>
              <h2 className="mt-1 text-2xl font-semibold">Magic-link access</h2>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
            Use the same email you want to own the initial program. The first
            login will create your profile and default `Day 1` to `Day 6`
            structure in Supabase once the migration is applied.
          </p>

          {!env.hasSupabase ? (
            <div className="mt-5 rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--surface-strong)] p-4 text-sm leading-6 text-[var(--ink-soft)]">
              Supabase env vars are not configured yet. Add
              `NEXT_PUBLIC_SUPABASE_URL` and
              `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to `.env.local` for local
              auth and to Vercel for deployment.
            </div>
          ) : null}

          {sent ? (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
              Magic link sent{email ? ` to ${email}` : ""}. Open it on the device
              you want to use and you’ll land back in the app.
            </div>
          ) : null}

          {error ? (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              {error === "missing-env"
                ? "Supabase env vars are missing."
                : error === "invalid-email"
                  ? "Please enter a valid email address."
                  : decodeURIComponent(error)}
            </div>
          ) : null}

          <form action={sendMagicLinkAction} className="mt-6 space-y-4">
            <input type="hidden" name="next" value="/today" />
            <label className="block">
              <span className="section-title">Email</span>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-3">
                <Mail className="h-5 w-5 text-[var(--ink-soft)]" />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-base outline-none placeholder:text-[var(--ink-soft)]/70"
                />
              </div>
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
            >
              Send magic link
            </button>
          </form>

          <p className="mt-5 text-sm leading-6 text-[var(--ink-soft)]">
            Not ready for auth yet? You can still inspect the prototype flow in{" "}
            <Link className="font-semibold text-[var(--accent-deep)]" href="/today">
              preview mode
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
