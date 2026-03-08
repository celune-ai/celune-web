---
title: Heartbeat
description: The proactive agent that monitors email, calendar, and vault state every 30 minutes.
---

# Heartbeat

The heartbeat is a Python script that runs every 30 minutes via launchd. It sends a prompt to Claude with current system state and decides whether anything needs attention.

## Decision Framework

Every run ends with one of three decisions:

| Decision    | When                          | Action                |
| ----------- | ----------------------------- | --------------------- |
| **SKIP**    | Nothing new, no action needed | Log and exit silently |
| **ROUTINE** | Updates worth noting          | Post summary to Slack |
| **URGENT**  | Needs immediate attention     | Post alert to Slack   |

## Checklist

### Vault

- Scan `00-inbox` for items sitting longer than 24 hours
- Check `04-projects` for anything gone quiet for 3+ days
- Review most recent session log for open threads not yet picked up
- If no vault activity today, send a light check-in after 2pm
- Flag progress or blockers on the $1k revenue milestone

### Email (Gmail)

- Triage each unread email: `NOTEWORTHY` / `NOT_NOTEWORTHY` / `UNSUBSCRIBE_CANDIDATE`
- `NOT_NOTEWORTHY` emails will be auto-marked as read
- Highlight emails from real people that need a reply
- Flag `UNSUBSCRIBE_CANDIDATE` senders for Eric to review

### Calendar (Google Calendar)

- Note upcoming meetings in the next 4 hours
- Flag meetings that need prep or have conflicts
- Call out back-to-back meetings or scheduling crunches

## Rules

- Casual and direct, startup co-pilot tone
- Don't nag about things already flagged
- If nothing needs attention and no new data, reply with `DECISION: SKIP`
- Anti-repetition: the heartbeat log tracks what's already been reported

## Technical Details

| Detail   | Value                           |
| -------- | ------------------------------- |
| Schedule | Every 30 minutes via launchd    |
| Auth     | Google OAuth (Gmail + Calendar) |
| AI       | Anthropic SDK (Claude)          |
| Output   | Slack summary + daily note      |
| Log      | `heartbeat-log.md` for dedup    |
| Version  | v1.0.0 (deployed 2026-02-23)    |
