// Admin analytics hooks.
import { useQuery } from "@tanstack/react-query";
import * as analyticsApi from "@/lib/endpoints/analytics.endpoints";
import type { AnalyticsRange } from "@/lib/endpoints/analytics.endpoints";
import { useAuth } from "./useAuth";

export function useAnalyticsOverview() {
  const { isAdmin } = useAuth();
  return useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: analyticsApi.getOverview,
    enabled: isAdmin,
  });
}

export function useRevenueSeries(range: AnalyticsRange) {
  const { isAdmin } = useAuth();
  return useQuery({
    queryKey: ["analytics", "revenue", range],
    queryFn: () => analyticsApi.getRevenueSeries(range),
    enabled: isAdmin,
  });
}

export function useEnrollmentTrends(range: AnalyticsRange) {
  const { isAdmin } = useAuth();
  return useQuery({
    queryKey: ["analytics", "enrollments", range],
    queryFn: () => analyticsApi.getEnrollmentTrends(range),
    enabled: isAdmin,
  });
}

export function useTopCourses() {
  const { isAdmin } = useAuth();
  return useQuery({
    queryKey: ["analytics", "top-courses"],
    queryFn: analyticsApi.getTopCourses,
    enabled: isAdmin,
  });
}

export function useTrafficSources() {
  const { isAdmin } = useAuth();
  return useQuery({
    queryKey: ["analytics", "traffic"],
    queryFn: analyticsApi.getTrafficSources,
    enabled: isAdmin,
  });
}
