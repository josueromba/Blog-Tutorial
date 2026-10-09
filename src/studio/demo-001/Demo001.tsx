import React from 'react';
import {useStudioFonts} from './fonts';
import {AbsoluteFill, Series, staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {TimelineStrip} from './components/TimelineStrip';
import {HookScene} from './scenes/HookScene';
import {OfferScene} from './scenes/OfferScene';
import {FormatsScene} from './scenes/FormatsScene';
import {SourceScene} from './scenes/SourceScene';
import {RevisionScene} from './scenes/RevisionScene';
import {EndCardScene} from './scenes/EndCardScene';
import {C} from './theme';
import {SCENE} from './timing';

// One component tree for both formats; each scene recomposes from useVideoConfig().
// Hard cuts (Series) keep cut frames exact: 0 / 75 / 165 / 255 / 330 / 390, total 450.
// Durations come from SCENE in ./timing.ts, shared with the synth script.
export const Demo001: React.FC = () => {
  useStudioFonts();
  return (
    <AbsoluteFill style={{backgroundColor: C.ink}}>
      <Series>
        <Series.Sequence name="Hook" durationInFrames={SCENE.hook.duration}>
          <HookScene />
        </Series.Sequence>
        <Series.Sequence name="Offer" durationInFrames={SCENE.offer.duration}>
          <OfferScene />
        </Series.Sequence>
        <Series.Sequence name="Formats" durationInFrames={SCENE.formats.duration}>
          <FormatsScene />
        </Series.Sequence>
        <Series.Sequence name="Source" durationInFrames={SCENE.source.duration}>
          <SourceScene />
        </Series.Sequence>
        <Series.Sequence name="Revision" durationInFrames={SCENE.revision.duration}>
          <RevisionScene />
        </Series.Sequence>
        <Series.Sequence name="End card" durationInFrames={SCENE.endCard.duration}>
          <EndCardScene />
        </Series.Sequence>
      </Series>
      <TimelineStrip />
      <Audio name="Score (synth-score.mts)" src={staticFile('studio/demo-001/score.wav')} />
    </AbsoluteFill>
  );
};
