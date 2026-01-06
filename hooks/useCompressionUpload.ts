"use client";

import React from "react";
import { validateFile } from "@/lib/validationConfig";

export interface CompressionResult {
  id: string;
  originalFile: File;
  compressedBlob?: Blob;
  originalSize: number;
  compressedSize?: number;
  compressionRatio?: number;
  isCompressing?: boolean;
}

export function useCompressionUpload(quality: number = 75) {
  const [compressionResults, setCompressionResults] = React.useState<
    CompressionResult[]
  >([]);
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleDrop = async (acceptedFiles: File[]) => {
    setErrors([]);

    // Validate files
    const validationErrors: string[] = [];
    const validFiles: File[] = [];

    acceptedFiles.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        validationErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    }

    if (validFiles.length === 0) return;

    // Add pending results with isCompressing flag
    const pendingResults: CompressionResult[] = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      originalFile: file,
      originalSize: file.size,
      isCompressing: true,
    }));

    setCompressionResults((prev) => [...prev, ...pendingResults]);

    // Process each file individually and update state as it completes
    validFiles.forEach((file, index) => {
      const pendingId = pendingResults[index].id;

      (async () => {
        try {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("quality", quality.toString());

          const response = await fetch("/api/compress", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Compression failed: ${response.statusText}`);
          }

          const compressedBlob = await response.blob();
          const compressedSize = compressedBlob.size;
          const originalSize = file.size;
          const compressionRatio = (
            (1 - compressedSize / originalSize) *
            100
          ).toFixed(2);

          // Update state for this specific file as soon as it completes
          setCompressionResults((prev) =>
            prev.map((result) =>
              result.id === pendingId
                ? {
                    ...result,
                    compressedBlob,
                    originalSize,
                    compressedSize,
                    compressionRatio: parseFloat(compressionRatio),
                    isCompressing: false,
                  }
                : result
            )
          );
        } catch (error) {
          console.error("Compression error for file:", file.name, error);
          setErrors((prev) => [
            ...prev,
            `${file.name}: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          ]);
          // Remove this specific pending result on error
          setCompressionResults((prev) =>
            prev.filter((result) => result.id !== pendingId)
          );
        }
      })();
    });
  };

  const clearResults = () => {
    setCompressionResults([]);
    setErrors([]);
  };

  return {
    compressionResults,
    errors,
    handleDrop,
    clearResults,
    isCompressing: compressionResults.some((r) => r.isCompressing),
  };
}
