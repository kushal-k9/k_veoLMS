// Public, printable certificate page (verifiable by code).
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { verifyCertificate } from "@/lib/endpoints/engagement.endpoints";
import { Button } from "@/components/ui/button";
import { Award, Loader2, Printer } from "lucide-react";

export const Route = createFileRoute("/certificate/$code")({
  component: CertificatePage,
});

function CertificatePage() {
  const { code } = Route.useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["certificate", code],
    queryFn: () => verifyCertificate(code),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (isError || !data) throw notFound();

  const course = typeof data.course === "string" ? null : data.course;
  const user = typeof data.user === "string" ? null : data.user;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted px-4 py-10 print:bg-white">
      <div className="w-full max-w-3xl rounded-2xl border-4 border-primary/20 bg-card p-10 text-center shadow-elevated print:border-primary/40 print:shadow-none">
        <Award className="mx-auto h-16 w-16 text-warning" />
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Certificate of Completion
        </p>
        <p className="mt-6 text-sm text-muted-foreground">This certifies that</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-foreground">
          {user?.name ?? "Student"}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">has successfully completed</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-primary">
          {course?.title ?? "Course"}
        </h2>
        {course?.instructor && (
          <p className="mt-2 text-sm text-muted-foreground">Instructor: {course.instructor}</p>
        )}
        <div className="mt-8 flex items-center justify-between border-t pt-6 text-xs text-muted-foreground">
          <span>Issued {new Date(data.issuedAt).toLocaleDateString()}</span>
          <span>Verification: {data.code}</span>
        </div>
      </div>
      <Button onClick={() => window.print()} className="print:hidden">
        <Printer className="mr-1.5 h-4 w-4" /> Print / Save PDF
      </Button>
    </div>
  );
}
