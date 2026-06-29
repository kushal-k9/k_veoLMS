// Payment hooks (Stripe Elements): create intent + confirm enrollment.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import * as paymentsApi from "@/lib/endpoints/payments.endpoints";

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: ({ courseId, couponCode }: { courseId: string; couponCode?: string }) =>
      paymentsApi.createPaymentIntent(courseId, couponCode),
  });
}

export function useConfirmPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (paymentIntentId: string) =>
      paymentsApi.confirmPayment(paymentIntentId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.enrollments.mine });
      qc.invalidateQueries({ queryKey: queryKeys.enrollments.all });
    },
  });
}
