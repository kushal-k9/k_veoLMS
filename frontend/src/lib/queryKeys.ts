// Centralized TanStack Query keys so invalidation stays consistent.
import type { CourseListParams } from "@/lib/endpoints/courses.endpoints";

export const queryKeys = {
  me: ["me"] as const,

  courses: {
    all: ["courses"] as const,
    list: (params: CourseListParams) => ["courses", "list", params] as const,
    detail: (id: string) => ["courses", "detail", id] as const,
  },

  enrollments: {
    mine: ["enrollments", "mine"] as const,
    all: ["enrollments", "all"] as const,
  },

  progress: (courseId: string) => ["progress", courseId] as const,

  notes: (courseId: string) => ["notes", courseId] as const,

  wishlist: ["wishlist"] as const,

  users: (role?: string) => ["users", role ?? "all"] as const,
  usersList: (params: Record<string, unknown>) => ["users", "list", params] as const,

  payments: ["payments"] as const,
};
