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
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  widthPaddingPosition: "left" | "right";
  onWidthPaddingPositionChange: (position: "left" | "right") => void;
  heightPaddingPosition: "top" | "bottom";
  onHeightPaddingPositionChange: (position: "top" | "bottom") => void;
}

export function DimensionPadding({
  enabled,
  onEnabledChange,
  widthPaddingPosition,
  onWidthPaddingPositionChange,
  heightPaddingPosition,
  onHeightPaddingPositionChange,
}: DimensionPaddingProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Switch checked={enabled} onCheckedChange={onEnabledChange} />
        <label className="text-sm font-medium">Even Dimensions (no JPEG)</label>
      </div>
      {enabled && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Width Padding</label>
            <Select
              value={widthPaddingPosition}
              onValueChange={(value) =>
                onWidthPaddingPositionChange(value as "left" | "right")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Height Padding</label>
            <Select
              value={heightPaddingPosition}
              onValueChange={(value) =>
                onHeightPaddingPositionChange(value as "top" | "bottom")
              }
            >
              <SelectTrigger>
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
