"use client";

import { Upload, X, Download, AlertCircle } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/fileUtils";
import { AdvancedSettings } from "@/components/settings/advanced-settings";
import { Dropzone } from "@/components/compression/dropzone";
import { useCompressionUpload } from "@/hooks/useCompressionUpload";
import { getFileNameWithoutExt } from "@/lib/fileUtils";
import { downloadBatchAsZip } from "@/lib/downloadUtils";

export interface FileData {
  fileId: string;
  originalFile: File;
  originalFileName: string;
  originalFileType: string;
  originalFileSize: string;
  compressedPercent?: string;
  compressedFileSize?: string;
  compressedFileBlob?: Blob;
  isCompressing?: boolean;
}

export function CompressionCard() {
  const [imageQualityEnabled, setImageQualityEnabled] = React.useState(false);
  const [imageQuality, setImageQuality] = React.useState(75);
  const [trimBorderEnabled, setTrimBorderEnabled] = React.useState(false);
  const [trimBorderMode, setTrimBorderMode] = React.useState<
    "transparency" | "white" | "both"
  >("transparency");
  const [resizeImageEnabled, setResizeImageEnabled] = React.useState(false);
  const [resizeImageWidth, setResizeImageWidth] = React.useState<number | null>(
    null
  );
  const [evenDimensionsEnabled, setEvenDimensionsEnabled] =
    React.useState(false);
  const [evenDimensionsPaddingWidth, setEvenDimensionsPaddingWidth] =
    React.useState<"left" | "right">("left");
  const [evenDimensionsPaddingHeight, setEvenDimensionsPaddingHeight] =
    React.useState<"top" | "bottom">("bottom");
  const {
    compressionFileResults,
    compressionErrors,
    handleFilesDrop,
    isCompressing,
    clearCompressionResults,
  } = useCompressionUpload(
    imageQualityEnabled ? imageQuality : 75,
    trimBorderEnabled,
    trimBorderMode,
    resizeImageEnabled,
    resizeImageWidth,
    evenDimensionsEnabled,
    evenDimensionsPaddingWidth,
    evenDimensionsPaddingHeight
  );

  const filesList: FileData[] = compressionFileResults.map((result) => ({
    fileId: result.fileId,
    originalFile: result.originalFile,
    originalFileName: getFileNameWithoutExt(result.originalFile.name),
    originalFileType: result.originalFile.type.toUpperCase().split("/")[1],
    originalFileSize: formatFileSize(result.originalFileSize),
    compressedPercent: result.compressedRatio
      ? `${result.compressedRatio.toFixed(0)}%`
      : "--",
    compressedFileSize: result.compressedFileSize
      ? formatFileSize(result.compressedFileSize)
      : "--",
    compressedFileBlob: result.compressedFileBlob,
    isCompressing: result.isCompressing,
  }));

  const completedCount = compressionFileResults.filter(
    (r) => r.compressedFileBlob
  ).length;
  const allComplete =
    completedCount === compressionFileResults.length &&
    compressionFileResults.length > 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-3xl">
        <CardContent className="p-6">
          {/* Top action buttons */}
          <div className="flex justify-center gap-3 mb-6">
            <Button
              variant="positive"
              onClick={() => document.getElementById("file-input")?.click()}
              disabled={isCompressing}
              className="leading-none"
            >
              <Upload className="h-4 w-4" />
              <span className="leading-none">Upload</span>
            </Button>
            <Button
              variant="destructive"
              onClick={clearCompressionResults}
              disabled={filesList.length === 0}
              className="leading-none"
            >
              <X className="h-4 w-4" />
              <span className="leading-none">Clear</span>
            </Button>
          </div>

          {/* Dropzone component */}
          <Dropzone
            onDrop={handleFilesDrop}
            isCompressing={isCompressing}
            filesList={filesList}
          />

          {/* Download All button */}
          <div className="flex justify-center my-6">
            <Button
              onClick={() => downloadBatchAsZip(compressionFileResults)}
              disabled={!allComplete}
              className="relative leading-none"
            >
              <Download className="h-4 w-4" />
              <span className="leading-none">Download All</span>
              {compressionFileResults.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-background text-foreground text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center border-2 border-primary">
                  {completedCount}
                </span>
              )}
            </Button>
          </div>

          {/* Error alert */}
          {compressionErrors.length > 0 && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                <ul className="space-y-1">
                  {compressionErrors.map((error, idx) => (
                    <li key={idx}>• {error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Advanced Settings Accordion */}
          <AdvancedSettings
            imageQualityEnabled={imageQualityEnabled}
            onImageQualityEnabledChange={setImageQualityEnabled}
            imageQuality={imageQuality}
            onImageQualityChange={setImageQuality}
            trimBorderEnabled={trimBorderEnabled}
            onTrimBorderEnabledChange={setTrimBorderEnabled}
            trimBorderMode={trimBorderMode}
            onTrimBorderModeChange={setTrimBorderMode}
            resizeImageEnabled={resizeImageEnabled}
            onResizeImageEnabledChange={setResizeImageEnabled}
            resizeImageWidth={resizeImageWidth}
            onResizeImageWidthChange={setResizeImageWidth}
            evenDimensionsEnabled={evenDimensionsEnabled}
            onEvenDimensionsEnabledChange={setEvenDimensionsEnabled}
            evenDimensionsPaddingWidth={evenDimensionsPaddingWidth}
            onEvenDimensionsPaddingWidthChange={setEvenDimensionsPaddingWidth}
            evenDimensionsPaddingHeight={evenDimensionsPaddingHeight}
            onEvenDimensionsPaddingHeightChange={setEvenDimensionsPaddingHeight}
          />
        </CardContent>
      </Card>
    </div>
  );
}
