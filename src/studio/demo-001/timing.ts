// Single source of timing for picture AND sound (imported by
// scripts/studio/demo-001/synth-score.mts). Keep this file to erasable TS only
// (no enums/namespaces) so Node can run it with native type stripping.

export const FPS = 30;
export const TOTAL_FRAMES = 450;

// Scene cut frames; last entry is the end of the video.
export const CUTS = [0, 75, 165, 255, 330, 390, 450] as const;

export const SCENE = {
  hook: {from: 0, duration: 75},
  offer: {from: 75, duration: 90},
  formats: {from: 165, duration: 90},
  source: {from: 255, duration: 75},
  revision: {from: 330, duration: 60},
  endCard: {from: 390, duration: 60},
} as const;

// Micro cues (absolute frames). Hits on CUTS are the loud ones; these sit ~14 dB lower.
export const CUES = {
  // Hook word pops ("launch", "deserves", "motion.")
  wordTicks: [3, 6, 9],
  // Offer: chart bars start growing
  barBlips: [96, 100, 104, 108],
  // Formats: reflow swish window
  reflowSwish: [190, 210],
  // Source: key taps while code rows type on
  keyTaps: [262, 266, 270, 274, 278, 282],
  // Source: value edited -> preview recolours
  colorPop: 295,
  // Revision: check mark completes
  chime: 352,
} as const;

// ---------- Audio delivery ----------
// Remotion 4.0.438 encodes AAC to ADTS and stream-copies it into the MP4, so the
// encoder priming lands in-band with no edit list. Measured on this pipeline by
// cross-correlating the decoded MP4 against score.wav: exactly 2048 samples
// (42.67 ms) late. scripts/studio/demo-001/finalize-audio.sh remuxes losslessly
// with this negative offset so the MP4 edit list skips the priming.
export const AUDIO_SAMPLE_RATE = 48000;
export const AAC_PRIMING_SAMPLES = 2048;
