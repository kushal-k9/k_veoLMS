// User (admin) + self-service (wishlist) API calls.
import { api } from "@/lib/api/client";
import type { AdminUser, Course, Role, UserStatus } from "@/types/api";

export interface UserListParams {
  role?: Role;
  status?: UserStatus;
  q?: string;
}

export async function listUsers(params: UserListParams = {}) {
  const { data } = await api.get("/users", { params });
  return data.data.users as AdminUser[];
}

export async function setUserRole(id: string, role: Role) {
  const { data } = await api.patch(`/users/${id}/role`, { role });
  return data.data.user as AdminUser;
}

export async function setUserStatus(id: string, status: UserStatus) {
  const { data } = await api.patch(`/users/${id}/status`, { status });
  return data.data.user as AdminUser;
}

export async function resetUserPassword(id: string) {
  const { data } = await api.post(`/users/${id}/reset-password`);
  return data.data.tempPassword as string;
}

// ---------- Wishlist (current user) ----------
export async function getWishlist() {
  const { data } = await api.get("/users/me/wishlist");
  return data.data.courses as Course[];
}

export async function addToWishlist(courseId: string) {
  const { data } = await api.post(`/users/me/wishlist/${courseId}`);
  return data.data.courses as Course[];
}

export async function removeFromWishlist(courseId: string) {
  const { data } = await api.delete(`/users/me/wishlist/${courseId}`);
  return data.data.courses as Course[];
}
