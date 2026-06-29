// Scroll-reveal wrapper: fades/rises its children into view the first time they
// enter the viewport. Honors reduced-motion (renders statically visible).
import { type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts (for manual sequencing). */
  delay?: number;
  /** How much of the element must be visible before triggering (0-1). */
  amount?: number;
  as?: ElementType;
}

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
  as,
}: RevealProps) {
  const reduced = useReducedMotion() ?? false;
  const MotionTag = motion(as ?? "div");

  return (
    <MotionTag
      className={cn(className)}
      variants={fadeInUp(reduced)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ delay: reduced ? 0 : delay }}
    >
      {children}
    </MotionTag>
  );
}
