"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  evenDimensionsMode: "add" | "remove";
  onEvenDimensionsModeChange: (mode: "add" | "remove") => void;
  evenDimensionsPaddingWidth: "left" | "right";
  onEvenDimensionsPaddingWidthChange: (position: "left" | "right") => void;
  evenDimensionsPaddingHeight: "top" | "bottom";
  onEvenDimensionsPaddingHeightChange: (position: "top" | "bottom") => void;
}

export function DimensionPadding({
  evenDimensionsEnabled,
  onEvenDimensionsEnabledChange,
  evenDimensionsMode,
  onEvenDimensionsModeChange,
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
          Even File Dimensions
        </label>
        <InfoTooltip content="Ensures image dimensions are even numbers (divisible by 2). For add mode: adds 1px transparent padding (PNG/WebP/AVIF/static GIF) or white padding (JPEG). For remove mode: removes  1px padding from the specified edges." />
      </div>
      {evenDimensionsEnabled && (
        <div className="space-y-3 mt-3 pl-11 p-3 bg-muted/60 rounded-md">
          <Tabs
            value={evenDimensionsMode}
            onValueChange={(value) =>
              onEvenDimensionsModeChange(value as "add" | "remove")
            }
          >
            <TabsList className="grid grid-cols-[90px_90px] gap-2 rounded-lg border bg-muted">
              <TabsTrigger value="add">Add</TabsTrigger>
              <TabsTrigger value="remove">Remove</TabsTrigger>
            </TabsList>

            <TabsContent value="add" className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium whitespace-nowrap w-11">
                  Width:
                </label>
                <Select
                  value={evenDimensionsPaddingWidth}
                  onValueChange={(value) =>
                    onEvenDimensionsPaddingWidthChange(
                      value as "left" | "right",
                    )
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
                    onEvenDimensionsPaddingHeightChange(
                      value as "top" | "bottom",
                    )
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
            </TabsContent>

            <TabsContent value="remove" className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium whitespace-nowrap w-11">
                  Width:
                </label>
                <Select
                  value={evenDimensionsPaddingWidth}
                  onValueChange={(value) =>
                    onEvenDimensionsPaddingWidthChange(
                      value as "left" | "right",
                    )
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
                    onEvenDimensionsPaddingHeightChange(
                      value as "top" | "bottom",
                    )
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
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
