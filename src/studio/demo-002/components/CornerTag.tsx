import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT, useFormat} from '../../demo-001/theme';
import {useCopy} from '../copy';

/** Persistent "Unofficial explainer" tag, top-left inside the safe area, drawn above every scene (f0-f449). */
export const CornerTag: React.FC<{readonly size?: number}> = ({size: sizeProp}) => {
  const copy = useCopy();
  const size = sizeProp ?? copy.cornerSize;
  const {mx, my} = useFormat();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          left: mx,
          top: my,
          padding: `${Math.round(size * 0.18)}px ${Math.round(size * 0.5)}px ${Math.round(size * 0.22)}px`,
          borderRadius: 999,
          border: `3px solid ${C.stroke}`,
          backgroundColor: 'rgba(11,13,23,0.85)',
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: size,
          lineHeight: 1.1,
          color: C.paper,
          whiteSpace: 'nowrap',
        }}
      >
        {copy.cornerTag}
      </div>
    </AbsoluteFill>
  );
};
