// Client auth state (Zustand). The access token lives in memory only; the
// refresh token is an httpOnly cookie the JS never sees. On load we silently
// refresh to restore the session.
import { create } from "zustand";
import type { User } from "@/types/api";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: AuthStatus;
  setAuth: (payload: { user: User; accessToken: string }) => void;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setStatus: (status: AuthStatus) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  status: "loading",
  setAuth: ({ user, accessToken }) =>
    set({ user, accessToken, status: "authenticated" }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
  clear: () =>
    set({ user: null, accessToken: null, status: "unauthenticated" }),
}));

// Non-hook accessors for use inside the axios interceptor (outside React).
export const authStore = {
  getToken: () => useAuthStore.getState().accessToken,
  setToken: (t: string | null) => useAuthStore.getState().setAccessToken(t),
  setAuth: (p: { user: User; accessToken: string }) =>
    useAuthStore.getState().setAuth(p),
  clear: () => useAuthStore.getState().clear(),
};
