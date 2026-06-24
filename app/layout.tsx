import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import "./globals.css";

const siteUrl = "https://notehub.com";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NoteHub",
  description:
    "NoteHub is a simple application for creating, searching, and organizing personal notes.",
  openGraph: {
    title: "NoteHub",
    description:
      "Create, search, and organize personal notes in one clean workspace.",
    url: siteUrl,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub application preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
