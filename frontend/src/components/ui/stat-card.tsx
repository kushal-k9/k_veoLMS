// StatCard: a metric tile with icon, animated value, label, and optional trend.
// Used across the admin analytics dashboard and student progress views.
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  icon?: ReactNode;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Percentage change vs. previous period; positive = up (green). */
  trend?: number;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  prefix,
  suffix,
  decimals,
  trend,
  className,
}: StatCardProps) {
  const reduced = useReducedMotion() ?? false;
  const up = (trend ?? 0) >= 0;

  return (
    <motion.div
      variants={scaleIn(reduced)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        "rounded-xl border bg-card p-5 shadow-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground">
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </div>
      {trend !== undefined && (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-semibold",
            up ? "text-success" : "text-destructive",
          )}
        >
          {up ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {Math.abs(trend).toFixed(1)}%
          <span className="font-normal text-muted-foreground">vs last period</span>
        </div>
      )}
    </motion.div>
  );
}
