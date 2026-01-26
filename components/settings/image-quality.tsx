"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface ImageQualityProps {
  imageQuality: number;
  onImageQualityChange: (quality: number) => void;
}

export function ImageQuality({
  imageQuality,
  onImageQualityChange,
}: ImageQualityProps) {
  return (
    <div className="space-y-3 mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Current Quality:</label>
          <span className="text-sm font-semibold text-primary">
            {imageQuality}%
          </span>
        </div>
      </div>
      <div className="max-w-xs">
        <Slider
          min={1}
          max={100}
          step={1}
          value={[imageQuality]}
          onValueChange={(value) => onImageQualityChange(value[0])}
        />
      </div>
    </div>
  );
}

interface ImageQualitySettingsProps {
  imageQualityEnabled: boolean;
  onImageQualityEnabledChange: (enabled: boolean) => void;
  imageQuality: number;
  onImageQualityChange: (quality: number) => void;
}

export function ImageQualitySettings({
  imageQualityEnabled,
  onImageQualityEnabledChange,
  imageQuality,
  onImageQualityChange,
}: ImageQualitySettingsProps) {
  return (
    <div className="pl-4">
      <div className="flex items-center gap-3">
        <Switch
          checked={imageQualityEnabled}
          onCheckedChange={onImageQualityEnabledChange}
        />
        <label
          className={
            imageQualityEnabled ? "text-sm font-bold" : "text-sm font-medium"
          }
        >
          Image Quality
        </label>
      </div>
      {imageQualityEnabled && (
        <div className="pl-11 mt-3 p-3 bg-muted/40 rounded-md">
          <ImageQuality
            imageQuality={imageQuality}
            onImageQualityChange={onImageQualityChange}
          />
        </div>
      )}
    </div>
  );
}
