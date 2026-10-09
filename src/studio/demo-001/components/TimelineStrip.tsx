import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CUTS} from '../timing';
import {C, CLAMP, useFormat} from '../theme';

/**
 * Decorative "keyframe timeline": a track inside the bottom safe margin, a
 * playhead moving linearly over the whole video and one diamond per cut that
 * flashes coral when the cut (and its sound hit) happens. No text, no numbers.
 */
export const TimelineStrip: React.FC<{
  /** Cut frames incl. the final end frame. Defaults to demo-001's CUTS (unchanged behaviour). */
  readonly cuts?: readonly number[];
}> = ({cuts: cutsProp = CUTS}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const {width, height, mx, my} = useFormat();
  const trackW = width - 2 * mx;
  const y = height - my - 24;
  const playX = interpolate(frame, [0, durationInFrames - 1], [0, trackW], CLAMP);
  const cuts = cutsProp.slice(0, -1);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {/* track */}
      <div
        style={{
          position: 'absolute',
          left: mx,
          top: y - 3,
          width: trackW,
          height: 6,
          borderRadius: 3,
          backgroundColor: C.stroke,
        }}
      />
      {/* progress */}
      <div
        style={{
          position: 'absolute',
          left: mx,
          top: y - 3,
          width: playX,
          height: 6,
          borderRadius: 3,
          backgroundColor: C.violet,
        }}
      />
      {cuts.map((cut) => {
        const x = mx + (cut / durationInFrames) * trackW;
        const lit = frame >= cut;
        const flash = interpolate(frame, [cut, cut + 6], [1.7, 1], CLAMP);
        return (
          <div
            key={cut}
            style={{
              position: 'absolute',
              left: x - 11,
              top: y - 11,
              width: 22,
              height: 22,
              borderRadius: 4,
              rotate: '45deg',
              scale: String(lit ? flash : 1),
              backgroundColor: lit ? C.coral : C.ink,
              border: `3px solid ${lit ? C.coral : C.stroke}`,
              boxSizing: 'border-box',
            }}
          />
        );
      })}
      {/* playhead */}
      <div
        style={{
          position: 'absolute',
          left: mx + playX - 2,
          top: y - 18,
          width: 4,
          height: 36,
          borderRadius: 2,
          backgroundColor: C.paper,
        }}
      />
    </AbsoluteFill>
  );
};
