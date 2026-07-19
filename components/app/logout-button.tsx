import { LogOut } from "lucide-react";

import { signOutAction } from "@/app/actions/auth";

export function LogoutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--ink-soft)] transition hover:border-[var(--accent)] hover:text-[var(--ink)]"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </form>
  );
}
