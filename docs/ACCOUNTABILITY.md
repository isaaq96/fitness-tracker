# Accountability

## Quality Gates

Before pushing a meaningful change, run:

```powershell
pnpm lint
pnpm typecheck
pnpm build
```

Or use:

```powershell
pnpm check
```

## Change Management

- Update `CHANGELOG.md` for user-visible changes
- Update `docs/ARCHITECTURE.md` when repo structure or system boundaries change
- Update `docs/ROADMAP.md` when priorities shift
- Record known open issues in `docs/CODEBASE_REVIEW.md`

## Security Rules

- Never commit real secrets
- Keep local access notes only in `.private/`
- Prefer platform env vars for runtime configuration
- Treat `supabase/migrations/` as the source of truth for schema intent
- Revoke execute on internal `public` schema functions unless they are intentionally exposed as API surface
- In the Supabase dashboard, disable `Default privileges for new entities` for the Data API so dashboard-created functions do not auto-grant API access

## Review Standard

Every review should check:

- user-facing correctness
- auth and redirect safety
- route protection
- build health
- whether the code moved the product toward persisted workout data or only changed presentation

## Deployment Standard

- `main` should stay deployable
- CI should pass before relying on a deployment
- Production verification should confirm the public URL reflects the expected copy or behavior after push
