import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as useBootstrapAuth } from "./useAuth-DGq_YKFM.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useReducedMotion, o as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as pageTransition } from "./motion-D-zm4uIr.mjs";
import { t as Route$7 } from "./certificate._code-CiTl-obc.mjs";
import { t as Route$8 } from "./courses._courseId-Kz2iNlf7.mjs";
import { t as Route$9 } from "./courses.index-uiRHXEjw.mjs";
import { t as Route$10 } from "./learn._courseId._lessonId-DZMZU4Ts.mjs";
import { t as Route$11 } from "./login-as1IZK1Y.mjs";
import { n as GoogleOAuthProvider } from "../_libs/react-oauth__google.mjs";
import { t as Route$12 } from "./verify-otp-DfsNgZuA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C_r-FVqf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D8y6uH6B.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var GOOGLE_CLIENT_ID = "187194255166-sd5grk5qbdc8gg80djf33nd8qoun3jcm.apps.googleusercontent.com";
function AuthBootstrap({ children }) {
	useBootstrapAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function AppProviders({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleOAuthProvider, {
		clientId: GOOGLE_CLIENT_ID,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthBootstrap, { children })
	});
}
function PageTransition({ children }) {
	const reduced = useReducedMotion() ?? false;
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		mode: "wait",
		initial: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			variants: pageTransition(reduced),
			initial: "hidden",
			animate: "show",
			exit: "exit",
			style: { willChange: "opacity, transform" },
			children
		}, pathname)
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "VeoLMS — Learn Without Limits" },
			{
				name: "description",
				content: "VeoLMS is a modern learning platform with expert-led courses in web development, React, and Node.js. Learn at your own pace."
			},
			{
				name: "author",
				content: "VeoLMS"
			},
			{
				property: "og:title",
				content: "VeoLMS — Learn Without Limits"
			},
			{
				property: "og:description",
				content: "Expert-led courses in web development, React, and Node.js."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppProviders, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-center"
		})] })
	});
}
var BASE_URL = "";
var API_URL = "http://localhost:4000/api";
async function fetchCourseIds() {
	try {
		const res = await fetch(`${API_URL}/courses?limit=100`);
		if (!res.ok) return [];
		return ((await res.json())?.data?.courses ?? []).map((c) => c.id);
	} catch {
		return [];
	}
}
var Route$5 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/courses",
				changefreq: "weekly",
				priority: "0.9"
			},
			{
				path: "/login",
				changefreq: "monthly",
				priority: "0.3"
			},
			{
				path: "/signup",
				changefreq: "monthly",
				priority: "0.3"
			},
			...(await fetchCourseIds()).map((id) => ({
				path: `/courses/${id}`,
				changefreq: "weekly",
				priority: "0.8"
			}))
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$4 = () => import("./signup-DCOErnIV.mjs");
var Route$4 = createFileRoute("/signup")({
	head: () => ({ meta: [{ title: "Sign up — VeoLMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./dashboard-Dg9yxc08.mjs");
var Route$3 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "My Dashboard — VeoLMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./courses-CpxS_IJr.mjs");
var Route$2 = createFileRoute("/courses")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin-4R27joYr.mjs");
var Route$1 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin Dashboard — VeoLMS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
/**
* Loads the full course (with all nested sections/lessons) by id before opening
* the editor, so edits are always pre-populated from fresh server data.
*/
var $$splitComponentImporter = () => import("./routes-C2CnehP5.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "VeoLMS — Learn Web Development, React & Node.js" },
		{
			name: "description",
			content: "Master coding with expert-led video courses on VeoLMS. Web development, React, and Node.js — learn at your own pace and track your progress."
		},
		{
			property: "og:title",
			content: "VeoLMS — Learn Without Limits"
		},
		{
			property: "og:description",
			content: "Expert-led video courses in web development, React, and Node.js."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var VerifyOtpRoute = Route$12.update({
	id: "/verify-otp",
	path: "/verify-otp",
	getParentRoute: () => Route$6
});
var SitemapDotxmlRoute = Route$5.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$6
});
var SignupRoute = Route$4.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$6
});
var LoginRoute = Route$11.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$6
});
var DashboardRoute = Route$3.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$6
});
var CoursesRoute = Route$2.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => Route$6
});
var AdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$6
});
var IndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var CoursesIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => CoursesRoute
});
var CoursesCourseIdRoute = Route$8.update({
	id: "/$courseId",
	path: "/$courseId",
	getParentRoute: () => CoursesRoute
});
var CertificateCodeRoute = Route$7.update({
	id: "/certificate/$code",
	path: "/certificate/$code",
	getParentRoute: () => Route$6
});
var LearnCourseIdLessonIdRoute = Route$10.update({
	id: "/learn/$courseId/$lessonId",
	path: "/learn/$courseId/$lessonId",
	getParentRoute: () => Route$6
});
var CoursesRouteChildren = {
	CoursesCourseIdRoute,
	CoursesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	CoursesRoute: CoursesRoute._addFileChildren(CoursesRouteChildren),
	DashboardRoute,
	LoginRoute,
	SignupRoute,
	SitemapDotxmlRoute,
	VerifyOtpRoute,
	CertificateCodeRoute,
	LearnCourseIdLessonIdRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
