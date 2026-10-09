import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {useStudioFonts} from '../../demo-001/fonts';
import {Backdrop} from '../../demo-001/components/Backdrop';
import {Line} from '../../demo-001/components/Line';
import {C, CLAMP, EASE, FONT, reveal, useFormat} from '../../demo-001/theme';
import {MiniEditor} from '../components/MiniEditor';
import {SCENE} from '../timing';
import {useCopy} from '../copy';

// local: drag 10..22 (f250-262), download arrow 26 (f266), file pop ~32 (f272); pill lands 18 (f258), check 18..26
export const EditScene: React.FC = () => {
  useStudioFonts();
  const copy = useCopy();
  const frame = useCurrentFrame();
  const {portrait, width, mx} = useFormat();
  const dur = SCENE.edit.duration;
  const check = interpolate(frame, [18, 26], [0, 1], {...CLAMP, easing: EASE});
  const ed = portrait ? {x: mx, y: 680, w: width - 2 * mx, h: 760} : {x: mx, y: 260, w: copy.edit.editW16, h: 620};
  const textX = portrait ? mx : copy.edit.textX16;
  const textY = portrait ? 290 : 300;
  const body = {fontWeight: 700, letterSpacing: '-0.01em'} as const;
  return (
    <AbsoluteFill>
      <Backdrop glowX={portrait ? 0.5 : 0.3} glowY={portrait ? 0.65 : 0.5} duration={dur} />
      <MiniEditor x={ed.x} y={ed.y} width={ed.w} height={ed.h} dragFrom={10} dragTo={22} downloadAt={26} />
      <div style={{position: 'absolute', left: textX, top: textY}}>
        <Line start={0} size={80} style={body}>{copy.edit.lines[0]}</Line>
        <Line start={4} size={80} style={body}>{copy.edit.lines[1]}</Line>
        <div
          style={{
            marginTop: 36,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 18,
            padding: '12px 30px 14px 20px',
            borderRadius: 999,
            border: `3px solid ${C.mint}`,
            backgroundColor: 'rgba(61,220,151,0.08)',
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 1.1,
            color: C.paper,
            whiteSpace: 'nowrap',
            ...reveal(frame, 8, 10),
          }}
        >
          <svg width={48} height={48} viewBox="0 0 40 40">
            <path d="M 8 21 L 17 30 L 33 11" fill="none" stroke={C.mint} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - check} />
          </svg>
          {copy.edit.pill}
        </div>
      </div>
    </AbsoluteFill>
  );
};
