"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../../lib/api/clientApi";
import css from "./NotePage.module.css";

export interface NoteDetailsClientProps {
  id: string;
}

const NoteDetailsClient = ({ id }: NoteDetailsClientProps) => {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return (
      <main className={css.main}>
        <div className={css.container}>Loading note...</div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={css.main}>
        <div className={css.container}>
          {error instanceof Error ? error.message : "Failed to load note."}
        </div>
      </main>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <article className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </article>
      </div>
    </main>
  );
};

export default NoteDetailsClient;
