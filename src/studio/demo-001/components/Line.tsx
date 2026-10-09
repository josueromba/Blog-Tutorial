import React from 'react';
import {useCurrentFrame} from 'remotion';
import {headline, reveal} from '../theme';

/** One headline line that rises in at `start` (scene-local frame) and lands at start + dur. */
export const Line: React.FC<{
  readonly start: number;
  readonly dur?: number;
  readonly size: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({start, dur = 10, size, style, children}) => {
  const frame = useCurrentFrame();
  return <div style={{...headline(size), ...reveal(frame, start, dur), ...style}}>{children}</div>;
};
