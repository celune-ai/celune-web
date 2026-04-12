export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string: YYYY-MM-DD
  author: string;
  tags: string[];
  published: boolean;
}

export const posts: BlogPost[] = [
  {
    slug: 'multi-agent-teams-vs-single-ai',
    title: 'Why Multi-Agent Teams Beat Single AI Assistants',
    description:
      'Cursor, Copilot, and ChatGPT all hit the same ceiling. Here is why specialized multi-agent AI development — with distinct roles, shared memory, and review gates — is a fundamentally different approach.',
    date: '2026-03-25',
    author: 'Eric Smejkal',
    tags: ['AI', 'Agents', 'Multi-Agent', 'Engineering', 'Productivity'],
    published: false,
  },
  {
    slug: 'why-ai-agent-orchestration-beats-solo-agents',
    title: 'Why AI Agent Orchestration Beats Solo Agents',
    description:
      "Solo AI agents hit a ceiling fast. Multi-agent orchestration — specialization, shared memory, review gates — breaks through it. Here's how.",
    date: '2026-03-24',
    author: 'Eric Smejkal',
    tags: ['AI', 'Agents', 'Productivity', 'Engineering'],
    published: true,
  },
  {
    slug: 'building-with-ai-agents',
    title: 'Building with AI Agents: What Actually Works',
    description:
      'A practical account of running a one-person product studio with an AI agent workforce — what worked, what broke, and what we learned.',
    date: '2026-03-03',
    author: 'Eric Smejkal',
    tags: ['AI', 'Claude Code', 'Productivity'],
    published: true,
  },
  {
    slug: 'knowledge-graph-ai-agents',
    title: 'Building a Second Brain for AI Agents — How Knowledge Graphs Change Everything',
    description:
      'Most AI tools forget everything between sessions. A knowledge graph gives agents compounding intelligence — typed relations, auto-detection, contradiction surfacing, and a moat that grows over time.',
    date: '2026-03-25',
    author: 'Eric Smejkal',
    tags: ['AI', 'Memory', 'Knowledge Graph', 'Agents', 'Engineering'],
    published: true,
  },
  {
    slug: 'inside-celunes-task-lifecycle',
    title: "Inside Celune's Task Lifecycle",
    description:
      'Backlog, Inbox, Scoping, Planned, In Progress, Review, Done — the full lifecycle that powers Celune agent coordination, with claim semantics, handoffs, and failure modes.',
    date: '2026-04-09',
    author: 'Eric Smejkal',
    tags: ['Celune', 'Agents', 'Task System', 'Engineering', 'Claude Code'],
    published: true,
  },
  {
    slug: 'why-we-built-second-brain-as-celunes-spine',
    title: "Why We Built Second-Brain as Celune's Spine",
    description:
      'Local-canonical memory, five stratified layers, and markdown as the durable substrate. Why the vault wins over a cloud-native database for agent memory.',
    date: '2026-04-09',
    author: 'Eric Smejkal',
    tags: ['Celune', 'Memory', 'Second Brain', 'Agents', 'Architecture'],
    published: true,
  },
  {
    slug: 'the-three-tier-orchestration-model',
    title: 'The Three-Tier Orchestration Model',
    description:
      'When to use a single agent, when to spawn sub-agents, when to stand up a full agent team. The decision tree, the hard rules, and the cost-control guardrails.',
    date: '2026-04-09',
    author: 'Eric Smejkal',
    tags: ['Celune', 'Agents', 'Orchestration', 'Claude Code', 'Engineering'],
    published: true,
  },
  {
    slug: 'how-rick-plans-your-week',
    title: 'How RICK Plans Your Week',
    description:
      'RICK is the general manager of your workweek: daily inbox triage, top-3 selection, delegation decisions, and the end-of-day wrap that keeps tomorrow stable.',
    date: '2026-04-09',
    author: 'Eric Smejkal',
    tags: ['Celune', 'RICK', 'Agents', 'Planning', 'Productivity'],
    published: true,
  },
  {
    slug: 'hooks-vs-skills-when-to-use-which',
    title: 'Hooks vs Skills: When to Use Which',
    description:
      'Hooks are harness-level automation. Skills are agent-level workflows. The decision rule, the failure modes, and the patterns that combine both.',
    date: '2026-04-09',
    author: 'Eric Smejkal',
    tags: ['Claude Code', 'Hooks', 'Skills', 'Celune', 'Engineering'],
    published: true,
  },
];

export function getAllPosts(): BlogPost[] {
  return posts.filter((p) => p.published).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug && p.published);
}

/** Format an ISO date string for display: "March 3, 2026" */
export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
