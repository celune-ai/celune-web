---
title: Overview
description: What Celune is, why it exists, and how the platform works.
---

# Overview

Celune is an AI agent orchestration platform that helps you build, manage, and scale teams of AI agents. It combines task management, multi-agent coordination, a brain manifest system, and a skill marketplace into a single cloud platform at [app.celune.ai](https://app.celune.ai).

## What It Is

A cloud-based AI workspace platform that provides:

- **Multi-agent orchestration** — manage teams of AI agents with distinct roles, models, personalities, and capabilities
- **Task and project management** — board and list views, AI-generated tasks, voice task creation, project tracking with PRDs
- **Brain manifest system** — versioned skill files per workspace with drift detection, section hashing, and tier-gated access
- **Skill marketplace** — install skill packs by category or bring your own (BYO) custom skills
- **Memory system** — ingest, search (semantic + full-text), and manage knowledge across workspaces
- **63 integrations** — GitHub, Slack, Sentry, Stripe, and 59 more across 22 categories
- **Analytics dashboards** — agent performance, cost tracking, and workspace overview
- **Voice capabilities** — text-to-speech, voice cloning, and voice task input via ElevenLabs

## Why It Exists

Solo developers, small teams, and studios need AI agent infrastructure without building it from scratch. Celune provides the orchestration layer so you can focus on what your agents do, not how to manage them.

## How It Fits Together

```
app.celune.ai (Platform)          admin.celune.ai (Internal Ops)
       |                                    |
       |-- Workspace Dashboard              |-- User Management
       |-- Tasks & Projects                 |-- Provisioning
       |-- Agents & Marketplace             |-- Brain Manifest Admin
       |-- Skills & Skill Packs             |-- Alerts & Support
       |-- Memory & Search                  '-- Analytics
       |-- Analytics (Overview/Agents/Cost)
       |-- Feed & Notifications
       |-- Settings & Billing
       '-- Integrations
```

## Key Components

| Component          | What It Does                                                            |
| ------------------ | ----------------------------------------------------------------------- |
| **Agents**         | AI agents with configurable roles, models, voice, permissions, and chat |
| **Brain Manifest** | Versioned skill/config files per workspace with drift detection         |
| **Skills**         | Tier-gated capabilities (essential/standard/premium) with a marketplace |
| **Tasks**          | Board + list views, AI generation, voice input, 7 statuses              |
| **Projects**       | 4 types (feature/system/research/plan) with PRDs and progress tracking  |
| **Memory**         | Semantic search + full-text search over workspace knowledge             |
| **Integrations**   | 63 integrations across source control, AI, comms, deployment, and more  |
| **Analytics**      | Agent performance, cost tracking, workspace overview dashboards         |
| **Voice**          | TTS, voice cloning, pronunciation dictionaries via ElevenLabs           |

## Guiding Principles

Everything built under Celune follows three principles:

1. **People Before Pixels** — solve real problems for real people
2. **Celebrate the Journey** — the process matters, acknowledge wins
3. **Thoughtfully Deliver** — craft over quantity, nothing ships half-baked

Read more in [Design Principles](/docs/design-principles).

## Quick Start

1. [Sign up](https://app.celune.ai/signup) for a free Builder account
2. Complete onboarding to set up your workspace
3. Explore your agents and install skill packs
4. Create your first project and tasks
5. Connect integrations (GitHub, Slack, etc.)

Learn more:

- **[Architecture](/docs/architecture)** — tech stack and system design
- **[Agents](/docs/agents)** — how agents work
- **[Skills](/docs/skills)** — skill system and marketplace
- **[Integrations](/docs/integrations)** — available integrations and setup
- **[Plans](/docs/plans)** — pricing tiers and feature comparison
