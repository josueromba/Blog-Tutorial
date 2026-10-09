import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';

/**
 * Ink background with a faint dot grid and a drifting violet glow.
 * Each scene renders its own Backdrop with its own glow anchor, so the glow
 * jumps on every hard cut (and scenes preview correctly on their own).
 */
export const Backdrop: React.FC<{
  readonly glowX: number; // 0..1
  readonly glowY: number; // 0..1
  readonly driftX?: number; // fraction of width over the scene
  readonly driftY?: number;
  readonly duration: number;
}> = ({glowX, glowY, driftX = 0.06, driftY = 0.03, duration}) => {
  const frame = useCurrentFrame();
  const x = (glowX + interpolate(frame, [0, duration], [0, driftX])) * 100;
  const y = (glowY + interpolate(frame, [0, duration], [0, driftY])) * 100;
  return (
    <AbsoluteFill style={{backgroundColor: C.ink}}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle at ${x}% ${y}%, rgba(124,92,255,0.22) 0%, rgba(124,92,255,0.08) 28%, rgba(11,13,23,0) 55%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, ${C.stroke} 2px, rgba(0,0,0,0) 2.6px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: '24px 24px',
          opacity: 0.45,
        }}
      />
    </AbsoluteFill>
  );
};
