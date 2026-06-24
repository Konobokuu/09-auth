"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "../../lib/api/clientApi";
import { useAuthStore } from "../../lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await checkSession();

        if (session?.success === false) {
          throw new Error("No active session");
        }

        const user = await getMe();
        setUser(user);
      } catch {
        clearIsAuthenticated();
      }
    };

    checkAuth();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
