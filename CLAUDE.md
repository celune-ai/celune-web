# celune-web

Turborepo monorepo for Celune's web properties.

## Structure

| Package     | Path             | Port | Framework                                      |
| ----------- | ---------------- | ---- | ---------------------------------------------- |
| docs        | `apps/docs`      | 3001 | Next.js 16, React 19, MDX                      |
| site        | `apps/site`      | 3003 | Next.js 15, App Router                         |
| @repo/ui    | `packages/ui`    | n/a  | Shared design system (shadcn/ui + Tailwind v4) |
| @repo/types | `packages/types` | n/a  | Shared TypeScript types                        |

## Commands

```bash
pnpm dev          # Run all apps in parallel
pnpm build        # Build all packages
pnpm type-check   # TypeScript check (turbo)
pnpm lint         # ESLint (turbo)
pnpm format       # Prettier write
pnpm format:check # Prettier check
```

## Conventions

- Commits: atomic, descriptive, no `--no-verify`
- Never force-push to main
- App-specific instructions live in `apps/*/CLAUDE.md`

## Known Issues

- `@sentry/nextjs` ships Next 15 types that conflict with docs app (Next 16). Workaround: `typescript.ignoreBuildErrors: true` in `apps/docs/next.config.ts`. Will resolve when Sentry ships Next 16 support.
- Site ESLint config references `@repo/config` which is not yet created. `pnpm lint` fails for site app.
