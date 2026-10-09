import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {useStudioFonts} from '../../demo-001/fonts';
import {Backdrop} from '../../demo-001/components/Backdrop';
import {Line} from '../../demo-001/components/Line';
import {C, CLAMP, useFormat} from '../../demo-001/theme';
import {SCENE} from '../timing';
import {useCopy} from '../copy';

const Row: React.FC<{readonly start: number; readonly size: number; readonly children: React.ReactNode}> = ({start, size, children}) => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [start + 8, start + 10, start + 16], [1, 1.5, 1], CLAMP);
  const lit = frame >= start + 8;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: Math.round(size * 0.35), marginTop: Math.round(size * 0.45)}}>
      <div
        style={{
          width: size * 0.4,
          height: size * 0.4,
          flexShrink: 0,
          borderRadius: 5,
          rotate: '45deg',
          scale: String(flash),
          backgroundColor: lit ? C.coral : 'transparent',
          border: `3px solid ${C.coral}`,
          boxSizing: 'border-box',
          opacity: interpolate(frame, [start - 3, start + 4], [0, 1], CLAMP),
        }}
      />
      <Line start={start} size={size} style={{fontWeight: 700, letterSpacing: '-0.01em'}}>
        {children}
      </Line>
    </div>
  );
};

export const BetaScene: React.FC = () => {
  useStudioFonts();
  const copy = useCopy();
  const frame = useCurrentFrame();
  const {portrait, width, height, mx} = useFormat();
  const dur = SCENE.beta.duration;
  const motif = interpolate(frame, [-4, 20], [0, 1], CLAMP);
  const rs = portrait ? 58 : 64;
  return (
    <AbsoluteFill>
      <Backdrop glowX={portrait ? 0.5 : 0.65} glowY={portrait ? 0.7 : 0.5} duration={dur} driftX={0.03} />
      {/* faint diamond motif */}
      <div
        style={{
          position: 'absolute',
          left: portrait ? width / 2 - 200 : 1340,
          top: portrait ? height * 0.6 : 330,
          width: 400,
          height: 400,
          borderRadius: 40,
          rotate: `${45 + frame * 0.3}deg`,
          border: `4px solid ${C.violet}`,
          opacity: 0.35 * motif,
        }}
      />
      <div style={{position: 'absolute', left: mx, top: portrait ? 330 : 300}}>
        <Line start={0} size={portrait ? copy.beta.headlineSize9x16 : 120}>
          {copy.beta.headline}
        </Line>
        <Row start={4} size={rs}>
          {copy.beta.row1}
        </Row>
        <Row start={8} size={rs}>
          {copy.beta.row2}
        </Row>
      </div>
    </AbsoluteFill>
  );
};
