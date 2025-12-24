"use client";

import React from "react";

interface QualitySliderProps {
  quality: number;
  onQualityChange: (quality: number) => void;
}

export function QualitySlider({ quality, onQualityChange }: QualitySliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Compression Quality</label>
        <span className="text-sm font-semibold text-primary">{quality}</span>
      </div>
      <input
        type="range"
        min="50"
        max="90"
        value={quality}
        onChange={(e) => onQualityChange(parseInt(e.target.value))}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <p className="text-xs text-muted-foreground">Higher quality = larger file size</p>
    </div>
  );
}
