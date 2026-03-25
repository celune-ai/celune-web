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
