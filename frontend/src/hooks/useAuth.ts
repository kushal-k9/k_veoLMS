// Auth hooks: session selectors + bootstrap + mutations.
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { refreshSession } from "@/lib/api/client";
import * as authApi from "@/lib/endpoints/auth.endpoints";

/** Roles that can reach the admin dashboard (staff). */
const STAFF_ROLES = ["super-admin", "admin", "instructor", "support"] as const;

/** Read-only auth state for components. */
export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const status = useAuthStore((s) => s.status);
  const isStaff = user ? STAFF_ROLES.includes(user.role as never) : false;
  return {
    user,
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    // `isAdmin` now means "has access to the admin area" (any staff role).
    isAdmin: isStaff,
    isSuperAdmin: user?.role === "super-admin",
    isStaff,
  };
}

/**
 * Run once on app mount: try a silent refresh to restore the session from the
 * httpOnly cookie. Sets status to authenticated/unauthenticated when done.
 */
export function useBootstrapAuth() {
  const setStatus = useAuthStore((s) => s.setStatus);
  useEffect(() => {
    let active = true;
    (async () => {
      const token = await refreshSession();
      if (!active) return;
      // Only fall back to "unauthenticated" if no session was established while
      // we were refreshing. A login during the in-flight refresh sets status to
      // "authenticated"; clobbering it here caused the redirect to need two tries.
      if (!token && useAuthStore.getState().status === "loading") {
        setStatus("unauthenticated");
      }
    })();
    return () => {
      active = false;
    };
  }, [setStatus]);
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (result) => {
      setAuth(result);
      qc.invalidateQueries();
    },
  });
}

export function useRegister() {
  return useMutation({ mutationFn: authApi.register });
}

export function useVerifyOtp() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.verifyOtp,
    onSuccess: (result) => {
      setAuth(result);
      qc.invalidateQueries();
    },
  });
}

export function useResendOtp() {
  return useMutation({ mutationFn: authApi.resendOtp });
}

export function useGoogleLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.googleLogin,
    onSuccess: (result) => {
      setAuth(result);
      qc.invalidateQueries();
    },
  });
}

export function useLogout() {
  const clear = useAuthStore((s) => s.clear);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clear();
      qc.clear();
    },
  });
}
