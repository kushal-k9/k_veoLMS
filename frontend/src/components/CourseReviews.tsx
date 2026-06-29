// Course reviews: average rating, the list of reviews, and a write/edit form
// for enrolled learners.
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "@/components/RatingStars";
import { useReviews, useMyReview, useUpsertReview } from "@/hooks/useReviews";
import { useIsEnrolled } from "@/hooks/useEnrollments";
import { getApiErrorMessage } from "@/lib/api/client";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function CourseReviews({ courseId }: { courseId: string }) {
  const { data: reviews = [] } = useReviews(courseId);
  const { data: myReview } = useMyReview(courseId);
  const enrolled = useIsEnrolled(courseId);
  const upsert = useUpsertReview(courseId);

  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");

  useEffect(() => {
    if (myReview) {
      setRating(myReview.rating);
      setBody(myReview.body);
    }
  }, [myReview]);

  const submit = () => {
    upsert.mutate(
      { rating, body },
      {
        onSuccess: () => toast.success("Thanks for your review!"),
        onError: (e) => toast.error(getApiErrorMessage(e)),
      },
    );
  };

  return (
    <div>
      <h2 className="font-display text-xl font-bold">Student reviews</h2>

      {enrolled && (
        <div className="mt-4 rounded-xl border bg-card p-4">
          <p className="text-sm font-semibold">{myReview ? "Update your review" : "Write a review"}</p>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                <Star
                  className={cn(
                    "h-6 w-6",
                    n <= rating ? "fill-warning text-warning" : "text-muted-foreground/40",
                  )}
                />
              </button>
            ))}
          </div>
          <Textarea
            className="mt-3"
            placeholder="Share your experience with this course…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button className="mt-3" size="sm" onClick={submit} disabled={upsert.isPending}>
            {myReview ? "Update review" : "Submit review"}
          </Button>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{r.authorName || "Student"}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })}
                </span>
              </div>
              <div className="mt-1">
                <RatingStars rating={r.rating} count={0} />
              </div>
              {r.body && <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
