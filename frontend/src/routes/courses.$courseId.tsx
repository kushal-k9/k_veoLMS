import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { CourseReviews } from "@/components/CourseReviews";
import { RatingStars } from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCourse } from "@/hooks/useCourses";
import { useIsEnrolled } from "@/hooks/useEnrollments";
import { useAuth } from "@/hooks/useAuth";
import { useIsWishlisted, useToggleWishlist } from "@/hooks/useWishlist";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, getLessonCount, getTotalDuration } from "@/lib/course";
import type { Lesson } from "@/types/api";
import { Loader2 } from "lucide-react";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Globe,
  Heart,
  Infinity as InfinityIcon,
  Lock,
  PlayCircle,
  ShoppingCart,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/courses/$courseId")({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { courseId } = Route.useParams();
  const { data: course, isLoading, isError } = useCourse(courseId);
  const { user } = useAuth();
  const enrolled = useIsEnrolled(courseId);
  const navigate = useNavigate();
  const wishlisted = useIsWishlisted(courseId);
  const toggleWishlist = useToggleWishlist();
  const addToCart = useCartStore((s) => s.add);
  const inCart = useCartStore((s) => s.has(courseId));
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PublicLayout>
    );
  }
  if (isError || !course) throw notFound();

  const firstLessonId = course.sections[0]?.lessons[0]?.id;

  const discounted =
    typeof course.discountPrice === "number" && course.discountPrice < course.price;
  const effectivePrice = discounted ? course.discountPrice! : course.price;

  const handleBuy = () => {
    if (!user) {
      toast.info("Please log in to enroll");
      navigate({ to: "/login", search: { redirect: `/courses/${course.id}` } });
      return;
    }
    setCheckoutOpen(true);
  };

  const handleWishlist = () => {
    if (!user) {
      toast.info("Sign in to save courses to your wishlist");
      return;
    }
    toggleWishlist.mutate({ courseId: course.id, add: !wishlisted });
  };

  const lessonClick = (lesson: Lesson) => {
    if (lesson.locked) {
      toast.info(
        lesson.availableAt
          ? `Available on ${new Date(lesson.availableAt).toLocaleDateString()}`
          : "This lesson isn't available yet",
      );
    } else if (lesson.preview) {
      setPreviewLesson(lesson);
    } else if (enrolled) {
      navigate({
        to: "/learn/$courseId/$lessonId",
        params: { courseId: course.id, lessonId: lesson.id },
      });
    } else {
      toast.info("Enroll to unlock this lesson");
    }
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-brand text-brand-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div>
            <Badge className="bg-primary text-primary-foreground">{course.category}</Badge>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-brand-foreground/75">
              {course.subtitle}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <RatingStars rating={course.rating} count={course.ratingCount} />
              <span className="flex items-center gap-1.5 text-brand-foreground/75">
                <Users className="h-4 w-4" /> {course.studentsCount.toLocaleString("en-IN")} students
              </span>
              <span className="flex items-center gap-1.5 text-brand-foreground/75">
                <BarChart3 className="h-4 w-4" /> {course.level}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                <AvatarFallback>{course.instructor[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{course.instructor}</p>
                <p className="text-xs text-brand-foreground/60">{course.instructorTitle}</p>
              </div>
            </div>
          </div>

          {/* Purchase card (desktop) */}
          <aside className="lg:row-span-2">
            <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-elevated lg:-mb-40">
              <div className="aspect-video">
                <YouTubePlayer youtubeId={course.trailerYoutubeId} title={`${course.title} trailer`} />
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold">{formatPrice(effectivePrice)}</span>
                  {discounted && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(course.price)}
                    </span>
                  )}
                </div>
                {enrolled ? (
                  <Button className="w-full" size="lg" asChild>
                    <Link
                      to="/learn/$courseId/$lessonId"
                      params={{ courseId: course.id, lessonId: firstLessonId }}
                    >
                      Go to course
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button className="w-full" size="lg" onClick={handleBuy}>
                      Enroll / Buy Now
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => addToCart(course)}
                        disabled={inCart}
                      >
                        <ShoppingCart className="mr-1.5 h-4 w-4" />
                        {inCart ? "In cart" : "Add to cart"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleWishlist}
                        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            wishlisted && "fill-destructive text-destructive",
                          )}
                        />
                      </Button>
                    </div>
                  </>
                )}
                <p className="text-center text-xs text-muted-foreground">
                  30-day money-back guarantee (demo)
                </p>
                <ul className="space-y-2 border-t pt-4 text-sm">
                  <li className="flex items-center gap-2"><PlayCircle className="h-4 w-4 text-muted-foreground" /> {getLessonCount(course)} on-demand lessons</li>
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /> {getTotalDuration(course)} total length</li>
                  <li className="flex items-center gap-2"><InfinityIcon className="h-4 w-4 text-muted-foreground" /> Full lifetime access</li>
                  <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-muted-foreground" /> Access on all devices</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Description + curriculum */}
          <div className="space-y-10 lg:pr-4">
            <div>
              <h2 className="font-display text-xl font-bold">About this course</h2>
              <p className="mt-3 leading-relaxed text-brand-foreground/80">
                {course.description}
              </p>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-xl font-bold">Course content</h2>
                <span className="text-sm text-brand-foreground/60">
                  {course.sections.length} sections · {getLessonCount(course)} lessons · {getTotalDuration(course)}
                </span>
              </div>
              <div className="mt-4 rounded-xl border bg-card text-card-foreground">
                <Accordion type="multiple" defaultValue={[course.sections[0]?.id]}>
                  {course.sections.map((section) => (
                    <AccordionItem key={section.id} value={section.id} className="px-4 last:border-b-0">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-semibold">{section.title}</span>
                          <span className="text-xs font-normal text-muted-foreground">
                            {section.lessons.length} lessons
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1">
                          {section.lessons.map((lesson) => {
                            const unlocked = (lesson.preview || enrolled) && !lesson.locked;
                            return (
                              <li key={lesson.id}>
                                <button
                                  onClick={() => lessonClick(lesson)}
                                  className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-accent"
                                >
                                  <span className="flex items-center gap-2.5">
                                    {unlocked ? (
                                      <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                                    ) : (
                                      <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                                    )}
                                    <span className={unlocked ? "" : "text-muted-foreground"}>
                                      {lesson.title}
                                    </span>
                                    {lesson.preview && (
                                      <Badge variant="secondary" className="text-[10px]">
                                        Preview
                                      </Badge>
                                    )}
                                    {lesson.locked && (
                                      <Badge variant="secondary" className="text-[10px]">
                                        {lesson.availableAt
                                          ? `Unlocks ${new Date(lesson.availableAt).toLocaleDateString()}`
                                          : "Coming soon"}
                                      </Badge>
                                    )}
                                  </span>
                                  <span className="shrink-0 text-xs text-muted-foreground">
                                    {lesson.duration}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <CourseReviews courseId={course.id} />
          </div>
        </div>
      </section>

      {/* Spacer for the floating card on desktop */}
      <div className="hidden h-40 lg:block" />

      {/* Mobile sticky buy bar */}
      {!enrolled && (
        <div className="sticky bottom-0 z-40 border-t bg-card p-3 lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xl font-bold">{formatPrice(course.price)}</span>
            <Button onClick={handleBuy} className="flex-1">Enroll / Buy Now</Button>
          </div>
        </div>
      )}

      <CheckoutModal
        course={course}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        onSuccess={() => {}}
      />

      {/* Preview player dialog */}
      <Dialog open={!!previewLesson} onOpenChange={(v) => !v && setPreviewLesson(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Badge variant="secondary">Free preview</Badge>
              {previewLesson?.title}
            </DialogTitle>
          </DialogHeader>
          {previewLesson && (
            <YouTubePlayer youtubeId={previewLesson.youtubeId} title={previewLesson.title} />
          )}
          {!enrolled && (
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success" /> Enjoying it? Unlock all lessons.
              </span>
              <Button size="sm" onClick={() => { setPreviewLesson(null); handleBuy(); }}>
                Enroll now
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
}
