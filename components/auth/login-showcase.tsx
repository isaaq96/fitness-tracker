import { Clock3, Dumbbell, History, Orbit } from "lucide-react";

const flowSteps = [
  {
    title: "Open the right day",
    body: "Start with the next training day already queued, with room to pick another day when needed.",
  },
  {
    title: "Log without friction",
    body: "Keep weight, reps, and notes moving set by set instead of bouncing between tabs.",
  },
  {
    title: "Train with context",
    body: "See the last two performances for the exact exercise at the moment you need them.",
  },
] as const;

const programDays = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"] as const;

type LoginShowcaseProps = {
  mode: "signin" | "signup" | "recover";
  side: "left" | "right";
};

export function LoginShowcase({ side }: LoginShowcaseProps) {
  if (side === "left") {
    return (
      <div className="space-y-5">
        <section className="rounded-[2.15rem] border border-[var(--line)] bg-white/78 p-5 shadow-[0_16px_40px_rgba(32,22,16,0.05)]">
          <div className="flex items-center gap-2 text-[var(--ink-soft)]">
            <Clock3 className="h-4 w-4" />
            <p className="section-title">Suggested session</p>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
            Day 4 - Push
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
            Rotation-aware workout selection, exact recent numbers, and the
            full session layout before the first working set.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <MetricCard label="Exercises" value="7" />
            <MetricCard label="Planned sets" value="24" />
            <MetricCard label="Prior logs" value="2" />
          </div>
        </section>

        <section className="rounded-[2.15rem] border border-[var(--line)] bg-[rgba(255,247,241,0.92)] p-5 shadow-[0_16px_40px_rgba(32,22,16,0.05)]">
          <div className="flex items-center gap-2 text-[var(--accent-deep)]">
            <Dumbbell className="h-4 w-4" />
            <p className="section-title text-[var(--accent-deep)]">
              Session rhythm
            </p>
          </div>
          <div className="mt-4 space-y-3">
            {flowSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-[rgba(143,67,32,0.12)] bg-white/80 p-4"
              >
                <p className="text-sm font-semibold text-[var(--ink)]">
                  {index + 1}. {step.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <section className="rounded-[2.15rem] border border-[var(--line)] bg-white/78 p-5 shadow-[0_16px_40px_rgba(32,22,16,0.05)]">
        <div className="flex items-center gap-2 text-[var(--ink-soft)]">
          <History className="h-4 w-4" />
          <p className="section-title">In-session context</p>
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
          Exact exercise history, not a generic recap
        </h2>
        <div className="mt-4 space-y-3">
          <HistoryCard
            dateLabel="10 Jul"
            summary="Incline dumbbell press"
            detail="34kg x 8, 34kg x 7, 32kg x 8, 32kg x 8"
          />
          <HistoryCard
            dateLabel="01 Jul"
            summary="Incline dumbbell press"
            detail="32kg x 8, 32kg x 8, 30kg x 9, 30kg x 8"
          />
        </div>
      </section>

      <section className="rounded-[2.15rem] border border-[var(--line)] bg-[rgba(241,249,247,0.92)] p-5 shadow-[0_16px_40px_rgba(32,22,16,0.05)]">
        <div className="flex items-center gap-2 text-[var(--accent-alt)]">
          <Orbit className="h-4 w-4" />
          <p className="section-title text-[var(--accent-alt)]">
            Program structure
          </p>
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
          Built around day-based training, not calendar lock-in
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
          Keep the familiar Day 1 to Day 6 rotation while leaving room to
          reshape the plan later.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {programDays.map((day) => (
            <div
              key={day}
              className="rounded-2xl border border-[rgba(30,106,96,0.12)] bg-white/80 px-3 py-3 text-center text-sm font-medium text-[var(--ink)]"
            >
              {day}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-[var(--ink-soft)]">
          The current build stays focused on session logging first, with room
          to layer in dashboards and richer programming controls after the core
          training loop is fully persisted.
        </p>
      </section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4">
      <p className="section-title">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[var(--ink)]">{value}</p>
    </div>
  );
}

function HistoryCard({
  dateLabel,
  summary,
  detail,
}: {
  dateLabel: string;
  summary: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[var(--ink)]">{summary}</p>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--ink-soft)]">
          {dateLabel}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{detail}</p>
    </div>
  );
}
