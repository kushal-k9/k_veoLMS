import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useAuth } from "./useAuth-DGq_YKFM.mjs";
import { a as cn } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { Q as Clock, d as ShoppingCart, tt as CirclePlay, z as Heart } from "../_libs/lucide-react.mjs";
import { d as getLessonCount, f as getTotalDuration, l as formatPrice, t as Badge } from "./scroll-area-CdfiTdOf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useReducedMotion } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar, v as useCartStore } from "./PublicLayout-8zPEFKiM.mjs";
import { a as staggerContainer, i as springSoft, t as fadeInUp } from "./motion-D-zm4uIr.mjs";
import { t as Skeleton } from "./skeleton-BvHnY700.mjs";
import { n as useIsWishlisted, r as useToggleWishlist, t as RatingStars } from "./useWishlist-1qs9Prqi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Stagger-BRYZYVeL.js
var import_jsx_runtime = require_jsx_runtime();
function CourseCard({ course }) {
	const reduced = useReducedMotion() ?? false;
	const { isAuthenticated } = useAuth();
	const wishlisted = useIsWishlisted(course.id);
	const toggleWishlist = useToggleWishlist();
	const addToCart = useCartStore((s) => s.add);
	const inCart = useCartStore((s) => s.has(course.id));
	const discounted = typeof course.discountPrice === "number" && course.discountPrice < course.price;
	const onWishlist = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isAuthenticated) {
			toast.info("Sign in to save courses to your wishlist");
			return;
		}
		toggleWishlist.mutate({
			courseId: course.id,
			add: !wishlisted
		});
	};
	const onAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		addToCart(course);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: fadeInUp(reduced),
		whileHover: reduced ? void 0 : {
			y: -6,
			transition: springSoft
		},
		whileTap: reduced ? void 0 : { scale: .99 },
		className: "group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-card transition-shadow duration-300 hover:shadow-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/courses/$courseId",
			params: { courseId: course.id },
			className: "flex h-full flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-video overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: course.thumbnail,
						alt: course.title,
						loading: "lazy",
						className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-brand/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "absolute left-3 top-3 bg-card/90 text-foreground backdrop-blur",
						children: course.category
					}),
					discounted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "absolute left-3 bottom-3 bg-destructive text-destructive-foreground",
						children: "Sale"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-3 top-3 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onWishlist,
							"aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
							className: cn("flex h-8 w-8 items-center justify-center rounded-full bg-card/90 shadow-sm backdrop-blur transition-colors hover:bg-card", wishlisted ? "text-destructive" : "text-foreground"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4", wishlisted && "fill-current") })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onAddToCart,
							"aria-label": inCart ? "In cart" : "Add to cart",
							className: cn("flex h-8 w-8 items-center justify-center rounded-full bg-card/90 opacity-0 shadow-sm backdrop-blur transition-all hover:bg-card group-hover:opacity-100", inCart ? "text-primary" : "text-foreground"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: cn("h-4 w-4", inCart && "fill-current") })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-elevated backdrop-blur",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { size: 26 })
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-6 w-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: course.instructorAvatar,
								alt: course.instructor
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: course.instructor[0] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: course.instructor
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "line-clamp-2 font-display text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary",
						children: course.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingStars, {
						rating: course.rating,
						count: course.ratingCount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { size: 14 }),
								" ",
								getLessonCount(course),
								" lessons"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 14 }),
								" ",
								getTotalDuration(course)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto flex items-center justify-between pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-bold text-foreground",
								children: formatPrice(discounted ? course.discountPrice : course.price)
							}), discounted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground line-through",
								children: formatPrice(course.price)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "text-[11px]",
							children: course.level
						})]
					})
				]
			})]
		})
	});
}
/** Matching skeleton for catalog/grid loading states. */
function CourseCardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col overflow-hidden rounded-xl border bg-card shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-video w-full rounded-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-6 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-24" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-3/4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-32" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-14" })]
				})
			]
		})]
	});
}
function Stagger({ children, className, stagger = .08, amount = .15, as }) {
	const reduced = useReducedMotion() ?? false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion(as ?? "div"), {
		className: cn(className),
		variants: staggerContainer(reduced, stagger),
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			amount
		},
		children
	});
}
function StaggerItem({ children, className, as }) {
	const reduced = useReducedMotion() ?? false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion(as ?? "div"), {
		className: cn(className),
		variants: fadeInUp(reduced),
		children
	});
}
//#endregion
export { StaggerItem as i, CourseCardSkeleton as n, Stagger as r, CourseCard as t };
