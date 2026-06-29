import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { RequireAuth } from "@/components/RequireAuth";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { AnimatedProgress, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { useAuth } from "@/hooks/useAuth";
import { useMyCourses, useMyEnrollments } from "@/hooks/useEnrollments";
import { useWishlist } from "@/hooks/useWishlist";
import { useMyCertificates, useMyAnnouncements } from "@/hooks/useEngagement";
import { useCoursesProgress, progressPercent } from "@/hooks/useProgress";
import { getAllLessons, getLessonCount } from "@/lib/course";
import type { Course } from "@/types/api";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Heart,
  Loader2,
  Megaphone,
  PlayCircle,
  Sparkles,
  Trophy,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — VeoLMS" }] }),
  component: () => (
    <RequireAuth role="student">
      <DashboardPage />
    </RequireAuth>
  ),
});

function DashboardPage() {
  const { user } = useAuth();
  const { isLoading: enrollmentsLoading } = useMyEnrollments();
  const myCourses = useMyCourses();
  const { data: wishlist } = useWishlist();
  const { data: certificates = [] } = useMyCertificates();
  const { data: announcements = [] } = useMyAnnouncements();
  const courseIds = myCourses.map((c) => c.id);
  const { map: progressMap } = useCoursesProgress(courseIds);

  const getProgress = (courseId: string) =>
    progressMap[courseId] ?? { completedLessonIds: [], lastLessonId: null, recentlyWatched: [] };

  // Continue learning: course with the most recent activity, else first enrolled.
  const continueCourse = (() => {
    let best: { course: Course; at: string } | null = null;
    for (const c of myCourses) {
      const last = getProgress(c.id).recentlyWatched[0];
      if (last && (!best || last.at > best.at)) best = { course: c, at: last.at };
    }
    return best?.course ?? myCourses[0] ?? null;
  })();

  const resumeLessonId = (course: Course) =>
    getProgress(course.id).lastLessonId ?? course.sections[0]?.lessons[0]?.id;

  // Recently watched across all courses.
  const recent = myCourses
    .flatMap((c) =>
      getProgress(c.id).recentlyWatched.map((r) => ({ ...r, course: c }))
    )
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 5)
    .map((r) => {
      const lesson = getAllLessons(r.course).find((l) => l.id === r.lessonId);
      return lesson ? { ...r, lesson } : null;
    })
    .filter(Boolean) as {
      course: Course;
      lessonId: string;
      at: string;
      lesson: ReturnType<typeof getAllLessons>[number];
    }[];

  // Aggregate stats across enrolled courses.
  const lessonsDone = myCourses.reduce(
    (a, c) => a + getProgress(c.id).completedLessonIds.length,
    0,
  );
  const completedCourses = myCourses.filter(
    (c) => progressPercent(c, getProgress(c.id)) === 100,
  ).length;

  if (enrollmentsLoading) {
    return (
      <PublicLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="font-display text-2xl font-bold sm:text-3xl">
            Hi {user!.name.split(" ")[0]}, let's keep learning
          </h1>
        </div>

        {/* Announcements */}
        {announcements.length > 0 && (
          <div className="mt-6 space-y-2">
            {announcements.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
              >
                <Megaphone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="text-sm text-muted-foreground">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {myCourses.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Enrolled courses" value={myCourses.length} icon={<BookOpen className="h-5 w-5" />} />
              <StatCard label="Lessons completed" value={lessonsDone} icon={<CheckCircle2 className="h-5 w-5" />} />
              <StatCard label="Courses finished" value={completedCourses} icon={<GraduationCap className="h-5 w-5" />} />
              <StatCard label="Saved (wishlist)" value={wishlist?.length ?? 0} icon={<Heart className="h-5 w-5" />} />
            </div>

            {/* Continue learning */}
            {continueCourse && (
              <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-hero p-6 text-brand-foreground sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <img
                    src={continueCourse.thumbnail}
                    alt={continueCourse.title}
                    className="h-32 w-full rounded-xl object-cover sm:w-56"
                  />
                  <div className="flex-1">
                    <Badge className="bg-primary text-primary-foreground">Continue learning</Badge>
                    <h2 className="mt-2 font-display text-xl font-bold">{continueCourse.title}</h2>
                    <div className="mt-3 max-w-md">
                      <div className="mb-1 flex justify-between text-xs text-brand-foreground/70">
                        <span>{progressPercent(continueCourse, getProgress(continueCourse.id))}% complete</span>
                        <span>
                          {getProgress(continueCourse.id).completedLessonIds.length}/
                          {getLessonCount(continueCourse)} lessons
                        </span>
                      </div>
                      <AnimatedProgress
                        value={progressPercent(continueCourse, getProgress(continueCourse.id))}
                        className="[&>div]:bg-brand-foreground/20"
                      />
                    </div>
                    <Button asChild className="mt-4">
                      <Link
                        to="/learn/$courseId/$lessonId"
                        params={{ courseId: continueCourse.id, lessonId: resumeLessonId(continueCourse) }}
                      >
                        <PlayCircle className="mr-2 h-4 w-4" /> Resume
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              {/* My courses */}
              <div className="lg:col-span-2">
                <h2 className="font-display text-lg font-bold">My courses</h2>
                <Stagger className="mt-4 grid gap-4 sm:grid-cols-2">
                  {myCourses.map((c) => {
                    const pct = progressPercent(c, getProgress(c.id));
                    return (
                      <StaggerItem
                        key={c.id}
                        className="overflow-hidden rounded-xl border bg-card shadow-card"
                      >
                        <img src={c.thumbnail} alt={c.title} className="aspect-video w-full object-cover" />
                        <div className="space-y-3 p-4">
                          <h3 className="line-clamp-2 font-semibold">{c.title}</h3>
                          <div>
                            <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                              <span>{pct}% complete</span>
                              {pct === 100 && (
                                <span className="flex items-center gap-1 text-success">
                                  <Trophy className="h-3 w-3" /> Done
                                </span>
                              )}
                            </div>
                            <AnimatedProgress value={pct} />
                          </div>
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link
                              to="/learn/$courseId/$lessonId"
                              params={{ courseId: c.id, lessonId: resumeLessonId(c) }}
                            >
                              {pct > 0 ? "Continue" : "Start course"}
                            </Link>
                          </Button>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>

              {/* Recently watched */}
              <div>
                <h2 className="font-display text-lg font-bold">Recently watched</h2>
                <div className="mt-4 rounded-xl border bg-card shadow-card">
                  {recent.length === 0 ? (
                    <p className="p-6 text-center text-sm text-muted-foreground">
                      Nothing here yet — start a lesson to see it appear.
                    </p>
                  ) : (
                    <ul className="divide-y">
                      {recent.map((r) => (
                        <li key={`${r.course.id}-${r.lessonId}`}>
                          <Link
                            to="/learn/$courseId/$lessonId"
                            params={{ courseId: r.course.id, lessonId: r.lessonId }}
                            className="flex items-center gap-3 p-3 transition-colors hover:bg-accent"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                              <PlayCircle className="h-4 w-4" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">{r.lesson.title}</p>
                              <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" /> {r.lesson.duration} · {r.course.title}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Certificates earned */}
            {certificates.length > 0 && (
              <Reveal className="mt-12">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-warning" />
                  <h2 className="font-display text-lg font-bold">Certificates earned</h2>
                </div>
                <Stagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {certificates.map((cert) => {
                    const course = typeof cert.course === "string" ? null : cert.course;
                    return (
                      <StaggerItem
                        key={cert.id}
                        className="rounded-xl border bg-gradient-hero p-5 text-brand-foreground shadow-card"
                      >
                        <Award className="h-8 w-8 text-warning" />
                        <p className="mt-3 font-display font-bold">{course?.title ?? "Course"}</p>
                        <p className="text-xs text-brand-foreground/70">
                          Certificate {cert.code}
                        </p>
                        <a
                          href={`/certificate/${cert.code}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-sm font-semibold underline"
                        >
                          View / print
                        </a>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </Reveal>
            )}

            {/* Wishlist */}
            {wishlist && wishlist.length > 0 && (
              <Reveal className="mt-12">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-destructive" />
                  <h2 className="font-display text-lg font-bold">Your wishlist</h2>
                </div>
                <Stagger className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {wishlist.map((c) => (
                    <CourseCard key={c.id} course={c} />
                  ))}
                </Stagger>
              </Reveal>
            )}
          </>
        )}
      </div>
    </PublicLayout>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
        <BookOpen className="h-7 w-7" />
      </span>
      <h2 className="mt-4 font-display text-lg font-bold">No courses yet</h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        You haven't enrolled in any courses. Browse the catalog and start learning today.
      </p>
      <Button asChild className="mt-5">
        <Link to="/courses">Browse courses</Link>
      </Button>
    </div>
  );
}
