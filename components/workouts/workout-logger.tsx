"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ArrowRight, CheckCircle2, Flag, History } from "lucide-react";
import { clsx } from "clsx";

import type {
  ExerciseHistoryEntry,
  ProgramDay,
} from "@/lib/workouts/types";

type WorkoutLoggerProps = {
  day: ProgramDay;
  historyByExercise: Record<string, ExerciseHistoryEntry[]>;
};

type SetDraft = {
  weightKg: string;
  reps: string;
};

function buildInitialSets(
  day: ProgramDay,
  historyByExercise: WorkoutLoggerProps["historyByExercise"],
) {
  return day.exercises.map((exercise) => {
    const latest = historyByExercise[exercise.exerciseKey]?.[0];

    return Array.from({ length: exercise.targetSets }, (_, index) => ({
      weightKg: latest?.sets[index]?.weightKg?.toString() ?? "",
      reps: latest?.sets[index]?.reps?.toString() ?? "",
    }));
  });
}

export function WorkoutLogger({
  day,
  historyByExercise,
}: WorkoutLoggerProps) {
  const [sets, setSets] = useState<SetDraft[][]>(() =>
    buildInitialSets(day, historyByExercise),
  );
  const [exerciseNotes, setExerciseNotes] = useState<Record<string, string>>({});
  const [sessionNote, setSessionNote] = useState("");
  const [current, setCurrent] = useState({ exerciseIndex: 0, setIndex: 0 });
  const [finished, setFinished] = useState(false);

  const totalSets = day.exercises.reduce(
    (sum, exercise) => sum + exercise.targetSets,
    0,
  );
  const completedSets = sets.flat().filter(
    (entry) => entry.weightKg.trim() && entry.reps.trim(),
  ).length;

  function updateSet(
    exerciseIndex: number,
    setIndex: number,
    field: keyof SetDraft,
    value: string,
  ) {
    setSets((existing) =>
      existing.map((exerciseSets, exerciseCursor) =>
        exerciseCursor === exerciseIndex
          ? exerciseSets.map((draft, setCursor) =>
              setCursor === setIndex ? { ...draft, [field]: value } : draft,
            )
          : exerciseSets,
      ),
    );
  }

  function findNextPosition(fromExercise: number, fromSet: number) {
    for (
      let exerciseIndex = fromExercise;
      exerciseIndex < sets.length;
      exerciseIndex += 1
    ) {
      const startSet = exerciseIndex === fromExercise ? fromSet + 1 : 0;

      for (
        let setIndex = startSet;
        setIndex < sets[exerciseIndex].length;
        setIndex += 1
      ) {
        return { exerciseIndex, setIndex };
      }
    }

    return null;
  }

  function goNext() {
    const next = findNextPosition(current.exerciseIndex, current.setIndex);

    if (!next) {
      setFinished(true);
      return;
    }

    setCurrent(next);
  }

  return (
    <div className="space-y-5">
      <section className="glass-panel rounded-[2rem] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-title">Workout progress</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {completedSets}/{totalSets} sets filled
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
              The training flow is in place. Set saving and completed-session
              persistence are the remaining data-layer step for this screen.
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--line)] bg-white/70 px-5 py-4 text-right">
            <p className="section-title">Current set</p>
            <p className="mt-2 text-lg font-semibold">
              {day.exercises[current.exerciseIndex].name}
            </p>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">
              Set {current.setIndex + 1} of{" "}
              {day.exercises[current.exerciseIndex].targetSets}
            </p>
          </div>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-[var(--surface-muted)]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,_#dc6e3f_0%,_#f5a267_100%)] transition-all"
            style={{ width: `${(completedSets / totalSets) * 100}%` }}
          />
        </div>

        <label className="mt-5 block">
          <span className="section-title">Session note</span>
          <textarea
            value={sessionNote}
            onChange={(event) => setSessionNote(event.target.value)}
            placeholder="How did the session feel overall?"
            className="mt-2 min-h-24 w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
          />
        </label>
      </section>

      {finished ? (
        <section className="glass-panel rounded-[2rem] border border-emerald-200 bg-emerald-50/80 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700" />
            <div>
              <p className="section-title text-emerald-800">Finish workout</p>
              <h3 className="mt-2 text-xl font-semibold text-emerald-950">
                Session flow complete
              </h3>
              <p className="mt-2 text-sm leading-6 text-emerald-900">
                The connected version will save the session, stamp
                `finished_at`, and make the next program day the new
                suggestion.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        {day.exercises.map((exercise, exerciseIndex) => {
          const history = historyByExercise[exercise.exerciseKey] ?? [];

          return (
            <article
              key={exercise.exerciseKey}
              className="glass-panel rounded-[2rem] p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="section-title">Exercise</p>
                  <h3 className="mt-2 text-2xl font-semibold">{exercise.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                    {exercise.targetSets} sets - {exercise.repRange} - {exercise.cue}
                  </p>
                </div>

                <div className="rounded-full bg-[var(--surface-strong)] px-4 py-2 text-sm font-medium text-[var(--ink-soft)]">
                  {exercise.targetSets} planned sets
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4">
                <div className="flex items-center gap-2 text-[var(--ink-soft)]">
                  <History className="h-4 w-4" />
                  <p className="section-title">Last two times you did this</p>
                </div>
                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  {history.length ? (
                    history.map((entry) => (
                      <div
                        key={`${exercise.exerciseKey}-${entry.sessionId}`}
                        className="rounded-2xl border border-[var(--line)] bg-white/80 p-4"
                      >
                        <p className="text-sm font-semibold">
                          {format(new Date(entry.dateIso), "EEE, d MMM")}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                          {entry.sets
                            .map(
                              (set) =>
                                `S${set.setNumber}: ${set.weightKg}kg x ${set.reps}`,
                            )
                            .join(" | ")}
                        </p>
                        {entry.note ? (
                          <p className="mt-2 text-xs leading-5 text-[var(--ink-soft)]">
                            Note: {entry.note}
                          </p>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-[var(--line-strong)] bg-white/60 p-4 text-sm text-[var(--ink-soft)]">
                      No previous sessions logged for this exercise yet.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--line)]">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[var(--surface-strong)] text-[var(--ink-soft)]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Set</th>
                      <th className="px-4 py-3 font-medium">Weight (kg)</th>
                      <th className="px-4 py-3 font-medium">Reps</th>
                      <th className="px-4 py-3 font-medium">State</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/80">
                    {sets[exerciseIndex].map((setDraft, setIndex) => {
                      const active =
                        current.exerciseIndex === exerciseIndex &&
                        current.setIndex === setIndex;
                      const complete =
                        setDraft.weightKg.trim() && setDraft.reps.trim();

                      return (
                        <tr
                          key={`${exercise.exerciseKey}-${setIndex + 1}`}
                          className={clsx(
                            "border-t border-[var(--line)]",
                            active && "bg-orange-50/80",
                          )}
                        >
                          <td className="px-4 py-3 font-medium text-[var(--ink-soft)]">
                            {setIndex + 1}
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              step="0.5"
                              value={setDraft.weightKg}
                              onFocus={() =>
                                setCurrent({ exerciseIndex, setIndex })
                              }
                              onChange={(event) =>
                                updateSet(
                                  exerciseIndex,
                                  setIndex,
                                  "weightKg",
                                  event.target.value,
                                )
                              }
                              className="w-24 rounded-xl border border-[var(--line)] bg-white px-3 py-2 outline-none transition focus:border-[var(--accent)]"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              step="1"
                              value={setDraft.reps}
                              onFocus={() =>
                                setCurrent({ exerciseIndex, setIndex })
                              }
                              onChange={(event) =>
                                updateSet(
                                  exerciseIndex,
                                  setIndex,
                                  "reps",
                                  event.target.value,
                                )
                              }
                              className="w-20 rounded-xl border border-[var(--line)] bg-white px-3 py-2 outline-none transition focus:border-[var(--accent)]"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => setCurrent({ exerciseIndex, setIndex })}
                              className={clsx(
                                "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition",
                                complete
                                  ? "bg-emerald-100 text-emerald-900"
                                  : active
                                    ? "bg-[var(--accent-wash)] text-[var(--accent-deep)]"
                                    : "bg-[var(--surface-strong)] text-[var(--ink-soft)]",
                              )}
                            >
                              {complete ? "Logged" : active ? "Current" : "Tap to focus"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <label className="mt-4 block">
                <span className="section-title">Exercise note</span>
                <textarea
                  value={exerciseNotes[exercise.exerciseKey] ?? ""}
                  onChange={(event) =>
                    setExerciseNotes((currentNotes) => ({
                      ...currentNotes,
                      [exercise.exerciseKey]: event.target.value,
                    }))
                  }
                  placeholder={`Anything to remember for ${exercise.name}?`}
                  className="mt-2 min-h-20 w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                />
              </label>
            </article>
          );
        })}
      </section>

      <div className="glass-panel fixed inset-x-3 bottom-3 z-20 rounded-[1.75rem] p-4 sm:inset-x-6 sm:bottom-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-[var(--ink-soft)]">
            <Flag className="h-4 w-4" />
            Current focus: {day.exercises[current.exerciseIndex].name} set{" "}
            {current.setIndex + 1}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
            >
              Next set
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setFinished(true)}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line-strong)] bg-white/80 px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-emerald-500 hover:text-emerald-900"
            >
              Finish workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
