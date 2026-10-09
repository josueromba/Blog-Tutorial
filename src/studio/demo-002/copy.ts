import {createContext, useContext} from 'react';

// On-screen copy for demo-002, per locale. EN is the default and must render
// byte-identically to the pre-locale build. FR copy is owned by the main session
// (jobs/demo-002/brief-fr.md); do not reword. Only line breaks are chosen here.
// French typography: U+202F (narrow no-break space) before ":".

const NNBSP = ' ';

export type HookWord = {readonly t: string; readonly violet?: boolean; readonly start: number};
export type TimedLine = {readonly t: string; readonly start: number};

export type Copy = {
  readonly cornerTag: string;
  readonly cornerSize: number;
  readonly hook: {readonly landscape: readonly (readonly HookWord[])[]; readonly portrait: readonly (readonly HookWord[])[]};
  readonly dashboards: {readonly body: readonly [string, string]};
  readonly query: {readonly landscape: readonly string[]; readonly portrait: readonly string[]};
  readonly motion: {readonly typePre: string; readonly typePost: string; readonly line2: string};
  readonly edit: {readonly lines: readonly [string, string]; readonly pill: string; readonly editW16: number; readonly textX16: number};
  readonly beta: {readonly headline: string; readonly headlineSize9x16: number; readonly row1: string; readonly row2: string};
  readonly end: {
    readonly tag: string;
    readonly landscape: {readonly disc: readonly TimedLine[]; readonly src: readonly TimedLine[]};
    readonly portrait: {readonly disc: readonly TimedLine[]; readonly src: readonly TimedLine[]};
  };
};

export const EN: Copy = {
  cornerTag: 'Unofficial explainer',
  cornerSize: 56,
  hook: {
    landscape: [
      [{t: 'New in Claude:', start: 0}],
      [
        {t: 'Dashboards', violet: true, start: 4},
        {t: '+', start: 4},
        {t: 'Motion', violet: true, start: 4},
      ],
    ],
    portrait: [
      [{t: 'New in Claude:', start: 0}],
      [
        {t: 'Dashboards', violet: true, start: 4},
        {t: '+', start: 6},
      ],
      [{t: 'Motion', violet: true, start: 8}],
    ],
  },
  dashboards: {body: ['Your data, as a dashboard', 'that stays current']},
  query: {
    landscape: ['Click any number to see', 'the query behind it'],
    portrait: ['Click any number', 'to see the query', 'behind it'],
  },
  motion: {typePre: 'Type ', typePost: ' for an', line2: 'animated explainer'},
  edit: {lines: ['Edit it, then', 'download an MP4'], pill: 'No generated footage', editW16: 760, textX16: 974},
  beta: {headline: 'Both in beta', headlineSize9x16: 112, row1: 'Dashboards: paid plans', row2: 'Motion: Team & Enterprise'},
  end: {
    tag: 'studio demo',
    landscape: {
      disc: [
        {t: 'Unofficial explainer ·', start: 8},
        {t: 'not affiliated with Anthropic', start: 10},
      ],
      src: [{t: 'Source: claude.com, Oct 8, 2026', start: 12}],
    },
    portrait: {
      disc: [
        {t: 'Unofficial explainer ·', start: 8},
        {t: 'not affiliated', start: 10},
        {t: 'with Anthropic', start: 12},
      ],
      src: [
        {t: 'Source: claude.com,', start: 12},
        {t: 'Oct 8, 2026', start: 14},
      ],
    },
  },
};

export const FR: Copy = {
  cornerTag: 'Explication non officielle',
  cornerSize: 56,
  hook: {
    landscape: [
      [{t: `Nouveau dans Claude${NNBSP}:`, start: 0}],
      [
        {t: 'Dashboards', violet: true, start: 4},
        {t: '+', start: 4},
        {t: 'Motion', violet: true, start: 4},
      ],
    ],
    portrait: [
      [{t: 'Nouveau dans', start: 0}],
      [{t: `Claude${NNBSP}:`, start: 2}],
      [
        {t: 'Dashboards', violet: true, start: 4},
        {t: '+', start: 6},
      ],
      [{t: 'Motion', violet: true, start: 8}],
    ],
  },
  dashboards: {body: ['Vos données en tableau', 'de bord, toujours à jour']},
  query: {
    landscape: ['Cliquez sur un chiffre', 'pour voir sa requête'],
    portrait: ['Cliquez sur un chiffre', 'pour voir sa requête'],
  },
  motion: {typePre: 'Tapez ', typePost: ' pour une', line2: 'vidéo explicative animée'},
  // 16:9: narrower editor so the 56 px pill stays inside the right safe line
  edit: {lines: ['Modifiez-la, puis', 'téléchargez un MP4'], pill: 'Aucune séquence générée', editW16: 680, textX16: 894},
  beta: {headline: 'Les deux en bêta', headlineSize9x16: 104, row1: `Dashboards${NNBSP}: offres payantes`, row2: `Motion${NNBSP}: Team et Enterprise`},
  end: {
    tag: 'démo studio',
    landscape: {
      disc: [
        {t: 'Explication non officielle ·', start: 8},
        {t: 'sans lien avec Anthropic', start: 10},
      ],
      src: [{t: `Source${NNBSP}: claude.com, 8 oct. 2026`, start: 12}],
    },
    portrait: {
      disc: [
        {t: 'Explication non officielle ·', start: 8},
        {t: 'sans lien avec Anthropic', start: 10},
      ],
      src: [
        {t: `Source${NNBSP}: claude.com,`, start: 12},
        {t: '8 oct. 2026', start: 14},
      ],
    },
  },
};

export const CopyContext = createContext<Copy>(EN);
export const useCopy = () => useContext(CopyContext);
