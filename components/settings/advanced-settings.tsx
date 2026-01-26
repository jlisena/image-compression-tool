"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { ImageQualitySettings } from "@/components/settings/image-quality";
import { ResizeImageSettings } from "@/components/settings/resize-image";
import { TrimImage } from "@/components/settings/trim-image";
import { DimensionPadding } from "@/components/settings/even-dimensions";

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
  resizeImageWidth: number | null;
  onResizeImageWidthChange: (width: number | null) => void;
  evenDimensionsEnabled: boolean;
  onEvenDimensionsEnabledChange: (enabled: boolean) => void;
  evenDimensionsPaddingWidth: "left" | "right";
  onEvenDimensionsPaddingWidthChange: (position: "left" | "right") => void;
  evenDimensionsPaddingHeight: "top" | "bottom";
  onEvenDimensionsPaddingHeightChange: (position: "top" | "bottom") => void;
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
  resizeImageWidth,
  onResizeImageWidthChange,
  evenDimensionsEnabled,
  onEvenDimensionsEnabledChange,
  evenDimensionsPaddingWidth,
  onEvenDimensionsPaddingWidthChange,
  evenDimensionsPaddingHeight,
  onEvenDimensionsPaddingHeightChange,
}: AdvancedSettingsProps) {
  return (
    <>
      <div className="text-base font-bold">
        Advanced Settings
      </div>
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
            resizeImageWidth={resizeImageWidth}
            onResizeImageWidthChange={onResizeImageWidthChange}
          />
          <Separator />
          <DimensionPadding
            evenDimensionsEnabled={evenDimensionsEnabled}
            onEvenDimensionsEnabledChange={onEvenDimensionsEnabledChange}
            evenDimensionsPaddingWidth={evenDimensionsPaddingWidth}
            onEvenDimensionsPaddingWidthChange={
              onEvenDimensionsPaddingWidthChange
            }
            evenDimensionsPaddingHeight={evenDimensionsPaddingHeight}
            onEvenDimensionsPaddingHeightChange={
              onEvenDimensionsPaddingHeightChange
            }
          />
        </div>
      </>
  );
}
