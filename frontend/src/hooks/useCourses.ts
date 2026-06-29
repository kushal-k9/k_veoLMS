// Course hooks: list (search/filter/paginate), detail, and admin mutations.
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import * as coursesApi from "@/lib/endpoints/courses.endpoints";
import type { CourseListParams, CourseInput } from "@/lib/endpoints/courses.endpoints";

export function useCourses(params: CourseListParams = {}) {
  return useQuery({
    queryKey: queryKeys.courses.list(params),
    queryFn: () => coursesApi.listCourses(params),
    placeholderData: keepPreviousData, // smooth pagination/search
    staleTime: 30_000,
  });
}

export function useCourse(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.courses.detail(id ?? ""),
    queryFn: () => coursesApi.getCourse(id as string),
    enabled: Boolean(id),
  });
}

export function useCreateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CourseInput) => coursesApi.createCourse(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.courses.all }),
  });
}

export function useUpdateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CourseInput }) =>
      coursesApi.updateCourse(id, input),
    onSuccess: (course) => {
      qc.invalidateQueries({ queryKey: queryKeys.courses.all });
      qc.setQueryData(queryKeys.courses.detail(course.id), course);
    },
  });
}

export function useDeleteCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => coursesApi.deleteCourse(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.courses.all }),
  });
}

export function useBulkCourseStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: "draft" | "published" }) =>
      coursesApi.bulkSetCourseStatus(ids, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.courses.all }),
  });
}
