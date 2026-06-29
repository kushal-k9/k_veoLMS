// Shared Framer Motion variants + spring presets used across the app.
//
// Every animated surface should degrade gracefully when the user prefers
// reduced motion. Components read `useReducedMotion()` (from motion/react) and
// pass the result to the helpers below so transforms collapse to opacity-only
// (or instant) without duplicating logic everywhere.
import type { Transition, Variants } from "motion/react";

/** Tuned spring for snappy-but-soft UI motion (cards, toggles, drawers). */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

/** Snappier spring for small, immediate interactions (buttons, chips). */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
};

export const easeOutExpo: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};

/**
 * Fade + rise. When reduced motion is requested we keep the fade but drop the
 * translate so nothing visibly moves.
 */
export function fadeInUp(reduced = false): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: easeOutExpo,
    },
  };
}

export function scaleIn(reduced = false): Variants {
  return {
    hidden: { opacity: 0, scale: reduced ? 1 : 0.96 },
    show: { opacity: 1, scale: 1, transition: springSoft },
  };
}

export function fadeIn(): Variants {
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };
}

/**
 * Container variant that staggers its children. `staggerChildren` is skipped
 * (set to 0) under reduced motion so everything appears at once.
 */
export function staggerContainer(reduced = false, stagger = 0.08): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : 0.04,
      },
    },
  };
}

/** Cross-fade + slight rise used for full-page route transitions. */
export function pageTransition(reduced = false): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: reduced ? 0 : -8, transition: { duration: 0.2, ease: "easeIn" } },
  };
}

/** Hover/press presets for interactive cards — pass into `whileHover`/`whileTap`. */
export const cardHover = {
  whileHover: { y: -6, transition: springSoft },
  whileTap: { scale: 0.99 },
};

export const buttonTap = {
  whileTap: { scale: 0.96 },
  whileHover: { scale: 1.02 },
  transition: springSnappy,
};
