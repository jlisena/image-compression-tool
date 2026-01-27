"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { ImageQualitySettings } from "@/components/settings/image-quality";
import { ResizeImageSettings } from "@/components/settings/resize-image";
import { TrimImage } from "@/components/settings/trim-image";
import { DimensionPadding } from "@/components/settings/even-dimensions";
import { AppendFilename } from "@/components/settings/append-filename";
import {
  CompressionLogs,
  type CompressionLog,
} from "@/components/settings/compression-logs";

interface AdvancedSettingsProps {
  imageQualityEnabled: boolean;
  onImageQualityEnabledChange: (enabled: boolean) => void;
  imageQuality: number;
  onImageQualityChange: (quality: number) => void;
  trimImageEnabled: boolean;
  onTrimImageEnabledChange: (enabled: boolean) => void;
  trimImageMode: "transparency" | "white" | "both";
  onTrimImageModeChange: (mode: "transparency" | "white" | "both") => void;
  resizeImageEnabled: boolean;
  onResizeImageEnabledChange: (enabled: boolean) => void;
  resizeImageMode: "manual" | "percentage";
  onResizeImageModeChange: (mode: "manual" | "percentage") => void;
  resizeImageWidth: number | null;
  onResizeImageWidthChange: (width: number | null) => void;
  resizeImageHeight: number | null;
  onResizeImageHeightChange: (height: number | null) => void;
  resizeImagePercentage: number | null;
  onResizeImagePercentageChange: (percentage: number | null) => void;
  evenDimensionsEnabled: boolean;
  onEvenDimensionsEnabledChange: (enabled: boolean) => void;
  evenDimensionsMode: "add" | "remove";
  onEvenDimensionsModeChange: (mode: "add" | "remove") => void;
  evenDimensionsPaddingWidth: "left" | "right";
  onEvenDimensionsPaddingWidthChange: (position: "left" | "right") => void;
  evenDimensionsPaddingHeight: "top" | "bottom";
  onEvenDimensionsPaddingHeightChange: (position: "top" | "bottom") => void;
  appendFilenameEnabled: boolean;
  onAppendFilenameEnabledChange: (enabled: boolean) => void;
  appendFilenameText: string;
  onAppendFilenameTextChange: (text: string) => void;
  compressionLogs?: CompressionLog[];
}

export function AdvancedSettings({
  imageQualityEnabled,
  onImageQualityEnabledChange,
  imageQuality,
  onImageQualityChange,
  trimImageEnabled,
  onTrimImageEnabledChange,
  trimImageMode,
  onTrimImageModeChange,
  resizeImageEnabled,
  onResizeImageEnabledChange,
  resizeImageMode,
  onResizeImageModeChange,
  resizeImageWidth,
  onResizeImageWidthChange,
  resizeImageHeight,
  onResizeImageHeightChange,
  resizeImagePercentage,
  onResizeImagePercentageChange,
  evenDimensionsEnabled,
  onEvenDimensionsEnabledChange,
  evenDimensionsMode,
  onEvenDimensionsModeChange,
  evenDimensionsPaddingWidth,
  onEvenDimensionsPaddingWidthChange,
  evenDimensionsPaddingHeight,
  onEvenDimensionsPaddingHeightChange,
  appendFilenameEnabled,
  onAppendFilenameEnabledChange,
  appendFilenameText,
  onAppendFilenameTextChange,
  compressionLogs = [],
}: AdvancedSettingsProps) {
  return (
    <>
      <div className="text-base font-bold">Advanced Settings</div>
      <div className="pt-4 space-y-4">
        <ImageQualitySettings
          imageQualityEnabled={imageQualityEnabled}
          onImageQualityEnabledChange={onImageQualityEnabledChange}
          imageQuality={imageQuality}
          onImageQualityChange={onImageQualityChange}
        />
        <Separator />
        <TrimImage
          trimImageEnabled={trimImageEnabled}
          onTrimImageEnabledChange={onTrimImageEnabledChange}
          trimImageMode={trimImageMode}
          onTrimImageModeChange={onTrimImageModeChange}
        />
        <Separator />
        <ResizeImageSettings
          resizeImageEnabled={resizeImageEnabled}
          onResizeImageEnabledChange={onResizeImageEnabledChange}
          resizeImageMode={resizeImageMode}
          onResizeImageModeChange={onResizeImageModeChange}
          resizeImageWidth={resizeImageWidth}
          onResizeImageWidthChange={onResizeImageWidthChange}
          resizeImageHeight={resizeImageHeight}
          onResizeImageHeightChange={onResizeImageHeightChange}
          resizeImagePercentage={resizeImagePercentage}
          onResizeImagePercentageChange={onResizeImagePercentageChange}
        />
        <Separator />
        <DimensionPadding
          evenDimensionsEnabled={evenDimensionsEnabled}
          onEvenDimensionsEnabledChange={onEvenDimensionsEnabledChange}
          evenDimensionsMode={evenDimensionsMode}
          onEvenDimensionsModeChange={onEvenDimensionsModeChange}
          evenDimensionsPaddingWidth={evenDimensionsPaddingWidth}
          onEvenDimensionsPaddingWidthChange={
            onEvenDimensionsPaddingWidthChange
          }
          evenDimensionsPaddingHeight={evenDimensionsPaddingHeight}
          onEvenDimensionsPaddingHeightChange={
            onEvenDimensionsPaddingHeightChange
          }
        />
        <Separator />
        <AppendFilename
          appendFilenameEnabled={appendFilenameEnabled}
          onAppendFilenameEnabledChange={onAppendFilenameEnabledChange}
          appendFilenameText={appendFilenameText}
          onAppendFilenameTextChange={onAppendFilenameTextChange}
        />
        <Separator />
        <CompressionLogs logs={compressionLogs} />
      </div>
    </>
  );
}
