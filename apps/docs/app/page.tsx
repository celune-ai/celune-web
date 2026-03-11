import Link from 'next/link';
import { ArrowRight, BookOpen, Lightbulb, Code, Compass, LifeBuoy, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import { StarField } from './components/star-field';

export const metadata: Metadata = {
  title: 'Celune Documentation',
  description: "Everything you need to build with Celune's agentic engineering platform.",
};

const QUICK_LINKS = [
  {
    title: 'Getting Started',
    description: 'Set up your account and deploy your first agent in minutes.',
    href: '/getting-started',
    icon: Zap,
  },
  {
    title: 'Concepts',
    description: 'Learn about agents, workspaces, and the core platform primitives.',
    href: '/concepts/agents',
    icon: Lightbulb,
  },
  {
    title: 'API Reference',
    description: 'Explore the REST API for programmatic access to Celune.',
    href: '/api-reference/overview',
    icon: Code,
  },
  {
    title: 'Guides',
    description: 'Step-by-step walkthroughs for common workflows and integrations.',
    href: '/guides/mcp-setup',
    icon: Compass,
  },
  {
    title: 'FAQ',
    description: 'Answers to the most common questions about the platform.',
    href: '/faq',
    icon: BookOpen,
  },
  {
    title: 'Support',
    description: 'Get help from the Celune team via email or community channels.',
    href: 'mailto:hello@celune.ai',
    icon: LifeBuoy,
  },
];

export default function DocsHome() {
  return (
    <div className="relative">
      <StarField />
      <div className="relative mx-auto w-full max-w-[64rem] px-6 py-16 sm:px-10 sm:py-24">
        {/* Hero */}
        <div className="mb-16 max-w-2xl">
          <h1 className="text-foreground mb-4 text-4xl font-light tracking-tight sm:text-5xl">
            Celune Documentation
          </h1>
          <p className="text-foreground-light text-lg leading-relaxed sm:text-xl">
            Everything you need to build with Celune&apos;s agentic engineering platform.
          </p>
        </div>

        {/* Quick links grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="border-border bg-surface-75 hover:border-foreground-muted hover:bg-surface-100 group flex flex-col rounded-lg border p-6 transition-colors"
            >
              <div className="bg-surface-200 text-foreground-lighter mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
                <Icon size={20} />
              </div>
              <h2 className="text-foreground mb-1 text-base" style={{ fontFamily: 'var(--font-soehne-kraftig)' }}>{title}</h2>
              <p className="mt-2 mb-4 flex-1 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {description}
              </p>
              <span className="text-brand group-hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors" style={{ fontFamily: 'var(--font-soehne-kraftig)' }}>
                Read more <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
