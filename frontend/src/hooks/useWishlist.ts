// Wishlist hooks: list + toggle (add/remove) the current user's saved courses.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import * as usersApi from "@/lib/endpoints/users.endpoints";
import { useAuth } from "./useAuth";
import type { Course } from "@/types/api";

export function useWishlist() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.wishlist,
    queryFn: usersApi.getWishlist,
    enabled: isAuthenticated,
  });
}

/** Is a given course in the wishlist? */
export function useIsWishlisted(courseId: string | undefined) {
  const { data } = useWishlist();
  return Boolean(courseId && data?.some((c) => c.id === courseId));
}

export function useToggleWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, add }: { courseId: string; add: boolean }) =>
      add ? usersApi.addToWishlist(courseId) : usersApi.removeFromWishlist(courseId),
    onSuccess: (courses) => {
      qc.setQueryData<Course[]>(queryKeys.wishlist, courses);
    },
  });
}
