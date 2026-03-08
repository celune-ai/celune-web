'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';

interface ScrollProgress {
  progress: number;
  direction: 'up' | 'down' | null;
}

export function useScrollProgress(): ScrollProgress {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  const update = useCallback((currentProgress: number) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const prev = lastProgressRef.current;

      if (currentProgress > prev) {
        setDirection('down');
      } else if (currentProgress < prev) {
        setDirection('up');
      }

      lastProgressRef.current = currentProgress;
      setProgress(currentProgress);
    });
  }, []);

  useLenis(({ progress: lenisProgress }) => {
    update(lenisProgress);
  });

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { progress, direction };
}
