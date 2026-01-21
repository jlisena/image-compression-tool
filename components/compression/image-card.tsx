"use client";

import React from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreviewUrl } from "@/hooks/usePreviewUrl";
import { downloadCompressedImage } from "@/lib/downloadUtils";
import { getFileExtension } from "@/lib/fileUtils";
import type { FileData } from "@/components/compression/compression-card";

interface ImageCardProps {
  fileData: FileData;
}

export function ImageCard({ fileData }: ImageCardProps) {
  const objectUrl = usePreviewUrl(fileData.originalFile);
  const ext = getFileExtension(fileData.originalFile.name);
  const fullName = ext ? `${fileData.originalFileName}.${ext}` : fileData.originalFileName;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileData.compressedFileBlob) {
      downloadCompressedImage(fileData.compressedFileBlob, fileData.originalFile.name);
    }
  };

  // Determine color and sign for compression ratio
  const getPercentageDisplay = () => {
    if (!fileData.compressedPercent)
      return { text: "--", color: "text-muted-foreground" };

    const percent = parseFloat(fileData.compressedPercent);

    if (percent > 0) {
      // Positive = compression success (file got smaller)
      return {
        text: `-${fileData.compressedPercent}`,
        color: "text-green-600 dark:text-green-400",
      };
    } else if (percent < 0) {
      // Negative = file size increased
      return {
        text: `+${Math.abs(percent)}`,
        color: "text-red-600 dark:text-red-400",
      };
    } else {
      // Zero = no change
      return { text: "0%", color: "text-blue-600 dark:text-blue-400" };
    }
  };

  const percentageDisplay = getPercentageDisplay();

  return (
    <div className="group relative rounded-xl border-2 bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all overflow-hidden">
      {/* Avatar section with gray background */}
      <div className="bg-muted/50 p-3 pb-2">
        <div className="relative mx-auto w-fit">
          <Avatar className="h-16 w-16 rounded-lg overflow-hidden">
            {objectUrl ? (
              <AvatarImage
                src={objectUrl}
                alt={fileData.originalFileName}
                className="object-cover w-full h-full"
              />
            ) : null}
            <AvatarFallback className="rounded-lg text-xs">IMG</AvatarFallback>
          </Avatar>

          {/* Loading spinner overlay */}
          {fileData.isCompressing && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          )}

          {/* Download button - always visible, centered on avatar */}
          {fileData.compressedFileBlob && !fileData.isCompressing && (
            <Button
              size="icon"
              onClick={handleDownload}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-md shadow-lg border-2 border-background bg-sky-500 hover:bg-sky-600 text-white"
            >
              <Download className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Content section */}
      <div className="px-2 pb-2 pt-1">
        {/* Filename */}
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-[11px] font-medium text-center mb-1 truncate w-full cursor-default">
              {fullName}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{fullName}</p>
          </TooltipContent>
        </Tooltip>

        {/* Status / stats */}
        {fileData.isCompressing ? (
          <p className="text-[10px] text-muted-foreground text-center">
            Compressing...
          </p>
        ) : fileData.compressedFileBlob ? (
          <p className="text-[10px] text-center">
            <span className="text-muted-foreground">{fileData.originalFileSize}</span>
            <span className="text-muted-foreground mx-1">→</span>
            <span className="text-muted-foreground">
              {fileData.compressedFileSize}
            </span>
            <span className={`font-semibold ml-1 ${percentageDisplay.color}`}>
              ({percentageDisplay.text})
            </span>
          </p>
        ) : (
          <p className="text-[10px] text-muted-foreground text-center">
            {fileData.originalFileSize}
          </p>
        )}
      </div>
    </div>
  );
}
