"use client";

import { initializeTheme } from "@/utils/theme";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes";
import * as React from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Initialize theme on client side
  React.useEffect(() => {
    initializeTheme();
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
