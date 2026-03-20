export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string: YYYY-MM-DD
  author: string;
  tags: string[];
  published: boolean;
  heroImage?: string;
}

/** Estimate reading time in minutes from word count (200 WPM). */
export function estimateReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

export const posts: BlogPost[] = [
  {
    slug: 'ai-task-management-developers',
    title: 'AI Task Management for Developers: The Layer Your Coding Assistant Is Missing',
    description:
      'AI coding tools solved code generation. But planning, tracking, and orchestrating work across AI agents is still manual. Here\'s the missing layer in the dev tools stack.',
    date: '2026-03-22',
    author: 'Celune Team',
    tags: ['AI', 'Task Management', 'Productivity', 'Agents'],
    published: true,
    heroImage: '/blog/ai-task-management-developers.jpg',
  },
  {
    slug: 'context-engineering-ai-agents',
    title: 'Context Engineering: The Skill That Separates Good AI Agents from Great Ones',
    description:
      'Model capability isn\'t the bottleneck — context is. How to structure identity, knowledge, state, and memory to get reliable output from AI agents.',
    date: '2026-03-21',
    author: 'Celune Team',
    tags: ['AI', 'Agents', 'Engineering', 'Memory'],
    published: true,
    heroImage: '/blog/context-engineering-ai-agents.jpg',
  },
  {
    slug: 'one-person-startup-ai-agents',
    title: 'The One-Person Startup Is Real Now',
    description:
      "Solo founders are building real companies with AI agent teams. Here's what changed in 2026 — and why the one-person startup isn't a gimmick anymore.",
    date: '2026-03-20',
    author: 'Celune Team',
    tags: ['AI', 'Agents', 'Productivity', 'Building in Public'],
    published: true,
    heroImage: '/blog/one-person-startup-ai-agents.jpg',
  },
  {
    slug: 'control-ai-agent-costs',
    title: 'How to Control AI Agent Costs Without Killing Quality',
    description:
      'Running AI agents gets expensive fast. Here are the cost levers that actually work — model tiering, prompt caching, and knowing when cheap is good enough.',
    date: '2026-03-19',
    author: 'Celune Team',
    tags: ['AI', 'Agents', 'Engineering', 'Productivity'],
    published: true,
    heroImage: '/blog/control-ai-agent-costs.jpg',
  },
  {
    slug: 'second-brain-ai-agents',
    title: 'Your Second Brain Is About to Get Its Own Agents',
    description:
      "Second brains have been passive filing systems. In 2026, they're getting their own AI agents — and that changes everything about knowledge work.",
    date: '2026-03-18',
    author: 'Celune Team',
    tags: ['AI', 'Second Brain', 'Agents', 'Productivity'],
    published: true,
    heroImage: '/blog/second-brain-ai-agents.jpg',
  },
  {
    slug: 'mcp-servers-ai-agents',
    title: 'A Practical Guide to MCP Servers for AI Agents',
    description:
      'How to set up MCP servers that give your AI agents access to databases, Slack, GitHub, and custom tools — with patterns, anti-patterns, and real examples.',
    date: '2026-03-17',
    author: 'Celune Team',
    tags: ['AI', 'MCP', 'Engineering', 'Agents'],
    published: true,
    heroImage: '/blog/mcp-servers-ai-agents.jpg',
  },
  {
    slug: 'ai-agent-job-description',
    title: 'Why Your AI Agent Needs a Job Description',
    description:
      'Generic agents produce generic output. Defined roles, clear boundaries, and explicit quality standards transform AI agent performance — the same way they transform human teams.',
    date: '2026-03-16',
    author: 'Celune Team',
    tags: ['AI', 'Agents', 'Productivity', 'Engineering'],
    published: true,
    heroImage: '/blog/ai-agent-job-description.jpg',
  },
  {
    slug: 'ship-features-while-you-sleep',
    title: 'How We Ship Features While We Sleep',
    description:
      'Inside the overnight build system that lets a solo founder wake up to merged PRs — structured tasks, sprint gates, and the discipline that makes it work.',
    date: '2026-03-15',
    author: 'Celune Team',
    tags: ['AI', 'Building in Public', 'Productivity', 'Engineering'],
    published: true,
    heroImage: '/blog/ship-features-while-you-sleep.jpg',
  },
  {
    slug: 'ai-code-review-bottleneck',
    title: 'The Code Review Bottleneck: Why AI Needs to Review AI',
    description:
      "AI generates code faster than humans can review it. The old model is breaking — here's how hybrid AI-human review is replacing it, and why coverage matters more than speed.",
    date: '2026-03-14',
    author: 'Celune Team',
    tags: ['AI', 'Engineering', 'Agents', 'Productivity'],
    published: true,
    heroImage: '/blog/ai-code-review-bottleneck.jpg',
  },
  {
    slug: 'agent-native-task-management',
    title: 'The Rise of Agent-Native Task Management',
    description:
      'Why every project management tool was designed for humans — and what changes when AI agents become first-class participants in the task lifecycle.',
    date: '2026-03-14',
    author: 'Celune Team',
    tags: ['AI', 'Agents', 'Task Management', 'Productivity'],
    published: true,
    heroImage: '/blog/agent-native-task-management.jpg',
  },
  {
    slug: 'ai-agent-persistent-memory',
    title: 'How to Give Your AI Agent Persistent Memory',
    description:
      'A practical guide to implementing persistent memory for AI agents — typed categories, write-on-learn patterns, and the architecture that actually scales.',
    date: '2026-03-13',
    author: 'Celune Team',
    tags: ['AI', 'Agents', 'Memory', 'Engineering'],
    published: true,
    heroImage: '/blog/ai-agent-persistent-memory.jpg',
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
    heroImage: '/blog/building-with-ai-agents.jpg',
  },
];

export interface BlogPostWithMeta extends BlogPost {
  readingTime: number;
}

/** Read MDX file and count words to estimate reading time. */
function getWordCount(slug: string): number {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
    const content = fs.readFileSync(filePath, 'utf-8') as string;
    // Strip code blocks, MDX imports, and HTML tags for cleaner word count
    const stripped = content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/^import\s.*$/gm, '')
      .replace(/<[^>]+>/g, '')
      .replace(/[#*`\-_>|]/g, '');
    return stripped.split(/\s+/).filter(Boolean).length;
  } catch {
    return 0;
  }
}

export function getAllPosts(): BlogPostWithMeta[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({
      ...p,
      readingTime: estimateReadingTime(getWordCount(p.slug)),
    }));
}

export function getPost(slug: string): BlogPostWithMeta | undefined {
  const post = posts.find((p) => p.slug === slug && p.published);
  if (!post) return undefined;
  return {
    ...post,
    readingTime: estimateReadingTime(getWordCount(post.slug)),
  };
}

/** Format an ISO date string for display: "March 3, 2026" */
export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
