// Ops hooks: coupons, transactions, audit log, settings.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ops from "@/lib/endpoints/ops.endpoints";
import type { CouponInput, Settings } from "@/lib/endpoints/ops.endpoints";

// ---------- Coupons ----------
export function useCoupons() {
  return useQuery({ queryKey: ["coupons"], queryFn: ops.listCoupons });
}
export function useSaveCoupon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id?: string; input: CouponInput }) =>
      id ? ops.updateCoupon(id, input) : ops.createCoupon(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["coupons"] }),
  });
}
export function useDeleteCoupon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ops.deleteCoupon(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["coupons"] }),
  });
}

// ---------- Transactions ----------
export function useTransactions() {
  return useQuery({ queryKey: ["transactions"], queryFn: ops.listTransactions });
}
export function useRefund() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ops.refundTransaction(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["enrollments", "all"] });
    },
  });
}

// ---------- Audit ----------
export function useAuditLog(params: { action?: string; page?: number } = {}) {
  return useQuery({ queryKey: ["audit", params], queryFn: () => ops.listAudit(params) });
}

// ---------- Settings ----------
export function useSettings() {
  return useQuery({ queryKey: ["settings"], queryFn: ops.getSettings });
}
export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (updates: Settings) => ops.updateSettings(updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}
