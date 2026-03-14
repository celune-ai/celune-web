import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPost, getAllPosts, formatDate } from '@/lib/blog';

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
    title: `${post.title} - Celune`,
    description: post.description,
  };
}

// Dynamically import the MDX file for the given slug.
// Files live at content/blog/{slug}.mdx
async function loadPostContent(slug: string) {
  try {
    const mod = await import(`../../../content/blog/${slug}.mdx`);
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
    <div className="px-10 py-10">
      <div className="mx-auto max-w-[57.6rem]">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-foreground-lighter hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          ← All posts
        </Link>

        {/* Post header */}
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <time dateTime={post.date} className="text-foreground-muted font-mono text-xs">
              {formatDate(post.date)}
            </time>
            <div className="flex gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-surface-200 text-foreground-lighter rounded px-1.5 py-0.5 font-mono text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h1 className="text-foreground mb-3 text-3xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <p className="text-foreground-lighter text-base leading-relaxed">{post.description}</p>
          <div className="border-border mt-6 border-t" />
        </header>

        {/* Post body - rendered MDX */}
        <div className="prose prose-sm">
          <PostContent />
        </div>

        {/* Footer */}
        <div className="border-border mt-12 border-t pt-8">
          <p className="text-foreground-muted text-sm">
            Written by <span className="text-foreground font-medium">{post.author}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
