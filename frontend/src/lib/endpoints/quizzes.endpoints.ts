// Quiz API calls (student take + admin CRUD).
import { api } from "@/lib/api/client";

export interface QuizQuestion {
  id?: string;
  prompt: string;
  options: string[];
  correctIndex?: number; // present only in admin views
}
export interface Quiz {
  id: string;
  course: string;
  lessonId?: string;
  title: string;
  description?: string;
  passingScore: number;
  questions: QuizQuestion[];
}
export interface QuizAttempt {
  id: string;
  quiz: string;
  course: string;
  answers: number[];
  score: number;
  passed: boolean;
  createdAt: string;
}
export interface QuizResult {
  attempt: QuizAttempt;
  correct: number;
  total: number;
  passingScore: number;
}

export async function listCourseQuizzes(courseId: string) {
  const { data } = await api.get(`/quizzes/course/${courseId}`);
  return data.data.quizzes as Quiz[];
}
export async function listCourseQuizzesAdmin(courseId: string) {
  const { data } = await api.get(`/quizzes/course/${courseId}/admin`);
  return data.data.quizzes as Quiz[];
}
export async function myAttempts(courseId: string) {
  const { data } = await api.get(`/quizzes/course/${courseId}/attempts/me`);
  return data.data.attempts as QuizAttempt[];
}
export async function submitQuiz(quizId: string, answers: number[]) {
  const { data } = await api.post(`/quizzes/${quizId}/attempts`, { answers });
  return data.data as QuizResult;
}
export type QuizInput = Omit<Quiz, "id">;
export async function createQuiz(input: QuizInput) {
  const { data } = await api.post("/quizzes", input);
  return data.data.quiz as Quiz;
}
export async function updateQuiz(id: string, input: Partial<QuizInput>) {
  const { data } = await api.patch(`/quizzes/${id}`, input);
  return data.data.quiz as Quiz;
}
export async function deleteQuiz(id: string) {
  await api.delete(`/quizzes/${id}`);
  return id;
}
