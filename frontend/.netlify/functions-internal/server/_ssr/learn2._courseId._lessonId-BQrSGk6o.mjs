import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { r as getApiErrorMessage, t as api } from "./client-BtKFGlsZ.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./useAuth-DGq_YKFM.mjs";
import { a as cn, t as Button } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { $ as Circle, C as NotebookPen, I as Keyboard, M as LoaderCircle, N as ListVideo, O as Maximize, P as ListChecks, T as MessageCircleQuestionMark, U as Gauge, X as CornerDownRight, _t as ArrowLeft, at as ChevronLeft, et as CircleX, h as Send, it as ChevronRight, j as Lock, mt as Award, nt as CircleCheck, st as Check, tt as CirclePlay } from "../_libs/lucide-react.mjs";
import { c as SheetTrigger, d as getLessonCount, h as useCourse, i as SheetContent, n as ScrollArea, o as SheetHeader, p as queryKeys, r as Sheet, s as SheetTitle, t as Badge, u as getAllLessons } from "./scroll-area-CdfiTdOf.mjs";
import { N as notFound, g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { a as useAskQuestion, f as useQuestions, i as useAnswerQuestion, t as RequireAuth } from "./useEngagement-D12ZvfL6.mjs";
import { t as Label } from "./label-Dd4BvekF.mjs";
import { n as YouTubePlayer, t as Textarea } from "./YouTubePlayer-CQkVZovR.mjs";
import { a as SelectValue, c as TabsList, h as useSubmitQuiz, i as SelectTrigger, l as TabsTrigger, n as SelectContent, o as Tabs, p as useMyAttempts, r as SelectItem, s as TabsContent, t as Select, u as useCourseQuizzes } from "./useQuizzes-pQLSRRXu.mjs";
import { t as useDebounce } from "./useDebounce-D6e2zkos.mjs";
import { a as useIsEnrolled } from "./useEnrollments-SiKvstn1.mjs";
import { a as useSetLastLesson, i as useProgress, n as progressPercent, o as useToggleLesson, t as EMPTY } from "./useProgress-BJTeten_.mjs";
import { t as Route } from "./learn._courseId._lessonId-DZMZU4Ts.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/radix-ui__react-radio-group.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn2._courseId._lessonId-BQrSGk6o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function listNotes(courseId) {
	const { data } = await api.get(`/notes/${courseId}`);
	return data.data.notes;
}
async function saveNote(courseId, lessonId, content) {
	const { data } = await api.put(`/notes/${courseId}/${lessonId}`, { content });
	return data.data.note;
}
function useNotes(courseId, enabled = true) {
	return useQuery({
		queryKey: queryKeys.notes(courseId ?? ""),
		queryFn: () => listNotes(courseId),
		enabled: Boolean(courseId) && enabled
	});
}
function useSaveNote(courseId) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ lessonId, content }) => saveNote(courseId, lessonId, content),
		onSuccess: (note, vars) => {
			qc.setQueryData(queryKeys.notes(courseId), (prev = []) => {
				const without = prev.filter((n) => n.lessonId !== vars.lessonId);
				return note ? [note, ...without] : without;
			});
		}
	});
}
function LessonNotes({ courseId, lessonId }) {
	const { data: notes } = useNotes(courseId);
	const saveNote = useSaveNote(courseId);
	const savedContent = (0, import_react.useMemo)(() => notes?.find((n) => n.lessonId === lessonId)?.content ?? "", [notes, lessonId]);
	const [value, setValue] = (0, import_react.useState)(savedContent);
	const debounced = useDebounce(value, 700);
	const lastSaved = (0, import_react.useRef)(savedContent);
	(0, import_react.useEffect)(() => {
		setValue(savedContent);
		lastSaved.current = savedContent;
	}, [lessonId, savedContent]);
	(0, import_react.useEffect)(() => {
		if (debounced === lastSaved.current) return;
		lastSaved.current = debounced;
		saveNote.mutate({
			lessonId,
			content: debounced
		});
	}, [debounced, lessonId]);
	const dirty = value !== lastSaved.current;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "h-4 w-4" }), " My notes"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex items-center gap-1 text-xs text-muted-foreground",
					children: saveNote.isPending || dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), " Saving…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-success" }), " Saved"] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value,
				onChange: (e) => setValue(e.target.value),
				placeholder: "Jot down key takeaways, timestamps, or questions for this lesson…",
				className: "min-h-32 resize-y"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "Notes are private to you and saved automatically."
			})
		]
	});
}
function LessonQA({ courseId, lessonId }) {
	const { data: questions = [], isLoading } = useQuestions(courseId, lessonId);
	const ask = useAskQuestion();
	const { isStaff } = useAuth();
	const [body, setBody] = (0, import_react.useState)("");
	const submit = () => {
		if (!body.trim()) return;
		ask.mutate({
			courseId,
			lessonId,
			body: body.trim()
		}, {
			onSuccess: () => {
				setBody("");
				toast.success("Question posted");
			},
			onError: (e) => toast.error(getApiErrorMessage(e))
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 flex items-center gap-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircleQuestionMark, { className: "h-4 w-4" }), " Questions for this lesson"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: body,
					onChange: (e) => setBody(e.target.value),
					placeholder: "Ask the instructor a question…",
					className: "min-h-20"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					className: "self-end",
					onClick: submit,
					disabled: ask.isPending,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1.5 h-4 w-4" }), " Post question"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-3",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Loading…"
				}) : questions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No questions yet — be the first to ask."
				}) : questions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionThread, {
					question: q,
					canAnswer: isStaff
				}, q.id))
			})
		]
	});
}
function QuestionThread({ question, canAnswer }) {
	const answer = useAnswerQuestion();
	const [reply, setReply] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold",
					children: question.authorName || "Student"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: question.body
			}),
			question.answers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2 border-l-2 border-border pl-3",
				children: question.answers.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownRight, { className: "h-3 w-3 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: a.authorName || "User"
						}),
						a.isInstructor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "bg-primary text-primary-foreground text-[10px]",
							children: "Instructor"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ml-5 text-sm text-muted-foreground",
					children: a.body
				})] }, a.id))
			}),
			canAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: reply,
						onChange: (e) => setReply(e.target.value),
						placeholder: "Write a reply…",
						className: "min-h-16"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 self-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							disabled: answer.isPending || !reply.trim(),
							onClick: () => answer.mutate({
								id: question.id,
								body: reply.trim()
							}, { onSuccess: () => {
								setReply("");
								setOpen(false);
							} }),
							children: "Reply"
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => setOpen(true),
					children: "Reply"
				})
			})
		]
	});
}
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
function CourseQuizzes({ courseId }) {
	const { data: quizzes = [], isLoading } = useCourseQuizzes(courseId);
	const { data: attempts = [] } = useMyAttempts(courseId);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-xl border bg-card p-4 text-sm text-muted-foreground",
		children: "Loading quizzes…"
	});
	if (quizzes.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2 text-sm font-semibold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "h-4 w-4" }), " Quizzes"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "No quizzes for this course yet."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: quizzes.map((quiz) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizCard, {
				quiz,
				courseId,
				bestScore: attempts.filter((a) => a.quiz === quiz.id).reduce((m, a) => m === null ? a.score : Math.max(m, a.score), null)
			}, quiz.id);
		})
	});
}
function QuizCard({ quiz, courseId, bestScore }) {
	const submit = useSubmitQuiz(courseId);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [result, setResult] = (0, import_react.useState)(null);
	const [taking, setTaking] = (0, import_react.useState)(false);
	const allAnswered = quiz.questions.every((_, i) => answers[i] !== void 0);
	const onSubmit = () => {
		const arr = quiz.questions.map((_, i) => answers[i] ?? -1);
		submit.mutate({
			quizId: quiz.id,
			answers: arr
		}, {
			onSuccess: (r) => {
				setResult(r);
				setTaking(false);
			},
			onError: (e) => toast.error(getApiErrorMessage(e))
		});
	};
	const reset = () => {
		setAnswers({});
		setResult(null);
		setTaking(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 font-semibold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "h-4 w-4" }),
						" ",
						quiz.title
					]
				}),
				quiz.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: quiz.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						quiz.questions.length,
						" questions · pass at ",
						quiz.passingScore,
						"%"
					]
				})
			] }), bestScore !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "secondary",
				children: [
					"Best: ",
					bestScore,
					"%"
				]
			})]
		}), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-lg border p-4 text-center",
			children: [
				result.attempt.passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "mx-auto h-8 w-8 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mx-auto h-8 w-8 text-destructive" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-display text-2xl font-bold",
					children: [result.attempt.score, "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						result.correct,
						"/",
						result.total,
						" correct ·",
						" ",
						result.attempt.passed ? "Passed 🎉" : `Need ${result.passingScore}% to pass`
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "outline",
					size: "sm",
					onClick: reset,
					children: "Retry"
				})
			]
		}) : taking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-4",
			children: [quiz.questions.map((q, qi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-medium",
				children: [
					qi + 1,
					". ",
					q.prompt
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
				className: "mt-2",
				value: answers[qi]?.toString() ?? "",
				onValueChange: (v) => setAnswers((a) => ({
					...a,
					[qi]: Number(v)
				})),
				children: q.options.map((opt, oi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
						value: oi.toString(),
						id: `${quiz.id}-${qi}-${oi}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: `${quiz.id}-${qi}-${oi}`,
						className: "text-sm font-normal",
						children: opt
					})]
				}, oi))
			})] }, q.id ?? qi)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: onSubmit,
				disabled: !allAnswered || submit.isPending,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-1.5 h-4 w-4" }), " Submit quiz"]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4",
			size: "sm",
			onClick: () => setTaking(true),
			children: bestScore !== null ? "Retake quiz" : "Start quiz"
		})]
	});
}
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
function PlayerGate() {
	const { courseId } = Route.useParams();
	const { data: course, isLoading } = useCourse(courseId);
	const enrolled = useIsEnrolled(courseId);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
	if (!course) throw notFound();
	if (!enrolled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotEnrolled, { course });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPage, { course });
}
function NotEnrolled({ course }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-bold",
				children: "You're not enrolled yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "max-w-sm text-sm text-muted-foreground",
				children: [
					"Enroll in “",
					course.title,
					"” to access its lessons."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/courses/$courseId",
					params: { courseId: course.id },
					children: "View course"
				})
			})
		]
	});
}
function PlayerPage({ course }) {
	const { lessonId } = Route.useParams();
	const navigate = useNavigate();
	const { data: progress } = useProgress(course.id);
	const toggleLesson = useToggleLesson(course.id);
	const setLastLesson = useSetLastLesson(course.id);
	const playerWrapRef = (0, import_react.useRef)(null);
	const [speed, setSpeed] = (0, import_react.useState)(1);
	const prog = progress ?? EMPTY;
	const allLessons = (0, import_react.useMemo)(() => getAllLessons(course), [course]);
	const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
	const current = allLessons[currentIndex];
	const completed = (0, import_react.useMemo)(() => new Set(prog.completedLessonIds), [prog.completedLessonIds]);
	const isComplete = current ? completed.has(current.id) : false;
	const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
	const next = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
	(0, import_react.useEffect)(() => {
		if (current && !current.locked) setLastLesson.mutate(current.id);
	}, [current?.id]);
	const goTo = (0, import_react.useCallback)((l) => {
		if (!l) return;
		navigate({
			to: "/learn/$courseId/$lessonId",
			params: {
				courseId: course.id,
				lessonId: l.id
			}
		});
	}, [course.id, navigate]);
	const markComplete = (0, import_react.useCallback)((autoAdvance = true) => {
		if (current && !completed.has(current.id)) {
			toggleLesson.mutate({
				lessonId: current.id,
				complete: true
			});
			toast.success("Lesson marked complete ✓");
		}
		if (autoAdvance && next) setTimeout(() => goTo(next), 400);
		else if (autoAdvance && !next) toast.success("🎉 Course complete! Great work.");
	}, [
		completed,
		current,
		next,
		goTo,
		toggleLesson
	]);
	const toggleComplete = () => {
		if (current) toggleLesson.mutate({
			lessonId: current.id,
			complete: !isComplete
		});
	};
	const enterFullscreen = () => {
		const el = playerWrapRef.current;
		if (el?.requestFullscreen) el.requestFullscreen();
	};
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const target = e.target;
			if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
			if (e.key === "n") goTo(next);
			else if (e.key === "p") goTo(prev);
			else if (e.key === "c") markComplete(false);
			else if (e.key === "f") enterFullscreen();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		goTo,
		next,
		prev,
		markComplete
	]);
	if (!current) throw notFound();
	const pct = progressPercent(course, prog);
	const Sidebar = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "line-clamp-2 font-display text-sm font-bold",
					children: course.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [pct, "% complete"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						completed.size,
						"/",
						getLessonCount(course)
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: pct,
					className: "mt-1.5 h-1.5"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2",
				children: course.sections.map((section, si) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "px-2 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: [
							si + 1,
							". ",
							section.title
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: section.lessons.map((l) => {
						const done = completed.has(l.id);
						const active = l.id === current.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/learn/$courseId/$lessonId",
							params: {
								courseId: course.id,
								lessonId: l.id
							},
							className: `flex items-start gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors ${active ? "bg-primary/10 text-primary" : "hover:bg-accent"}`,
							children: [l.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60" }) : done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-success" }) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `line-clamp-2 ${active ? "font-semibold" : ""}`,
									children: l.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: l.duration
								})]
							})]
						}) }, l.id);
					}) })]
				}, section.id))
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background lg:h-screen lg:overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-card px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							"aria-label": "Back to dashboard",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "lg:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListVideo, { className: "mr-1.5 h-4 w-4" }), " Lessons"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "left",
						className: "w-80 p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
							className: "sr-only",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Course curriculum" })
						}), Sidebar]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "line-clamp-1 text-sm font-medium text-muted-foreground",
					children: course.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/courses/$courseId",
						params: { courseId: course.id },
						children: "Course page"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 lg:overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden w-80 shrink-0 border-r bg-card lg:block",
				children: Sidebar
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 lg:overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl p-4 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: playerWrapRef,
							className: "bg-black",
							children: current.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl bg-black text-center text-white/90",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-9 w-9" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: "This lesson isn't available yet"
									}),
									current.availableAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-white/60",
										children: ["Unlocks on ", new Date(current.availableAt).toLocaleString()]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouTubePlayer, {
								youtubeId: current.youtubeId,
								title: current.title,
								playbackRate: speed
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									children: [
										"Lesson ",
										currentIndex + 1,
										" of ",
										allLessons.length
									]
								}), isComplete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									className: "bg-success text-success-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 h-3 w-3" }), " Completed"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-xl font-bold",
								children: current.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: String(speed),
									onValueChange: (v) => setSpeed(Number(v)),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
										className: "h-9 w-[110px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "mr-1 h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
										.5,
										.75,
										1,
										1.25,
										1.5,
										1.75,
										2
									].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: String(r),
										children: [
											r,
											"×",
											r === 1 ? " (Normal)" : ""
										]
									}, r)) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: enterFullscreen,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "mr-1.5 h-4 w-4" }), " Fullscreen"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: () => goTo(prev),
									disabled: !prev,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "mr-1 h-4 w-4" }), " Previous"]
								}),
								isComplete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: toggleComplete,
									children: "Mark as incomplete"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => markComplete(true),
									disabled: current.locked,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1.5 h-4 w-4" }), " Mark complete & continue"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: () => goTo(next),
									disabled: !next,
									children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-1 h-4 w-4" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
							defaultValue: "notes",
							className: "mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "notes",
										children: "Notes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "qa",
										children: "Q&A"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "quizzes",
										children: "Quizzes"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "notes",
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonNotes, {
										courseId: course.id,
										lessonId: current.id
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "qa",
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonQA, {
										courseId: course.id,
										lessonId: current.id
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "quizzes",
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseQuizzes, { courseId: course.id })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-xl border bg-muted/40 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-2 flex items-center gap-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "h-4 w-4" }), " Keyboard shortcuts"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shortcut, {
										k: "N",
										label: "Next lesson"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shortcut, {
										k: "P",
										label: "Previous lesson"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shortcut, {
										k: "C",
										label: "Toggle complete"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shortcut, {
										k: "F",
										label: "Fullscreen"
									})
								]
							})]
						})
					]
				})
			})]
		})]
	});
}
function Shortcut({ k, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
			className: "rounded border bg-card px-1.5 py-0.5 font-mono text-xs shadow-sm",
			children: k
		}), label]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
	role: "student",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerGate, {})
});
//#endregion
export { SplitComponent as component };
