import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as api } from "./client-BtKFGlsZ.mjs";
import { s as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { d as DialogContent, f as DialogDescription, g as DialogTrigger, h as DialogTitle, l as Dialog, m as DialogPortal, p as DialogOverlay, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scroll-area-CdfiTdOf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function getAllLessons(course) {
	return course.sections.flatMap((s) => s.lessons);
}
function getLessonCount(course) {
	return getAllLessons(course).length;
}
function getTotalDuration(course) {
	const totalSeconds = getAllLessons(course).reduce((acc, l) => {
		const [m, s] = l.duration.split(":").map(Number);
		return acc + (m || 0) * 60 + (s || 0);
	}, 0);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.round(totalSeconds % 3600 / 60);
	return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}
function formatPrice(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(amount);
}
var queryKeys = {
	me: ["me"],
	courses: {
		all: ["courses"],
		list: (params) => [
			"courses",
			"list",
			params
		],
		detail: (id) => [
			"courses",
			"detail",
			id
		]
	},
	enrollments: {
		mine: ["enrollments", "mine"],
		all: ["enrollments", "all"]
	},
	progress: (courseId) => ["progress", courseId],
	notes: (courseId) => ["notes", courseId],
	wishlist: ["wishlist"],
	users: (role) => ["users", role ?? "all"],
	usersList: (params) => [
		"users",
		"list",
		params
	],
	payments: ["payments"]
};
async function listCourses(params = {}) {
	const { data } = await api.get("/courses", { params });
	return data.data;
}
async function getCourse(id) {
	const { data } = await api.get(`/courses/${id}`);
	return data.data.course;
}
async function createCourse(input) {
	const { data } = await api.post("/courses", input);
	return data.data.course;
}
async function updateCourse(id, input) {
	const { data } = await api.patch(`/courses/${id}`, input);
	return data.data.course;
}
async function deleteCourse(id) {
	await api.delete(`/courses/${id}`);
	return id;
}
async function bulkSetCourseStatus(ids, status) {
	const { data } = await api.patch("/courses/bulk", {
		ids,
		status
	});
	return data.data;
}
function useCourses(params = {}) {
	return useQuery({
		queryKey: queryKeys.courses.list(params),
		queryFn: () => listCourses(params),
		placeholderData: keepPreviousData,
		staleTime: 3e4
	});
}
function useCourse(id) {
	return useQuery({
		queryKey: queryKeys.courses.detail(id ?? ""),
		queryFn: () => getCourse(id),
		enabled: Boolean(id)
	});
}
function useCreateCourse() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => createCourse(input),
		onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.courses.all })
	});
}
function useUpdateCourse() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, input }) => updateCourse(id, input),
		onSuccess: (course) => {
			qc.invalidateQueries({ queryKey: queryKeys.courses.all });
			qc.setQueryData(queryKeys.courses.detail(course.id), course);
		}
	});
}
function useDeleteCourse() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteCourse(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.courses.all })
	});
}
function useBulkCourseStatus() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ ids, status }) => bulkSetCourseStatus(ids, status),
		onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.courses.all })
	});
}
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
	]
}));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
//#endregion
export { useCreateCourse as _, SheetFooter as a, SheetTrigger as c, getLessonCount as d, getTotalDuration as f, useCourses as g, useCourse as h, SheetContent as i, formatPrice as l, useBulkCourseStatus as m, ScrollArea as n, SheetHeader as o, queryKeys as p, Sheet as r, SheetTitle as s, Badge as t, getAllLessons as u, useDeleteCourse as v, useUpdateCourse as y };
