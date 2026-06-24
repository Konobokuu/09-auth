"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/store/authStore";
import { logout } from "../../lib/api/clientApi";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const { clearIsAuthenticated, isAuthenticated, user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push("/sign-in");
    } catch {
      console.error("Logout failed");
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
            Login
          </Link>
        </li>
        <li className={css.navigationItem}>
          <Link
            href="/sign-up"
            prefetch={false}
            className={css.navigationLink}
          >
            Register
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button
          onClick={handleLogout}
          className={css.logoutButton}
          type="button"
        >
          Logout
        </button>
      </li>
    </>
  );
}
