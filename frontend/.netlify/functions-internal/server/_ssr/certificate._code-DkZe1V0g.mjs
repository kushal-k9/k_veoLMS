import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button, v as verifyCertificate } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { M as LoaderCircle, b as Printer, mt as Award } from "../_libs/lucide-react.mjs";
import { N as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./certificate._code-CiTl-obc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificate._code-DkZe1V0g.js
var import_jsx_runtime = require_jsx_runtime();
function CertificatePage() {
	const { code } = Route.useParams();
	const { data, isLoading, isError } = useQuery({
		queryKey: ["certificate", code],
		queryFn: () => verifyCertificate(code)
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
	if (isError || !data) throw notFound();
	const course = typeof data.course === "string" ? null : data.course;
	const user = typeof data.user === "string" ? null : data.user;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center gap-6 bg-muted px-4 py-10 print:bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-3xl rounded-2xl border-4 border-primary/20 bg-card p-10 text-center shadow-elevated print:border-primary/40 print:shadow-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "mx-auto h-16 w-16 text-warning" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground",
					children: "Certificate of Completion"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: "This certifies that"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-extrabold text-foreground",
					children: user?.name ?? "Student"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "has successfully completed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl font-bold text-primary",
					children: course?.title ?? "Course"
				}),
				course?.instructor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: ["Instructor: ", course.instructor]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-between border-t pt-6 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Issued ", new Date(data.issuedAt).toLocaleDateString()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Verification: ", data.code] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: () => window.print(),
			className: "print:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "mr-1.5 h-4 w-4" }), " Print / Save PDF"]
		})]
	});
}
//#endregion
export { CertificatePage as component };
