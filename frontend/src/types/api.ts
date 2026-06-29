// Shared API types — mirror the backend response shapes.

// Existing data uses "admin" | "student"; the extra roles are additive (RBAC).
export type Role = "super-admin" | "admin" | "instructor" | "support" | "student";

export type UserStatus = "active" | "banned";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  provider?: "local" | "google";
  isEmailVerified?: boolean;
  status?: UserStatus;
  createdAt?: string;
}

export type LessonAssetType = "video" | "pdf";

export interface LessonAsset {
  id?: string;
  type: LessonAssetType;
  url: string;
  name?: string;
}

export interface Lesson {
  id: string;
  title: string;
  youtubeId: string;
  duration: string; // "mm:ss"
  preview: boolean;
  description?: string;
  pdfUrl?: string;
  assets?: LessonAsset[];
  /** Drip release: lesson becomes available at this ISO date. */
  availableAt?: string | null;
  /** Set by the server when content is hidden because the drip date is future. */
  locked?: boolean;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export type CourseStatus = "draft" | "published";

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  trailerYoutubeId: string;
  instructor: string;
  instructorAvatar: string;
  instructorTitle: string;
  description: string;
  price: number; // USD
  discountPrice?: number;
  rating: number;
  ratingCount: number;
  studentsCount: number;
  level: string;
  category: string;
  sections: Section[];
  status?: CourseStatus;
  publishAt?: string | null;
  createdAt?: string;
}

export interface Enrollment {
  id: string;
  user: string | { id: string; name: string; email: string };
  course: Course | string;
  amount: number;
  enrolledAt: string;
}

export interface RecentlyWatched {
  lessonId: string;
  courseId: string;
  at: string;
}

export interface Progress {
  completedLessonIds: string[];
  lastLessonId: string | null;
  recentlyWatched: RecentlyWatched[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminUser extends User {
  enrolledCount: number;
}

// Standard API envelope
export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}
