'use client';

import { useEffect, useRef } from 'react';
import { posthog } from '@/lib/posthog';

const SECTIONS = ['hero', 'stats', 'features', 'how-it-works', 'demo', 'signup'];

export function SectionTracker() {
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && !firedRef.current.has(id)) {
            firedRef.current.add(id);
            posthog.capture('section_viewed', { section: id });
          }
        }
      },
      { threshold: 0.3 }
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
