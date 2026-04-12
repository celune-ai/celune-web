---
title: Agents
description: How AI agents work in Celune — configuration, roles, voice, permissions, and the marketplace.
---

# Agents

Celune provides a multi-agent orchestration system where each workspace can have a team of AI agents with distinct roles, personalities, and capabilities.

## Agent Configuration

Each agent has the following configurable properties:

| Property           | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| **Display Name**   | Human-readable name for the agent                               |
| **Role**           | What the agent specializes in (e.g., researcher, coder, writer) |
| **Description**    | What the agent does and when to use it                          |
| **Agent Type**     | `ai` or `human` — supports hybrid teams                         |
| **Model**          | Which AI model powers the agent (e.g., Claude Opus, Sonnet)     |
| **Color & Icon**   | Visual identity in the UI                                       |
| **Pod**            | Organizational grouping for agent teams                         |
| **Persona Prompt** | Custom system prompt defining personality and behavior          |
| **Capabilities**   | Array of specific capabilities the agent has                    |
| **Parameters**     | Model parameters (temperature, etc.)                            |
| **Voice Settings** | ElevenLabs voice configuration for TTS                          |

## Agent Status

Agents report their status in real-time:

- **Online** — available and ready
- **Offline** — not currently running
- **Working** — actively processing a task
- **Idle** — online but not doing anything

Status includes current task ID, model info, uptime, and last heartbeat timestamp.

## Voice

Agents can speak using ElevenLabs integration:

- **Text-to-Speech** — convert agent responses to audio
- **Voice Cloning** — create custom voices for agents
- **Pronunciation Dictionary** — customize how agents pronounce specific terms
- **Voice Preview** — test voice settings before deploying
- **TTS Streaming** — real-time audio streaming for long responses

## Permissions

Agent permissions control what each agent can access and modify within a workspace. Permissions are configured per-agent through the agent detail page.

## Delegations

Agents can delegate tasks to other agents in the team, enabling multi-agent workflows where specialized agents handle different parts of a task.

## Agent Marketplace

Browse and install pre-configured agent templates from the marketplace. Templates include role definitions, persona prompts, and recommended capabilities.

## Team Templates

Org-level shared agents (`OrgSharedAgent`) allow organizations to define agent configurations that can be deployed across multiple workspaces.

## API Routes

| Route                               | Description                |
| ----------------------------------- | -------------------------- |
| `GET/POST /api/agents`              | List and create agents     |
| `GET/PATCH/DELETE /api/agents/[id]` | Agent CRUD operations      |
| `GET/PATCH /api/agents/[id]/config` | Agent configuration        |
| `POST /api/agents/[id]/chat`        | Chat with a specific agent |
| `GET/PATCH /api/agents/[id]/voice`  | Voice settings             |
| `POST /api/agents/[id]/voice/tts`   | Text-to-speech             |
| `POST /api/agents/[id]/voice/clone` | Voice cloning              |
| `GET /api/agents/[id]/permissions`  | Agent permissions          |
| `GET /api/agents/[id]/audit`        | Agent audit log            |
| `GET /api/agents/[id]/budget`       | Agent budget/usage         |
| `GET /api/agents/status`            | All agent statuses         |
| `GET /api/agents/health`            | Agent health checks        |
| `POST /api/agents/seed`             | Seed default agents        |
| `GET /api/agents/marketplace`       | Browse agent marketplace   |
| `GET /api/agents/team-templates`    | Org-level agent templates  |
| `POST /api/agents/toggle`           | Enable/disable agents      |
| `GET /api/agents/delegations`       | Agent delegation config    |

## Plan Limits

| Plan           | Max Agents |
| -------------- | ---------- |
| Builder (Free) | 5          |
| Pro            | 20         |
| Unlimited      | Unlimited  |
