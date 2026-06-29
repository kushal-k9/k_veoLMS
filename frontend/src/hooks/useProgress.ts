// Progress hooks: fetch progress + mutations to mark lessons / set last lesson.
import {
  useQuery,
  useQueries,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import * as progressApi from "@/lib/endpoints/progress.endpoints";
import { getAllLessons } from "@/lib/course";
import type { Course, Progress } from "@/types/api";

const EMPTY: Progress = {
  completedLessonIds: [],
  lastLessonId: null,
  recentlyWatched: [],
};

export function useProgress(courseId: string | undefined, enabled = true) {
  return useQuery({
    queryKey: queryKeys.progress(courseId ?? ""),
    queryFn: () => progressApi.getProgress(courseId as string),
    enabled: Boolean(courseId) && enabled,
  });
}

/** Fetch progress for many courses at once; returns a courseId -> Progress map. */
export function useCoursesProgress(courseIds: string[]) {
  const results = useQueries({
    queries: courseIds.map((id) => ({
      queryKey: queryKeys.progress(id),
      queryFn: () => progressApi.getProgress(id),
      enabled: Boolean(id),
    })),
  });
  const map: Record<string, Progress> = {};
  courseIds.forEach((id, i) => {
    map[id] = results[i]?.data ?? EMPTY;
  });
  const isLoading = results.some((r) => r.isLoading);
  return { map, isLoading };
}

export function useToggleLesson(courseId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonId, complete }: { lessonId: string; complete: boolean }) =>
      progressApi.toggleLesson(courseId, lessonId, complete),
    onSuccess: (progress) =>
      qc.setQueryData(queryKeys.progress(courseId), progress),
  });
}

export function useSetLastLesson(courseId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: string) => progressApi.setLastLesson(courseId, lessonId),
    onSuccess: (progress) =>
      qc.setQueryData(queryKeys.progress(courseId), progress),
  });
}

/** Percent complete for a course given its progress. */
export function progressPercent(course: Course, progress?: Progress): number {
  const total = getAllLessons(course).length;
  if (total === 0) return 0;
  const done = (progress ?? EMPTY).completedLessonIds.length;
  return Math.round((done / total) * 100);
}

export { EMPTY as emptyProgress };
