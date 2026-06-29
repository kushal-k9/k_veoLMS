import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtp, useResendOtp } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api/client";
import type { Role } from "@/types/api";
import { MailCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface VerifySearch {
  email?: string;
}

export const Route = createFileRoute("/verify-otp")({
  validateSearch: (s: Record<string, unknown>): VerifySearch => ({
    email: typeof s.email === "string" ? s.email : undefined,
  }),
  head: () => ({ meta: [{ title: "Verify email — VeoLMS" }] }),
  component: VerifyOtpPage,
});

function VerifyOtpPage() {
  const { email } = Route.useSearch();
  const navigate = useNavigate();
  const verify = useVerifyOtp();
  const resend = useResendOtp();
  const [code, setCode] = useState("");

  if (!email) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <p className="text-muted-foreground">
            No email to verify.{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </PublicLayout>
    );
  }

  const finish = (role: Role) =>
    navigate({ to: role === "admin" ? "/admin" : "/dashboard" });

  const submit = (value: string) => {
    verify.mutate(
      { email, code: value },
      {
        onSuccess: (res) => {
          toast.success("Email verified! 🎉");
          finish(res.user.role);
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err, "Verification failed"));
          setCode("");
        },
      }
    );
  };

  return (
    <PublicLayout>
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <MailCheck />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold">Verify your email</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We sent a 6-digit code to <strong>{email}</strong>.
        </p>

        <div className="mt-8 w-full rounded-xl border bg-card p-6 shadow-card">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(v) => {
                setCode(v);
                if (v.length === 6) submit(v);
              }}
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            className="mt-6 w-full"
            disabled={code.length !== 6 || verify.isPending}
            onClick={() => submit(code)}
          >
            {verify.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify
          </Button>

          <button
            type="button"
            className="mt-4 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
            disabled={resend.isPending}
            onClick={() =>
              resend.mutate(email, {
                onSuccess: () => toast.success("A new code is on its way."),
              })
            }
          >
            Didn't get it? Resend code
          </button>
        </div>
      </div>
    </PublicLayout>
  );
}
