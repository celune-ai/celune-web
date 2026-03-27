---
title: Architecture
description: System architecture, tech stack, and deployment overview for the Celune platform.
---

# Architecture

Celune is a Turborepo monorepo deployed on Vercel with Supabase as the database backend. The platform consists of two Next.js applications and four shared packages.

## Tech Stack

| Layer          | Technology                           |
| -------------- | ------------------------------------ |
| **Framework**  | Next.js 16 (App Router), React 19    |
| **Styling**    | Tailwind CSS v4, Radix UI, shadcn/ui |
| **Database**   | Supabase (hosted PostgreSQL)         |
| **Auth**       | Supabase Auth                        |
| **AI**         | Anthropic SDK, MCP protocol          |
| **Voice**      | ElevenLabs (TTS, cloning)            |
| **Billing**    | Stripe                               |
| **Monitoring** | Sentry, Vercel Analytics             |
| **Testing**    | Vitest, Testing Library              |
| **Monorepo**   | Turborepo + pnpm                     |
| **Deployment** | Vercel                               |
| **Icons**      | Lucide                               |
| **Charts**     | Recharts                             |

## System Overview

```
                    Vercel (Hosting)
                         |
          +--------------+--------------+
          |                             |
   app.celune.ai               admin.celune.ai
   (Platform App)              (Admin App)
   Port 3002                   Port 3003
          |                             |
          +-------------+---------------+
                        |
              Shared Packages
              (db, types, ui, config)
                        |
                   Supabase
              (PostgreSQL + Auth)
                        |
          +------+------+------+
          |      |      |      |
       Stripe  Sentry  GitHub  Slack
```

## Project Structure

```
apps/
  platform/    # Customer product app (app.celune.ai)
  admin/       # Internal ops app (admin.celune.ai)
packages/
  db/          # Supabase client, queries, middleware, schema, migrations
  types/       # Shared TypeScript types
  ui/          # Shared UI components, nav, page layout
  config/      # Shared ESLint, TypeScript, and Vitest config
```

### Platform App (`apps/platform`)

The customer-facing product with 28+ pages and 60+ API routes:

**Workspace Pages:**

- Dashboard (overview widgets, activity feed, getting started guide)
- Tasks (board view, list view, AI generation, voice input)
- Projects (CRUD, progress tracking, PRD drawer)
- Agents (roster, detail, marketplace)
- Skills (catalog, filtering, detail drawer)
- Memory (entries, search)
- Analytics (overview, agents, cost)
- Feed and Notifications
- Health dashboard
- Settings (billing, organization, workspace, integrations, notifications, roles, provider keys, API keys, webhooks, users)
- Support (tickets, triage, contact, feedback, help)

**Key API Route Groups:**

- `/api/tasks` — CRUD, reorder, generate, per-task operations
- `/api/agents` — config, voice, chat, permissions, delegations, health, marketplace, team templates
- `/api/memory` — entries, ingest, search, semantic-search, heartbeat, stats, limits
- `/api/projects` — CRUD, progress tracking
- `/api/skills` — load, validate
- `/api/skill-packs` — list, detail, install
- `/api/billing` — plans, portal, usage, subscription, Stripe webhooks
- `/api/integrations` — status, Sentry install
- `/api/github` — PRs, branches, webhooks, installations, file conflicts
- `/api/slack` — commands, events, interactions
- `/api/webhooks` — endpoints, retry, agentmail
- `/api/org` — settings, agents, transfer ownership

### Admin App (`apps/admin`)

Internal operations (platform owner only):

- User management and provisioning
- Waitlist and access code management
- Brain manifest administration
- System alerts and support
- Feedback review

## Database

Supabase (hosted PostgreSQL) with:

- Schema defined in `packages/db/schema/supabase-schema.sql`
- Migrations in `packages/db/schema/migrations/`
- Client libraries: browser client, server client, service role client
- Queries module for common database operations
- Middleware for auth and workspace resolution

## Deployment

Both apps deploy to Vercel:

- Empty root directory configuration
- Next.js framework preset
- Build command: `cd apps/<app> && next build`
- Output directory: `apps/<app>/.next`
- Install override: `pnpm install`

## Environment Variables

Key groups:

- **Supabase** — URL, anon key, service role key
- **Auth/Security** — origins, encryption key
- **GitHub App** — client ID, secret, app ID, private key
- **Stripe** — secret key, webhook secret, price IDs
- **Slack** — bot token, signing secret, app token
- **AI Providers** — Anthropic API key
- **ElevenLabs** — API key for voice features
- **Sentry** — DSN, auth token
- **Vercel** — analytics, speed insights
