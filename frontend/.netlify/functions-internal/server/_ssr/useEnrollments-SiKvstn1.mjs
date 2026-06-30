import { t as api } from "./client-BtKFGlsZ.mjs";
import { a as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./useAuth-DGq_YKFM.mjs";
import { p as queryKeys } from "./scroll-area-CdfiTdOf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useEnrollments-SiKvstn1.js
async function getMyEnrollments() {
	const { data } = await api.get("/enrollments/me");
	return data.data.enrollments;
}
async function getAllEnrollments() {
	const { data } = await api.get("/enrollments");
	return data.data.enrollments;
}
async function adminEnroll(userId, courseId) {
	const { data } = await api.post("/enrollments/admin", {
		userId,
		courseId
	});
	return data.data.enrollment;
}
async function adminUnenroll(userId, courseId) {
	await api.delete(`/enrollments/admin/${userId}/${courseId}`);
}
function enrollmentCourseId(e) {
	return typeof e.course === "string" ? e.course : e.course.id;
}
function useMyEnrollments() {
	const { isAuthenticated } = useAuth();
	return useQuery({
		queryKey: queryKeys.enrollments.mine,
		queryFn: getMyEnrollments,
		enabled: isAuthenticated
	});
}
function useAllEnrollments() {
	const { isAdmin } = useAuth();
	return useQuery({
		queryKey: queryKeys.enrollments.all,
		queryFn: getAllEnrollments,
		enabled: isAdmin
	});
}
/** Convenience: is the current user enrolled in a given course? */
function useIsEnrolled(courseId) {
	const { data: enrollments } = useMyEnrollments();
	return Boolean(courseId && enrollments?.some((e) => enrollmentCourseId(e) === courseId));
}
/** The current user's enrolled courses (course objects, populated). */
function useMyCourses() {
	const { data: enrollments } = useMyEnrollments();
	return (enrollments ?? []).map((e) => typeof e.course === "string" ? null : e.course).filter((c) => Boolean(c));
}
/** Admin: manually enroll / unenroll a user in a course. */
function useAdminEnroll() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, courseId }) => adminEnroll(userId, courseId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: queryKeys.enrollments.all });
			qc.invalidateQueries({ queryKey: ["users"] });
		}
	});
}
function useAdminUnenroll() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, courseId }) => adminUnenroll(userId, courseId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: queryKeys.enrollments.all });
			qc.invalidateQueries({ queryKey: ["users"] });
		}
	});
}
//#endregion
export { useIsEnrolled as a, useAllEnrollments as i, useAdminEnroll as n, useMyCourses as o, useAdminUnenroll as r, useMyEnrollments as s, enrollmentCourseId as t };
