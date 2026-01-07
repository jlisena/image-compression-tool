"use client";

import { Slider } from "@/components/ui/slider";

interface CompressionQualityProps {
  quality: number;
  onQualityChange: (quality: number) => void;
}

export function CompressionQuality({
  quality,
  onQualityChange,
}: CompressionQualityProps) {
  return (
    <div className="space-y-3 mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Current Quality:</label>
          <span className="text-sm font-semibold text-primary">{quality}%</span>
        </div>
      </div>
      <div className="max-w-xs">
        <Slider
          min={50}
          max={90}
          step={1}
          value={[quality]}
          onValueChange={(value) => onQualityChange(value[0])}
        />
      </div>
    </div>
  );
}
