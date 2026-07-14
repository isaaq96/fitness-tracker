import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { WorkoutLogger } from "@/components/workout-logger";
import { buildWorkoutDraft } from "@/lib/workout-service";

type WorkoutPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { sessionId } = await params;
  const draft = buildWorkoutDraft(sessionId);

  if (!draft) {
    notFound();
  }

  return (
    <AppShell
      title={draft.day.title}
      subtitle="Full-workout logging view with next-set flow and exact exercise history."
    >
      <WorkoutLogger
        day={draft.day}
        historyByExercise={draft.historyByExercise}
      />
    </AppShell>
  );
}
