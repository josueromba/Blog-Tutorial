import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, CLAMP} from '../../demo-001/theme';

// Abstract "query" panel: rows of token bars, no readable text. Own timing (rows start at `start`).
const ROWS: readonly (readonly [number, string][])[] = [
  [[16, 'v'], [26, 'p']],
  [[8, 'g'], [20, 'c'], [30, 'p']],
  [[8, 'g'], [14, 'v'], [24, 'p']],
  [[16, 'v'], [34, 'p']],
  [[8, 'g'], [22, 'c'], [12, 'o']],
  [[16, 'v'], [20, 'p']],
];
const color = (k: string) => (k === 'v' ? C.violet : k === 'c' ? C.mint : k === 'o' ? C.coral : k === 'p' ? '#C9CCE0' : 'transparent');

export const QueryPanel: React.FC<{readonly width: number; readonly height: number; readonly start: number; readonly style?: React.CSSProperties}> = ({
  width,
  height,
  start,
  style,
}) => {
  const frame = useCurrentFrame();
  const rowH = height * 0.07;
  const gap = height * 0.055;
  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        borderRadius: 24,
        backgroundColor: C.surface,
        border: `3px solid ${C.coral}`,
        boxSizing: 'border-box',
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        ...style,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: width * 0.07 + i * height * 0.06, top: height * 0.07, width: height * 0.035, height: height * 0.035, borderRadius: '50%', backgroundColor: C.stroke}} />
      ))}
      {ROWS.map((row, r) => {
        const rv = interpolate(frame, [start + r * 3, start + r * 3 + 4], [0, 1], CLAMP);
        let x = 0;
        return (
          <div key={r} style={{position: 'absolute', left: width * 0.07, top: height * 0.2 + r * (rowH + gap), width: width * 0.86, height: rowH}}>
            {row.map(([w, k], t) => {
              const left = x;
              x += w + 2;
              if (k === 'g') return null;
              return (
                <div
                  key={t}
                  style={{position: 'absolute', left: `${left}%`, top: 0, width: `${w * rv}%`, height: '100%', borderRadius: 999, backgroundColor: color(k)}}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
