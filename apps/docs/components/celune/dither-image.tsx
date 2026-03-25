'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// ─── Types ───────────────────────────────────────────────────────────────────

type RGB = [number, number, number];

interface DitherImageProps {
  /** Image URL to dither */
  src: string;
  /** Canvas width in px */
  width: number;
  /** Canvas height in px */
  height: number;
  /** Additional CSS classes */
  className?: string;
  /** Color palette as hex strings — defaults to monochrome black/white */
  palette?: string[];
}

// ─── Palette helpers ─────────────────────────────────────────────────────────

const DEFAULT_PALETTE: string[] = ['#000000', '#ffffff'];

function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function findClosestColor(r: number, g: number, b: number, palette: RGB[]): RGB {
  let minDist = Infinity;
  let closest: RGB = palette[0];
  for (const color of palette) {
    const dr = r - color[0];
    const dg = g - color[1];
    const db = b - color[2];
    const dist = dr * dr + dg * dg + db * db;
    if (dist < minDist) {
      minDist = dist;
      closest = color;
    }
  }
  return closest;
}

// ─── Floyd-Steinberg error diffusion ─────────────────────────────────────────

function distributeError(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
  errR: number,
  errG: number,
  errB: number,
  factor: number,
) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const i = (y * width + x) * 4;
  data[i] = clamp(data[i] + errR * factor);
  data[i + 1] = clamp(data[i + 1] + errG * factor);
  data[i + 2] = clamp(data[i + 2] + errB * factor);
}

function clamp(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}

function floydSteinbergDither(imageData: ImageData, paletteRgb: RGB[]): ImageData {
  const { data, width, height } = imageData;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const oldR = data[i];
      const oldG = data[i + 1];
      const oldB = data[i + 2];

      const [newR, newG, newB] = findClosestColor(oldR, oldG, oldB, paletteRgb);
      data[i] = newR;
      data[i + 1] = newG;
      data[i + 2] = newB;

      const errR = oldR - newR;
      const errG = oldG - newG;
      const errB = oldB - newB;

      distributeError(data, width, height, x + 1, y, errR, errG, errB, 7 / 16);
      distributeError(data, width, height, x - 1, y + 1, errR, errG, errB, 3 / 16);
      distributeError(data, width, height, x, y + 1, errR, errG, errB, 5 / 16);
      distributeError(data, width, height, x + 1, y + 1, errR, errG, errB, 1 / 16);
    }
  }
  return imageData;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function DitherImage({
  src,
  width,
  height,
  className,
  palette = DEFAULT_PALETTE,
}: DitherImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ditheredDataRef = useRef<ImageData | null>(null);
  const originalDataRef = useRef<ImageData | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ready, setReady] = useState(false);

  const paletteKey = palette.join(',');

  const processDither = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Draw original image scaled to canvas dimensions
      ctx.drawImage(img, 0, 0, width, height);

      // Cache the original for hover reveal
      originalDataRef.current = ctx.getImageData(0, 0, width, height);

      // Clone pixel data for dithering (so we don't mutate the original)
      const imageData = ctx.getImageData(0, 0, width, height);
      const paletteRgb = palette.map(hexToRgb);

      // Apply Floyd-Steinberg and cache the result
      const dithered = floydSteinbergDither(imageData, paletteRgb);
      ditheredDataRef.current = dithered;

      // Render dithered version
      ctx.putImageData(dithered, 0, 0);
      setReady(true);
    };

    img.onerror = () => {
      console.error('[DitherImage] Failed to load image:', src);
    };

    img.src = src;
  }, [src, width, height, paletteKey]);

  // Process on mount and when src/palette changes
  useEffect(() => {
    let aborted = false;
    setReady(false);
    ditheredDataRef.current = null;
    originalDataRef.current = null;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (aborted) return;
      ctx.drawImage(img, 0, 0, width, height);
      originalDataRef.current = ctx.getImageData(0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const paletteRgb = palette.map(hexToRgb);
      const dithered = floydSteinbergDither(imageData, paletteRgb);
      ditheredDataRef.current = dithered;
      ctx.putImageData(dithered, 0, 0);
      setReady(true);
    };
    img.onerror = () => {
      if (!aborted) console.error('[DitherImage] Failed to load image:', src);
    };
    img.src = src;

    return () => {
      aborted = true;
      img.src = '';
    };
  }, [src, width, height, paletteKey]);

  // Swap between dithered and original on hover
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = isHovered ? originalDataRef.current : ditheredDataRef.current;
    if (data) {
      ctx.putImageData(data, 0, 0);
    }
  }, [isHovered, ready]);

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dithered canvas — fades out on hover to reveal original underneath */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Dithered image"
        width={width}
        height={height}
        className={cn('block transition-opacity duration-500 ease-in-out', !ready && 'opacity-0')}
      />
      {/* Loading placeholder */}
      {!ready && (
        <div
          className="absolute inset-0 animate-pulse rounded bg-white/[0.04]"
          style={{ width, height }}
        />
      )}
    </div>
  );
}

// ─── Pre-built retro palettes ────────────────────────────────────────────────

export const DITHER_PALETTES = {
  /** Classic 1-bit monochrome */
  monochrome: ['#000000', '#ffffff'],
  /** Celune brand — black to brand green */
  celune: ['#0a0a0f', '#1a2e1e', '#3d7a4a', '#5BC586', '#ffffff'],
  /** Game Boy green-scale */
  gameboy: ['#0f380f', '#306230', '#8bac0f', '#9bbc0f'],
  /** CGA palette */
  cga: ['#000000', '#55ffff', '#ff55ff', '#ffffff'],
  /** Original Macintosh 1-bit */
  macintosh: ['#000000', '#ffffff'],
  /** Warm sepia tones */
  sepia: ['#1a1009', '#3d2b1a', '#7a5c3a', '#c4a882', '#f0e6d3'],
} as const;
