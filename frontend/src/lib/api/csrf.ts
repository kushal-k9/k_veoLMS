// Fetches and caches the CSRF token needed for cookie-authenticated,
// state-changing routes (refresh, logout). The token pairs with a cookie the
// server set, following the double-submit pattern.
import { rawApi } from "./raw";

let cachedToken: string | null = null;

export async function getCsrfToken(force = false): Promise<string> {
  if (cachedToken && !force) return cachedToken;
  const { data } = await rawApi.get("/auth/csrf-token");
  cachedToken = data?.data?.csrfToken ?? null;
  if (!cachedToken) throw new Error("Failed to obtain CSRF token");
  return cachedToken;
}

export function clearCsrfToken() {
  cachedToken = null;
}
