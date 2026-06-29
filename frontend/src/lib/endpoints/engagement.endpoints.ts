// Certificates, Q&A, announcements, and notifications API calls.
import { api } from "@/lib/api/client";
import type { Course } from "@/types/api";

// ---------- Certificates ----------
export interface Certificate {
  id: string;
  code: string;
  issuedAt: string;
  course: Pick<Course, "id" | "title" | "thumbnail" | "instructor"> | string;
}
export async function myCertificates() {
  const { data } = await api.get("/certificates/me");
  return data.data.certificates as Certificate[];
}

export interface VerifiedCertificate {
  id: string;
  code: string;
  issuedAt: string;
  course: { id: string; title: string; instructor: string } | string;
  user: { id: string; name: string } | string;
}
export async function verifyCertificate(code: string) {
  const { data } = await api.get(`/certificates/verify/${code}`);
  return data.data.certificate as VerifiedCertificate;
}

// ---------- Q&A ----------
export interface QAAnswer {
  id: string;
  authorName: string;
  body: string;
  isInstructor: boolean;
  createdAt: string;
}
export interface Question {
  id: string;
  course: string | { id: string; title: string };
  lessonId: string;
  authorName: string;
  body: string;
  answers: QAAnswer[];
  hidden: boolean;
  createdAt: string;
}
export async function listQuestions(courseId: string, lessonId?: string) {
  const { data } = await api.get(`/qa/course/${courseId}`, { params: { lessonId } });
  return data.data.questions as Question[];
}
export async function askQuestion(input: { courseId: string; lessonId?: string; body: string }) {
  const { data } = await api.post("/qa", input);
  return data.data.question as Question;
}
export async function answerQuestion(id: string, body: string) {
  const { data } = await api.post(`/qa/${id}/answers`, { body });
  return data.data.question as Question;
}
export async function listAllQuestions() {
  const { data } = await api.get("/qa/admin/all");
  return data.data.questions as Question[];
}
export async function setQuestionHidden(id: string, hidden: boolean) {
  const { data } = await api.patch(`/qa/${id}/hidden`, { hidden });
  return data.data.question as Question;
}
export async function deleteQuestion(id: string) {
  await api.delete(`/qa/${id}`);
  return id;
}

// ---------- Announcements ----------
export interface Announcement {
  id: string;
  scope: "platform" | "course";
  course: { id: string; title: string } | string | null;
  title: string;
  body: string;
  authorName: string;
  createdAt: string;
}
export async function myAnnouncements() {
  const { data } = await api.get("/announcements/me");
  return data.data.announcements as Announcement[];
}
export async function listAllAnnouncements() {
  const { data } = await api.get("/announcements");
  return data.data.announcements as Announcement[];
}
export async function createAnnouncement(input: {
  scope: "platform" | "course";
  course?: string;
  title: string;
  body: string;
}) {
  const { data } = await api.post("/announcements", input);
  return data.data.announcement as Announcement;
}
export async function deleteAnnouncement(id: string) {
  await api.delete(`/announcements/${id}`);
  return id;
}

// ---------- Notifications ----------
export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  link: string;
  read: boolean;
  createdAt: string;
}
export async function listNotifications() {
  const { data } = await api.get("/notifications");
  return data.data as { notifications: Notification[]; unread: number };
}
export async function markNotificationRead(id: string) {
  await api.patch(`/notifications/${id}/read`);
}
export async function markAllNotificationsRead() {
  await api.patch("/notifications/read-all");
}
