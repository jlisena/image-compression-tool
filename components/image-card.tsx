import React from "react";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { IconFileDownloadFilled } from "@tabler/icons-react"
import { useFilePreviewUrl } from "@/hooks/useFilePreviewUrl"
import { downloadCompressedImage } from "@/lib/imageCompressor"

interface FileData {
  file: File;
  fileName: string;
  fileType: string;
  fileSize: string;
  newFilePercent?: string;
  newFileSize?: string;
  compressedBlob?: Blob;
  isCompressing?: boolean;
}

interface ImageCardProps {
  fileData: FileData;
}

export function ImageCard({ fileData }: ImageCardProps) {
  const objectUrl = useFilePreviewUrl(fileData.file);
  
  const handleDownload = () => {
    if (fileData.compressedBlob) {
      downloadCompressedImage(fileData.compressedBlob, fileData.file.name);
    }
  };

  return (
    <>
      <Card className="@container/card">
        <CardHeader className="flex flex-wrap items-center gap-2 justify-between py-3 px-4">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
            <Avatar className="h-10 w-10 flex-shrink-0">
              {objectUrl ? (
                <AvatarImage src={objectUrl} alt={fileData.fileName} />
              ) : null}
              <AvatarFallback>N/A</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-semibold truncate">
                {fileData.fileName}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-1 mt-0.5">
                <Badge variant="default" className="flex-shrink-0 text-xs">
                  {fileData.fileType}
                </Badge>
                <CardDescription className="text-xs">
                  {fileData.fileSize}
                </CardDescription>
              </div>
              {(fileData.isCompressing || fileData.compressedBlob) && (
                <div className="mt-2 w-full">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    {fileData.isCompressing ? (
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          animation: "progress-bar 2s ease-in-out forwards",
                        }}
                      />
                    ) : (
                      <div className="h-full w-full rounded-full bg-green-500" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {fileData.isCompressing ? "Compressing..." : "Complete"}
                  </p>
                </div>
              )}
            </div>
          </div>
          {!fileData.isCompressing && (
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <div className="text-right">
                <div className="text-base font-semibold leading-tight">
                  {fileData.newFilePercent}
                </div>
                <div className="text-xs text-muted-foreground">
                  {fileData.newFileSize}
                </div>
              </div>
              <Button variant="positive" onClick={handleDownload} disabled={!fileData.compressedBlob} size="sm">
                <IconFileDownloadFilled className="h-3.5 w-3.5"/>
                Download
              </Button>
            </div>
          )}
        </CardHeader>
      </Card>

      <style>{`
        @keyframes progress-bar {
          0% { width: 0%; }
          50% { width: 60%; }
          100% { width: 85%; }
        }
      `}</style>
    </>
  )
}
