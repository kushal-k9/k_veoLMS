// Progress API calls.
import { api } from "@/lib/api/client";
import type { Progress } from "@/types/api";

export async function getProgress(courseId: string) {
  const { data } = await api.get(`/progress/${courseId}`);
  return data.data.progress as Progress;
}

export async function toggleLesson(
  courseId: string,
  lessonId: string,
  complete: boolean
) {
  const { data } = await api.patch(`/progress/${courseId}/lesson`, {
    lessonId,
    complete,
  });
  return data.data.progress as Progress;
}

export async function setLastLesson(courseId: string, lessonId: string) {
  const { data } = await api.patch(`/progress/${courseId}/last-lesson`, {
    lessonId,
  });
  return data.data.progress as Progress;
}
