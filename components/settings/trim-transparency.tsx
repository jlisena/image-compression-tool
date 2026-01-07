"use client";

import { Switch } from "@/components/ui/switch";

interface TrimTransparencyProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
}

export function TrimTransparency({
  enabled,
  onEnabledChange,
}: TrimTransparencyProps) {
  return (
    <div className="flex items-center gap-3">
      <Switch checked={enabled} onCheckedChange={onEnabledChange} />
      <label className="text-sm font-medium">Trim Transparency</label>
    </div>
  );
}
