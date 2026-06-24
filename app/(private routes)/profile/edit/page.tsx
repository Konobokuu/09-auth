"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateMe } from "../../../../lib/api/clientApi";
import { useAuthStore } from "../../../../lib/store/authStore";
import css from "./EditProfilePage.module.css";

const fallbackAvatar =
  "https://ac.goit.global/fullstack/react/default-avatar.jpg";

const getAvatarSrc = (avatar?: string) =>
  avatar?.startsWith("https://ac.goit.global") ? avatar : fallbackAvatar;

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push("/profile");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to update profile.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={getAvatarSrc(user?.avatar)}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <p>Email: {user?.email ?? ""}</p>
          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
