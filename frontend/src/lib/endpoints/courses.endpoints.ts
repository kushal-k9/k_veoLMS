// Course API calls.
import { api } from "@/lib/api/client";
import type { Course, Pagination } from "@/types/api";

export interface CourseListParams {
  q?: string;
  category?: string;
  status?: "draft" | "published";
  page?: number;
  limit?: number;
}

export interface CourseListResult {
  courses: Course[];
  pagination: Pagination;
}

export async function listCourses(params: CourseListParams = {}) {
  const { data } = await api.get("/courses", { params });
  return data.data as CourseListResult;
}

export async function getCourse(id: string) {
  const { data } = await api.get(`/courses/${id}`);
  return data.data.course as Course;
}

export type CourseInput = Partial<Omit<Course, "id" | "createdAt">>;

export async function createCourse(input: CourseInput) {
  const { data } = await api.post("/courses", input);
  return data.data.course as Course;
}

export async function updateCourse(id: string, input: CourseInput) {
  const { data } = await api.patch(`/courses/${id}`, input);
  return data.data.course as Course;
}

export async function deleteCourse(id: string) {
  await api.delete(`/courses/${id}`);
  return id;
}

export async function bulkSetCourseStatus(
  ids: string[],
  status: "draft" | "published",
) {
  const { data } = await api.patch("/courses/bulk", { ids, status });
  return data.data as { matched: number; modified: number };
}
