import { t as api } from "./client-BtKFGlsZ.mjs";
import { a as useQueryClient, n as useQuery, r as useQueries, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { p as queryKeys, u as getAllLessons } from "./scroll-area-CdfiTdOf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useProgress-BJTeten_.js
async function getProgress(courseId) {
	const { data } = await api.get(`/progress/${courseId}`);
	return data.data.progress;
}
async function toggleLesson(courseId, lessonId, complete) {
	const { data } = await api.patch(`/progress/${courseId}/lesson`, {
		lessonId,
		complete
	});
	return data.data.progress;
}
async function setLastLesson(courseId, lessonId) {
	const { data } = await api.patch(`/progress/${courseId}/last-lesson`, { lessonId });
	return data.data.progress;
}
var EMPTY = {
	completedLessonIds: [],
	lastLessonId: null,
	recentlyWatched: []
};
function useProgress(courseId, enabled = true) {
	return useQuery({
		queryKey: queryKeys.progress(courseId ?? ""),
		queryFn: () => getProgress(courseId),
		enabled: Boolean(courseId) && enabled
	});
}
/** Fetch progress for many courses at once; returns a courseId -> Progress map. */
function useCoursesProgress(courseIds) {
	const results = useQueries({ queries: courseIds.map((id) => ({
		queryKey: queryKeys.progress(id),
		queryFn: () => getProgress(id),
		enabled: Boolean(id)
	})) });
	const map = {};
	courseIds.forEach((id, i) => {
		map[id] = results[i]?.data ?? EMPTY;
	});
	return {
		map,
		isLoading: results.some((r) => r.isLoading)
	};
}
function useToggleLesson(courseId) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ lessonId, complete }) => toggleLesson(courseId, lessonId, complete),
		onSuccess: (progress) => qc.setQueryData(queryKeys.progress(courseId), progress)
	});
}
function useSetLastLesson(courseId) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (lessonId) => setLastLesson(courseId, lessonId),
		onSuccess: (progress) => qc.setQueryData(queryKeys.progress(courseId), progress)
	});
}
/** Percent complete for a course given its progress. */
function progressPercent(course, progress) {
	const total = getAllLessons(course).length;
	if (total === 0) return 0;
	const done = (progress ?? EMPTY).completedLessonIds.length;
	return Math.round(done / total * 100);
}
//#endregion
export { useSetLastLesson as a, useProgress as i, progressPercent as n, useToggleLesson as o, useCoursesProgress as r, EMPTY as t };
