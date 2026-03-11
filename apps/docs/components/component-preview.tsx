import type { ReactNode } from 'react';

interface ComponentPreviewProps {
  children: ReactNode;
  className?: string;
}

/**
 * Styled preview container for live component demos.
 * Renders children centered in a dark card with subtle border.
 * Pair with CodeBlock below it for the full docs pattern.
 */
export function ComponentPreview({ children, className = '' }: ComponentPreviewProps) {
  return (
    <div
      className={`not-prose border-border bg-surface-75 my-6 flex min-h-[120px] items-center justify-center rounded-lg border p-8 ${className}`}
    >
      {children}
    </div>
  );
}
