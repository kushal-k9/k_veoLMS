// AnimatedCounter: tweens a number from 0 (or `from`) to `value` when scrolled
// into view. Used for stat cards / analytics tiles. Reduced-motion shows the
// final value immediately.
import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

interface AnimatedCounterProps {
  value: number;
  from?: number;
  /** Decimal places to render. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Render large numbers with thousands separators. */
  separator?: boolean;
}

export function AnimatedCounter({
  value,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  separator = true,
}: AnimatedCounterProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const motionValue = useMotionValue(from);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 24, mass: 1 });

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      motionValue.jump(value);
    } else {
      motionValue.set(value);
    }
  }, [inView, value, reduced, motionValue]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      if (!separator) return fixed;
      const [int, dec] = fixed.split(".");
      const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return dec ? `${grouped}.${dec}` : grouped;
    };
    const unsub = spring.on("change", (latest) => {
      node.textContent = `${prefix}${format(latest)}${suffix}`;
    });
    // Render the initial frame synchronously.
    node.textContent = `${prefix}${format(reduced ? value : from)}${suffix}`;
    return unsub;
  }, [spring, decimals, prefix, suffix, separator, from, value, reduced]);

  return <span ref={ref} className={className} />;
}
