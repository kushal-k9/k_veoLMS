import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { r as getApiErrorMessage, t as api } from "./client-BtKFGlsZ.mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./useAuth-DGq_YKFM.mjs";
import { a as cn, t as Button } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { H as Globe, M as LoaderCircle, Q as Clock, R as Infinity$1, d as ShoppingCart, j as Lock, l as Star, lt as ChartColumn, nt as CircleCheck, ot as ChevronDown, r as Users, tt as CirclePlay, z as Heart } from "../_libs/lucide-react.mjs";
import { d as getLessonCount, f as getTotalDuration, h as useCourse, l as formatPrice, t as Badge } from "./scroll-area-CdfiTdOf.mjs";
import { N as notFound, g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { _ as PublicLayout, a as Dialog, i as CheckoutModal, l as DialogHeader, n as AvatarFallback, o as DialogContent, r as AvatarImage, t as Avatar, u as DialogTitle, v as useCartStore } from "./PublicLayout-8zPEFKiM.mjs";
import { n as YouTubePlayer, t as Textarea } from "./YouTubePlayer-CQkVZovR.mjs";
import { a as useIsEnrolled } from "./useEnrollments-SiKvstn1.mjs";
import { t as Route } from "./courses._courseId-Kz2iNlf7.mjs";
import { n as useIsWishlisted, r as useToggleWishlist, t as RatingStars } from "./useWishlist-1qs9Prqi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses._courseId-D2929hbY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function listReviews(courseId) {
	const { data } = await api.get(`/reviews/course/${courseId}`);
	return data.data.reviews;
}
async function getMyReview(courseId) {
	const { data } = await api.get(`/reviews/course/${courseId}/me`);
	return data.data.review;
}
async function upsertReview(courseId, input) {
	const { data } = await api.put(`/reviews/course/${courseId}`, input);
	return data.data.review;
}
function useReviews(courseId) {
	return useQuery({
		queryKey: ["reviews", courseId],
		queryFn: () => listReviews(courseId),
		enabled: Boolean(courseId)
	});
}
function useMyReview(courseId) {
	const { isAuthenticated } = useAuth();
	return useQuery({
		queryKey: [
			"reviews",
			"me",
			courseId
		],
		queryFn: () => getMyReview(courseId),
		enabled: Boolean(courseId) && isAuthenticated
	});
}
function useUpsertReview(courseId) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => upsertReview(courseId, input),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["reviews", courseId] });
			qc.invalidateQueries({ queryKey: [
				"reviews",
				"me",
				courseId
			] });
			qc.invalidateQueries({ queryKey: ["courses"] });
		}
	});
}
function CourseReviews({ courseId }) {
	const { data: reviews = [] } = useReviews(courseId);
	const { data: myReview } = useMyReview(courseId);
	const enrolled = useIsEnrolled(courseId);
	const upsert = useUpsertReview(courseId);
	const [rating, setRating] = (0, import_react.useState)(5);
	const [body, setBody] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (myReview) {
			setRating(myReview.rating);
			setBody(myReview.body);
		}
	}, [myReview]);
	const submit = () => {
		upsert.mutate({
			rating,
			body
		}, {
			onSuccess: () => toast.success("Thanks for your review!"),
			onError: (e) => toast.error(getApiErrorMessage(e))
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-bold",
			children: "Student reviews"
		}),
		enrolled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-xl border bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: myReview ? "Update your review" : "Write a review"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex gap-1",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setRating(n),
						"aria-label": `${n} stars`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-6 w-6", n <= rating ? "fill-warning text-warning" : "text-muted-foreground/40") })
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-3",
					placeholder: "Share your experience with this course…",
					value: body,
					onChange: (e) => setBody(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					size: "sm",
					onClick: submit,
					disabled: upsert.isPending,
					children: myReview ? "Update review" : "Submit review"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-4",
			children: reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No reviews yet. Be the first to review!"
			}) : reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: r.authorName || "Student"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingStars, {
							rating: r.rating,
							count: 0
						})
					}),
					r.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: r.body
					})
				]
			}, r.id))
		})
	] });
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
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
	const [checkoutOpen, setCheckoutOpen] = (0, import_react.useState)(false);
	const [previewLesson, setPreviewLesson] = (0, import_react.useState)(null);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	}) });
	if (isError || !course) throw notFound();
	const firstLessonId = course.sections[0]?.lessons[0]?.id;
	const discounted = typeof course.discountPrice === "number" && course.discountPrice < course.price;
	const effectivePrice = discounted ? course.discountPrice : course.price;
	const handleBuy = () => {
		if (!user) {
			toast.info("Please log in to enroll");
			navigate({
				to: "/login",
				search: { redirect: `/courses/${course.id}` }
			});
			return;
		}
		setCheckoutOpen(true);
	};
	const handleWishlist = () => {
		if (!user) {
			toast.info("Sign in to save courses to your wishlist");
			return;
		}
		toggleWishlist.mutate({
			courseId: course.id,
			add: !wishlisted
		});
	};
	const lessonClick = (lesson) => {
		if (lesson.locked) toast.info(lesson.availableAt ? `Available on ${new Date(lesson.availableAt).toLocaleDateString()}` : "This lesson isn't available yet");
		else if (lesson.preview) setPreviewLesson(lesson);
		else if (enrolled) navigate({
			to: "/learn/$courseId/$lessonId",
			params: {
				courseId: course.id,
				lessonId: lesson.id
			}
		});
		else toast.info("Enroll to unlock this lesson");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-brand text-brand-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "bg-primary text-primary-foreground",
							children: course.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl",
							children: course.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-lg text-brand-foreground/75",
							children: course.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingStars, {
									rating: course.rating,
									count: course.ratingCount
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-brand-foreground/75",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
										" ",
										course.studentsCount.toLocaleString("en-IN"),
										" students"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-brand-foreground/75",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4" }),
										" ",
										course.level
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-10 w-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: course.instructorAvatar,
									alt: course.instructor
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: course.instructor[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: course.instructor
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-brand-foreground/60",
								children: course.instructorTitle
							})] })]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "lg:row-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden rounded-xl border bg-card text-card-foreground shadow-elevated lg:-mb-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-video",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouTubePlayer, {
									youtubeId: course.trailerYoutubeId,
									title: `${course.title} trailer`
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-3xl font-bold",
											children: formatPrice(effectivePrice)
										}), discounted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-lg text-muted-foreground line-through",
											children: formatPrice(course.price)
										})]
									}),
									enrolled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full",
										size: "lg",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/learn/$courseId/$lessonId",
											params: {
												courseId: course.id,
												lessonId: firstLessonId
											},
											children: "Go to course"
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full",
										size: "lg",
										onClick: handleBuy,
										children: "Enroll / Buy Now"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											className: "flex-1",
											onClick: () => addToCart(course),
											disabled: inCart,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "mr-1.5 h-4 w-4" }), inCart ? "In cart" : "Add to cart"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "icon",
											onClick: handleWishlist,
											"aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4", wishlisted && "fill-destructive text-destructive") })
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-center text-xs text-muted-foreground",
										children: "30-day money-back guarantee (demo)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "space-y-2 border-t pt-4 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4 text-muted-foreground" }),
													" ",
													getLessonCount(course),
													" on-demand lessons"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-muted-foreground" }),
													" ",
													getTotalDuration(course),
													" total length"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Infinity$1, { className: "h-4 w-4 text-muted-foreground" }), " Full lifetime access"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4 text-muted-foreground" }), " Access on all devices"]
											})
										]
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-10 lg:pr-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-bold",
								children: "About this course"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-brand-foreground/80",
								children: course.description
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-bold",
									children: "Course content"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-brand-foreground/60",
									children: [
										course.sections.length,
										" sections · ",
										getLessonCount(course),
										" lessons · ",
										getTotalDuration(course)
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 rounded-xl border bg-card text-card-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
									type: "multiple",
									defaultValue: [course.sections[0]?.id],
									children: course.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
										value: section.id,
										className: "px-4 last:border-b-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
											className: "hover:no-underline",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col items-start text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: section.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs font-normal text-muted-foreground",
													children: [section.lessons.length, " lessons"]
												})]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-1",
											children: section.lessons.map((lesson) => {
												const unlocked = (lesson.preview || enrolled) && !lesson.locked;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => lessonClick(lesson),
													className: "flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-accent",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-2.5",
														children: [
															unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4 shrink-0 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: unlocked ? "" : "text-muted-foreground",
																children: lesson.title
															}),
															lesson.preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
																variant: "secondary",
																className: "text-[10px]",
																children: "Preview"
															}),
															lesson.locked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
																variant: "secondary",
																className: "text-[10px]",
																children: lesson.availableAt ? `Unlocks ${new Date(lesson.availableAt).toLocaleDateString()}` : "Coming soon"
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "shrink-0 text-xs text-muted-foreground",
														children: lesson.duration
													})]
												}) }, lesson.id);
											})
										}) })]
									}, section.id))
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseReviews, { courseId: course.id })
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden h-40 lg:block" }),
		!enrolled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky bottom-0 z-40 border-t bg-card p-3 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl font-bold",
					children: formatPrice(course.price)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleBuy,
					className: "flex-1",
					children: "Enroll / Buy Now"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutModal, {
			course,
			open: checkoutOpen,
			onOpenChange: setCheckoutOpen,
			onSuccess: () => {}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!previewLesson,
			onOpenChange: (v) => !v && setPreviewLesson(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: "Free preview"
						}), previewLesson?.title]
					}) }),
					previewLesson && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouTubePlayer, {
						youtubeId: previewLesson.youtubeId,
						title: previewLesson.title
					}),
					!enrolled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg bg-muted/50 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" }), " Enjoying it? Unlock all lessons."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => {
								setPreviewLesson(null);
								handleBuy();
							},
							children: "Enroll now"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { CourseDetailPage as component };
