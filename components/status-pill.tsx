import { clsx } from "clsx";

type StatusPillProps = {
  children: React.ReactNode;
  tone?: "default" | "accent" | "success";
};

export function StatusPill({
  children,
  tone = "default",
}: StatusPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]",
        tone === "accent" &&
          "bg-[var(--accent-wash)] text-[var(--accent-deep)]",
        tone === "success" && "bg-emerald-100 text-emerald-900",
        tone === "default" &&
          "bg-[var(--surface-strong)] text-[var(--ink-soft)]",
      )}
    >
      {children}
    </span>
  );
}
