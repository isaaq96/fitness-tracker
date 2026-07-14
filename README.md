# Fitness Tracker

Mobile-first workout tracker scaffolded for a cheap personal rollout.

## Stack

- `Next.js` app router
- `Supabase` for auth + Postgres
- `Vercel` for hosting
- `GitHub` for source control and deploy integration

## Product Shape

- Suggest the next workout day automatically
- Allow manual day selection
- Show the full workout while logging
- Provide a `Next set` flow
- Show the last two times you did each exact exercise
- Keep history workout-by-workout
- Support exercise-level notes and session notes
- Keep the data model ready for multiple users later

## Repo Tracking

- High-level release-style progress lives in [CHANGELOG.md](/C:/Users/isaaq/OneDrive/Documents/Fitness%20Tracker/CHANGELOG.md)
- The repo is being built as an incremental PoC, so each major scaffold step should be logged there

## Current Status

The repository currently includes:

- base Next.js scaffold
- first-pass visual system and branding
- Supabase dependencies

The next milestone is wiring:

1. page structure
2. auth flow
3. workout prototype UI
4. Supabase schema and bootstrap SQL

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

## Deployment Plan

- `GitHub` repo as source of truth
- `Vercel Hobby` for deployment
- `Supabase Free` for auth + database
- free `vercel.app` domain initially

## Notes

- Keep the repo private or public based on your preference, but the cheapest live setup does not require any paid infrastructure to start.
- Avoid committing real secrets; keep Supabase env vars in `.env.local` and Vercel project settings.
