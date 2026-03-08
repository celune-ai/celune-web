'use client';

import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // null = not yet determined (SSR / before hydration)
  // true = user prefers reduced motion → skip Lenis
  // false = full motion → enable Lenis
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // On the server and before the effect fires, render children without Lenis.
  // This avoids a FOUC where Lenis mounts for reduced-motion users and then
  // immediately unmounts after the first paint.
  if (prefersReducedMotion === null || prefersReducedMotion === true) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
