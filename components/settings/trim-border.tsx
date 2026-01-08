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

interface TrimBorderProps {
  trimBorderEnabled: boolean;
  onTrimBorderEnabledChange: (enabled: boolean) => void;
  trimBorderMode: "transparency" | "white" | "both";
  onTrimBorderModeChange: (mode: "transparency" | "white" | "both") => void;
}

export function TrimBorder({
  trimBorderEnabled,
  onTrimBorderEnabledChange,
  trimBorderMode,
  onTrimBorderModeChange,
}: TrimBorderProps) {
  return (
    <div className="space-y-2 pl-4">
      <div className="flex items-center gap-3">
        <Switch
          checked={trimBorderEnabled}
          onCheckedChange={onTrimBorderEnabledChange}
        />
        <label
          className={
            trimBorderEnabled ? "text-sm font-bold" : "text-sm font-medium"
          }
        >
          Trim Border
        </label>
      </div>
      {trimBorderEnabled && (
        <div className="mt-3 pl-11 p-3 bg-muted/60 rounded-md">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium whitespace-nowrap">
              Mode:
            </label>
            <Select
              value={trimBorderMode}
              onValueChange={onTrimBorderModeChange}
            >
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
