import { n as create } from "../_libs/zustand.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-BtKFGlsZ.js
var useAuthStore = create((set) => ({
	user: null,
	accessToken: null,
	status: "loading",
	setAuth: ({ user, accessToken }) => set({
		user,
		accessToken,
		status: "authenticated"
	}),
	setAccessToken: (accessToken) => set({ accessToken }),
	setUser: (user) => set({ user }),
	setStatus: (status) => set({ status }),
	clear: () => set({
		user: null,
		accessToken: null,
		status: "unauthenticated"
	})
}));
var authStore = {
	getToken: () => useAuthStore.getState().accessToken,
	setToken: (t) => useAuthStore.getState().setAccessToken(t),
	setAuth: (p) => useAuthStore.getState().setAuth(p),
	clear: () => useAuthStore.getState().clear()
};
var API_BASE_URL = "http://localhost:4000/api";
var rawApi = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: { "Content-Type": "application/json" }
});
var cachedToken = null;
async function getCsrfToken(force = false) {
	if (cachedToken && !force) return cachedToken;
	const { data } = await rawApi.get("/auth/csrf-token");
	cachedToken = data?.data?.csrfToken ?? null;
	if (!cachedToken) throw new Error("Failed to obtain CSRF token");
	return cachedToken;
}
function clearCsrfToken() {
	cachedToken = null;
}
var api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: { "Content-Type": "application/json" }
});
api.interceptors.request.use((config) => {
	const token = authStore.getToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});
var refreshing = null;
/** Call POST /auth/refresh (cookie + CSRF). Returns a new access token or null. */
async function refreshSession() {
	try {
		const csrf = await getCsrfToken();
		const { data } = await rawApi.post("/auth/refresh", {}, { headers: { "x-csrf-token": csrf } });
		const { user, accessToken } = data.data;
		authStore.setAuth({
			user,
			accessToken
		});
		return accessToken;
	} catch {
		try {
			clearCsrfToken();
			const csrf = await getCsrfToken(true);
			const { data } = await rawApi.post("/auth/refresh", {}, { headers: { "x-csrf-token": csrf } });
			const { user, accessToken } = data.data;
			authStore.setAuth({
				user,
				accessToken
			});
			return accessToken;
		} catch {
			authStore.clear();
			return null;
		}
	}
}
var NO_RETRY_PATHS = [
	"/auth/login",
	"/auth/register",
	"/auth/refresh",
	"/auth/google",
	"/auth/verify-otp"
];
api.interceptors.response.use((res) => res, async (error) => {
	const original = error.config;
	const status = error.response?.status;
	const url = original?.url || "";
	if (status === 401 && !original?._retry && !NO_RETRY_PATHS.some((p) => url.includes(p))) {
		original._retry = true;
		refreshing = refreshing || refreshSession();
		const newToken = await refreshing;
		refreshing = null;
		if (newToken) {
			original.headers = original.headers || {};
			original.headers.Authorization = `Bearer ${newToken}`;
			return api(original);
		}
	}
	return Promise.reject(error);
});
/** Normalize an axios error into a user-facing message. */
function getApiErrorMessage(error, fallback = "Something went wrong") {
	if (axios.isAxiosError(error)) {
		const data = error.response?.data;
		const errs = data?.errors;
		if (Array.isArray(errs) && errs.length > 0) {
			const first = errs[0];
			if (typeof first === "string" && first.trim()) return first;
			if (first && typeof first === "object" && typeof first.message === "string" && first.message.trim()) return first.message;
		}
		if (typeof data?.message === "string" && data.message.trim()) return data.message;
		if (error.message) return error.message;
	}
	return fallback;
}
//#endregion
export { rawApi as a, getCsrfToken as i, clearCsrfToken as n, refreshSession as o, getApiErrorMessage as r, useAuthStore as s, api as t };
