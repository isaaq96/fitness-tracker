import Link from "next/link";
import { format } from "date-fns";
import { ChevronLeft, MessageSquareMore } from "lucide-react";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { StatusPill } from "@/components/status-pill";
import { getCompletedWorkoutById } from "@/lib/workout-service";

type SessionDetailPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function SessionDetailPage({
  params,
}: SessionDetailPageProps) {
  const { sessionId } = await params;
  const session = getCompletedWorkoutById(sessionId);

  if (!session) {
    notFound();
  }

  return (
    <AppShell
      title={session.dayTitle}
      subtitle={`Completed ${format(new Date(session.dateIso), "EEEE, d MMM yyyy")}`}
    >
      <section className="glass-panel rounded-[2rem] p-5">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to history
          </Link>
          <StatusPill tone="success">Completed</StatusPill>
        </div>

        <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--ink-soft)]">
            <MessageSquareMore className="h-4 w-4" />
            Session note
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--ink)]">
            {session.sessionNote || "No session note recorded."}
          </p>
        </div>
      </section>

      <section className="mt-6 space-y-4">
        {session.exercises.map((exercise) => (
          <article
            key={exercise.exerciseKey}
            className="glass-panel rounded-[2rem] p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="section-title">Exercise</p>
                <h2 className="mt-2 text-xl font-semibold">{exercise.name}</h2>
                {exercise.note ? (
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                    {exercise.note}
                  </p>
                ) : null}
              </div>
              <StatusPill>{exercise.sets.length} sets</StatusPill>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--line)]">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[var(--surface-strong)] text-[var(--ink-soft)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Set</th>
                    <th className="px-4 py-3 font-medium">Weight</th>
                    <th className="px-4 py-3 font-medium">Reps</th>
                    <th className="px-4 py-3 font-medium">Volume</th>
                  </tr>
                </thead>
                <tbody className="bg-white/80">
                  {exercise.sets.map((set) => (
                    <tr key={set.setNumber} className="border-t border-[var(--line)]">
                      <td className="px-4 py-3 font-medium text-[var(--ink-soft)]">
                        {set.setNumber}
                      </td>
                      <td className="px-4 py-3">{set.weightKg}kg</td>
                      <td className="px-4 py-3">{set.reps}</td>
                      <td className="px-4 py-3">
                        {Math.round(set.weightKg * set.reps)}kg
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
