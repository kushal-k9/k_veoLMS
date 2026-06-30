import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { ht as ArrowUpRight, vt as ArrowDownRight } from "../_libs/lucide-react.mjs";
import { n as useReducedMotion } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { r as scaleIn } from "./motion-D-zm4uIr.mjs";
import { t as AnimatedCounter } from "./AnimatedCounter-Bcls8WtL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stat-card-DWCg5wM2.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, icon, prefix, suffix, decimals, trend, className }) {
	const reduced = useReducedMotion() ?? false;
	const up = (trend ?? 0) >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		variants: scaleIn(reduced),
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			amount: .4
		},
		className: cn("rounded-xl border bg-card p-5 shadow-card", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium text-muted-foreground",
					children: label
				}), icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary",
					children: icon
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
					value,
					prefix,
					suffix,
					decimals
				})
			}),
			trend !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-2 inline-flex items-center gap-1 text-xs font-semibold", up ? "text-success" : "text-destructive"),
				children: [
					up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "h-3.5 w-3.5" }),
					Math.abs(trend).toFixed(1),
					"%",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-normal text-muted-foreground",
						children: "vs last period"
					})
				]
			})
		]
	});
}
//#endregion
export { StatCard as t };
