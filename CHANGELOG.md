# Changelog

## Unreleased

### Added
- Initial Next.js app scaffold in this repository
- Supabase client dependencies for auth and data access
- `typecheck` script in `package.json`
- `check` script for the full lint, typecheck, and build gate
- Repo-side development log so build progress is tracked in version control
- App shell, login page, today page, history screens, workout chooser, and program settings scaffold
- Local workout prototype data layer for `Day 1` to `Day 6`
- Client-side workout logger with next-set flow and exercise-note/session-note inputs
- Supabase SSR helpers, middleware protection, and auth action scaffolding
- Initial Supabase SQL migration and seed notes for the default program bootstrap
- Password recovery and reset flow for Supabase email-and-password auth
- Architecture, accountability, roadmap, and code-review docs
- CI workflow to run lint, typecheck, and production build checks on GitHub

### Changed
- Reframed the app from generic Next starter content to the `Backsafe Tracker` concept
- Introduced the first-pass visual system and app-level branding
- Hardened auth redirect handling so production sign-in links prefer the live site origin and root-level auth callbacks are forwarded into `/auth/confirm`
- Repositioned the landing experience toward a more commercial-ready `ForgeFlow` brand with broader product messaging and a stronger premium layout
- Replaced the magic-link entry flow with centered email-and-password sign-in and account creation screens aligned to the new `ForgeFlow` landing concept
- Added a subtle animated dumbbell mark to the `ForgeFlow` header branding on the landing and in-app navigation
- Reworked the landing page around product-proof panels and central account access instead of personal-project framing
- Cleaned user-facing copy, navigation labels, and readme wording so the build reads more like a product than a private spreadsheet companion
- Normalized mock and seed program data to ASCII-safe strings and renamed the seeded default program to `ForgeFlow Starter Program`
- Split shared UI into `components/app`, `components/auth`, and `components/workouts`, with the workout domain moved under `lib/workouts`
- Added active in-app navigation state and tightened landing-page showcase copy to feel more like a product surface than a starter mock
- Clarified repo documentation so it matches the current product boundaries and quality expectations

### Security
- Locked down internal Supabase functions with a follow-up migration that revokes public, anon, and authenticated execution and revokes future default execute grants in `public` for migration-created functions

### Removed
- Stale flat component and lib duplicates left over from the structure refactor
- Unused default Next.js starter SVG assets from `public/`

### Notes
- The product direction is a low-cost personal PoC:
  - `GitHub` for source control
  - `Vercel Hobby` for hosting
  - `Supabase Free` for auth + database
- The next milestone is connecting the workout flow to persisted Supabase reads and writes.
- The UI still uses a local mock layer for workout content while the database contract in `supabase/migrations/` is prepared for live wiring.
- Manual Supabase hardening follow-up:
  - in `Integrations -> Data API -> Settings`, disable `Default privileges for new entities` so dashboard-created functions and tables do not auto-expose
