# Architecture

## Purpose

ForgeFlow is a mobile-first training tracker for day-based strength programs. The current build focuses on a clean logging flow, recent exercise context, and low-cost deployment.

## Runtime Stack

- `Next.js` App Router for UI and routing
- `Supabase` for auth and the target Postgres data model
- `Vercel` for hosting and deployment

## Repo Structure

- `app/`
  Route files and server actions
- `components/app/`
  Shared in-app shell and navigation primitives
- `components/auth/`
  Shared auth-entry UI building blocks
- `components/workouts/`
  Workout-specific interactive components
- `lib/supabase/`
  Supabase browser, server, and request-session helpers
- `lib/workouts/`
  Workout domain types, starter data, and selectors
- `supabase/`
  Database migration and seed notes
- `docs/`
  Architecture, review, roadmap, and operating guidance
- `.private/`
  Local-only access notes and design exports, ignored by git

## Current Flow Boundaries

### Auth

- Email and password sign-in
- Email confirmation compatible
- Password recovery and reset
- Request protection through `proxy.ts`

### Workout Domain

- Suggested day selection is derived from recent completed session order
- Recent history and exercise history come from local starter data today
- Logging UI currently demonstrates the interaction flow but does not persist sets yet

### Database Contract

- Schema and bootstrap program live in `supabase/migrations/`
- The intended persisted domain already exists in Supabase
- Internal database functions are treated as private implementation detail, not public API surface
- The next implementation phase is replacing starter data reads and browser-only session state with Supabase-backed reads and writes

## Key Technical Constraint

The product looks live, but the workout flow is still partially in demo mode until the logger and history screens are wired to Supabase data.
