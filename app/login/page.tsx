import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { sendMagicLinkAction } from "@/app/actions/auth";
import { env } from "@/lib/env";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const productStats = [
  { value: "Day-based", label: "rotation logic that keeps plans moving" },
  { value: "Exercise-first", label: "history that helps load the next session" },
  { value: "Multi-user ready", label: "foundation for a broader coaching product" },
];

const userBenefits = [
  "See the full workout and still move set-by-set.",
  "Compare against the last two times that exact exercise was performed.",
  "Capture fast notes without cluttering the log.",
];

const scaleNotes = [
  {
    title: "Cleaner onboarding",
    body: "A simple user entry point today, with room for teams and coach-managed plans later.",
  },
  {
    title: "Programmable structure",
    body: "Day templates, exercise ordering, and history can evolve into a more flexible training system.",
  },
  {
    title: "Commercial positioning",
    body: "The product language now points toward a broader training platform rather than a private spreadsheet replacement.",
  },
];

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const sent = params.sent === "1";
  const email = typeof params.email === "string" ? params.email : "";
  const error = typeof params.error === "string" ? params.error : "";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="soft-orb hero-grid relative overflow-hidden rounded-[2.75rem] bg-[var(--hero)] px-6 py-7 text-[var(--hero-ink)] shadow-[0_30px_90px_rgba(24,18,12,0.22)] sm:px-10 sm:py-10">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/72">
                ForgeFlow
              </span>
              <span className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs text-white/64">
                Built for strength teams, studios, and serious lifters
              </span>
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
              Training software that feels light in the gym and strong enough to
              grow into a product.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              ForgeFlow keeps daily workout logging fast, surfaces recent
              exercise performance, and gives each athlete a cleaner path through
              the session without the admin drag of spreadsheets or bloated
              coaching tools.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {productStats.map((item) => (
                <div
                  key={item.value}
                  className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm"
                >
                  <p className="text-lg font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="section-title !text-white/56">What users get</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      One clear session flow
                    </p>
                  </div>
                  <Sparkles className="h-5 w-5 text-[var(--accent-wash)]" />
                </div>

                <div className="mt-5 space-y-3">
                  {userBenefits.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-white/72"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-[var(--accent-wash)]" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <p className="section-title !text-white/56">Why it can scale</p>
                <div className="mt-4 space-y-4">
                  {scaleNotes.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-white/10 bg-black/10 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <ArrowUpRight className="h-4 w-4 text-white/46" />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/62">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[2.75rem] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[var(--accent-wash)] p-3 text-[var(--accent-deep)]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="section-title">Access</p>
              <h2 className="mt-1 text-2xl font-semibold">
                Open your training workspace
              </h2>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
            Sign in with a magic link to load your current program, today&apos;s
            suggested session, and your recent exercise history. This flow stays
            lightweight for the PoC while giving us a credible base for a broader
            rollout.
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
              Magic link sent{email ? ` to ${email}` : ""}. Open it on the
              device you want to use and you&apos;ll land back in the app.
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

          <div className="mt-6 rounded-[1.75rem] border border-[var(--line)] bg-white/70 p-4">
            <p className="section-title">Current scope</p>
            <div className="mt-3 grid gap-3 text-sm leading-6 text-[var(--ink-soft)]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-[var(--accent-alt)]" />
                <p>
                  Fast workout logging built around day rotations and recent
                  exercise recall.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-[var(--accent-alt)]" />
                <p>
                  Lean data model today, with room to add more users,
                  dashboards, and editable schedules later.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-[var(--ink-soft)]">
            Want to look around before auth is stable? You can still inspect the
            product flow in{" "}
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
