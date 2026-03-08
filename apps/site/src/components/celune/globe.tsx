'use client';

import { useEffect, useRef, useCallback } from 'react';
import createGlobe, { type COBEOptions } from 'cobe';
import { cn } from '@/lib/cn';

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.05, 0.2, 0.1],
  markerColor: [0.13, 0.77, 0.37],
  glowColor: [0.06, 0.2, 0.1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.05 },
    { location: [23.8103, 90.4125], size: 0.03 },
    { location: [30.0444, 31.2357], size: 0.04 },
    { location: [39.9042, 116.4074], size: 0.06 },
    { location: [-23.5505, -46.6333], size: 0.05 },
    { location: [19.4326, -99.1332], size: 0.04 },
    { location: [40.7128, -74.006], size: 0.07 },
    { location: [34.6937, 135.5023], size: 0.04 },
    { location: [41.0082, 28.9784], size: 0.04 },
    { location: [51.5074, -0.1278], size: 0.06 },
    { location: [48.8566, 2.3522], size: 0.05 },
    { location: [-33.8688, 151.2093], size: 0.04 },
    { location: [37.7749, -122.4194], size: 0.05 },
  ],
};

interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
}

export function Globe({ className, config = {} }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe>>(undefined);

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  const onRender = useCallback((state: Record<string, number>) => {
    if (!pointerInteracting.current) {
      phiRef.current += 0.002;
    }
    state.phi = phiRef.current + pointerInteractionMovement.current;
    state.width = widthRef.current * 2;
    state.height = widthRef.current * 2;
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    const w = widthRef.current * 2;
    if (!canvasRef.current || w === 0) return;

    const mergedConfig: COBEOptions = {
      ...GLOBE_CONFIG,
      ...config,
      width: w,
      height: w,
      onRender,
    };

    try {
      globeRef.current = createGlobe(canvasRef.current, mergedConfig);
      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = '1';
      }, 0);
    } catch {
      // WebGL not available — silently degrade
    }

    return () => {
      globeRef.current?.destroy();
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRender, onResize]);

  return (
    <div className={cn('aspect-square w-full max-w-[600px]', className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-1000"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 100;
          }
        }}
        style={{ cursor: 'grab', contain: 'layout paint size' }}
      />
    </div>
  );
}
