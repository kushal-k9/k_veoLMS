import {
  createFileRoute,
  Link,
  useNavigate,
  notFound,
} from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { LessonNotes } from "@/components/LessonNotes";
import { LessonQA } from "@/components/LessonQA";
import { CourseQuizzes } from "@/components/CourseQuizzes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCourse } from "@/hooks/useCourses";
import { useIsEnrolled } from "@/hooks/useEnrollments";
import {
  useProgress,
  useToggleLesson,
  useSetLastLesson,
  progressPercent,
  emptyProgress,
} from "@/hooks/useProgress";
import { getAllLessons, getLessonCount } from "@/lib/course";
import type { Course, Lesson } from "@/types/api";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Gauge,
  Keyboard,
  ListVideo,
  Loader2,
  Lock,
  Maximize,
  PlayCircle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/learn/$courseId/$lessonId")({
  component: () => (
    <RequireAuth role="student">
      <PlayerGate />
    </RequireAuth>
  ),
});

function PlayerGate() {
  const { courseId } = Route.useParams();
  const { data: course, isLoading } = useCourse(courseId);
  const enrolled = useIsEnrolled(courseId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!course) throw notFound();
  if (!enrolled) return <NotEnrolled course={course} />;
  return <PlayerPage course={course} />;
}

function NotEnrolled({ course }: { course: Course }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
        <Lock className="h-7 w-7" />
      </span>
      <h1 className="font-display text-xl font-bold">You're not enrolled yet</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Enroll in “{course.title}” to access its lessons.
      </p>
      <Button asChild>
        <Link to="/courses/$courseId" params={{ courseId: course.id }}>
          View course
        </Link>
      </Button>
    </div>
  );
}

function PlayerPage({ course }: { course: Course }) {
  const { lessonId } = Route.useParams();
  const navigate = useNavigate();
  const { data: progress } = useProgress(course.id);
  const toggleLesson = useToggleLesson(course.id);
  const setLastLesson = useSetLastLesson(course.id);
  const playerWrapRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(1);

  const prog = progress ?? emptyProgress;
  const allLessons = useMemo(() => getAllLessons(course), [course]);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const current = allLessons[currentIndex];

  const completed = useMemo(
    () => new Set(prog.completedLessonIds),
    [prog.completedLessonIds]
  );
  const isComplete = current ? completed.has(current.id) : false;
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  // Persist last-watched on lesson change (skip drip-locked lessons — the
  // server rejects them and there's nothing to resume).
  useEffect(() => {
    if (current && !current.locked) setLastLesson.mutate(current.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  const goTo = useCallback(
    (l: Lesson | null) => {
      if (!l) return;
      navigate({
        to: "/learn/$courseId/$lessonId",
        params: { courseId: course.id, lessonId: l.id },
      });
    },
    [course.id, navigate]
  );

  const markComplete = useCallback(
    (autoAdvance = true) => {
      if (current && !completed.has(current.id)) {
        toggleLesson.mutate({ lessonId: current.id, complete: true });
        toast.success("Lesson marked complete ✓");
      }
      if (autoAdvance && next) setTimeout(() => goTo(next), 400);
      else if (autoAdvance && !next) toast.success("🎉 Course complete! Great work.");
    },
    [completed, current, next, goTo, toggleLesson]
  );

  const toggleComplete = () => {
    if (current) toggleLesson.mutate({ lessonId: current.id, complete: !isComplete });
  };

  const enterFullscreen = () => {
    const el = playerWrapRef.current;
    if (el?.requestFullscreen) el.requestFullscreen();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (e.key === "n") goTo(next);
      else if (e.key === "p") goTo(prev);
      else if (e.key === "c") markComplete(false);
      else if (e.key === "f") enterFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, next, prev, markComplete]);

  if (!current) throw notFound();

  const pct = progressPercent(course, prog);

  const Sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="line-clamp-2 font-display text-sm font-bold">{course.title}</h2>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{pct}% complete</span>
          <span>{completed.size}/{getLessonCount(course)}</span>
        </div>
        <Progress value={pct} className="mt-1.5 h-1.5" />
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {course.sections.map((section, si) => (
            <div key={section.id} className="mb-2">
              <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {si + 1}. {section.title}
              </p>
              <ul>
                {section.lessons.map((l) => {
                  const done = completed.has(l.id);
                  const active = l.id === current.id;
                  return (
                    <li key={l.id}>
                      <Link
                        to="/learn/$courseId/$lessonId"
                        params={{ courseId: course.id, lessonId: l.id }}
                        className={`flex items-start gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors ${
                          active ? "bg-primary/10 text-primary" : "hover:bg-accent"
                        }`}
                      >
                        {l.locked ? (
                          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60" />
                        ) : done ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        ) : active ? (
                          <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                        )}
                        <span className="flex-1">
                          <span className={`line-clamp-2 ${active ? "font-semibold" : ""}`}>
                            {l.title}
                          </span>
                          <span className="text-xs text-muted-foreground">{l.duration}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background lg:h-screen lg:overflow-hidden">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-card px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard" aria-label="Back to dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          {/* Mobile curriculum drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <ListVideo className="mr-1.5 h-4 w-4" /> Lessons
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Course curriculum</SheetTitle>
              </SheetHeader>
              {Sidebar}
            </SheetContent>
          </Sheet>
        </div>
        <span className="line-clamp-1 text-sm font-medium text-muted-foreground">
          {course.title}
        </span>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/courses/$courseId" params={{ courseId: course.id }}>
            Course page
          </Link>
        </Button>
      </header>

      <div className="flex flex-1 lg:overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden w-80 shrink-0 border-r bg-card lg:block">{Sidebar}</aside>

        {/* Main */}
        <main className="flex-1 lg:overflow-y-auto">
          <div className="mx-auto max-w-4xl p-4 sm:p-6">
            <div ref={playerWrapRef} className="bg-black">
              {current.locked ? (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl bg-black text-center text-white/90">
                  <Lock className="h-9 w-9" />
                  <p className="text-sm font-semibold">This lesson isn't available yet</p>
                  {current.availableAt && (
                    <p className="text-xs text-white/60">
                      Unlocks on {new Date(current.availableAt).toLocaleString()}
                    </p>
                  )}
                </div>
              ) : (
                <YouTubePlayer
                  youtubeId={current.youtubeId}
                  title={current.title}
                  playbackRate={speed}
                />
              )}
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Lesson {currentIndex + 1} of {allLessons.length}</Badge>
                  {isComplete && (
                    <Badge className="bg-success text-success-foreground">
                      <Check className="mr-1 h-3 w-3" /> Completed
                    </Badge>
                  )}
                </div>
                <h1 className="mt-2 font-display text-xl font-bold">{current.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                {/* Playback speed */}
                <Select value={String(speed)} onValueChange={(v) => setSpeed(Number(v))}>
                  <SelectTrigger className="h-9 w-[110px]">
                    <Gauge className="mr-1 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((r) => (
                      <SelectItem key={r} value={String(r)}>
                        {r}×{r === 1 ? " (Normal)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={enterFullscreen}>
                  <Maximize className="mr-1.5 h-4 w-4" /> Fullscreen
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={() => goTo(prev)} disabled={!prev}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
              </Button>
              {isComplete ? (
                <Button variant="secondary" onClick={toggleComplete}>
                  Mark as incomplete
                </Button>
              ) : (
                <Button onClick={() => markComplete(true)} disabled={current.locked}>
                  <Check className="mr-1.5 h-4 w-4" /> Mark complete & continue
                </Button>
              )}
              <Button variant="outline" onClick={() => goTo(next)} disabled={!next}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            {/* Notes / Q&A / Quizzes */}
            <Tabs defaultValue="notes" className="mt-6">
              <TabsList>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="qa">Q&amp;A</TabsTrigger>
                <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              </TabsList>
              <TabsContent value="notes" className="mt-4">
                <LessonNotes courseId={course.id} lessonId={current.id} />
              </TabsContent>
              <TabsContent value="qa" className="mt-4">
                <LessonQA courseId={course.id} lessonId={current.id} />
              </TabsContent>
              <TabsContent value="quizzes" className="mt-4">
                <CourseQuizzes courseId={course.id} />
              </TabsContent>
            </Tabs>

            {/* Keyboard hints */}
            <div className="mt-6 rounded-xl border bg-muted/40 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Keyboard className="h-4 w-4" /> Keyboard shortcuts
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                <Shortcut k="N" label="Next lesson" />
                <Shortcut k="P" label="Previous lesson" />
                <Shortcut k="C" label="Toggle complete" />
                <Shortcut k="F" label="Fullscreen" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Shortcut({ k, label }: { k: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <kbd className="rounded border bg-card px-1.5 py-0.5 font-mono text-xs shadow-sm">{k}</kbd>
      {label}
    </span>
  );
}
