export interface CompressionResult {
  id: string;
  originalFile: File;
  compressedBlob?: Blob;
  originalSize: number;
  compressedSize?: number;
  compressionRatio?: number;
  isCompressing?: boolean;
}

export function downloadCompressedImage(
  blob: Blob,
  originalFileName: string
): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const nameWithoutExt = originalFileName.split(".").slice(0, -1).join(".");
  const ext = originalFileName.split(".").pop();
  link.href = url;
  link.download = `${nameWithoutExt}-compressed.${ext}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadBatchAsZip(
  results: CompressionResult[]
): Promise<void> {
  // Dynamically import jszip
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  // Add each compressed image to the zip
  results.forEach((result) => {
    if (result.compressedBlob) {
      const nameWithoutExt = result.originalFile.name
        .split(".")
        .slice(0, -1)
        .join(".");
      const ext = result.originalFile.name.split(".").pop();
      const fileName = `${nameWithoutExt}-compressed.${ext}`;
      zip.file(fileName, result.compressedBlob);
    }
  });

  // Generate and download the zip
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
