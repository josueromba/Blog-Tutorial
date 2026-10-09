import React from 'react';
import {useStudioFonts} from '../fonts';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {MockDashboard} from '../components/MockDashboard';
import {SCENE} from '../timing';
import {C, CLAMP, EASE, headline, reveal, useFormat} from '../theme';

type Box = {x: number; y: number; w: number; h: number};

const lerpBox = (a: Box, b: Box, t: number): Box => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  w: a.w + (b.w - a.w) * t,
  h: a.h + (b.h - a.h) * t,
});

export const FormatsScene: React.FC = () => {
  useStudioFonts();
  const frame = useCurrentFrame();
  const {portrait, width, mx, my} = useFormat();
  const dur = SCENE.formats.duration;

  const L: Box = portrait ? {x: mx, y: 420, w: width - 2 * mx, h: 511} : {x: 300, y: 377, w: 800, h: 450};
  const P: Box = portrait ? {x: 390, y: 1020, w: 300, h: 533} : {x: 1280, y: 300, w: 340, h: 605};

  const lIn = interpolate(frame, [-4, 12], [0, 1], {...CLAMP, easing: EASE});
  const target = interpolate(frame, [10, 20], [0, 1], CLAMP);
  const move = interpolate(frame, [20, 50], [0, 1], {...CLAMP, easing: EASE});
  const reflow = interpolate(frame, [22, 48], [0, 1], {...CLAMP, easing: EASE});
  const copyIn = interpolate(frame, [18, 22], [0, 1], CLAMP);
  const box = lerpBox(L, P, move);
  const size = portrait ? 112 : 140;

  return (
    <AbsoluteFill>
      <Backdrop glowX={0.5} glowY={portrait ? 0.55 : 0.6} duration={dur} driftX={0.04} />
      {/* headline: one line, three tokens */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: portrait ? my + 40 : my + 10,
          textAlign: 'center',
          ...headline(size),
        }}
      >
        <span style={{display: 'inline-block', ...reveal(frame, 0, 8)}}>16:9</span>{' '}
        <span style={{display: 'inline-block', color: C.coral, ...reveal(frame, 2, 8)}}>+</span>{' '}
        <span style={{display: 'inline-block', ...reveal(frame, 4, 8)}}>9:16</span>
      </div>

      {/* destination portrait slot */}
      <div
        style={{
          position: 'absolute',
          left: P.x - 10,
          top: P.y - 10,
          width: P.w + 20,
          height: P.h + 20,
          borderRadius: 26,
          border: `3px dashed ${C.coral}`,
          boxSizing: 'border-box',
          opacity: target * interpolate(frame, [46, 56], [1, 0.35], CLAMP),
          scale: String(interpolate(target, [0, 1], [0.94, 1])),
        }}
      />

      {/* landscape original */}
      <MockDashboard
        width={L.w}
        height={L.h}
        p={0}
        grow={1}
        draw={1}
        style={{left: L.x, top: L.y, opacity: lIn, scale: String(interpolate(lIn, [0, 1], [0.94, 1]))}}
      />

      {/* the same dashboard, recomposed into the vertical frame */}
      <MockDashboard
        width={box.w}
        height={box.h}
        p={reflow}
        grow={1}
        draw={1}
        style={{left: box.x, top: box.y, opacity: copyIn}}
      />
    </AbsoluteFill>
  );
};
