"use client";

import { Upload, X, Download, AlertCircle } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn, formatFileSize } from "@/lib/utils";
import { QualitySlider } from "@/components/quality-slider";
import { ImageGridCard } from "@/components/image-grid-card";
import { useCompressionUpload } from "@/hooks/useCompressionUpload";
import { getFileNameWithoutExt } from "@/lib/fileUtils";
import { downloadBatchAsZip } from "@/lib/downloadUtils";

export interface FileData {
  id: string;
  file: File;
  fileName: string;
  fileType: string;
  fileSize: string;
  newFilePercent?: string;
  newFileSize?: string;
  compressedBlob?: Blob;
  isCompressing?: boolean;
}

export function FileUpload() {
  const [quality, setQuality] = React.useState(75);
  const { compressionResults, errors, handleDrop, isCompressing, clearResults } = useCompressionUpload(quality);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: handleDrop,
    noClick: true,
    noDrag: isCompressing,
  });

  const filesList: FileData[] = compressionResults.map((result) => ({
    id: result.id,
    file: result.originalFile,
    fileName: getFileNameWithoutExt(result.originalFile.name),
    fileType: result.originalFile.type.toUpperCase().split("/")[1], 
    fileSize: formatFileSize(result.originalSize),
    newFilePercent: result.compressionRatio ? `${(result.compressionRatio).toFixed(0)}%` : '--', 
    newFileSize: result.compressedSize ? formatFileSize(result.compressedSize) : '--',
    compressedBlob: result.compressedBlob,
    isCompressing: result.isCompressing,
  }));

  const completedCount = compressionResults.filter((r) => r.compressedBlob).length;
  const allComplete = completedCount === compressionResults.length && compressionResults.length > 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-3xl">
        <CardContent className="p-6">
          {/* Top action buttons */}
          <div className="flex justify-center gap-3 mb-4">
            <Button variant="positive" onClick={open} disabled={isCompressing} className="leading-none">
              <Upload className="h-4 w-4" />
              <span className="leading-none">Upload</span>
            </Button>
            <Button variant="destructive" onClick={clearResults} disabled={filesList.length === 0} className="leading-none">
              <X className="h-4 w-4" />
              <span className="leading-none">Clear</span>
            </Button>
          </div>

          {/* Quality slider */}
          <QualitySlider quality={quality} onQualityChange={setQuality} />

          {/* Dropzone area */}
          <div
            {...getRootProps()}
            className={cn(
              "relative rounded-lg border-2 border-dashed transition-colors duration-200 min-h-[180px] mt-4",
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25",
              filesList.length === 0 && "flex items-center justify-center"
            )}
          >
            <input {...getInputProps()} />
            
            {filesList.length === 0 ? (
              <p className="text-lg font-medium text-primary/60">
                Drop images here
              </p>
            ) : (
              <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filesList.map((fileData) => (
                  <ImageGridCard key={fileData.id} fileData={fileData} />
                ))}
              </div>
            )}
          </div>

          {/* Download All button */}
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => downloadBatchAsZip(compressionResults)}
              disabled={!allComplete}
              className="relative leading-none"
            >
              <Download className="h-4 w-4" />
              <span className="leading-none">Download All</span>
              {compressionResults.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-background text-foreground text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center border-2 border-primary">
                  {completedCount}
                </span>
              )}
            </Button>
          </div>

          {/* Error alert */}
          {errors.length > 0 && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                <ul className="space-y-1">
                  {errors.map((error, idx) => (
                    <li key={idx}>• {error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
