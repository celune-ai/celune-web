/**
 * Static search index for CMD+K command palette.
 * Built from the docs-nav sections and doc metadata.
 * Client-side text matching — no AI/embeddings.
 */

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  section: string;
  keywords: string[];
}

/**
 * Flat search index derived from navigation sections.
 * Each entry includes section context and keyword tokens for matching.
 */
export const searchIndex: SearchEntry[] = [
  // Getting Started
  {
    title: 'Introduction',
    description: 'Get started with Celune — account setup, onboarding, and first project.',
    href: '/getting-started',
    section: 'Getting Started',
    keywords: [
      'getting started',
      'introduction',
      'sign up',
      'onboarding',
      'account',
      'setup',
      'quick start',
    ],
  },
  {
    title: 'FAQ',
    description: 'Frequently asked questions about Celune.',
    href: '/faq',
    section: 'Getting Started',
    keywords: ['faq', 'frequently asked', 'questions', 'help'],
  },

  // Concepts
  {
    title: 'Agents',
    description: 'AI agents that execute tasks, collaborate, and learn in your workspace.',
    href: '/concepts/agents',
    section: 'Concepts',
    keywords: ['agents', 'ai', 'workforce', 'team', 'orchestration'],
  },
  {
    title: 'Skills',
    description: 'Reusable capabilities that agents use to complete work.',
    href: '/concepts/skills',
    section: 'Concepts',
    keywords: ['skills', 'capabilities', 'tools', 'abilities'],
  },
  {
    title: 'Projects & Tasks',
    description: 'Organize work into projects and break them into trackable tasks.',
    href: '/concepts/projects',
    section: 'Concepts',
    keywords: ['projects', 'tasks', 'work', 'organize', 'tracking', 'lifecycle'],
  },
  {
    title: 'Workspaces',
    description: 'Isolated environments for teams with their own agents, settings, and data.',
    href: '/concepts/workspaces',
    section: 'Concepts',
    keywords: ['workspaces', 'teams', 'environments', 'organization', 'multi-tenant'],
  },
  {
    title: 'Permissions',
    description: 'Role-based access control for workspace members and agents.',
    href: '/concepts/permissions',
    section: 'Concepts',
    keywords: ['permissions', 'roles', 'access', 'rbac', 'security', 'members'],
  },
  {
    title: 'Memory',
    description: 'Persistent knowledge that agents retain across sessions.',
    href: '/concepts/memory',
    section: 'Concepts',
    keywords: ['memory', 'knowledge', 'persistence', 'context', 'brain', 'recall'],
  },
  {
    title: 'Analytics',
    description: 'Metrics and insights about agent activity and workspace performance.',
    href: '/concepts/analytics',
    section: 'Concepts',
    keywords: ['analytics', 'metrics', 'insights', 'performance', 'dashboard', 'charts'],
  },
  {
    title: 'Activity Feed',
    description: 'Real-time stream of events happening in your workspace.',
    href: '/concepts/activity',
    section: 'Concepts',
    keywords: ['activity', 'feed', 'events', 'real-time', 'stream', 'log'],
  },
  {
    title: 'Integrations',
    description: 'Connect Celune to GitHub, Slack, and other tools.',
    href: '/concepts/integrations',
    section: 'Concepts',
    keywords: ['integrations', 'github', 'slack', 'connect', 'tools', 'third-party'],
  },

  // Guides
  {
    title: 'MCP Setup',
    description: 'Configure the Model Context Protocol for agent-to-tool communication.',
    href: '/guides/mcp-setup',
    section: 'Guides',
    keywords: ['mcp', 'model context protocol', 'setup', 'configure', 'tools'],
  },
  {
    title: 'Agent Lead',
    description: 'Designate and configure a lead agent for your workspace.',
    href: '/guides/agent-lead',
    section: 'Guides',
    keywords: ['agent', 'lead', 'primary', 'configure', 'designate'],
  },
  {
    title: 'Memory (Second Brain)',
    description: 'Set up and use the memory system for persistent agent knowledge.',
    href: '/guides/memory',
    section: 'Guides',
    keywords: ['memory', 'second brain', 'knowledge', 'obsidian', 'vault', 'persistence'],
  },
  {
    title: 'Voice Setup',
    description: 'Enable text-to-speech and voice cloning for agent interactions.',
    href: '/guides/voice-setup',
    section: 'Guides',
    keywords: ['voice', 'tts', 'text-to-speech', 'elevenlabs', 'cloning', 'audio'],
  },
  {
    title: 'GitHub Integration',
    description: 'Connect your GitHub repositories for code-aware agent workflows.',
    href: '/guides/github-integration',
    section: 'Guides',
    keywords: ['github', 'integration', 'repository', 'code', 'git', 'pull request'],
  },
  {
    title: 'Slack Integration',
    description: 'Connect Slack for agent notifications and team communication.',
    href: '/guides/slack-integration',
    section: 'Guides',
    keywords: ['slack', 'integration', 'notifications', 'messaging', 'team'],
  },
  {
    title: 'API Keys',
    description: 'Create and manage API keys for programmatic access.',
    href: '/guides/api-keys',
    section: 'Guides',
    keywords: ['api', 'keys', 'tokens', 'authentication', 'programmatic'],
  },
  {
    title: 'BYOK',
    description: 'Bring your own API keys for AI model providers.',
    href: '/guides/byok',
    section: 'Guides',
    keywords: ['byok', 'bring your own key', 'api key', 'provider', 'anthropic', 'openai'],
  },
  {
    title: 'Billing & Plans',
    description: 'Understand pricing tiers, usage, and billing management.',
    href: '/guides/billing',
    section: 'Guides',
    keywords: ['billing', 'plans', 'pricing', 'subscription', 'usage', 'builder', 'pro', 'team'],
  },

  // Security
  {
    title: 'Security & Compliance',
    description: 'Security practices, data handling, and compliance information.',
    href: '/security',
    section: 'Security',
    keywords: ['security', 'compliance', 'privacy', 'data', 'encryption', 'soc2'],
  },

  // API Reference
  {
    title: 'API Quick Start',
    description: 'Get up and running with the Celune API in minutes.',
    href: '/api-reference/overview',
    section: 'API Reference',
    keywords: ['api', 'quick start', 'rest', 'endpoints', 'overview'],
  },
  {
    title: 'Authentication',
    description: 'API authentication methods and token management.',
    href: '/api-reference/authentication',
    section: 'API Reference',
    keywords: ['authentication', 'auth', 'token', 'bearer', 'api key'],
  },
  {
    title: 'Agents API',
    description: 'API endpoints for managing and interacting with agents.',
    href: '/api-reference/agents',
    section: 'API Reference',
    keywords: ['agents', 'api', 'endpoints', 'crud', 'manage'],
  },

  // Public pages
  {
    title: 'Guiding Principles',
    description: 'Three principles that govern what we build, how we work, and how we ship.',
    href: '/principles',
    section: 'Public',
    keywords: ['principles', 'values', 'philosophy', 'mission'],
  },
  {
    title: 'Influences',
    description: 'People, publications, tools, and ideas that shape how we think.',
    href: '/influences',
    section: 'Public',
    keywords: ['influences', 'inspiration', 'reading', 'tools', 'ideas'],
  },
  {
    title: 'How We Work',
    description: 'Communication style, decision-making, vibe, and what drives the studio.',
    href: '/how-we-work',
    section: 'Public',
    keywords: ['how we work', 'culture', 'communication', 'studio', 'team'],
  },

  // Design system pages
  {
    title: 'Design System',
    description: 'Introduction to the Celune design system.',
    href: '/design',
    section: 'Design',
    keywords: ['design', 'system', 'ui', 'components', 'introduction'],
  },
  {
    title: 'Color Usage',
    description: 'Color palette, semantic tokens, and usage guidelines.',
    href: '/design/colors',
    section: 'Design',
    keywords: ['colors', 'palette', 'tokens', 'theme', 'brand', 'green'],
  },
  {
    title: 'Typography',
    description: 'Font families, sizes, weights, and typographic scale.',
    href: '/design/typography',
    section: 'Design',
    keywords: ['typography', 'fonts', 'text', 'soehne', 'inter', 'heading'],
  },
  {
    title: 'Spacing',
    description: 'Spacing scale and layout guidelines.',
    href: '/design/spacing',
    section: 'Design',
    keywords: ['spacing', 'layout', 'padding', 'margin', 'gap'],
  },
  {
    title: 'Icons',
    description: 'Icon library and usage patterns.',
    href: '/design/icons',
    section: 'Design',
    keywords: ['icons', 'lucide', 'svg', 'pictogram'],
  },
  {
    title: 'Accessibility',
    description: 'Accessibility guidelines and ARIA patterns.',
    href: '/design/accessibility',
    section: 'Design',
    keywords: ['accessibility', 'a11y', 'aria', 'screen reader', 'wcag'],
  },
  {
    title: 'Writing',
    description: 'Writing style, tone, and content guidelines.',
    href: '/design/writing',
    section: 'Design',
    keywords: ['writing', 'copy', 'tone', 'style', 'content'],
  },
  {
    title: 'Theming',
    description: 'Dark mode, CSS custom properties, and theme configuration.',
    href: '/design/theming',
    section: 'Design',
    keywords: ['theming', 'dark mode', 'css variables', 'custom properties'],
  },
  {
    title: 'Tailwind Classes',
    description: 'Custom Tailwind utility classes and design tokens.',
    href: '/design/tailwind-classes',
    section: 'Design',
    keywords: ['tailwind', 'css', 'utility', 'classes', 'tokens'],
  },
  {
    title: 'Charts',
    description: 'Chart components and data visualization patterns.',
    href: '/design/charts',
    section: 'Design',
    keywords: ['charts', 'graphs', 'data', 'visualization', 'recharts'],
  },
  {
    title: 'Metric Cards',
    description: 'Metric card components for dashboards.',
    href: '/design/metrics',
    section: 'Design',
    keywords: ['metrics', 'cards', 'dashboard', 'kpi', 'stats'],
  },
];

/**
 * Search the index with simple text matching.
 * Matches against title, description, section, and keywords.
 * Returns results sorted by relevance (title match > keyword match > description match).
 */
export function searchDocs(query: string): SearchEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const terms = q.split(/\s+/);

  const scored = searchIndex
    .map((entry) => {
      let score = 0;
      const titleLower = entry.title.toLowerCase();
      const descLower = entry.description.toLowerCase();
      const sectionLower = entry.section.toLowerCase();
      const keywordsJoined = entry.keywords.join(' ');

      for (const term of terms) {
        // Exact title match is highest priority
        if (titleLower === q) score += 100;
        // Title contains term
        if (titleLower.includes(term)) score += 10;
        // Section contains term
        if (sectionLower.includes(term)) score += 5;
        // Keyword match
        if (keywordsJoined.includes(term)) score += 3;
        // Description contains term
        if (descLower.includes(term)) score += 1;
      }

      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map(({ entry }) => entry);
}
