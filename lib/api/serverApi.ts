import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { AxiosResponse } from "axios";

export interface ServerFetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
  cookie?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const withCookie = (cookie?: string) =>
  cookie
    ? {
        headers: {
          Cookie: cookie,
        },
      }
    : {};

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
  cookie,
}: ServerFetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
      ...(tag && tag !== "all" ? { tag } : {}),
    },
    ...withCookie(cookie),
  });

  return response.data;
};

export const fetchNoteById = async (
  id: string,
  cookie?: string,
): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`, withCookie(cookie));
  return response.data;
};

export const checkSession = async (
  cookie?: string,
): Promise<AxiosResponse<User | null>> => {
  const response = await api.get<User | null>(
    "/auth/session",
    withCookie(cookie),
  );
  return response;
};

export const getMe = async (cookie?: string): Promise<User> => {
  const response = await api.get<User>("/users/me", withCookie(cookie));
  return response.data;
};
