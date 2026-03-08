'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { posthog } from '@/lib/posthog';
import { SectionLabel } from './grid-frame';
import { RetroGrid } from './retro-grid';
import { Globe } from './globe';
import { staggerContainer, fadeUp, reducedVariants, scrollTrigger } from '@/lib/motion';
import { URL_APP } from '@/lib/branding';

export function CeluneWaitlist() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariant = shouldReduceMotion ? reducedVariants.staggerContainer : staggerContainer;
  const headingVariant = shouldReduceMotion ? reducedVariants.fadeUp : fadeUp;
  const depthVariant = shouldReduceMotion ? reducedVariants.fadeUp : fadeUp;

  return (
    <section id="signup" className="relative py-24 md:py-32">
      <RetroGrid
        angle={65}
        cellSize={60}
        opacity={0.3}
        darkLineColor="rgba(34, 197, 94, 0.15)"
        lightLineColor="rgba(34, 197, 94, 0.08)"
      />
      {/* Globe background — centered behind the content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="opacity-20">
          <Globe className="max-w-[800px]" />
        </div>
      </div>
      <div className="relative z-10 container">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={scrollTrigger.default}
        >
          {/* Heading block */}
          <motion.div variants={headingVariant} className="mx-auto max-w-3xl text-center">
            <SectionLabel>Get started</SectionLabel>
            <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
              Start shipping with Celune today
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Autonomous agent teams that research, plan, build, and ship — so you can focus on what matters.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={depthVariant} className="mx-auto mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`${URL_APP}/signup`}
              onClick={() => posthog.capture('cta_clicked', { location: 'bottom_cta', label: 'Start Free' })}
              className="bg-celune-500 hover:bg-celune-400 inline-block rounded-lg px-8 py-3 text-sm font-semibold text-black transition-colors"
            >
              Start Free
            </a>
            <a
              href={`${URL_APP}/signup?plan=pro`}
              onClick={() => posthog.capture('cta_clicked', { location: 'bottom_cta', label: 'Start Pro Trial' })}
              className="inline-block rounded-lg border border-white/[0.1] bg-white/[0.04] px-8 py-3 text-sm font-medium text-white transition-all hover:bg-white/[0.08]"
            >
              Start Pro Trial
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
