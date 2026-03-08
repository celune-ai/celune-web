---
title: Versions & Changelog
description: Production version tracking for all deployed systems.
---

# Versions & Changelog

Active version tracking for deployed systems. Updated on each release.

## Current Production

| System         | Version | Deployed   | Notes                                              |
| -------------- | ------- | ---------- | -------------------------------------------------- |
| Slack Bot      | v2.0.0  | 2026-02-24 | Catalog channels (influence, knowledge, inbox)     |
| Heartbeat      | v1.0.0  | 2026-02-23 | Gmail/Calendar triage, vault scanning, daily notes |
| Feed Scanner   | v1.0.0  | 2026-02-23 | RSS + Bluesky scanning                             |
| Health Monitor | v1.0.0  | 2026-02-23 | System health endpoint                             |

## Changelog

### Slack Bot v2.0.0 (2026-02-24)

- Added catalog channels: `#influence`, `#knowledge`, `#inbox`
- Auto-cataloging pipeline: post to channel, Claude parses, vault write, celebratory emoji
- Cross-channel suggestions with thread replies
- Rate limiting (5 Claude calls/min)
- Idempotent channel creation at startup
- New files: `catalog.py`, `catalog_claude.py`, `catalog_writer.py`, `catalog_emoji.py`
- Modified: `slack_bot.py`, `heartbeat_config.py`

### Slack Bot v1.0.0 (2026-02-23)

- Socket Mode DM + @mention conversation handler
- Multi-turn Claude conversations per thread
- Slash commands: `/brief`, `/flush`, `/status`
- Session logging to `memory/sessions/`
- Graceful shutdown with conversation flush

### Heartbeat v1.0.0 (2026-02-23)

- Gmail + Calendar triage via Google OAuth
- Vault scanning + daily note generation
- Email auto-archive (`NOT_NOTEWORTHY` marked as read)
- Heartbeat log with dedup
- Slack summary posting

### Feed Scanner v1.0.0 (2026-02-23)

- RSS feed scanning (25 sources)
- Bluesky topic tracking
- Feed log with dedup
