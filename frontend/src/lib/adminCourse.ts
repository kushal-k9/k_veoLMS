// Shared helpers + types for the admin course editor.
import { extractYouTubeId } from "@/components/YouTubePlayer";
import type { Course } from "@/types/api";
import type { CourseInput } from "@/lib/endpoints/courses.endpoints";

export type DraftCourse = Omit<Course, "id" | "createdAt"> & { id?: string };

/** Extract a clean YouTube id, keeping raw input while the admin is still typing. */
export function parseYouTubeId(input: string): string {
  return extractYouTubeId(input) || input.trim();
}

export const uid = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

export function emptyCourse(): DraftCourse {
  return {
    title: "",
    subtitle: "",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    trailerYoutubeId: "qz0aGYrrlhU",
    instructor: "",
    instructorAvatar: "https://i.pravatar.cc/150?img=8",
    instructorTitle: "Instructor",
    description: "",
    price: 49,
    discountPrice: undefined,
    rating: 4.5,
    ratingCount: 0,
    studentsCount: 0,
    level: "Beginner",
    category: "Web Development",
    status: "published",
    publishAt: null,
    sections: [],
  };
}

// Fields the API's (strict) course schema accepts. Server-managed fields
// (id, createdAt, createdBy, updatedAt, rating…) are excluded.
const COURSE_PAYLOAD_FIELDS = [
  "title",
  "subtitle",
  "thumbnail",
  "trailerYoutubeId",
  "instructor",
  "instructorAvatar",
  "instructorTitle",
  "description",
  "price",
  "discountPrice",
  "level",
  "category",
  "status",
  "publishAt",
  "sections",
] as const;

/** Whitelist only editable fields so the strict API schema accepts them. */
export function toCoursePayload(draft: DraftCourse): CourseInput {
  const payload: Record<string, unknown> = {};
  for (const key of COURSE_PAYLOAD_FIELDS) {
    const value = draft[key as keyof DraftCourse];
    if (value !== undefined) payload[key] = value;
  }
  return payload as CourseInput;
}
