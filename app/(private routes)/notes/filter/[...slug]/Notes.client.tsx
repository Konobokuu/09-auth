"use client";

import { useState } from "react";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../../components/Pagination/Pagination";
import NoteList from "../../../../../components/NoteList/NoteList";
import { fetchNotes } from "../../../../../lib/api/clientApi";
import type { NoteTag } from "../../../../../types/note";
import css from "../../../../../components/App/App.module.css";

const PER_PAGE = 12;

export interface NotesClientProps {
  tag?: NoteTag;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(0);
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSetSearch(value);
  };

  const {
    data: notesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page: page + 1,
        perPage: PER_PAGE,
        search: debouncedSearch || undefined,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  const notes = notesData?.notes ?? [];
  const pageCount = notesData?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {pageCount > 1 && (
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageChange}
            forcePage={page}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      {isLoading && <p className={css.status}>Loading notes...</p>}
      {isError && (
        <p className={css.error}>
          {error instanceof Error ? error.message : "Failed to load notes."}
        </p>
      )}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
};

export default NotesClient;
