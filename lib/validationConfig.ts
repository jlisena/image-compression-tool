export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `${file.name}: Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `${file.name}: File size exceeds 50MB limit.`;
  }
  return null;
}
