'use client';

import dynamic from 'next/dynamic';

const PerspectiveGrid = dynamic(() => import('./perspective-grid'), {
  ssr: false,
});

export function FooterArea({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-[#08080A]">
      {/* Black side masks — cover the area outside the grid-frame borders (48px / 3rem each side) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-12 bg-[#08080A] hidden lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-12 bg-[#08080A] hidden lg:block" />
      {/* Black bottom mask */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-0 bg-[#08080A]" />

      {/* PerspectiveGrid — fixed 1200px tall, bottom-aligned.
          Shader draws in bottom half → visible grid covers ~600px. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0" style={{ height: 1200 }}>
        <PerspectiveGrid
          width="100%"
          height={1200}
          color="#00ff87"
          speed={0.3}
          gridScale={1.5}
          opacity={0.5}
          perspective={12}
          gridLength={10}
          curve={1}
          bottomFade="#08080A"
        />
      </div>
      {/* Content sits above */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
