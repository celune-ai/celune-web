'use client';

import { DarkVeil } from '@/components/celune/dark-veil';

export function HeroVeil() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-0 h-[100vh] opacity-30"
      style={{ top: '-200px' }}
      aria-hidden="true"
    >
      <DarkVeil hueShift={150} speed={0.5} resolutionScale={0.75} />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 30%, rgb(10 10 15 / 0.6) 55%, rgb(10 10 15) 75%)',
        }}
      />
    </div>
  );
}
