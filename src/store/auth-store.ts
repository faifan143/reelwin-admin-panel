import type { DecodedToken } from "@/utils/token";
import {
  getDecodedToken,
  getToken,
  hasValidToken,
  removeToken,
  setToken,
} from "@/utils/token";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
  refreshUserData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: hasValidToken(),
      token: getToken(),
      user: getDecodedToken(),

      login: (token: string) => {
        setToken(token);
        set({
          isAuthenticated: true,
          token,
          user: getDecodedToken(),
        });
      },

      logout: () => {
        removeToken();
        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      },

      checkAuth: () => {
        const isValid = hasValidToken();
        set({ isAuthenticated: isValid });
        return isValid;
      },

      refreshUserData: async () => {
        try {
          if (!get().isAuthenticated) return;

          // Optional: Fetch additional user data from API
          // const response = await api.get('/user/profile');
          // set({ userData: response.data });
        } catch (error) {
          console.error("Failed to refresh user data:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        // Don't persist functions in storage
        isAuthenticated: undefined,
        user: undefined,
        login: undefined,
        logout: undefined,
        checkAuth: undefined,
        refreshUserData: undefined,
      }),
    }
  )
);
