import React from 'react';
import {CopyContext, FR} from './copy';
import {Demo002} from './Demo002';

// French version: identical timeline, motion and score; only the copy context changes.
export const Demo002Fr: React.FC = () => (
  <CopyContext.Provider value={FR}>
    <Demo002 />
  </CopyContext.Provider>
);
