"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Dumbbell, History, LayoutDashboard, Settings2 } from "lucide-react";

const navItems = [
  {
    href: "/today",
    label: "Today",
    icon: LayoutDashboard,
    match: (pathname: string) => pathname === "/today",
  },
  {
    href: "/workouts/new",
    label: "Workouts",
    icon: Dumbbell,
    match: (pathname: string) => pathname.startsWith("/workouts"),
  },
  {
    href: "/history",
    label: "History",
    icon: History,
    match: (pathname: string) => pathname.startsWith("/history"),
  },
  {
    href: "/settings/program",
    label: "Program",
    icon: Settings2,
    match: (pathname: string) => pathname.startsWith("/settings"),
  },
] as const;

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.match(pathname);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={clsx(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
              active
                ? "border-[var(--accent)] bg-[var(--ink)] text-white shadow-[0_14px_28px_rgba(31,22,15,0.16)]"
                : "border-[var(--line)] bg-white/70 text-[var(--ink-soft)] hover:border-[var(--accent)] hover:text-[var(--ink)]",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
