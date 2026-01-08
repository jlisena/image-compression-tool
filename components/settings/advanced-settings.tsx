"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ImageQualitySettings } from "@/components/settings/image-quality";
import { ResizeImageSettings } from "@/components/settings/resize-image";
import { TrimBorder } from "@/components/settings/trim-border";
import { DimensionPadding } from "@/components/settings/even-dimensions";

interface AdvancedSettingsProps {
  imageQualityEnabled: boolean;
  onImageQualityEnabledChange: (enabled: boolean) => void;
  imageQuality: number;
  onImageQualityChange: (quality: number) => void;
  trimBorderEnabled: boolean;
  onTrimBorderEnabledChange: (enabled: boolean) => void;
  trimBorderMode: "transparency" | "white" | "both";
  onTrimBorderModeChange: (mode: "transparency" | "white" | "both") => void;
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
  trimBorderEnabled,
  onTrimBorderEnabledChange,
  trimBorderMode,
  onTrimBorderModeChange,
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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="advanced">
        <AccordionTrigger className="text-base font-bold">
          Advanced Settings
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4 space-y-4">
            <ImageQualitySettings
              imageQualityEnabled={imageQualityEnabled}
              onImageQualityEnabledChange={onImageQualityEnabledChange}
              imageQuality={imageQuality}
              onImageQualityChange={onImageQualityChange}
            />
            <Separator />
            <TrimBorder
              trimBorderEnabled={trimBorderEnabled}
              onTrimBorderEnabledChange={onTrimBorderEnabledChange}
              trimBorderMode={trimBorderMode}
              onTrimBorderModeChange={onTrimBorderModeChange}
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
