import { api } from "./api";
import type { NewNoteData, Note, NoteTag } from "../../types/note";
import type { User } from "../../types/user";

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  username: string;
  email: string;
  avatar: string;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNoteParams = NewNoteData;

export const register = async (credentials: RegisterRequest): Promise<User> => {
  const response = await api.post<AuthResponse>("/auth/register", credentials);
  return response.data;
};

export const login = async (credentials: LoginRequest): Promise<User> => {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const response = await api.get("/auth/session");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const updateMe = async (data: { email?: string; username?: string }) => {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
};

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: CreateNoteParams): Promise<Note> => {
  const response = await api.post<Note>("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
