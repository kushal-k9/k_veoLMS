// Client/UI state (Zustand): catalog filters + checkout modal + admin view mode.
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Admin dual-mode: an admin can either "manage" the platform or switch to
 * "learn" and consume courses exactly like a student (browse / buy / watch).
 */
export type AdminViewMode = "manage" | "learn";

interface UiState {
  // Course catalog filters
  search: string;
  category: string;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  resetFilters: () => void;

  // Checkout modal
  checkoutCourseId: string | null;
  openCheckout: (courseId: string) => void;
  closeCheckout: () => void;

  // Admin view mode (persisted so the choice survives reloads)
  adminViewMode: AdminViewMode;
  setAdminViewMode: (mode: AdminViewMode) => void;
  toggleAdminViewMode: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      search: "",
      category: "All",
      setSearch: (search) => set({ search }),
      setCategory: (category) => set({ category }),
      resetFilters: () => set({ search: "", category: "All" }),

      checkoutCourseId: null,
      openCheckout: (checkoutCourseId) => set({ checkoutCourseId }),
      closeCheckout: () => set({ checkoutCourseId: null }),

      adminViewMode: "manage",
      setAdminViewMode: (adminViewMode) => set({ adminViewMode }),
      toggleAdminViewMode: () =>
        set((s) => ({
          adminViewMode: s.adminViewMode === "manage" ? "learn" : "manage",
        })),
    }),
    {
      name: "veolms-ui",
      // Only persist the admin view mode; filters/modal stay ephemeral.
      partialize: (s) => ({ adminViewMode: s.adminViewMode }),
    },
  ),
);
