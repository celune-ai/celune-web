'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { URL_DOCS, URL_APP } from '@/lib/branding';

const NAV_LINKS = [
{ label: 'Docs', href: URL_DOCS, external: true },
];

export function CeluneNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-dashed border-white/[0.08] transition-all duration-300',
        scrolled
          ? 'bg-[#08080A]/90 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/celune_light.svg"
            alt="Celune"
            width={120}
            height={24}
            className="h-5 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="rounded-md px-3 py-1.5 text-[13px] text-neutral-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="ml-4 h-4 w-px bg-white/[0.06]" />
          <a
            href={`${URL_APP}/login`}
            className="ml-4 rounded-md border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-[13px] font-medium text-white transition-all hover:bg-white/[0.08]"
          >
            Sign in
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
        >
          <div className="space-y-1.5">
            <div className={cn('h-px w-5 bg-white transition-all', mobileOpen && 'translate-y-[3.5px] rotate-45')} />
            <div className={cn('h-px w-5 bg-white transition-all', mobileOpen && '-translate-y-[3.5px] -rotate-45')} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-nav-menu" className="border-t border-dashed border-white/[0.06] bg-[#08080A]/95 backdrop-blur-xl md:hidden">
          <div className="container flex flex-col gap-4 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`${URL_APP}/login`}
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-md border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              Sign in
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
