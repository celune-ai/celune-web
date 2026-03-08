'use client';

/**
 * Decorative grid frame elements inspired by AgentMail.to
 * - Crosshair (+) markers at section intersections
 * - Dashed border dividers between sections
 * - Outer border frame around the page content
 */

export function Crosshair({ className = '' }: { className?: string }) {
  return (
    <span className={`text-neutral-700 text-xs leading-none select-none ${className}`} aria-hidden="true">
      +
    </span>
  );
}

export function SectionDivider() {
  return (
    <div className="relative mx-12">
      <div className="flex items-center">
        <Crosshair className="shrink-0 -ml-[3px]" />
        <div className="flex-1 border-t border-dashed border-white/[0.08]" />
        <Crosshair className="shrink-0 -mr-[3px]" />
      </div>
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-neutral-500">
      <span className="text-neutral-600">[</span>
      <span className="uppercase">{children}</span>
      <span className="text-neutral-600">]</span>
    </div>
  );
}

export function GridFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Left border — always 48px from screen edge */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-12 w-px hidden lg:block">
        <div className="h-full border-l border-dashed border-white/[0.06]" />
      </div>
      {/* Right border — always 48px from screen edge */}
      <div className="pointer-events-none absolute top-0 bottom-0 right-12 w-px hidden lg:block">
        <div className="h-full border-l border-dashed border-white/[0.06]" />
      </div>
      {children}
    </div>
  );
}
