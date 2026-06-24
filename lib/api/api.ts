import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL === "http://localhost:3000"
    ? "http://localhost:3000/api"
    : "https://notehub-api.goit.study";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

