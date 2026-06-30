import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { n as useReducedMotion } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as fadeInUp } from "./motion-D-zm4uIr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Reveal-F2_ii-l3.js
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, className, delay = 0, amount = .2, as }) {
	const reduced = useReducedMotion() ?? false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion(as ?? "div"), {
		className: cn(className),
		variants: fadeInUp(reduced),
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			amount
		},
		transition: { delay: reduced ? 0 : delay },
		children
	});
}
//#endregion
export { Reveal as t };
