export type DocCategory =
  | "Getting Started"
  | "Concepts"
  | "Guides"
  | "API Reference"
  | "Support"
  | "Public"
  | "Internal";

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  category: DocCategory;
  /** Route prefix — "internal" means the page lives at /internal/{slug} */
  route?: string;
  synced?: boolean;
  vaultPath?: string;
}

export const docs: DocMeta[] = [
  {
    slug: "principles",
    title: "Guiding Principles",
    description:
      "Three principles that govern what we build, how we work, and how we ship.",
    category: "Public",
    synced: true,
    vaultPath: "03-professional/smejkal-design-principles.md",
  },
  {
    slug: "claude-code-best-practices",
    title: "Claude Code Best Practices",
    description:
      "Four golden rules for productive AI-assisted development with Claude Code.",
    category: "Internal",
    route: "internal",
    synced: true,
    vaultPath: "05-knowledge/claude-code-golden-rules.md",
  },
  {
    slug: "second-brain",
    title: "Building a Second Brain",
    description:
      "Complete guide to building an AI second brain with Obsidian and Claude Code.",
    category: "Internal",
    route: "internal",
    synced: true,
    vaultPath: "05-knowledge/agent-second-brain-v2-setup.md",
  },
  {
    slug: "platform-architecture",
    title: "Platform Architecture",
    description:
      "Monorepo structure, apps, packages, database schema, API routes, and deployment strategy.",
    category: "Internal",
    route: "internal",
    synced: true,
    vaultPath: "05-knowledge/smejkal-platform-architecture.md",
  },
  {
    slug: "debugging-playbook",
    title: "Debugging Playbook",
    description:
      "Battle-tested solutions to common problems in the platform and MyBrain systems.",
    category: "Internal",
    route: "internal",
    synced: true,
    vaultPath: "05-knowledge/debugging-playbook.md",
  },
  {
    slug: "task-workflow",
    title: "Task Workflow & Agent Protocol",
    description:
      "Agent-first task lifecycle: state machine, scoping, execution, review, and metadata fields.",
    category: "Internal",
    route: "internal",
    synced: true,
    vaultPath: "05-knowledge/task-workflow-agent-protocol.md",
  },
  {
    slug: "supabase-patterns",
    title: "Supabase Patterns",
    description:
      "Client types, RLS policies, middleware auth, migration workflow, and query patterns.",
    category: "Internal",
    route: "internal",
    synced: true,
    vaultPath: "05-knowledge/supabase-patterns.md",
  },
  {
    slug: "python-conventions",
    title: "Python Scripts & Conventions",
    description:
      "Config flow, bootstrap pattern, logging, Supabase REST client, and architectural principles.",
    category: "Internal",
    route: "internal",
    synced: true,
    vaultPath: "05-knowledge/python-scripts-conventions.md",
  },
  {
    slug: "memory-protocol",
    title: "Memory & Session Protocol",
    description:
      "Four-layer memory architecture, session logs, flush triggers, brain.sqlite search, and agent handoff.",
    category: "Internal",
    route: "internal",
    synced: true,
    vaultPath: "05-knowledge/memory-and-session-protocol.md",
  },
  {
    slug: "subagents",
    title: "Subagents & Parallel Development",
    description:
      "Patterns for spawning subagents, when to parallelize, cost awareness, and real-world examples.",
    category: "Internal",
    route: "internal",
    synced: true,
    vaultPath: "05-knowledge/claude-code-subagents-parallelized-development.md",
  },
  {
    slug: "agent-orchestration",
    title: "Agent Orchestration Guardrails",
    description:
      "Three-tier orchestration model, decision flowchart, permission system, and hard guardrails.",
    category: "Internal",
    route: "internal",
    synced: true,
    vaultPath: "05-knowledge/agent-orchestration-guardrails.md",
  },
  {
    slug: "influences",
    title: "Influences",
    description:
      "People, publications, tools, and ideas that shape how we think about design and technology.",
    category: "Public",
    synced: true,
    vaultPath: "06-influences/influences.md",
  },
  {
    slug: "how-we-work",
    title: "How We Work",
    description:
      "Communication style, decision-making, vibe, and what drives the studio.",
    category: "Public",
  },
  {
    slug: "overview",
    title: "Overview",
    description:
      "What the second brain is, why it exists, and how it works.",
    category: "Internal",
    route: "internal",
  },
  {
    slug: "architecture",
    title: "Architecture",
    description:
      "Complete system architecture, setup phases, and component mapping.",
    category: "Internal",
    route: "internal",
  },
  {
    slug: "heartbeat",
    title: "Heartbeat",
    description:
      "The proactive agent that monitors email, calendar, and vault state every 30 minutes.",
    category: "Internal",
    route: "internal",
  },
  {
    slug: "system-identity",
    title: "System Identity",
    description:
      "The CLAUDE.md identity file that defines who we are and how we work.",
    category: "Internal",
    route: "internal",
  },
  {
    slug: "note-templates",
    title: "Note Templates",
    description:
      "Reusable templates for writing high-quality knowledge notes.",
    category: "Internal",
    route: "internal",
  },
  {
    slug: "memory-system",
    title: "Memory System",
    description:
      "Three-layer memory architecture: identity, session logs, and curated knowledge.",
    category: "Internal",
    route: "internal",
  },
  {
    slug: "vault-structure",
    title: "Vault Structure",
    description:
      "PARA-inspired folder system: what goes where and how knowledge flows.",
    category: "Internal",
    route: "internal",
  },
  {
    slug: "mcp-tools",
    title: "MCP Tools Reference",
    description:
      "Curated reference for Slack and Notion MCP integrations: categories, key args, and when to use each.",
    category: "Internal",
    route: "internal",
  },
  {
    slug: "agents",
    title: "Agent Workforce",
    description:
      "Two-tier agent hierarchy: RICK as GM, department heads, and on-demand utility agents — with permissions and scopes.",
    category: "Internal",
    route: "internal",
  },
  {
    slug: "hooks",
    title: "Hooks",
    description:
      "Shell commands that fire automatically in response to Claude Code events — keeping the vault, task board, and memory in sync.",
    category: "Internal",
    route: "internal",
  },
];

/** Categories shown in the sidebar nav, in display order */
export const categories: DocCategory[] = [
  "Getting Started",
  "Concepts",
  "Guides",
  "API Reference",
  "Support",
  "Public",
  "Internal",
];

export function getDocsByCategory(category: DocCategory): DocMeta[] {
  return docs.filter((d) => d.category === category);
}

/** Build the href for a doc page, accounting for route prefix */
export function getDocHref(doc: DocMeta): string {
  if (doc.route) {
    return `/${doc.route}/${doc.slug}`;
  }
  return `/${doc.slug}`;
}
