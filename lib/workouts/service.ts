import { completedSessions, programDays } from "@/lib/workouts/mock-data";
import type {
  CompletedWorkoutSession,
  ExerciseHistoryEntry,
  ProgramDay,
  WorkoutDraft,
} from "@/lib/workouts/types";

const sortedSessions = [...completedSessions].sort((left, right) =>
  right.dateIso.localeCompare(left.dateIso),
);

export function getProgramDays(): ProgramDay[] {
  return programDays;
}

export function getSuggestedDay(): ProgramDay {
  const lastCompleted = sortedSessions[0];
  const nextSequence = lastCompleted
    ? ((lastCompleted.daySequence % programDays.length) || 0) + 1
    : 1;

  return (
    programDays.find((day) => day.sequence === nextSequence) ?? programDays[0]
  );
}

export function listCompletedWorkouts(): CompletedWorkoutSession[] {
  return sortedSessions;
}

export function getRecentSessions(limit = 3): CompletedWorkoutSession[] {
  return sortedSessions.slice(0, limit);
}

export function getCompletedWorkoutById(sessionId: string) {
  return sortedSessions.find((session) => session.id === sessionId) ?? null;
}

export function getExerciseHistory(
  exerciseKey: string,
  limit = 2,
): ExerciseHistoryEntry[] {
  const history: ExerciseHistoryEntry[] = [];

  for (const session of sortedSessions) {
    const exercise = session.exercises.find(
      (candidate) => candidate.exerciseKey === exerciseKey,
    );

    if (!exercise) {
      continue;
    }

    history.push({
      sessionId: session.id,
      dayTitle: session.dayTitle,
      dateIso: session.dateIso,
      note: exercise.note,
      sets: exercise.sets,
    });

    if (history.length === limit) {
      break;
    }
  }

  return history;
}

export function buildWorkoutDraft(sessionId: string): WorkoutDraft | null {
  const match = /^live-day-(\d+)$/.exec(sessionId);

  if (!match) {
    return null;
  }

  const sequence = Number(match[1]);
  const day = programDays.find((candidate) => candidate.sequence === sequence);

  if (!day) {
    return null;
  }

  const historyByExercise = Object.fromEntries(
    day.exercises.map((exercise) => [
      exercise.exerciseKey,
      getExerciseHistory(exercise.exerciseKey, 2),
    ]),
  );

  return {
    id: sessionId,
    day,
    historyByExercise,
  };
}
