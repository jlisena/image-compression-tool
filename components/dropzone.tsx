"use client";

import { File } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SectionCards } from "@/components/section-cards"

export function FileUpload() {
  const [files, setFiles] = React.useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) =>
      setFiles((prevFiles) => {
        const existing = new Set(prevFiles.map(f => f.name + f.size));
        const newFiles = acceptedFiles.filter(f => !existing.has(f.name + f.size));
        return [...prevFiles, ...newFiles];
      }),
  });

  const filesList = files.map((file) => ({
    file,
    fileName: file.name.split('.').slice(0, -1).join('.'),
    fileType: file.type.toUpperCase().split("/")[1], 
    fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`, 
    newFilePercent: "~77%", 
    newFileSize: `${(file.size / 1024).toFixed(2)} KB`, 
  }));

  return (
    <div className="items-center justify-center">
      <Card className="sm:mx-auto sm:max-w-xl">
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="font-medium">
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
              <p className="mt-2 text-sm leading-5 text-muted-foreground sm:flex sm:items-center sm:justify-between">
                <span>All file types are allowed to upload.</span>
                <span className="pl-1 sm:pl-0">Max. size per file: 50MB</span>
              </p>
              
            </div>
          </div>
        </CardContent>
      </Card>
      {filesList.length > 0 && (
        <div>
          <ul role="list" className="mt-4 space-y-4">
            {filesList.map((fileData) => (
              <li key={fileData.file.name + fileData.file.size}>
                <SectionCards fileData={fileData} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
