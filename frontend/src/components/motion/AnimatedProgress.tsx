// AnimatedProgress: a slim progress bar whose fill springs to `value` (0-100)
// when scrolled into view. Used for course-completion indicators.
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedProgressProps {
  value: number;
  className?: string;
  /** Tailwind classes for the filled portion (defaults to the primary color). */
  barClassName?: string;
  /** Show the numeric percentage on the right. */
  showLabel?: boolean;
}

export function AnimatedProgress({
  value,
  className,
  barClassName,
  showLabel = false,
}: AnimatedProgressProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        ref={ref}
        className="relative h-2 w-full overflow-hidden rounded-full bg-secondary"
      >
        <motion.div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-primary",
            barClassName,
          )}
          initial={{ width: reduced ? `${pct}%` : 0 }}
          animate={{ width: inView ? `${pct}%` : reduced ? `${pct}%` : 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 90, damping: 22 }
          }
        />
      </div>
      {showLabel && (
        <span className="w-10 shrink-0 text-right text-xs font-medium tabular-nums text-muted-foreground">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
