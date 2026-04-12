---
title: Skills
description: The skill system, brain manifest, skill packs marketplace, and BYO custom skills.
---

# Skills

Skills are the capabilities that power your AI agents. Celune uses a brain manifest system to track, version, and gate skills per workspace.

## Brain Manifest

Every workspace has a brain manifest — a registry of all skill files, hooks, agent docs, and configuration. Each entry tracks:

- **Path** — file location in the skill tree
- **Content Hash** — SHA hash for drift detection
- **Version** — semantic version of the skill
- **Tier** — access level: `essential`, `standard`, or `premium`
- **Category** — type of brain component (see below)
- **Ownership Scope** — `core` (platform-provided), `org` (organization-level), or `workspace` (workspace-specific)
- **Integration Group** — optional grouping: `github`, `slack`, `voice`, `byok`
- **Install Source** — how it was added: `bootstrap`, `pack`, `byo`, or `manual`

### Categories

| Category     | Description                                 |
| ------------ | ------------------------------------------- |
| `skill`      | A capability the agent can use              |
| `hook`       | Automated trigger/response logic            |
| `agent`      | Agent definition and configuration          |
| `agent_doc`  | Documentation for an agent                  |
| `memory`     | Memory system configuration                 |
| `settings`   | Workspace settings                          |
| `delegation` | Rules for how agents delegate to each other |

### Drift Detection

The brain manifest system includes section-level hashing. When a core skill is updated upstream, the system detects the drift and surfaces an update banner. Users can review changes, merge updates, or keep their forked version.

## Skill Tiers

Skills are gated by plan tier:

| Tier          | Plan Required  | Description                            |
| ------------- | -------------- | -------------------------------------- |
| **Essential** | Builder (Free) | Core capabilities every workspace gets |
| **Standard**  | Pro            | Advanced workflows and integrations    |
| **Premium**   | Unlimited      | Enterprise features and custom tooling |

## Skill Packs

Skill packs are curated bundles of skills available in the marketplace. Each pack has:

- **Slug** — unique identifier
- **Category** — `workflow`, `devops`, `research`, `content`, `integration`, or `custom`
- **Min Tier** — minimum plan required to install (`builder`, `pro`, or `unlimited`)
- **Entries** — list of skills included in the pack
- **Author** — who created the pack

### Installing Skill Packs

1. Browse the Skills page in your workspace
2. Filter by category or trigger type
3. Click a skill pack to view details
4. Click Install to add all skills from the pack to your workspace

## BYO (Bring Your Own) Skills

You can create custom skills and add them to your workspace:

- Skills are validated using the BYO skill validator
- Quality scores (0-1) are assigned to BYO skills
- BYO skills can be shared at the org level

## API Routes

| Route                                  | Description                 |
| -------------------------------------- | --------------------------- |
| `GET /api/skills`                      | List workspace skills       |
| `GET /api/skills/[id]`                 | Skill detail                |
| `POST /api/skills/load`                | Load skills into workspace  |
| `POST /api/skills/validate`            | Validate a skill definition |
| `GET /api/skill-packs`                 | List available skill packs  |
| `GET /api/skill-packs/[slug]`          | Skill pack detail           |
| `POST /api/skill-packs/[slug]/install` | Install a skill pack        |
