// Admin engagement tools: announcements, Q&A moderation, and a quiz builder.
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourses } from "@/hooks/useCourses";
import {
  useAllAnnouncements,
  useCreateAnnouncement,
  useDeleteAnnouncement,
  useAllQuestions,
  useModerateQuestion,
  useDeleteQuestion,
} from "@/hooks/useEngagement";
import { useCourseQuizzesAdmin, useSaveQuiz, useDeleteQuiz } from "@/hooks/useQuizzes";
import { getApiErrorMessage } from "@/lib/api/client";
import type { QuizInput } from "@/lib/endpoints/quizzes.endpoints";
import { Eye, EyeOff, Plus, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function EngagementTab() {
  return (
    <Tabs defaultValue="announcements">
      <TabsList>
        <TabsTrigger value="announcements">Announcements</TabsTrigger>
        <TabsTrigger value="qa">Q&amp;A moderation</TabsTrigger>
        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
      </TabsList>
      <TabsContent value="announcements" className="mt-6">
        <AnnouncementsAdmin />
      </TabsContent>
      <TabsContent value="qa" className="mt-6">
        <QAModeration />
      </TabsContent>
      <TabsContent value="quizzes" className="mt-6">
        <QuizBuilder />
      </TabsContent>
    </Tabs>
  );
}

function AnnouncementsAdmin() {
  const { data: courses } = useCourses({ limit: 100 });
  const { data: announcements = [] } = useAllAnnouncements();
  const create = useCreateAnnouncement();
  const remove = useDeleteAnnouncement();
  const [scope, setScope] = useState<"platform" | "course">("platform");
  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const publish = () => {
    if (!title.trim() || !body.trim()) return toast.error("Title and body are required");
    if (scope === "course" && !course) return toast.error("Choose a course");
    create.mutate(
      { scope, course: scope === "course" ? course : undefined, title, body },
      {
        onSuccess: () => {
          toast.success("Announcement published");
          setTitle("");
          setBody("");
        },
        onError: (e) => toast.error(getApiErrorMessage(e)),
      },
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3 rounded-xl border bg-card p-5">
        <h3 className="font-display font-bold">New announcement</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Scope</Label>
            <Select value={scope} onValueChange={(v) => setScope(v as "platform" | "course")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="platform">Platform-wide</SelectItem>
                <SelectItem value="course">Specific course</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {scope === "course" && (
            <div className="space-y-1.5">
              <Label>Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select…" />
                </SelectTrigger>
                <SelectContent>
                  {(courses?.courses ?? []).map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Message</Label>
          <Textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <Button onClick={publish} disabled={create.isPending}>
          <Send className="mr-1.5 h-4 w-4" /> Publish &amp; notify
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="font-display font-bold">Published</h3>
        {announcements.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing published yet.</p>
        ) : (
          announcements.map((a) => (
            <div key={a.id} className="flex items-start gap-3 rounded-lg border bg-card p-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{a.title}</p>
                  <Badge variant="secondary" className="text-[10px] capitalize">
                    {a.scope}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{a.body}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove.mutate(a.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function QAModeration() {
  const { data: questions = [], isLoading } = useAllQuestions();
  const moderate = useModerateQuestion();
  const remove = useDeleteQuestion();

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (questions.length === 0)
    return <p className="text-sm text-muted-foreground">No questions yet.</p>;

  return (
    <div className="space-y-2">
      {questions.map((q) => {
        const courseTitle = typeof q.course === "string" ? "" : q.course.title;
        return (
          <div key={q.id} className="flex items-start gap-3 rounded-lg border bg-card p-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{q.authorName || "Student"}</span>
                {courseTitle && (
                  <Badge variant="secondary" className="text-[10px]">
                    {courseTitle}
                  </Badge>
                )}
                {q.hidden && <Badge variant="destructive" className="text-[10px]">Hidden</Badge>}
              </div>
              <p className="text-sm">{q.body}</p>
              <p className="text-xs text-muted-foreground">{q.answers.length} answer(s)</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              title={q.hidden ? "Unhide" : "Hide"}
              onClick={() => moderate.mutate({ id: q.id, hidden: !q.hidden })}
            >
              {q.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => remove.mutate(q.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Whitelist only the fields the (strict) quiz API accepts. Editing spreads the
 * full server object, which carries server-managed keys (id/createdAt/updatedAt)
 * that the strict schema would reject — so we rebuild a clean payload here.
 */
function toQuizPayload(draft: QuizInput & { id?: string }, courseId: string): QuizInput {
  return {
    course: courseId,
    lessonId: draft.lessonId ?? "",
    title: draft.title,
    description: draft.description ?? "",
    passingScore: draft.passingScore,
    questions: draft.questions.map((q) => ({
      ...(q.id ? { id: q.id } : {}),
      prompt: q.prompt,
      options: q.options,
      correctIndex: q.correctIndex ?? 0,
    })),
  };
}

function QuizBuilder() {
  const { data: coursesData } = useCourses({ limit: 100 });
  const courses = coursesData?.courses ?? [];
  const [courseId, setCourseId] = useState("");
  const { data: quizzes = [] } = useCourseQuizzesAdmin(courseId || undefined);
  const saveQuiz = useSaveQuiz();
  const deleteQuiz = useDeleteQuiz();

  const blankQuiz = (): QuizInput => ({
    course: courseId,
    title: "New quiz",
    description: "",
    passingScore: 70,
    questions: [{ prompt: "", options: ["", ""], correctIndex: 0 }],
  });
  const [draft, setDraft] = useState<(QuizInput & { id?: string }) | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Label className="shrink-0">Course</Label>
        <Select value={courseId} onValueChange={setCourseId}>
          <SelectTrigger className="w-72">
            <SelectValue placeholder="Select a course…" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {courseId && (
          <Button size="sm" onClick={() => setDraft(blankQuiz())}>
            <Plus className="mr-1.5 h-4 w-4" /> New quiz
          </Button>
        )}
      </div>

      {courseId && (
        <div className="space-y-2">
          {quizzes.map((q) => (
            <div key={q.id} className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <div className="flex-1">
                <p className="text-sm font-semibold">{q.title}</p>
                <p className="text-xs text-muted-foreground">
                  {q.questions.length} questions · pass {q.passingScore}%
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={() => setDraft({ ...q })}>
                Edit
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteQuiz.mutate(q.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {draft && (
        <QuizForm
          draft={draft}
          saving={saveQuiz.isPending}
          onChange={setDraft}
          onCancel={() => setDraft(null)}
          onSave={() => {
            saveQuiz.mutate(
              { id: draft.id, input: toQuizPayload(draft, courseId) },
              {
                onSuccess: () => {
                  toast.success("Quiz saved");
                  setDraft(null);
                },
                onError: (e) => toast.error(getApiErrorMessage(e)),
              },
            );
          }}
        />
      )}
    </div>
  );
}

function QuizForm({
  draft,
  saving,
  onChange,
  onCancel,
  onSave,
}: {
  draft: QuizInput & { id?: string };
  saving: boolean;
  onChange: (d: QuizInput & { id?: string }) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const set = (patch: Partial<QuizInput>) => onChange({ ...draft, ...patch });
  const setQ = (i: number, patch: Partial<QuizInput["questions"][number]>) =>
    set({ questions: draft.questions.map((q, idx) => (idx === i ? { ...q, ...patch } : q)) });

  return (
    <div className="space-y-4 rounded-xl border bg-card p-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
        <div className="space-y-1.5">
          <Label>Quiz title</Label>
          <Input value={draft.title} onChange={(e) => set({ title: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Pass score (%)</Label>
          <Input
            type="number"
            value={draft.passingScore}
            onChange={(e) => set({ passingScore: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-4">
        {draft.questions.map((q, qi) => (
          <div key={qi} className="rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <Label>Question {qi + 1}</Label>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => set({ questions: draft.questions.filter((_, i) => i !== qi) })}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <Input
              className="mt-1"
              placeholder="Question prompt"
              value={q.prompt}
              onChange={(e) => setQ(qi, { prompt: e.target.value })}
            />
            <div className="mt-2 space-y-1.5">
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${qi}`}
                    checked={q.correctIndex === oi}
                    onChange={() => setQ(qi, { correctIndex: oi })}
                    className="h-4 w-4 accent-[var(--color-primary)]"
                    title="Mark as correct"
                  />
                  <Input
                    placeholder={`Option ${oi + 1}`}
                    value={opt}
                    onChange={(e) =>
                      setQ(qi, {
                        options: q.options.map((o, i) => (i === oi ? e.target.value : o)),
                      })
                    }
                  />
                  {q.options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setQ(qi, { options: q.options.filter((_, i) => i !== oi) })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQ(qi, { options: [...q.options, ""] })}
              >
                <Plus className="mr-1 h-4 w-4" /> Add option
              </Button>
            </div>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            set({
              questions: [
                ...draft.questions,
                { prompt: "", options: ["", ""], correctIndex: 0 },
              ],
            })
          }
        >
          <Plus className="mr-1 h-4 w-4" /> Add question
        </Button>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave} disabled={saving}>
          Save quiz
        </Button>
      </div>
    </div>
  );
}
