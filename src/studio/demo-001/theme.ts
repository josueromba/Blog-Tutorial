import type React from 'react';
import {Easing, interpolate, staticFile, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';

// ---------- Fonts: Inter (OFL-1.1) bundled from public/, unique family name ----------
// A unique name means a failed load falls back to a visibly different font
// instead of the system-installed Inter. loadFont() uses delayRender/cancelRender.
export const FONT_FAMILY = 'StudioInter';
export const FONT = `${FONT_FAMILY}, sans-serif`;

loadFont({family: FONT_FAMILY, url: staticFile('studio/demo-001/fonts/StudioInter-Medium.otf'), weight: '500'});
loadFont({family: FONT_FAMILY, url: staticFile('studio/demo-001/fonts/StudioInter-Bold.otf'), weight: '700'});
loadFont({family: FONT_FAMILY, url: staticFile('studio/demo-001/fonts/StudioInter-ExtraBold.otf'), weight: '800'});

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

/** Rise + fade. Full opacity at start + 0.7*dur, settled ("landed") at start + dur. */
export const reveal = (frame: number, start: number, dur = 10, dist = 40): React.CSSProperties => ({
  opacity: interpolate(frame, [start, start + dur * 0.7], [0, 1], CLAMP),
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
