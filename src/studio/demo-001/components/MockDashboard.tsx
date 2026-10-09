import React from 'react';
import {interpolate} from 'remotion';
import {C, CLAMP} from '../theme';

// Fictional, unbranded SaaS dashboard: shapes only. No text, numbers or logos.

type Rect = readonly [number, number, number, number]; // x, y, w, h in % of the card

const LANDSCAPE = {
  nav: [0, 0, 18, 100],
  tiles: [
    [22, 5, 23, 22],
    [48.5, 5, 23, 22],
    [75, 5, 23, 22],
  ],
  bars: [22, 31, 44, 64],
  line: [68, 31, 30, 64],
} as const;

const PORTRAIT = {
  nav: [0, 0, 100, 9],
  tiles: [
    [4, 13, 29.3, 14],
    [35.3, 13, 29.3, 14],
    [66.6, 13, 29.4, 14],
  ],
  bars: [4, 31, 92, 33],
  line: [4, 67, 92, 29],
} as const;

const lerpRect = (a: Rect, b: Rect, p: number): React.CSSProperties => ({
  position: 'absolute',
  left: `${a[0] + (b[0] - a[0]) * p}%`,
  top: `${a[1] + (b[1] - a[1]) * p}%`,
  width: `${a[2] + (b[2] - a[2]) * p}%`,
  height: `${a[3] + (b[3] - a[3]) * p}%`,
});

const BAR_HEIGHTS = [0.42, 0.6, 0.5, 0.74, 0.64, 0.9];
const LINE_POINTS = [0.72, 0.6, 0.66, 0.44, 0.5, 0.3, 0.22];
const TILE_ACCENT = [C.violet, C.coral, C.mint];

export const MockDashboard: React.FC<{
  readonly width: number;
  readonly height: number;
  /** 0 = landscape layout, 1 = portrait layout */
  readonly p: number;
  /** 0..1 chart bar growth */
  readonly grow: number;
  /** 0..1 line chart draw */
  readonly draw: number;
  /** Optional colour for the main bar series (used for recolour moments) */
  readonly barColor?: string;
  readonly style?: React.CSSProperties;
}> = ({width, height, p, grow, draw, barColor = C.violet, style}) => {
  const radius = Math.max(10, Math.min(width, height) * 0.035);
  const pad = Math.max(4, Math.min(width, height) * 0.018);
  const navIsTop = p > 0.5;
  const lineW = LANDSCAPE.line[2] + (PORTRAIT.line[2] - LANDSCAPE.line[2]) * p;
  const lineH = LANDSCAPE.line[3] + (PORTRAIT.line[3] - LANDSCAPE.line[3]) * p;
  const lw = ((width - 6) * lineW * 0.84) / 100;
  const lh = ((height - 6) * lineH * 0.76) / 100;
  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        borderRadius: radius,
        backgroundColor: C.surface,
        border: `3px solid ${C.stroke}`,
        boxSizing: 'border-box',
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
        ...style,
      }}
    >
      {/* nav: sidebar (landscape) -> top bar (portrait) */}
      <div style={{...lerpRect(LANDSCAPE.nav, PORTRAIT.nav, p), backgroundColor: '#11142A'}}>
        {/* round avatar-ish dot, no logo */}
        <div
          style={{
            position: 'absolute',
            left: navIsTop ? '4%' : '22%',
            top: navIsTop ? '25%' : '5%',
            width: navIsTop ? height * 0.045 : width * 0.05,
            height: navIsTop ? height * 0.045 : width * 0.05,
            borderRadius: '50%',
            backgroundColor: C.violet,
            opacity: 0.9,
          }}
        />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: navIsTop ? `${18 + i * 18}%` : '22%',
              top: navIsTop ? '40%' : `${22 + i * 10}%`,
              width: navIsTop ? '13%' : '56%',
              height: navIsTop ? '20%' : '3%',
              borderRadius: 999,
              backgroundColor: i === 0 ? C.paper : C.stroke,
              opacity: (i === 0 ? 0.85 : 1) * interpolate(Math.abs(p - 0.5), [0, 0.3], [0, 1], CLAMP),
            }}
          />
        ))}
      </div>

      {/* KPI tiles: placeholder bars only, no numbers */}
      {LANDSCAPE.tiles.map((t, i) => (
        <div
          key={i}
          style={{
            ...lerpRect(t, PORTRAIT.tiles[i], p),
            borderRadius: radius * 0.6,
            backgroundColor: '#1F2440',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '10%',
              top: '22%',
              width: '42%',
              height: '12%',
              borderRadius: 999,
              backgroundColor: C.stroke,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '10%',
              top: '50%',
              width: `${interpolate(grow, [0, 1], [8, 62 + i * 10])}%`,
              height: '24%',
              borderRadius: 999,
              backgroundColor: TILE_ACCENT[i],
            }}
          />
        </div>
      ))}

      {/* bar chart */}
      <div style={{...lerpRect(LANDSCAPE.bars, PORTRAIT.bars, p), borderRadius: radius * 0.6, backgroundColor: '#1F2440'}}>
        <div style={{position: 'absolute', left: '6%', right: '6%', top: '10%', bottom: '10%', display: 'flex', alignItems: 'flex-end', gap: '5%'}}>
          {BAR_HEIGHTS.map((h, i) => {
            const g = interpolate(grow, [i * 0.1, i * 0.1 + 0.5], [0, 1], CLAMP);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h * 100 * g}%`,
                  borderRadius: pad,
                  backgroundColor: i === BAR_HEIGHTS.length - 1 ? C.coral : barColor,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* line chart */}
      <div style={{...lerpRect(LANDSCAPE.line, PORTRAIT.line, p), borderRadius: radius * 0.6, backgroundColor: '#1F2440'}}>
        <svg viewBox={`0 0 ${lw} ${lh}`} width={lw} height={lh} style={{position: 'absolute', left: '8%', top: '12%', overflow: 'visible'}}>
          <polyline
            points={LINE_POINTS.map((v, i) => `${(i / (LINE_POINTS.length - 1)) * lw},${v * lh}`).join(' ')}
            fill="none"
            stroke={C.mint}
            strokeWidth={Math.max(3, Math.min(width, height) * 0.009)}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - draw}
          />
        </svg>
      </div>
    </div>
  );
};
