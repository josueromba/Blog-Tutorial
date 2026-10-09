import type React from 'react';
import {Easing, interpolate, useVideoConfig} from 'remotion';
import {FONT_FAMILY} from './fonts';

// ---------- Fonts: see ./fonts.ts (useStudioFonts) ----------
export {FONT_FAMILY};
export const FONT = `${FONT_FAMILY}, sans-serif`;

// ---------- Palette ----------
export const C = {
  ink: '#0B0D17',
  surface: '#171B2E',
  stroke: '#2A3050',
  paper: '#F5F3EE',
  coral: '#FF6B4A',
  violet: '#7C5CFF',
  mint: '#3DDC97',
} as const;

// ---------- Format / safe area ----------
export const useFormat = () => {
  const {width, height} = useVideoConfig();
  const portrait = height > width;
  return {
    portrait,
    width,
    height,
    // 8% safe margins
    mx: Math.round(width * 0.08),
    my: Math.round(height * 0.08),
  };
};

// ---------- Motion helpers ----------
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const CLAMP = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Rise + fade. ~30% visible at `start`, full opacity at start + 0.7*dur, settled ("landed") at start + dur. */
export const reveal = (frame: number, start: number, dur = 10, dist = 40): React.CSSProperties => ({
  // Opacity ramp starts 3 frames early so a cut never lands on an empty frame.
  opacity: interpolate(frame, [start - 3, start + dur * 0.7], [0, 1], CLAMP),
  translate: `0px ${interpolate(frame, [start, start + dur], [dist, 0], {...CLAMP, easing: EASE})}px`,
});

export const headline = (size: number): React.CSSProperties => ({
  fontFamily: FONT,
  fontWeight: 800,
  fontSize: size,
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  color: C.paper,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
});
