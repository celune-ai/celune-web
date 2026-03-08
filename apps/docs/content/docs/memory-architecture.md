---
title: Memory & Search
description: How the second brain stores, indexes, and retrieves knowledge across sessions.
---

# Memory & Search

The memory system gives Claude persistent context across sessions. It's built on three storage layers, a search index, and a two-tier knowledge flow that moves information from raw captures to curated knowledge.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Always Loaded                      │
│                                                     │
│   CLAUDE.md                                         │
│   ├── Identity (who Eric is, how we work)           │
│   ├── Business context (Smejkal Design, goals)      │
│   ├── Active projects table                         │
│   ├── MCP tool reference                            │
│   ├── Memory protocol (this system)                 │
│   └── Security & maintenance rules                  │
│                                                     │
│   Loaded every session. ~370 lines. The "soul" file.│
└─────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────┐
│                   Session Logs                       │
│                                                     │
│   memory/sessions/YYYY-MM-DD.md                     │
│   ├── Decisions made                                │
│   ├── Files created/modified                        │
│   ├── Open threads for next session                 │
│   └── Key learnings                                 │
│                                                     │
│   Written at session end via /flush protocol.       │
│   Last 1-2 logs checked at session start.           │
└─────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────┐
│                 Searchable Archive                    │
│                                                     │
│   Obsidian Vault (PARA structure)                   │
│   ├── 00-inbox/     Raw captures, braindumps        │
│   ├── 03-professional/  Work context                │
│   ├── 04-projects/  Active project tracking         │
│   ├── 05-knowledge/ Curated patterns & learnings    │
│   └── 06-influences/ People, publications, tools    │
│                                                     │
│   Indexed by SQLite FTS5 for full-text search.      │
└─────────────────────────────────────────────────────┘
```

## Search Engine

The search pipeline makes all vault content queryable:

```
  Vault Markdown Files
        │
        ▼
  ┌─────────────┐
  │  Chunking    │  Split files into searchable segments
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  SQLite DB   │  brain.sqlite
  │  FTS5 Index  │  Full-text search with ranking
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  Hybrid      │  FTS5 scoring + recency weighting
  │  Scoring     │
  └──────┬──────┘
         │
         ▼
  Ranked Results → Claude Context
```

### Commands

```bash
# Full rebuild (from repo root)
python3 MyBrain/scripts/init-memory-db.py

# Search the index
python3 MyBrain/scripts/search-memory.py "topic keywords"
python3 MyBrain/scripts/search-memory.py "exact phrase" --limit 5
```

## Knowledge Flow

Information moves through two tiers:

### Tier 1: Raw Capture

Everything starts as a raw capture: braindumps into `00-inbox/`, session logs into `memory/sessions/`, Slack messages cataloged to vault files. No curation at this stage, just getting it down.

### Tier 2: Curated Knowledge

During weekly review (or when a pattern appears across 2+ sessions), raw captures get promoted:

- **Proven patterns** move to `05-knowledge/` using the [note templates](/docs/note-templates)
- **Stable decisions** get written directly into `CLAUDE.md`
- **Stale captures** in `00-inbox/` get triaged or archived

This two-tier flow means nothing blocks the capture process, but knowledge doesn't stay raw forever.

## Flush Protocol

The flush protocol ensures context survives between sessions. It triggers on:

| Trigger               | Threshold                                      |
| --------------------- | ---------------------------------------------- |
| File changes          | 5+ files created or modified                   |
| Key decisions         | New tool, workflow change, architecture choice |
| Topic switch          | Moving between projects                        |
| Winding-down language | "wrapping up", "let's stop", "signing off"     |
| Long session          | 20+ turns or 30+ minutes                       |

### Context-Aware Urgency

| Context Usage    | Behavior                                        |
| ---------------- | ----------------------------------------------- |
| < 50%            | Normal: flush on triggers                       |
| 50-70%           | Write key decisions after each exchange         |
| 70-85%           | Active flushing: write everything important now |
| > 85%            | Emergency: stop and flush full context summary  |
| After compaction | Note what context may have been lost            |

## Three Memory Layers

| Layer                 | Location              | Purpose                                    |
| --------------------- | --------------------- | ------------------------------------------ |
| **Identity**          | `CLAUDE.md`           | Who Eric is, how we work, stable decisions |
| **Session Logs**      | `memory/sessions/`    | What happened each session                 |
| **Curated Knowledge** | `05-knowledge/`       | Proven patterns, learnings, reference docs |
| **Search Index**      | `memory/brain.sqlite` | FTS5 index of all vault content            |

The system is designed so Claude can pick up any conversation with full context, even across sessions. CLAUDE.md provides the stable foundation, session logs provide recency, and the search index provides depth.
