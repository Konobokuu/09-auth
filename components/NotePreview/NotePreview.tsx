"use client";

import { useRouter } from "next/navigation";
import type { Note } from "../../types/note";
import Modal from "../Modal/Modal";
import css from "./NotePreview.module.css";

export interface NotePreviewProps {
  note: Note;
}

const NotePreview = ({ note }: NotePreviewProps) => {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
          <button
            type="button"
            className={css.closeButton}
            onClick={() => router.back()}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </Modal>
  );
};

export default NotePreview;
