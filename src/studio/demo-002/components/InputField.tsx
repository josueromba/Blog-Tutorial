import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, CLAMP, EASE, FONT} from '../../demo-001/theme';

const TYPED = '/motion';

/**
 * Generic, fictional input field (ink/stroke surfaces, square-ish corners, no placeholder,
 * no send button). Types "/motion" one character every 2 frames from `typeFrom` (local).
 */
export const InputField: React.FC<{
  readonly width: number;
  readonly height: number;
  readonly typeFrom: number;
  readonly fontSize: number;
  readonly style?: React.CSSProperties;
}> = ({width, height, typeFrom, fontSize, style}) => {
  const frame = useCurrentFrame();
  const chars = Math.max(0, Math.min(TYPED.length, Math.floor((frame - typeFrom) / 2) + 1));
  const caretOn = frame < typeFrom + 2 * TYPED.length + 2 || Math.floor(frame / 8) % 2 === 0;
  const appear = interpolate(frame, [-4, 8], [0, 1], {...CLAMP, easing: EASE});
  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        borderRadius: 14,
        backgroundColor: C.ink,
        border: `3px solid ${C.stroke}`,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: Math.round(height * 0.3),
        opacity: appear,
        boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
        ...style,
      }}
    >
      {/* left gutter mark: two short bars, purely decorative */}
      <div style={{width: 6, height: height * 0.42, borderRadius: 3, backgroundColor: C.violet, marginRight: Math.round(height * 0.22)}} />
      <span style={{fontFamily: FONT, fontWeight: 700, fontSize, lineHeight: 1, color: C.coral, whiteSpace: 'pre'}}>
        {TYPED.slice(0, frame >= typeFrom ? chars : 0)}
      </span>
      <span style={{width: 5, height: fontSize * 1.05, marginLeft: 6, borderRadius: 2, backgroundColor: C.paper, opacity: caretOn ? 1 : 0}} />
    </div>
  );
};

/** Option chip that pops under the field: icon + placeholder bars, no text. */
export const OptionChip: React.FC<{readonly width: number; readonly height: number; readonly popAt: number; readonly style?: React.CSSProperties}> = ({
  width,
  height,
  popAt,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [popAt, popAt + 8], [0, 1], {...CLAMP, easing: EASE});
  const icon = height * 0.56;
  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        borderRadius: 14,
        backgroundColor: C.surface,
        border: `3px solid ${C.violet}`,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: height * 0.25,
        paddingLeft: height * 0.25,
        opacity: p,
        translate: `0px ${(1 - p) * -20}px`,
        ...style,
      }}
    >
      <svg width={icon} height={icon} viewBox="0 0 40 40">
        <rect x={2} y={2} width={36} height={36} rx={9} fill="none" stroke={C.violet} strokeWidth={3} />
        <path d="M 16 12 L 28 20 L 16 28 Z" fill={C.violet} />
      </svg>
      <div style={{display: 'flex', flexDirection: 'column', gap: height * 0.12}}>
        <div style={{width: width * 0.36, height: height * 0.14, borderRadius: 999, backgroundColor: C.paper, opacity: 0.85}} />
        <div style={{width: width * 0.24, height: height * 0.12, borderRadius: 999, backgroundColor: C.stroke}} />
      </div>
    </div>
  );
};

/** Small animated preview canvas: bars growing and a circle sliding across. */
export const PreviewCanvas: React.FC<{readonly width: number; readonly height: number; readonly popAt: number; readonly style?: React.CSSProperties}> = ({
  width,
  height,
  popAt,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [popAt, popAt + 8], [0, 1], {...CLAMP, easing: EASE});
  const run = interpolate(frame, [popAt + 4, popAt + 30], [0, 1], {...CLAMP, easing: EASE});
  const bars = [0.35, 0.55, 0.45, 0.75, 0.6];
  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        borderRadius: 20,
        backgroundColor: C.surface,
        border: `3px solid ${C.stroke}`,
        boxSizing: 'border-box',
        overflow: 'hidden',
        opacity: p,
        scale: String(interpolate(p, [0, 1], [0.94, 1])),
        ...style,
      }}
    >
      <div style={{position: 'absolute', left: '8%', right: '45%', bottom: '14%', top: '18%', display: 'flex', alignItems: 'flex-end', gap: '6%'}}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h * 100 * interpolate(run, [i * 0.1, i * 0.1 + 0.5], [0, 1], CLAMP)}%`,
              borderRadius: 8,
              backgroundColor: i === 3 ? C.coral : C.violet,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: '30%',
          // slide from 60% to the right inner edge without clipping
          left: width * 0.6 + (width * 0.94 - height * 0.3 - width * 0.6) * run,
          width: height * 0.3,
          height: height * 0.3,
          borderRadius: '50%',
          backgroundColor: C.mint,
        }}
      />
      <div style={{position: 'absolute', left: '60%', right: '6%', top: '72%', height: 6, borderRadius: 3, backgroundColor: C.stroke}} />
    </div>
  );
};
