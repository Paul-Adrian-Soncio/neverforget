export interface FilterPreset {
  id: string;
  name: string;
  css: string;
}

export const FILTER_PRESETS: FilterPreset[] = [
  {
    id: "original",
    name: "Original",
    css: "none",
  },
  {
    id: "faded",
    name: "Faded",
    css: "sepia(0.25) saturate(0.75) brightness(1.08) contrast(0.92)",
  },
  {
    id: "sunbleached",
    name: "Sunbleached",
    css: "sepia(0.4) saturate(0.6) brightness(1.15) contrast(0.85) hue-rotate(-5deg)",
  },
  {
    id: "amber",
    name: "Amber",
    css: "sepia(0.5) saturate(1.2) brightness(0.98) contrast(1.05) hue-rotate(-8deg)",
  },
  {
    id: "dusk",
    name: "Dusk",
    css: "saturate(0.7) brightness(0.85) contrast(1.15) hue-rotate(-15deg)",
  },
  {
    id: "vintage",
    name: "Vintage",
    css: "sepia(0.35) saturate(0.85) brightness(1.02) contrast(1.1) hue-rotate(-3deg)",
  },
  {
    id: "noir",
    name: "Noir",
    css: "grayscale(1) contrast(1.2) brightness(0.95)",
  },
  {
    id: "warmglow",
    name: "Warm Glow",
    css: "sepia(0.2) saturate(1.35) brightness(1.05) contrast(1.05) hue-rotate(-6deg)",
  },
  {
    id: "coldsnap",
    name: "Cold Snap",
    css: "saturate(0.8) brightness(1.05) contrast(1.08) hue-rotate(12deg)",
  },
];

export function getRandomFilter(excludeId?: string): FilterPreset {
  const pool = excludeId
    ? FILTER_PRESETS.filter((f) => f.id !== excludeId)
    : FILTER_PRESETS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getFilterById(id: string): FilterPreset {
  return FILTER_PRESETS.find((f) => f.id === id) ?? FILTER_PRESETS[0];
}
