import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, CLAMP, EASE} from '../../demo-001/theme';

/** Generic arrow cursor that travels from (x0,y0) to (x1,y1) and clicks at `clickAt` (local frames). Tip = (x,y). */
export const Cursor: React.FC<{
  readonly x0: number;
  readonly y0: number;
  readonly x1: number;
  readonly y1: number;
  readonly moveFrom: number;
  readonly clickAt: number;
  readonly size?: number;
}> = ({x0, y0, x1, y1, moveFrom, clickAt, size = 56}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [moveFrom, clickAt - 2], [0, 1], {...CLAMP, easing: EASE});
  const x = x0 + (x1 - x0) * t;
  const y = y0 + (y1 - y0) * t;
  const press = interpolate(frame, [clickAt - 2, clickAt, clickAt + 4], [1, 0.82, 1], CLAMP);
  const ripple = interpolate(frame, [clickAt, clickAt + 12], [0, 1], CLAMP);
  const appear = interpolate(frame, [moveFrom - 4, moveFrom], [0, 1], CLAMP);
  return (
    <>
      {frame >= clickAt ? (
        <div
          style={{
            position: 'absolute',
            left: x1 - 60 * ripple,
            top: y1 - 60 * ripple,
            width: 120 * ripple,
            height: 120 * ripple,
            borderRadius: '50%',
            border: `4px solid ${C.paper}`,
            opacity: 1 - ripple,
          }}
        />
      ) : null}
      <svg
        width={size * 0.75}
        height={size}
        viewBox="0 0 24 32"
        style={{position: 'absolute', left: x - 2, top: y - 2, scale: String(press), transformOrigin: '0 0', opacity: appear, overflow: 'visible'}}
      >
        <path d="M 2 2 L 2 26 L 8.5 20 L 13 30 L 17 28 L 12.5 18.5 L 21 18.5 Z" fill={C.paper} stroke={C.ink} strokeWidth={2} strokeLinejoin="round" />
      </svg>
    </>
  );
};
