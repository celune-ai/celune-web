import Image from 'next/image';
import { Github, Twitter } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Docs', href: 'https://docs.celune.ai', external: true },
  { label: 'Blog', href: '#' },
  { label: 'Status', href: '#' },
  { label: 'Contact', href: 'mailto:hello@celune.ai' },
];

export function CeluneFooter() {
  return (
    <footer className="border-t border-dashed border-white/[0.06]">
      <div className="container py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Image
              src="/celune_light.svg"
              alt="Celune"
              width={120}
              height={24}
              className="h-5 w-auto opacity-60"
            />
            <div className="flex items-center gap-3">
              <a href="https://github.com/celune-ai" target="_blank" rel="noopener noreferrer" className="text-neutral-700 transition-colors hover:text-white">
                <Github className="h-3.5 w-3.5" />
              </a>
              <a href="https://x.com/celune_ai" target="_blank" rel="noopener noreferrer" className="text-neutral-700 transition-colors hover:text-white">
                <Twitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Links — single row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-neutral-600 transition-colors hover:text-neutral-300"
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dashed border-white/[0.04]">
        <div className="container flex items-center justify-between py-5">
          <p className="text-[11px] text-neutral-700">
            &copy; {new Date().getFullYear()} Celune. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-[11px] text-neutral-700 transition-colors hover:text-neutral-400">Privacy</a>
            <a href="/terms" className="text-[11px] text-neutral-700 transition-colors hover:text-neutral-400">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
