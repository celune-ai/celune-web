'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 140;
const SPEED = 0.28;
const SHOOTING_STAR_CHANCE = 0.003; // chance per frame to spawn one
const MAX_SHOOTING_STARS = 3;

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  r: number;
  g: number;
  b: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
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
    r,
    g,
    b,
  };
}

function createShootingStar(width: number, height: number): ShootingStar {
  // Start from random position in upper-left quadrant
  const x = Math.random() * width * 0.7;
  const y = Math.random() * height * 0.4;
  const angle = Math.PI * 0.2 + Math.random() * 0.3; // ~30-50 degrees
  const speed = 6 + Math.random() * 6;

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: 30 + Math.random() * 40,
    size: 1.2 + Math.random() * 1.2,
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
    let shootingStars: ShootingStar[] = [];
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

      // --- Background stars ---
      for (const star of stars) {
        const depthFactor = 0.3 + star.z * 0.7;
        star.x += SPEED * depthFactor * 0.6;
        star.y += SPEED * depthFactor;

        if (star.x > width + 10 || star.y > height + 10) {
          if (Math.random() > 0.5) {
            star.x = Math.random() * width;
            star.y = -5;
          } else {
            star.x = -5;
            star.y = Math.random() * height;
          }
          star.z = Math.random();
        }

        const twinkle = 0.8 + 0.2 * Math.sin(time * 0.8 + star.z * 10);
        const alpha = (0.3 + star.z * 0.5) * twinkle;
        const radius = star.size * (0.5 + star.z * 0.5);

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${Math.round(star.r * 255)}, ${Math.round(star.g * 255)}, ${Math.round(star.b * 255)}, ${alpha})`;
        ctx!.fill();
      }

      // --- Shooting stars ---
      // Spawn
      if (shootingStars.length < MAX_SHOOTING_STARS && Math.random() < SHOOTING_STAR_CHANCE) {
        shootingStars.push(createShootingStar(width, height));
      }

      // Update + draw
      shootingStars = shootingStars.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        const progress = s.life / s.maxLife;
        // Fade in quickly, fade out slowly
        const alpha = progress < 0.1 ? progress * 10 : 1 - (progress - 0.1) / 0.9;
        const tailLength = 30 + s.size * 10;

        // Draw trail
        const gradient = ctx!.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * (tailLength / Math.sqrt(s.vx * s.vx + s.vy * s.vy)),
          s.y - s.vy * (tailLength / Math.sqrt(s.vx * s.vx + s.vy * s.vy)),
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
        gradient.addColorStop(0.4, `rgba(180, 255, 210, ${alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        const len = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        ctx!.lineTo(s.x - (s.vx / len) * tailLength, s.y - (s.vy / len) * tailLength);
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = s.size;
        ctx!.lineCap = 'round';
        ctx!.stroke();

        // Draw head glow
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.size * 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx!.fill();

        return s.life < s.maxLife && s.x < width + 50 && s.y < height + 50;
      });

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
