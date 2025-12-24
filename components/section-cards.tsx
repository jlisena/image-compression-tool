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
interface FileData {
  file: File;
  fileName: string;
  fileType: string;
  fileSize: string;
  newFilePercent: string;
  newFileSize: string;
}

interface SectionCardsProps {
  fileData: FileData;
}

export function SectionCards({ fileData }: SectionCardsProps) {
  const objectUrl = useFilePreviewUrl(fileData.file);
  
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-1 @5xl/main:grid-cols-1">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar>
              {objectUrl ? (
                <AvatarImage src={objectUrl} alt={fileData.fileName} />
              ) : null}
              <AvatarFallback>N/A</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-xl">
                {fileData.fileName}
              </CardTitle>
              <div className="flex items-center gap-4">
                <Badge variant="default">
                  {fileData.fileType}
                </Badge>
                <CardDescription>
                  {fileData.fileSize}
                </CardDescription>
              </div>
            </div>
          </div>
          <CardAction className="flex items-center gap-4">
            <div className="text-right">
              <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-xl">
                {fileData.newFilePercent}
              </CardTitle>
              <CardDescription>
                {fileData.newFileSize}
              </CardDescription>
            </div>
            <Button variant="positive">
              <IconFileDownloadFilled/>
              Download
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}
