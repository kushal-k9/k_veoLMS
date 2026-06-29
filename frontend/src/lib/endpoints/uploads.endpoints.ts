// File upload API (course assets: image / pdf / video).
import { api } from "@/lib/api/client";

export interface UploadResult {
  url: string;
  filename: string;
  type: "image" | "pdf" | "video";
  size: number;
  name: string;
}

export async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post("/uploads", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data as UploadResult;
}
