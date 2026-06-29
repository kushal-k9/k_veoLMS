// Payment API calls (Stripe Elements flow).
import { api } from "@/lib/api/client";
import type { Enrollment } from "@/types/api";

export interface CreateIntentResult {
  clientSecret: string;
  amount: number;
  currency: string;
  courseId: string;
}

export async function createPaymentIntent(courseId: string, couponCode?: string) {
  const { data } = await api.post("/payments/create-intent", {
    courseId,
    ...(couponCode ? { couponCode } : {}),
  });
  return data.data as CreateIntentResult;
}

export async function confirmPayment(paymentIntentId: string) {
  const { data } = await api.post("/payments/confirm", { paymentIntentId });
  return data.data.enrollment as Enrollment;
}
