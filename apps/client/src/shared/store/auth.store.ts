import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => {
  const token = null;

  return {
    isLoggedIn: !!token,
    accessToken: token,
    login: (token: string) => set({ isLoggedIn: true, accessToken: token }),
    logout: () => set({ isLoggedIn: false, accessToken: null }),
  };
});
