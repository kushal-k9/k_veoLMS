import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useMotionValue, n as useReducedMotion, r as useSpring, t as useInView } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AnimatedCounter-Bcls8WtL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnimatedCounter({ value, from = 0, decimals = 0, prefix = "", suffix = "", className, separator = true }) {
	const reduced = useReducedMotion() ?? false;
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .4
	});
	const motionValue = useMotionValue(from);
	const spring = useSpring(motionValue, {
		stiffness: 90,
		damping: 24,
		mass: 1
	});
	(0, import_react.useEffect)(() => {
		if (!inView) return;
		if (reduced) motionValue.jump(value);
		else motionValue.set(value);
	}, [
		inView,
		value,
		reduced,
		motionValue
	]);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		const format = (n) => {
			const fixed = n.toFixed(decimals);
			if (!separator) return fixed;
			const [int, dec] = fixed.split(".");
			const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return dec ? `${grouped}.${dec}` : grouped;
		};
		const unsub = spring.on("change", (latest) => {
			node.textContent = `${prefix}${format(latest)}${suffix}`;
		});
		node.textContent = `${prefix}${format(reduced ? value : from)}${suffix}`;
		return unsub;
	}, [
		spring,
		decimals,
		prefix,
		suffix,
		separator,
		from,
		value,
		reduced
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		className
	});
}
//#endregion
export { AnimatedCounter as t };
