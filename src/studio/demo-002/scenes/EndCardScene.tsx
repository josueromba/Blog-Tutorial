import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {useStudioFonts} from '../../demo-001/fonts';
import {Backdrop} from '../../demo-001/components/Backdrop';
import {Line} from '../../demo-001/components/Line';
import {C, CLAMP, EASE, FONT, reveal, useFormat} from '../../demo-001/theme';
import {SCENE} from '../timing';
import {useCopy} from '../copy';

/** End card: studio sign-off + tag, then disclaimer and source (56 px). All land by local 22 (f382). */
export const EndCardScene: React.FC = () => {
  useStudioFonts();
  const copy = useCopy();
  const frame = useCurrentFrame();
  const {portrait} = useFormat();
  const mark = interpolate(frame, [-4, 10], [0, 1], {...CLAMP, easing: EASE});
  const tag = interpolate(frame, [6, 14], [0, 1], {...CLAMP, easing: EASE});
  const small = (start: number, color: string = C.paper): React.CSSProperties => ({
    fontFamily: FONT,
    fontWeight: 500,
    fontSize: 56,
    lineHeight: 1.18,
    color,
    whiteSpace: 'nowrap',
    ...reveal(frame, start, 8, 24),
  });
  const ns = 96;
  return (
    <AbsoluteFill>
      <Backdrop glowX={0.5} glowY={0.45} duration={SCENE.endCard.duration} driftX={0} driftY={0.02} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: portrait ? 270 : 190,
          bottom: portrait ? 230 : 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{width: 40, height: 40, borderRadius: 8, rotate: `${interpolate(mark, [0, 1], [0, 45])}deg`, scale: String(mark), backgroundColor: C.coral, marginBottom: 32}} />
        {portrait ? (
          <>
            <Line start={0} dur={8} size={ns}>Claude Code</Line>
            <Line start={2} dur={8} size={ns}>Motion Design</Line>
            <Line start={4} dur={8} size={ns}>Studio</Line>
          </>
        ) : (
          <>
            <Line start={0} dur={8} size={ns}>Claude Code</Line>
            <Line start={2} dur={8} size={ns}>Motion Design Studio</Line>
          </>
        )}
        <div
          style={{
            marginTop: 28,
            padding: '8px 32px 10px',
            borderRadius: 999,
            border: `3px solid ${C.coral}`,
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 56,
            lineHeight: 1.1,
            color: C.paper,
            opacity: interpolate(frame, [3, 9], [0, 1], CLAMP),
            scale: String(interpolate(tag, [0, 1], [0.85, 1])),
            whiteSpace: 'nowrap',
          }}
        >
          {copy.end.tag}
        </div>
        <div style={{width: 360, height: 2, backgroundColor: C.stroke, margin: '32px 0 22px', opacity: tag}} />
        {(portrait ? copy.end.portrait : copy.end.landscape).disc.map((l, i) => (
          <div key={`d${i}`} style={small(l.start)}>
            {l.t}
          </div>
        ))}
        {(portrait ? copy.end.portrait : copy.end.landscape).src.map((l, i) => (
          <div key={`s${i}`} style={i === 0 ? {...small(l.start, '#C9CCE0'), marginTop: portrait ? 14 : 12} : small(l.start, '#C9CCE0')}>
            {l.t}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
