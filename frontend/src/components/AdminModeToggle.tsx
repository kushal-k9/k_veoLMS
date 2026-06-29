// AdminModeToggle: a segmented Manage / Learn switch shown only to staff.
// "Learn" lets an admin consume courses exactly like a student (browse, buy,
// watch). The choice is persisted in the UI store and drives redirects in the
// admin route + dashboard links.
import { useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { BookOpen, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUiStore, type AdminViewMode } from "@/stores/uiStore";
import { cn } from "@/lib/utils";

const OPTIONS: { mode: AdminViewMode; label: string; icon: typeof Shield }[] = [
  { mode: "manage", label: "Manage", icon: Shield },
  { mode: "learn", label: "Learn", icon: BookOpen },
];

export function AdminModeToggle({
  className,
  onSelect,
}: {
  className?: string;
  onSelect?: () => void;
}) {
  const { isStaff } = useAuth();
  const mode = useUiStore((s) => s.adminViewMode);
  const setMode = useUiStore((s) => s.setAdminViewMode);
  const navigate = useNavigate();
  const reduced = useReducedMotion() ?? false;

  if (!isStaff) return null;

  const choose = (next: AdminViewMode) => {
    setMode(next);
    onSelect?.();
    navigate({ to: next === "manage" ? "/admin" : "/courses" });
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full border bg-secondary/60 p-0.5",
        className,
      )}
      role="tablist"
      aria-label="Admin view mode"
    >
      {OPTIONS.map(({ mode: m, label, icon: Icon }) => {
        const active = mode === m;
        return (
          <button
            key={m}
            role="tab"
            aria-selected={active}
            onClick={() => choose(m)}
            className={cn(
              "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="admin-mode-pill"
                transition={
                  reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                }
                className="absolute inset-0 -z-10 rounded-full bg-primary shadow-sm"
              />
            )}
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
