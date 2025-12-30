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
