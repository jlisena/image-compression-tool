import type { CompressionResult } from "@/hooks/useCompressionUpload";
import { getFileNameWithoutExt, getFileExtension } from "./fileUtils";

/**
 * Download a single compressed image
 */
export function downloadCompressedImage(
  blob: Blob,
  originalFileName: string
): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = originalFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate unique filename if duplicates exist
 */
function getUniqueFileName(name: string, existingNames: Set<string>): string {
  if (!existingNames.has(name)) {
    return name;
  }
  
  const baseName = getFileNameWithoutExt(name);
  const ext = getFileExtension(name);
  let counter = 2;
  let newName = `${baseName}-v${counter}.${ext}`;
  
  while (existingNames.has(newName)) {
    counter++;
    newName = `${baseName}-v${counter}.${ext}`;
  }
  
  return newName;
}

/**
 * Download all compressed images as a ZIP file
 */
export async function downloadBatchAsZip(
  results: CompressionResult[]
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const usedNames = new Set<string>();

  results.forEach((result) => {
    if (result.compressedFileBlob) {
      const originalName = result.originalFile.name;
      const uniqueName = getUniqueFileName(originalName, usedNames);
      usedNames.add(uniqueName);
      zip.file(uniqueName, result.compressedFileBlob);
    }
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "compressed-images.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
