"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface ResizeImageProps {
  resizeImageWidth: number | null;
  onResizeImageWidthChange: (width: number | null) => void;
  resizeImageHeight: number | null;
  onResizeImageHeightChange: (height: number | null) => void;
}

export function ResizeImage({
  resizeImageWidth,
  onResizeImageWidthChange,
  resizeImageHeight,
  onResizeImageHeightChange,
}: ResizeImageProps) {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value ? parseInt(e.target.value) : null;
    onResizeImageWidthChange(newWidth);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value ? parseInt(e.target.value) : null;
    onResizeImageHeightChange(newHeight);
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
      <label className="text-sm font-medium whitespace-nowrap">
        Height (px):
      </label>
      <Input
        type="number"
        min="1"
        value={resizeImageHeight || ""}
        onChange={handleHeightChange}
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
  resizeImageHeight: number | null;
  onResizeImageHeightChange: (height: number | null) => void;
}

export function ResizeImageSettings({
  resizeImageEnabled,
  onResizeImageEnabledChange,
  resizeImageWidth,
  onResizeImageWidthChange,
  resizeImageHeight,
  onResizeImageHeightChange,
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
            resizeImageHeight={resizeImageHeight}
            onResizeImageHeightChange={onResizeImageHeightChange}
          />
        </div>
      )}
    </div>
  );
}
