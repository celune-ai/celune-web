'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/cn';

/* ─── Pure Canvas 2D ASCII wave effect ─── */

function flowField(px: number, py: number, t: number): number {
  return Math.sin(px + Math.sin(py + t * 0.1)) * Math.sin(py * px * 0.1 + t * 0.2);
}

function computeField(px: number, py: number, t: number, tension: number, twist: number): [number, number] {
  const ep = 0.05;
  let x = px;
  let y = py;
  let gx = 0;
  let gy = 0;

  for (let i = 0; i < 20; i++) {
    const t0 = flowField(x, y, t);
    const t1 = flowField(x + ep, y, t);
    const t2 = flowField(x, y + ep, t);
    gx = (t1 - t0) / ep;
    gy = (t2 - t0) / ep;

    x += -gy * tension + gx * 0.005;
    y += gx * tension + gy * 0.005;
    x += Math.sin(t * 0.25) * twist;
    y += Math.cos(t * 0.25) * twist;
  }

  return [gx, gy];
}

export interface AsciiWavesProps {
  characters?: string;
  color?: string;
  invert?: boolean;
  noiseScale?: number;
  elementSize?: number;
  speed?: number;
  hasCursorInteraction?: boolean;
  intensity?: number;
  interactionIntensity?: number;
  waveTension?: number;
  waveTwist?: number;
  className?: string;
}

const AsciiWaves: React.FC<AsciiWavesProps> = ({
  characters = ' .:-+*=%@#',
  color = '#ffffff',
  invert = false,
  noiseScale = 2.0,
  elementSize = 16.0,
  speed = 1.0,
  intensity = 1.0,
  waveTension = 0.5,
  waveTwist = 0.1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTime = useRef(0);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    const t = (performance.now() - startTime.current) / 1000 * speed;
    const aspect = w > h ? w / h : h / w;
    const cols = Math.ceil(w / elementSize);
    const rows = Math.ceil(h / elementSize);
    const charCount = characters.length;

    ctx.clearRect(0, 0, w, h);
    ctx.font = `bold ${elementSize * 0.85}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Parse color to RGB
    ctx.fillStyle = color;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const px = col * elementSize;
        const py = row * elementSize;

        const uvx = (px / w) * aspect;
        const uvy = py / h;

        const sx = uvx * noiseScale;
        const sy = uvy * noiseScale;

        const [gx, gy] = computeField(sx, sy, t, waveTension, waveTwist);
        let val = Math.sqrt(gx * gx + gy * gy) * intensity;
        val = Math.min(Math.max(val, 0), 1);

        if (invert) val = 1 - val;

        const charIdx = Math.min(Math.floor(val * (charCount - 1)), charCount - 1);
        const char = characters[charIdx];

        if (char === ' ') continue;

        const alpha = val * 0.8 + 0.2;
        ctx.globalAlpha = alpha;
        ctx.fillText(char, px + elementSize / 2, py + elementSize / 2);
      }
    }

    ctx.globalAlpha = 1;
    animRef.current = requestAnimationFrame(render);
  }, [characters, color, invert, noiseScale, elementSize, speed, intensity, waveTension, waveTwist]);

  useEffect(() => {
    startTime.current = performance.now();
    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, [render]);

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default AsciiWaves;
