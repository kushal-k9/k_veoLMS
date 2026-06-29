// Stagger: a container that reveals its children one after another on scroll.
// Wrap each child in <StaggerItem> (or apply the `item` variant manually).
import { type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  as?: ElementType;
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  amount = 0.15,
  as,
}: StaggerProps) {
  const reduced = useReducedMotion() ?? false;
  const MotionTag = motion(as ?? "div");

  return (
    <MotionTag
      className={cn(className)}
      variants={staggerContainer(reduced, stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function StaggerItem({ children, className, as }: StaggerItemProps) {
  const reduced = useReducedMotion() ?? false;
  const MotionTag = motion(as ?? "div");

  return (
    <MotionTag className={cn(className)} variants={fadeInUp(reduced)}>
      {children}
    </MotionTag>
  );
}
