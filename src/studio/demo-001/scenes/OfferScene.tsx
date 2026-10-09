import React from 'react';
import {useStudioFonts} from '../fonts';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {Line} from '../components/Line';
import {MockDashboard} from '../components/MockDashboard';
import {SCENE} from '../timing';
import {C, CLAMP, EASE, useFormat} from '../theme';

export const OfferScene: React.FC = () => {
  useStudioFonts();
  const frame = useCurrentFrame();
  const {portrait, width, height, mx, my} = useFormat();
  const dur = SCENE.offer.duration;

  const cardIn = interpolate(frame, [-4, 18], [0, 1], {...CLAMP, easing: EASE});
  const grow = interpolate(frame, [21, 45], [0, 1], {...CLAMP, easing: EASE});
  const draw = interpolate(frame, [30, 60], [0, 1], {...CLAMP, easing: EASE});
  const timer = interpolate(frame, [0, dur - 1], [0, 1], CLAMP);

  const bigSize = portrait ? 180 : 200;
  const subSize = portrait ? 112 : 120;

  const card = portrait
    ? {w: width - 2 * mx, h: 900, x: mx, y: 700}
    : {w: 780, h: 520, x: width - mx - 780, y: (height - 520) / 2};

  return (
    <AbsoluteFill>
      <Backdrop glowX={portrait ? 0.7 : 0.72} glowY={portrait ? 0.62 : 0.45} duration={dur} driftX={-0.05} />
      {/* text block */}
      <div
        style={{
          position: 'absolute',
          left: mx,
          top: portrait ? my + 80 : 0,
          height: portrait ? undefined : height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{position: 'relative', alignSelf: 'flex-start'}}>
          <Line start={0} size={bigSize} style={{color: C.paper}}>
            15&nbsp;s
          </Line>
          {/* 15-second "timer" bar under the number, fills over the scene */}
          <div
            style={{
              position: 'absolute',
              left: 6,
              right: 6,
              bottom: -14,
              height: 12,
              borderRadius: 999,
              backgroundColor: C.stroke,
              opacity: interpolate(frame, [4, 10], [0, 1], CLAMP),
            }}
          >
            <div style={{width: `${timer * 100}%`, height: '100%', borderRadius: 999, backgroundColor: C.coral}} />
          </div>
        </div>
        <Line start={4} size={subSize} style={{marginTop: portrait ? 36 : 44}}>
          SaaS video
        </Line>
      </div>
      {/* fictional dashboard */}
      <MockDashboard
        width={card.w}
        height={card.h}
        p={portrait ? 1 : 0}
        grow={grow}
        draw={draw}
        style={{
          left: card.x,
          top: card.y,
          opacity: cardIn,
          translate: portrait ? `0px ${(1 - cardIn) * 120}px` : `${(1 - cardIn) * 140}px 0px`,
        }}
      />
    </AbsoluteFill>
  );
};
