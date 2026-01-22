"use client";

import React from "react";
import { validateFile } from "@/lib/fileUtils";

export interface CompressionResult {
  fileId: string;
  originalFile: File;
  compressedFileBlob?: Blob;
  originalFileSize: number;
  compressedFileSize?: number;
  compressedRatio?: number;
  isCompressing?: boolean;
}

export function useCompressionUpload(
  imageQuality: number = 75,
  trimBorderEnabled: boolean = false,
  trimBorderMode: "transparency" | "white" | "both" = "transparency",
  resizeImageEnabled: boolean = false,
  resizeImageWidth: number | null = null,
  evenDimensionsEnabled: boolean = false,
  evenDimensionsPaddingWidth: "left" | "right" = "left",
  evenDimensionsPaddingHeight: "top" | "bottom" = "bottom"
) {
  const [compressionFileResults, setCompressionFileResults] = React.useState<
    CompressionResult[]
  >([]);
  const [compressionErrors, setCompressionErrors] = React.useState<string[]>([]);

  const handleFilesDrop = async (acceptedFiles: File[]) => {
    setCompressionErrors([]);

    // Validate files
    const validationErrors: string[] = [];
    const validFiles: File[] = [];

    acceptedFiles.forEach((file) => {
      const error = validateFile(file, evenDimensionsEnabled);
      if (error) {
        validationErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (validationErrors.length > 0) {
      setCompressionErrors(validationErrors);
    }

    if (validFiles.length === 0) return;

    // Add pending results with isCompressing flag
    const pendingResults: CompressionResult[] = validFiles.map((file) => ({
      fileId: `${Date.now()}-${Math.random()}`,
      originalFile: file,
      originalFileSize: file.size,
      isCompressing: true,
    }));

    setCompressionFileResults((prev) => [...prev, ...pendingResults]);

    // Process each file individually and update state as it completes
    validFiles.forEach((file, index) => {
      const pendingId = pendingResults[index].fileId;

      (async () => {
        try {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("imageQuality", imageQuality.toString());
          formData.append("trimBorderEnabled", trimBorderEnabled.toString());
          if (trimBorderEnabled) {
            formData.append("trimBorderMode", trimBorderMode);
          }
          formData.append("resizeImageEnabled", resizeImageEnabled.toString());
          if (resizeImageWidth)
            formData.append("resizeImageWidth", resizeImageWidth.toString());
          formData.append(
            "evenDimensionsEnabled",
            evenDimensionsEnabled.toString()
          );
          formData.append(
            "evenDimensionsPaddingWidth",
            evenDimensionsPaddingWidth
          );
          formData.append(
            "evenDimensionsPaddingHeight",
            evenDimensionsPaddingHeight
          );

          const response = await fetch("/api/process-image", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Compression failed: ${response.statusText}`);
          }

          const compressedFileBlob = await response.blob();
          const compressedFileSize = compressedFileBlob.size;
          const originalFileSize = file.size;
          const compressedRatio = (
            (1 - compressedFileSize / originalFileSize) *
            100
          ).toFixed(2);

          // Update state for this specific file as soon as it completes
          setCompressionFileResults((prev) =>
            prev.map((result) =>
              result.fileId === pendingId
                ? {
                    ...result,
                    compressedFileBlob,
                    originalFileSize,
                    compressedFileSize,
                    compressedRatio: parseFloat(compressedRatio),
                    isCompressing: false,
                  }
                : result
            )
          );
        } catch (error) {
          console.error("Compression error for file:", file.name, error);
          setCompressionErrors((prev) => [
            ...prev,
            `${file.name}: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          ]);
          // Remove this specific pending result on error
          setCompressionFileResults((prev) =>
            prev.filter((result) => result.fileId !== pendingId)
          );
        }
      })();
    });
  };

  const clearCompressionResults = () => {
    setCompressionFileResults([]);
    setCompressionErrors([]);
  };

  const removeCompressionResult = (fileId: string) => {
    setCompressionFileResults((prev) => prev.filter((r) => r.fileId !== fileId));
  };

  return {
    compressionFileResults,
    compressionErrors,
    handleFilesDrop,
    clearCompressionResults,
    removeCompressionResult,
    isCompressing: compressionFileResults.some((r) => r.isCompressing),
  };
}
