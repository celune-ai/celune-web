---
title: Overview
description: What the second brain is, why it exists, and how it works.
---

# Overview

Smejkal Design runs on an AI-augmented second brain: an Obsidian vault wired to Claude, automated with Python scripts, and monitored through a live dashboard. It's the operating system for the studio.

## What It Is

A local-first knowledge system that combines:

- **Obsidian vault** as the storage layer (plain markdown, no lock-in)
- **Claude** as the AI engine (via Claude Code and the Anthropic SDK)
- **Python automation** for proactive monitoring (heartbeat, feed scanner, health checks)
- **Slack bot** for real-time chat access to the system
- **SQLite + FTS5** for full-text search across all vault content
- **Next.js site** for monitoring and documentation (you're looking at it)

## Why It Exists

The goal is simple: build a one-person product studio that punches above its weight. The second brain handles context management, proactive monitoring, content curation, and knowledge synthesis so Eric can focus on design and product decisions.

The immediate milestone is **$1,000 in revenue** within 2-3 months to break even on infrastructure costs. Everything in the system is oriented around that.

## How It Fits Together

```
┌─────────────┐     ┌──────────────────────────────┐     ┌────────────────┐
│   You        │     │  Your Mac                    │     │  External      │
│  (Phone/     │◄───►│                              │◄───►│  Services      │
│   Desktop)   │     │  Claude Code (AI Engine)     │     │  Gmail, Gcal,  │
│              │     │       ▼                      │     │  Slack, Notion │
│  Obsidian    │     │  Obsidian Vault (.md files)  │     │  via MCP/Zapier│
│  (mobile)    │     │       ▼                      │     └────────────────┘
│              │     │  Python scripts (automation) │
│  Slack       │     │  CLAUDE.md (memory/identity) │
│  (chat)      │     │  SQLite (search index)       │
└─────────────┘     └──────────────────────────────┘
```

## Key Components

| Component          | What It Does                                                                | Status |
| ------------------ | --------------------------------------------------------------------------- | ------ |
| **Heartbeat**      | Proactive agent, runs every 30 min. Triages email, calendar, vault state.   | v1.0.0 |
| **Slack Bot**      | DM-based chat with vault context. Multi-turn conversations, slash commands. | v2.0.0 |
| **Feed Scanner**   | RSS + Bluesky content curation. 25 sources, dedup, auto-cataloging.         | v1.0.0 |
| **Memory DB**      | SQLite FTS5 index over all vault markdown. Incremental re-indexing.         | v1.0.0 |
| **Health Monitor** | JSON health endpoint powering the dashboard.                                | v1.0.0 |
| **This Site**      | Next.js dashboard + docs. Live system status, browsable documentation.      | Active |

## Guiding Principles

Everything built under Smejkal Design follows three principles:

1. **People Before Pixels** - solve real problems for real people
2. **Celebrate the Journey** - the process matters, acknowledge wins
3. **Thoughtfully Deliver** - craft over quantity, nothing ships half-baked

Read more in [Design Principles](/docs/design-principles).

## Quick Start

- **[Architecture](/docs/architecture)** - full setup guide and system design
- **[Heartbeat](/docs/heartbeat)** - how the proactive agent works
- **[Golden Rules](/docs/golden-rules)** - principles for working with Claude Code
- **[Dashboard](/dashboard)** - live system status
