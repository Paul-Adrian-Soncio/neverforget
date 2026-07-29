export interface FilterPreset {
  id: string;
  name: string;
  css: string;
}

// Every filter below lists the SAME functions in the SAME order
// (grayscale, sepia, saturate, brightness, contrast, hue-rotate), using
// identity values (0, 0%, 1, 1, 1, 0deg) where a look doesn't need them.
// Browsers can only animate between filter lists that match in function
// name and order, so keeping a fixed shape lets every preset transition
// smoothly out of the "developing" state instead of snapping instantly.
function buildFilter({
  grayscale = 0,
  sepia = 0,
  saturate = 1,
  brightness = 1,
  contrast = 1,
  hueRotate = 0,
}: {
  grayscale?: number;
  sepia?: number;
  saturate?: number;
  brightness?: number;
  contrast?: number;
  hueRotate?: number;
} = {}) {
  return `grayscale(${grayscale}) sepia(${sepia}) saturate(${saturate}) brightness(${brightness}) contrast(${contrast}) hue-rotate(${hueRotate}deg)`;
}

export const DEVELOPING_FILTER = buildFilter({
  saturate: 0,
  brightness: 2.8,
  contrast: 0.4,
});

export const FILTER_PRESETS: FilterPreset[] = [
  {
    id: "original",
    name: "Original",
    css: buildFilter(),
  },
  {
    id: "faded",
    name: "Faded",
    css: buildFilter({ sepia: 0.25, saturate: 0.75, brightness: 1.08, contrast: 0.92 }),
  },
  {
    id: "sunbleached",
    name: "Sunbleached",
    css: buildFilter({ sepia: 0.4, saturate: 0.6, brightness: 1.15, contrast: 0.85, hueRotate: -5 }),
  },
  {
    id: "amber",
    name: "Amber",
    css: buildFilter({ sepia: 0.5, saturate: 1.2, brightness: 0.98, contrast: 1.05, hueRotate: -8 }),
  },
  {
    id: "dusk",
    name: "Dusk",
    css: buildFilter({ saturate: 0.7, brightness: 0.85, contrast: 1.15, hueRotate: -15 }),
  },
  {
    id: "vintage",
    name: "Vintage",
    css: buildFilter({ sepia: 0.35, saturate: 0.85, brightness: 1.02, contrast: 1.1, hueRotate: -3 }),
  },
  {
    id: "noir",
    name: "Noir",
    css: buildFilter({ grayscale: 1, contrast: 1.2, brightness: 0.95 }),
  },
  {
    id: "warmglow",
    name: "Warm Glow",
    css: buildFilter({ sepia: 0.2, saturate: 1.35, brightness: 1.05, contrast: 1.05, hueRotate: -6 }),
  },
  {
    id: "coldsnap",
    name: "Cold Snap",
    css: buildFilter({ saturate: 0.8, brightness: 1.05, contrast: 1.08, hueRotate: 12 }),
  },
];

export function getFilterById(id: string): FilterPreset {
  return FILTER_PRESETS.find((f) => f.id === id) ?? FILTER_PRESETS[0];
}
