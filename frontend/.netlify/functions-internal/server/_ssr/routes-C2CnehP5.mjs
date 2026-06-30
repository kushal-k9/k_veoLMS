import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { Z as CodeXml, g as Search, gt as ArrowRight, n as Video, pt as BadgeCheck, r as Users, u as Sparkles } from "../_libs/lucide-react.mjs";
import { g as useCourses } from "./scroll-area-CdfiTdOf.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useReducedMotion } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { _ as PublicLayout, g as Input } from "./PublicLayout-8zPEFKiM.mjs";
import { a as staggerContainer, t as fadeInUp } from "./motion-D-zm4uIr.mjs";
import { t as AnimatedCounter } from "./AnimatedCounter-Bcls8WtL.mjs";
import { i as StaggerItem, n as CourseCardSkeleton, r as Stagger, t as CourseCard } from "./Stagger-BRYZYVeL.mjs";
import { t as Reveal } from "./Reveal-F2_ii-l3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C2CnehP5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const { data, isLoading } = useCourses({ limit: 6 });
	const courses = data?.courses ?? [];
	const [query, setQuery] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const reduced = useReducedMotion() ?? false;
	const submitSearch = (e) => {
		e.preventDefault();
		navigate({
			to: "/courses",
			search: { q: query || void 0 }
		});
	};
	const featured = courses.slice(0, 3);
	const totalStudents = courses.reduce((a, c) => a + c.studentsCount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-gradient-hero text-brand-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 animate-gradient-pan bg-gradient-hero opacity-80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-24 -top-24 h-96 w-96 animate-float rounded-full bg-primary/20 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-32 -left-24 h-96 w-96 animate-aurora rounded-full bg-primary/10 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "max-w-2xl",
						variants: staggerContainer(reduced, .1),
						initial: "hidden",
						animate: "show",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
								variants: fadeInUp(reduced),
								className: "inline-flex items-center gap-2 rounded-full border border-brand-foreground/15 bg-brand-foreground/5 px-3 py-1 text-xs font-medium backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }), "New cohort-quality courses, on demand"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
								variants: fadeInUp(reduced),
								className: "mt-5 font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl",
								children: [
									"Learn to build ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "real"
									}),
									" products."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								variants: fadeInUp(reduced),
								className: "mt-5 max-w-xl text-lg text-brand-foreground/75",
								children: "Hands-on video courses in web development, React, and Node.js. Learn from industry experts, track your progress, and ship with confidence."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
								variants: fadeInUp(reduced),
								onSubmit: submitSearch,
								className: "mt-8 flex max-w-lg gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: query,
										onChange: (e) => setQuery(e.target.value),
										placeholder: "Search for courses, e.g. React",
										className: "h-12 bg-card pl-9 text-foreground"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "lg",
									className: "h-12",
									children: "Search"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								variants: fadeInUp(reduced),
								className: "mt-10 flex flex-wrap gap-8 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-4 w-4" }),
										value: courses.length,
										label: "Expert courses"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
										value: Math.max(1, Math.round(totalStudents / 1e3)),
										suffix: "k+",
										label: "Learners"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4" }),
										value: 4.8,
										decimals: 1,
										suffix: "★",
										label: "Avg. rating"
									})
								]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stagger, {
				className: "mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {}),
						title: "Learn by watching",
						desc: "Crisp video lessons grouped into clear sections."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, {}),
						title: "Build as you go",
						desc: "Practical, project-focused curriculum from real engineers."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {}),
						title: "Track progress",
						desc: "Resume anywhere, mark lessons complete, stay on pace."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold sm:text-3xl",
					children: "Featured courses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted-foreground",
					children: "Hand-picked to kickstart your journey."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					asChild: true,
					className: "hidden sm:inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/courses",
						children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
					})
				})]
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCardSkeleton, {}, i))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
				className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: featured.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c }, c.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-2xl bg-gradient-hero px-8 py-12 text-center text-brand-foreground sm:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold sm:text-3xl",
						children: "Ready to start learning?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-md text-brand-foreground/75",
						children: "Create a free account and enroll in your first course in minutes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							children: "Get started — it's free"
						})
					})
				]
			}) })
		})
	] });
}
function Stat({ icon, value, label, suffix, decimals }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-9 w-9 items-center justify-center rounded-lg bg-brand-foreground/10 text-primary",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-lg font-bold leading-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
				value,
				suffix,
				decimals
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-brand-foreground/60",
			children: label
		})] })]
	});
}
function Feature({ icon, title, desc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StaggerItem, {
		className: "flex gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-sm text-muted-foreground",
			children: desc
		})] })]
	});
}
//#endregion
export { HomePage as component };
