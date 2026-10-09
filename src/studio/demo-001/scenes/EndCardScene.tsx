import React from 'react';
import {useStudioFonts} from '../fonts';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {Line} from '../components/Line';
import {SCENE} from '../timing';
import {C, CLAMP, EASE, FONT, useFormat} from '../theme';

/** Same end card in both formats: diamond mark, 3-line wordmark, "studio demo" tag. */
export const EndCardScene: React.FC = () => {
  useStudioFonts();
  const frame = useCurrentFrame();
  const {portrait} = useFormat();
  const size = portrait ? 104 : 120;
  const mark = interpolate(frame, [-4, 10], [0, 1], {...CLAMP, easing: EASE});
  const tag = interpolate(frame, [6, 14], [0, 1], {...CLAMP, easing: EASE});

  return (
    <AbsoluteFill>
      <Backdrop glowX={0.5} glowY={0.45} duration={SCENE.endCard.duration} driftX={0} driftY={0.02} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            rotate: `${interpolate(mark, [0, 1], [0, 45])}deg`,
            scale: String(mark),
            backgroundColor: C.coral,
            marginBottom: 56,
          }}
        />
        <div style={{textAlign: 'center'}}>
          <Line start={0} dur={8} size={size}>
            Claude Code
          </Line>
          <Line start={2} dur={8} size={size}>
            Motion Design
          </Line>
          <Line start={4} dur={8} size={size}>
            Studio
          </Line>
        </div>
        <div
          style={{
            marginTop: 56,
            padding: '12px 36px 14px',
            borderRadius: 999,
            border: `3px solid ${C.coral}`,
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 56,
            lineHeight: 1.1,
            color: C.paper,
            opacity: interpolate(frame, [6, 11], [0, 1], CLAMP),
            scale: String(interpolate(tag, [0, 1], [0.85, 1])),
            whiteSpace: 'nowrap',
          }}
        >
          studio demo
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
