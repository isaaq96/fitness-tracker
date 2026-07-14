import type { CompletedWorkoutSession, ProgramDay } from "@/lib/types";

function makeSets(...entries: Array<[number, number]>) {
  return entries.map(([weightKg, reps], index) => ({
    setNumber: index + 1,
    weightKg,
    reps,
  }));
}

export const programDays: ProgramDay[] = [
  {
    id: "day-1",
    sequence: 1,
    title: "Day 1 — Upper Strength",
    focus: "Stable upper-body strength",
    summary:
      "Heavy upper-body work built around stable rows and presses that keep spinal loading under control.",
    exercises: [
      {
        exerciseKey: "incline-dumbbell-press",
        name: "Incline dumbbell press",
        targetSets: 4,
        repRange: "5–8",
        cue: "Heavy but controlled",
      },
      {
        exerciseKey: "chest-supported-row",
        name: "Chest-supported row",
        targetSets: 4,
        repRange: "6–8",
        cue: "No bent-over rowing",
      },
      {
        exerciseKey: "machine-chest-press",
        name: "Machine chest press",
        targetSets: 3,
        repRange: "6–10",
        cue: "Stable setup",
      },
      {
        exerciseKey: "neutral-grip-lat-pulldown",
        name: "Neutral-grip lat pulldown",
        targetSets: 3,
        repRange: "6–10",
        cue: "Avoid swinging",
      },
      {
        exerciseKey: "seated-dumbbell-lateral-raise",
        name: "Seated dumbbell lateral raise",
        targetSets: 4,
        repRange: "10–15",
        cue: "Strict form",
      },
      {
        exerciseKey: "cable-triceps-pressdown",
        name: "Cable triceps pressdown",
        targetSets: 3,
        repRange: "10–15",
        cue: "Smooth lockout",
      },
      {
        exerciseKey: "incline-dumbbell-curl",
        name: "Incline dumbbell curl",
        targetSets: 3,
        repRange: "10–15",
        cue: "Full stretch",
      },
    ],
  },
  {
    id: "day-2",
    sequence: 2,
    title: "Day 2 — Lower A",
    focus: "Quad and glute emphasis",
    summary:
      "Lower-body work with quad and glute bias while keeping the lower back as quiet as possible.",
    exercises: [
      {
        exerciseKey: "leg-press",
        name: "Leg press",
        targetSets: 4,
        repRange: "8–12",
        cue: "Keep lower back pinned",
      },
      {
        exerciseKey: "hack-or-pendulum-squat",
        name: "Hack squat or pendulum squat",
        targetSets: 3,
        repRange: "8–12",
        cue: "Only if back feels fine",
      },
      {
        exerciseKey: "supported-bulgarian-split-squat",
        name: "Supported Bulgarian split squat",
        targetSets: 3,
        repRange: "8–12",
        cue: "Use support for balance",
      },
      {
        exerciseKey: "leg-extension",
        name: "Leg extension",
        targetSets: 3,
        repRange: "12–15",
        cue: "Hard squeeze at top",
      },
      {
        exerciseKey: "seated-hamstring-curl",
        name: "Seated hamstring curl",
        targetSets: 3,
        repRange: "10–15",
        cue: "Controlled eccentric",
      },
      {
        exerciseKey: "standing-or-seated-calf-raise",
        name: "Standing or seated calf raise",
        targetSets: 4,
        repRange: "10–15",
        cue: "Pause in the stretch",
      },
      {
        exerciseKey: "dead-bug",
        name: "Dead bug",
        targetSets: 3,
        repRange: "8–12 / side",
        cue: "Slow and braced",
      },
    ],
  },
  {
    id: "day-3",
    sequence: 3,
    title: "Day 3 — Pull",
    focus: "Back, rear delts, biceps",
    summary:
      "Pull-dominant hypertrophy with chest support and cable work instead of lower-back-loading rows.",
    exercises: [
      {
        exerciseKey: "pull-ups-or-assisted",
        name: "Pull-ups or assisted pull-ups",
        targetSets: 4,
        repRange: "6–10",
        cue: "No kipping",
      },
      {
        exerciseKey: "chest-supported-t-bar-row",
        name: "Chest-supported T-bar row",
        targetSets: 3,
        repRange: "8–12",
        cue: "Low-back spared",
      },
      {
        exerciseKey: "single-arm-cable-row",
        name: "Single-arm cable row",
        targetSets: 3,
        repRange: "10–12",
        cue: "Pull elbow to hip",
      },
      {
        exerciseKey: "wide-grip-pulldown",
        name: "Wide-grip pulldown",
        targetSets: 3,
        repRange: "10–12",
        cue: "Long range",
      },
      {
        exerciseKey: "rear-delt-cable-fly",
        name: "Rear delt cable fly",
        targetSets: 3,
        repRange: "12–20",
        cue: "Control the arc",
      },
      {
        exerciseKey: "dumbbell-hammer-curl",
        name: "Dumbbell hammer curl",
        targetSets: 3,
        repRange: "10–12",
        cue: "Neutral wrist",
      },
      {
        exerciseKey: "cable-curl",
        name: "Cable curl",
        targetSets: 3,
        repRange: "12–15",
        cue: "Elbows still",
      },
    ],
  },
  {
    id: "day-4",
    sequence: 4,
    title: "Day 4 — Push",
    focus: "Chest, shoulders, triceps",
    summary:
      "Push hypertrophy with quality volume, stable machine patterns, and quick access to previous numbers.",
    exercises: [
      {
        exerciseKey: "flat-dumbbell-press",
        name: "Flat dumbbell press",
        targetSets: 4,
        repRange: "8–12",
        cue: "No excessive leg drive",
      },
      {
        exerciseKey: "seated-machine-shoulder-press",
        name: "Seated machine shoulder press",
        targetSets: 3,
        repRange: "8–12",
        cue: "Prefer machine over standing barbell",
      },
      {
        exerciseKey: "cable-fly-low-to-high",
        name: "Cable fly, low-to-high",
        targetSets: 3,
        repRange: "12–15",
        cue: "Smooth squeeze",
      },
      {
        exerciseKey: "pec-deck-or-machine-fly",
        name: "Pec deck or machine fly",
        targetSets: 3,
        repRange: "12–15",
        cue: "Controlled stretch",
      },
      {
        exerciseKey: "dumbbell-lateral-raise",
        name: "Dumbbell lateral raise",
        targetSets: 4,
        repRange: "12–20",
        cue: "No swing",
      },
      {
        exerciseKey: "overhead-cable-triceps-extension",
        name: "Overhead cable triceps extension",
        targetSets: 3,
        repRange: "10–15",
        cue: "Long-head focus",
      },
      {
        exerciseKey: "rope-pressdown-drop-set",
        name: "Rope pressdown drop set",
        targetSets: 2,
        repRange: "10–12 + drop",
        cue: "Finisher without elbow flare",
      },
    ],
  },
  {
    id: "day-5",
    sequence: 5,
    title: "Day 5 — Lower B",
    focus: "Posterior chain and calves",
    summary:
      "Posterior chain work with hip thrusts, ham curls, and anti-rotation core instead of deadlift-heavy loading.",
    exercises: [
      {
        exerciseKey: "hip-thrust",
        name: "Hip thrust machine or barbell hip thrust",
        targetSets: 4,
        repRange: "8–12",
        cue: "Main deadlift substitute",
      },
      {
        exerciseKey: "lying-hamstring-curl",
        name: "Lying hamstring curl",
        targetSets: 4,
        repRange: "8–12",
        cue: "Heavy hamstring work",
      },
      {
        exerciseKey: "reverse-lunge-or-step-up",
        name: "Smith machine reverse lunge or step-up",
        targetSets: 3,
        repRange: "8–12 / leg",
        cue: "Controlled pelvis",
      },
      {
        exerciseKey: "cable-pull-through",
        name: "Cable pull-through",
        targetSets: 3,
        repRange: "10–15",
        cue: "Hinge without spinal load",
      },
      {
        exerciseKey: "hip-abduction-machine",
        name: "Hip abduction machine",
        targetSets: 3,
        repRange: "15–20",
        cue: "Glute burn",
      },
      {
        exerciseKey: "calf-raise",
        name: "Calf raise",
        targetSets: 4,
        repRange: "10–15",
        cue: "Full stretch",
      },
      {
        exerciseKey: "pallof-press",
        name: "Pallof press",
        targetSets: 3,
        repRange: "10–12 / side",
        cue: "Brace hard",
      },
    ],
  },
  {
    id: "day-6",
    sequence: 6,
    title: "Day 6 — Delts / Arms",
    focus: "Low-fatigue pump work",
    summary:
      "A lower-fatigue pump day built around shoulders and arms with minimal spinal stress.",
    exercises: [
      {
        exerciseKey: "incline-smith-press",
        name: "Incline Smith machine press",
        targetSets: 3,
        repRange: "8–12",
        cue: "Stable upper chest press",
      },
      {
        exerciseKey: "cable-lateral-raise",
        name: "Cable lateral raise",
        targetSets: 4,
        repRange: "12–20",
        cue: "One arm at a time",
      },
      {
        exerciseKey: "rear-delt-machine-fly",
        name: "Rear delt machine fly",
        targetSets: 3,
        repRange: "12–20",
        cue: "Smooth path",
      },
      {
        exerciseKey: "machine-preacher-curl",
        name: "Machine preacher curl",
        targetSets: 3,
        repRange: "10–12",
        cue: "Stay strict",
      },
      {
        exerciseKey: "ez-bar-curl",
        name: "EZ-bar curl",
        targetSets: 3,
        repRange: "10–12",
        cue: "No sway",
      },
      {
        exerciseKey: "close-grip-machine-press",
        name: "Close-grip machine press or dip machine",
        targetSets: 3,
        repRange: "8–12",
        cue: "Safer than weighted dips",
      },
      {
        exerciseKey: "single-arm-cable-triceps-extension",
        name: "Single-arm cable triceps extension",
        targetSets: 3,
        repRange: "12–15",
        cue: "Full lockout",
      },
      {
        exerciseKey: "lateral-raise-mechanical-drop-set",
        name: "Lateral raise mechanical drop set",
        targetSets: 2,
        repRange: "Strict reps then partials",
        cue: "Optional finisher",
      },
    ],
  },
];

export const completedSessions: CompletedWorkoutSession[] = [
  {
    id: "session-day-3-jul-12",
    daySequence: 3,
    dayTitle: "Day 3 — Pull",
    focus: "Back, rear delts, biceps",
    dateIso: "2026-07-12T09:15:00.000Z",
    sessionNote:
      "Energy was solid. Kept the cable work smooth and stayed away from anything that tugged the lower back.",
    exercises: [
      {
        exerciseKey: "pull-ups-or-assisted",
        name: "Pull-ups or assisted pull-ups",
        sets: makeSets([0, 8], [0, 7], [0, 6], [0, 6]),
      },
      {
        exerciseKey: "chest-supported-t-bar-row",
        name: "Chest-supported T-bar row",
        sets: makeSets([95, 10], [100, 8], [100, 8]),
      },
      {
        exerciseKey: "single-arm-cable-row",
        name: "Single-arm cable row",
        sets: makeSets([27.5, 12], [30, 10], [30, 10]),
      },
      {
        exerciseKey: "wide-grip-pulldown",
        name: "Wide-grip pulldown",
        sets: makeSets([70, 12], [75, 10], [75, 10]),
      },
      {
        exerciseKey: "rear-delt-cable-fly",
        name: "Rear delt cable fly",
        note: "Better setup crossing the pulleys slightly lower.",
        sets: makeSets([12.5, 18], [12.5, 16], [15, 14]),
      },
      {
        exerciseKey: "dumbbell-hammer-curl",
        name: "Dumbbell hammer curl",
        sets: makeSets([16, 12], [18, 10], [18, 9]),
      },
      {
        exerciseKey: "cable-curl",
        name: "Cable curl",
        sets: makeSets([22.5, 14], [22.5, 12], [25, 10]),
      },
    ],
  },
  {
    id: "session-day-4-jul-02",
    daySequence: 4,
    dayTitle: "Day 4 — Push",
    focus: "Chest, shoulders, triceps",
    dateIso: "2026-07-02T18:35:00.000Z",
    sessionNote:
      "Felt strong. Flat dumbbells were up one rep on the top set, and the cable work stayed tidy.",
    exercises: [
      {
        exerciseKey: "flat-dumbbell-press",
        name: "Flat dumbbell press",
        sets: makeSets([44, 10], [44, 10], [46, 8], [46, 8]),
      },
      {
        exerciseKey: "seated-machine-shoulder-press",
        name: "Seated machine shoulder press",
        sets: makeSets([50, 12], [55, 10], [55, 9]),
      },
      {
        exerciseKey: "cable-fly-low-to-high",
        name: "Cable fly, low-to-high",
        sets: makeSets([12.5, 15], [15, 12], [15, 12]),
      },
      {
        exerciseKey: "pec-deck-or-machine-fly",
        name: "Pec deck or machine fly",
        sets: makeSets([45, 15], [50, 12], [50, 12]),
      },
      {
        exerciseKey: "dumbbell-lateral-raise",
        name: "Dumbbell lateral raise",
        note: "Pausing at the top keeps these much cleaner.",
        sets: makeSets([9, 18], [9, 16], [10, 14], [10, 14]),
      },
      {
        exerciseKey: "overhead-cable-triceps-extension",
        name: "Overhead cable triceps extension",
        sets: makeSets([25, 14], [27.5, 12], [27.5, 11]),
      },
      {
        exerciseKey: "rope-pressdown-drop-set",
        name: "Rope pressdown drop set",
        note: "Kept drops simple rather than logging every micro-step.",
        sets: makeSets([25, 12], [25, 10]),
      },
    ],
  },
  {
    id: "session-day-4-jun-20",
    daySequence: 4,
    dayTitle: "Day 4 — Push",
    focus: "Chest, shoulders, triceps",
    dateIso: "2026-06-20T17:55:00.000Z",
    sessionNote:
      "Solid baseline session. Shoulder press felt a bit stiff on the first two warm-ups.",
    exercises: [
      {
        exerciseKey: "flat-dumbbell-press",
        name: "Flat dumbbell press",
        sets: makeSets([42, 10], [42, 10], [44, 8], [44, 8]),
      },
      {
        exerciseKey: "seated-machine-shoulder-press",
        name: "Seated machine shoulder press",
        sets: makeSets([45, 12], [50, 10], [50, 9]),
      },
      {
        exerciseKey: "cable-fly-low-to-high",
        name: "Cable fly, low-to-high",
        sets: makeSets([12.5, 14], [12.5, 14], [15, 12]),
      },
      {
        exerciseKey: "pec-deck-or-machine-fly",
        name: "Pec deck or machine fly",
        sets: makeSets([40, 15], [45, 12], [45, 12]),
      },
      {
        exerciseKey: "dumbbell-lateral-raise",
        name: "Dumbbell lateral raise",
        sets: makeSets([8, 18], [8, 16], [9, 14], [9, 14]),
      },
      {
        exerciseKey: "overhead-cable-triceps-extension",
        name: "Overhead cable triceps extension",
        sets: makeSets([22.5, 15], [25, 12], [25, 12]),
      },
      {
        exerciseKey: "rope-pressdown-drop-set",
        name: "Rope pressdown drop set",
        sets: makeSets([22.5, 12], [22.5, 11]),
      },
    ],
  },
];
