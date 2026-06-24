"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data, isPending, isError, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isPending && <p>Loading note...</p>}

      {isError && <p>{(error as Error).message || "Failed to load note."}</p>}

      {!isPending && !isError && data && (
        <article>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <p>Tag: {data.tag}</p>
          <p>Created: {new Date(data.createdAt).toLocaleString()}</p>
        </article>
      )}
    </Modal>
  );
}
