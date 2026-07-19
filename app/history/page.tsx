import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/status-pill";
import { listCompletedWorkouts } from "@/lib/workouts/service";

export default function HistoryPage() {
  const sessions = listCompletedWorkouts();

  return (
    <AppShell
      title="Workout History"
      subtitle="Browse completed sessions workout by workout, with notes and per-exercise detail."
    >
      <section className="space-y-4">
        {sessions.map((session) => {
          const totalSets = session.exercises.reduce(
            (sum, exercise) => sum + exercise.sets.length,
            0,
          );
          const volume = session.exercises.reduce(
            (sum, exercise) =>
              sum +
              exercise.sets.reduce(
                (exerciseSum, set) => exerciseSum + set.weightKg * set.reps,
                0,
              ),
            0,
          );

          return (
            <article
              key={session.id}
              className="glass-panel rounded-[2rem] p-5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="section-title">
                    {format(new Date(session.dateIso), "EEE, d MMM")}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">{session.dayTitle}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">
                    {session.sessionNote}
                  </p>
                </div>
                <StatusPill tone="success">Completed</StatusPill>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4">
                  <p className="section-title">Sets</p>
                  <p className="mt-2 text-3xl font-semibold">{totalSets}</p>
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4">
                  <p className="section-title">Volume</p>
                  <p className="mt-2 text-3xl font-semibold">{Math.round(volume)}kg</p>
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4">
                  <p className="section-title">Exercises</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--ink-soft)]">
                    {session.exercises.length} tracked
                  </p>
                </div>
              </div>

              <Link
                href={`/history/${session.id}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
              >
                Open session
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </section>
    </AppShell>
  );
}
