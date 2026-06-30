import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./useAuth-DGq_YKFM.mjs";
import { l as Star } from "../_libs/lucide-react.mjs";
import { p as queryKeys } from "./scroll-area-CdfiTdOf.mjs";
import { i as removeFromWishlist, n as getWishlist, t as addToWishlist } from "./users.endpoints-Hq_02aTt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useWishlist-1qs9Prqi.js
var import_jsx_runtime = require_jsx_runtime();
function RatingStars({ rating, count, size = 14 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold text-warning-foreground/90 tabular-nums",
				children: rating.toFixed(1)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center",
				children: Array.from({ length: 5 }).map((_, i) => {
					const fill = Math.max(0, Math.min(1, rating - i));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative",
						style: {
							width: size,
							height: size
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							size,
							className: "absolute inset-0 text-warning/40",
							fill: "currentColor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute inset-0 overflow-hidden",
							style: { width: `${fill * 100}%` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								size,
								className: "text-warning",
								fill: "currentColor"
							})
						})]
					}, i);
				})
			}),
			count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted-foreground",
				children: [
					"(",
					count.toLocaleString("en-IN"),
					")"
				]
			})
		]
	});
}
function useWishlist() {
	const { isAuthenticated } = useAuth();
	return useQuery({
		queryKey: queryKeys.wishlist,
		queryFn: getWishlist,
		enabled: isAuthenticated
	});
}
/** Is a given course in the wishlist? */
function useIsWishlisted(courseId) {
	const { data } = useWishlist();
	return Boolean(courseId && data?.some((c) => c.id === courseId));
}
function useToggleWishlist() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ courseId, add }) => add ? addToWishlist(courseId) : removeFromWishlist(courseId),
		onSuccess: (courses) => {
			qc.setQueryData(queryKeys.wishlist, courses);
		}
	});
}
//#endregion
export { useWishlist as i, useIsWishlisted as n, useToggleWishlist as r, RatingStars as t };
