// Q&A panel for the course player: ask a question on the current lesson and see
// threaded answers (instructor replies highlighted).
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useQuestions, useAskQuestion, useAnswerQuestion } from "@/hooks/useEngagement";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api/client";
import { formatDistanceToNow } from "date-fns";
import { CornerDownRight, MessageCircleQuestion, Send } from "lucide-react";
import { toast } from "sonner";

export function LessonQA({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { data: questions = [], isLoading } = useQuestions(courseId, lessonId);
  const ask = useAskQuestion();
  const { isStaff } = useAuth();
  const [body, setBody] = useState("");

  const submit = () => {
    if (!body.trim()) return;
    ask.mutate(
      { courseId, lessonId, body: body.trim() },
      {
        onSuccess: () => {
          setBody("");
          toast.success("Question posted");
        },
        onError: (e) => toast.error(getApiErrorMessage(e)),
      },
    );
  };

  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <MessageCircleQuestion className="h-4 w-4" /> Questions for this lesson
      </p>

      <div className="flex flex-col gap-2">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Ask the instructor a question…"
          className="min-h-20"
        />
        <Button size="sm" className="self-end" onClick={submit} disabled={ask.isPending}>
          <Send className="mr-1.5 h-4 w-4" /> Post question
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : questions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No questions yet — be the first to ask.</p>
        ) : (
          questions.map((q) => (
            <QuestionThread key={q.id} question={q} canAnswer={isStaff} />
          ))
        )}
      </div>
    </div>
  );
}

function QuestionThread({
  question,
  canAnswer,
}: {
  question: import("@/lib/endpoints/engagement.endpoints").Question;
  canAnswer: boolean;
}) {
  const answer = useAnswerQuestion();
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{question.authorName || "Student"}</span>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}
        </span>
      </div>
      <p className="mt-1 text-sm">{question.body}</p>

      {question.answers.length > 0 && (
        <ul className="mt-3 space-y-2 border-l-2 border-border pl-3">
          {question.answers.map((a) => (
            <li key={a.id}>
              <div className="flex items-center gap-2">
                <CornerDownRight className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm font-semibold">{a.authorName || "User"}</span>
                {a.isInstructor && (
                  <Badge className="bg-primary text-primary-foreground text-[10px]">Instructor</Badge>
                )}
              </div>
              <p className="ml-5 text-sm text-muted-foreground">{a.body}</p>
            </li>
          ))}
        </ul>
      )}

      {canAnswer && (
        <div className="mt-2">
          {open ? (
            <div className="flex flex-col gap-2">
              <Textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply…"
                className="min-h-16"
              />
              <div className="flex gap-2 self-end">
                <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  disabled={answer.isPending || !reply.trim()}
                  onClick={() =>
                    answer.mutate(
                      { id: question.id, body: reply.trim() },
                      {
                        onSuccess: () => {
                          setReply("");
                          setOpen(false);
                        },
                      },
                    )
                  }
                >
                  Reply
                </Button>
              </div>
            </div>
          ) : (
            <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
              Reply
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
