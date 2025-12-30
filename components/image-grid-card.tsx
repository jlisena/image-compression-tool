"use client";

import React from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFilePreviewUrl } from "@/hooks/useFilePreviewUrl";
import { downloadCompressedImage } from "@/lib/downloadUtils";
import { getFileExtension } from "@/lib/fileUtils";
import type { FileData } from "@/components/dropzone";

interface ImageGridCardProps {
  fileData: FileData;
}

export function ImageGridCard({ fileData }: ImageGridCardProps) {
  const objectUrl = useFilePreviewUrl(fileData.file);
  const ext = getFileExtension(fileData.file.name);
  const fullName = ext ? `${fileData.fileName}.${ext}` : fileData.fileName;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileData.compressedBlob) {
      downloadCompressedImage(fileData.compressedBlob, fileData.file.name);
    }
  };

  return (
    <div className="group relative rounded-xl border-2 bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all overflow-hidden">
      {/* Avatar section with gray background */}
      <div className="bg-muted/50 p-3 pb-2">
        <div className="relative mx-auto w-fit">
          <Avatar className="h-16 w-16 rounded-lg overflow-hidden">
            {objectUrl ? (
              <AvatarImage src={objectUrl} alt={fileData.fileName} className="object-cover w-full h-full" />
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
          {fileData.compressedBlob && !fileData.isCompressing && (
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
      <div className="p-3 pt-2">
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
          <p className="text-[10px] text-muted-foreground text-center">Compressing...</p>
        ) : fileData.compressedBlob ? (
          <p className="text-[10px] text-center">
            <span className="text-muted-foreground">{fileData.fileSize}</span>
            <span className="text-muted-foreground mx-1">→</span>
            <span className="text-muted-foreground">{fileData.newFileSize}</span>
            <span className="font-semibold text-green-600 dark:text-green-400 ml-1">
              (-{fileData.newFilePercent})
            </span>
          </p>
        ) : (
          <p className="text-[10px] text-muted-foreground text-center">{fileData.fileSize}</p>
        )}
      </div>
    </div>
  );
}
