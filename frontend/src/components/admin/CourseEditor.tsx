// Admin course editor: metadata + publishing controls + a drag-reorderable
// curriculum builder (sections and lessons) with file uploads + drip dates.
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KeyboardSensor } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/FileUpload";
import { parseYouTubeId, uid, type DraftCourse } from "@/lib/adminCourse";
import type { Lesson, Section } from "@/types/api";
import { FileText, GripVertical, Plus, Trash2, X } from "lucide-react";

/**
 * Format an ISO timestamp as a `datetime-local` value showing the user's LOCAL
 * wall-clock time. Using `.toISOString()` directly would show UTC, which shifts
 * the displayed time by the timezone offset (e.g. 3:15 PM rendering as 9:30 AM
 * in UTC+5:45). We subtract the offset so the local time round-trips correctly.
 */
function toDatetimeLocal(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const offsetMs = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function CourseEditor({
  initial,
  isNew,
  saving,
  onClose,
  onSave,
}: {
  initial: DraftCourse;
  isNew: boolean;
  saving: boolean;
  onClose: () => void;
  onSave: (c: DraftCourse) => void;
}) {
  const [draft, setDraft] = useState<DraftCourse>(initial);
  const set = (patch: Partial<DraftCourse>) => setDraft((d) => ({ ...d, ...patch }));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // ---- section / lesson mutations ----
  const addSection = () =>
    set({
      sections: [...draft.sections, { id: uid("sec"), title: "New section", lessons: [] }],
    });
  const updateSection = (id: string, patch: Partial<Section>) =>
    set({ sections: draft.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  const removeSection = (id: string) =>
    set({ sections: draft.sections.filter((s) => s.id !== id) });

  const addLesson = (sectionId: string) =>
    set({
      sections: draft.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: [
                ...s.lessons,
                { id: uid("les"), title: "New lesson", youtubeId: "", duration: "10:00", preview: false },
              ],
            }
          : s,
      ),
    });
  const updateLesson = (sectionId: string, lessonId: string, patch: Partial<Lesson>) =>
    set({
      sections: draft.sections.map((s) =>
        s.id === sectionId
          ? { ...s, lessons: s.lessons.map((l) => (l.id === lessonId ? { ...l, ...patch } : l)) }
          : s,
      ),
    });
  const removeLesson = (sectionId: string, lessonId: string) =>
    set({
      sections: draft.sections.map((s) =>
        s.id === sectionId ? { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId) } : s,
      ),
    });

  // ---- drag reorder ----
  const onSectionDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = draft.sections.findIndex((s) => s.id === active.id);
    const newIndex = draft.sections.findIndex((s) => s.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    set({ sections: arrayMove(draft.sections, oldIndex, newIndex) });
  };

  const onLessonDragEnd = (sectionId: string) => (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    set({
      sections: draft.sections.map((s) => {
        if (s.id !== sectionId) return s;
        const oldIndex = s.lessons.findIndex((l) => l.id === active.id);
        const newIndex = s.lessons.findIndex((l) => l.id === over.id);
        if (oldIndex < 0 || newIndex < 0) return s;
        return { ...s, lessons: arrayMove(s.lessons, oldIndex, newIndex) };
      }),
    });
  };

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "Create course" : "Edit course"}</DialogTitle>
          <DialogDescription>
            Course details, publishing, and a drag-to-reorder curriculum.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Publishing controls */}
          <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={draft.status === "published"}
                onCheckedChange={(v) => set({ status: v ? "published" : "draft" })}
              />
              <span className="text-sm font-medium">
                {draft.status === "published" ? "Published" : "Draft"}
              </span>
            </div>
            <Field label="Scheduled release (drip)" className="flex-1">
              <Input
                type="datetime-local"
                value={toDatetimeLocal(draft.publishAt)}
                onChange={(e) =>
                  set({ publishAt: e.target.value ? new Date(e.target.value).toISOString() : null })
                }
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" className="sm:col-span-2">
              <Input value={draft.title} onChange={(e) => set({ title: e.target.value })} />
            </Field>
            <Field label="Subtitle" className="sm:col-span-2">
              <Input value={draft.subtitle} onChange={(e) => set({ subtitle: e.target.value })} />
            </Field>
            <Field label="Instructor">
              <Input value={draft.instructor} onChange={(e) => set({ instructor: e.target.value })} />
            </Field>
            <Field label="Category">
              <Input value={draft.category} onChange={(e) => set({ category: e.target.value })} />
            </Field>
            <Field label="Price ($)">
              <Input
                type="number"
                value={draft.price}
                onChange={(e) => set({ price: Number(e.target.value) })}
              />
            </Field>
            <Field label="Discount price ($, optional)">
              <Input
                type="number"
                value={draft.discountPrice ?? ""}
                onChange={(e) =>
                  set({ discountPrice: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </Field>
            <Field label="Level">
              <Select value={draft.level} onValueChange={(v) => set({ level: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Beginner", "Intermediate", "Advanced"].map((lv) => (
                    <SelectItem key={lv} value={lv}>
                      {lv}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Thumbnail">
              <div className="flex gap-2">
                <Input
                  value={draft.thumbnail}
                  onChange={(e) => set({ thumbnail: e.target.value })}
                  placeholder="Image URL"
                />
                <FileUpload
                  accept="image/*"
                  label="Upload"
                  onUploaded={(r) => set({ thumbnail: r.url })}
                />
              </div>
            </Field>
            <Field label="Trailer YouTube URL/ID" className="sm:col-span-2">
              <Input
                value={draft.trailerYoutubeId}
                onChange={(e) => set({ trailerYoutubeId: parseYouTubeId(e.target.value) })}
              />
            </Field>
            <Field label="Description" className="sm:col-span-2">
              <Textarea
                rows={3}
                value={draft.description}
                onChange={(e) => set({ description: e.target.value })}
              />
            </Field>
          </div>

          {/* Curriculum builder */}
          <div className="rounded-xl border p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold">Curriculum</h3>
                <p className="text-xs text-muted-foreground">Drag the handle to reorder.</p>
              </div>
              <Button variant="outline" size="sm" onClick={addSection}>
                <Plus className="mr-1 h-4 w-4" /> Add section
              </Button>
            </div>

            {draft.sections.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No sections yet. Add a section to start building the curriculum.
              </p>
            )}

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={onSectionDragEnd}
            >
              <SortableContext
                items={draft.sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {draft.sections.map((section) => (
                    <SortableRow key={section.id} id={section.id}>
                      {(handle) => (
                        <div className="rounded-lg border bg-muted/30 p-3">
                          <div className="flex items-center gap-2">
                            {handle}
                            <Input
                              value={section.title}
                              onChange={(e) => updateSection(section.id, { title: e.target.value })}
                              className="font-semibold"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSection(section.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>

                          <div className="mt-3">
                            <DndContext
                              sensors={sensors}
                              collisionDetection={closestCenter}
                              modifiers={[restrictToVerticalAxis]}
                              onDragEnd={onLessonDragEnd(section.id)}
                            >
                              <SortableContext
                                items={section.lessons.map((l) => l.id)}
                                strategy={verticalListSortingStrategy}
                              >
                                <div className="space-y-2">
                                  {section.lessons.map((lesson) => (
                                    <SortableRow key={lesson.id} id={lesson.id}>
                                      {(handle) => (
                                        <LessonRow
                                          handle={handle}
                                          lesson={lesson}
                                          onChange={(patch) =>
                                            updateLesson(section.id, lesson.id, patch)
                                          }
                                          onRemove={() => removeLesson(section.id, lesson.id)}
                                        />
                                      )}
                                    </SortableRow>
                                  ))}
                                </div>
                              </SortableContext>
                            </DndContext>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2"
                              onClick={() => addLesson(section.id)}
                            >
                              <Plus className="mr-1 h-4 w-4" /> Add lesson
                            </Button>
                          </div>
                        </div>
                      )}
                    </SortableRow>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(draft)} disabled={saving}>
            {isNew ? "Create course" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** A sortable wrapper that hands a drag-handle element to its render child. */
function SortableRow({
  id,
  children,
}: {
  id: string;
  children: (handle: React.ReactNode) => React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : undefined,
  };
  const handle = (
    <button
      type="button"
      className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
      aria-label="Drag to reorder"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );
  return (
    <div ref={setNodeRef} style={style}>
      {children(handle)}
    </div>
  );
}

function LessonRow({
  handle,
  lesson,
  onChange,
  onRemove,
}: {
  handle: React.ReactNode;
  lesson: Lesson;
  onChange: (patch: Partial<Lesson>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-md border bg-card p-2">
      <div className="flex items-center gap-2">
        {handle}
        <Input
          placeholder="Lesson title"
          value={lesson.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_90px_auto]">
        <Input
          placeholder="YouTube URL or ID"
          value={lesson.youtubeId}
          onChange={(e) => onChange({ youtubeId: parseYouTubeId(e.target.value) })}
        />
        <Input
          placeholder="12:00"
          value={lesson.duration}
          onChange={(e) => onChange({ duration: e.target.value })}
        />
        <label className="flex items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={lesson.preview}
            onChange={(e) => onChange({ preview: e.target.checked })}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          Preview
        </label>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Drip date (optional)
          <Input
            type="datetime-local"
            value={toDatetimeLocal(lesson.availableAt)}
            onChange={(e) =>
              onChange({
                availableAt: e.target.value ? new Date(e.target.value).toISOString() : null,
              })
            }
          />
        </label>
        <div className="flex items-end gap-2">
          {lesson.pdfUrl ? (
            <a
              href={lesson.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs text-primary underline"
            >
              <FileText className="h-3.5 w-3.5" /> View PDF
            </a>
          ) : (
            <span className="text-xs text-muted-foreground">No resource</span>
          )}
          <FileUpload
            accept="application/pdf"
            label={lesson.pdfUrl ? "Replace PDF" : "Attach PDF"}
            variant="ghost"
            onUploaded={(r) => onChange({ pdfUrl: r.url })}
          />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
