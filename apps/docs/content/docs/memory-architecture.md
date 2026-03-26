---
title: Memory & Search
description: How Celune stores, indexes, and retrieves knowledge across workspaces.
---

# Memory & Search

The memory system gives agents persistent context across sessions. It is built on Supabase with both full-text search and semantic (vector) search, managed through a set of API routes.

## Architecture

```
                  Memory Ingest
                       |
          +------------+------------+
          |                         |
    Full-Text Index          Vector Embeddings
    (Supabase FTS)          (Semantic Search)
          |                         |
          +------------+------------+
                       |
                  Search API
              /api/memory/search
              /api/memory/semantic-search
                       |
                 Agent Context
```

## Memory Types

Workspace memories are managed entries that agents can create, read, and search:

- **Seed memories** — starter knowledge provided during workspace setup
- **Core memories** — system-level knowledge essential for agent operation
- **User memories** — knowledge ingested by users or agents during normal operation
- **Team memories** — shared knowledge across workspace team members

## API Routes

| Route                             | Description                              |
| --------------------------------- | ---------------------------------------- |
| `GET /api/memory/entries`         | List memory entries for the workspace    |
| `POST /api/memory/ingest`         | Ingest new knowledge into memory         |
| `GET /api/memory/search`          | Full-text search across memories         |
| `GET /api/memory/semantic-search` | Semantic (vector) search across memories |
| `GET /api/memory/stats`           | Memory usage statistics                  |
| `GET /api/memory/limit`           | Check memory limits for current plan     |
| `GET /api/memory/heartbeat`       | Memory system health check               |

## Search

Two search modes are available:

### Full-Text Search

Standard keyword-based search across all memory entries. Fast and precise for exact term matching.

### Semantic Search

Vector embedding-based search that finds conceptually related content even when exact terms do not match. Useful for natural language queries.

## Memory Limits by Plan

| Plan           | Memory Limit                                   |
| -------------- | ---------------------------------------------- |
| Builder (Free) | Seed & Core only (BYO for additional via BYOK) |
| Pro            | Unlimited                                      |
| Unlimited      | Unlimited                                      |

## Ingestion

New knowledge can be ingested through:

- The memory ingest API (`POST /api/memory/ingest`)
- Agent activity during task execution
- Manual entry through the Memory page in the workspace UI

## Memory Stats

The stats endpoint provides visibility into:

- Total memory entries
- Storage usage
- Usage against plan limits
- Entry counts by type
