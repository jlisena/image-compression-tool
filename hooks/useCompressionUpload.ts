"use client";

import React from "react";
import { type CompressionResult } from "@/lib/imageCompressor";
import { validateFile } from "@/lib/validationConfig";

export function useCompressionUpload(quality: number = 75) {
  const [compressionResults, setCompressionResults] = React.useState<CompressionResult[]>([]);
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

    try {
      const results = await Promise.all(
        validFiles.map(async (file) => {
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

          return {
            originalFile: file,
            compressedBlob,
            originalSize,
            compressedSize,
            compressionRatio: parseFloat(compressionRatio),
            isCompressing: false,
            id: pendingResults[validFiles.indexOf(file)].id,
          } as CompressionResult;
        })
      );

      // Replace pending results with completed results
      setCompressionResults((prev) => {
        const updated = [...prev];
        const pendingStartIdx = updated.length - validFiles.length;
        validFiles.forEach((file, i) => {
          updated[pendingStartIdx + i] = results[i];
        });
        return updated;
      });
    } catch (error) {
      console.error("Compression error:", error);
      setErrors([
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ]);
      // Remove pending results on error
      setCompressionResults((prev) =>
        prev.slice(0, prev.length - validFiles.length)
      );
    }
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
