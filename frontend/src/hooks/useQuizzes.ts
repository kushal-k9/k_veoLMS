// Quiz hooks: student list/attempts/submit + admin CRUD.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as quizzesApi from "@/lib/endpoints/quizzes.endpoints";
import type { QuizInput } from "@/lib/endpoints/quizzes.endpoints";

export function useCourseQuizzes(courseId: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ["quizzes", courseId],
    queryFn: () => quizzesApi.listCourseQuizzes(courseId as string),
    enabled: Boolean(courseId) && enabled,
  });
}

export function useCourseQuizzesAdmin(courseId: string | undefined) {
  return useQuery({
    queryKey: ["quizzes", "admin", courseId],
    queryFn: () => quizzesApi.listCourseQuizzesAdmin(courseId as string),
    enabled: Boolean(courseId),
  });
}

export function useMyAttempts(courseId: string | undefined) {
  return useQuery({
    queryKey: ["quiz-attempts", courseId],
    queryFn: () => quizzesApi.myAttempts(courseId as string),
    enabled: Boolean(courseId),
  });
}

export function useSubmitQuiz(courseId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ quizId, answers }: { quizId: string; answers: number[] }) =>
      quizzesApi.submitQuiz(quizId, answers),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quiz-attempts", courseId] }),
  });
}

export function useSaveQuiz() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id?: string; input: QuizInput }) =>
      id ? quizzesApi.updateQuiz(id, input) : quizzesApi.createQuiz(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizzes"] }),
  });
}

export function useDeleteQuiz() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => quizzesApi.deleteQuiz(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizzes"] }),
  });
}
