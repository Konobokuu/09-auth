import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist in NoteHub.",
  openGraph: {
    title: "Page not found",
    description: "The page you are looking for does not exist in NoteHub.",
    url: "https://08-zustand.vercel.app/not-found",
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
    <main>
      <div>
        <h1>404</h1>
        <p>Sorry, this page does not exist.</p>
        <Link href="/">
          Go home
        </Link>
      </div>
    </main>
  );
}
