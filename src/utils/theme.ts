import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme, Language } from "@/types";

interface ThemeState {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      language: "ar",

      setTheme: (theme: Theme) => {
        set({ theme });
      },

      setLanguage: (language: Language) => {
        set({ language });

        // Set the HTML direction attribute
        if (typeof document !== "undefined") {
          document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
          document.documentElement.lang = language;
        }
      },
    }),
    {
      name: "theme-storage",
    }
  )
);

// Helper function to initialize theme settings
export const initializeTheme = () => {
  const { theme, language, setLanguage } = useThemeStore.getState();

  if (typeof document !== "undefined") {
    // Set initial direction and language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }

  return { theme, language, setLanguage };
};
