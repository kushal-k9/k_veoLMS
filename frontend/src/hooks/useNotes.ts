// Per-lesson notes hooks: list a course's notes + save (upsert) a lesson note.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import * as notesApi from "@/lib/endpoints/notes.endpoints";
import type { Note } from "@/lib/endpoints/notes.endpoints";

export function useNotes(courseId: string | undefined, enabled = true) {
  return useQuery({
    queryKey: queryKeys.notes(courseId ?? ""),
    queryFn: () => notesApi.listNotes(courseId as string),
    enabled: Boolean(courseId) && enabled,
  });
}

export function useSaveNote(courseId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonId, content }: { lessonId: string; content: string }) =>
      notesApi.saveNote(courseId, lessonId, content),
    onSuccess: (note, vars) => {
      qc.setQueryData<Note[]>(queryKeys.notes(courseId), (prev = []) => {
        const without = prev.filter((n) => n.lessonId !== vars.lessonId);
        return note ? [note, ...without] : without;
      });
    },
  });
}

export type { Note };
