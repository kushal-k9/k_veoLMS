import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { formatPrice, getLessonCount, getTotalDuration } from "@/lib/course";
import type { Course } from "@/types/api";
import { RatingStars } from "./RatingStars";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Heart, PlayCircle, ShoppingCart } from "lucide-react";
import { fadeInUp, springSoft } from "@/lib/motion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useIsWishlisted, useToggleWishlist } from "@/hooks/useWishlist";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export function CourseCard({ course }: { course: Course }) {
  const reduced = useReducedMotion() ?? false;
  const { isAuthenticated } = useAuth();
  const wishlisted = useIsWishlisted(course.id);
  const toggleWishlist = useToggleWishlist();
  const addToCart = useCartStore((s) => s.add);
  const inCart = useCartStore((s) => s.has(course.id));
  const discounted =
    typeof course.discountPrice === "number" &&
    course.discountPrice < course.price;

  const onWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.info("Sign in to save courses to your wishlist");
      return;
    }
    toggleWishlist.mutate({ courseId: course.id, add: !wishlisted });
  };

  const onAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(course);
  };

  return (
    <motion.div
      variants={fadeInUp(reduced)}
      whileHover={reduced ? undefined : { y: -6, transition: springSoft }}
      whileTap={reduced ? undefined : { scale: 0.99 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-card transition-shadow duration-300 hover:shadow-elevated"
    >
      <Link
        to="/courses/$courseId"
        params={{ courseId: course.id }}
        className="flex h-full flex-col"
      >
        <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <Badge className="absolute left-3 top-3 bg-card/90 text-foreground backdrop-blur">
          {course.category}
        </Badge>
        {discounted && (
          <Badge className="absolute left-3 bottom-3 bg-destructive text-destructive-foreground">
            Sale
          </Badge>
        )}
        {/* Quick actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={onWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full bg-card/90 shadow-sm backdrop-blur transition-colors hover:bg-card",
              wishlisted ? "text-destructive" : "text-foreground",
            )}
          >
            <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
          </button>
          <button
            type="button"
            onClick={onAddToCart}
            aria-label={inCart ? "In cart" : "Add to cart"}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full bg-card/90 opacity-0 shadow-sm backdrop-blur transition-all hover:bg-card group-hover:opacity-100",
              inCart ? "text-primary" : "text-foreground",
            )}
          >
            <ShoppingCart className={cn("h-4 w-4", inCart && "fill-current")} />
          </button>
        </div>
        {/* Play affordance that fades in on hover */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-elevated backdrop-blur">
            <PlayCircle size={26} />
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
            <AvatarFallback>{course.instructor[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{course.instructor}</span>
        </div>

        <h3 className="line-clamp-2 font-display text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {course.title}
        </h3>

        <RatingStars rating={course.rating} count={course.ratingCount} />

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <PlayCircle size={14} /> {getLessonCount(course)} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {getTotalDuration(course)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(discounted ? course.discountPrice! : course.price)}
            </span>
            {discounted && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(course.price)}
              </span>
            )}
          </div>
          <Badge variant="secondary" className="text-[11px]">
            {course.level}
          </Badge>
        </div>
        </div>
      </Link>
    </motion.div>
  );
}

/** Matching skeleton for catalog/grid loading states. */
export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-card">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-32" />
        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-14" />
        </div>
      </div>
    </div>
  );
}
