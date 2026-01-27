"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TrimImageProps {
  trimImageEnabled: boolean;
  onTrimImageEnabledChange: (enabled: boolean) => void;
  trimImageMode: "transparency" | "white" | "both";
  onTrimImageModeChange: (mode: "transparency" | "white" | "both") => void;
}

export function TrimImage({
  trimImageEnabled,
  onTrimImageEnabledChange,
  trimImageMode,
  onTrimImageModeChange,
}: TrimImageProps) {
  return (
    <div className="space-y-2 pl-4">
      <div className="flex items-center gap-3">
        <Switch
          checked={trimImageEnabled}
          onCheckedChange={onTrimImageEnabledChange}
        />
        <label
          className={
            trimImageEnabled ? "text-sm font-bold" : "text-sm font-medium"
          }
        >
          Trim Image
        </label>
        <InfoTooltip content="Remove unnecessary transparent or white borders around your image. Useful for cleaning up exported graphics." />
      </div>
      {trimImageEnabled && (
        <div className="mt-3 pl-11 p-3 bg-muted/60 rounded-md">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium whitespace-nowrap">
              Mode:
            </label>
            <Select value={trimImageMode} onValueChange={onTrimImageModeChange}>
              <SelectTrigger className="w-35">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transparency">Transparency</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
