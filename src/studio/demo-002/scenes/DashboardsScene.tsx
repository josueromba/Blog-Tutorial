import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {useStudioFonts} from '../../demo-001/fonts';
import {Backdrop} from '../../demo-001/components/Backdrop';
import {Line} from '../../demo-001/components/Line';
import {MockDashboard} from '../../demo-001/components/MockDashboard';
import {C, CLAMP, EASE, useFormat} from '../../demo-001/theme';
import {SCENE} from '../timing';

const Refresh: React.FC<{readonly size: number; readonly spin: number; readonly style?: React.CSSProperties}> = ({size, spin, style}) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{position: 'absolute', rotate: `${spin}deg`, ...style}}>
    <path d="M 33 20 A 13 13 0 1 1 27 9" fill="none" stroke={C.mint} strokeWidth={4} strokeLinecap="round" />
    <path d="M 26 3 L 28 10 L 21 12" fill="none" stroke={C.mint} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DashboardsScene: React.FC = () => {
  useStudioFonts();
  const frame = useCurrentFrame();
  const {portrait, width, mx} = useFormat();
  const dur = SCENE.dashboards.duration;
  const cardIn = interpolate(frame, [-4, 16], [0, 1], {...CLAMP, easing: EASE});
  // build, then "stays current": bars dip and re-grow at local 38-52 (f98-112), refresh tick at f100
  const grow = interpolate(frame, [4, 24, 38, 42, 52], [0, 1, 1, 0.55, 1], {...CLAMP, easing: EASE});
  const draw = interpolate(frame, [10, 34], [0, 1], {...CLAMP, easing: EASE});
  const spin = interpolate(frame, [38, 52], [0, 360], {...CLAMP, easing: EASE});
  const card = portrait ? {x: mx, y: 760, w: width - 2 * mx, h: 640} : {x: width - mx - 700, y: 300, w: 700, h: 470};
  const hs = 112;
  const bs = 60;
  return (
    <AbsoluteFill>
      <Backdrop glowX={portrait ? 0.6 : 0.72} glowY={portrait ? 0.6 : 0.45} duration={dur} driftX={-0.04} />
      <div style={{position: 'absolute', left: mx, top: portrait ? 290 : 280}}>
        <Line start={0} size={hs}>Claude</Line>
        <Line start={4} size={hs} style={{color: C.violet}}>Dashboards</Line>
        <div style={{height: 28}} />
        <Line start={8} size={bs} style={{fontWeight: 700, letterSpacing: '-0.01em'}}>Your data, as a dashboard</Line>
        <Line start={12} size={bs} style={{fontWeight: 700, letterSpacing: '-0.01em'}}>that stays current</Line>
      </div>
      <MockDashboard
        width={card.w}
        height={card.h}
        p={portrait ? 1 : 0}
        grow={grow}
        draw={draw}
        style={{left: card.x, top: card.y, opacity: cardIn, translate: portrait ? `0px ${(1 - cardIn) * 100}px` : `${(1 - cardIn) * 120}px 0px`}}
      />
      <Refresh size={56} spin={spin} style={{left: card.x + card.w - 76, top: card.y - 72, opacity: cardIn}} />
    </AbsoluteFill>
  );
};
