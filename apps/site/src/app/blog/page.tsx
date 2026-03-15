import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, formatDate } from '@/lib/blog';
import type { BlogPostWithMeta } from '@/lib/blog';
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

function FeaturedCard({ post }: { post: BlogPostWithMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] transition-all hover:border-emerald-500/40 hover:bg-white/[0.04]">
        {/* Hero image */}
        {post.heroImage && (
          <div className="relative aspect-[2.4/1] w-full overflow-hidden">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}
        <div className="p-6 md:p-8">
          <div className="mb-3 flex items-center gap-3">
            <time dateTime={post.date} className="font-mono text-[11px] text-neutral-500">
              {formatDate(post.date)}
            </time>
            <span className="font-mono text-[11px] text-neutral-600">·</span>
            <span className="font-mono text-[11px] text-neutral-500">
              {post.readingTime} min read
            </span>
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
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-emerald-400 md:text-3xl">
            {post.title}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-400">{post.description}</p>
          <span className="mt-4 inline-block text-sm font-medium text-emerald-400">
            Read article →
          </span>
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPostWithMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] transition-all hover:border-emerald-500/40 hover:bg-white/[0.04]">
        {/* Thumbnail */}
        {post.heroImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 512px"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2">
            <time dateTime={post.date} className="font-mono text-[11px] text-neutral-500">
              {formatDate(post.date)}
            </time>
            <span className="font-mono text-[11px] text-neutral-600">·</span>
            <span className="font-mono text-[11px] text-neutral-500">{post.readingTime} min</span>
          </div>
          <h2 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-emerald-400">
            {post.title}
          </h2>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-400">{post.description}</p>
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
      </article>
    </Link>
  );
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <CeluneNav />
      <main className="min-h-screen pt-[4.5rem]">
        {/* Hero section */}
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

        {/* Posts */}
        <div className="container py-12 md:py-16">
          {posts.length === 0 ? (
            <p className="text-sm text-neutral-600">No posts yet. Check back soon.</p>
          ) : (
            <div className="flex flex-col gap-8">
              {/* Featured post */}
              {featured && <FeaturedCard post={featured} />}

              {/* Post grid */}
              {rest.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <CeluneFooter />
    </>
  );
}
