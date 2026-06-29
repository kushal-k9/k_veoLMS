// Shopping cart (Zustand, persisted to localStorage). The cart holds a light
// snapshot of each course so the drawer can render without refetching. Checkout
// reuses the existing single-course Stripe flow, processing items sequentially.
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Course } from "@/types/api";

export interface CartItem {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (course: Course) => void;
  remove: (courseId: string) => void;
  clear: () => void;
  has: (courseId: string) => boolean;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

function toItem(course: Course): CartItem {
  return {
    id: course.id,
    title: course.title,
    thumbnail: course.thumbnail,
    instructor: course.instructor,
    price:
      typeof course.discountPrice === "number" && course.discountPrice < course.price
        ? course.discountPrice
        : course.price,
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (course) =>
        set((s) =>
          s.items.some((i) => i.id === course.id)
            ? s
            : { items: [...s.items, toItem(course)], isOpen: true },
        ),
      remove: (courseId) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== courseId) })),
      clear: () => set({ items: [] }),
      has: (courseId) => get().items.some((i) => i.id === courseId),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "veolms-cart",
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

/** Total price of everything in the cart. */
export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price, 0);
}
