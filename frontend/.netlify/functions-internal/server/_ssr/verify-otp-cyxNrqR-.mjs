import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { r as getApiErrorMessage } from "./client-BtKFGlsZ.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useVerifyOtp, s as useResendOtp } from "./useAuth-DGq_YKFM.mjs";
import { a as cn, t as Button } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { M as LoaderCircle, k as MailCheck, w as Minus } from "../_libs/lucide-react.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as PublicLayout } from "./PublicLayout-8zPEFKiM.mjs";
import { t as Route } from "./verify-otp-DfsNgZuA.mjs";
import { n as jt, t as Lt } from "../_libs/input-otp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-otp-cyxNrqR-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var InputOTP = import_react.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lt, {
	ref,
	containerClassName: cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName),
	className: cn("disabled:cursor-not-allowed", className),
	...props
}));
InputOTP.displayName = "InputOTP";
var InputOTPGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center", className),
	...props
}));
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = import_react.forwardRef(({ index, className, ...props }, ref) => {
	const { char, hasFakeCaret, isActive } = import_react.useContext(jt).slots[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md", isActive && "z-10 ring-1 ring-ring", className),
		...props,
		children: [char, hasFakeCaret && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" })
		})]
	});
});
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	role: "separator",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
}));
InputOTPSeparator.displayName = "InputOTPSeparator";
function VerifyOtpPage() {
	const { email } = Route.useSearch();
	const navigate = useNavigate();
	const verify = useVerifyOtp();
	const resend = useResendOtp();
	const [code, setCode] = (0, import_react.useState)("");
	if (!email) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-md px-4 py-20 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-muted-foreground",
			children: [
				"No email to verify.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/signup",
					className: "font-semibold text-primary hover:underline",
					children: "Sign up"
				})
			]
		})
	}) });
	const finish = (role) => navigate({ to: role === "admin" ? "/admin" : "/dashboard" });
	const submit = (value) => {
		verify.mutate({
			email,
			code: value
		}, {
			onSuccess: (res) => {
				toast.success("Email verified! 🎉");
				finish(res.user.role);
			},
			onError: (err) => {
				toast.error(getApiErrorMessage(err, "Verification failed"));
				setCode("");
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-2xl font-bold",
				children: "Verify your email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					"We sent a 6-digit code to ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 w-full rounded-xl border bg-card p-6 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTP, {
							maxLength: 6,
							value: code,
							onChange: (v) => {
								setCode(v);
								if (v.length === 6) submit(v);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPGroup, { children: [
								0,
								1,
								2,
								3,
								4,
								5
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, { index: i }, i)) })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-6 w-full",
						disabled: code.length !== 6 || verify.isPending,
						onClick: () => submit(code),
						children: [verify.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Verify"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-4 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50",
						disabled: resend.isPending,
						onClick: () => resend.mutate(email, { onSuccess: () => toast.success("A new code is on its way.") }),
						children: "Didn't get it? Resend code"
					})
				]
			})
		]
	}) });
}
//#endregion
export { VerifyOtpPage as component };
