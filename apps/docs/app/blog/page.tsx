import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - Celune',
  description: 'Articles, tutorials, and thought leadership from the Celune studio.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="px-10 py-10">
      <div className="mx-auto max-w-[57.6rem]">
        <div className="mb-10">
          <h1 className="text-foreground mb-2 text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="text-foreground-lighter text-base">
            Articles, tutorials, and thought leadership from the studio.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-foreground-muted text-sm">No posts yet. Check back soon.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="border-border hover:border-brand rounded-lg border p-6 transition-colors">
                    <div className="mb-2 flex items-center gap-3">
                      <time
                        dateTime={post.date}
                        className="text-foreground-muted font-mono text-xs"
                      >
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
                    <h2 className="text-foreground group-hover:text-brand mb-1.5 text-lg font-semibold transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-foreground-lighter text-sm leading-relaxed">
                      {post.description}
                    </p>
                    <div className="text-brand mt-4 text-xs font-medium">Read more →</div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
