// Notification hooks: polled list + unread count + mark-read mutations.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/endpoints/engagement.endpoints";
import { useAuth } from "./useAuth";

export function useNotifications() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["notifications"],
    queryFn: api.listNotifications,
    enabled: isAuthenticated,
    // Light polling so the bell stays roughly fresh without websockets.
    refetchInterval: 60_000,
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.markNotificationRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.markAllNotificationsRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}
