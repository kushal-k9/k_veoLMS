// Central axios client: base URL, credentials, Bearer auth interceptor, and a
// refresh-token retry on 401 (single-flight, with concurrent requests queued).
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { authStore } from "@/stores/authStore";
import { rawApi, API_BASE_URL } from "./raw";
import { getCsrfToken, clearCsrfToken } from "./csrf";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Attach the access token to every request.
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authStore.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Refresh-on-401 (single-flight) ---
let refreshing: Promise<string | null> | null = null;

/** Call POST /auth/refresh (cookie + CSRF). Returns a new access token or null. */
export async function refreshSession(): Promise<string | null> {
  try {
    const csrf = await getCsrfToken();
    const { data } = await rawApi.post(
      "/auth/refresh",
      {},
      { headers: { "x-csrf-token": csrf } }
    );
    const { user, accessToken } = data.data;
    authStore.setAuth({ user, accessToken });
    return accessToken;
  } catch {
    // If the CSRF token was stale, retry once with a fresh one.
    try {
      clearCsrfToken();
      const csrf = await getCsrfToken(true);
      const { data } = await rawApi.post(
        "/auth/refresh",
        {},
        { headers: { "x-csrf-token": csrf } }
      );
      const { user, accessToken } = data.data;
      authStore.setAuth({ user, accessToken });
      return accessToken;
    } catch {
      authStore.clear();
      return null;
    }
  }
}

const NO_RETRY_PATHS = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/google", "/auth/verify-otp"];

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    const url = original?.url || "";

    const shouldRefresh =
      status === 401 &&
      !original?._retry &&
      !NO_RETRY_PATHS.some((p) => url.includes(p));

    if (shouldRefresh) {
      original._retry = true;
      // Single-flight: concurrent 401s share one refresh.
      refreshing = refreshing || refreshSession();
      const newToken = await refreshing;
      refreshing = null;

      if (newToken) {
        original.headers = original.headers || {};
        (original.headers as Record<string, string>).Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }
    return Promise.reject(error);
  }
);

/** Normalize an axios error into a user-facing message. */
export function getApiErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; errors?: unknown }
      | undefined;

    // `errors` can be an array of strings, an array of { field, message }
    // objects, or (for some non-validation responses) a bare string. Only use
    // it when we can extract a real, non-empty message; otherwise fall through.
    const errs = data?.errors;
    if (Array.isArray(errs) && errs.length > 0) {
      const first = errs[0];
      if (typeof first === "string" && first.trim()) return first;
      if (
        first &&
        typeof first === "object" &&
        typeof (first as { message?: unknown }).message === "string" &&
        (first as { message: string }).message.trim()
      ) {
        return (first as { message: string }).message;
      }
    }

    if (typeof data?.message === "string" && data.message.trim()) return data.message;
    if (error.message) return error.message;
  }
  return fallback;
}
