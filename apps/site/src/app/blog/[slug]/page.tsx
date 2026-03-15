import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPost, getAllPosts, formatDate } from '@/lib/blog';
import { extractTOC } from '@/lib/toc';
import { CeluneNav } from '@/components/celune/nav';
import { CeluneFooter } from '@/components/celune/footer';
import { AuthorCard } from '@/components/blog/author-card';
import { HeroImage } from '@/components/blog/hero-image';
import { StickyTOC } from '@/components/blog/sticky-toc';

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
      images: [
        { url: post.heroImage ?? '/og-image.jpg', width: 1200, height: 630, alt: post.title },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — Celune`,
      description: post.description,
      images: [post.heroImage ?? '/og-image.jpg'],
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

  const tocItems = extractTOC(slug);

  return (
    <>
      <CeluneNav />
      <main className="min-h-screen pt-[4.5rem]">
        {/* Post header — full width */}
        <div className="border-b border-dashed border-white/[0.08]">
          <div className="container max-w-5xl py-12 md:py-16">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1.5 rounded-md border border-white/[0.12] px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:border-white/[0.24] hover:text-white"
            >
              ← All posts
            </Link>

            <div className="mb-3 flex items-center gap-3">
              <time dateTime={post.date} className="font-mono text-[11px] text-neutral-600">
                {formatDate(post.date)}
              </time>
              <span className="font-mono text-[11px] text-neutral-600">·</span>
              <span className="font-mono text-[11px] text-neutral-600">
                {post.readingTime} min read
              </span>
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

            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {post.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-400">
              {post.description}
            </p>
          </div>
        </div>

        {/* Hero image */}
        {post.heroImage && (
          <div className="container max-w-5xl py-8">
            <HeroImage src={post.heroImage} alt={post.title} priority />
          </div>
        )}

        {/* 3-column layout: author | content | TOC */}
        <div className="container max-w-5xl pb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[180px_1fr_180px]">
            {/* Left sidebar — author card (hidden on mobile, shown in header instead) */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <AuthorCard author={post.author} date={post.date} readingTime={post.readingTime} />
              </div>
            </aside>

            {/* Center — article content */}
            <article className="min-w-0">
              {/* Mobile author info */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-400">{post.author}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-sm text-neutral-500">{post.readingTime} min read</span>
                </div>
              </div>

              {/* Mobile TOC */}
              {tocItems.length > 0 && (
                <details className="mb-8 rounded-lg border border-white/[0.08] bg-white/[0.02] lg:hidden">
                  <summary className="cursor-pointer px-4 py-3 font-mono text-[11px] tracking-widest text-neutral-500 uppercase">
                    Table of contents
                  </summary>
                  <div className="border-t border-white/[0.08] px-4 py-3">
                    <ul className="flex flex-col gap-1">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`block py-1 text-[13px] text-neutral-400 transition-colors hover:text-white ${
                              item.level === 3 ? 'pl-4' : ''
                            }`}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              )}

              {/* Post body */}
              <div className="prose max-w-none">
                <PostContent />
              </div>

              {/* Post footer */}
              <div className="mt-16 border-t border-dashed border-white/[0.08] pt-8">
                <p className="text-sm text-neutral-600">
                  Written by <span className="font-medium text-neutral-400">{post.author}</span>
                </p>
              </div>
            </article>

            {/* Right sidebar — TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <StickyTOC items={tocItems} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <CeluneFooter />
    </>
  );
}
