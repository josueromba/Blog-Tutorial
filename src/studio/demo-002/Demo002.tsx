import React from 'react';
import {AbsoluteFill, Series, staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {useStudioFonts} from '../demo-001/fonts';
import {C} from '../demo-001/theme';
import {TimelineStrip} from '../demo-001/components/TimelineStrip';
import {CornerTag} from './components/CornerTag';
import {HookScene} from './scenes/HookScene';
import {DashboardsScene} from './scenes/DashboardsScene';
import {QueryScene} from './scenes/QueryScene';
import {MotionScene} from './scenes/MotionScene';
import {EditScene} from './scenes/EditScene';
import {BetaScene} from './scenes/BetaScene';
import {EndCardScene} from './scenes/EndCardScene';
import {CUTS, SCENE} from './timing';

// Unofficial explainer. Hard cuts at 0/60/120/180/240/300/360, total 450.
export const Demo002: React.FC = () => {
  useStudioFonts();
  return (
    <AbsoluteFill style={{backgroundColor: C.ink}}>
      <Series>
        <Series.Sequence name="Hook" durationInFrames={SCENE.hook.duration}>
          <HookScene />
        </Series.Sequence>
        <Series.Sequence name="Dashboards" durationInFrames={SCENE.dashboards.duration}>
          <DashboardsScene />
        </Series.Sequence>
        <Series.Sequence name="Query" durationInFrames={SCENE.query.duration}>
          <QueryScene />
        </Series.Sequence>
        <Series.Sequence name="Motion" durationInFrames={SCENE.motion.duration}>
          <MotionScene />
        </Series.Sequence>
        <Series.Sequence name="Edit + MP4" durationInFrames={SCENE.edit.duration}>
          <EditScene />
        </Series.Sequence>
        <Series.Sequence name="Beta" durationInFrames={SCENE.beta.duration}>
          <BetaScene />
        </Series.Sequence>
        <Series.Sequence name="End card" durationInFrames={SCENE.endCard.duration}>
          <EndCardScene />
        </Series.Sequence>
      </Series>
      <TimelineStrip cuts={CUTS} />
      <CornerTag />
      <Audio name="Score (demo-002 synth-score.mts)" src={staticFile('studio/demo-002/score.wav')} />
    </AbsoluteFill>
  );
};
