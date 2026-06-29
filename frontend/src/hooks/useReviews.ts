// Review hooks: course reviews, my review, upsert, and admin moderation.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as reviewsApi from "@/lib/endpoints/reviews.endpoints";
import { useAuth } from "./useAuth";

export function useReviews(courseId: string | undefined) {
  return useQuery({
    queryKey: ["reviews", courseId],
    queryFn: () => reviewsApi.listReviews(courseId as string),
    enabled: Boolean(courseId),
  });
}

export function useMyReview(courseId: string | undefined) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["reviews", "me", courseId],
    queryFn: () => reviewsApi.getMyReview(courseId as string),
    enabled: Boolean(courseId) && isAuthenticated,
  });
}

export function useUpsertReview(courseId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { rating: number; body: string }) =>
      reviewsApi.upsertReview(courseId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews", courseId] });
      qc.invalidateQueries({ queryKey: ["reviews", "me", courseId] });
      qc.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useAllReviews() {
  return useQuery({ queryKey: ["reviews", "admin"], queryFn: reviewsApi.listAllReviews });
}
export function useModerateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, hidden }: { id: string; hidden: boolean }) =>
      reviewsApi.setReviewHidden(id, hidden),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}
export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewsApi.deleteReview(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}
