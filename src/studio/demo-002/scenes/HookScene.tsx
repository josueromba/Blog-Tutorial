import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {useStudioFonts} from '../../demo-001/fonts';
import {Backdrop} from '../../demo-001/components/Backdrop';
import {C, CLAMP, EASE, headline, reveal, useFormat} from '../../demo-001/theme';
import {SCENE} from '../timing';
import {useCopy} from '../copy';

const MiniChartCard: React.FC<{readonly w: number; readonly h: number}> = ({w, h}) => (
  <div style={{width: w, height: h, borderRadius: 20, backgroundColor: C.surface, border: `3px solid ${C.stroke}`, boxSizing: 'border-box', position: 'relative'}}>
    <div style={{position: 'absolute', left: '8%', right: '8%', top: '18%', bottom: '16%', display: 'flex', alignItems: 'flex-end', gap: '6%'}}>
      {[0.4, 0.62, 0.5, 0.8, 0.95].map((v, i) => (
        <div key={i} style={{flex: 1, height: `${v * 100}%`, borderRadius: 8, backgroundColor: i === 4 ? C.coral : C.violet}} />
      ))}
    </div>
  </div>
);

const MiniEditorCard: React.FC<{readonly w: number; readonly h: number; readonly frame: number}> = ({w, h, frame}) => {
  const play = interpolate(frame, [0, SCENE.hook.duration], [0.15, 0.85], CLAMP);
  return (
    <div style={{width: w, height: h, borderRadius: 20, backgroundColor: C.surface, border: `3px solid ${C.stroke}`, boxSizing: 'border-box', position: 'relative'}}>
      <div style={{position: 'absolute', left: '8%', top: '14%', width: '84%', height: '44%', borderRadius: 12, backgroundColor: C.ink}}>
        <div style={{position: 'absolute', left: `${10 + 60 * play}%`, top: '22%', width: h * 0.24, height: h * 0.24, borderRadius: '50%', backgroundColor: C.mint}} />
      </div>
      <div style={{position: 'absolute', left: '8%', top: '74%', width: '84%', height: 6, borderRadius: 3, backgroundColor: C.stroke}} />
      {[0.1, 0.45, 0.85].map((k, i) => (
        <div key={i} style={{position: 'absolute', left: `calc(${8 + 84 * k}% - 11px)`, top: 'calc(74% - 8px)', width: 22, height: 22, borderRadius: 4, rotate: '45deg', backgroundColor: i === 1 ? C.coral : C.violet}} />
      ))}
      <div style={{position: 'absolute', left: `calc(${8 + 84 * play}% - 2px)`, top: '64%', width: 4, height: '22%', borderRadius: 2, backgroundColor: C.paper}} />
    </div>
  );
};

export const HookScene: React.FC = () => {
  useStudioFonts();
  const copy = useCopy();
  const frame = useCurrentFrame();
  const {portrait, width, mx} = useFormat();
  const dur = SCENE.hook.duration;
  const lock = interpolate(frame, [0, 12], [0, 1], {...CLAMP, easing: EASE});
  const bump = interpolate(frame, [11, 13, 18], [1, 1.04, 1], CLAMP);
  const drift = interpolate(frame, [0, dur], [1, 1.03], CLAMP);
  const size = portrait ? 104 : 120;
  const cw = portrait ? width - 2 * mx : 430;
  const ch = portrait ? 230 : 230;

  const word = (start: number, color: string, text: string) => (
    <span style={{display: 'inline-block', color, ...reveal(frame, start, 10)}}>{text}</span>
  );

  return (
    <AbsoluteFill>
      <Backdrop glowX={0.5} glowY={portrait ? 0.4 : 0.35} duration={dur} />
      <div
        style={{
          position: 'absolute',
          left: portrait ? mx : 0,
          right: portrait ? undefined : 0,
          top: portrait ? 430 : 290,
          textAlign: portrait ? 'left' : 'center',
          ...headline(size),
          scale: String(drift),
          transformOrigin: portrait ? 'left center' : 'center center',
        }}
      >
        {(portrait ? copy.hook.portrait : copy.hook.landscape).map((ws, i) => (
          <div key={i}>
            {ws.map((w, j) => (
              <React.Fragment key={j}>
                {j > 0 ? ' ' : null}
                {word(w.start, w.violet ? C.violet : C.paper, w.t)}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      {/* two generic cards lock together */}
      {portrait ? (
        <>
          <div style={{position: 'absolute', left: mx, top: 1000, translate: `${(1 - lock) * -900}px 0px`, scale: String(bump)}}>
            <MiniChartCard w={cw} h={ch} />
          </div>
          <div style={{position: 'absolute', left: mx, top: 1000 + ch + 24, translate: `${(1 - lock) * 900}px 0px`, scale: String(bump)}}>
            <MiniEditorCard w={cw} h={ch} frame={frame} />
          </div>
        </>
      ) : (
        <>
          <div style={{position: 'absolute', left: width / 2 - cw - 12, top: 650, translate: `${(1 - lock) * -900}px 0px`, scale: String(bump)}}>
            <MiniChartCard w={cw} h={ch} />
          </div>
          <div style={{position: 'absolute', left: width / 2 + 12, top: 650, translate: `${(1 - lock) * 900}px 0px`, scale: String(bump)}}>
            <MiniEditorCard w={cw} h={ch} frame={frame} />
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
