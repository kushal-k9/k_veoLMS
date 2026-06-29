// Reusable file-upload control. Renders a button that opens the file picker,
// uploads via /uploads, and calls back with the resulting public URL.
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useUpload } from "@/hooks/useUpload";
import { getApiErrorMessage } from "@/lib/api/client";
import type { UploadResult } from "@/lib/endpoints/uploads.endpoints";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

export function FileUpload({
  accept,
  label = "Upload",
  onUploaded,
  size = "sm",
  variant = "outline",
}: {
  accept?: string;
  label?: string;
  onUploaded: (result: UploadResult) => void;
  size?: "sm" | "default";
  variant?: "outline" | "secondary" | "ghost";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUpload();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-uploading the same file
    if (!file) return;
    upload.mutate(file, {
      onSuccess: (res) => {
        onUploaded(res);
        toast.success("File uploaded");
      },
      onError: (err) => toast.error(getApiErrorMessage(err, "Upload failed")),
    });
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
      <Button
        type="button"
        size={size}
        variant={variant}
        onClick={() => inputRef.current?.click()}
        disabled={upload.isPending}
      >
        {upload.isPending ? (
          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
        ) : (
          <Upload className="mr-1.5 h-4 w-4" />
        )}
        {label}
      </Button>
    </>
  );
}
