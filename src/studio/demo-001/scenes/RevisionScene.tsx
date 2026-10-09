import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {CheckBadge} from '../components/CheckBadge';
import {Line} from '../components/Line';
import {SCENE} from '../timing';
import {useFormat} from '../theme';

export const RevisionScene: React.FC = () => {
  const {portrait, height} = useFormat();
  const size = portrait ? 112 : 132;
  return (
    <AbsoluteFill>
      <Backdrop glowX={portrait ? 0.5 : 0.35} glowY={portrait ? 0.4 : 0.5} duration={SCENE.revision.duration} />
      <AbsoluteFill
        style={{
          flexDirection: portrait ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: portrait ? 90 : 90,
          paddingBottom: portrait ? height * 0.04 : 0,
        }}
      >
        <CheckBadge size={portrait ? 360 : 320} />
        <div style={{textAlign: portrait ? 'center' : 'left'}}>
          <Line start={0} size={size}>
            1 revision
          </Line>
          <Line start={4} size={size}>
            included
          </Line>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
