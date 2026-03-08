---
title: Architecture
description: Complete system architecture, setup phases, and component mapping.
---

# Architecture

The second brain is built with Claude Code as the AI engine, Obsidian as the knowledge base, and markdown as the database. The result is local-first, fully customizable, and something you actually understand and control.

> "Clone the OpenClaw repo locally. Point your coding agent at it. Say 'explain how the memory system works, now build that into my own system.' Repeat for every part of the platform." - Cole Medin

## System Overview

```
┌─────────────┐     ┌──────────────────────────────┐     ┌────────────────┐
│   You        │     │  Your Mac / VPS              │     │  External      │
│  (Phone/     │◄───►│                              │◄───►│  Services      │
│   Desktop)   │     │  Claude Code (AI Engine)     │     │  Gmail, Gcal,  │
│              │     │       ▼                      │     │  Slack, Asana  │
│  Obsidian    │     │  Obsidian Vault (.md files)  │     │  via MCP/Zapier│
│  (mobile)    │     │       ▼                      │     └────────────────┘
│              │     │  .claude/skills/ (capabilities)│
│  Slack or    │     │  CLAUDE.md (memory/identity) │
│  Telegram    │     │  Python heartbeat (cron)     │
│  (chat)      │     │  SQLite (local search/RAG)   │
└─────────────┘     └──────────────────────────────┘
```

## Component Mapping

| OpenClaw Component | Our Version               | How                                        |
| ------------------ | ------------------------- | ------------------------------------------ |
| soul.md + user.md  | CLAUDE.md                 | Single identity file, loaded every session |
| memory.md          | CLAUDE.md + 05-knowledge/ | Vault markdown files                       |
| agents.md          | CLAUDE.md (rules section) | Global agent rules                         |
| Session logs       | memory/sessions/          | Daily session notes                        |
| SQLite + RAG       | SQLite FTS5 (local)       | Full-text search index                     |
| heartbeat.md       | Heartbeat Python script   | Claude Agent SDK + launchd                 |
| Channel adapters   | Slack bot (Bolt SDK)      | Socket Mode, real-time chat                |
| Skills registry    | .claude/skills/           | Progressive disclosure                     |

## Setup Phases

### Phase 1: Foundation

- Homebrew, Node.js, Git, Claude Code installed
- API key configured (Claude Max subscription)
- Obsidian installed, vault created
- Second brain skills cloned from Cole's repo
- GitHub private repo for version control
- Vault structure: `00-inbox`, `01-daily`, `02-personal`, `03-professional`, `04-projects`, `05-knowledge`, `06-influences`
- CLAUDE.md profile created (identity, context, rules)

### Phase 2: Brand & Skills

- Brand and voice generator for consistent output
- MCP client setup (Zapier integration)
- MCP tools tested and documented in CLAUDE.md

### Phase 3: Thinking Partner & Workflow

- Thinking partner agent for collaborative ideation
- Daily brief skill (reads inbox, projects, generates summary)
- iPhone sync via iCloud
- Braindump habit: raw thoughts into `00-inbox/`

### Phase 4: Memory System

- Studied OpenClaw's memory architecture
- Built adapted version: session logs + SQLite FTS5 search
- Memory flush protocol for session end context preservation
- Re-indexing scripts for vault changes

### Phase 5: Heartbeat

- Python heartbeat script runs every 30 minutes via launchd
- Checks: Gmail, Google Calendar, vault state
- Decision framework: SKIP / ROUTINE / URGENT
- Anti-repetition log, Slack summary posting
- Google OAuth for Gmail/Calendar access

### Phase 6: Chat Adapter

- Slack bot using Bolt Python SDK
- Socket Mode for real-time communication
- Multi-turn conversations per thread
- Slash commands: `/brief`, `/flush`, `/status`
- Session logging with graceful shutdown

### Phase 7: Agentic Coding

Reusable commands in `.claude/commands/`:

| Command          | Purpose                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| `/prime`         | Start of session: reads CLAUDE.md, checks recent changes, recommends next task |
| `/plan-feature`  | Creates structured plan for next feature                                       |
| `/execute`       | Implements a plan document                                                     |
| `/commit`        | Standardized git commit                                                        |
| `/braindump`     | Quick capture to `00-inbox/`                                                   |
| `/morning-brief` | Daily briefing from inbox + projects                                           |
| `/flush`         | Save session context to vault files                                            |

## Daily Workflow

| Time           | Action                        | Command                         |
| -------------- | ----------------------------- | ------------------------------- |
| Morning        | Open Claude Code, get briefed | `/prime` then `/morning-brief`  |
| Throughout day | Drop thoughts into inbox      | Obsidian mobile or `/braindump` |
| Afternoon      | Process inbox                 | "Process my inbox"              |
| Before closing | Save session context          | `/flush`                        |
| End of day     | Commit changes                | `/commit`                       |

## Cost Summary

| Item                         | Monthly Cost |
| ---------------------------- | ------------ |
| Claude Max subscription      | $100-200     |
| Zapier (MCP integrations)    | Free tier    |
| ElevenLabs (voice, optional) | $5-11        |
| VPS (24/7, optional)         | $5-20        |
| **Total (basic)**            | **$100-200** |
| **Total (full stack)**       | **$130-250** |

## Resources

| Resource            | Description                              |
| ------------------- | ---------------------------------------- |
| Second Brain Skills | Cole Medin's skill templates             |
| OpenClaw            | Reference architecture (MIT licensed)    |
| Claude Code Docs    | Official documentation                   |
| Obsidian            | Local-first knowledge base               |
| Zapier MCP          | Integration bridge for external services |
| Slack Bolt          | Python SDK for the Slack bot             |
