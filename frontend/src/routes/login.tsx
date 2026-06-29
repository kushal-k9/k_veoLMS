import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useLogin, useGoogleLogin } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api/client";
import { GraduationCap, Loader2, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";

interface LoginSearch {
  redirect?: string;
}

const GOOGLE_ENABLED = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): LoginSearch => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({ meta: [{ title: "Log in — VeoLMS" }] }),
  component: LoginPage,
});

function LoginPage() {
  const login = useLogin();
  const googleLogin = useGoogleLogin();
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect once auth state is actually settled (not inside the mutation
  // callback, which can fire before the store/token update lands).
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    if (redirect) navigate({ to: redirect });
    else navigate({ to: user.role === "admin" || user.role === "super-admin" || user.role === "instructor" || user.role === "support" ? "/admin" : "/dashboard" });
  }, [isAuthenticated, user, redirect, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Welcome back!");
        },
        onError: (err) => {
          // Unverified accounts get a 403 with requiresVerification.
          const data = axios.isAxiosError(err)
            ? (err.response?.data as { errors?: { requiresVerification?: boolean } })
            : undefined;
          if (data?.errors?.requiresVerification) {
            toast.info("Please verify your email. We sent you a new code.");
            navigate({ to: "/verify-otp", search: { email } });
            return;
          }
          toast.error(getApiErrorMessage(err, "Login failed"));
        },
      }
    );
  };

  const onGoogle = (credential?: string) => {
    if (!credential) return;
    googleLogin.mutate(credential, {
      onSuccess: () => {
        toast.success("Welcome!");
      },
      onError: (err) => toast.error(getApiErrorMessage(err, "Google sign-in failed")),
    });
  };

  const quickFill = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <PublicLayout>
      <div className="mx-auto flex max-w-md flex-col px-4 py-16">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Log in to continue learning on VeoLMS.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4 rounded-xl border bg-card p-6 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={login.isPending}>
            {login.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log in
          </Button>

          {GOOGLE_ENABLED && (
            <>
              <div className="relative py-1 text-center">
                <span className="relative z-10 bg-card px-3 text-xs text-muted-foreground">
                  or continue with
                </span>
                <div className="absolute left-0 top-1/2 h-px w-full bg-border" />
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(cr) => onGoogle(cr.credential)}
                  onError={() => toast.error("Google sign-in failed")}
                  useOneTap={false}
                />
              </div>
            </>
          )}
        </form>

        <div className="mt-4 rounded-xl border border-dashed bg-muted/40 p-4">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">Demo accounts</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button variant="outline" size="sm" type="button" onClick={() => quickFill("admin@veolms.com", "Admin123!")}>
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> Admin
            </Button>
            <Button variant="outline" size="sm" type="button" onClick={() => quickFill("student@veolms.com", "Student123!")}>
              <User className="mr-1.5 h-3.5 w-3.5" /> Student
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}
