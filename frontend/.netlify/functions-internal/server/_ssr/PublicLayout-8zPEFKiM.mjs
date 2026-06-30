import { o as __toESM } from "../_runtime.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { r as getApiErrorMessage, t as api } from "./client-BtKFGlsZ.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as useLogout, t as useAuth } from "./useAuth-DGq_YKFM.mjs";
import { a as cn, d as listNotifications, m as markNotificationRead, p as markAllNotificationsRead, t as Button } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { $ as Circle, A as LogOut, E as Menu, F as LayoutDashboard, M as LoaderCircle, V as GraduationCap, c as Trash2, ct as CheckCheck, d as ShoppingCart, dt as Bell, i as User, it as ChevronRight, j as Lock, m as ShieldCheck, nt as CircleCheck, p as Shield, st as Check, t as X, ut as BookOpen } from "../_libs/lucide-react.mjs";
import { d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, l as Dialog$1, m as DialogPortal$1, p as DialogOverlay$1, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as SheetFooter, c as SheetTrigger, h as useCourse, i as SheetContent, l as formatPrice, n as ScrollArea, o as SheetHeader, p as queryKeys, r as Sheet, s as SheetTitle, t as Badge } from "./scroll-area-CdfiTdOf.mjs";
import { g as Link, l as useRouterState, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useReducedMotion, o as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/radix-ui__react-avatar.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
import { i as useStripe, n as PaymentElement, r as useElements, t as Elements } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { t as loadStripe } from "../_libs/stripe__stripe-js.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PublicLayout-8zPEFKiM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
var useUiStore = create()(persist((set) => ({
	search: "",
	category: "All",
	setSearch: (search) => set({ search }),
	setCategory: (category) => set({ category }),
	resetFilters: () => set({
		search: "",
		category: "All"
	}),
	checkoutCourseId: null,
	openCheckout: (checkoutCourseId) => set({ checkoutCourseId }),
	closeCheckout: () => set({ checkoutCourseId: null }),
	adminViewMode: "manage",
	setAdminViewMode: (adminViewMode) => set({ adminViewMode }),
	toggleAdminViewMode: () => set((s) => ({ adminViewMode: s.adminViewMode === "manage" ? "learn" : "manage" }))
}), {
	name: "veolms-ui",
	partialize: (s) => ({ adminViewMode: s.adminViewMode })
}));
var OPTIONS = [{
	mode: "manage",
	label: "Manage",
	icon: Shield
}, {
	mode: "learn",
	label: "Learn",
	icon: BookOpen
}];
function AdminModeToggle({ className, onSelect }) {
	const { isStaff } = useAuth();
	const mode = useUiStore((s) => s.adminViewMode);
	const setMode = useUiStore((s) => s.setAdminViewMode);
	const navigate = useNavigate();
	const reduced = useReducedMotion() ?? false;
	if (!isStaff) return null;
	const choose = (next) => {
		setMode(next);
		onSelect?.();
		navigate({ to: next === "manage" ? "/admin" : "/courses" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative inline-flex items-center rounded-full border bg-secondary/60 p-0.5", className),
		role: "tablist",
		"aria-label": "Admin view mode",
		children: OPTIONS.map(({ mode: m, label, icon: Icon }) => {
			const active = mode === m;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				role: "tab",
				"aria-selected": active,
				onClick: () => choose(m),
				className: cn("relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors", active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
				children: [
					active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						layoutId: "admin-mode-pill",
						transition: reduced ? { duration: 0 } : {
							type: "spring",
							stiffness: 380,
							damping: 32
						},
						className: "absolute inset-0 -z-10 rounded-full bg-primary shadow-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
					label
				]
			}, m);
		})
	});
}
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var PUBLISHABLE_KEY = "pk_test_51TlNQ6Rp4MOF8VLsIMGnQAkbewezlVziqO45fxghSTjIJo7rjGJCZclwOimPUopEsfAXkoEgRH5fTPTfPV7u9KTs00Tc3mhyTO";
var stripePromise$1 = null;
function getStripe() {
	if (!stripePromise$1) stripePromise$1 = loadStripe(PUBLISHABLE_KEY);
	return stripePromise$1;
}
var stripeConfigured = Boolean(PUBLISHABLE_KEY);
async function createPaymentIntent(courseId, couponCode) {
	const { data } = await api.post("/payments/create-intent", {
		courseId,
		...couponCode ? { couponCode } : {}
	});
	return data.data;
}
async function confirmPayment(paymentIntentId) {
	const { data } = await api.post("/payments/confirm", { paymentIntentId });
	return data.data.enrollment;
}
function useCreatePaymentIntent() {
	return useMutation({ mutationFn: ({ courseId, couponCode }) => createPaymentIntent(courseId, couponCode) });
}
function useConfirmPayment() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (paymentIntentId) => confirmPayment(paymentIntentId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: queryKeys.enrollments.mine });
			qc.invalidateQueries({ queryKey: queryKeys.enrollments.all });
		}
	});
}
var stripePromise = getStripe();
function CheckoutModal({ course, open, onOpenChange, onSuccess }) {
	const createIntent = useCreatePaymentIntent();
	const [clientSecret, setClientSecret] = (0, import_react.useState)(null);
	const [succeeded, setSucceeded] = (0, import_react.useState)(false);
	const [amount, setAmount] = (0, import_react.useState)(course.price);
	const [couponInput, setCouponInput] = (0, import_react.useState)("");
	const [appliedCoupon, setAppliedCoupon] = (0, import_react.useState)(null);
	const startIntent = (couponCode) => {
		createIntent.mutate({
			courseId: course.id,
			couponCode
		}, {
			onSuccess: (data) => {
				setClientSecret(data.clientSecret);
				setAmount(data.amount);
				if (couponCode) setAppliedCoupon(couponCode);
			},
			onError: (err) => {
				toast.error(getApiErrorMessage(err, "Could not apply that"));
				if (couponCode) setAppliedCoupon(null);
			}
		});
	};
	(0, import_react.useEffect)(() => {
		if (!open) {
			setClientSecret(null);
			setSucceeded(false);
			setAppliedCoupon(null);
			setCouponInput("");
			return;
		}
		if (!stripeConfigured) return;
		startIntent();
	}, [open, course.id]);
	const applyCoupon = () => {
		if (!couponInput.trim()) return;
		setClientSecret(null);
		startIntent(couponInput.trim().toUpperCase());
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => !createIntent.isPending && onOpenChange(v),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "sm:max-w-md max-h-[90vh] overflow-y-auto",
			children: succeeded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessView, {
				course,
				onClose: () => onOpenChange(false)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Checkout" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "text-[10px]",
						children: "Stripe Test"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Secure card payment powered by Stripe. Use test card 4242 4242 4242 4242, any future date & CVC." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-lg border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: course.thumbnail,
						alt: course.title,
						className: "h-14 w-20 rounded-md object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-2 text-sm font-semibold",
							children: course.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: course.instructor
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Coupon code",
						value: couponInput,
						onChange: (e) => setCouponInput(e.target.value.toUpperCase()),
						className: "h-9"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: applyCoupon,
						disabled: createIntent.isPending || !couponInput.trim(),
						children: "Apply"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 rounded-lg bg-muted/50 p-3 text-sm",
					children: [appliedCoupon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Coupon ", appliedCoupon] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["−", formatPrice(Math.max(0, course.price - amount))] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between border-t-0 text-base font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(amount) })]
					})]
				}),
				!stripeConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-lg bg-destructive/10 p-3 text-sm text-destructive",
					children: [
						"Stripe is not configured. Set",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "VITE_STRIPE_PUBLISHABLE_KEY" }),
						" in the frontend",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: ".env" }),
						" to enable checkout."
					]
				}) : clientSecret ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Elements, {
					stripe: stripePromise,
					options: {
						clientSecret,
						appearance: { theme: "stripe" }
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentForm, {
						amount,
						onPaid: () => {
							setSucceeded(true);
							onSuccess();
						}
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-success" }), "Payments are processed securely by Stripe"]
				})
			] })
		})
	});
}
function PaymentForm({ amount, onPaid }) {
	const stripe = useStripe();
	const elements = useElements();
	const confirmPayment = useConfirmPayment();
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) return;
		setProcessing(true);
		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: "if_required"
		});
		if (error) {
			toast.error(error.message ?? "Payment failed");
			setProcessing(false);
			return;
		}
		if (paymentIntent?.status === "succeeded") try {
			await confirmPayment.mutateAsync(paymentIntent.id);
			toast.success("Payment successful! 🎉");
			onPaid();
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Could not confirm enrollment"));
		}
		else toast.error("Payment was not completed");
		setProcessing(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentElement, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "lg",
			className: "w-full",
			type: "submit",
			disabled: !stripe || processing,
			children: [
				processing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mr-2 h-4 w-4" }),
				"Pay ",
				formatPrice(amount)
			]
		})]
	});
}
function SuccessView({ course, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-4 py-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-16 w-16 items-center justify-center rounded-full bg-success/15",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-success" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold",
				children: "Payment successful!"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					"You're now enrolled in ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: course.title }),
					"."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				onClick: onClose,
				children: "Start learning"
			})
		]
	});
}
function toItem(course) {
	return {
		id: course.id,
		title: course.title,
		thumbnail: course.thumbnail,
		instructor: course.instructor,
		price: typeof course.discountPrice === "number" && course.discountPrice < course.price ? course.discountPrice : course.price
	};
}
var useCartStore = create()(persist((set, get) => ({
	items: [],
	isOpen: false,
	add: (course) => set((s) => s.items.some((i) => i.id === course.id) ? s : {
		items: [...s.items, toItem(course)],
		isOpen: true
	}),
	remove: (courseId) => set((s) => ({ items: s.items.filter((i) => i.id !== courseId) })),
	clear: () => set({ items: [] }),
	has: (courseId) => get().items.some((i) => i.id === courseId),
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
	setOpen: (isOpen) => set({ isOpen })
}), {
	name: "veolms-cart",
	partialize: (s) => ({ items: s.items })
}));
/** Total price of everything in the cart. */
function cartTotal(items) {
	return items.reduce((sum, i) => sum + i.price, 0);
}
function CartDrawer() {
	const { items, isOpen, setOpen, remove, clear } = useCartStore();
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const reduced = useReducedMotion() ?? false;
	const [checkoutId, setCheckoutId] = (0, import_react.useState)(null);
	const total = cartTotal(items);
	const startCheckout = () => {
		if (!isAuthenticated) {
			setOpen(false);
			navigate({
				to: "/login",
				search: { redirect: "/courses" }
			});
			return;
		}
		if (items[0]) setCheckoutId(items[0].id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: isOpen,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "flex w-full flex-col p-0 sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "border-b px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" }),
							" Your cart (",
							items.length,
							")"
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-5 py-4",
					children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col items-center justify-center gap-3 py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-7 w-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Your cart is empty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs text-sm text-muted-foreground",
								children: "Browse the catalog and add courses to enroll in bulk."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								onClick: () => setOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/courses",
									children: "Explore courses"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							initial: false,
							children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
								layout: !reduced,
								initial: {
									opacity: 0,
									x: reduced ? 0 : 20
								},
								animate: {
									opacity: 1,
									x: 0
								},
								exit: {
									opacity: 0,
									x: reduced ? 0 : -20
								},
								className: "flex gap-3 rounded-xl border bg-card p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.thumbnail,
										alt: item.title,
										className: "h-14 w-20 shrink-0 rounded-md object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "line-clamp-2 text-sm font-semibold",
											children: item.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: item.instructor
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-end justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => remove(item.id),
											className: "text-muted-foreground transition-colors hover:text-destructive",
											"aria-label": `Remove ${item.title}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-bold",
											children: formatPrice(item.price)
										})]
									})
								]
							}, item.id))
						})
					})
				}),
				items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFooter, {
					className: "border-t px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-base font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(total) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								size: "lg",
								onClick: startCheckout,
								children: "Checkout"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: clear,
								className: "flex w-full items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }), " Clear cart"]
							})
						]
					})
				})
			]
		})
	}), checkoutId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartCheckout, {
		courseId: checkoutId,
		onClose: () => setCheckoutId(null),
		onPaid: () => {
			remove(checkoutId);
			const next = useCartStore.getState().items.find((i) => i.id !== checkoutId);
			setCheckoutId(null);
			if (next) setTimeout(() => setCheckoutId(next.id), 300);
			else {
				toast.success("All set — you're enrolled! 🎉");
				setOpen(false);
			}
		}
	})] });
}
/** Loads the course then renders the shared CheckoutModal for it. */
function CartCheckout({ courseId, onClose, onPaid }) {
	const { data: course } = useCourse(courseId);
	if (!course) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutModal, {
		course,
		open: true,
		onOpenChange: (v) => !v && onClose(),
		onSuccess: onPaid
	});
}
function useNotifications() {
	const { isAuthenticated } = useAuth();
	return useQuery({
		queryKey: ["notifications"],
		queryFn: listNotifications,
		enabled: isAuthenticated,
		refetchInterval: 6e4
	});
}
function useMarkNotificationRead() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => markNotificationRead(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] })
	});
}
function useMarkAllNotificationsRead() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: markAllNotificationsRead,
		onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] })
	});
}
function NotificationBell() {
	const { data } = useNotifications();
	const markRead = useMarkNotificationRead();
	const markAll = useMarkAllNotificationsRead();
	const notifications = data?.notifications ?? [];
	const unread = data?.unread ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon",
			className: "relative",
			"aria-label": "Notifications",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: { scale: 0 },
				animate: { scale: 1 },
				className: "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground",
				children: unread > 9 ? "9+" : unread
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-80 p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-semibold",
				children: "Notifications"
			}), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => markAll.mutate(),
				className: "flex items-center gap-1 text-xs text-primary hover:underline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-3 w-3" }), " Mark all read"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "max-h-80",
			children: notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 py-8 text-center text-sm text-muted-foreground",
				children: "You're all caught up."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y",
				children: notifications.map((n) => {
					const content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("px-3 py-2.5 transition-colors hover:bg-accent", !n.read && "bg-primary/5"),
						onClick: () => !n.read && markRead.mutate(n.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2",
							children: [!n.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("min-w-0", n.read && "pl-4"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: n.title
									}),
									n.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "line-clamp-2 text-xs text-muted-foreground",
										children: n.body
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-[11px] text-muted-foreground",
										children: formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })
									})
								]
							})]
						})
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: n.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: n.link,
						onClick: () => !n.read && markRead.mutate(n.id),
						children: content
					}) : content }, n.id);
				})
			})
		})]
	})] });
}
function CartButton() {
	const count = useCartStore((s) => s.items.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "ghost",
		size: "icon",
		className: "relative",
		onClick: useCartStore((s) => s.open),
		"aria-label": `Cart (${count})`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground",
			children: count
		})]
	});
}
function BrandLogo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 20 })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-display text-xl font-extrabold tracking-tight text-foreground",
			children: ["Veo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: "LMS"
			})]
		})]
	});
}
function Navbar() {
	const { user, isStaff } = useAuth();
	const logout = useLogout();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const handleLogout = () => {
		logout.mutate(void 0, { onSettled: () => {
			toast.success("Signed out successfully");
			navigate({ to: "/" });
		} });
	};
	const navLinks = [{
		label: "Home",
		to: "/"
	}, {
		label: "Courses",
		to: "/courses"
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-50 border-b bg-card/85 backdrop-blur supports-[backdrop-filter]:bg-card/70",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
						activeProps: { className: "text-foreground" },
						activeOptions: { exact: l.to === "/" },
						children: l.label
					}, l.to))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartButton, {}),
					isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModeToggle, { className: "hidden md:inline-flex" }),
					user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex items-center gap-2 rounded-full border bg-card py-1 pl-1 pr-3 transition-colors hover:bg-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-7 w-7",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
										src: user.avatar,
										alt: user.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: user.name[0] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: user.name.split(" ")[0]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							className: "w-56",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: user.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-normal text-muted-foreground",
										children: user.email
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								isStaff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => navigate({ to: "/admin" }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "mr-2 h-4 w-4" }), " Admin Dashboard"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => navigate({ to: "/dashboard" }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "mr-2 h-4 w-4" }), " My Learning"]
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => navigate({ to: "/dashboard" }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "mr-2 h-4 w-4" }), " My Dashboard"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: handleLogout,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 h-4 w-4" }), " Sign out"]
								})
							]
						})] })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-2 md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Log in"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								children: "Get started"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "md:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							side: "right",
							className: "w-72",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {}) }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-col gap-1 px-1",
									children: [navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: l.to,
										onClick: () => setOpen(false),
										className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
										children: l.label
									}, l.to)), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "my-2 flex items-center gap-3 rounded-lg border p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
												className: "h-9 w-9",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
													src: user.avatar,
													alt: user.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: user.name[0] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-sm font-semibold",
													children: user.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-xs text-muted-foreground",
													children: user.email
												})]
											})]
										}),
										isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModeToggle, {
											className: "my-2 self-start",
											onSelect: () => setOpen(false)
										}),
										isStaff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/admin",
											onClick: () => setOpen(false),
											className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
											children: "Admin Dashboard"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/dashboard",
											onClick: () => setOpen(false),
											className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
											children: "My Learning"
										})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/dashboard",
											onClick: () => setOpen(false),
											className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
											children: "My Dashboard"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											className: "mt-2",
											onClick: () => {
												setOpen(false);
												handleLogout();
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 h-4 w-4" }), " Sign out"]
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-col gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											asChild: true,
											onClick: () => setOpen(false),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/login",
												children: "Log in"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											onClick: () => setOpen(false),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/signup",
												children: "Get started"
											})
										})]
									})]
								}),
								pathname.startsWith("/learn") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-6 px-3 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mr-1 inline h-3 w-3" }), " You're in a lesson player."]
								})
							]
						})]
					})
				]
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-auto border-t bg-brand text-brand-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 20 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-extrabold",
							children: "VeoLMS"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-brand-foreground/70",
						children: "Learn without limits. Expert-led courses to level up your career."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-3 font-display text-sm font-bold",
					children: "Explore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-brand-foreground/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-brand-foreground",
							children: "Home"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/courses",
							className: "hover:text-brand-foreground",
							children: "All Courses"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "hover:text-brand-foreground",
							children: "Log in"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-3 font-display text-sm font-bold",
					children: "Categories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-brand-foreground/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Web Development" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Frontend" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Backend" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-3 font-display text-sm font-bold",
					children: "Demo accounts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-1 text-xs text-brand-foreground/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "admin@veolms.com / admin123" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "student@veolms.com / student123" })]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-brand-foreground/10 py-4 text-center text-xs text-brand-foreground/50",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" VeoLMS · Built as a demo. Payments are simulated."
			]
		})]
	});
}
function PublicLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { PublicLayout as _, Dialog as a, DialogFooter as c, DropdownMenu as d, DropdownMenuContent as f, Input as g, DropdownMenuTrigger as h, CheckoutModal as i, DialogHeader as l, DropdownMenuSeparator as m, AvatarFallback as n, DialogContent as o, DropdownMenuItem as p, AvatarImage as r, DialogDescription as s, Avatar as t, DialogTitle as u, useCartStore as v, useUiStore as y };
