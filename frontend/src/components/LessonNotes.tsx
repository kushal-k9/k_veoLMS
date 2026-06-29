// Per-lesson notes editor for the course player. Autosaves (debounced) as the
// learner types, and shows their other notes for the course below.
import { useEffect, useMemo, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useNotes, useSaveNote } from "@/hooks/useNotes";
import { useDebounce } from "@/hooks/useDebounce";
import { Check, Loader2, NotebookPen } from "lucide-react";

export function LessonNotes({
  courseId,
  lessonId,
}: {
  courseId: string;
  lessonId: string;
}) {
  const { data: notes } = useNotes(courseId);
  const saveNote = useSaveNote(courseId);

  const savedContent = useMemo(
    () => notes?.find((n) => n.lessonId === lessonId)?.content ?? "",
    [notes, lessonId],
  );

  const [value, setValue] = useState(savedContent);
  const debounced = useDebounce(value, 700);
  // Track the last value we persisted to avoid redundant writes / save flicker.
  const lastSaved = useRef(savedContent);

  // When switching lessons, load that lesson's saved note into the editor.
  useEffect(() => {
    setValue(savedContent);
    lastSaved.current = savedContent;
  }, [lessonId, savedContent]);

  // Persist the debounced value when it actually changed.
  useEffect(() => {
    if (debounced === lastSaved.current) return;
    lastSaved.current = debounced;
    saveNote.mutate({ lessonId, content: debounced });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, lessonId]);

  const dirty = value !== lastSaved.current;

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <NotebookPen className="h-4 w-4" /> My notes
        </p>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          {saveNote.isPending || dirty ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Check className="h-3 w-3 text-success" /> Saved
            </>
          )}
        </span>
      </div>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Jot down key takeaways, timestamps, or questions for this lesson…"
        className="min-h-32 resize-y"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Notes are private to you and saved automatically.
      </p>
    </div>
  );
}
