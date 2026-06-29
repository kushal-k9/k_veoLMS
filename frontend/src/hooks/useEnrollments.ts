// Enrollment hooks: my enrollments, all (admin), and an is-enrolled helper.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import * as enrollmentsApi from "@/lib/endpoints/enrollments.endpoints";
import { useAuth } from "./useAuth";
import type { Course, Enrollment } from "@/types/api";

function enrollmentCourseId(e: Enrollment): string {
  return typeof e.course === "string" ? e.course : e.course.id;
}

export function useMyEnrollments() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.enrollments.mine,
    queryFn: enrollmentsApi.getMyEnrollments,
    enabled: isAuthenticated,
  });
}

export function useAllEnrollments() {
  const { isAdmin } = useAuth();
  return useQuery({
    queryKey: queryKeys.enrollments.all,
    queryFn: enrollmentsApi.getAllEnrollments,
    enabled: isAdmin,
  });
}

/** Convenience: is the current user enrolled in a given course? */
export function useIsEnrolled(courseId: string | undefined) {
  const { data: enrollments } = useMyEnrollments();
  const enrolled = Boolean(
    courseId && enrollments?.some((e) => enrollmentCourseId(e) === courseId)
  );
  return enrolled;
}

/** The current user's enrolled courses (course objects, populated). */
export function useMyCourses(): Course[] {
  const { data: enrollments } = useMyEnrollments();
  return (enrollments ?? [])
    .map((e) => (typeof e.course === "string" ? null : e.course))
    .filter((c): c is Course => Boolean(c));
}

/** Admin: manually enroll / unenroll a user in a course. */
export function useAdminEnroll() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, courseId }: { userId: string; courseId: string }) =>
      enrollmentsApi.adminEnroll(userId, courseId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.enrollments.all });
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useAdminUnenroll() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, courseId }: { userId: string; courseId: string }) =>
      enrollmentsApi.adminUnenroll(userId, courseId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.enrollments.all });
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export { enrollmentCourseId };
