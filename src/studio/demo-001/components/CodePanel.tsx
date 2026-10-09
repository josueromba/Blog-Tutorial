import React from 'react';
import {interpolate, interpolateColors, useCurrentFrame} from 'remotion';
import {C, CLAMP, EASE} from '../theme';

// Abstract code editor: rows of rounded token bars, no readable text.
// Rows type on, a caret blinks, then one "value" token is selected and
// changes from violet to coral (the edit).

type Token = readonly [number, string]; // width in %, colour key

const ROWS: readonly (readonly Token[])[] = [
  [[14, 'v'], [22, 'p'], [10, 's']],
  [[6, 'gap'], [18, 'c'], [30, 'p']],
  [[12, 'gap'], [16, 's'], [12, 'v'], [20, 'p']],
  [[12, 'gap'], [20, 's'], [14, 'VALUE'], [8, 's']],
  [[12, 'gap'], [24, 's'], [18, 'p']],
  [[6, 'gap'], [10, 'c'], [26, 'p'], [12, 's']],
  [[6, 'gap'], [30, 'p'], [12, 'v']],
  [[18, 'c'], [8, 's']],
];

const tokenColor = (k: string) =>
  k === 'v' ? C.violet : k === 'p' ? '#C9CCE0' : k === 'c' ? C.mint : k === 's' ? C.stroke : 'transparent';

/** Caret sits at the end of the typed part of a row (after any leading indent). */
const caretX = (row: readonly Token[], reveal: number) => {
  const indent = row[0][1] === 'gap' ? row[0][0] + 2 : 0;
  const end = row.reduce((a, [w]) => a + w + 2, 0) - 2;
  return Math.min(98, indent + (end - indent) * reveal + (reveal > 0 ? 1 : 0));
};

export const EDIT_START = 35; // scene-local frame the value gets selected
export const EDIT_END = 45;

export const CodePanel: React.FC<{
  readonly width: number;
  readonly height: number;
  readonly style?: React.CSSProperties;
}> = ({width, height, style}) => {
  const frame = useCurrentFrame();
  const rowH = height * 0.06;
  const gapY = height * 0.045;
  const top = height * 0.16;
  const left = width * 0.07;
  const innerW = width * 0.86;
  const lastTyped = Math.min(ROWS.length - 1, Math.floor(Math.max(0, frame - 3) / 3));
  const caretOn = Math.floor(frame / 8) % 2 === 0;
  const valueColor = interpolate(frame, [EDIT_START, EDIT_END], [0, 1], {...CLAMP, easing: EASE});
  const selected = frame >= EDIT_START - 4;

  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        borderRadius: 28,
        backgroundColor: C.surface,
        border: `3px solid ${C.stroke}`,
        boxSizing: 'border-box',
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
        ...style,
      }}
    >
      {/* window chrome: three generic dots */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: left + i * height * 0.05,
            top: height * 0.05,
            width: height * 0.03,
            height: height * 0.03,
            borderRadius: '50%',
            backgroundColor: C.stroke,
          }}
        />
      ))}
      {ROWS.map((row, r) => {
        const rowStart = 3 + r * 3;
        const reveal = interpolate(frame, [rowStart, rowStart + 3], [0, 1], CLAMP);
        let x = 0;
        return (
          <div key={r} style={{position: 'absolute', left, top: top + r * (rowH + gapY), width: innerW, height: rowH}}>
            {row.map(([w, k], t) => {
              const tokenLeft = x;
              x += w + 2;
              const visible = interpolate(reveal, [tokenLeft / 100, Math.min(1, (tokenLeft + w) / 100)], [0, 1], CLAMP);
              if (k === 'gap') return null;
              const isValue = k === 'VALUE';
              const bg = isValue ? interpolateColors(valueColor, [0, 1], [C.violet, C.coral]) : tokenColor(k);
              return (
                <div
                  key={t}
                  style={{
                    position: 'absolute',
                    left: `${tokenLeft}%`,
                    top: 0,
                    width: `${w * visible}%`,
                    height: '100%',
                    borderRadius: 999,
                    backgroundColor: bg,
                    opacity: isValue ? 1 : 0.95,
                    outline: isValue && selected ? `4px solid ${C.paper}` : 'none',
                    outlineOffset: 6,
                    scale: isValue ? String(interpolate(frame, [EDIT_START, EDIT_START + 5, EDIT_END], [1, 1.12, 1], CLAMP)) : '1',
                  }}
                />
              );
            })}
            {r === lastTyped && caretOn && frame < EDIT_START - 4 ? (
              <div
                style={{
                  position: 'absolute',
                  left: `${caretX(row, reveal)}%`,
                  top: -rowH * 0.15,
                  width: 5,
                  height: rowH * 1.3,
                  borderRadius: 2,
                  backgroundColor: C.paper,
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
