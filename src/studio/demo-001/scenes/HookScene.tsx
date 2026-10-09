import React from 'react';
import {useStudioFonts} from '../fonts';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {SCENE} from '../timing';
import {C, CLAMP, EASE, headline, useFormat} from '../theme';

const Word: React.FC<{readonly start: number; readonly first?: boolean; readonly underline?: boolean; readonly children: string}> = ({
  start,
  first,
  underline,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = first
    ? interpolate(frame, [0, 5], [0.6, 1], CLAMP)
    : interpolate(frame, [start, start + 5], [0, 1], CLAMP);
  const y = interpolate(frame, [start, start + 7], [first ? 20 : 50, 0], {...CLAMP, easing: EASE});
  const s = interpolate(frame, [start, start + 7], [first ? 0.96 : 0.88, 1], {...CLAMP, easing: EASE});
  const ul = interpolate(frame, [14, 26], [0, 100], {...CLAMP, easing: EASE});
  return (
    <span style={{position: 'relative', display: 'inline-block', opacity, translate: `0px ${y}px`, scale: String(s)}}>
      {children}
      {underline ? (
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-0.04em',
            height: '0.09em',
            width: `${ul}%`,
            borderRadius: 999,
            backgroundColor: C.coral,
          }}
        />
      ) : null}
    </span>
  );
};

const Orbit: React.FC<{readonly cx: number; readonly cy: number; readonly r: number; readonly size: number; readonly phase: number; readonly speed: number}> = ({
  cx,
  cy,
  r,
  size,
  phase,
  speed,
}) => {
  const frame = useCurrentFrame();
  const a = phase + frame * speed;
  const intro = interpolate(frame, [0, 12], [0.55, 1], {...CLAMP, easing: EASE});
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: cx - r,
          top: cy - r,
          width: 2 * r,
          height: 2 * r,
          borderRadius: '50%',
          border: `2px dashed ${C.stroke}`,
          opacity: intro,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: cx + Math.cos(a) * r - size / 2,
          top: cy + Math.sin(a) * r - size / 2,
          width: size,
          height: size,
          borderRadius: size * 0.22,
          border: `4px solid ${C.violet}`,
          boxSizing: 'border-box',
          rotate: `${(a * 180) / Math.PI}deg`,
          scale: String(intro),
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: cx + Math.cos(a + Math.PI) * r - size * 0.3,
          top: cy + Math.sin(a + Math.PI) * r - size * 0.3,
          width: size * 0.6,
          height: size * 0.6,
          borderRadius: size * 0.14,
          backgroundColor: C.coral,
          rotate: `${(-a * 180) / Math.PI}deg`,
          scale: String(intro),
        }}
      />
    </>
  );
};

export const HookScene: React.FC = () => {
  useStudioFonts();
  const frame = useCurrentFrame();
  const {portrait, width, height, mx} = useFormat();
  const drift = interpolate(frame, [0, SCENE.hook.duration], [1, 1.04], CLAMP);
  const size = portrait ? 120 : 150;

  return (
    <AbsoluteFill>
      <Backdrop glowX={portrait ? 0.3 : 0.25} glowY={portrait ? 0.35 : 0.3} duration={SCENE.hook.duration} />
      {portrait ? (
        <Orbit cx={width * 0.62} cy={height * 0.72} r={170} size={88} phase={0.4} speed={0.06} />
      ) : (
        <>
          <Orbit cx={width * 0.82} cy={height * 0.24} r={105} size={70} phase={0.2} speed={0.06} />
          <Orbit cx={width * 0.17} cy={height * 0.77} r={85} size={56} phase={2.2} speed={-0.07} />
        </>
      )}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: portrait ? 'flex-start' : 'center',
          paddingLeft: portrait ? mx : 0,
          paddingBottom: portrait ? height * 0.12 : 0,
        }}
      >
        <div
          style={{
            ...headline(size),
            textAlign: portrait ? 'left' : 'center',
            scale: String(drift),
            transformOrigin: portrait ? 'left center' : 'center center',
          }}
        >
          {portrait ? (
            <>
              <div>
                <Word start={0} first>Your</Word> <Word start={3}>launch</Word>
              </div>
              <div>
                <Word start={6}>deserves</Word>
              </div>
              <div>
                <Word start={9} underline>motion.</Word>
              </div>
            </>
          ) : (
            <>
              <div>
                <Word start={0} first>Your</Word> <Word start={3}>launch</Word>
              </div>
              <div>
                <Word start={6}>deserves</Word> <Word start={9} underline>motion.</Word>
              </div>
            </>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
