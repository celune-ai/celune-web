/**
 * motion.ts — Celune Marketing Site Motion Language
 *
 * Shared design constants for all scroll animation components.
 * Import from this file — never define one-off easing or timing inline.
 *
 * Design intent: premium, subtle, and smooth. Apple / Linear / Vercel polish.
 * Dark theme. Celune-green accent (#22c55e).
 */

import type { Variants, Transition } from 'framer-motion';

/** Matches framer-motion's internal viewport prop shape. */
type Viewport = {
  once?: boolean;
  amount?: number | 'some' | 'all';
  margin?: string;
  root?: React.RefObject<Element>;
};

// ---------------------------------------------------------------------------
// Easing curves
// ---------------------------------------------------------------------------

/**
 * Standard cubic-bezier curves for each motion category.
 *
 * Values are expressed as [x1, y1, x2, y2] (CSS cubic-bezier notation).
 * Framer Motion accepts these directly via the `ease` transition property.
 */
export const ease = {
  /** Elements entering the viewport — decelerates into rest. */
  enter: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],

  /** Elements leaving the viewport — accelerates out of rest. */
  exit: [0.4, 0.0, 1.0, 1.0] as [number, number, number, number],

  /** Smooth in-and-out for parallax layers. */
  parallax: [0.45, 0.0, 0.55, 1.0] as [number, number, number, number],

  /** Subtle overshoot for interactive micro-feedback (buttons, cards). */
  bounce: [0.34, 1.26, 0.64, 1.0] as [number, number, number, number],

  /** Neutral easing for opacity-only transitions. */
  fade: [0.4, 0.0, 0.6, 1.0] as [number, number, number, number],
} as const;

// ---------------------------------------------------------------------------
// Duration scale (milliseconds)
// ---------------------------------------------------------------------------

/**
 * Canonical durations in seconds (Framer Motion expects seconds).
 * Keep all animation durations within this scale — resist one-offs.
 */
export const duration = {
  /** Micro-interactions, icon swaps, state changes. */
  fast: 0.15,

  /** Standard UI transitions (hover, tooltip, drawer). */
  normal: 0.3,

  /** Scroll reveals, hero entrances, section fades. */
  slow: 0.6,

  /** Long-form reveals, full-page transitions. */
  xSlow: 0.9,

  /** AnimatedCount counter roll-up in demo-showcase (1.4s, easeOutCubic). */
  counter: 1.4,
} as const;

// ---------------------------------------------------------------------------
// Shared transition presets
// ---------------------------------------------------------------------------

/** Base transition for scroll-reveal elements. */
export const revealTransition: Transition = {
  duration: duration.slow,
  ease: ease.enter,
};

/** Transition for parallax movement layers. */
export const parallaxTransition: Transition = {
  duration: duration.normal,
  ease: ease.parallax,
};

// ---------------------------------------------------------------------------
// Stagger timing
// ---------------------------------------------------------------------------

/**
 * Stagger delay increments for child elements (in seconds).
 * Use `stagger.default` as `staggerChildren` in parent transitions.
 */
export const stagger = {
  /** Standard stagger between list items or feature cards. */
  default: 0.08,

  /** Tight stagger for dense grids or icon sets. */
  tight: 0.04,

  /** Wide stagger for large hero text lines. */
  wide: 0.14,
} as const;

// ---------------------------------------------------------------------------
// Reveal variant patterns
// ---------------------------------------------------------------------------

/**
 * Fade up — the primary scroll-reveal pattern.
 * Opacity 0 → 1 with 20 px upward travel.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
};

/**
 * Fade in — pure opacity reveal with no spatial movement.
 * Use for backgrounds, overlays, or when spatial shift would feel redundant.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: ease.fade,
    },
  },
};

/**
 * Scale in — subtle scale from 0.95 → 1 with opacity.
 * Use for cards, modals, and feature tiles to imply depth.
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: revealTransition,
  },
};

/**
 * Slide in from left — directional reveal for left-aligned content blocks.
 * 32 px horizontal travel keeps motion grounded.
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: revealTransition,
  },
};

/**
 * Slide in from right — mirror of slideInLeft for right-aligned content.
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: revealTransition,
  },
};

/**
 * Stagger container — parent variant that distributes stagger timing to children.
 *
 * Usage:
 *   <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible">
 *     <motion.li variants={fadeUp}>…</motion.li>
 *   </motion.ul>
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.default,
      delayChildren: 0.05,
    },
  },
};

// ---------------------------------------------------------------------------
// Parallax depths
// ---------------------------------------------------------------------------

/**
 * Speed multipliers for scroll-driven parallax layers.
 * Multiply scroll position by these values before applying as a CSS transform.
 *
 * Convention: positive value = element scrolls slower than the page (upward drift).
 * Negative value = element scrolls faster (downward drift).
 */
export const parallaxDepth = {
  /** Barely perceptible drift — safe for text or branded elements. */
  subtle: 0.03,

  /** Noticeable depth — use for decorative graphics or mesh blobs. */
  medium: 0.06,

  /** Pronounced depth — use for isolated background illustrations only. */
  deep: 0.1,
} as const;

// ---------------------------------------------------------------------------
// Scroll trigger defaults (Framer Motion viewport prop)
// ---------------------------------------------------------------------------

/**
 * Default viewport settings for `whileInView` animations.
 * Pass to the `viewport` prop on any `<motion.*>` element.
 *
 * @example
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={scrollTrigger.default} />
 */
export const scrollTrigger = {
  /**
   * Fires once when 30 % of the element is visible.
   * The right default for most section reveals.
   */
  default: { once: true, amount: 0.3 } satisfies Viewport,

  /**
   * Fires once when 10 % is visible — use for large full-width elements
   * (hero sections, full-bleed images) that would never reach 30 %.
   */
  early: { once: true, amount: 0.1 } satisfies Viewport,

  /**
   * Fires once when 60 % is visible — use for concise elements (badges,
   * small cards) where you want the user to clearly see the element first.
   */
  late: { once: true, amount: 0.6 } satisfies Viewport,

  /**
   * Repeating trigger — re-animates every time the element enters the viewport.
   * Use sparingly; it can feel distracting on scroll-back.
   */
  repeat: { once: false, amount: 0.3 } satisfies Viewport,
} as const;

// ---------------------------------------------------------------------------
// Reduced motion
// ---------------------------------------------------------------------------

/**
 * Returns true when the user has requested reduced motion via the OS
 * accessibility setting `prefers-reduced-motion: reduce`.
 *
 * Must be called at runtime (not module load time) because it reads
 * a browser API. Safe to call inside useEffect, event handlers, or
 * component render functions — but NOT at the top level of a module.
 *
 * @example
 *   const reduced = prefersReducedMotion();
 *   <motion.div variants={reduced ? reducedFadeUp : fadeUp} />
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Reduced-motion equivalents of the main reveal variants.
 * These skip all spatial transforms and use a shorter fade duration.
 * Only opacity changes remain — the UI still reacts, but without movement.
 */
export const reducedVariants = {
  fadeUp: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.normal, ease: ease.fade } },
  } satisfies Variants,

  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.normal, ease: ease.fade } },
  } satisfies Variants,

  scaleIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.normal, ease: ease.fade } },
  } satisfies Variants,

  slideInLeft: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.normal, ease: ease.fade } },
  } satisfies Variants,

  slideInRight: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.normal, ease: ease.fade } },
  } satisfies Variants,

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger.tight, delayChildren: 0 },
    },
  } satisfies Variants,
} as const;

/**
 * Convenience helper — returns the standard variant or its reduced-motion
 * equivalent based on the current OS preference.
 *
 * @example
 *   const variants = motionVariant("fadeUp");
 *   <motion.div variants={variants} initial="hidden" whileInView="visible" />
 */
export function motionVariant(key: keyof typeof reducedVariants): Variants {
  if (prefersReducedMotion()) {
    return reducedVariants[key];
  }

  const standard: Record<keyof typeof reducedVariants, Variants> = {
    fadeUp,
    fadeIn,
    scaleIn,
    slideInLeft,
    slideInRight,
    staggerContainer,
  };

  return standard[key];
}
