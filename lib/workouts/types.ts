export type LoggedSet = {
  setNumber: number;
  weightKg: number;
  reps: number;
};

export type ExerciseTemplate = {
  exerciseKey: string;
  name: string;
  targetSets: number;
  repRange: string;
  cue: string;
};

export type ProgramDay = {
  id: string;
  sequence: number;
  title: string;
  focus: string;
  summary: string;
  exercises: ExerciseTemplate[];
};

export type CompletedExercise = {
  exerciseKey: string;
  name: string;
  sets: LoggedSet[];
  note?: string;
};

export type CompletedWorkoutSession = {
  id: string;
  daySequence: number;
  dayTitle: string;
  focus: string;
  dateIso: string;
  sessionNote: string;
  exercises: CompletedExercise[];
};

export type ExerciseHistoryEntry = {
  sessionId: string;
  dayTitle: string;
  dateIso: string;
  note?: string;
  sets: LoggedSet[];
};

export type WorkoutDraft = {
  id: string;
  day: ProgramDay;
  historyByExercise: Record<string, ExerciseHistoryEntry[]>;
};
