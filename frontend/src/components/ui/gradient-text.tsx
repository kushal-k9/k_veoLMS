// GradientText: applies the brand gradient as clipped text. Used for hero
// headlines and section emphasis.
import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function GradientText({ children, className, as }: GradientTextProps) {
  const Tag = as ?? "span";
  return (
    <Tag
      className={cn(
        "bg-linear-to-r from-primary via-[oklch(0.6_0.2_290)] to-[oklch(0.62_0.16_200)] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
