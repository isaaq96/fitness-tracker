import { CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

type AuthBannerProps = {
  children: React.ReactNode;
  tone: "success" | "warning";
};

export function AuthBanner({ children, tone }: AuthBannerProps) {
  return (
    <div
      className={clsx(
        "mt-5 rounded-2xl p-4 text-sm leading-6",
        tone === "success" &&
          "border border-emerald-200 bg-emerald-50 text-emerald-900",
        tone === "warning" &&
          "border border-amber-200 bg-amber-50 text-amber-900",
      )}
    >
      {tone === "success" ? (
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
          <p>{children}</p>
        </div>
      ) : (
        <p>{children}</p>
      )}
    </div>
  );
}
