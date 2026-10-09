import {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';

// Bundled Inter (OFL-1.1) from public/studio/demo-001/fonts, exposed as "StudioInter".
// NOTE: on this machine the system `sans-serif` resolves to Inter too, so a silent
// fallback would look identical. We therefore assert each face reached
// status === 'loaded' and cancel the render otherwise.
export const FONT_FAMILY = 'StudioInter';

const FILES = [
  ['500', 'StudioInter-Medium.otf'],
  ['700', 'StudioInter-Bold.otf'],
  ['800', 'StudioInter-ExtraBold.otf'],
] as const;

let fontsPromise: Promise<void> | null = null;

// Lazily started from a component effect (never at module scope): a delayRender()
// created during bundle evaluation is orphaned and its timeout later cancels the render.
const loadStudioFonts = (): Promise<void> => {
  if (!fontsPromise) {
    fontsPromise = Promise.all(
      FILES.map(([weight, file]) =>
        loadFont({family: FONT_FAMILY, url: staticFile(`studio/demo-001/fonts/${file}`), weight}),
      ),
    ).then(() => {
      const loaded: string[] = [];
      document.fonts.forEach((face) => {
        if (face.family.replace(/["']/g, '') === FONT_FAMILY && face.status === 'loaded') {
          loaded.push(face.weight);
        }
      });
      for (const [weight] of FILES) {
        if (!loaded.includes(weight)) {
          throw new Error(`${FONT_FAMILY} weight ${weight} did not load (loaded: ${loaded.join(',') || 'none'})`);
        }
      }
    });
  }
  return fontsPromise;
};

/** Call in every component that renders text (composition root and each scene). */
export const useStudioFonts = () => {
  const [handle] = useState(() => delayRender(`Loading ${FONT_FAMILY} (bundled Inter OTF)`));
  useEffect(() => {
    loadStudioFonts()
      .then(() => continueRender(handle))
      .catch((err) => cancelRender(err));
  }, [handle]);
};
