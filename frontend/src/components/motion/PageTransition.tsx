// PageTransition: cross-fades route content on navigation. Keyed on the router
// pathname so each route mounts/unmounts through AnimatePresence. Reduced-motion
// users get an instant swap.
import { type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { pageTransition } from "@/lib/motion";

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion() ?? false;
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageTransition(reduced)}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
