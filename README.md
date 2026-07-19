# ForgeFlow

ForgeFlow is a mobile-first training app for running day-based strength programs, logging sessions quickly, and keeping exact exercise history close to the workout.

## Stack

- `Next.js` app router
- `Supabase` for auth and Postgres
- `Vercel` for hosting
- `GitHub` for source control and deployment integration

## Repo Structure

- `app/` route files and server actions
- `components/app/` in-app shell, navigation, and shared UI primitives
- `components/auth/` account-entry UI building blocks
- `components/workouts/` workout logging components
- `lib/supabase/` Supabase browser, server, and middleware helpers
- `lib/workouts/` workout domain types, starter data, and selectors
- `supabase/` SQL migrations and seed notes
- `docs/` architecture, accountability, roadmap, and review notes
- `.private/` local-only access notes and artifacts, ignored by git

## Product Shape

- Suggest the next workout day automatically once a session is finished
- Let the user override and pick a different day when needed
- Show the full workout while logging
- Keep a `Next set` rhythm for faster in-gym entry
- Show the last two logged sessions for the exact exercise
- Keep history workout by workout
- Support exercise-level notes and session notes
- Leave room for multiple users later

## Current Build Status

The repository currently includes:

- branded landing and account entry flow
- Supabase-backed email and password auth
- password recovery and reset flow
- app shell, workout chooser, history, and program screens
- local starter workout data and a workout logging prototype flow
- initial Supabase schema, bootstrap SQL, and a follow-up function hardening migration

## Local Setup

1. Create `.env.local` from `.env.example`
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
3. Start the dev server:

```powershell
$env:PATH = 'C:/Users/isaaq/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin;' + $env:PATH
& 'C:/Users/isaaq/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pnpm.cmd' dev
```

## Quality Checks

Run the full verification sweep before pushing:

```powershell
pnpm check
```

Or run the individual steps:

```powershell
pnpm lint
pnpm typecheck
pnpm build
```

## Deployment

- `GitHub` is the source of truth
- `Vercel Hobby` is the lowest-cost hosting path
- `Supabase Free` handles auth and database for the current build
- the default live URL can stay on `vercel.app` until a custom domain is worth it

## Repo Tracking

- high-level build progress lives in [CHANGELOG.md](/C:/Users/isaaq/OneDrive/Documents/Fitness%20Tracker/CHANGELOG.md)
- architecture and structure notes live in [docs/ARCHITECTURE.md](/C:/Users/isaaq/OneDrive/Documents/Fitness%20Tracker/docs/ARCHITECTURE.md)
- operating expectations live in [docs/ACCOUNTABILITY.md](/C:/Users/isaaq/OneDrive/Documents/Fitness%20Tracker/docs/ACCOUNTABILITY.md)
- current open risks live in [docs/CODEBASE_REVIEW.md](/C:/Users/isaaq/OneDrive/Documents/Fitness%20Tracker/docs/CODEBASE_REVIEW.md)
- infrastructure secrets should stay out of git and live in local env files or platform settings
