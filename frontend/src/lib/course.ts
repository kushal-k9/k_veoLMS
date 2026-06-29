// Course-related pure helpers + price formatting (USD).
import type { Course, Lesson } from "@/types/api";

export function getAllLessons(course: Course): Lesson[] {
  return course.sections.flatMap((s) => s.lessons);
}

export function getLessonCount(course: Course): number {
  return getAllLessons(course).length;
}

export function getTotalDuration(course: Course): string {
  const totalSeconds = getAllLessons(course).reduce((acc, l) => {
    const [m, s] = l.duration.split(":").map(Number);
    return acc + (m || 0) * 60 + (s || 0);
  }, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
