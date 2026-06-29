import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { CourseCard, CourseCardSkeleton } from "@/components/CourseCard";
import { Stagger } from "@/components/motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/useCourses";
import { useDebounce } from "@/hooks/useDebounce";
import { useUiStore } from "@/stores/uiStore";
import { Search, SearchX } from "lucide-react";

interface CoursesSearch {
  q?: string;
}

export const Route = createFileRoute("/courses/")({
  validateSearch: (search: Record<string, unknown>): CoursesSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Courses — VeoLMS" },
      {
        name: "description",
        content:
          "Browse all VeoLMS courses. Filter by title and find your next web development, React, or Node.js course.",
      },
      { property: "og:title", content: "All Courses — VeoLMS" },
      { property: "og:description", content: "Browse and search all VeoLMS courses." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const debouncedQuery = useDebounce(query.trim(), 350);
  const activeCat = useUiStore((s) => s.category);
  const setActiveCat = useUiStore((s) => s.setCategory);

  // Push the debounced query into the URL so it stays shareable/back-button
  // friendly without firing a navigation on every keystroke.
  useEffect(() => {
    navigate({ search: { q: debouncedQuery || undefined }, replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  // Server-side search by the debounced `q`; category chips filter client-side.
  const { data, isLoading } = useCourses({
    q: debouncedQuery || undefined,
    limit: 100,
  });
  const courses = data?.courses ?? [];

  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

  const filtered =
    activeCat === "All"
      ? courses
      : courses.filter((c) => c.category === activeCat);

  const onChange = (v: string) => setQuery(v);

  return (
    <PublicLayout>
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold">Explore courses</h1>
          <p className="mt-1 text-muted-foreground">
            {courses.length} courses to help you grow your skills.
          </p>
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search by course title or instructor…"
              className="h-12 pl-9"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={activeCat === cat ? "default" : "outline"}
                onClick={() => setActiveCat(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              Showing {filtered.length} course{filtered.length !== 1 ? "s" : ""}
              {query ? ` for “${query}”` : ""}
            </p>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {filtered.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </Stagger>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <SearchX className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-display text-lg font-semibold">No courses found</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              We couldn't find any courses matching your search. Try a different keyword.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setActiveCat("All");
                onChange("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
