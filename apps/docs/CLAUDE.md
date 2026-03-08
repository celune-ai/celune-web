# Docs App

**Port:** 3001 | **basePath:** `/docs` | **Framework:** Next.js 16 + React 19 + MDX

## Tech Stack

- Content: MDX pages in `app/*/page.mdx`
- Syntax highlighting: shiki via CodeBlock server component (not rehypeShiki)
- UI: @repo/ui (shadcn/ui + Tailwind v4)
- Vault sync: `scripts/sync-vault.mjs` runs before dev/build

## Conventions

- Path alias: `@/*` maps to `./*` (root-relative, NOT `./src/*` like admin)
- Page extensions: js, jsx, md, mdx, ts, tsx
- New docs: create `app/{slug}/page.mdx`, register in `lib/docs.ts`
- Hand-authored pages tracked in `sync-vault.mjs` handAuthored set (don't overwrite on sync)

## Gotchas

- rehypeShiki cannot work with Turbopack's MDX loader (options must be serializable). Use the `CodeBlock` server component with `codeToHtml()` instead.
- Vault sync gracefully skips if MyBrain submodule is missing. Don't fail the build on it.
- `app/blog/[slug]/page.tsx` exists but has pre-existing TS path alias errors. Leave it alone unless explicitly fixing.
- `.env.local` should NOT contain the service role key (removed). Only needs `NEXT_PUBLIC_SUPABASE_URL` and anon key.
