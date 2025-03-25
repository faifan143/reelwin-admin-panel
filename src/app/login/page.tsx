"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { useAuthStore } from "@/store/auth-store";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (checkAuth()) {
      router.push("/dashboard");
    }
  }, [checkAuth, isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-end p-4">
        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} ReelWin. All rights reserved.
      </footer>
    </div>
  );
}
