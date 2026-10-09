import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, CLAMP, EASE} from '../../demo-001/theme';
import {Cursor} from './Cursor';

/**
 * Fictional mini editor: preview canvas over a keyframe track. The cursor drags the middle
 * keyframe (local dragFrom..dragTo); the preview shape follows. Then a coral arrow drops into
 * a generic file shape (downloadAt). No text, no labels, no square send-style button.
 */
export const MiniEditor: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly dragFrom: number;
  readonly dragTo: number;
  readonly downloadAt: number;
}> = ({x, y, width, height, dragFrom, dragTo, downloadAt}) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [-4, 10], [0, 1], {...CLAMP, easing: EASE});
  const drag = interpolate(frame, [dragFrom, dragTo], [0, 1], {...CLAMP, easing: EASE});
  const pad = width * 0.05;
  const previewH = height * 0.6;
  const trackY = previewH + height * 0.12; // relative to editor
  const trackX0 = pad;
  const trackW = width - 2 * pad;
  const kf = [0.12, 0.45 + 0.28 * drag, 0.88];
  // preview shape x follows the dragged keyframe
  const shapeX = 0.15 + 0.55 * (kf[1] - 0.12) / 0.76;
  const arrow = interpolate(frame, [downloadAt, downloadAt + 6], [0, 1], {...CLAMP, easing: EASE});
  const file = interpolate(frame, [downloadAt + 4, downloadAt + 6, downloadAt + 12], [0, 1.15, 1], CLAMP);
  const fileW = Math.min(width, height) * 0.16;
  const kfAbsX = x + trackX0 + trackW * kf[1];
  const kfAbsY = y + trackY;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          height,
          borderRadius: 24,
          backgroundColor: C.surface,
          border: `3px solid ${C.stroke}`,
          boxSizing: 'border-box',
          overflow: 'hidden',
          opacity: appear,
          boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
        }}
      >
        {/* preview canvas */}
        <div style={{position: 'absolute', left: pad, top: pad, width: width - 2 * pad, height: previewH - pad, borderRadius: 16, backgroundColor: C.ink, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: '8%', bottom: '18%', width: '84%', height: 6, borderRadius: 3, backgroundColor: C.stroke}} />
          <div
            style={{
              position: 'absolute',
              left: `${shapeX * 100}%`,
              top: '28%',
              width: (previewH - pad) * 0.38,
              height: (previewH - pad) * 0.38,
              borderRadius: 18,
              backgroundColor: C.violet,
              rotate: `${drag * 90}deg`,
            }}
          />
        </div>
        {/* keyframe track */}
        <div style={{position: 'absolute', left: trackX0, top: trackY - 3, width: trackW, height: 6, borderRadius: 3, backgroundColor: C.stroke}} />
        {kf.map((k, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: trackX0 + trackW * k - 14,
              top: trackY - 14,
              width: 28,
              height: 28,
              borderRadius: 5,
              rotate: '45deg',
              backgroundColor: i === 1 ? C.coral : C.violet,
              outline: i === 1 && frame >= dragFrom - 2 && frame <= dragTo + 2 ? `3px solid ${C.paper}` : 'none',
              outlineOffset: 4,
            }}
          />
        ))}
        <div style={{position: 'absolute', left: trackX0, top: trackY + height * 0.1, width: trackW * 0.55, height: 10, borderRadius: 5, backgroundColor: C.stroke}} />
        {/* download: coral arrow dropping into a generic file outline (top-right of preview) */}
        <svg
          width={fileW}
          height={fileW * 1.25}
          viewBox="0 0 40 50"
          style={{position: 'absolute', right: pad * 1.6, top: pad * 1.5, scale: String(file), overflow: 'visible'}}
        >
          <path d="M 4 2 L 26 2 L 36 12 L 36 48 L 4 48 Z" fill={C.surface} stroke={C.paper} strokeWidth={3} strokeLinejoin="round" />
          <path d="M 26 2 L 26 12 L 36 12" fill="none" stroke={C.paper} strokeWidth={3} strokeLinejoin="round" />
        </svg>
        <svg
          width={fileW * 0.6}
          height={fileW * 0.8}
          viewBox="0 0 24 32"
          style={{
            position: 'absolute',
            right: pad * 1.6 + fileW * 0.2,
            top: pad * 1.5 - fileW * 0.9 + fileW * 1.05 * arrow,
            opacity: frame >= downloadAt ? interpolate(arrow, [0, 0.2, 0.9, 1], [0, 1, 1, 0]) : 0,
          }}
        >
          <path d="M 12 2 L 12 26 M 3 17 L 12 26 L 21 17" fill="none" stroke={C.coral} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <Cursor x0={kfAbsX + 140} y0={kfAbsY + 120} x1={kfAbsX} y1={kfAbsY} moveFrom={dragFrom - 10} clickAt={dragFrom} />
      {/* while dragging, cursor follows the keyframe */}
    </>
  );
};
