import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Clock3, NotebookPen } from "lucide-react";

import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/status-pill";
import { env } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  getRecentSessions,
  getSuggestedDay,
  listCompletedWorkouts,
} from "@/lib/workouts/service";

export default async function TodayPage() {
  const suggestedDay = getSuggestedDay();
  const recentSessions = getRecentSessions();
  const stats = listCompletedWorkouts();

  let email: string | null = null;

  if (env.hasSupabase) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
    email = user?.email ?? null;
  }

  return (
    <AppShell
      title="Today"
      subtitle="Suggested workout, recent session context, and the fastest path back into the day's work."
      userLabel={email ?? "Preview mode"}
      preview={!email}
    >
      <section className="glass-panel rounded-[2.5rem] p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-title">Suggested next day</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-5xl">
              {suggestedDay.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">
              {suggestedDay.summary}
            </p>
          </div>
          <StatusPill tone="accent">{suggestedDay.focus}</StatusPill>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4">
            <p className="section-title">Exercises</p>
            <p className="mt-2 text-3xl font-semibold">
              {suggestedDay.exercises.length}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4">
            <p className="section-title">Planned sets</p>
            <p className="mt-2 text-3xl font-semibold">
              {suggestedDay.exercises.reduce(
                (sum, exercise) => sum + exercise.targetSets,
                0,
              )}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4">
            <p className="section-title">Recent streak</p>
            <p className="mt-2 text-3xl font-semibold">{stats.length} logs</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/workouts/live-day-${suggestedDay.sequence}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
          >
            Start {suggestedDay.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/workouts/new"
            className="inline-flex items-center justify-center rounded-full border border-[var(--line-strong)] bg-white/70 px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--accent)] hover:bg-white"
          >
            Choose a different day
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-panel rounded-[2rem] p-5">
          <div className="flex items-center gap-2 text-[var(--ink-soft)]">
            <Clock3 className="h-4 w-4" />
            <p className="section-title">Recent workouts</p>
          </div>

          <div className="mt-4 space-y-3">
            {recentSessions.map((session) => (
              <Link
                href={`/history/${session.id}`}
                key={session.id}
                className="block rounded-2xl border border-[var(--line)] bg-white/70 p-4 transition hover:border-[var(--accent)] hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{session.dayTitle}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">
                      {format(new Date(session.dateIso), "EEE, d MMM")} -{" "}
                      {session.exercises.reduce(
                        (sum, exercise) => sum + exercise.sets.length,
                        0,
                      )}{" "}
                      sets
                    </p>
                  </div>
                  <StatusPill tone="success">Done</StatusPill>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                  {session.sessionNote}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-5">
          <div className="flex items-center gap-2 text-[var(--ink-soft)]">
            <NotebookPen className="h-4 w-4" />
            <p className="section-title">Today&apos;s lineup</p>
          </div>

          <div className="mt-4 space-y-3">
            {suggestedDay.exercises.map((exercise, index) => (
              <div
                key={exercise.exerciseKey}
                className="rounded-2xl border border-[var(--line)] bg-white/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      {index + 1}. {exercise.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">
                      {exercise.targetSets} sets - {exercise.repRange}
                    </p>
                  </div>
                  <StatusPill>{exercise.targetSets}</StatusPill>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                  {exercise.cue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
