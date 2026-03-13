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
