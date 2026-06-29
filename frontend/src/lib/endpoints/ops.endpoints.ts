// Ops API calls: coupons, transactions, audit log, settings.
import { api } from "@/lib/api/client";

// ---------- Coupons ----------
export interface Coupon {
  id: string;
  code: string;
  type: "percent" | "flat";
  value: number;
  course: { id: string; title: string } | string | null;
  expiresAt: string | null;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}
export type CouponInput = {
  code: string;
  type: "percent" | "flat";
  value: number;
  course?: string | null;
  expiresAt?: string | null;
  usageLimit?: number;
  active?: boolean;
};
export async function listCoupons() {
  const { data } = await api.get("/coupons");
  return data.data.coupons as Coupon[];
}
export async function createCoupon(input: CouponInput) {
  const { data } = await api.post("/coupons", input);
  return data.data.coupon as Coupon;
}
export async function updateCoupon(id: string, input: Partial<CouponInput>) {
  const { data } = await api.patch(`/coupons/${id}`, input);
  return data.data.coupon as Coupon;
}
export async function deleteCoupon(id: string) {
  await api.delete(`/coupons/${id}`);
  return id;
}
export interface CouponPreview {
  code: string;
  originalPrice: number;
  finalPrice: number;
  discount: number;
}
export async function validateCoupon(code: string, courseId: string) {
  const { data } = await api.post("/coupons/validate", { code, courseId });
  return data.data as CouponPreview | null;
}

// ---------- Transactions ----------
export interface Transaction {
  id: string;
  user: { id: string; name: string; email: string } | string;
  course: { id: string; title: string } | string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}
export async function listTransactions() {
  const { data } = await api.get("/payments");
  return data.data.payments as Transaction[];
}
export async function refundTransaction(id: string) {
  const { data } = await api.post(`/payments/${id}/refund`);
  return data.data.payment as Transaction;
}

// ---------- Audit ----------
export interface AuditLog {
  id: string;
  actor: { id: string; name: string; email: string } | null;
  actorEmail: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}
export async function listAudit(params: { action?: string; page?: number } = {}) {
  const { data } = await api.get("/audit", { params });
  return data.data as {
    logs: AuditLog[];
    pagination: { page: number; total: number; totalPages: number };
  };
}

// ---------- Settings ----------
export type Settings = Record<string, unknown>;
export async function getSettings() {
  const { data } = await api.get("/settings");
  return data.data.settings as Settings;
}
export async function updateSettings(updates: Settings) {
  const { data } = await api.patch("/settings", updates);
  return data.data.settings as Settings;
}
