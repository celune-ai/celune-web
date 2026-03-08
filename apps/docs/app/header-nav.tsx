'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function HeaderNav() {
  const pathname = usePathname();
  const isDesign = pathname.startsWith('/design');
  const isBlog = pathname.startsWith('/blog');
  const isDocs = !isDesign && !isBlog;

  const base = 'rounded-md px-3 py-1.5 text-sm transition-colors';
  const active = 'text-foreground';
  const inactive = 'text-foreground-lighter hover:bg-surface-200 hover:text-foreground';

  return (
    <nav className="hidden items-center gap-1 md:flex">
      <Link href="/" className={`${base} ${isDocs ? active : inactive}`}>
        Docs
      </Link>
      <Link href="/design" className={`${base} ${isDesign ? active : inactive}`}>
        Design
      </Link>
      <Link href="/blog" className={`${base} ${isBlog ? active : inactive}`}>
        Blog
      </Link>
    </nav>
  );
}
