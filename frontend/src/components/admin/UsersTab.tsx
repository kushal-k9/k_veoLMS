// Admin user management: search/filter, role assignment, ban/unban, password
// reset, and manual enroll/unenroll.
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/hooks/useAuth";
import {
  useUsersAdmin,
  useSetUserRole,
  useSetUserStatus,
  useResetUserPassword,
} from "@/hooks/useUsers";
import {
  useAllEnrollments,
  useAdminEnroll,
  useAdminUnenroll,
  enrollmentCourseId,
} from "@/hooks/useEnrollments";
import { useCourses } from "@/hooks/useCourses";
import { getApiErrorMessage } from "@/lib/api/client";
import type { AdminUser, Role } from "@/types/api";
import { Ban, Check, KeyRound, MoreHorizontal, Search, UserCog } from "lucide-react";
import { toast } from "sonner";

const ROLES: Role[] = ["super-admin", "admin", "instructor", "support", "student"];

export function UsersTab() {
  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q.trim(), 300);
  const [role, setRole] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const { isSuperAdmin } = useAuth();

  const { data: users = [], isLoading } = useUsersAdmin({
    q: debouncedQ || undefined,
    role: role === "all" ? undefined : (role as Role),
    status: status === "all" ? undefined : (status as "active" | "banned"),
  });

  const setUserRole = useSetUserRole();
  const setUserStatus = useSetUserStatus();
  const resetPassword = useResetUserPassword();
  const [enrollFor, setEnrollFor] = useState<AdminUser | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or email…"
            className="pl-9"
          />
        </div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            {ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                  Loading users…
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                  No users match your filters.
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={u.avatar} alt={u.name} />
                        <AvatarFallback>{u.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {isSuperAdmin ? (
                      <Select
                        value={u.role}
                        onValueChange={(value) =>
                          setUserRole.mutate(
                            { id: u.id, role: value as Role },
                            {
                              onSuccess: () => toast.success("Role updated"),
                              onError: (e) => toast.error(getApiErrorMessage(e)),
                            },
                          )
                        }
                      >
                        <SelectTrigger className="h-8 w-36 capitalize">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((r) => (
                            <SelectItem key={r} value={r} className="capitalize">
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="secondary" className="capitalize">
                        {u.role}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {u.status === "banned" ? (
                      <Badge variant="destructive">Banned</Badge>
                    ) : (
                      <Badge className="bg-success text-success-foreground">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell>{u.enrolledCount}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEnrollFor(u)}>
                          <UserCog className="mr-2 h-4 w-4" /> Manage enrollments
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            resetPassword.mutate(u.id, {
                              onSuccess: (temp) =>
                                toast.success(`Temp password: ${temp}`, { duration: 10000 }),
                              onError: (e) => toast.error(getApiErrorMessage(e)),
                            })
                          }
                        >
                          <KeyRound className="mr-2 h-4 w-4" /> Reset password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {u.status === "banned" ? (
                          <DropdownMenuItem
                            onClick={() =>
                              setUserStatus.mutate(
                                { id: u.id, status: "active" },
                                {
                                  onSuccess: () => toast.success("User unbanned"),
                                  onError: (e) => toast.error(getApiErrorMessage(e)),
                                },
                              )
                            }
                          >
                            <Check className="mr-2 h-4 w-4" /> Unban
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() =>
                              setUserStatus.mutate(
                                { id: u.id, status: "banned" },
                                {
                                  onSuccess: () => toast.success("User banned"),
                                  onError: (e) => toast.error(getApiErrorMessage(e)),
                                },
                              )
                            }
                          >
                            <Ban className="mr-2 h-4 w-4" /> Ban user
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {enrollFor && (
        <EnrollmentManager user={enrollFor} onClose={() => setEnrollFor(null)} />
      )}
    </div>
  );
}

/** Per-user dialog to enroll/unenroll across all courses. */
function EnrollmentManager({ user, onClose }: { user: AdminUser; onClose: () => void }) {
  const { data: coursesData } = useCourses({ limit: 100 });
  const courses = coursesData?.courses ?? [];
  const { data: enrollments = [] } = useAllEnrollments();
  const enroll = useAdminEnroll();
  const unenroll = useAdminUnenroll();

  const enrolledCourseIds = useMemo(() => {
    const set = new Set<string>();
    for (const e of enrollments) {
      const uid = typeof e.user === "string" ? e.user : e.user.id;
      if (uid === user.id) set.add(enrollmentCourseId(e));
    }
    return set;
  }, [enrollments, user.id]);

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage enrollments — {user.name}</DialogTitle>
        </DialogHeader>
        <ul className="space-y-2">
          {courses.map((c) => {
            const isEnrolled = enrolledCourseIds.has(c.id);
            return (
              <li
                key={c.id}
                className="flex items-center gap-3 rounded-lg border p-2"
              >
                <img src={c.thumbnail} alt="" className="h-9 w-14 rounded object-cover" />
                <span className="flex-1 text-sm font-medium">{c.title}</span>
                {isEnrolled ? (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={unenroll.isPending}
                    onClick={() =>
                      unenroll.mutate(
                        { userId: user.id, courseId: c.id },
                        {
                          onSuccess: () => toast.success("Unenrolled"),
                          onError: (e) => toast.error(getApiErrorMessage(e)),
                        },
                      )
                    }
                  >
                    Unenroll
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    disabled={enroll.isPending}
                    onClick={() =>
                      enroll.mutate(
                        { userId: user.id, courseId: c.id },
                        {
                          onSuccess: () => toast.success("Enrolled"),
                          onError: (e) => toast.error(getApiErrorMessage(e)),
                        },
                      )
                    }
                  >
                    Enroll
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
