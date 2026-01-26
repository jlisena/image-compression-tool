"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Input } from "@/components/ui/input";

interface AppendFilenameProps {
  appendFilenameEnabled: boolean;
  onAppendFilenameEnabledChange: (enabled: boolean) => void;
  appendFilenameText: string;
  onAppendFilenameTextChange: (text: string) => void;
}

export function AppendFilename({
  appendFilenameEnabled,
  onAppendFilenameEnabledChange,
  appendFilenameText,
  onAppendFilenameTextChange,
}: AppendFilenameProps) {
  return (
    <div className="space-y-2 pl-4">
      <div className="flex items-center gap-3">
        <Switch
          checked={appendFilenameEnabled}
          onCheckedChange={onAppendFilenameEnabledChange}
        />
        <label
          className={
            appendFilenameEnabled ? "text-sm font-bold" : "text-sm font-medium"
          }
        >
          Append Filename
        </label>
        <InfoTooltip content="Add a suffix to the filename when downloading. For example, entering '-2x' will rename 'image.png' to 'image-2x.png'." />
      </div>
      {appendFilenameEnabled && (
        <div className="mt-3 pl-11 p-3 bg-muted/60 rounded-md">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium whitespace-nowrap">
              Suffix:
            </label>
            <Input
              type="text"
              value={appendFilenameText}
              onChange={(e) => onAppendFilenameTextChange(e.target.value)}
              placeholder="e.g., -2x"
              className="w-21"
            />
          </div>
        </div>
      )}
    </div>
  );
}
