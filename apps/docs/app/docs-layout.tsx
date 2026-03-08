'use client';

import type { ReactNode } from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import DocsNav from './docs-nav';
import { HeaderNav } from './header-nav';

const BASE = '';

function autoGrow(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

export function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Extract the page slug (last segment) for API calls — e.g. /guides/mcp-setup → mcp-setup
  const pathSegments = pathname.replace(/^\//, '').split('/');
  const slug = pathSegments[pathSegments.length - 1];
  const isDesign = pathname.startsWith('/design');
  const isBlog = pathname.startsWith('/blog');
  const isHome = pathname === '/';
  const canEdit = !isDesign && !isBlog && !isHome && pathname !== '/login' && slug !== '';

  // Auto-grow textarea when content changes
  useEffect(() => {
    if (textareaRef.current && editMode && !loading) {
      autoGrow(textareaRef.current);
    }
  }, [content, editMode, loading]);

  const handleEdit = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/docs/${slug}`);
      const data = await res.json();
      setContent(data.content);
    } catch {
      setContent('');
    }
    setLoading(false);
    setEditMode(true);
  }, [slug]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    await fetch(`${BASE}/api/docs/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    setSaving(false);
    setEditMode(false);
    router.refresh();
  }, [slug, content, router]);

  const handleCancel = useCallback(() => {
    setEditMode(false);
    setContent('');
  }, []);

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <>
      {/* Top bar */}
      <header className="border-border bg-background/90 fixed top-0 right-0 left-0 z-50 h-[49px] border-b backdrop-blur-md">
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <a href="/" className="text-foreground flex items-center gap-2 text-sm font-semibold">
              <Image
                src="/celune-logomark.svg"
                alt="Celune"
                width={22}
                height={22}
                className="hidden dark:block"
              />
              <Image
                src="/celune-logomark-light.svg"
                alt="Celune"
                width={22}
                height={22}
                className="dark:hidden"
              />
              Celune Docs
            </a>
            <HeaderNav />
          </div>
          <div className="flex items-center gap-2">
            {canEdit && !editMode && (
              <button
                type="button"
                onClick={handleEdit}
                className="border-border text-foreground-lighter hover:border-brand hover:text-foreground hidden items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-colors md:flex"
              >
                <Pencil size={12} />
                Edit
              </button>
            )}
            {canEdit && editMode && (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-foreground-lighter hover:text-foreground hidden items-center rounded-md px-3 py-1.5 text-xs transition-colors md:flex"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="border-brand text-brand hover:bg-brand hover:text-foreground-contrast hidden items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 md:flex"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </>
            )}
            <a
              href="https://celune.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-foreground-lighter hover:border-brand hover:text-foreground hidden items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-colors md:flex"
            >
              celune.ai
            </a>
          </div>
        </div>
      </header>

      {/* Body: sidebar + content */}
      <div className="flex pt-[49px]">
        {!isBlog && <DocsNav />}
        <main className="min-w-0 flex-1">
          {isBlog ? (
            // Blog pages manage their own layout and prose
            <>{children}</>
          ) : editMode ? (
            loading ? (
              <div className="px-10 py-10">
                <div className="mx-auto max-w-[57.6rem] space-y-4">
                  <div className="bg-surface-200 h-6 w-48 animate-pulse rounded" />
                  <div className="bg-surface-200 h-[calc(100vh-200px)] animate-pulse rounded" />
                </div>
              </div>
            ) : (
              <div className="px-10 py-10">
                <div className="mx-auto max-w-[57.6rem]">
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      autoGrow(e.target);
                    }}
                    className="text-foreground placeholder:text-foreground-muted w-full resize-none border-none bg-transparent p-0 font-mono text-sm focus:ring-0 focus:outline-none"
                    spellCheck={false}
                    autoFocus
                  />
                </div>
              </div>
            )
          ) : isHome ? (
            <>{children}</>
          ) : (
            <div className="px-10 py-10">
              <div className="prose prose-sm mx-auto max-w-[57.6rem]">{children}</div>
            </div>
          )}

          {/* Footer */}
          <footer className="border-border mt-auto border-t">
            <div className="mx-auto flex max-w-[57.6rem] flex-col items-center gap-4 px-10 py-8 sm:flex-row sm:justify-between">
              <p className="text-foreground-muted text-xs">&copy; 2026 Celune</p>
              <nav className="flex items-center gap-6">
                <a
                  href="https://celune.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-lighter hover:text-foreground text-xs transition-colors"
                >
                  Website
                </a>
                <a
                  href="https://app.celune.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-lighter hover:text-foreground text-xs transition-colors"
                >
                  App
                </a>
                <a
                  href="mailto:hello@celune.ai"
                  className="text-foreground-lighter hover:text-foreground text-xs transition-colors"
                >
                  Support
                </a>
              </nav>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
