import { Star } from "lucide-react";

export function RatingStars({
  rating,
  count,
  size = 14,
}: {
  rating: number;
  count?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-semibold text-warning-foreground/90 tabular-nums">
        {rating.toFixed(1)}
      </span>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.max(0, Math.min(1, rating - i));
          return (
            <span key={i} className="relative" style={{ width: size, height: size }}>
              <Star
                size={size}
                className="absolute inset-0 text-warning/40"
                fill="currentColor"
              />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star size={size} className="text-warning" fill="currentColor" />
              </span>
            </span>
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({count.toLocaleString("en-IN")})
        </span>
      )}
    </div>
  );
}
