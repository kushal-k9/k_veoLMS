import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useAuth } from "./useAuth-DGq_YKFM.mjs";
import { a as cn, t as Button } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { D as Megaphone, M as LoaderCircle, Q as Clock, V as GraduationCap, mt as Award, nt as CircleCheck, s as Trophy, tt as CirclePlay, u as Sparkles, ut as BookOpen, z as Heart } from "../_libs/lucide-react.mjs";
import { d as getLessonCount, t as Badge, u as getAllLessons } from "./scroll-area-CdfiTdOf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useReducedMotion, t as useInView } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { _ as PublicLayout } from "./PublicLayout-8zPEFKiM.mjs";
import { d as useMyCertificates, t as RequireAuth, u as useMyAnnouncements } from "./useEngagement-D12ZvfL6.mjs";
import { o as useMyCourses, s as useMyEnrollments } from "./useEnrollments-SiKvstn1.mjs";
import { t as StatCard } from "./stat-card-DWCg5wM2.mjs";
import { i as useWishlist } from "./useWishlist-1qs9Prqi.mjs";
import { i as StaggerItem, r as Stagger, t as CourseCard } from "./Stagger-BRYZYVeL.mjs";
import { t as Reveal } from "./Reveal-F2_ii-l3.mjs";
import { n as progressPercent, r as useCoursesProgress } from "./useProgress-BJTeten_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Dg9yxc08.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnimatedProgress({ value, className, barClassName, showLabel = false }) {
	const reduced = useReducedMotion() ?? false;
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .6
	});
	const pct = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: cn("absolute inset-y-0 left-0 rounded-full bg-primary", barClassName),
				initial: { width: reduced ? `${pct}%` : 0 },
				animate: { width: inView ? `${pct}%` : reduced ? `${pct}%` : 0 },
				transition: reduced ? { duration: 0 } : {
					type: "spring",
					stiffness: 90,
					damping: 22
				}
			})
		}), showLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "w-10 shrink-0 text-right text-xs font-medium tabular-nums text-muted-foreground",
			children: [Math.round(pct), "%"]
		})]
	});
}
function DashboardPage() {
	const { user } = useAuth();
	const { isLoading: enrollmentsLoading } = useMyEnrollments();
	const myCourses = useMyCourses();
	const { data: wishlist } = useWishlist();
	const { data: certificates = [] } = useMyCertificates();
	const { data: announcements = [] } = useMyAnnouncements();
	const { map: progressMap } = useCoursesProgress(myCourses.map((c) => c.id));
	const getProgress = (courseId) => progressMap[courseId] ?? {
		completedLessonIds: [],
		lastLessonId: null,
		recentlyWatched: []
	};
	const continueCourse = (() => {
		let best = null;
		for (const c of myCourses) {
			const last = getProgress(c.id).recentlyWatched[0];
			if (last && (!best || last.at > best.at)) best = {
				course: c,
				at: last.at
			};
		}
		return best?.course ?? myCourses[0] ?? null;
	})();
	const resumeLessonId = (course) => getProgress(course.id).lastLessonId ?? course.sections[0]?.lessons[0]?.id;
	const recent = myCourses.flatMap((c) => getProgress(c.id).recentlyWatched.map((r) => ({
		...r,
		course: c
	}))).sort((a, b) => b.at.localeCompare(a.at)).slice(0, 5).map((r) => {
		const lesson = getAllLessons(r.course).find((l) => l.id === r.lessonId);
		return lesson ? {
			...r,
			lesson
		} : null;
	}).filter(Boolean);
	const lessonsDone = myCourses.reduce((a, c) => a + getProgress(c.id).completedLessonIds.length, 0);
	const completedCourses = myCourses.filter((c) => progressPercent(c, getProgress(c.id)) === 100).length;
	if (enrollmentsLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-2xl font-bold sm:text-3xl",
					children: [
						"Hi ",
						user.name.split(" ")[0],
						", let's keep learning"
					]
				})]
			}),
			announcements.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-2",
				children: announcements.slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: a.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: a.body
					})] })]
				}, a.id))
			}),
			myCourses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Enrolled courses",
							value: myCourses.length,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Lessons completed",
							value: lessonsDone,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Courses finished",
							value: completedCourses,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Saved (wishlist)",
							value: wishlist?.length ?? 0,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5" })
						})
					]
				}),
				continueCourse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 overflow-hidden rounded-2xl bg-gradient-hero p-6 text-brand-foreground sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: continueCourse.thumbnail,
							alt: continueCourse.title,
							className: "h-32 w-full rounded-xl object-cover sm:w-56"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-primary text-primary-foreground",
									children: "Continue learning"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 font-display text-xl font-bold",
									children: continueCourse.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 max-w-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1 flex justify-between text-xs text-brand-foreground/70",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progressPercent(continueCourse, getProgress(continueCourse.id)), "% complete"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											getProgress(continueCourse.id).completedLessonIds.length,
											"/",
											getLessonCount(continueCourse),
											" lessons"
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedProgress, {
										value: progressPercent(continueCourse, getProgress(continueCourse.id)),
										className: "[&>div]:bg-brand-foreground/20"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/learn/$courseId/$lessonId",
										params: {
											courseId: continueCourse.id,
											lessonId: resumeLessonId(continueCourse)
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "mr-2 h-4 w-4" }), " Resume"]
									})
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-8 lg:grid-cols-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: "My courses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
							className: "mt-4 grid gap-4 sm:grid-cols-2",
							children: myCourses.map((c) => {
								const pct = progressPercent(c, getProgress(c.id));
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StaggerItem, {
									className: "overflow-hidden rounded-xl border bg-card shadow-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: c.thumbnail,
										alt: c.title,
										className: "aspect-video w-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "line-clamp-2 font-semibold",
												children: c.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mb-1 flex justify-between text-xs text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [pct, "% complete"] }), pct === 100 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1 text-success",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3 w-3" }), " Done"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedProgress, { value: pct })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												size: "sm",
												className: "w-full",
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/learn/$courseId/$lessonId",
													params: {
														courseId: c.id,
														lessonId: resumeLessonId(c)
													},
													children: pct > 0 ? "Continue" : "Start course"
												})
											})
										]
									})]
								}, c.id);
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Recently watched"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-xl border bg-card shadow-card",
						children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "p-6 text-center text-sm text-muted-foreground",
							children: "Nothing here yet — start a lesson to see it appear."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y",
							children: recent.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/learn/$courseId/$lessonId",
								params: {
									courseId: r.course.id,
									lessonId: r.lessonId
								},
								className: "flex items-center gap-3 p-3 transition-colors hover:bg-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: r.lesson.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-1 truncate text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
											" ",
											r.lesson.duration,
											" · ",
											r.course.title
										]
									})]
								})]
							}) }, `${r.course.id}-${r.lessonId}`))
						})
					})] })]
				}),
				certificates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: "Certificates earned"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
						className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: certificates.map((cert) => {
							const course = typeof cert.course === "string" ? null : cert.course;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StaggerItem, {
								className: "rounded-xl border bg-gradient-hero p-5 text-brand-foreground shadow-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-8 w-8 text-warning" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display font-bold",
										children: course?.title ?? "Course"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-brand-foreground/70",
										children: ["Certificate ", cert.code]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `/certificate/${cert.code}`,
										target: "_blank",
										rel: "noreferrer",
										className: "mt-3 inline-block text-sm font-semibold underline",
										children: "View / print"
									})
								]
							}, cert.id);
						})
					})]
				}),
				wishlist && wishlist.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: "Your wishlist"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
						className: "mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: wishlist.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c }, c.id))
					})]
				})
			] })
		]
	}) });
}
function EmptyState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-display text-lg font-bold",
				children: "No courses yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-sm text-sm text-muted-foreground",
				children: "You haven't enrolled in any courses. Browse the catalog and start learning today."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/courses",
					children: "Browse courses"
				})
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
	role: "student",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {})
});
//#endregion
export { SplitComponent as component };
