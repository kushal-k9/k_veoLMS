import type { ReactNode } from "react";
import { Navigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export function RequireAuth({
  children,
  role,
}: {
  children: ReactNode;
  role?: "admin" | "student";
}) {
  const { user, isLoading, isStaff } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (isLoading) return <FullScreenLoader />;

  if (!user) {
    return <Navigate to="/login" search={{ redirect: pathname }} />;
  }

  // Admin "dual-mode": staff may also browse/learn like a student, so staff are
  // allowed into student-gated routes. Only block non-staff from admin routes.
  if (role === "admin" && !isStaff) {
    return <Navigate to="/dashboard" />;
  }
  if (role === "student" && !isStaff && user.role !== "student") {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
}
