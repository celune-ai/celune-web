import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/blog';
import { CeluneNav } from '@/components/celune/nav';
import { CeluneFooter } from '@/components/celune/footer';

export const metadata: Metadata = {
  title: 'Blog — Celune',
  description:
    'Articles, tutorials, and thought leadership on AI agents, autonomous engineering, and building with AI.',
  openGraph: {
    title: 'Blog — Celune',
    description:
      'Articles, tutorials, and thought leadership on AI agents, autonomous engineering, and building with AI.',
    url: 'https://celune.ai/blog',
    siteName: 'Celune',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Celune Blog' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Celune',
    description:
      'Articles, tutorials, and thought leadership on AI agents, autonomous engineering, and building with AI.',
    images: ['/og-image.jpg'],
    creator: '@celune_ai',
  },
  alternates: { canonical: 'https://celune.ai/blog' },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <CeluneNav />
      <main className="min-h-screen pt-[4.5rem]">
        {/* Hero */}
        <div className="border-b border-dashed border-white/[0.08]">
          <div className="container py-16 md:py-24">
            <p className="mb-4 font-mono text-xs tracking-widest text-emerald-400 uppercase">
              [Blog]
            </p>
            <h1 className="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              From the studio
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-neutral-400">
              Articles on AI agents, autonomous engineering, and building products with an AI-native
              workflow.
            </p>
          </div>
        </div>

        {/* Post grid */}
        <div className="container py-12 md:py-16">
          {posts.length === 0 ? (
            <p className="text-sm text-neutral-600">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="flex h-full flex-col rounded-lg border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-emerald-500/40 hover:bg-white/[0.04]">
                    <div className="mb-3 flex items-center gap-3">
                      <time
                        dateTime={post.date}
                        className="font-mono text-[11px] text-neutral-600"
                      >
                        {formatDate(post.date)}
                      </time>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-neutral-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h2 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-emerald-400">
                      {post.title}
                    </h2>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-400">
                      {post.description}
                    </p>
                    <span className="mt-auto text-xs font-medium text-emerald-400">
                      Read more →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <CeluneFooter />
    </>
  );
}
