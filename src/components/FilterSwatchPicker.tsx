"use client";

import { FILTER_PRESETS } from "@/lib/filters";

interface FilterSwatchPickerProps {
  imageDataUrl: string;
  filterId: string;
  onSelect: (filterId: string) => void;
}

export default function FilterSwatchPicker({
  imageDataUrl,
  filterId,
  onSelect,
}: FilterSwatchPickerProps) {
  return (
    <div className="w-full max-w-md overflow-x-auto">
      <div className="flex gap-3 px-1 pb-2">
        {FILTER_PRESETS.map((preset) => {
          const active = preset.id === filterId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelect(preset.id)}
              className="flex shrink-0 flex-col items-center gap-1.5"
            >
              <span
                className={`block h-16 w-16 overflow-hidden rounded-sm ring-2 transition-all ${
                  active
                    ? "ring-accent"
                    : "ring-transparent hover:ring-border-warm"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageDataUrl}
                  alt={preset.name}
                  className="h-full w-full object-cover"
                  style={{ filter: preset.css }}
                />
              </span>
              <span
                className={`font-serif text-[10px] uppercase tracking-wide ${
                  active ? "text-accent" : "text-muted"
                }`}
              >
                {preset.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
