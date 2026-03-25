'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import DocsNav from './docs-nav';

const URL_APP = 'https://app.celune.ai';

const NAV_LINKS = [
  { label: 'Docs', href: '/' },
  { label: 'Design', href: '/design' },
  { label: 'Blog', href: 'https://celune.ai/blog' },
];

export function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isDesign = pathname.startsWith('/design');
  const isHome = pathname === '/';

  function isActive(href: string) {
    if (href === '/') return !isDesign;
    if (href.startsWith('http')) return false;
    return pathname.startsWith(href);
  }

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar: logo header + nav */}
      {
        <aside className="bg-surface-75 border-border flex w-[269px] shrink-0 flex-col border-r">
          {/* Logo container - matches platform app */}
          <div className="border-border flex h-14 shrink-0 items-center border-b px-4">
            <a href="/" className="flex items-center">
              <Image
                src="/celune_light.svg"
                alt="Celune"
                width={120}
                height={24}
                className="h-5 w-auto"
                priority
              />
            </a>
          </div>

          {/* Nav scrollable area */}
          <DocsNav />
        </aside>
      }

      {/* Content column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Action bar header */}
        <header className="border-border flex h-14 shrink-0 items-center justify-between border-b px-6">
          {/* Left: nav links */}
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-[14px] transition-colors ${
                  isActive(link.href)
                    ? 'text-foreground'
                    : 'text-foreground-lighter hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2 pr-[18px]">
            <button
              type="button"
              onClick={() => {
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
              }}
              className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[13px] text-white/40 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white/60"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded border border-white/[0.1] bg-white/[0.04] px-1 py-0.5 text-[11px] sm:inline">
                {'\u2318'}K
              </kbd>
            </button>
            <a
              href="/support"
              className="text-foreground-light hover:text-foreground rounded-md px-4 py-1.5 text-[13px] transition-colors"
              style={{ fontFamily: 'var(--font-soehne-kraftig)' }}
            >
              Support
            </a>
            <a
              href={`${URL_APP}/login`}
              className="rounded-md border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-[13px] text-white transition-all hover:bg-white/[0.08]"
              style={{ fontFamily: 'var(--font-soehne-kraftig)' }}
            >
              Log in
            </a>
            <a
              href={`${URL_APP}/signup`}
              className="bg-celune-500 hover:bg-celune-400 ml-2 rounded-md px-4 py-1.5 text-[13px] text-black transition-colors"
              style={{ fontFamily: 'var(--font-soehne-kraftig)' }}
            >
              Get Started
            </a>
          </div>
        </header>

        {/* Main content */}
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="flex-1">
            {isHome ? (
              <>{children}</>
            ) : (
              <div className="px-10 py-10">
                <div className="prose mx-auto max-w-[57.6rem]">{children}</div>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="border-border border-t">
            <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between sm:px-10">
              <p className="text-foreground-light text-xs font-light">&copy; 2026 Celune</p>
              <nav className="flex items-center gap-6">
                <a
                  href="https://celune.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-light hover:text-foreground text-xs transition-colors"
                >
                  Celune.ai
                </a>
                <a
                  href="https://app.celune.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-light hover:text-foreground text-xs transition-colors"
                >
                  App
                </a>
                <a
                  href="/support"
                  className="text-foreground-light hover:text-foreground text-xs transition-colors"
                >
                  Support
                </a>
              </nav>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
