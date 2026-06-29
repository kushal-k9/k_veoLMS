// Upload hook: posts a single file and returns its public URL + detected type.
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/lib/endpoints/uploads.endpoints";

export function useUpload() {
  return useMutation({ mutationFn: (file: File) => uploadFile(file) });
}
