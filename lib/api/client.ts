import axios from "axios";

const API_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (!token) {
    throw new Error("Missing NEXT_PUBLIC_NOTEHUB_TOKEN environment variable");
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
