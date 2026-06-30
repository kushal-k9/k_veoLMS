import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { a as rawApi, i as getCsrfToken, n as clearCsrfToken, o as refreshSession, s as useAuthStore, t as api } from "./client-BtKFGlsZ.mjs";
import { a as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-DGq_YKFM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
async function register(input) {
	const { data } = await api.post("/auth/register", input);
	return data.data;
}
async function verifyOtp(input) {
	const { data } = await api.post("/auth/verify-otp", input);
	return data.data;
}
async function resendOtp(email) {
	const { data } = await api.post("/auth/resend-otp", { email });
	return data.data;
}
async function login(input) {
	const { data } = await api.post("/auth/login", input);
	return data.data;
}
async function googleLogin(credential) {
	const { data } = await api.post("/auth/google", { credential });
	return data.data;
}
async function logout() {
	const csrf = await getCsrfToken();
	try {
		await rawApi.post("/auth/logout", {}, { headers: { "x-csrf-token": csrf } });
	} finally {
		clearCsrfToken();
	}
}
/** Roles that can reach the admin dashboard (staff). */
var STAFF_ROLES = [
	"super-admin",
	"admin",
	"instructor",
	"support"
];
/** Read-only auth state for components. */
function useAuth() {
	const user = useAuthStore((s) => s.user);
	const status = useAuthStore((s) => s.status);
	const isStaff = user ? STAFF_ROLES.includes(user.role) : false;
	return {
		user,
		status,
		isLoading: status === "loading",
		isAuthenticated: status === "authenticated",
		isAdmin: isStaff,
		isSuperAdmin: user?.role === "super-admin",
		isStaff
	};
}
/**
* Run once on app mount: try a silent refresh to restore the session from the
* httpOnly cookie. Sets status to authenticated/unauthenticated when done.
*/
function useBootstrapAuth() {
	const setStatus = useAuthStore((s) => s.setStatus);
	(0, import_react.useEffect)(() => {
		let active = true;
		(async () => {
			const token = await refreshSession();
			if (!active) return;
			if (!token && useAuthStore.getState().status === "loading") setStatus("unauthenticated");
		})();
		return () => {
			active = false;
		};
	}, [setStatus]);
}
function useLogin() {
	const setAuth = useAuthStore((s) => s.setAuth);
	const qc = useQueryClient();
	return useMutation({
		mutationFn: login,
		onSuccess: (result) => {
			setAuth(result);
			qc.invalidateQueries();
		}
	});
}
function useRegister() {
	return useMutation({ mutationFn: register });
}
function useVerifyOtp() {
	const setAuth = useAuthStore((s) => s.setAuth);
	const qc = useQueryClient();
	return useMutation({
		mutationFn: verifyOtp,
		onSuccess: (result) => {
			setAuth(result);
			qc.invalidateQueries();
		}
	});
}
function useResendOtp() {
	return useMutation({ mutationFn: resendOtp });
}
function useGoogleLogin() {
	const setAuth = useAuthStore((s) => s.setAuth);
	const qc = useQueryClient();
	return useMutation({
		mutationFn: googleLogin,
		onSuccess: (result) => {
			setAuth(result);
			qc.invalidateQueries();
		}
	});
}
function useLogout() {
	const clear = useAuthStore((s) => s.clear);
	const qc = useQueryClient();
	return useMutation({
		mutationFn: logout,
		onSettled: () => {
			clear();
			qc.clear();
		}
	});
}
//#endregion
export { useLogout as a, useVerifyOtp as c, useLogin as i, useBootstrapAuth as n, useRegister as o, useGoogleLogin as r, useResendOtp as s, useAuth as t };
