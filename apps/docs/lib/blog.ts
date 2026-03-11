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
    slug: 'future-of-software-teams',
    title: 'The Future of Software Teams Is Smaller Than You Think',
    description:
      'Gartner predicts 80% of organizations will shrink their engineering teams by 2030. Solo-founded startups are surging. What happens when AI agents compress the headcount needed to ship ambitious software.',
    date: '2026-03-11',
    author: 'Eric Smejkal',
    tags: ['AI', 'Teams', 'Industry'],
    published: true,
  },
  {
    slug: 'why-ai-assistants-forget-everything',
    title: 'Why Your AI Coding Assistant Forgets Everything (And Why It Matters More Than You Think)',
    description:
      'Memory amnesia is the #1 frustration with AI coding tools. Every session starts from zero. The tools that solve persistent memory will build the deepest moats in the industry.',
    date: '2026-03-10',
    author: 'Eric Smejkal',
    tags: ['AI', 'Developer Experience', 'Memory'],
    published: true,
  },
  {
    slug: 'gap-between-coding-and-project-management',
    title: 'The $52 Billion Gap Between AI Coding Tools and Project Management',
    description:
      'AI coding tools and AI project management are two separate worlds. The $52B agent orchestration market sits in the empty space between them. A data-driven look at the structural gap.',
    date: '2026-03-09',
    author: 'Eric Smejkal',
    tags: ['Market Analysis', 'AI', 'Developer Tools'],
    published: true,
  },
  {
    slug: 'single-agent-vs-agent-teams',
    title: 'Single Agent vs. Agent Teams: What Software Development Can Learn from How Humans Work',
    description:
      'The first autonomous AI engineer completed 15% of tasks in independent testing. The future isn\'t one super-agent — it\'s coordinated teams of specialists.',
    date: '2026-03-08',
    author: 'Eric Smejkal',
    tags: ['AI', 'Multi-Agent', 'Engineering'],
    published: true,
  },
  {
    slug: 'ai-productivity-paradox',
    title: 'The AI Productivity Paradox: Why Faster Code Doesn\'t Mean Faster Software',
    description:
      'A landmark study found AI tools make experienced developers 19% slower. The industry optimized for the wrong thing. The bottleneck was never typing speed.',
    date: '2026-03-07',
    author: 'Eric Smejkal',
    tags: ['AI', 'Productivity', 'Research'],
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
