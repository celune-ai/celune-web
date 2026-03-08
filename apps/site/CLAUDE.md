# Celune Marketing Site

**Port:** 3003 | **Framework:** Next.js 15 (App Router)

## Tech Stack
- UI: @repo/ui (shared design system) + Tailwind v4
- Charts: recharts (dashboard page)
- Types: @repo/types (shared TypeScript types)
- Fonts: Geist Sans + Geist Mono (via next/font)

## Conventions
- Path alias: `@/*` maps to `./src/*`
- CSS: `src/app/globals.css` imports `@repo/ui/theme.css` for design tokens
- TypeScript strict mode enabled
- This is the public-facing Celune marketing site + system dashboard

## Structure
- `src/app/page.tsx` — Landing page
- `src/app/dashboard/page.tsx` — System health dashboard (Second Brain monitoring)
- `src/app/api/health/route.ts` — Health check API (calls Python health script)
- `src/components/` — Dashboard components (status-card, metric, heartbeat-chart, activity-feed)

## Gotchas
- This IS a Next.js app. Server components, API routes, App Router.
- Dashboard fetches from `/api/health` which runs a local Python script — dev only.
- Celune domain TBD. Dev runs on port 3003.
