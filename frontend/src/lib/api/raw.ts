// A bare axios instance WITHOUT auth/refresh interceptors. Used for the refresh
// and csrf-token calls themselves to avoid interceptor recursion.
import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export const rawApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
