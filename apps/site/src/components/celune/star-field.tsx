'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 44;
const SPEED = 0.19;

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  r: number;
  g: number;
  b: number;
}

function createStar(width: number, height: number): Star {
  const t = Math.random();
  // White (#fff) to Celune green (#00ff87)
  const r = 1 - t * 1;
  const g = 1 - t * 0;
  const b = 1 - t * 0.47;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random(),
    size: Math.random() * 1.5 + 0.5,
    r, g, b,
  };
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let rafId: number;
    let time = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      stars = Array.from({ length: PARTICLE_COUNT }, () => createStar(width, height));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      time += 0.016;

      for (const star of stars) {
        // Move from top-left toward bottom-right
        const depthFactor = 0.3 + star.z * 0.7;
        star.x += SPEED * depthFactor * 0.6;
        star.y += SPEED * depthFactor;

        // Reset when off screen
        if (star.x > width + 10 || star.y > height + 10) {
          // Re-enter from top or left edge
          if (Math.random() > 0.5) {
            star.x = Math.random() * width;
            star.y = -5;
          } else {
            star.x = -5;
            star.y = Math.random() * height;
          }
          star.z = Math.random();
        }

        // Twinkle — sin-wave opacity oscillation per star
        const twinkle = 0.8 + 0.2 * Math.sin(time * 0.8 + star.z * 10);
        const alpha = (0.3 + star.z * 0.5) * twinkle;
        const radius = star.size * (0.5 + star.z * 0.5);

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${Math.round(star.r * 255)}, ${Math.round(star.g * 255)}, ${Math.round(star.b * 255)}, ${alpha})`;
        ctx!.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    init();
    rafId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
