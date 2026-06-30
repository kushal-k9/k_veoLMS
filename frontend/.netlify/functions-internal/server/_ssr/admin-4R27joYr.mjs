import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { r as getApiErrorMessage, t as api } from "./client-BtKFGlsZ.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./useAuth-DGq_YKFM.mjs";
import { a as cn, i as buttonVariants, t as Button } from "./engagement.endpoints-DZsa6Hgq.mjs";
import { B as GripVertical, G as Eye, J as Download, K as EyeOff, L as KeyRound, M as LoaderCircle, S as Pencil, W as FileText, Y as DollarSign, a as UserCog, c as Trash2, f as ShoppingBag, ft as Ban, g as Search, h as Send, o as Upload, q as Ellipsis, r as Users, st as Check, t as X, ut as BookOpen, v as RotateCcw, x as Plus, y as Receipt } from "../_libs/lucide-react.mjs";
import { a as closestCenter, h as CSS, i as PointerSensor, m as useSensors, p as useSensor, r as KeyboardSensor, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useCreateCourse, d as getLessonCount, g as useCourses, h as useCourse, l as formatPrice, m as useBulkCourseStatus, p as queryKeys, t as Badge, v as useDeleteCourse, y as useUpdateCourse } from "./scroll-area-CdfiTdOf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { _ as PublicLayout, a as Dialog, c as DialogFooter, d as DropdownMenu, f as DropdownMenuContent, g as Input, h as DropdownMenuTrigger, l as DialogHeader, m as DropdownMenuSeparator, n as AvatarFallback, o as DialogContent, p as DropdownMenuItem, r as AvatarImage, s as DialogDescription, t as Avatar, u as DialogTitle } from "./PublicLayout-8zPEFKiM.mjs";
import { c as useDeleteQuestion, l as useModerateQuestion, n as useAllAnnouncements, o as useCreateAnnouncement, r as useAllQuestions, s as useDeleteAnnouncement, t as RequireAuth } from "./useEngagement-D12ZvfL6.mjs";
import { t as Label } from "./label-Dd4BvekF.mjs";
import { r as extractYouTubeId, t as Textarea } from "./YouTubePlayer-CQkVZovR.mjs";
import { a as SelectValue, c as TabsList, d as useCourseQuizzesAdmin, f as useDeleteQuiz, i as SelectTrigger, l as TabsTrigger, m as useSaveQuiz, n as SelectContent, o as Tabs, r as SelectItem, s as TabsContent, t as Select } from "./useQuizzes-pQLSRRXu.mjs";
import { t as useDebounce } from "./useDebounce-D6e2zkos.mjs";
import { a as resetUserPassword, o as setUserRole, r as listUsers, s as setUserStatus } from "./users.endpoints-Hq_02aTt.mjs";
import { i as useAllEnrollments, n as useAdminEnroll, r as useAdminUnenroll, t as enrollmentCourseId } from "./useEnrollments-SiKvstn1.mjs";
import { t as StatCard } from "./stat-card-DWCg5wM2.mjs";
import { t as Skeleton } from "./skeleton-BvHnY700.mjs";
import { a as verticalListSortingStrategy, i as useSortable, n as arrayMove, r as sortableKeyboardCoordinates, t as SortableContext } from "../_libs/dnd-kit__sortable.mjs";
import { t as restrictToVerticalAxis } from "../_libs/dnd-kit__modifiers.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, l as Bar, n as BarChart, o as Area, r as LineChart, s as Line, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-4R27joYr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
async function uploadFile(file) {
	const form = new FormData();
	form.append("file", file);
	const { data } = await api.post("/uploads", form, { headers: { "Content-Type": "multipart/form-data" } });
	return data.data;
}
function useUpload() {
	return useMutation({ mutationFn: (file) => uploadFile(file) });
}
function FileUpload({ accept, label = "Upload", onUploaded, size = "sm", variant = "outline" }) {
	const inputRef = (0, import_react.useRef)(null);
	const upload = useUpload();
	const onChange = (e) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		upload.mutate(file, {
			onSuccess: (res) => {
				onUploaded(res);
				toast.success("File uploaded");
			},
			onError: (err) => toast.error(getApiErrorMessage(err, "Upload failed"))
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref: inputRef,
		type: "file",
		accept,
		onChange,
		className: "hidden"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		size,
		variant,
		onClick: () => inputRef.current?.click(),
		disabled: upload.isPending,
		children: [upload.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-1.5 h-4 w-4" }), label]
	})] });
}
/** Extract a clean YouTube id, keeping raw input while the admin is still typing. */
function parseYouTubeId(input) {
	return extractYouTubeId(input) || input.trim();
}
var uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
function emptyCourse() {
	return {
		title: "",
		subtitle: "",
		thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
		trailerYoutubeId: "qz0aGYrrlhU",
		instructor: "",
		instructorAvatar: "https://i.pravatar.cc/150?img=8",
		instructorTitle: "Instructor",
		description: "",
		price: 49,
		discountPrice: void 0,
		rating: 4.5,
		ratingCount: 0,
		studentsCount: 0,
		level: "Beginner",
		category: "Web Development",
		status: "published",
		publishAt: null,
		sections: []
	};
}
var COURSE_PAYLOAD_FIELDS = [
	"title",
	"subtitle",
	"thumbnail",
	"trailerYoutubeId",
	"instructor",
	"instructorAvatar",
	"instructorTitle",
	"description",
	"price",
	"discountPrice",
	"level",
	"category",
	"status",
	"publishAt",
	"sections"
];
/** Whitelist only editable fields so the strict API schema accepts them. */
function toCoursePayload(draft) {
	const payload = {};
	for (const key of COURSE_PAYLOAD_FIELDS) {
		const value = draft[key];
		if (value !== void 0) payload[key] = value;
	}
	return payload;
}
/**
* Format an ISO timestamp as a `datetime-local` value showing the user's LOCAL
* wall-clock time. Using `.toISOString()` directly would show UTC, which shifts
* the displayed time by the timezone offset (e.g. 3:15 PM rendering as 9:30 AM
* in UTC+5:45). We subtract the offset so the local time round-trips correctly.
*/
function toDatetimeLocal(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	const offsetMs = d.getTimezoneOffset() * 6e4;
	return new Date(d.getTime() - offsetMs).toISOString().slice(0, 16);
}
function CourseEditor({ initial, isNew, saving, onClose, onSave }) {
	const [draft, setDraft] = (0, import_react.useState)(initial);
	const set = (patch) => setDraft((d) => ({
		...d,
		...patch
	}));
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	const addSection = () => set({ sections: [...draft.sections, {
		id: uid("sec"),
		title: "New section",
		lessons: []
	}] });
	const updateSection = (id, patch) => set({ sections: draft.sections.map((s) => s.id === id ? {
		...s,
		...patch
	} : s) });
	const removeSection = (id) => set({ sections: draft.sections.filter((s) => s.id !== id) });
	const addLesson = (sectionId) => set({ sections: draft.sections.map((s) => s.id === sectionId ? {
		...s,
		lessons: [...s.lessons, {
			id: uid("les"),
			title: "New lesson",
			youtubeId: "",
			duration: "10:00",
			preview: false
		}]
	} : s) });
	const updateLesson = (sectionId, lessonId, patch) => set({ sections: draft.sections.map((s) => s.id === sectionId ? {
		...s,
		lessons: s.lessons.map((l) => l.id === lessonId ? {
			...l,
			...patch
		} : l)
	} : s) });
	const removeLesson = (sectionId, lessonId) => set({ sections: draft.sections.map((s) => s.id === sectionId ? {
		...s,
		lessons: s.lessons.filter((l) => l.id !== lessonId)
	} : s) });
	const onSectionDragEnd = (e) => {
		const { active, over } = e;
		if (!over || active.id === over.id) return;
		const oldIndex = draft.sections.findIndex((s) => s.id === active.id);
		const newIndex = draft.sections.findIndex((s) => s.id === over.id);
		if (oldIndex < 0 || newIndex < 0) return;
		set({ sections: arrayMove(draft.sections, oldIndex, newIndex) });
	};
	const onLessonDragEnd = (sectionId) => (e) => {
		const { active, over } = e;
		if (!over || active.id === over.id) return;
		set({ sections: draft.sections.map((s) => {
			if (s.id !== sectionId) return s;
			const oldIndex = s.lessons.findIndex((l) => l.id === active.id);
			const newIndex = s.lessons.findIndex((l) => l.id === over.id);
			if (oldIndex < 0 || newIndex < 0) return s;
			return {
				...s,
				lessons: arrayMove(s.lessons, oldIndex, newIndex)
			};
		}) });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[92vh] max-w-3xl overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: isNew ? "Create course" : "Edit course" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Course details, publishing, and a drag-to-reorder curriculum." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-4 rounded-xl border bg-muted/30 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: draft.status === "published",
									onCheckedChange: (v) => set({ status: v ? "published" : "draft" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: draft.status === "published" ? "Published" : "Draft"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Scheduled release (drip)",
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "datetime-local",
									value: toDatetimeLocal(draft.publishAt),
									onChange: (e) => set({ publishAt: e.target.value ? new Date(e.target.value).toISOString() : null })
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Title",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: draft.title,
										onChange: (e) => set({ title: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Subtitle",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: draft.subtitle,
										onChange: (e) => set({ subtitle: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Instructor",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: draft.instructor,
										onChange: (e) => set({ instructor: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Category",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: draft.category,
										onChange: (e) => set({ category: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Price ($)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: draft.price,
										onChange: (e) => set({ price: Number(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Discount price ($, optional)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: draft.discountPrice ?? "",
										onChange: (e) => set({ discountPrice: e.target.value ? Number(e.target.value) : void 0 })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Level",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: draft.level,
										onValueChange: (v) => set({ level: v }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
											"Beginner",
											"Intermediate",
											"Advanced"
										].map((lv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: lv,
											children: lv
										}, lv)) })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Thumbnail",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: draft.thumbnail,
											onChange: (e) => set({ thumbnail: e.target.value }),
											placeholder: "Image URL"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUpload, {
											accept: "image/*",
											label: "Upload",
											onUploaded: (r) => set({ thumbnail: r.url })
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Trailer YouTube URL/ID",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: draft.trailerYoutubeId,
										onChange: (e) => set({ trailerYoutubeId: parseYouTubeId(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Description",
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 3,
										value: draft.description,
										onChange: (e) => set({ description: e.target.value })
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display font-bold",
										children: "Curriculum"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Drag the handle to reorder."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										onClick: addSection,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add section"]
									})]
								}),
								draft.sections.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "py-6 text-center text-sm text-muted-foreground",
									children: "No sections yet. Add a section to start building the curriculum."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
									sensors,
									collisionDetection: closestCenter,
									modifiers: [restrictToVerticalAxis],
									onDragEnd: onSectionDragEnd,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
										items: draft.sections.map((s) => s.id),
										strategy: verticalListSortingStrategy,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-4",
											children: draft.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableRow, {
												id: section.id,
												children: (handle) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border bg-muted/30 p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [
															handle,
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																value: section.title,
																onChange: (e) => updateSection(section.id, { title: e.target.value }),
																className: "font-semibold"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "ghost",
																size: "icon",
																onClick: () => removeSection(section.id),
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
															sensors,
															collisionDetection: closestCenter,
															modifiers: [restrictToVerticalAxis],
															onDragEnd: onLessonDragEnd(section.id),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
																items: section.lessons.map((l) => l.id),
																strategy: verticalListSortingStrategy,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "space-y-2",
																	children: section.lessons.map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableRow, {
																		id: lesson.id,
																		children: (handle) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonRow, {
																			handle,
																			lesson,
																			onChange: (patch) => updateLesson(section.id, lesson.id, patch),
																			onRemove: () => removeLesson(section.id, lesson.id)
																		})
																	}, lesson.id))
																})
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															variant: "ghost",
															size: "sm",
															className: "mt-2",
															onClick: () => addLesson(section.id),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add lesson"]
														})]
													})]
												})
											}, section.id))
										})
									})
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onClose,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => onSave(draft),
					disabled: saving,
					children: isNew ? "Create course" : "Save changes"
				})] })
			]
		})
	});
}
/** A sortable wrapper that hands a drag-handle element to its render child. */
function SortableRow({ id, children }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? .6 : 1,
			zIndex: isDragging ? 10 : void 0
		},
		children: children(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing",
			"aria-label": "Drag to reorder",
			...attributes,
			...listeners,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-4 w-4" })
		}))
	});
}
function LessonRow({ handle, lesson, onChange, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border bg-card p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					handle,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Lesson title",
						value: lesson.title,
						onChange: (e) => onChange({ title: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onRemove,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid gap-2 sm:grid-cols-[1fr_90px_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "YouTube URL or ID",
						value: lesson.youtubeId,
						onChange: (e) => onChange({ youtubeId: parseYouTubeId(e.target.value) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "12:00",
						value: lesson.duration,
						onChange: (e) => onChange({ duration: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: lesson.preview,
							onChange: (e) => onChange({ preview: e.target.checked }),
							className: "h-4 w-4 accent-[var(--color-primary)]"
						}), "Preview"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1 text-xs text-muted-foreground",
					children: ["Drip date (optional)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "datetime-local",
						value: toDatetimeLocal(lesson.availableAt),
						onChange: (e) => onChange({ availableAt: e.target.value ? new Date(e.target.value).toISOString() : null })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2",
					children: [lesson.pdfUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: lesson.pdfUrl,
						target: "_blank",
						rel: "noreferrer",
						className: "flex items-center gap-1 text-xs text-primary underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }), " View PDF"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "No resource"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUpload, {
						accept: "application/pdf",
						label: lesson.pdfUrl ? "Replace PDF" : "Attach PDF",
						variant: "ghost",
						onUploaded: (r) => onChange({ pdfUrl: r.url })
					})]
				})]
			})
		]
	});
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-1.5 ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
/** Simple role-filtered list (used by stats + students table). */
function useUsers(role) {
	const { isAdmin } = useAuth();
	return useQuery({
		queryKey: queryKeys.users(role),
		queryFn: () => listUsers({ role }),
		enabled: isAdmin
	});
}
/** Full admin user list with search/role/status filters. */
function useUsersAdmin(params = {}) {
	const { isAdmin } = useAuth();
	return useQuery({
		queryKey: queryKeys.usersList(params),
		queryFn: () => listUsers(params),
		enabled: isAdmin
	});
}
function useInvalidateUsers() {
	const qc = useQueryClient();
	return () => qc.invalidateQueries({ queryKey: ["users"] });
}
function useSetUserRole() {
	return useMutation({
		mutationFn: ({ id, role }) => setUserRole(id, role),
		onSuccess: useInvalidateUsers()
	});
}
function useSetUserStatus() {
	return useMutation({
		mutationFn: ({ id, status }) => setUserStatus(id, status),
		onSuccess: useInvalidateUsers()
	});
}
function useResetUserPassword() {
	return useMutation({ mutationFn: (id) => resetUserPassword(id) });
}
var ROLES = [
	"super-admin",
	"admin",
	"instructor",
	"support",
	"student"
];
function UsersTab() {
	const [q, setQ] = (0, import_react.useState)("");
	const debouncedQ = useDebounce(q.trim(), 300);
	const [role, setRole] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const { isSuperAdmin } = useAuth();
	const { data: users = [], isLoading } = useUsersAdmin({
		q: debouncedQ || void 0,
		role: role === "all" ? void 0 : role,
		status: status === "all" ? void 0 : status
	});
	const setUserRole = useSetUserRole();
	const setUserStatus = useSetUserStatus();
	const resetPassword = useResetUserPassword();
	const [enrollFor, setEnrollFor] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 min-w-56",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search by name or email…",
							className: "pl-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: role,
						onValueChange: setRole,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Role" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All roles"
						}), ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: r,
							children: r
						}, r))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: status,
						onValueChange: setStatus,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-36",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "active",
								children: "Active"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "banned",
								children: "Banned"
							})
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Role" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Enrolled" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Actions"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 5,
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "Loading users…"
				}) }) : users.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 5,
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "No users match your filters."
				}) }) : users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-8 w-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: u.avatar,
								alt: u.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: u.name[0] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: u.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: u.email
						})] })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: isSuperAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: u.role,
						onValueChange: (value) => setUserRole.mutate({
							id: u.id,
							role: value
						}, {
							onSuccess: () => toast.success("Role updated"),
							onError: (e) => toast.error(getApiErrorMessage(e))
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 w-36 capitalize",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: r,
							className: "capitalize",
							children: r
						}, r)) })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "capitalize",
						children: u.role
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: u.status === "banned" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "destructive",
						children: "Banned"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "bg-success text-success-foreground",
						children: "Active"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: u.enrolledCount }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => setEnrollFor(u),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCog, { className: "mr-2 h-4 w-4" }), " Manage enrollments"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => resetPassword.mutate(u.id, {
										onSuccess: (temp) => toast.success(`Temp password: ${temp}`, { duration: 1e4 }),
										onError: (e) => toast.error(getApiErrorMessage(e))
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "mr-2 h-4 w-4" }), " Reset password"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								u.status === "banned" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => setUserStatus.mutate({
										id: u.id,
										status: "active"
									}, {
										onSuccess: () => toast.success("User unbanned"),
										onError: (e) => toast.error(getApiErrorMessage(e))
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-2 h-4 w-4" }), " Unban"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									className: "text-destructive",
									onClick: () => setUserStatus.mutate({
										id: u.id,
										status: "banned"
									}, {
										onSuccess: () => toast.success("User banned"),
										onError: (e) => toast.error(getApiErrorMessage(e))
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "mr-2 h-4 w-4" }), " Ban user"]
								})
							]
						})] })
					})
				] }, u.id)) })] })
			}),
			enrollFor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnrollmentManager, {
				user: enrollFor,
				onClose: () => setEnrollFor(null)
			})
		]
	});
}
/** Per-user dialog to enroll/unenroll across all courses. */
function EnrollmentManager({ user, onClose }) {
	const { data: coursesData } = useCourses({ limit: 100 });
	const courses = coursesData?.courses ?? [];
	const { data: enrollments = [] } = useAllEnrollments();
	const enroll = useAdminEnroll();
	const unenroll = useAdminUnenroll();
	const enrolledCourseIds = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		for (const e of enrollments) if ((typeof e.user === "string" ? e.user : e.user.id) === user.id) set.add(enrollmentCourseId(e));
		return set;
	}, [enrollments, user.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[85vh] max-w-lg overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Manage enrollments — ", user.name] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: courses.map((c) => {
					const isEnrolled = enrolledCourseIds.has(c.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 rounded-lg border p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.thumbnail,
								alt: "",
								className: "h-9 w-14 rounded object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 text-sm font-medium",
								children: c.title
							}),
							isEnrolled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								disabled: unenroll.isPending,
								onClick: () => unenroll.mutate({
									userId: user.id,
									courseId: c.id
								}, {
									onSuccess: () => toast.success("Unenrolled"),
									onError: (e) => toast.error(getApiErrorMessage(e))
								}),
								children: "Unenroll"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								disabled: enroll.isPending,
								onClick: () => enroll.mutate({
									userId: user.id,
									courseId: c.id
								}, {
									onSuccess: () => toast.success("Enrolled"),
									onError: (e) => toast.error(getApiErrorMessage(e))
								}),
								children: "Enroll"
							})
						]
					}, c.id);
				})
			})]
		})
	});
}
async function getOverview() {
	const { data } = await api.get("/analytics/overview");
	return data.data;
}
async function getRevenueSeries(range) {
	const { data } = await api.get("/analytics/revenue", { params: { range } });
	return data.data.series;
}
async function getEnrollmentTrends(range) {
	const { data } = await api.get("/analytics/enrollments", { params: { range } });
	return data.data.series;
}
async function getTopCourses() {
	const { data } = await api.get("/analytics/top-courses");
	return data.data.courses;
}
function useAnalyticsOverview() {
	const { isAdmin } = useAuth();
	return useQuery({
		queryKey: ["analytics", "overview"],
		queryFn: getOverview,
		enabled: isAdmin
	});
}
function useRevenueSeries(range) {
	const { isAdmin } = useAuth();
	return useQuery({
		queryKey: [
			"analytics",
			"revenue",
			range
		],
		queryFn: () => getRevenueSeries(range),
		enabled: isAdmin
	});
}
function useEnrollmentTrends(range) {
	const { isAdmin } = useAuth();
	return useQuery({
		queryKey: [
			"analytics",
			"enrollments",
			range
		],
		queryFn: () => getEnrollmentTrends(range),
		enabled: isAdmin
	});
}
function useTopCourses() {
	const { isAdmin } = useAuth();
	return useQuery({
		queryKey: ["analytics", "top-courses"],
		queryFn: getTopCourses,
		enabled: isAdmin
	});
}
function ChartCard({ title, children, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-5 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-4 font-display font-bold",
			children: title
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full" }) : children]
	});
}
function AnalyticsTab() {
	const [range, setRange] = (0, import_react.useState)("daily");
	const { data: overview, isLoading: ovLoading } = useAnalyticsOverview();
	const { data: revenue = [], isLoading: revLoading } = useRevenueSeries(range);
	const { data: enrollments = [], isLoading: enrLoading } = useEnrollmentTrends(range);
	const { data: topCourses = [], isLoading: topLoading } = useTopCourses();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Platform performance at a glance."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: range,
					onValueChange: (v) => setRange(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-36",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "daily",
							children: "Daily"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "weekly",
							children: "Weekly"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "monthly",
							children: "Monthly"
						})
					] })]
				})]
			}),
			ovLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 w-full rounded-xl" }, i))
			}) : overview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total revenue",
						value: overview.totalRevenue,
						prefix: "$",
						decimals: 2,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total sales",
						value: overview.totalSales,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Refunds",
						value: overview.refunds,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Active students",
						value: overview.activeStudents,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" })
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Revenue",
						loading: revLoading,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 256,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: revenue,
								margin: {
									left: -16,
									right: 8,
									top: 8
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "revFill",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--chart-1)",
											stopOpacity: .4
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--chart-1)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "period",
										tick: { fontSize: 11 },
										stroke: "var(--muted-foreground)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: { fontSize: 11 },
										stroke: "var(--muted-foreground)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										formatter: (v) => `$${v}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "revenue",
										stroke: "var(--chart-1)",
										strokeWidth: 2,
										fill: "url(#revFill)"
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Enrollment trend",
						loading: enrLoading,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 256,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: enrollments,
								margin: {
									left: -16,
									right: 8,
									top: 8
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "period",
										tick: { fontSize: 11 },
										stroke: "var(--muted-foreground)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: { fontSize: 11 },
										stroke: "var(--muted-foreground)",
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "enrollments",
										stroke: "var(--chart-2)",
										strokeWidth: 2,
										dot: false
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Top courses by sales",
						loading: topLoading,
						children: topCourses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyChart, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 256,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: topCourses,
								layout: "vertical",
								margin: {
									left: 8,
									right: 16
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										tick: { fontSize: 11 },
										stroke: "var(--muted-foreground)",
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "title",
										width: 120,
										tick: { fontSize: 11 },
										stroke: "var(--muted-foreground)",
										tickFormatter: (t) => t.length > 18 ? `${t.slice(0, 17)}…` : t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "sales",
										radius: [
											0,
											6,
											6,
											0
										],
										fill: "var(--chart-1)"
									})
								]
							})
						})
					})
				]
			}),
			topCourses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border bg-card p-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 font-display font-bold",
					children: "Completion rates"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: topCourses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-40 truncate text-sm font-medium",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 flex-1 overflow-hidden rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary",
									style: { width: `${c.completionRate}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-10 text-right text-xs tabular-nums text-muted-foreground",
								children: [c.completionRate, "%"]
							})
						]
					}, c.id))
				})]
			})
		]
	});
}
var tooltipStyle = {
	background: "var(--popover)",
	border: "1px solid var(--border)",
	borderRadius: 8,
	fontSize: 12,
	color: "var(--popover-foreground)"
};
function EmptyChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-64 items-center justify-center text-sm text-muted-foreground",
		children: "No data yet."
	});
}
function EngagementTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "announcements",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "announcements",
					children: "Announcements"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "qa",
					children: "Q&A moderation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "quizzes",
					children: "Quizzes"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "announcements",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementsAdmin, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "qa",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QAModeration, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "quizzes",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizBuilder, {})
			})
		]
	});
}
function AnnouncementsAdmin() {
	const { data: courses } = useCourses({ limit: 100 });
	const { data: announcements = [] } = useAllAnnouncements();
	const create = useCreateAnnouncement();
	const remove = useDeleteAnnouncement();
	const [scope, setScope] = (0, import_react.useState)("platform");
	const [course, setCourse] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const publish = () => {
		if (!title.trim() || !body.trim()) return toast.error("Title and body are required");
		if (scope === "course" && !course) return toast.error("Choose a course");
		create.mutate({
			scope,
			course: scope === "course" ? course : void 0,
			title,
			body
		}, {
			onSuccess: () => {
				toast.success("Announcement published");
				setTitle("");
				setBody("");
			},
			onError: (e) => toast.error(getApiErrorMessage(e))
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 rounded-xl border bg-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display font-bold",
					children: "New announcement"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Scope" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: scope,
							onValueChange: (v) => setScope(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "platform",
								children: "Platform-wide"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "course",
								children: "Specific course"
							})] })]
						})]
					}), scope === "course" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Course" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: course,
							onValueChange: setCourse,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (courses?.courses ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c.id,
								children: c.title
							}, c.id)) })]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: title,
						onChange: (e) => setTitle(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 4,
						value: body,
						onChange: (e) => setBody(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: publish,
					disabled: create.isPending,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1.5 h-4 w-4" }), " Publish & notify"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display font-bold",
				children: "Published"
			}), announcements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Nothing published yet."
			}) : announcements.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-lg border bg-card p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "text-[10px] capitalize",
							children: a.scope
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: a.body
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => remove.mutate(a.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
				})]
			}, a.id))]
		})]
	});
}
function QAModeration() {
	const { data: questions = [], isLoading } = useAllQuestions();
	const moderate = useModerateQuestion();
	const remove = useDeleteQuestion();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (questions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "No questions yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: questions.map((q) => {
			const courseTitle = typeof q.course === "string" ? "" : q.course.title;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-lg border bg-card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold",
										children: q.authorName || "Student"
									}),
									courseTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "text-[10px]",
										children: courseTitle
									}),
									q.hidden && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "destructive",
										className: "text-[10px]",
										children: "Hidden"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: q.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [q.answers.length, " answer(s)"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						title: q.hidden ? "Unhide" : "Hide",
						onClick: () => moderate.mutate({
							id: q.id,
							hidden: !q.hidden
						}),
						children: q.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => remove.mutate(q.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
					})
				]
			}, q.id);
		})
	});
}
/**
* Whitelist only the fields the (strict) quiz API accepts. Editing spreads the
* full server object, which carries server-managed keys (id/createdAt/updatedAt)
* that the strict schema would reject — so we rebuild a clean payload here.
*/
function toQuizPayload(draft, courseId) {
	return {
		course: courseId,
		lessonId: draft.lessonId ?? "",
		title: draft.title,
		description: draft.description ?? "",
		passingScore: draft.passingScore,
		questions: draft.questions.map((q) => ({
			...q.id ? { id: q.id } : {},
			prompt: q.prompt,
			options: q.options,
			correctIndex: q.correctIndex ?? 0
		}))
	};
}
function QuizBuilder() {
	const { data: coursesData } = useCourses({ limit: 100 });
	const courses = coursesData?.courses ?? [];
	const [courseId, setCourseId] = (0, import_react.useState)("");
	const { data: quizzes = [] } = useCourseQuizzesAdmin(courseId || void 0);
	const saveQuiz = useSaveQuiz();
	const deleteQuiz = useDeleteQuiz();
	const blankQuiz = () => ({
		course: courseId,
		title: "New quiz",
		description: "",
		passingScore: 70,
		questions: [{
			prompt: "",
			options: ["", ""],
			correctIndex: 0
		}]
	});
	const [draft, setDraft] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "shrink-0",
						children: "Course"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: courseId,
						onValueChange: setCourseId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select a course…" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: c.id,
							children: c.title
						}, c.id)) })]
					}),
					courseId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setDraft(blankQuiz()),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), " New quiz"]
					})
				]
			}),
			courseId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: quizzes.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-lg border bg-card p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: q.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									q.questions.length,
									" questions · pass ",
									q.passingScore,
									"%"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setDraft({ ...q }),
							children: "Edit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => deleteQuiz.mutate(q.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
						})
					]
				}, q.id))
			}),
			draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizForm, {
				draft,
				saving: saveQuiz.isPending,
				onChange: setDraft,
				onCancel: () => setDraft(null),
				onSave: () => {
					saveQuiz.mutate({
						id: draft.id,
						input: toQuizPayload(draft, courseId)
					}, {
						onSuccess: () => {
							toast.success("Quiz saved");
							setDraft(null);
						},
						onError: (e) => toast.error(getApiErrorMessage(e))
					});
				}
			})
		]
	});
}
function QuizForm({ draft, saving, onChange, onCancel, onSave }) {
	const set = (patch) => onChange({
		...draft,
		...patch
	});
	const setQ = (i, patch) => set({ questions: draft.questions.map((q, idx) => idx === i ? {
		...q,
		...patch
	} : q) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 rounded-xl border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-[1fr_140px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quiz title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.title,
						onChange: (e) => set({ title: e.target.value })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Pass score (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: draft.passingScore,
						onChange: (e) => set({ passingScore: Number(e.target.value) })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [draft.questions.map((q, qi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Question ", qi + 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => set({ questions: draft.questions.filter((_, i) => i !== qi) }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							placeholder: "Question prompt",
							value: q.prompt,
							onChange: (e) => setQ(qi, { prompt: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-1.5",
							children: [q.options.map((opt, oi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: `correct-${qi}`,
										checked: q.correctIndex === oi,
										onChange: () => setQ(qi, { correctIndex: oi }),
										className: "h-4 w-4 accent-[var(--color-primary)]",
										title: "Mark as correct"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: `Option ${oi + 1}`,
										value: opt,
										onChange: (e) => setQ(qi, { options: q.options.map((o, i) => i === oi ? e.target.value : o) })
									}),
									q.options.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => setQ(qi, { options: q.options.filter((_, i) => i !== oi) }),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})
								]
							}, oi)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setQ(qi, { options: [...q.options, ""] }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add option"]
							})]
						})
					]
				}, qi)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => set({ questions: [...draft.questions, {
						prompt: "",
						options: ["", ""],
						correctIndex: 0
					}] }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add question"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onCancel,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onSave,
					disabled: saving,
					children: "Save quiz"
				})]
			})
		]
	});
}
async function listCoupons() {
	const { data } = await api.get("/coupons");
	return data.data.coupons;
}
async function createCoupon(input) {
	const { data } = await api.post("/coupons", input);
	return data.data.coupon;
}
async function updateCoupon(id, input) {
	const { data } = await api.patch(`/coupons/${id}`, input);
	return data.data.coupon;
}
async function deleteCoupon(id) {
	await api.delete(`/coupons/${id}`);
	return id;
}
async function listTransactions() {
	const { data } = await api.get("/payments");
	return data.data.payments;
}
async function refundTransaction(id) {
	const { data } = await api.post(`/payments/${id}/refund`);
	return data.data.payment;
}
async function listAudit(params = {}) {
	const { data } = await api.get("/audit", { params });
	return data.data;
}
async function getSettings() {
	const { data } = await api.get("/settings");
	return data.data.settings;
}
async function updateSettings(updates) {
	const { data } = await api.patch("/settings", updates);
	return data.data.settings;
}
function useCoupons() {
	return useQuery({
		queryKey: ["coupons"],
		queryFn: listCoupons
	});
}
function useSaveCoupon() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, input }) => id ? updateCoupon(id, input) : createCoupon(input),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["coupons"] })
	});
}
function useDeleteCoupon() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteCoupon(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["coupons"] })
	});
}
function useTransactions() {
	return useQuery({
		queryKey: ["transactions"],
		queryFn: listTransactions
	});
}
function useRefund() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => refundTransaction(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["transactions"] });
			qc.invalidateQueries({ queryKey: ["enrollments", "all"] });
		}
	});
}
function useAuditLog(params = {}) {
	return useQuery({
		queryKey: ["audit", params],
		queryFn: () => listAudit(params)
	});
}
function useSettings() {
	return useQuery({
		queryKey: ["settings"],
		queryFn: getSettings
	});
}
function useUpdateSettings() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (updates) => updateSettings(updates),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] })
	});
}
function escapeCell(value) {
	const v = value ?? "";
	if (/[",\n]/.test(v)) return `"${v.replace(/"/g, "\"\"")}"`;
	return v;
}
function downloadCsv(filename, headers, rows) {
	const lines = [headers, ...rows].map((row) => row.map(escapeCell).join(","));
	const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function OpsTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "coupons",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "coupons",
					children: "Coupons"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "transactions",
					children: "Transactions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "audit",
					children: "Audit log"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "settings",
					children: "Settings"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "coupons",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponsAdmin, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "transactions",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionsAdmin, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "audit",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditAdmin, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "settings",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsAdmin, {})
			})
		]
	});
}
function CouponsAdmin() {
	const { data: coupons = [] } = useCoupons();
	const save = useSaveCoupon();
	const del = useDeleteCoupon();
	const [code, setCode] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("percent");
	const [value, setValue] = (0, import_react.useState)(10);
	const [usageLimit, setUsageLimit] = (0, import_react.useState)(0);
	const add = () => {
		if (!code.trim()) return toast.error("Code is required");
		save.mutate({ input: {
			code: code.toUpperCase(),
			type,
			value,
			usageLimit
		} }, {
			onSuccess: () => {
				toast.success("Coupon created");
				setCode("");
			},
			onError: (e) => toast.error(getApiErrorMessage(e))
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end gap-3 rounded-xl border bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: code,
						onChange: (e) => setCode(e.target.value.toUpperCase()),
						placeholder: "SAVE20",
						className: "w-32"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: type,
						onValueChange: (v) => setType(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-32",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "percent",
							children: "Percent %"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "flat",
							children: "Flat $"
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Value" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value,
						onChange: (e) => setValue(Number(e.target.value)),
						className: "w-24"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Usage limit (0=∞)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: usageLimit,
						onChange: (e) => setUsageLimit(Number(e.target.value)),
						className: "w-28"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: add,
					disabled: save.isPending,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), " Add coupon"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Code" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Discount" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Used" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [coupons.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono font-semibold",
					children: c.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: c.type === "percent" ? `${c.value}%` : formatPrice(c.value) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [c.usedCount, c.usageLimit > 0 ? ` / ${c.usageLimit}` : ""] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: c.active,
					onCheckedChange: (active) => save.mutate({
						id: c.id,
						input: { active }
					})
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => del.mutate(c.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
					})
				})
			] }, c.id)), coupons.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 5,
				className: "py-8 text-center text-sm text-muted-foreground",
				children: "No coupons yet."
			}) })] })] })
		})]
	});
}
function TransactionsAdmin() {
	const { data: txns = [] } = useTransactions();
	const refund = useRefund();
	const exportCsv = () => {
		downloadCsv("transactions.csv", [
			"Date",
			"User",
			"Course",
			"Amount",
			"Status"
		], txns.map((t) => [
			new Date(t.createdAt).toLocaleString(),
			typeof t.user === "string" ? t.user : t.user.email,
			typeof t.course === "string" ? t.course : t.course.title,
			String(t.amount),
			t.status
		]));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: exportCsv,
				disabled: txns.length === 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-4 w-4" }), " Export CSV"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Course" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [txns.map((t) => {
				const user = typeof t.user === "string" ? null : t.user;
				const course = typeof t.course === "string" ? null : t.course;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-xs text-muted-foreground",
						children: new Date(t.createdAt).toLocaleDateString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: user?.email ?? "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: course?.title ?? "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatPrice(t.amount) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: t.status === "refunded" ? "destructive" : "secondary",
						className: t.status === "succeeded" ? "bg-success text-success-foreground" : "",
						children: t.status
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: t.status === "succeeded" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							disabled: refund.isPending,
							onClick: () => refund.mutate(t.id, {
								onSuccess: () => toast.success("Refunded"),
								onError: (e) => toast.error(getApiErrorMessage(e))
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-1 h-4 w-4" }), " Refund"]
						})
					})
				] }, t.id);
			}), txns.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 6,
				className: "py-8 text-center text-sm text-muted-foreground",
				children: "No transactions yet."
			}) })] })] })
		})]
	});
}
function AuditAdmin() {
	const { data } = useAuditLog();
	const logs = data?.logs ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "When" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Actor" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Action" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Entity" })
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-xs text-muted-foreground",
				children: new Date(l.createdAt).toLocaleString()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.actor?.name ?? l.actorEmail ?? "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "secondary",
				className: "font-mono text-[11px]",
				children: l.action
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
				className: "text-xs text-muted-foreground",
				children: [l.entityType, l.entityId ? ` · ${l.entityId.slice(-6)}` : ""]
			})
		] }, l.id)), logs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			colSpan: 4,
			className: "py-8 text-center text-sm text-muted-foreground",
			children: "No audit entries yet."
		}) })] })] })
	});
}
function SettingsAdmin() {
	const { data: settings } = useSettings();
	const update = useUpdateSettings();
	const [form, setForm] = (0, import_react.useState)({});
	const value = (key) => form[key] !== void 0 ? form[key] : String(settings?.[key] ?? "");
	const set = (key, v) => setForm((f) => ({
		...f,
		[key]: v
	}));
	const save = () => {
		const payload = { ...form };
		if (payload.taxPercent !== void 0) payload.taxPercent = Number(payload.taxPercent);
		update.mutate(payload, {
			onSuccess: () => {
				toast.success("Settings saved");
				setForm({});
			},
			onError: (e) => toast.error(getApiErrorMessage(e))
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-lg space-y-4 rounded-xl border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Platform name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value("platformName"),
					onChange: (e) => set("platformName", e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Currency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: value("currency"),
						onChange: (e) => set("currency", e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tax (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: value("taxPercent"),
						onChange: (e) => set("taxPercent", e.target.value)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Stripe publishable key" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: value("stripePublishableKey"),
					onChange: (e) => set("stripePublishableKey", e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Stripe secret key (write-only)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "password",
					placeholder: settings?.stripeSecretKey === "********" ? "•••••••• (set)" : "Not set",
					value: form.stripeSecretKey ?? "",
					onChange: (e) => set("stripeSecretKey", e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				disabled: update.isPending,
				children: "Save settings"
			})
		]
	});
}
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function AdminPage() {
	const { data } = useCourses({ limit: 100 });
	const courses = data?.courses ?? [];
	const { data: enrollments = [] } = useAllEnrollments();
	const { data: students = [] } = useUsers("student");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold sm:text-3xl",
				children: "Admin Dashboard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Manage courses, students, and enrollments."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}),
						label: "Courses",
						value: courses.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						label: "Students",
						value: students.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {}),
						label: "Enrollments",
						value: enrollments.length
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "analytics",
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "analytics",
							children: "Analytics"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "courses",
							children: "Courses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "users",
							children: "Users"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "engagement",
							children: "Engagement"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "ops",
							children: "Ops"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "enrollments",
							children: "Enrollments"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "analytics",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsTab, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "courses",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoursesTab, { courses })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "users",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersTab, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "engagement",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngagementTab, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "ops",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpsTab, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "enrollments",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnrollmentsTab, {})
					})
				]
			})
		]
	}) });
}
function StatTile({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 rounded-xl border bg-card p-5 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-2xl font-bold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground",
			children: label
		})] })]
	});
}
function CoursesTab({ courses }) {
	const createCourse = useCreateCourse();
	const updateCourse = useUpdateCourse();
	const deleteCourse = useDeleteCourse();
	const bulkStatus = useBulkCourseStatus();
	const [editor, setEditor] = (0, import_react.useState)(null);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const openNew = () => setEditor("new");
	const openEdit = (c) => setEditor(c.id);
	const closeEditor = () => setEditor(null);
	const toggleSelect = (id) => setSelected((prev) => {
		const next = new Set(prev);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		return next;
	});
	const allSelected = courses.length > 0 && selected.size === courses.length;
	const toggleAll = () => setSelected(allSelected ? /* @__PURE__ */ new Set() : new Set(courses.map((c) => c.id)));
	const runBulk = (status) => {
		if (selected.size === 0) return;
		bulkStatus.mutate({
			ids: [...selected],
			status
		}, {
			onSuccess: (r) => {
				toast.success(`${r.modified} course(s) ${status === "published" ? "published" : "moved to draft"}`);
				setSelected(/* @__PURE__ */ new Set());
			},
			onError: (e) => toast.error(getApiErrorMessage(e))
		});
	};
	const save = (draft) => {
		if (!draft.title.trim()) {
			toast.error("Course title is required");
			return;
		}
		const payload = toCoursePayload(draft);
		const onError = (e) => toast.error(getApiErrorMessage(e));
		if (draft.id) updateCourse.mutate({
			id: draft.id,
			input: payload
		}, {
			onSuccess: () => {
				toast.success("Course updated");
				closeEditor();
			},
			onError
		});
		else createCourse.mutate(payload, {
			onSuccess: () => {
				toast.success("Course created");
				closeEditor();
			},
			onError
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: selected.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground",
						children: [selected.size, " selected"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => runBulk("published"),
						disabled: bulkStatus.isPending,
						children: "Publish"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => runBulk("draft"),
						disabled: bulkStatus.isPending,
						children: "Unpublish"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: openNew,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), " New course"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "w-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: allSelected,
						onCheckedChange: toggleAll,
						"aria-label": "Select all"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Course" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Lessons" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Price" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
				"data-state": selected.has(c.id) ? "selected" : void 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: selected.has(c.id),
						onCheckedChange: () => toggleSelect(c.id),
						"aria-label": `Select ${c.title}`
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.thumbnail,
							alt: "",
							className: "h-9 w-14 rounded object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: c.title
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: c.status === "draft" ? "secondary" : "default",
						className: c.status === "draft" ? "" : "bg-success text-success-foreground",
						children: c.status === "draft" ? "Draft" : "Published"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: getLessonCount(c) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatPrice(c.discountPrice ?? c.price) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									asChild: true,
									title: "Preview as student",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `/courses/${c.id}`,
										target: "_blank",
										rel: "noreferrer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => openEdit(c),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => setDeleteId(c.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
								})
							]
						})
					})
				]
			}, c.id)) })] })
		}),
		editor === "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseEditor, {
			initial: emptyCourse(),
			isNew: true,
			saving: createCourse.isPending,
			onClose: closeEditor,
			onSave: save
		}, "new"),
		editor && editor !== "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditCourseLoader, {
			courseId: editor,
			saving: updateCourse.isPending,
			onClose: closeEditor,
			onSave: save
		}, editor),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!deleteId,
			onOpenChange: (v) => !v && setDeleteId(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this course?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This will permanently remove the course, plus its enrollments and progress. This can't be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => {
					if (deleteId) deleteCourse.mutate(deleteId, {
						onSuccess: () => toast.success("Course deleted"),
						onError: (e) => toast.error(getApiErrorMessage(e))
					});
					setDeleteId(null);
				},
				children: "Delete"
			})] })] })
		})
	] });
}
/**
* Loads the full course (with all nested sections/lessons) by id before opening
* the editor, so edits are always pre-populated from fresh server data.
*/
function EditCourseLoader({ courseId, saving, onClose, onSave }) {
	const { data: course, isLoading } = useCourse(courseId);
	if (isLoading || !course) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Loading course…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" })
		})] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseEditor, {
		initial: JSON.parse(JSON.stringify(course)),
		isNew: false,
		saving,
		onClose,
		onSave
	});
}
function EnrollmentsTab() {
	const { data: enrollments = [] } = useAllEnrollments();
	if (enrollments.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-dashed py-16 text-center text-sm text-muted-foreground",
		children: "No enrollments yet. When students buy a course, it shows up here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Student" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Course" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" })
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: enrollments.map((e) => {
			const user = typeof e.user === "string" ? null : e.user;
			const course = typeof e.course === "string" ? null : e.course;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: user?.email ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: course?.title ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatPrice(e.amount) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-muted-foreground",
					children: new Date(e.enrolledAt).toLocaleDateString("en-US")
				})
			] }, e.id);
		}) })] })
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
	role: "admin",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPage, {})
});
//#endregion
export { SplitComponent as component };
