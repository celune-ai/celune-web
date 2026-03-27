import Image from 'next/image';
import { Github } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Docs', href: 'https://docs.celune.ai', external: true },
  { label: 'Blog', href: '/blog', external: false },
  { label: 'Contact', href: 'https://docs.celune.ai/support', external: true },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function CeluneFooter() {
  return (
    <footer className="relative bg-[#08080A]">
      <div className="container py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Image
              src="/celune_light.svg"
              alt="Celune"
              width={120}
              height={24}
              className="h-5 w-auto"
            />
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/celune-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-white"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://x.com/celuneapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-white"
              >
                <XIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Links — single row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-white/60 transition-colors hover:text-white"
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar divider — uses SectionDivider style */}
      <div className="relative mx-12">
        <div className="border-t border-dashed border-white/[0.08]" />
      </div>
      <div className="container flex items-center justify-between py-5">
        <p className="text-[11px] text-white/50">
          &copy; {new Date().getFullYear()} Celune. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="/privacy"
            className="text-[11px] text-white/50 transition-colors hover:text-white/80"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="text-[11px] text-white/50 transition-colors hover:text-white/80"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
