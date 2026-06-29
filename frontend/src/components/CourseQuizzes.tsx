// Quiz panel for the course player: lists the course's quizzes, lets the
// student take one (auto-graded), shows the score, and supports retry.
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCourseQuizzes, useMyAttempts, useSubmitQuiz } from "@/hooks/useQuizzes";
import { getApiErrorMessage } from "@/lib/api/client";
import type { Quiz, QuizResult } from "@/lib/endpoints/quizzes.endpoints";
import { Award, CheckCircle2, ListChecks, XCircle } from "lucide-react";
import { toast } from "sonner";

export function CourseQuizzes({ courseId }: { courseId: string }) {
  const { data: quizzes = [], isLoading } = useCourseQuizzes(courseId);
  const { data: attempts = [] } = useMyAttempts(courseId);

  if (isLoading) {
    return <p className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">Loading quizzes…</p>;
  }
  if (quizzes.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-4">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <ListChecks className="h-4 w-4" /> Quizzes
        </p>
        <p className="mt-2 text-sm text-muted-foreground">No quizzes for this course yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quizzes.map((quiz) => {
        const best = attempts
          .filter((a) => a.quiz === quiz.id)
          .reduce<number | null>((m, a) => (m === null ? a.score : Math.max(m, a.score)), null);
        return <QuizCard key={quiz.id} quiz={quiz} courseId={courseId} bestScore={best} />;
      })}
    </div>
  );
}

function QuizCard({
  quiz,
  courseId,
  bestScore,
}: {
  quiz: Quiz;
  courseId: string;
  bestScore: number | null;
}) {
  const submit = useSubmitQuiz(courseId);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [taking, setTaking] = useState(false);

  const allAnswered = quiz.questions.every((_, i) => answers[i] !== undefined);

  const onSubmit = () => {
    const arr = quiz.questions.map((_, i) => answers[i] ?? -1);
    submit.mutate(
      { quizId: quiz.id, answers: arr },
      {
        onSuccess: (r) => {
          setResult(r);
          setTaking(false);
        },
        onError: (e) => toast.error(getApiErrorMessage(e)),
      },
    );
  };

  const reset = () => {
    setAnswers({});
    setResult(null);
    setTaking(true);
  };

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 font-semibold">
            <ListChecks className="h-4 w-4" /> {quiz.title}
          </p>
          {quiz.description && (
            <p className="mt-0.5 text-sm text-muted-foreground">{quiz.description}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            {quiz.questions.length} questions · pass at {quiz.passingScore}%
          </p>
        </div>
        {bestScore !== null && (
          <Badge variant="secondary">Best: {bestScore}%</Badge>
        )}
      </div>

      {result ? (
        <div className="mt-4 rounded-lg border p-4 text-center">
          {result.attempt.passed ? (
            <Award className="mx-auto h-8 w-8 text-success" />
          ) : (
            <XCircle className="mx-auto h-8 w-8 text-destructive" />
          )}
          <p className="mt-2 font-display text-2xl font-bold">{result.attempt.score}%</p>
          <p className="text-sm text-muted-foreground">
            {result.correct}/{result.total} correct ·{" "}
            {result.attempt.passed ? "Passed 🎉" : `Need ${result.passingScore}% to pass`}
          </p>
          <Button className="mt-3" variant="outline" size="sm" onClick={reset}>
            Retry
          </Button>
        </div>
      ) : taking ? (
        <div className="mt-4 space-y-4">
          {quiz.questions.map((q, qi) => (
            <div key={q.id ?? qi}>
              <p className="text-sm font-medium">
                {qi + 1}. {q.prompt}
              </p>
              <RadioGroup
                className="mt-2"
                value={answers[qi]?.toString() ?? ""}
                onValueChange={(v) => setAnswers((a) => ({ ...a, [qi]: Number(v) }))}
              >
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <RadioGroupItem value={oi.toString()} id={`${quiz.id}-${qi}-${oi}`} />
                    <Label htmlFor={`${quiz.id}-${qi}-${oi}`} className="text-sm font-normal">
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          <Button onClick={onSubmit} disabled={!allAnswered || submit.isPending}>
            <CheckCircle2 className="mr-1.5 h-4 w-4" /> Submit quiz
          </Button>
        </div>
      ) : (
        <Button className="mt-4" size="sm" onClick={() => setTaking(true)}>
          {bestScore !== null ? "Retake quiz" : "Start quiz"}
        </Button>
      )}
    </div>
  );
}
