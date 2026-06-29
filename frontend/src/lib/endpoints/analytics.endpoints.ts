// Admin analytics API calls.
import { api } from "@/lib/api/client";

export type AnalyticsRange = "daily" | "weekly" | "monthly";

export interface AnalyticsOverview {
  totalRevenue: number;
  refundedAmount: number;
  totalSales: number;
  refunds: number;
  totalStudents: number;
  totalCourses: number;
  activeStudents: number;
  inactiveStudents: number;
}

export interface RevenuePoint {
  period: string;
  revenue: number;
  sales: number;
}
export interface EnrollmentPoint {
  period: string;
  enrollments: number;
}
export interface TopCourse {
  id: string;
  title: string;
  thumbnail: string;
  sales: number;
  revenue: number;
  completionRate: number;
}
export interface TrafficSource {
  source: string;
  count: number;
}

export async function getOverview() {
  const { data } = await api.get("/analytics/overview");
  return data.data as AnalyticsOverview;
}

export async function getRevenueSeries(range: AnalyticsRange) {
  const { data } = await api.get("/analytics/revenue", { params: { range } });
  return data.data.series as RevenuePoint[];
}

export async function getEnrollmentTrends(range: AnalyticsRange) {
  const { data } = await api.get("/analytics/enrollments", { params: { range } });
  return data.data.series as EnrollmentPoint[];
}

export async function getTopCourses() {
  const { data } = await api.get("/analytics/top-courses");
  return data.data.courses as TopCourse[];
}

export async function getTrafficSources() {
  const { data } = await api.get("/analytics/traffic");
  return data.data.sources as TrafficSource[];
}
