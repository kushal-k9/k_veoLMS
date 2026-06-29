// User (admin) hooks: list (filtered) + role/status/password mutations.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import * as usersApi from "@/lib/endpoints/users.endpoints";
import type { UserListParams } from "@/lib/endpoints/users.endpoints";
import { useAuth } from "./useAuth";
import type { Role } from "@/types/api";

/** Simple role-filtered list (used by stats + students table). */
export function useUsers(role?: Role) {
  const { isAdmin } = useAuth();
  return useQuery({
    queryKey: queryKeys.users(role),
    queryFn: () => usersApi.listUsers({ role }),
    enabled: isAdmin,
  });
}

/** Full admin user list with search/role/status filters. */
export function useUsersAdmin(params: UserListParams = {}) {
  const { isAdmin } = useAuth();
  return useQuery({
    queryKey: queryKeys.usersList(params as Record<string, unknown>),
    queryFn: () => usersApi.listUsers(params),
    enabled: isAdmin,
  });
}

function useInvalidateUsers() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["users"] });
}

export function useSetUserRole() {
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: Role }) =>
      usersApi.setUserRole(id, role),
    onSuccess: invalidate,
  });
}

export function useSetUserStatus() {
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "banned" }) =>
      usersApi.setUserStatus(id, status),
    onSuccess: invalidate,
  });
}

export function useResetUserPassword() {
  return useMutation({
    mutationFn: (id: string) => usersApi.resetUserPassword(id),
  });
}
