import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPost, getAllPosts, formatDate } from '@/lib/blog';
import { CeluneNav } from '@/components/celune/nav';
import { CeluneFooter } from '@/components/celune/footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Celune`,
    description: post.description,
    openGraph: {
      title: `${post.title} — Celune`,
      description: post.description,
      url: `https://celune.ai/blog/${slug}`,
      siteName: 'Celune',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — Celune`,
      description: post.description,
      images: ['/og-image.jpg'],
      creator: '@celune_ai',
    },
    alternates: { canonical: `https://celune.ai/blog/${slug}` },
  };
}

async function loadPostContent(slug: string) {
  try {
    const mod = await import(`../../../../content/blog/${slug}.mdx`);
    return mod.default as React.ComponentType;
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const PostContent = await loadPostContent(slug);
  if (!PostContent) notFound();

  return (
    <>
      <CeluneNav />
      <main className="min-h-screen pt-[4.5rem]">
        <article className="container max-w-3xl py-12 md:py-20">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-white"
          >
            ← All posts
          </Link>

          {/* Post header */}
          <header className="mb-10">
            <div className="mb-3 flex items-center gap-3">
              <time dateTime={post.date} className="font-mono text-[11px] text-neutral-600">
                {formatDate(post.date)}
              </time>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {post.title}
            </h1>
            <p className="text-base leading-relaxed text-neutral-400">{post.description}</p>
            <div className="mt-6 border-t border-dashed border-white/[0.08]" />
          </header>

          {/* Post body */}
          <div className="prose prose-invert prose-sm max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white prose-p:text-neutral-300 prose-p:leading-relaxed prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-emerald-300 prose-code:before:content-none prose-code:after:content-none prose-li:text-neutral-300 prose-hr:border-white/[0.08]">
            <PostContent />
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-dashed border-white/[0.08] pt-8">
            <p className="text-sm text-neutral-600">
              Written by <span className="font-medium text-neutral-400">{post.author}</span>
            </p>
          </div>
        </article>
      </main>
      <CeluneFooter />
    </>
  );
}
