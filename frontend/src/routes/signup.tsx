import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api/client";
import { GraduationCap, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — VeoLMS" }] }),
  component: SignupPage,
});

function strengthError(pw: string): string | null {
  if (pw.length < 8) return "Password must be at least 8 characters";
  if (!/[a-z]/.test(pw)) return "Add a lowercase letter";
  if (!/[A-Z]/.test(pw)) return "Add an uppercase letter";
  if (!/[0-9]/.test(pw)) return "Add a number";
  return null;
}

function SignupPage() {
  const register = useRegister();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = strengthError(password);
    if (err) {
      toast.error(err);
      return;
    }
    register.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          toast.success("Account created! Check your email for a code.");
          navigate({ to: "/verify-otp", search: { email } });
        },
        onError: (e2) => toast.error(getApiErrorMessage(e2, "Sign up failed")),
      }
    );
  };

  return (
    <PublicLayout>
      <div className="mx-auto flex max-w-md flex-col px-4 py-16">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start learning in minutes. It's free.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4 rounded-xl border bg-card p-6 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8+ chars, upper, lower & number" required />
          </div>
          <Button type="submit" className="w-full" disabled={register.isPending}>
            {register.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}
