"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import { createNote, type CreateNoteParams } from "../../lib/api/clientApi";
import { initialDraft, useNoteDraftStore } from "../../lib/store/noteStore";
import css from "./NoteForm.module.css";

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const draft = useNoteDraftStore((state) => state.draft);
  const setDraft = useNoteDraftStore((state) => state.setDraft);
  const clearDraft = useNoteDraftStore((state) => state.clearDraft);

  const createNoteMutation = useMutation({
    mutationFn: (values: CreateNoteParams) => createNote(values),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });

  const currentDraft = draft ?? initialDraft;

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...currentDraft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as CreateNoteParams;
    createNoteMutation.mutate(values);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={currentDraft.title}
          minLength={3}
          maxLength={50}
          required
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={currentDraft.content}
          maxLength={500}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={currentDraft.tag}
          required
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
          <option value="Ideas">Ideas</option>
          <option value="Travel">Travel</option>
          <option value="Finance">Finance</option>
          <option value="Health">Health</option>
          <option value="Important">Important</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
