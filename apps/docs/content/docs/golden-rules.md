---
title: Golden Rules
description: Four rules for effective agentic coding with Claude Code.
---

# Golden Rules for Working with Claude Code

**Source:** Cole Medin's Agentic Coding video

---

## 1. Context is precious

Reset between planning and implementation. Use sub-agents for research. Keep conversations focused. Don't let a single session try to do everything; scope it, execute it, move on.

## 2. Commandify everything

If you do something more than twice, make it a command. `/prime`, `/flush`, `/commit` are bread and butter. Commands reduce friction, enforce consistency, and make the system self-documenting.

## 3. Git log is long-term memory

Standardize commit messages with `/commit` so the agent can read history to understand what was built and what comes next. Your repo's history becomes a readable narrative, not just for humans, but for the AI.

## 4. System evolution mindset

Every bug is an opportunity to improve `CLAUDE.md` or create a new skill. Don't just fix the code; fix the AI layer so it doesn't happen again.

> "I just encountered [issue]. Don't just fix it, help me think about what we should add to CLAUDE.md or create as a new skill so this doesn't happen again."

---

## Why These Matter

These rules compound. Context discipline keeps sessions sharp. Commands eliminate repeated work. Git history gives continuity across sessions. And the evolution mindset means the system gets smarter every time something goes wrong. Together, they turn Claude Code from a tool into a co-pilot that improves with use.
