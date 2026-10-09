// demo-002 single source of timing for picture AND sound (imported by
// scripts/studio/demo-002/synth-score.mts). Erasable TS only.

export const FPS = 30;
export const TOTAL_FRAMES = 450;

// Scene cut frames (each on a 120 BPM bar line); last entry = end of video.
export const CUTS = [0, 60, 120, 180, 240, 300, 360, 450] as const;

export const SCENE = {
  hook: {from: 0, duration: 60},
  dashboards: {from: 60, duration: 60},
  query: {from: 120, duration: 60},
  motion: {from: 180, duration: 60},
  edit: {from: 240, duration: 60},
  beta: {from: 300, duration: 60},
  endCard: {from: 360, duration: 90},
} as const;

// Micro cues (absolute frames), ~14 dB under the cut hits.
export const CUES = {
  lockClick: 12,
  refreshTick: 100,
  click: 138,
  swish: [142, 152],
  keyTaps: [188, 190, 192, 194, 196, 198, 200],
  chipPop: 204,
  previewPop: 210,
  dragTick: 262,
  downloadPop: 272,
  rowTicks: [314, 318],
} as const;
