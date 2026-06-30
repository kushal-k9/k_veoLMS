import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./useAuth-DGq_YKFM.mjs";
import { _ as setQuestionHidden, c as deleteQuestion, f as listQuestions, g as myCertificates, h as myAnnouncements, l as listAllAnnouncements, n as answerQuestion, o as createAnnouncement, r as askQuestion, s as deleteAnnouncement, u as listAllQuestions } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { M as LoaderCircle } from "../_libs/lucide-react.mjs";
import { _ as Navigate, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useEngagement-D12ZvfL6.js
var import_jsx_runtime = require_jsx_runtime();
function FullScreenLoader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
}
function RequireAuth({ children, role }) {
	const { user, isLoading, isStaff } = useAuth();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullScreenLoader, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		search: { redirect: pathname }
	});
	if (role === "admin" && !isStaff) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	if (role === "student" && !isStaff && user.role !== "student") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/admin" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function useMyCertificates() {
	const { isAuthenticated } = useAuth();
	return useQuery({
		queryKey: ["certificates", "me"],
		queryFn: myCertificates,
		enabled: isAuthenticated
	});
}
function useQuestions(courseId, lessonId) {
	return useQuery({
		queryKey: [
			"qa",
			courseId,
			lessonId ?? "all"
		],
		queryFn: () => listQuestions(courseId, lessonId),
		enabled: Boolean(courseId)
	});
}
function useAllQuestions() {
	return useQuery({
		queryKey: ["qa", "admin"],
		queryFn: listAllQuestions
	});
}
function useAskQuestion() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: askQuestion,
		onSuccess: () => qc.invalidateQueries({ queryKey: ["qa"] })
	});
}
function useAnswerQuestion() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, body }) => answerQuestion(id, body),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["qa"] })
	});
}
function useModerateQuestion() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, hidden }) => setQuestionHidden(id, hidden),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["qa"] })
	});
}
function useDeleteQuestion() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteQuestion(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["qa"] })
	});
}
function useMyAnnouncements() {
	const { isAuthenticated } = useAuth();
	return useQuery({
		queryKey: ["announcements", "me"],
		queryFn: myAnnouncements,
		enabled: isAuthenticated
	});
}
function useAllAnnouncements() {
	return useQuery({
		queryKey: ["announcements", "all"],
		queryFn: listAllAnnouncements
	});
}
function useCreateAnnouncement() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: createAnnouncement,
		onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] })
	});
}
function useDeleteAnnouncement() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteAnnouncement(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] })
	});
}
//#endregion
export { useAskQuestion as a, useDeleteQuestion as c, useMyCertificates as d, useQuestions as f, useAnswerQuestion as i, useModerateQuestion as l, useAllAnnouncements as n, useCreateAnnouncement as o, useAllQuestions as r, useDeleteAnnouncement as s, RequireAuth as t, useMyAnnouncements as u };
