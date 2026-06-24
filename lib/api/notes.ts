import type { AxiosResponse } from "axios";
import type { NewNoteData, Note } from "../../types/note";
import { api } from "./api";

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNoteParams = NewNoteData;

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const queryParams: Record<string, string | number> = {
    page: params.page,
    perPage: params.perPage,
  };

  if (params.search) {
    queryParams.search = params.search;
  }

  if (params.tag) {
    queryParams.tag = params.tag;
  }

  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: queryParams,
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: CreateNoteParams): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
};
