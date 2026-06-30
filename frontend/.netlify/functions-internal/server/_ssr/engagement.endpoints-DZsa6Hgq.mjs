import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as api } from "./client-BtKFGlsZ.mjs";
import { h as Slot, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engagement.endpoints-DZsa6Hgq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
async function myCertificates() {
	const { data } = await api.get("/certificates/me");
	return data.data.certificates;
}
async function verifyCertificate(code) {
	const { data } = await api.get(`/certificates/verify/${code}`);
	return data.data.certificate;
}
async function listQuestions(courseId, lessonId) {
	const { data } = await api.get(`/qa/course/${courseId}`, { params: { lessonId } });
	return data.data.questions;
}
async function askQuestion(input) {
	const { data } = await api.post("/qa", input);
	return data.data.question;
}
async function answerQuestion(id, body) {
	const { data } = await api.post(`/qa/${id}/answers`, { body });
	return data.data.question;
}
async function listAllQuestions() {
	const { data } = await api.get("/qa/admin/all");
	return data.data.questions;
}
async function setQuestionHidden(id, hidden) {
	const { data } = await api.patch(`/qa/${id}/hidden`, { hidden });
	return data.data.question;
}
async function deleteQuestion(id) {
	await api.delete(`/qa/${id}`);
	return id;
}
async function myAnnouncements() {
	const { data } = await api.get("/announcements/me");
	return data.data.announcements;
}
async function listAllAnnouncements() {
	const { data } = await api.get("/announcements");
	return data.data.announcements;
}
async function createAnnouncement(input) {
	const { data } = await api.post("/announcements", input);
	return data.data.announcement;
}
async function deleteAnnouncement(id) {
	await api.delete(`/announcements/${id}`);
	return id;
}
async function listNotifications() {
	const { data } = await api.get("/notifications");
	return data.data;
}
async function markNotificationRead(id) {
	await api.patch(`/notifications/${id}/read`);
}
async function markAllNotificationsRead() {
	await api.patch("/notifications/read-all");
}
//#endregion
export { setQuestionHidden as _, cn as a, deleteQuestion as c, listNotifications as d, listQuestions as f, myCertificates as g, myAnnouncements as h, buttonVariants as i, listAllAnnouncements as l, markNotificationRead as m, answerQuestion as n, createAnnouncement as o, markAllNotificationsRead as p, askQuestion as r, deleteAnnouncement as s, Button as t, listAllQuestions as u, verifyCertificate as v };
