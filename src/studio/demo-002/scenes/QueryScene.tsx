import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {useStudioFonts} from '../../demo-001/fonts';
import {Backdrop} from '../../demo-001/components/Backdrop';
import {Line} from '../../demo-001/components/Line';
import {MockDashboard} from '../../demo-001/components/MockDashboard';
import {C, CLAMP, EASE, useFormat} from '../../demo-001/theme';
import {Cursor} from '../components/Cursor';
import {QueryPanel} from '../components/QueryPanel';
import {SCENE} from '../timing';

const CLICK = 18; // local -> f138

export const QueryScene: React.FC = () => {
  useStudioFonts();
  const frame = useCurrentFrame();
  const {portrait, width, mx} = useFormat();
  const dur = SCENE.query.duration;
  const dash = portrait ? {x: mx, y: 620, w: width - 2 * mx, h: 560} : {x: mx, y: 450, w: 760, h: 460};
  const panel = portrait ? {x: width - mx - 600, y: 1150, w: 600, h: 420} : {x: width - mx - 700, y: 470, w: 700, h: 420};
  // value pill centre on KPI tile 2 (MockDashboard geometry, landscape p=0 / portrait p=1)
  const tile = portrait ? {x: 35.3, y: 13, w: 29.3, h: 14} : {x: 48.5, y: 5, w: 23, h: 22};
  const pillX = dash.x + (dash.w * (tile.x + tile.w * 0.46)) / 100;
  const pillY = dash.y + (dash.h * (tile.y + tile.h * 0.62)) / 100;
  const pillW = (dash.w * tile.w * 0.72) / 100;
  const pillH = (dash.h * tile.h * 0.24) / 100;
  const dashIn = interpolate(frame, [-4, 10], [0, 1], {...CLAMP, easing: EASE});
  const sel = interpolate(frame, [CLICK, CLICK + 4], [0, 1], CLAMP);
  const panelIn = interpolate(frame, [22, 38], [0, 1], {...CLAMP, easing: EASE});
  const link = interpolate(frame, [20, 32], [0, 1], {...CLAMP, easing: EASE});
  // connector: from pill to the panel's nearest edge
  const ax = portrait ? pillX + pillW / 2 + 8 : pillX;
  const ay = pillY;
  const bx = portrait ? panel.x + 40 : panel.x;
  const by = portrait ? panel.y : panel.y + 60;
  return (
    <AbsoluteFill>
      <Backdrop glowX={portrait ? 0.4 : 0.35} glowY={portrait ? 0.55 : 0.6} duration={dur} driftY={-0.03} />
      <div style={{position: 'absolute', left: mx, top: portrait ? 290 : 230}}>
        {portrait ? (
          <>
            <Line start={0} size={80} style={{fontWeight: 700, letterSpacing: '-0.01em'}}>Click any number</Line>
            <Line start={4} size={80} style={{fontWeight: 700, letterSpacing: '-0.01em'}}>to see the query</Line>
            <Line start={8} size={80} style={{fontWeight: 700, letterSpacing: '-0.01em'}}>behind it</Line>
          </>
        ) : (
          <>
            <Line start={0} size={72} style={{fontWeight: 700, letterSpacing: '-0.01em'}}>Click any number to see</Line>
            <Line start={4} size={72} style={{fontWeight: 700, letterSpacing: '-0.01em'}}>the query behind it</Line>
          </>
        )}
      </div>
      <MockDashboard width={dash.w} height={dash.h} p={portrait ? 1 : 0} grow={1} draw={1} style={{left: dash.x, top: dash.y, opacity: dashIn}} />
      {/* selection ring on the clicked value pill */}
      <div
        style={{
          position: 'absolute',
          left: pillX - pillW / 2 - 10,
          top: pillY - pillH / 2 - 10,
          width: pillW + 20,
          height: pillH + 20,
          borderRadius: 999,
          border: `4px solid ${C.paper}`,
          opacity: sel,
          scale: String(interpolate(sel, [0, 1], [1.2, 1])),
        }}
      />
      {/* connector line */}
      <svg width={width} height={portrait ? 1920 : 1080} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <path
          d={
            portrait
              ? `M ${ax} ${ay} L ${ax} ${by - 30} L ${bx} ${by - 30} L ${bx} ${by}`
              : // 16:9: leave the pill upward, run above the dashboard (clear of the other tiles), drop into the panel
                `M ${pillX} ${pillY - pillH / 2 - 12} L ${pillX} ${dash.y - 26} L ${panel.x + 90} ${dash.y - 26} L ${panel.x + 90} ${panel.y}`
          }
          fill="none"
          stroke={C.coral}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - link}
        />
      </svg>
      <QueryPanel
        width={panel.w}
        height={panel.h}
        start={26}
        style={{left: panel.x, top: panel.y, opacity: panelIn, translate: portrait ? `0px ${(1 - panelIn) * 60}px` : `${(1 - panelIn) * -80}px 0px`}}
      />
      <Cursor x0={pillX + 260} y0={pillY + 300} x1={pillX} y1={pillY} moveFrom={2} clickAt={CLICK} />
    </AbsoluteFill>
  );
};
