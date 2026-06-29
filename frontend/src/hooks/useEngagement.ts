// Hooks for certificates, Q&A, and announcements.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/endpoints/engagement.endpoints";
import { useAuth } from "./useAuth";

// ---------- Certificates ----------
export function useMyCertificates() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["certificates", "me"],
    queryFn: api.myCertificates,
    enabled: isAuthenticated,
  });
}

// ---------- Q&A ----------
export function useQuestions(courseId: string | undefined, lessonId?: string) {
  return useQuery({
    queryKey: ["qa", courseId, lessonId ?? "all"],
    queryFn: () => api.listQuestions(courseId as string, lessonId),
    enabled: Boolean(courseId),
  });
}
export function useAllQuestions() {
  return useQuery({ queryKey: ["qa", "admin"], queryFn: api.listAllQuestions });
}
export function useAskQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.askQuestion,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["qa"] }),
  });
}
export function useAnswerQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: string }) => api.answerQuestion(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["qa"] }),
  });
}
export function useModerateQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, hidden }: { id: string; hidden: boolean }) =>
      api.setQuestionHidden(id, hidden),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["qa"] }),
  });
}
export function useDeleteQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteQuestion(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["qa"] }),
  });
}

// ---------- Announcements ----------
export function useMyAnnouncements() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["announcements", "me"],
    queryFn: api.myAnnouncements,
    enabled: isAuthenticated,
  });
}
export function useAllAnnouncements() {
  return useQuery({ queryKey: ["announcements", "all"], queryFn: api.listAllAnnouncements });
}
export function useCreateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createAnnouncement,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}
export function useDeleteAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteAnnouncement(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}
