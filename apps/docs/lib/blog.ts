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
    slug: 'second-brain-ai-agents',
    title: 'Your Second Brain Is About to Get Its Own Agents',
    description:
      'Second brains have been passive filing systems. In 2026, they\'re getting their own AI agents — and that changes everything about knowledge work.',
    date: '2026-03-18',
    author: 'Eric Smejkal',
    tags: ['AI', 'Second Brain', 'Agents', 'Productivity'],
    published: true,
  },
  {
    slug: 'control-ai-agent-costs',
    title: 'How to Control AI Agent Costs Without Killing Quality',
    description:
      'Running AI agents gets expensive fast. Here are the cost levers that actually work — model tiering, prompt caching, and knowing when cheap is good enough.',
    date: '2026-03-19',
    author: 'Eric Smejkal',
    tags: ['AI', 'Agents', 'Engineering', 'Productivity'],
    published: true,
  },
  {
    slug: 'one-person-startup-ai-agents',
    title: 'The One-Person Startup Is Real Now',
    description:
      'Solo founders are building real companies with AI agent teams. Here\'s what changed in 2026 — and why the one-person startup isn\'t a gimmick anymore.',
    date: '2026-03-20',
    author: 'Eric Smejkal',
    tags: ['AI', 'Agents', 'Productivity', 'Building in Public'],
    published: true,
  },
  {
    slug: 'mcp-servers-ai-agents',
    title: 'A Practical Guide to MCP Servers for AI Agents',
    description:
      'How to set up MCP servers that give your AI agents access to databases, Slack, GitHub, and custom tools — with patterns, anti-patterns, and real examples.',
    date: '2026-03-17',
    author: 'Eric Smejkal',
    tags: ['AI', 'MCP', 'Engineering', 'Agents'],
    published: true,
  },
  {
    slug: 'ai-agent-job-description',
    title: 'Why Your AI Agent Needs a Job Description',
    description:
      'Generic agents produce generic output. Defined roles, clear boundaries, and explicit quality standards transform AI agent performance — the same way they transform human teams.',
    date: '2026-03-16',
    author: 'Eric Smejkal',
    tags: ['AI', 'Agents', 'Productivity', 'Engineering'],
    published: true,
  },
  {
    slug: 'ship-features-while-you-sleep',
    title: 'How We Ship Features While We Sleep',
    description:
      'Inside the overnight build system that lets a solo founder wake up to merged PRs — structured tasks, sprint gates, and the discipline that makes it work.',
    date: '2026-03-15',
    author: 'Eric Smejkal',
    tags: ['AI', 'Building in Public', 'Productivity', 'Engineering'],
    published: true,
  },
  {
    slug: 'agent-native-task-management',
    title: 'The Rise of Agent-Native Task Management',
    description:
      'Why every project management tool was designed for humans — and what changes when AI agents become first-class participants in the task lifecycle.',
    date: '2026-03-14',
    author: 'Eric Smejkal',
    tags: ['AI', 'Agents', 'Task Management', 'Productivity'],
    published: true,
  },
  {
    slug: 'ai-agent-persistent-memory',
    title: 'How to Give Your AI Agent Persistent Memory',
    description:
      'A practical guide to implementing persistent memory for AI agents — typed categories, write-on-learn patterns, and the architecture that actually scales.',
    date: '2026-03-13',
    author: 'Eric Smejkal',
    tags: ['AI', 'Agents', 'Memory', 'Engineering'],
    published: true,
  },
  {
    slug: 'building-with-ai-agents',
    title: 'Building with AI Agents: What Actually Works',
    description:
      'A practical account of running a one-person product studio with an AI agent workforce — what worked, what broke, and what we learned.',
    date: '2026-03-03',
    author: 'Celune Team',
    tags: ['AI', 'Claude Code', 'Productivity'],
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
