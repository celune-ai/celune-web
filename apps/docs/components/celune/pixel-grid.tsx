'use client';

import { useEffect, useRef, useCallback } from 'react';
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// ─── Types ──────────────────────────────────────────────────────────────────

interface PixelGridProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Background color of the canvas */
  bgColor?: string;
  /** Default (unlit) pixel color */
  gridColor?: string;
  /** Brand accent color for hover glow and wave */
  glowColor?: string;
  /** Pixel size on mobile (px) */
  cellSizeMobile?: number;
  /** Pixel size on desktop (px) */
  cellSizeDesktop?: number;
  /** Gap between pixels (px) */
  gap?: number;
  /** Breakpoint (px) at which to switch from mobile to desktop cell size */
  breakpoint?: number;
  /** Duration of the initial wave reveal (ms) */
  revealDuration?: number;
  /** Radius of the hover glow effect (in grid cells) */
  glowRadius?: number;
  /** Max opacity for the glow center (0-1) */
  glowIntensity?: number;
  /** Wave speed — lower is slower (pixels per ms) */
  waveSpeed?: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function lerpColor(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

// ─── Component ──────────────────────────────────────────────────────────────

export function PixelGrid({
  className,
  bgColor = '#0a0a0a',
  gridColor = '#1a1a1a',
  glowColor = '#5BC586',
  cellSizeMobile = 4,
  cellSizeDesktop = 6,
  gap = 1,
  breakpoint = 768,
  revealDuration = 1200,
  glowRadius = 6,
  glowIntensity = 0.9,
  waveSpeed = 0.008,
}: PixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const mountTimeRef = useRef<number>(0);
  const sizeRef = useRef({ cols: 0, rows: 0, cellSize: 0 });

  // Pre-parse colors once
  const bgRgb = hexToRgb(bgColor);
  const gridRgb = hexToRgb(gridColor);
  const glowRgb = hexToRgb(glowColor);

  const getCellSize = useCallback(() => {
    return window.innerWidth >= breakpoint ? cellSizeDesktop : cellSizeMobile;
  }, [breakpoint, cellSizeDesktop, cellSizeMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    mountTimeRef.current = performance.now();

    // ── Resize logic ──────────────────────────────────────────────────────

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const parent = canvas!.parentElement;
      if (!parent) return;

      const w = parent.clientWidth;
      const h = parent.clientHeight;

      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;

      const cellSize = getCellSize();
      const step = cellSize + gap;
      sizeRef.current = {
        cols: Math.ceil(w / step),
        rows: Math.ceil(h / step),
        cellSize,
      };
    }

    resize();

    // ── Mouse tracking (canvas-relative grid coords) ────────────────────

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const { cellSize } = sizeRef.current;
      const step = cellSize + gap;
      mouseRef.current = {
        x: (e.clientX - rect.left) / step,
        y: (e.clientY - rect.top) / step,
      };
    }

    function handleMouseLeave() {
      mouseRef.current = null;
    }

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // ── Render loop ─────────────────────────────────────────────────────

    function draw() {
      rafRef.current = requestAnimationFrame(draw);

      if (!ctx || !canvas) return;
      const { cols, rows, cellSize } = sizeRef.current;
      if (cols === 0 || rows === 0) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      const step = (cellSize + gap) * dpr;
      const size = cellSize * dpr;
      const now = performance.now();
      const elapsed = now - mountTimeRef.current;
      const mouse = mouseRef.current;

      // Center of the grid (for wave origin)
      const cx = cols / 2;
      const cy = rows / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      // Fill background
      ctx.fillStyle = `rgb(${bgRgb[0]},${bgRgb[1]},${bgRgb[2]})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // ── Wave reveal ───────────────────────────────────────────────
          const distFromCenter = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2);
          const waveThreshold = elapsed * waveSpeed; // how far the wave has reached (in cells)
          const revealT = Math.min(
            1,
            Math.max(0, (waveThreshold - distFromCenter) / (maxDist * 0.3)),
          );

          // Not yet revealed — skip for performance
          if (revealT <= 0) continue;

          // ── Hover glow ────────────────────────────────────────────────
          let glowT = 0;
          if (mouse) {
            const dx = col - mouse.x;
            const dy = row - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < glowRadius) {
              glowT = (1 - dist / glowRadius) * glowIntensity;
            }
          }

          // ── Compose color ─────────────────────────────────────────────
          // Base: lerp from bg to grid color based on reveal progress
          let rgb = lerpColor(bgRgb, gridRgb, revealT);

          // Layer glow on top
          if (glowT > 0) {
            rgb = lerpColor(rgb, glowRgb, glowT);
          }

          // ── Draw pixel ────────────────────────────────────────────────
          ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
          ctx.fillRect(Math.round(col * step), Math.round(row * step), size, size);
        }
      }
    }

    draw();

    // ── Resize observer ─────────────────────────────────────────────────

    const ro = new ResizeObserver(() => {
      resize();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Also listen for breakpoint changes (cell size swap)
    function handleWindowResize() {
      resize();
    }
    window.addEventListener('resize', handleWindowResize);

    // ── Cleanup ─────────────────────────────────────────────────────────

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleWindowResize);
      ro.disconnect();
    };
  }, [bgRgb, gridRgb, glowRgb, gap, getCellSize, glowIntensity, glowRadius, waveSpeed]);

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{ contain: 'strict' }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-auto block h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
