import { Dumbbell, LockKeyhole } from "lucide-react";
import { clsx } from "clsx";

type BrandLockupProps = {
  secure?: boolean;
  subtitle: string;
};

export function BrandLockup({
  secure = false,
  subtitle,
}: BrandLockupProps) {
  const Icon = secure ? LockKeyhole : Dumbbell;

  return (
    <div className="flex items-center gap-3">
      <div
        className={clsx(
          "logo-badge flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-orange-200/50",
          secure && "shadow-orange-200/40",
        )}
      >
        <Icon className="logo-dumbbell h-5 w-5" />
      </div>
      <div>
        <p className="text-lg font-semibold">ForgeFlow</p>
        <p className="text-sm text-[var(--ink-soft)]">{subtitle}</p>
      </div>
    </div>
  );
}
