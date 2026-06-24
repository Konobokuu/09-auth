"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "../../../lib/api/clientApi";
import { useAuthStore } from "../../../lib/store/authStore";
import css from "../../../components/SignInForm/SignInForm.module.css";

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const user = await login({ email, password });
      setUser(user);
      router.push("/profile");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to log in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className={css.input}
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className={css.input}
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </div>

        <div className={css.actions}>
          <button
            className={css.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>

      <p className={css.hint}>
        Do not have an account?{" "}
        <Link className={css.link} href="/sign-up">
          Register
        </Link>
      </p>
    </main>
  );
}
