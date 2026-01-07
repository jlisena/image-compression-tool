import { useEffect, useState } from "react";

/**
 * Creates a preview URL for a given File object and cleans it up automatically. It's used in image-card.tsx to display the thumbnail preview of each compressed image.
 */

export function usePreviewUrl(file: File | null): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return url;
}
