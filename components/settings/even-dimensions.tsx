"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DimensionPaddingProps {
  evenDimensionsEnabled: boolean;
  onEvenDimensionsEnabledChange: (enabled: boolean) => void;
  evenDimensionsPaddingWidth: "left" | "right";
  onEvenDimensionsPaddingWidthChange: (position: "left" | "right") => void;
  evenDimensionsPaddingHeight: "top" | "bottom";
  onEvenDimensionsPaddingHeightChange: (position: "top" | "bottom") => void;
}

export function DimensionPadding({
  evenDimensionsEnabled,
  onEvenDimensionsEnabledChange,
  evenDimensionsPaddingWidth,
  onEvenDimensionsPaddingWidthChange,
  evenDimensionsPaddingHeight,
  onEvenDimensionsPaddingHeightChange,
}: DimensionPaddingProps) {
  return (
    <div className="space-y-4 pl-4">
      <div className="flex items-center gap-3">
        <Switch
          checked={evenDimensionsEnabled}
          onCheckedChange={onEvenDimensionsEnabledChange}
        />
        <label
          className={
            evenDimensionsEnabled ? "text-sm font-bold" : "text-sm font-medium"
          }
        >
          Even File Dimensions (no JPEG)
        </label>
      </div>
      {evenDimensionsEnabled && (
        <div className="space-y-3 mt-3 pl-11 p-3 bg-muted/60 rounded-md">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium whitespace-nowrap w-11">
              Width:
            </label>
            <Select
              value={evenDimensionsPaddingWidth}
              onValueChange={(value) =>
                onEvenDimensionsPaddingWidthChange(value as "left" | "right")
              }
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium whitespace-nowrap w-11">
              Height:
            </label>
            <Select
              value={evenDimensionsPaddingHeight}
              onValueChange={(value) =>
                onEvenDimensionsPaddingHeightChange(value as "top" | "bottom")
              }
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
