// Auth API calls. Each returns the unwrapped `data` payload.
import { api } from "@/lib/api/client";
import { rawApi } from "@/lib/api/raw";
import { getCsrfToken, clearCsrfToken } from "@/lib/api/csrf";
import type { User } from "@/types/api";

export interface AuthResult {
  user: User;
  accessToken: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}
export interface LoginInput {
  email: string;
  password: string;
}
export interface VerifyOtpInput {
  email: string;
  code: string;
}

export async function register(input: RegisterInput) {
  const { data } = await api.post("/auth/register", input);
  return data.data as { email: string; requiresVerification: boolean };
}

export async function verifyOtp(input: VerifyOtpInput) {
  const { data } = await api.post("/auth/verify-otp", input);
  return data.data as AuthResult;
}

export async function resendOtp(email: string) {
  const { data } = await api.post("/auth/resend-otp", { email });
  return data.data;
}

export async function login(input: LoginInput) {
  const { data } = await api.post("/auth/login", input);
  return data.data as AuthResult;
}

export async function googleLogin(credential: string) {
  const { data } = await api.post("/auth/google", { credential });
  return data.data as AuthResult;
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data.data.user as User;
}

export async function logout() {
  const csrf = await getCsrfToken();
  try {
    await rawApi.post("/auth/logout", {}, { headers: { "x-csrf-token": csrf } });
  } finally {
    clearCsrfToken();
  }
}
