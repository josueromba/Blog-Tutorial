import React from 'react';
import {useStudioFonts} from '../fonts';
import {AbsoluteFill, interpolate, interpolateColors, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {CodePanel} from '../components/CodePanel';
import {Line} from '../components/Line';
import {SCENE} from '../timing';
import {C, CLAMP, EASE, useFormat} from '../theme';

/** Small live-preview card: recolours in sync with the edited code value. */
const PreviewCard: React.FC<{readonly w: number; readonly h: number; readonly style?: React.CSSProperties}> = ({w, h, style}) => {
  const frame = useCurrentFrame();
  const swap = interpolate(frame, [40, 50], [0, 1], {...CLAMP, easing: EASE});
  const pulse = interpolate(frame, [40, 45, 52], [1, 1.05, 1], CLAMP);
  const accent = interpolateColors(swap, [0, 1], [C.violet, C.coral]);
  return (
    <div
      style={{
        position: 'absolute',
        width: w,
        height: h,
        borderRadius: 24,
        backgroundColor: '#1F2440',
        border: `3px solid ${C.stroke}`,
        boxSizing: 'border-box',
        boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
        overflow: 'hidden',
        scale: String(pulse),
        ...style,
      }}
    >
      <div style={{position: 'absolute', left: '8%', top: '12%', width: '84%', height: '42%', borderRadius: 18, backgroundColor: accent}} />
      <div style={{position: 'absolute', left: '8%', top: '64%', width: '60%', height: '9%', borderRadius: 999, backgroundColor: C.paper, opacity: 0.85}} />
      <div style={{position: 'absolute', left: '8%', top: '79%', width: '38%', height: '9%', borderRadius: 999, backgroundColor: C.stroke}} />
      <div style={{position: 'absolute', right: '8%', top: '72%', width: '22%', height: '16%', borderRadius: 999, backgroundColor: accent}} />
    </div>
  );
};

export const SourceScene: React.FC = () => {
  useStudioFonts();
  const frame = useCurrentFrame();
  const {portrait, width, height, mx, my} = useFormat();
  const dur = SCENE.source.duration;
  const size = portrait ? 112 : 120;
  const panelIn = interpolate(frame, [-4, 12], [0, 1], {...CLAMP, easing: EASE});
  const prevIn = interpolate(frame, [8, 20], [0, 1], {...CLAMP, easing: EASE});

  const panel = portrait ? {x: mx, y: 640, w: width - 2 * mx, h: 620} : {x: width - mx - 820, y: 160, w: 820, h: 560};
  const prev = portrait ? {x: width - mx - 420, y: 1150, w: 420, h: 300} : {x: width - mx - 380, y: 620, w: 380, h: 280};

  return (
    <AbsoluteFill>
      <Backdrop glowX={portrait ? 0.4 : 0.3} glowY={portrait ? 0.3 : 0.55} duration={dur} driftY={-0.04} />
      <div
        style={{
          position: 'absolute',
          left: mx,
          top: portrait ? my + 40 : 0,
          height: portrait ? undefined : height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Line start={0} size={size}>
          Editable
        </Line>
        <Line start={4} size={size}>
          Remotion
        </Line>
        <Line start={8} size={size} style={{color: C.coral}}>
          source
        </Line>
      </div>
      <CodePanel
        width={panel.w}
        height={panel.h}
        style={{left: panel.x, top: panel.y, opacity: panelIn, translate: `0px ${(1 - panelIn) * 60}px`}}
      />
      <PreviewCard w={prev.w} h={prev.h} style={{left: prev.x, top: prev.y, opacity: prevIn, translate: `0px ${(1 - prevIn) * 60}px`}} />
    </AbsoluteFill>
  );
};
