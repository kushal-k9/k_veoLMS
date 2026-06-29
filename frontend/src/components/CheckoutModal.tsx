import { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/course";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { useCreatePaymentIntent, useConfirmPayment } from "@/hooks/usePayments";
import { getApiErrorMessage } from "@/lib/api/client";
import type { Course } from "@/types/api";
import { CheckCircle2, Loader2, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const stripePromise = getStripe();

export function CheckoutModal({
  course,
  open,
  onOpenChange,
  onSuccess,
}: {
  course: Course;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
}) {
  const createIntent = useCreatePaymentIntent();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);
  const [amount, setAmount] = useState(course.price);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const startIntent = (couponCode?: string) => {
    createIntent.mutate(
      { courseId: course.id, couponCode },
      {
        onSuccess: (data) => {
          setClientSecret(data.clientSecret);
          setAmount(data.amount);
          if (couponCode) setAppliedCoupon(couponCode);
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err, "Could not apply that"));
          // Fall back to a clean (no-coupon) intent.
          if (couponCode) setAppliedCoupon(null);
        },
      },
    );
  };

  // Create the PaymentIntent when the modal opens.
  useEffect(() => {
    if (!open) {
      setClientSecret(null);
      setSucceeded(false);
      setAppliedCoupon(null);
      setCouponInput("");
      return;
    }
    if (!stripeConfigured) return;
    startIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, course.id]);

  const applyCoupon = () => {
    if (!couponInput.trim()) return;
    setClientSecret(null);
    startIntent(couponInput.trim().toUpperCase());
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !createIntent.isPending && onOpenChange(v)}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {succeeded ? (
          <SuccessView course={course} onClose={() => onOpenChange(false)} />
        ) : (
          <>
            <DialogHeader>
              <div className="mb-1 flex items-center gap-2">
                <DialogTitle>Checkout</DialogTitle>
                <Badge variant="secondary" className="text-[10px]">
                  Stripe Test
                </Badge>
              </div>
              <DialogDescription>
                Secure card payment powered by Stripe. Use test card 4242 4242
                4242 4242, any future date & CVC.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-14 w-20 rounded-md object-cover"
              />
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-semibold">{course.title}</p>
                <p className="text-xs text-muted-foreground">{course.instructor}</p>
              </div>
            </div>

            {/* Coupon */}
            <div className="flex gap-2">
              <Input
                placeholder="Coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                className="h-9"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={applyCoupon}
                disabled={createIntent.isPending || !couponInput.trim()}
              >
                Apply
              </Button>
            </div>

            <div className="space-y-2 rounded-lg bg-muted/50 p-3 text-sm">
              {appliedCoupon && (
                <div className="flex justify-between text-success">
                  <span>Coupon {appliedCoupon}</span>
                  <span>−{formatPrice(Math.max(0, course.price - amount))}</span>
                </div>
              )}
              <div className="flex justify-between border-t-0 text-base font-bold">
                <span>Total</span>
                <span>{formatPrice(amount)}</span>
              </div>
            </div>

            {!stripeConfigured ? (
              <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                Stripe is not configured. Set{" "}
                <code>VITE_STRIPE_PUBLISHABLE_KEY</code> in the frontend{" "}
                <code>.env</code> to enable checkout.
              </p>
            ) : clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance: { theme: "stripe" } }}
              >
                <PaymentForm
                  amount={amount}
                  onPaid={() => {
                    setSucceeded(true);
                    onSuccess();
                  }}
                />
              </Elements>
            ) : (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}

            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              Payments are processed securely by Stripe
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PaymentForm({ amount, onPaid }: { amount: number; onPaid: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const confirmPayment = useConfirmPayment();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message ?? "Payment failed");
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        // Create the enrollment server-side (verifies the intent). This is the
        // dev fallback for when Stripe webhooks aren't configured locally.
        await confirmPayment.mutateAsync(paymentIntent.id);
        toast.success("Payment successful! 🎉");
        onPaid();
      } catch (err) {
        toast.error(getApiErrorMessage(err, "Could not confirm enrollment"));
      }
    } else {
      toast.error("Payment was not completed");
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button size="lg" className="w-full" type="submit" disabled={!stripe || processing}>
        {processing ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Lock className="mr-2 h-4 w-4" />
        )}
        Pay {formatPrice(amount)}
      </Button>
    </form>
  );
}

function SuccessView({ course, onClose }: { course: Course; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
        <CheckCircle2 className="h-10 w-10 text-success" />
      </div>
      <div>
        <h3 className="font-display text-lg font-bold">Payment successful!</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          You're now enrolled in <strong>{course.title}</strong>.
        </p>
      </div>
      <Button className="w-full" onClick={onClose}>
        Start learning
      </Button>
    </div>
  );
}
