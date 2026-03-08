'use client';

import { cn } from '@/lib/cn';

interface RetroGridProps {
  className?: string;
  angle?: number;
  cellSize?: number;
  opacity?: number;
  lightLineColor?: string;
  darkLineColor?: string;
}

export function RetroGrid({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = 'gray',
  darkLineColor = 'gray',
}: RetroGridProps) {
  const gridStyles = {
    '--grid-angle': `${angle}deg`,
    '--cell-size': `${cellSize}px`,
    '--grid-opacity': opacity,
    '--light-line': lightLineColor,
    '--dark-line': darkLineColor,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]',
        className,
      )}
      style={gridStyles}
    >
      {/* Grid plane */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            'animate-retro-grid',
            '[background-repeat:repeat]',
            '[background-size:var(--cell-size)_var(--cell-size)]',
            '[height:300vh] [width:600vw]',
            '[inset:0%_0px] [margin-left:-200%]',
            '[transform-origin:100%_0_0]',
            '[background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)]',
            'opacity-[var(--grid-opacity)]',
            'dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]',
          )}
        />
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/80 to-transparent" />
    </div>
  );
}
