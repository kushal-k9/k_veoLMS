import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { _ as SearchX, g as Search } from "../_libs/lucide-react.mjs";
import { g as useCourses } from "./scroll-area-CdfiTdOf.mjs";
import { _ as PublicLayout, g as Input, y as useUiStore } from "./PublicLayout-8zPEFKiM.mjs";
import { t as useDebounce } from "./useDebounce-D6e2zkos.mjs";
import { t as Route } from "./courses.index-uiRHXEjw.mjs";
import { n as CourseCardSkeleton, r as Stagger, t as CourseCard } from "./Stagger-BRYZYVeL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses.index-txUpKwqn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoursesPage() {
	const { q } = Route.useSearch();
	const navigate = Route.useNavigate();
	const [query, setQuery] = (0, import_react.useState)(q ?? "");
	const debouncedQuery = useDebounce(query.trim(), 350);
	const activeCat = useUiStore((s) => s.category);
	const setActiveCat = useUiStore((s) => s.setCategory);
	(0, import_react.useEffect)(() => {
		navigate({
			search: { q: debouncedQuery || void 0 },
			replace: true
		});
	}, [debouncedQuery]);
	const { data, isLoading } = useCourses({
		q: debouncedQuery || void 0,
		limit: 100
	});
	const courses = data?.courses ?? [];
	const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];
	const filtered = activeCat === "All" ? courses : courses.filter((c) => c.category === activeCat);
	const onChange = (v) => setQuery(v);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold",
					children: "Explore courses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-muted-foreground",
					children: [courses.length, " courses to help you grow your skills."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-6 max-w-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => onChange(e.target.value),
						placeholder: "Search by course title or instructor…",
						className: "h-12 pl-9"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: activeCat === cat ? "default" : "outline",
						onClick: () => setActiveCat(cat),
						className: "rounded-full",
						children: cat
					}, cat))
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCardSkeleton, {}, i))
		}) : filtered.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-6 text-sm text-muted-foreground",
			children: [
				"Showing ",
				filtered.length,
				" course",
				filtered.length !== 1 ? "s" : "",
				query ? ` for “${query}”` : ""
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
			className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			stagger: .06,
			children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c }, c.id))
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center py-24 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, { className: "h-12 w-12 text-muted-foreground/50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 font-display text-lg font-semibold",
					children: "No courses found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-sm text-sm text-muted-foreground",
					children: "We couldn't find any courses matching your search. Try a different keyword."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-4",
					onClick: () => {
						setActiveCat("All");
						onChange("");
					},
					children: "Clear filters"
				})
			]
		})
	})] });
}
//#endregion
export { CoursesPage as component };
