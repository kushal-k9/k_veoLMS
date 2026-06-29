// Enrollment API calls.
import { api } from "@/lib/api/client";
import type { Enrollment } from "@/types/api";

export async function getMyEnrollments() {
  const { data } = await api.get("/enrollments/me");
  return data.data.enrollments as Enrollment[];
}

export async function getAllEnrollments() {
  const { data } = await api.get("/enrollments");
  return data.data.enrollments as Enrollment[];
}

export async function adminEnroll(userId: string, courseId: string) {
  const { data } = await api.post("/enrollments/admin", { userId, courseId });
  return data.data.enrollment as Enrollment;
}

export async function adminUnenroll(userId: string, courseId: string) {
  await api.delete(`/enrollments/admin/${userId}/${courseId}`);
}
