import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useStudioFonts} from '../../demo-001/fonts';
import {Backdrop} from '../../demo-001/components/Backdrop';
import {Line} from '../../demo-001/components/Line';
import {C, useFormat} from '../../demo-001/theme';
import {InputField, OptionChip, PreviewCanvas} from '../components/InputField';
import {SCENE} from '../timing';
import {useCopy} from '../copy';

// local frames: typing 8..20 (f188-200), chip pop 24 (f204), preview pop 30 (f210)
export const MotionScene: React.FC = () => {
  useStudioFonts();
  const copy = useCopy();
  const {portrait, width, mx} = useFormat();
  const dur = SCENE.motion.duration;
  const right = portrait ? {x: mx, w: width - 2 * mx} : {x: width - mx - 760, w: 760};
  const fieldY = portrait ? 650 : 280;
  const chipY = portrait ? 830 : 460;
  const prevY = portrait ? 980 : 600;
  const prevH = portrait ? 520 : 320;
  const body = {fontWeight: 700, letterSpacing: '-0.01em'} as const;
  return (
    <AbsoluteFill>
      <Backdrop glowX={portrait ? 0.5 : 0.7} glowY={portrait ? 0.6 : 0.5} duration={dur} driftX={-0.03} />
      <div style={{position: 'absolute', left: mx, top: portrait ? 290 : 300}}>
        <Line start={0} size={112}>
          Claude <span style={{color: C.violet}}>Motion</span>
        </Line>
        <div style={{height: 24}} />
        <Line start={4} size={64} style={body}>
          {copy.motion.typePre}
          <span style={{color: C.coral}}>/motion</span>
          {copy.motion.typePost}
        </Line>
        <Line start={8} size={64} style={body}>{copy.motion.line2}</Line>
      </div>
      <InputField width={right.w} height={150} typeFrom={8} fontSize={60} style={{left: right.x, top: fieldY}} />
      <OptionChip width={right.w} height={110} popAt={24} style={{left: right.x, top: chipY}} />
      <PreviewCanvas width={right.w} height={prevH} popAt={30} style={{left: right.x, top: prevY}} />
    </AbsoluteFill>
  );
};
