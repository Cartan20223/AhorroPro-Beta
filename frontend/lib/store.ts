import { create } from "zustand";
import { api, type Envelope, type Balance } from "./api";

export interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

interface DashboardState {
  envelopes: Envelope[];
  balance: Balance | null;
  loading: boolean;
  error: string;
  fetchData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  envelopes: [],
  balance: null,
  loading: true,
  error: "",
  fetchData: async () => {
    try {
      set({ error: "", loading: true });
      const [envData, balData] = await Promise.all([
        api.getEnvelopes(),
        api.getBalance(),
      ]);
      set({ envelopes: envData, balance: balData, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error al cargar datos.",
        loading: false,
      });
    }
  },
}));
