"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface ResizeImageProps {
  resizeImageWidth: number | null;
  onResizeImageWidthChange: (width: number | null) => void;
}

export function ResizeImage({
  resizeImageWidth,
  onResizeImageWidthChange,
}: ResizeImageProps) {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value ? parseInt(e.target.value) : null;
    onResizeImageWidthChange(newWidth);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium whitespace-nowrap">
        Width (px):
      </label>
      <Input
        type="number"
        min="1"
        value={resizeImageWidth || ""}
        onChange={handleWidthChange}
        placeholder="Auto"
        className="w-20 h-8"
      />
    </div>
  );
}

interface ResizeImageSettingsProps {
  resizeImageEnabled: boolean;
  onResizeImageEnabledChange: (enabled: boolean) => void;
  resizeImageWidth: number | null;
  onResizeImageWidthChange: (width: number | null) => void;
}

export function ResizeImageSettings({
  resizeImageEnabled,
  onResizeImageEnabledChange,
  resizeImageWidth,
  onResizeImageWidthChange,
}: ResizeImageSettingsProps) {
  return (
    <div className="pl-4">
      <div className="flex items-center gap-3">
        <Switch
          checked={resizeImageEnabled}
          onCheckedChange={onResizeImageEnabledChange}
        />
        <label
          className={
            resizeImageEnabled ? "text-sm font-bold" : "text-sm font-medium"
          }
        >
          Resize Image
        </label>
      </div>
      {resizeImageEnabled && (
        <div className="pl-11 mt-3 p-3 bg-muted/40 rounded-md">
          <ResizeImage
            resizeImageWidth={resizeImageWidth}
            onResizeImageWidthChange={onResizeImageWidthChange}
          />
        </div>
      )}
    </div>
  );
}
