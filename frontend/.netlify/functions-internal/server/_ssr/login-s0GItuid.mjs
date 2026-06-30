import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
import { r as getApiErrorMessage } from "./client-BtKFGlsZ.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useLogin, r as useGoogleLogin, t as useAuth } from "./useAuth-DGq_YKFM.mjs";
import { t as Button } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { M as LoaderCircle, V as GraduationCap, i as User, m as ShieldCheck } from "../_libs/lucide-react.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as PublicLayout, g as Input } from "./PublicLayout-8zPEFKiM.mjs";
import { t as Label } from "./label-Dd4BvekF.mjs";
import { t as Route } from "./login-as1IZK1Y.mjs";
import { t as GoogleLogin } from "../_libs/react-oauth__google.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-s0GItuid.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GOOGLE_ENABLED = Boolean("187194255166-sd5grk5qbdc8gg80djf33nd8qoun3jcm.apps.googleusercontent.com");
function LoginPage() {
	const login = useLogin();
	const googleLogin = useGoogleLogin();
	const { redirect } = Route.useSearch();
	const navigate = useNavigate();
	const { isAuthenticated, user } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!isAuthenticated || !user) return;
		if (redirect) navigate({ to: redirect });
		else navigate({ to: user.role === "admin" || user.role === "super-admin" || user.role === "instructor" || user.role === "support" ? "/admin" : "/dashboard" });
	}, [
		isAuthenticated,
		user,
		redirect,
		navigate
	]);
	const submit = (e) => {
		e.preventDefault();
		login.mutate({
			email,
			password
		}, {
			onSuccess: () => {
				toast.success("Welcome back!");
			},
			onError: (err) => {
				if ((axios.isAxiosError(err) ? err.response?.data : void 0)?.errors?.requiresVerification) {
					toast.info("Please verify your email. We sent you a new code.");
					navigate({
						to: "/verify-otp",
						search: { email }
					});
					return;
				}
				toast.error(getApiErrorMessage(err, "Login failed"));
			}
		});
	};
	const onGoogle = (credential) => {
		if (!credential) return;
		googleLogin.mutate(credential, {
			onSuccess: () => {
				toast.success("Welcome!");
			},
			onError: (err) => toast.error(getApiErrorMessage(err, "Google sign-in failed"))
		});
	};
	const quickFill = (e, p) => {
		setEmail(e);
		setPassword(p);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-md flex-col px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-2xl font-bold",
						children: "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Log in to continue learning on VeoLMS."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-8 space-y-4 rounded-xl border bg-card p-6 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "you@example.com",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "••••••••",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full",
						disabled: login.isPending,
						children: [login.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Log in"]
					}),
					GOOGLE_ENABLED && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative py-1 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10 bg-card px-3 text-xs text-muted-foreground",
							children: "or continue with"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-1/2 h-px w-full bg-border" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleLogin, {
							onSuccess: (cr) => onGoogle(cr.credential),
							onError: () => toast.error("Google sign-in failed"),
							useOneTap: false
						})
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl border border-dashed bg-muted/40 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-semibold text-muted-foreground",
					children: "Demo accounts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						type: "button",
						onClick: () => quickFill("admin@veolms.com", "Admin123!"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mr-1.5 h-3.5 w-3.5" }), " Admin"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						type: "button",
						onClick: () => quickFill("student@veolms.com", "Student123!"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mr-1.5 h-3.5 w-3.5" }), " Student"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-sm text-muted-foreground",
				children: [
					"Don't have an account?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						className: "font-semibold text-primary hover:underline",
						children: "Sign up"
					})
				]
			})
		]
	}) });
}
//#endregion
export { LoginPage as component };
