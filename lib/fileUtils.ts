/**
 * Get filename without extension
 * @example getFileNameWithoutExt("image.png") -> "image"
 */
export function getFileNameWithoutExt(filename: string): string {
  return filename.split(".").slice(0, -1).join(".") || filename;
}

/**
 * Get file extension
 * @example getFileExtension("image.png") -> "png"
 */
export function getFileExtension(filename: string): string {
  return filename.split(".").pop() || "";
}

/**
 * Format bytes to human-readable file size
 * @example formatFileSize(1048576) -> "1.0 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // B and KB: 0 decimals, MB and GB: 2 decimals
  const decimals = unitIndex <= 1 ? 0 : 2;
  return `${size.toFixed(decimals)} ${units[unitIndex]}`;
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

/**
 * Validate a file for compression
 * @param file The file to validate
 * @param evenDimensions Whether even dimensions padding is enabled
 * @returns Error message if invalid, null if valid
 */
export function validateFile(
  file: File,
): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `${file.name}: Invalid file type. Only JPEG, PNG, WebP, AVIF, and GIF are allowed.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `${file.name}: File size exceeds 5MB limit.`;
  }
  return null;
}
