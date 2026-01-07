"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { CompressionQuality } from "@/components/settings/compression-quality";
import { ImageResize } from "@/components/settings/resize-image";
import { TrimTransparency } from "@/components/settings/trim-transparency";
import { DimensionPadding } from "@/components/settings/even-dimensions";

interface AdvancedSettingsProps {
  qualityEnabled: boolean;
  onQualityEnabledChange: (enabled: boolean) => void;
  quality: number;
  onQualityChange: (quality: number) => void;
  trimTransparency: boolean;
  onTrimTransparencyChange: (enabled: boolean) => void;
  resizeEnabled: boolean;
  onResizeEnabledChange: (enabled: boolean) => void;
  resizeWidth: number | null;
  onResizeWidthChange: (width: number | null) => void;
  evenDimensions: boolean;
  onEvenDimensionsChange: (enabled: boolean) => void;
  widthPaddingPosition: "left" | "right";
  onWidthPaddingPositionChange: (position: "left" | "right") => void;
  heightPaddingPosition: "top" | "bottom";
  onHeightPaddingPositionChange: (position: "top" | "bottom") => void;
}

export function AdvancedSettings({
  qualityEnabled,
  onQualityEnabledChange,
  quality,
  onQualityChange,
  trimTransparency,
  onTrimTransparencyChange,
  resizeEnabled,
  onResizeEnabledChange,
  resizeWidth,
  onResizeWidthChange,
  evenDimensions,
  onEvenDimensionsChange,
  widthPaddingPosition,
  onWidthPaddingPositionChange,
  heightPaddingPosition,
  onHeightPaddingPositionChange,
}: AdvancedSettingsProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="advanced">
        <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:text-foreground">
          Advanced Settings
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <Switch
                checked={qualityEnabled}
                onCheckedChange={onQualityEnabledChange}
              />
              <label className="text-sm font-medium">Compression Quality</label>
            </div>
            {qualityEnabled && (
              <CompressionQuality
                quality={quality}
                onQualityChange={onQualityChange}
              />
            )}
            <TrimTransparency
              enabled={trimTransparency}
              onEnabledChange={onTrimTransparencyChange}
            />
            <div className="flex items-center gap-3">
              <Switch
                checked={resizeEnabled}
                onCheckedChange={onResizeEnabledChange}
              />
              <label className="text-sm font-medium">Resize Image</label>
            </div>
            {resizeEnabled && (
              <ImageResize
                width={resizeWidth}
                onWidthChange={onResizeWidthChange}
              />
            )}
            <DimensionPadding
              enabled={evenDimensions}
              onEnabledChange={onEvenDimensionsChange}
              widthPaddingPosition={widthPaddingPosition}
              onWidthPaddingPositionChange={onWidthPaddingPositionChange}
              heightPaddingPosition={heightPaddingPosition}
              onHeightPaddingPositionChange={onHeightPaddingPositionChange}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
