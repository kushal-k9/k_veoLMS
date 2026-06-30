import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses.index-uiRHXEjw.js
var $$splitComponentImporter = () => import("./courses.index-txUpKwqn.mjs");
var Route = createFileRoute("/courses/")({
	validateSearch: (search) => ({ q: typeof search.q === "string" ? search.q : void 0 }),
	head: () => ({ meta: [
		{ title: "All Courses — VeoLMS" },
		{
			name: "description",
			content: "Browse all VeoLMS courses. Filter by title and find your next web development, React, or Node.js course."
		},
		{
			property: "og:title",
			content: "All Courses — VeoLMS"
		},
		{
			property: "og:description",
			content: "Browse and search all VeoLMS courses."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
