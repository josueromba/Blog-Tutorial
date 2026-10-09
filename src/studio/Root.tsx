import React from 'react';
import {Composition, Folder} from 'remotion';
import {Demo001} from './demo-001/Demo001';
import {HookScene} from './demo-001/scenes/HookScene';
import {OfferScene} from './demo-001/scenes/OfferScene';
import {FormatsScene} from './demo-001/scenes/FormatsScene';
import {SourceScene} from './demo-001/scenes/SourceScene';
import {RevisionScene} from './demo-001/scenes/RevisionScene';
import {EndCardScene} from './demo-001/scenes/EndCardScene';

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
    </>
  );
};
