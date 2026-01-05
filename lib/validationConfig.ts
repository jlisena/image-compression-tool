export const MAX_FILE_SIZE = 2.5 * 1024 * 1024; // 2.5MB
export const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `${file.name}: Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `${file.name}: File size exceeds 2.5MB limit.`;
  }
  return null;
}
