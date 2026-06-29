import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PublicLayout } from "@/components/PublicLayout";
import { CourseCard, CourseCardSkeleton } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { useCourses } from "@/hooks/useCourses";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  ArrowRight,
  BadgeCheck,
  Code2,
  Search,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VeoLMS — Learn Web Development, React & Node.js" },
      {
        name: "description",
        content:
          "Master coding with expert-led video courses on VeoLMS. Web development, React, and Node.js — learn at your own pace and track your progress.",
      },
      { property: "og:title", content: "VeoLMS — Learn Without Limits" },
      {
        property: "og:description",
        content: "Expert-led video courses in web development, React, and Node.js.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data, isLoading } = useCourses({ limit: 6 });
  const courses = data?.courses ?? [];
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const reduced = useReducedMotion() ?? false;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/courses", search: { q: query || undefined } });
  };

  const featured = courses.slice(0, 3);
  const totalStudents = courses.reduce((a, c) => a + c.studentsCount, 0);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-brand-foreground">
        <div className="absolute inset-0 animate-gradient-pan bg-gradient-hero opacity-80" />
        <div className="absolute -right-24 -top-24 h-96 w-96 animate-float rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 animate-aurora rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.div
            className="max-w-2xl"
            variants={staggerContainer(reduced, 0.1)}
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={fadeInUp(reduced)}
              className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/15 bg-brand-foreground/5 px-3 py-1 text-xs font-medium backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New cohort-quality courses, on demand
            </motion.span>
            <motion.h1
              variants={fadeInUp(reduced)}
              className="mt-5 font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl"
            >
              Learn to build <span className="text-primary">real</span> products.
            </motion.h1>
            <motion.p
              variants={fadeInUp(reduced)}
              className="mt-5 max-w-xl text-lg text-brand-foreground/75"
            >
              Hands-on video courses in web development, React, and Node.js. Learn
              from industry experts, track your progress, and ship with confidence.
            </motion.p>

            <motion.form
              variants={fadeInUp(reduced)}
              onSubmit={submitSearch}
              className="mt-8 flex max-w-lg gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for courses, e.g. React"
                  className="h-12 bg-card pl-9 text-foreground"
                />
              </div>
              <Button type="submit" size="lg" className="h-12">
                Search
              </Button>
            </motion.form>

            <motion.div
              variants={fadeInUp(reduced)}
              className="mt-10 flex flex-wrap gap-8 text-sm"
            >
              <Stat icon={<Video className="h-4 w-4" />} value={courses.length} label="Expert courses" />
              <Stat
                icon={<Users className="h-4 w-4" />}
                value={Math.max(1, Math.round(totalStudents / 1000))}
                suffix="k+"
                label="Learners"
              />
              <Stat icon={<BadgeCheck className="h-4 w-4" />} value={4.8} decimals={1} suffix="★" label="Avg. rating" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-b bg-card">
        <Stagger className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          <Feature icon={<Video />} title="Learn by watching" desc="Crisp video lessons grouped into clear sections." />
          <Feature icon={<Code2 />} title="Build as you go" desc="Practical, project-focused curriculum from real engineers." />
          <Feature icon={<BadgeCheck />} title="Track progress" desc="Resume anywhere, mark lessons complete, stay on pace." />
        </Stagger>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Featured courses</h2>
            <p className="mt-1 text-muted-foreground">Hand-picked to kickstart your journey.</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link to="/courses">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
        {isLoading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </Stagger>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-gradient-hero px-8 py-12 text-center text-brand-foreground sm:py-16">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Ready to start learning?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-brand-foreground/75">
              Create a free account and enroll in your first course in minutes.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link to="/signup">Get started — it's free</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </PublicLayout>
  );
}

function Stat({
  icon,
  value,
  label,
  suffix,
  decimals,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-foreground/10 text-primary">
        {icon}
      </span>
      <div>
        <div className="font-display text-lg font-bold leading-none">
          <AnimatedCounter value={value} suffix={suffix} decimals={decimals} />
        </div>
        <div className="text-xs text-brand-foreground/60">{label}</div>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <StaggerItem className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
        {icon}
      </span>
      <div>
        <h3 className="font-display font-bold">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
      </div>
    </StaggerItem>
  );
}
