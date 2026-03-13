'use client';

import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  r: number;
  color: [number, number, number];
  vx: number;
  vy: number;
  phase: number;
  speed: number;
}

export function Aurora({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    // Warm aurora palette: amber, coral, rose, teal, soft violet
    const blobs: Blob[] = [
      { x: 0.3, y: 0.6, r: 0.45, color: [255, 140, 50], vx: 0.012, vy: 0.008, phase: 0, speed: 0.3 },
      { x: 0.7, y: 0.5, r: 0.5, color: [220, 80, 60], vx: -0.01, vy: 0.006, phase: 1.2, speed: 0.25 },
      { x: 0.5, y: 0.7, r: 0.55, color: [180, 60, 100], vx: 0.008, vy: -0.01, phase: 2.4, speed: 0.35 },
      { x: 0.2, y: 0.4, r: 0.4, color: [40, 160, 140], vx: 0.015, vy: 0.012, phase: 3.6, speed: 0.2 },
      { x: 0.8, y: 0.7, r: 0.35, color: [140, 80, 180], vx: -0.012, vy: -0.008, phase: 4.8, speed: 0.28 },
      { x: 0.5, y: 0.8, r: 0.6, color: [255, 170, 60], vx: 0.006, vy: 0.004, phase: 0.8, speed: 0.15 },
    ];

    let t = 0;
    let frame: number;

    // Pre-create grain imagedata
    let grainData: ImageData | null = null;
    let lastGrainW = 0;
    let lastGrainH = 0;

    function generateGrain() {
      if (!ctx) return;
      const gw = Math.ceil(w * dpr);
      const gh = Math.ceil(h * dpr);
      if (gw === lastGrainW && gh === lastGrainH && grainData) return;
      grainData = ctx.createImageData(gw, gh);
      lastGrainW = gw;
      lastGrainH = gh;
    }

    function updateGrain() {
      if (!grainData) return;
      const data = grainData.data;
      const len = data.length;
      for (let i = 0; i < len; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 18; // subtle grain
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dark base
      ctx.fillStyle = '#08080A';
      ctx.fillRect(0, 0, w, h);

      // Draw aurora blobs with screen blending
      ctx.globalCompositeOperation = 'screen';

      for (const blob of blobs) {
        const time = t * blob.speed;
        const bx = (blob.x + Math.sin(time * blob.vx * 50 + blob.phase) * 0.15) * w;
        const by = (blob.y + Math.cos(time * blob.vy * 50 + blob.phase * 0.7) * 0.1) * h;
        const br = blob.r * Math.max(w, h);

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        const [r, g, b] = blob.color;
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.35)`);
        grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.12)`);
        grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.04)`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Horizon arc glow
      ctx.globalCompositeOperation = 'screen';
      const arcY = h * 0.85;
      const arcGrad = ctx.createRadialGradient(w / 2, arcY + h * 0.3, 0, w / 2, arcY + h * 0.3, w * 0.7);
      arcGrad.addColorStop(0, 'rgba(255, 160, 60, 0.25)');
      arcGrad.addColorStop(0.3, 'rgba(220, 100, 50, 0.1)');
      arcGrad.addColorStop(0.6, 'rgba(180, 60, 80, 0.04)');
      arcGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = arcGrad;
      ctx.fillRect(0, 0, w, h);

      // Thin bright horizon line
      ctx.globalCompositeOperation = 'screen';
      const lineGrad = ctx.createLinearGradient(0, arcY - 2, 0, arcY + 4);
      lineGrad.addColorStop(0, 'rgba(255, 200, 120, 0)');
      lineGrad.addColorStop(0.4, 'rgba(255, 200, 120, 0.15)');
      lineGrad.addColorStop(0.6, 'rgba(255, 180, 100, 0.08)');
      lineGrad.addColorStop(1, 'rgba(255, 160, 80, 0)');

      ctx.beginPath();
      ctx.ellipse(w / 2, arcY + h * 0.15, w * 0.65, h * 0.18, 0, Math.PI, 0);
      ctx.closePath();
      ctx.fillStyle = lineGrad;
      ctx.fill();

      // Grain overlay
      ctx.globalCompositeOperation = 'overlay';
      generateGrain();
      if (grainData && t % 3 === 0) {
        updateGrain();
      }
      if (grainData) {
        ctx.putImageData(grainData, 0, 0);
      }

      // Reset
      ctx.globalCompositeOperation = 'source-over';

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
