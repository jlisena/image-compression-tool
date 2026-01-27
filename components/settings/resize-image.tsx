"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface ResizeImageProps {
  resizeImageMode: "manual" | "percentage";
  onResizeImageModeChange: (mode: "manual" | "percentage") => void;
  resizeImageWidth: number | null;
  onResizeImageWidthChange: (width: number | null) => void;
  resizeImageHeight: number | null;
  onResizeImageHeightChange: (height: number | null) => void;
  resizeImagePercentage: number | null;
  onResizeImagePercentageChange: (percentage: number | null) => void;
}

export function ResizeImage({
  resizeImageMode,
  onResizeImageModeChange,
  resizeImageWidth,
  onResizeImageWidthChange,
  resizeImageHeight,
  onResizeImageHeightChange,
  resizeImagePercentage,
  onResizeImagePercentageChange,
}: ResizeImageProps) {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value ? parseInt(e.target.value) : null;
    onResizeImageWidthChange(newWidth);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value ? parseInt(e.target.value) : null;
    onResizeImageHeightChange(newHeight);
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercentage = e.target.value ? parseInt(e.target.value) : null;
    onResizeImagePercentageChange(newPercentage);
  };

  return (
    <div className="space-y-3">
      <Tabs
        value={resizeImageMode}
        onValueChange={(value) =>
          onResizeImageModeChange(value as "manual" | "percentage")
        }
      >
        <TabsList className="grid grid-cols-[120px_120px] gap-2 rounded-lg border bg-muted">
          <TabsTrigger value="manual">Manual</TabsTrigger>
          <TabsTrigger value="percentage">Percentage</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium whitespace-nowrap w-11">
              Width:
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
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium whitespace-nowrap w-11">
              Height:
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
        </TabsContent>

        <TabsContent value="percentage">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium whitespace-nowrap">
              Percentage:
            </label>
            <Input
              type="number"
              min="1"
              max="400"
              value={resizeImagePercentage || ""}
              onChange={handlePercentageChange}
              placeholder="100"
              className="w-20 h-8"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ResizeImageSettingsProps {
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
}

export function ResizeImageSettings({
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
        <InfoTooltip content="Scale your image up or down. Manual mode: enter one dimension to auto-set the other, or enter both. Percentage mode: scale proportionally." />
      </div>
      {resizeImageEnabled && (
        <div className="pl-11 mt-3 p-3 bg-muted/60 rounded-md">
          <ResizeImage
            resizeImageMode={resizeImageMode}
            onResizeImageModeChange={onResizeImageModeChange}
            resizeImageWidth={resizeImageWidth}
            onResizeImageWidthChange={onResizeImageWidthChange}
            resizeImageHeight={resizeImageHeight}
            onResizeImageHeightChange={onResizeImageHeightChange}
            resizeImagePercentage={resizeImagePercentage}
            onResizeImagePercentageChange={onResizeImagePercentageChange}
          />
        </div>
      )}
    </div>
  );
}
