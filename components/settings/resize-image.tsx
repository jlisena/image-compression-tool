"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface ImageResizeProps {
  width: number | null;
  onWidthChange: (width: number | null) => void;
}

export function ImageResize({ width, onWidthChange }: ImageResizeProps) {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value ? parseInt(e.target.value) : null;
    onWidthChange(newWidth);
  };

  return (
    <div className="flex-1">
      <label className="text-xs font-medium text-muted-foreground mb-1 block">
        Width (px)
      </label>
      <Input
        type="number"
        min="1"
        value={width || ""}
        onChange={handleWidthChange}
        placeholder="Auto"
      />
    </div>
  );
}
