import { api } from "./api";
import type { AxiosResponse } from "axios";
import type { User } from "../../types/user";
import { cookies } from "next/headers";

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  return cookieString;
};

export const fetchNotes = async (params: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}) => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get("/notes", {
    params,
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response.data;
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response;
};

export const getMe = async () => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response.data;
};
