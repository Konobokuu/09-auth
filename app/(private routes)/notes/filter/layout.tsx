import type { ReactNode } from "react";
import css from "./layout.module.css";

export default function NotesFilterLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className={css.layout}>
      {sidebar}
      <div className={css.content}>{children}</div>
    </div>
  );
}
