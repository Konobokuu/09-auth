"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.module.css";

import { fetchNoteById } from "@/lib/api/clientApi";

type NoteDetailsClientProps = {
  noteId: string;
};

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) {
    return <p className={css.container}>Loading...</p>;
  }

  if (isError || !note) {
    return <p className={css.container}>Note not found</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
