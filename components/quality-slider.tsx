"use client";

import { Slider } from "@/components/ui/slider";

interface QualitySliderProps {
  quality: number;
  onQualityChange: (quality: number) => void;
}

export function QualitySlider({ quality, onQualityChange }: QualitySliderProps) {
  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Compression Quality</label>
        <span className="text-sm font-semibold text-primary">{quality}%</span>
      </div>
      <Slider
        min={50}
        max={90}
        step={1}
        value={[quality]}
        onValueChange={(value) => onQualityChange(value[0])}
      />
      <p className="text-xs text-muted-foreground">Higher quality = larger file size</p>
    </div>
  );
}
