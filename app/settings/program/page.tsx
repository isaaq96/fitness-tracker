import { PencilLine } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { getProgramDays } from "@/lib/workout-service";

export default function ProgramSettingsPage() {
  const days = getProgramDays();

  return (
    <AppShell
      title="Program Setup"
      subtitle="Shape the day rotation, exercise order, and set targets while keeping the familiar Day 1 to Day 6 structure."
    >
      <section className="glass-panel rounded-[2rem] p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-[var(--accent-wash)] p-3 text-[var(--accent-deep)]">
            <PencilLine className="h-5 w-5" />
          </div>
          <div>
            <p className="section-title">Program editor</p>
            <h2 className="mt-2 text-2xl font-semibold">
              Program editing is the next connected surface
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--ink-soft)]">
              The layout is ready. Once the live read and write layer is
              connected, this page will manage the active program per user
              instead of the local starter data.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 space-y-4">
        {days.map((day) => (
          <article
            key={day.id}
            className="glass-panel rounded-[2rem] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="section-title">Program day</p>
                <h2 className="mt-2 text-2xl font-semibold">{day.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                  {day.summary}
                </p>
              </div>
              <div className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--ink-soft)]">
                {day.exercises.length} exercises
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {day.exercises.map((exercise, index) => (
                <div
                  key={exercise.exerciseKey}
                  className="rounded-2xl border border-[var(--line)] bg-white/70 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">
                        {index + 1}. {exercise.name}
                      </p>
                      <p className="mt-1 text-sm text-[var(--ink-soft)]">
                        {exercise.targetSets} sets - {exercise.repRange}
                      </p>
                    </div>
                    <div className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)]">
                      {exercise.cue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
