import React from 'react';
import {Composition, Folder} from 'remotion';
import {Demo001} from './demo-001/Demo001';
import {HookScene} from './demo-001/scenes/HookScene';
import {OfferScene} from './demo-001/scenes/OfferScene';
import {FormatsScene} from './demo-001/scenes/FormatsScene';
import {SourceScene} from './demo-001/scenes/SourceScene';
import {RevisionScene} from './demo-001/scenes/RevisionScene';
import {EndCardScene} from './demo-001/scenes/EndCardScene';
import {Demo002} from './demo-002/Demo002';
import {HookScene as D2Hook} from './demo-002/scenes/HookScene';
import {DashboardsScene as D2Dashboards} from './demo-002/scenes/DashboardsScene';
import {QueryScene as D2Query} from './demo-002/scenes/QueryScene';
import {MotionScene as D2Motion} from './demo-002/scenes/MotionScene';
import {EditScene as D2Edit} from './demo-002/scenes/EditScene';
import {BetaScene as D2Beta} from './demo-002/scenes/BetaScene';
import {EndCardScene as D2EndCard} from './demo-002/scenes/EndCardScene';

export const StudioRoot: React.FC = () => {
  return (
    <>
      <Folder name="demo-001">
        <Composition id="Demo001Landscape" component={Demo001} width={1920} height={1080} fps={30} durationInFrames={450} />
        <Composition id="Demo001Vertical" component={Demo001} width={1080} height={1920} fps={30} durationInFrames={450} />
      </Folder>
      <Folder name="demo-001-scenes">
        <Composition id="Demo001-Hook" component={HookScene} width={1920} height={1080} fps={30} durationInFrames={75} />
        <Composition id="Demo001-Offer" component={OfferScene} width={1920} height={1080} fps={30} durationInFrames={90} />
        <Composition id="Demo001-Formats" component={FormatsScene} width={1920} height={1080} fps={30} durationInFrames={90} />
        <Composition id="Demo001-Source" component={SourceScene} width={1920} height={1080} fps={30} durationInFrames={75} />
        <Composition id="Demo001-Revision" component={RevisionScene} width={1920} height={1080} fps={30} durationInFrames={60} />
        <Composition id="Demo001-EndCard" component={EndCardScene} width={1920} height={1080} fps={30} durationInFrames={60} />
      </Folder>
      <Folder name="demo-002">
        <Composition id="Demo002Landscape" component={Demo002} width={1920} height={1080} fps={30} durationInFrames={450} />
        <Composition id="Demo002Vertical" component={Demo002} width={1080} height={1920} fps={30} durationInFrames={450} />
      </Folder>
      <Folder name="demo-002-scenes">
        <Composition id="Demo002-Hook" component={D2Hook} width={1920} height={1080} fps={30} durationInFrames={60} />
        <Composition id="Demo002-Dashboards" component={D2Dashboards} width={1920} height={1080} fps={30} durationInFrames={60} />
        <Composition id="Demo002-Query" component={D2Query} width={1920} height={1080} fps={30} durationInFrames={60} />
        <Composition id="Demo002-Motion" component={D2Motion} width={1920} height={1080} fps={30} durationInFrames={60} />
        <Composition id="Demo002-Edit" component={D2Edit} width={1920} height={1080} fps={30} durationInFrames={60} />
        <Composition id="Demo002-Beta" component={D2Beta} width={1920} height={1080} fps={30} durationInFrames={60} />
        <Composition id="Demo002-EndCard" component={D2EndCard} width={1920} height={1080} fps={30} durationInFrames={90} />
      </Folder>
    </>
  );
};
