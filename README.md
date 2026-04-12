# celune-web

Monorepo for Celune's public-facing web properties: marketing site and documentation site.

## Apps

- `apps/site` - marketing site (celune.ai)
- `apps/docs` - documentation + blog (docs.celune.ai)

## Getting started

```bash
pnpm install
pnpm dev
```

## Deployment

Both apps ship via Railway using `Dockerfile.site` and `Dockerfile.docs`.
