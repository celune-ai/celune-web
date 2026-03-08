/**
 * sync-vault.mjs
 *
 * Reads designated vault markdown files from the my-brain submodule
 * and writes them as MDX pages into the docs app. Also regenerates
 * lib/docs.ts with the full manifest.
 *
 * Usage: node scripts/sync-vault.mjs
 * Runs before dev and build.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = join(__dirname, '..');
const MONOREPO_ROOT = join(APP_ROOT, '..', '..');
const VAULT_ROOT = join(MONOREPO_ROOT, 'my-brain', 'MyBrain');

// Vault-synced pages: vault path relative to MyBrain/, slug, title, description, category, route
// Pages with route: 'internal' are written to app/internal/{slug}/ instead of app/{slug}/
const vaultManifest = [
  {
    vaultPath: '03-professional/smejkal-design-principles.md',
    slug: 'principles',
    title: 'Guiding Principles',
    description: 'Three principles that govern what we build, how we work, and how we ship.',
    category: 'Public',
  },
  {
    vaultPath: '05-knowledge/claude-code-golden-rules.md',
    slug: 'claude-code-best-practices',
    title: 'Claude Code Best Practices',
    description: 'Four golden rules for productive AI-assisted development with Claude Code.',
    category: 'Internal',
    route: 'internal',
  },
  {
    vaultPath: '05-knowledge/agent-second-brain-v2-setup.md',
    slug: 'second-brain',
    title: 'Building a Second Brain',
    description: 'Complete guide to building an AI second brain with Obsidian and Claude Code.',
    category: 'Internal',
    route: 'internal',
  },
  {
    vaultPath: '05-knowledge/smejkal-platform-architecture.md',
    slug: 'platform-architecture',
    title: 'Platform Architecture',
    description:
      'Monorepo structure, apps, packages, database schema, API routes, and deployment strategy.',
    category: 'Internal',
    route: 'internal',
  },
  {
    vaultPath: '05-knowledge/debugging-playbook.md',
    slug: 'debugging-playbook',
    title: 'Debugging Playbook',
    description: 'Battle-tested solutions to common problems in the platform and MyBrain systems.',
    category: 'Internal',
    route: 'internal',
  },
  {
    vaultPath: '05-knowledge/task-workflow-agent-protocol.md',
    slug: 'task-workflow',
    title: 'Task Workflow & Agent Protocol',
    description:
      'Agent-first task lifecycle: state machine, scoping, execution, review, and metadata fields.',
    category: 'Internal',
    route: 'internal',
  },
  {
    vaultPath: '05-knowledge/supabase-patterns.md',
    slug: 'supabase-patterns',
    title: 'Supabase Patterns',
    description:
      'Client types, RLS policies, middleware auth, migration workflow, and query patterns.',
    category: 'Internal',
    route: 'internal',
  },
  {
    vaultPath: '05-knowledge/python-scripts-conventions.md',
    slug: 'python-conventions',
    title: 'Python Scripts & Conventions',
    description:
      'Config flow, bootstrap pattern, logging, Supabase REST client, and architectural principles.',
    category: 'Internal',
    route: 'internal',
  },
  {
    vaultPath: '05-knowledge/memory-and-session-protocol.md',
    slug: 'memory-protocol',
    title: 'Memory & Session Protocol',
    description:
      'Four-layer memory architecture, session logs, flush triggers, brain.sqlite search, and agent handoff.',
    category: 'Internal',
    route: 'internal',
  },
  {
    vaultPath: '05-knowledge/claude-code-subagents-parallelized-development.md',
    slug: 'subagents',
    title: 'Subagents & Parallel Development',
    description:
      'Patterns for spawning subagents, when to parallelize, cost awareness, and real-world examples.',
    category: 'Internal',
    route: 'internal',
  },
  {
    vaultPath: '05-knowledge/agent-orchestration-guardrails.md',
    slug: 'agent-orchestration',
    title: 'Agent Orchestration Guardrails',
    description:
      'Three-tier orchestration model, decision flowchart, permission system, and hard guardrails.',
    category: 'Internal',
    route: 'internal',
  },
  {
    vaultPath: '06-influences/influences.md',
    slug: 'influences',
    title: 'Influences',
    description:
      'People, publications, tools, and ideas that shape how we think about design and technology.',
    category: 'Public',
  },
];

// Hand-authored pages (not touched by sync)
const handAuthored = [
  {
    slug: 'how-we-work',
    title: 'How We Work',
    description: 'Communication style, decision-making, vibe, and what drives the studio.',
    category: 'Public',
  },
  {
    slug: 'overview',
    title: 'Overview',
    description: 'What the second brain is, why it exists, and how it works.',
    category: 'Internal',
    route: 'internal',
  },
  {
    slug: 'architecture',
    title: 'Architecture',
    description: 'Complete system architecture, setup phases, and component mapping.',
    category: 'Internal',
    route: 'internal',
  },
  {
    slug: 'heartbeat',
    title: 'Heartbeat',
    description:
      'The proactive agent that monitors email, calendar, and vault state every 30 minutes.',
    category: 'Internal',
    route: 'internal',
  },
  {
    slug: 'system-identity',
    title: 'System Identity',
    description: 'The CLAUDE.md identity file that defines who we are and how we work.',
    category: 'Internal',
    route: 'internal',
  },
  {
    slug: 'note-templates',
    title: 'Note Templates',
    description: 'Reusable templates for writing high-quality knowledge notes.',
    category: 'Internal',
    route: 'internal',
  },
  {
    slug: 'memory-system',
    title: 'Memory System',
    description: 'Three-layer memory architecture: identity, session logs, and curated knowledge.',
    category: 'Internal',
    route: 'internal',
  },
  {
    slug: 'vault-structure',
    title: 'Vault Structure',
    description: 'PARA-inspired folder system: what goes where and how knowledge flows.',
    category: 'Internal',
    route: 'internal',
  },
  {
    slug: 'mcp-tools',
    title: 'MCP Tools Reference',
    description:
      'Curated reference for Slack and Notion MCP integrations: categories, key args, and when to use each.',
    category: 'Internal',
    route: 'internal',
  },
  {
    slug: 'agents',
    title: 'Agent Workforce',
    description:
      'Two-tier agent hierarchy: RICK as GM, department heads, and on-demand utility agents — with permissions and scopes.',
    category: 'Internal',
    route: 'internal',
  },
  {
    slug: 'hooks',
    title: 'Hooks',
    description:
      'Shell commands that fire automatically in response to Claude Code events — keeping the vault, task board, and memory in sync.',
    category: 'Internal',
    route: 'internal',
  },
];

function md5(content) {
  return createHash('md5').update(content).digest('hex');
}

/**
 * Convert GFM pipe tables to HTML <table> elements.
 * Turbopack can't load remark-gfm (non-serializable), so we do it at sync time.
 */
function convertTables(content) {
  // Match a block of consecutive pipe-delimited lines (table rows)
  return content.replace(/(?:^|\n)((?:\|[^\n]+\|\s*\n){2,})/g, (match, tableBlock) => {
    const lines = tableBlock
      .trim()
      .split('\n')
      .map((l) => l.trim());
    if (lines.length < 2) return match;

    // Check for separator row (|---|---|)
    const sepIndex = lines.findIndex((l) =>
      /^\|[\s:]*-{2,}[\s:]*(\|[\s:]*-{2,}[\s:]*)*\|$/.test(l),
    );
    if (sepIndex === -1) return match;

    const parseCells = (line) =>
      line
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((c) => c.trim());

    const headerRows = lines.slice(0, sepIndex);
    const bodyRows = lines.slice(sepIndex + 1);

    let html = '\n<table>\n';

    if (headerRows.length > 0) {
      html += '<thead>\n';
      for (const row of headerRows) {
        html += '<tr>';
        for (const cell of parseCells(row)) {
          html += `<th>${cell}</th>`;
        }
        html += '</tr>\n';
      }
      html += '</thead>\n';
    }

    if (bodyRows.length > 0) {
      html += '<tbody>\n';
      for (const row of bodyRows) {
        if (!row.includes('|')) continue;
        html += '<tr>';
        for (const cell of parseCells(row)) {
          html += `<td>${cell}</td>`;
        }
        html += '</tr>\n';
      }
      html += '</tbody>\n';
    }

    html += '</table>\n';
    return '\n' + html;
  });
}

/**
 * Escape bare JSX-problematic characters in markdown content.
 * MDX interprets `<>` and `<SomeTag>` as JSX. Escape standalone angle brackets
 * that aren't part of valid HTML/JSX tags or links.
 */
function escapeJsxInMdx(content) {
  // Escape bare `<>` (empty JSX fragments) that appear in text
  return content.replace(/(?<!\w)<>(?!\w)/g, '\\<\\>');
}

/**
 * Strip YAML frontmatter from markdown content.
 */
function stripFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (match) return match[2];
  return content;
}

/**
 * Extract title from frontmatter.
 */
function extractFrontmatterTitle(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const titleMatch = match[1].match(/^title:\s*(.+)$/m);
  return titleMatch ? titleMatch[1].replace(/^["']|["']$/g, '') : null;
}

function syncVaultPages() {
  if (!existsSync(VAULT_ROOT)) {
    console.log('[sync-vault] Submodule not checked out (my-brain/ missing). Skipping vault sync.');
    return;
  }

  let synced = 0;
  let skipped = 0;

  for (const entry of vaultManifest) {
    const srcPath = join(VAULT_ROOT, entry.vaultPath);
    if (!existsSync(srcPath)) {
      console.log(`[sync-vault] Warning: vault file not found: ${entry.vaultPath}`);
      continue;
    }

    const raw = readFileSync(srcPath, 'utf-8');
    const body = escapeJsxInMdx(convertTables(stripFrontmatter(raw)));

    // Build MDX content: title from manifest, then body
    const title = extractFrontmatterTitle(raw) || entry.title;
    const mdx = `# ${title}\n\n> ${entry.description}\n\n---\n\n${body.trim()}\n`;

    const destDir = entry.route
      ? join(APP_ROOT, 'app', entry.route, entry.slug)
      : join(APP_ROOT, 'app', entry.slug);
    const destPath = join(destDir, 'page.mdx');

    // Compare hashes to avoid unnecessary writes
    if (existsSync(destPath)) {
      const existing = readFileSync(destPath, 'utf-8');
      if (md5(existing) === md5(mdx)) {
        skipped++;
        continue;
      }
    }

    mkdirSync(destDir, { recursive: true });
    writeFileSync(destPath, mdx);
    synced++;
    console.log(`[sync-vault] Synced: ${entry.slug}`);
  }

  console.log(`[sync-vault] Done. ${synced} synced, ${skipped} unchanged.`);
}

function generateDocsTs() {
  const allDocs = [
    ...vaultManifest.map((e) => ({
      slug: e.slug,
      title: e.title,
      description: e.description,
      category: e.category,
      route: e.route,
      synced: true,
      vaultPath: e.vaultPath,
    })),
    ...handAuthored.map((e) => ({
      slug: e.slug,
      title: e.title,
      description: e.description,
      category: e.category,
      route: e.route,
    })),
  ];

  const entries = allDocs
    .map((d) => {
      const route = d.route ? `\n    route: ${JSON.stringify(d.route)},` : '';
      const synced = d.synced ? `\n    synced: true,` : '';
      const vaultPath = d.vaultPath ? `\n    vaultPath: ${JSON.stringify(d.vaultPath)},` : '';
      return `  {
    slug: ${JSON.stringify(d.slug)},
    title: ${JSON.stringify(d.title)},
    description:\n      ${JSON.stringify(d.description)},
    category: ${JSON.stringify(d.category)},${route}${synced}${vaultPath}
  }`;
    })
    .join(',\n');

  const content = `export type DocCategory =
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
${entries},
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
    return \`/\${doc.route}/\${doc.slug}\`;
  }
  return \`/\${doc.slug}\`;
}
`;

  const destPath = join(APP_ROOT, 'lib', 'docs.ts');

  if (existsSync(destPath)) {
    const existing = readFileSync(destPath, 'utf-8');
    if (md5(existing) === md5(content)) {
      console.log('[sync-vault] docs.ts unchanged.');
      return;
    }
  }

  writeFileSync(destPath, content);
  console.log('[sync-vault] Regenerated lib/docs.ts');
}

// Run
syncVaultPages();
generateDocsTs();
