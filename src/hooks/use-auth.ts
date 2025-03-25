import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export const useAuth = () => {
  const { isAuthenticated, login, logout, user, checkAuth, refreshUserData } =
    useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if token is valid
    const isValid = checkAuth();

    // Auto redirect logic
    if (pathname !== "/login" && !isValid) {
      router.push("/login");
    } else if (pathname === "/login" && isValid) {
      router.push("/dashboard");
    }

    // Refresh user data if authenticated
    if (isValid) {
      refreshUserData();
    }
  }, [checkAuth, router, pathname, refreshUserData]);

  return {
    isAuthenticated,
    login,
    logout,
    user,
  };
};

export default useAuth;
