"use client";

import React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { ImageCard } from "@/components/compression/image-card";
import type { FileData } from "@/components/compression/compression-card";

interface DropzoneProps {
  onDrop: (files: File[]) => void;
  isCompressing: boolean;
  filesList: FileData[];
}

export function Dropzone({ onDrop, isCompressing, filesList }: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noDrag: isCompressing,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative rounded-lg border-2 border-dashed transition-colors duration-200 min-h-[180px] my-6",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25",
        filesList.length === 0 && "flex items-center justify-center"
      )}
    >
      <input {...getInputProps()} id="file-input" />

      {filesList.length === 0 ? (
        <p className="text-lg font-medium text-primary/60">Drop images here</p>
      ) : (
        <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filesList.map((fileData) => (
            <ImageCard key={fileData.id} fileData={fileData} />
          ))}
        </div>
      )}
    </div>
  );
}
