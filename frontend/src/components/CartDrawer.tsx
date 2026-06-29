// Slide-in cart. Lists saved courses and runs a sequential checkout that reuses
// the existing single-course Stripe CheckoutModal (one PaymentIntent per course).
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckoutModal } from "@/components/CheckoutModal";
import { useCartStore, cartTotal } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { useCourse } from "@/hooks/useCourses";
import { formatPrice } from "@/lib/course";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export function CartDrawer() {
  const { items, isOpen, setOpen, remove, clear } = useCartStore();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const reduced = useReducedMotion() ?? false;
  // The course id currently being checked out (drives the CheckoutModal).
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  const total = cartTotal(items);

  const startCheckout = () => {
    if (!isAuthenticated) {
      setOpen(false);
      navigate({ to: "/login", search: { redirect: "/courses" } });
      return;
    }
    if (items[0]) setCheckoutId(items[0].id);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
          <SheetHeader className="border-b px-5 py-4">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" /> Your cart ({items.length})
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
                  <ShoppingCart className="h-7 w-7" />
                </span>
                <p className="font-medium">Your cart is empty</p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Browse the catalog and add courses to enroll in bulk.
                </p>
                <Button asChild variant="outline" onClick={() => setOpen(false)}>
                  <Link to="/courses">Explore courses</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-3">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout={!reduced}
                      initial={{ opacity: 0, x: reduced ? 0 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: reduced ? 0 : -20 }}
                      className="flex gap-3 rounded-xl border bg-card p-3"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-14 w-20 shrink-0 rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.instructor}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => remove(item.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-bold">{formatPrice(item.price)}</span>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <SheetFooter className="border-t px-5 py-4">
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-base font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <Separator />
                <Button className="w-full" size="lg" onClick={startCheckout}>
                  Checkout
                </Button>
                <button
                  onClick={clear}
                  className="flex w-full items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" /> Clear cart
                </button>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      {checkoutId && (
        <CartCheckout
          courseId={checkoutId}
          onClose={() => setCheckoutId(null)}
          onPaid={() => {
            remove(checkoutId);
            const next = useCartStore.getState().items.find((i) => i.id !== checkoutId);
            setCheckoutId(null);
            if (next) {
              // Continue to the next item after a beat.
              setTimeout(() => setCheckoutId(next.id), 300);
            } else {
              toast.success("All set — you're enrolled! 🎉");
              setOpen(false);
            }
          }}
        />
      )}
    </>
  );
}

/** Loads the course then renders the shared CheckoutModal for it. */
function CartCheckout({
  courseId,
  onClose,
  onPaid,
}: {
  courseId: string;
  onClose: () => void;
  onPaid: () => void;
}) {
  const { data: course } = useCourse(courseId);
  if (!course) return null;
  return (
    <CheckoutModal
      course={course}
      open
      onOpenChange={(v) => !v && onClose()}
      onSuccess={onPaid}
    />
  );
}
