'use client';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

// Lenis disabled — it caused visible jitter when combined with
// framer-motion whileInView animations. Modern browsers handle
// smooth scrolling natively via CSS scroll-behavior.
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return <>{children}</>;
}
