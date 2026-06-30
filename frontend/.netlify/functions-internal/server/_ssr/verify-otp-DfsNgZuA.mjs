import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-otp-DfsNgZuA.js
var $$splitComponentImporter = () => import("./verify-otp-cyxNrqR-.mjs");
var Route = createFileRoute("/verify-otp")({
	validateSearch: (s) => ({ email: typeof s.email === "string" ? s.email : void 0 }),
	head: () => ({ meta: [{ title: "Verify email — VeoLMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
