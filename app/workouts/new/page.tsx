import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { getProgramDays, getSuggestedDay } from "@/lib/workout-service";

export default function ChooseWorkoutPage() {
  const days = getProgramDays();
  const suggestedDay = getSuggestedDay();

  return (
    <AppShell
      title="Choose Workout"
      subtitle="Jump into any day when you want a manual override without changing the long-term shape of the plan."
    >
      <section className="grid gap-4">
        {days.map((day) => {
          const isSuggested = day.sequence === suggestedDay.sequence;

          return (
            <article
              key={day.id}
              className="glass-panel rounded-[2rem] p-5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="section-title">
                    {isSuggested ? "Suggested next" : "Program day"}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">{day.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">
                    {day.summary}
                  </p>
                </div>
                <div className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--ink-soft)]">
                  {day.focus}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {day.exercises.map((exercise) => (
                  <span
                    key={exercise.exerciseKey}
                    className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)]"
                  >
                    {exercise.name}
                  </span>
                ))}
              </div>

              <Link
                href={`/workouts/live-day-${day.sequence}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
              >
                Start {day.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </section>
    </AppShell>
  );
}
