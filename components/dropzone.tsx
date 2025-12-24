"use client";

import { File, Download } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, formatFileSize } from "@/lib/utils";
import { ImageCard } from "@/components/image-card"
import { QualitySlider } from "@/components/quality-slider";
import { useCompressionUpload } from "@/hooks/useCompressionUpload";
import { downloadBatchAsZip } from "@/lib/imageCompressor";

export function FileUpload() {
  const [quality, setQuality] = React.useState(75);
  const { compressionResults, errors, handleDrop, isCompressing, clearResults } = useCompressionUpload(quality);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    noClick: isCompressing,
    noDrag: isCompressing,
  });

  const filesList = compressionResults.map((result) => ({
    id: result.id,
    file: result.originalFile,
    fileName: result.originalFile.name.split('.').slice(0, -1).join('.'),
    fileType: result.originalFile.type.toUpperCase().split("/")[1], 
    fileSize: formatFileSize(result.originalSize),
    newFilePercent: result.compressionRatio ? `${(result.compressionRatio).toFixed(0)}%` : '--', 
    newFileSize: result.compressedSize ? formatFileSize(result.compressedSize) : '--',
    compressedBlob: result.compressedBlob,
    isCompressing: result.isCompressing,
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-2xl">
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full">
              
              <div className="font-medium mt-6">
                File(s) upload
              </div>
              <div
                {...getRootProps()}
                className={cn(
                  isDragActive
                    ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                    : "border-border",
                  "mt-2 flex justify-center rounded-md border border-dashed px-6 py-20 transition-colors duration-200"
                )}
              >
                <div>
                  <File
                    className="mx-auto h-12 w-12 text-muted-foreground/80"
                    aria-hidden={true}
                  />
                  <div className="mt-4 flex text-muted-foreground">
                    <p>Drag and drop or</p>
                    <label
                      htmlFor="file"
                      className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:text-primary/80 hover:underline hover:underline-offset-4"
                    >
                      <span>choose file(s)</span>
                      <input
                        {...getInputProps()}
                        id="file-upload-2"
                        name="file-upload-2"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">to upload</p>
                  </div>
                </div>
              </div>
              <QualitySlider quality={quality} onQualityChange={setQuality} />
              <p className="mt-2 text-sm leading-5 text-muted-foreground sm:flex sm:items-center sm:justify-between">
                <span>Supported formats: JPEG, PNG, WebP, AVIF</span>
                <span className="pl-1 sm:pl-0">Max. size per file: 50MB</span>
              </p>
              {errors.length > 0 && (
                <div className="mt-3 rounded-md bg-destructive/10 p-3">
                  <p className="text-sm font-medium text-destructive">Upload failed:</p>
                  <ul className="mt-2 space-y-1 text-sm text-destructive/90">
                    {errors.map((error, idx) => (
                      <li key={idx}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
            </div>
          </div>
        </CardContent>
      </Card>
      {filesList.length > 0 && (
        <Card className="w-full mt-6">
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Compressed Images</h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => downloadBatchAsZip(compressionResults)}
                  disabled={!compressionResults.every((r) => r.compressedBlob)}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download All
                </Button>
                <Button
                  onClick={clearResults}
                  variant="outline"
                >
                  Clear All
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {filesList.map((fileData) => (
                <ImageCard key={fileData.id} fileData={fileData} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
