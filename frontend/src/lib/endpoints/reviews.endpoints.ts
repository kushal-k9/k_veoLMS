// Review API calls.
import { api } from "@/lib/api/client";

export interface Review {
  id: string;
  course: string | { id: string; title: string };
  authorName: string;
  rating: number;
  body: string;
  hidden: boolean;
  createdAt: string;
}

export async function listReviews(courseId: string) {
  const { data } = await api.get(`/reviews/course/${courseId}`);
  return data.data.reviews as Review[];
}
export async function getMyReview(courseId: string) {
  const { data } = await api.get(`/reviews/course/${courseId}/me`);
  return data.data.review as Review | null;
}
export async function upsertReview(courseId: string, input: { rating: number; body: string }) {
  const { data } = await api.put(`/reviews/course/${courseId}`, input);
  return data.data.review as Review;
}
export async function listAllReviews() {
  const { data } = await api.get("/reviews/admin/all");
  return data.data.reviews as Review[];
}
export async function setReviewHidden(id: string, hidden: boolean) {
  const { data } = await api.patch(`/reviews/${id}/hidden`, { hidden });
  return data.data.review as Review;
}
export async function deleteReview(id: string) {
  await api.delete(`/reviews/${id}`);
  return id;
}
