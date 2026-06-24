import type { Metadata } from "next";
import css from "./NotFound.module.css";

const pageUrl = "https://notehub.com/not-found";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description:
    "The NoteHub page you are looking for does not exist or may have been moved.",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description:
      "This NoteHub page does not exist. Return to the notes list or home page.",
    url: pageUrl,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub page not found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
