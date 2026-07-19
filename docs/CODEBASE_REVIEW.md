# Codebase Review

Reviewed on `2026-07-19`.

## Open Findings

### High

- Workout logging is still browser-only state in `components/workouts/workout-logger.tsx`. The interaction model is in place, but sessions are not yet persisted.
- Workout reads still come from starter data in `lib/workouts/mock-data.ts` and `lib/workouts/service.ts` rather than Supabase queries.

### Medium

- There is no automated test suite yet beyond linting, type checking, and production build verification.
- The program settings screen is presentational only and does not yet mutate persisted program data.
- A manual Supabase dashboard hardening step remains: disable `Default privileges for new entities` in the Data API settings so dashboard-created functions do not auto-expose.

### Low

- Product copy and structure are much cleaner than the original scaffold, but some route areas still intentionally acknowledge demo boundaries until persistence is connected.

## Cleanup Completed In This Pass

- Split app-level, auth-level, and workout-level components into clearer folders
- Moved workout domain types and starter data into `lib/workouts/`
- Added active-state navigation instead of flat unscoped header links
- Added a follow-up migration to lock down internal Supabase functions
- Added architecture, accountability, roadmap, and review docs
- Added CI-ready quality-gate expectations
- Removed stale default asset clutter and fixed obvious text encoding issues
