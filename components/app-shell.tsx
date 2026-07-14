import Link from "next/link";
import { Dumbbell, History, LayoutDashboard, Settings2 } from "lucide-react";
import { clsx } from "clsx";

import { LogoutButton } from "@/components/logout-button";

type AppShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  userLabel?: string;
  preview?: boolean;
};

const navItems = [
  { href: "/today", label: "Today", icon: LayoutDashboard },
  { href: "/workouts/new", label: "Choose", icon: Dumbbell },
  { href: "/history", label: "History", icon: History },
  { href: "/settings/program", label: "Program", icon: Settings2 },
];

export function AppShell({
  children,
  title,
  subtitle,
  userLabel,
  preview = false,
}: AppShellProps) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
      <header className="glass-panel sticky top-4 z-20 rounded-[1.75rem] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-orange-200/70">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <p className="section-title">ForgeFlow</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                Strength training operating system
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--ink-soft)] transition hover:border-[var(--accent)] hover:text-[var(--ink)]"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            {userLabel ? (
              <div
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm font-medium",
                  preview
                    ? "border-[var(--line)] bg-[var(--surface-strong)] text-[var(--ink-soft)]"
                    : "border-emerald-200 bg-emerald-50 text-emerald-900",
                )}
              >
                {preview ? "Preview" : userLabel}
              </div>
            ) : null}
            {!preview ? <LogoutButton /> : null}
          </div>
        </div>
      </header>

      <main className="pb-28 pt-6">
        <div className="mb-6">
          <p className="section-title">Session flow</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--ink-soft)]">
              {subtitle}
            </p>
          ) : null}
        </div>

        {children}
      </main>
    </div>
  );
}
