import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, CLAMP, EASE} from '../theme';

/** Mint ring + check that draw on, with a small coral "revision loop" arrow orbiting once. */
export const CheckBadge: React.FC<{readonly size: number; readonly style?: React.CSSProperties}> = ({size, style}) => {
  const frame = useCurrentFrame();
  const ring = interpolate(frame, [0, 15], [0, 1], {...CLAMP, easing: EASE});
  const check = interpolate(frame, [12, 24], [0, 1], {...CLAMP, easing: EASE});
  const loop = interpolate(frame, [0, 40], [0, 360], {...CLAMP, easing: EASE});
  const pop = interpolate(frame, [22, 26, 32], [1, 1.06, 1], CLAMP);
  return (
    <div style={{position: 'relative', width: size, height: size, scale: String(pop), ...style}}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{position: 'absolute', inset: 0}}>
        <circle cx={50} cy={50} r={44} fill="rgba(61,220,151,0.10)" />
        <circle
          cx={50}
          cy={50}
          r={44}
          fill="none"
          stroke={C.mint}
          strokeWidth={5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - ring}
          transform="rotate(-90 50 50)"
        />
        <path
          d="M 30 52 L 44 66 L 71 36"
          fill="none"
          stroke={C.mint}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - check}
        />
      </svg>
      {/* revision loop arrow orbiting the badge */}
      <svg
        viewBox="0 0 100 100"
        width={size * 1.3}
        height={size * 1.3}
        style={{position: 'absolute', left: -size * 0.15, top: -size * 0.15, rotate: `${loop}deg`}}
      >
        <path d="M 50 3 A 47 47 0 0 1 90 25" fill="none" stroke={C.coral} strokeWidth={3.5} strokeLinecap="round" />
        <path d="M 84 17 L 91 26 L 80 28" fill="none" stroke={C.coral} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
