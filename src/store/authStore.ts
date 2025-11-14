import { create } from "zustand";

interface AuthState {
  role: string | null;
  setRole: (role: string) => void;
  clearRole: () => void;

  userId: string | null;
  setUserId: (userId: string) => void;
  clearUserId: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  clearRole: () => set({ role: null }),

  userId: null,
  setUserId: (userId) => set({ userId }),
  clearUserId: () => set({ userId: null }),
}));