import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4">
      <section className="glass-panel rounded-[2.5rem] p-8 text-center sm:p-12">
        <p className="section-title">Workout missing</p>
        <h1 className="mt-4 text-4xl font-semibold">
          That page doesn&apos;t exist.
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--ink-soft)]">
          The session link may be stale, or the draft workout id was invalid.
        </p>
        <Link
          href="/today"
          className="mt-6 inline-flex rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-deep)]"
        >
          Back to today
        </Link>
      </section>
    </main>
  );
}
