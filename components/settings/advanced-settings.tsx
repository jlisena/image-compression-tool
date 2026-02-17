"use client";

import { Power, PowerOff, RotateCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
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
  advancedSettingsEnabled: boolean;
  onAdvancedSettingsEnabledChange: (enabled: boolean) => void;
  onRestoreDefaults: () => void;
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
  advancedSettingsEnabled,
  onAdvancedSettingsEnabledChange,
  onRestoreDefaults,
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
      <Separator className="my-4" />
      <Collapsible open={advancedSettingsEnabled}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Toggle
              pressed={advancedSettingsEnabled}
              onPressedChange={onAdvancedSettingsEnabledChange}
              className={`${
                advancedSettingsEnabled
                  ? "!bg-green-100 hover:!bg-green-200 !text-green-700"
                  : "!bg-red-100 hover:!bg-red-200 !text-red-700"
              }`}
            >
              {advancedSettingsEnabled ? (
                <Power className="h-4 w-4" />
              ) : (
                <PowerOff className="h-4 w-4" />
              )}
            </Toggle>
            <div className="text-base font-bold">Advanced Settings</div>
          </div>
          {advancedSettingsEnabled && (
            <button
              onClick={onRestoreDefaults}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Restore Defaults</span>
            </button>
          )}
        </div>
        <CollapsibleContent>
          <Separator className="my-4" />
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
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
