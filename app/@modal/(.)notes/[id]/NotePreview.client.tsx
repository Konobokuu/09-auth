"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "../../../../components/Modal/Modal";
import { fetchNoteById } from "../../../../lib/api/clientApi";
import css from "../../../../components/NotePreview/NotePreview.module.css";

export interface NotePreviewClientProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
  const router = useRouter();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const closeModal = () => {
    router.back();
  };

  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{note?.title ?? "Note preview"}</h2>
          <button
            type="button"
            className={css.closeButton}
            onClick={closeModal}
            aria-label="Close modal"
          >
            x
          </button>
        </div>

        {isLoading && <p className={css.content}>Loading note...</p>}
        {isError && (
          <p className={css.content}>
            {error instanceof Error ? error.message : "Failed to load note."}
          </p>
        )}
        {note && (
          <>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
