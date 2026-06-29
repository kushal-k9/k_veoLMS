// Per-lesson notes API calls.
import { api } from "@/lib/api/client";

export interface Note {
  id: string;
  course: string;
  lessonId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export async function listNotes(courseId: string) {
  const { data } = await api.get(`/notes/${courseId}`);
  return data.data.notes as Note[];
}

export async function saveNote(courseId: string, lessonId: string, content: string) {
  const { data } = await api.put(`/notes/${courseId}/${lessonId}`, { content });
  return data.data.note as Note | null;
}

export async function deleteNote(courseId: string, lessonId: string) {
  await api.delete(`/notes/${courseId}/${lessonId}`);
}
