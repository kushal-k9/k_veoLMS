import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { RequireAuth } from "@/components/RequireAuth";
import { CourseEditor } from "@/components/admin/CourseEditor";
import { UsersTab } from "@/components/admin/UsersTab";
import { AnalyticsTab } from "@/components/admin/AnalyticsTab";
import { EngagementTab } from "@/components/admin/EngagementTab";
import { OpsTab } from "@/components/admin/OpsTab";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useCourses,
  useCourse,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  useBulkCourseStatus,
} from "@/hooks/useCourses";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { useAllEnrollments } from "@/hooks/useEnrollments";
import { getApiErrorMessage } from "@/lib/api/client";
import { formatPrice, getLessonCount } from "@/lib/course";
import {
  emptyCourse,
  toCoursePayload,
  type DraftCourse,
} from "@/lib/adminCourse";
import type { Course } from "@/types/api";
import {
  BookOpen,
  Eye,
  Pencil,
  Plus,
  Receipt,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — VeoLMS" }] }),
  component: () => (
    <RequireAuth role="admin">
      <AdminPage />
    </RequireAuth>
  ),
});

function AdminPage() {
  const { data } = useCourses({ limit: 100 });
  const courses = data?.courses ?? [];
  const { data: enrollments = [] } = useAllEnrollments();
  const { data: students = [] } = useUsers("student");

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Manage courses, students, and enrollments.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatTile icon={<BookOpen />} label="Courses" value={courses.length} />
          <StatTile icon={<Users />} label="Students" value={students.length} />
          <StatTile icon={<Receipt />} label="Enrollments" value={enrollments.length} />
        </div>

        <Tabs defaultValue="analytics" className="mt-8">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="ops">Ops</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsTab />
          </TabsContent>
          <TabsContent value="courses" className="mt-6">
            <CoursesTab courses={courses} />
          </TabsContent>
          <TabsContent value="users" className="mt-6">
            <UsersTab />
          </TabsContent>
          <TabsContent value="engagement" className="mt-6">
            <EngagementTab />
          </TabsContent>
          <TabsContent value="ops" className="mt-6">
            <OpsTab />
          </TabsContent>
          <TabsContent value="enrollments" className="mt-6">
            <EnrollmentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </PublicLayout>
  );
}

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-card">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
        {icon}
      </span>
      <div>
        <div className="font-display text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function CoursesTab({ courses }: { courses: Course[] }) {
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const bulkStatus = useBulkCourseStatus();
  // null = closed; "new" = create; otherwise the id of the course being edited.
  const [editor, setEditor] = useState<"new" | string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const openNew = () => setEditor("new");
  const openEdit = (c: Course) => setEditor(c.id);
  const closeEditor = () => setEditor(null);

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const allSelected = courses.length > 0 && selected.size === courses.length;
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(courses.map((c) => c.id)));

  const runBulk = (status: "draft" | "published") => {
    if (selected.size === 0) return;
    bulkStatus.mutate(
      { ids: [...selected], status },
      {
        onSuccess: (r) => {
          toast.success(`${r.modified} course(s) ${status === "published" ? "published" : "moved to draft"}`);
          setSelected(new Set());
        },
        onError: (e) => toast.error(getApiErrorMessage(e)),
      },
    );
  };

  const save = (draft: DraftCourse) => {
    if (!draft.title.trim()) {
      toast.error("Course title is required");
      return;
    }
    const payload = toCoursePayload(draft);
    const onError = (e: unknown) => toast.error(getApiErrorMessage(e));
    // A draft with an id is an edit; otherwise it's a new course.
    if (draft.id) {
      updateCourse.mutate(
        { id: draft.id, input: payload },
        {
          onSuccess: () => {
            toast.success("Course updated");
            closeEditor();
          },
          onError,
        },
      );
    } else {
      createCourse.mutate(payload, {
        onSuccess: () => {
          toast.success("Course created");
          closeEditor();
        },
        onError,
      });
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <>
              <span className="text-sm text-muted-foreground">{selected.size} selected</span>
              <Button size="sm" variant="outline" onClick={() => runBulk("published")} disabled={bulkStatus.isPending}>
                Publish
              </Button>
              <Button size="sm" variant="outline" onClick={() => runBulk("draft")} disabled={bulkStatus.isPending}>
                Unpublish
              </Button>
            </>
          )}
        </div>
        <Button onClick={openNew}>
          <Plus className="mr-1.5 h-4 w-4" /> New course
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Select all" />
              </TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lessons</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((c) => (
              <TableRow key={c.id} data-state={selected.has(c.id) ? "selected" : undefined}>
                <TableCell>
                  <Checkbox
                    checked={selected.has(c.id)}
                    onCheckedChange={() => toggleSelect(c.id)}
                    aria-label={`Select ${c.title}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={c.thumbnail} alt="" className="h-9 w-14 rounded object-cover" />
                    <span className="font-medium">{c.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={c.status === "draft" ? "secondary" : "default"}
                    className={c.status === "draft" ? "" : "bg-success text-success-foreground"}
                  >
                    {c.status === "draft" ? "Draft" : "Published"}
                  </Badge>
                </TableCell>
                <TableCell>{getLessonCount(c)}</TableCell>
                <TableCell>{formatPrice(c.discountPrice ?? c.price)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      title="Preview as student"
                    >
                      <a href={`/courses/${c.id}`} target="_blank" rel="noreferrer">
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(c.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editor === "new" && (
        <CourseEditor
          key="new"
          initial={emptyCourse()}
          isNew
          saving={createCourse.isPending}
          onClose={closeEditor}
          onSave={save}
        />
      )}
      {editor && editor !== "new" && (
        <EditCourseLoader
          key={editor}
          courseId={editor}
          saving={updateCourse.isPending}
          onClose={closeEditor}
          onSave={save}
        />
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this course?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the course, plus its enrollments and progress. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  deleteCourse.mutate(deleteId, {
                    onSuccess: () => toast.success("Course deleted"),
                    onError: (e) => toast.error(getApiErrorMessage(e)),
                  });
                }
                setDeleteId(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/**
 * Loads the full course (with all nested sections/lessons) by id before opening
 * the editor, so edits are always pre-populated from fresh server data.
 */
function EditCourseLoader({
  courseId,
  saving,
  onClose,
  onSave,
}: {
  courseId: string;
  saving: boolean;
  onClose: () => void;
  onSave: (c: DraftCourse) => void;
}) {
  const { data: course, isLoading } = useCourse(courseId);

  if (isLoading || !course) {
    return (
      <Dialog open onOpenChange={(v) => !v && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading course…</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <CourseEditor
      initial={JSON.parse(JSON.stringify(course)) as DraftCourse}
      isNew={false}
      saving={saving}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function EnrollmentsTab() {
  const { data: enrollments = [] } = useAllEnrollments();
  if (enrollments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed py-16 text-center text-sm text-muted-foreground">
        No enrollments yet. When students buy a course, it shows up here.
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.map((e) => {
            const user = typeof e.user === "string" ? null : e.user;
            const course = typeof e.course === "string" ? null : e.course;
            return (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{user?.email ?? "—"}</TableCell>
                <TableCell>{course?.title ?? "—"}</TableCell>
                <TableCell>{formatPrice(e.amount)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(e.enrolledAt).toLocaleDateString("en-US")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
