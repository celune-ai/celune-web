'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated topographic contour-line background.
 * Renders flowing terrain contour lines that gently undulate.
 */
export function TopographyBg({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let frame: number;
    let t = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    resize();
    window.addEventListener('resize', resize);

    // Simple 2D noise using sine combinations
    function noise(x: number, y: number, time: number): number {
      return (
        Math.sin(x * 0.015 + time * 0.2) * 0.5 +
        Math.sin(y * 0.012 + time * 0.15) * 0.5 +
        Math.sin((x + y) * 0.01 + time * 0.1) * 0.3 +
        Math.sin(x * 0.025 - y * 0.018 + time * 0.08) * 0.25 +
        Math.sin(x * 0.008 + y * 0.006 + time * 0.25) * 0.4
      );
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const time = t * 0.008;
      const lineCount = 28;
      const step = 8; // sample every N pixels for smoothness

      for (let i = 0; i < lineCount; i++) {
        const threshold = -1.5 + (i / lineCount) * 3.0;

        ctx.beginPath();
        let started = false;

        // March horizontally, find contour crossings
        for (let x = 0; x < w; x += step) {
          // Find y where noise ≈ threshold by scanning vertically
          let bestY = -1;
          let bestDist = Infinity;

          for (let y = 0; y < h; y += 6) {
            const val = noise(x, y, time);
            const dist = Math.abs(val - threshold);
            if (dist < bestDist) {
              bestDist = dist;
              bestY = y;
            }
          }

          if (bestY >= 0 && bestDist < 0.15) {
            if (!started) {
              ctx.moveTo(x, bestY);
              started = true;
            } else {
              ctx.lineTo(x, bestY);
            }
          } else {
            started = false;
          }
        }

        // Vary opacity per line
        const alpha = 0.04 + (i % 4 === 0 ? 0.06 : 0);
        ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
        ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.7;
        ctx.stroke();
      }

      t++;
      frame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
