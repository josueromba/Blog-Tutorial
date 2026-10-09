# Asset sources - demo-001

Every asset in this job is local. No stock media, samples, logos or downloaded audio are used. Nothing is fetched at render time.

| Asset | Path | Origin | License | Notes |
|---|---|---|---|---|
| Inter Medium (500) | `public/studio/demo-001/fonts/StudioInter-Medium.otf` | Copied byte-for-byte from the system package `fonts-inter 4.0+ds-1`: `/usr/share/fonts/opentype/inter/Inter-Medium.otf` | SIL OFL 1.1 (The Inter Project Authors) | sha256 `1e65171fccd6f445b7742728454620ec2867356c849af78e71bf2c4f0e3d97ba`. Loaded under the family name `StudioInter` via `@remotion/fonts` |
| Inter Bold (700) | `public/studio/demo-001/fonts/StudioInter-Bold.otf` | Same package: `Inter-Bold.otf` | SIL OFL 1.1 | sha256 `00fd6f4691ee8884a33b46bf45851b341927c37c30064f558e1befb242971c49` |
| Inter ExtraBold (800) | `public/studio/demo-001/fonts/StudioInter-ExtraBold.otf` | Same package: `Inter-ExtraBold.otf` | SIL OFL 1.1 | sha256 `2012ceaf1470372c415f95c00495a1ad1ebdcd1cd6a6225808f011d459a9b12a` |
| Font license text | `public/studio/demo-001/fonts/OFL-and-copyright.txt` | Copied from `/usr/share/doc/fonts-inter/copyright` | - | Shipped alongside the fonts, as the OFL requires |
| Score (music + SFX) | `public/studio/demo-001/score.wav` | Original. Synthesised by `scripts/studio/demo-001/synth-score.mts` (Node 22, no dependencies, seeded PRNG `mulberry32(20261009)`). Timing comes from `src/studio/demo-001/timing.ts` | Original work for this job | 48 kHz / 16-bit / stereo, exactly 720,000 samples (15.000 s). sha256 `42423e932c9627bc6d175bfeff8fa4e8f33bdc69b54252f8c29d950806a4aea9`. Byte-identical on re-run (see `qa/logs/synth.log`) |
| Mock SaaS dashboard, code panel, check badge, timeline strip, backgrounds | `src/studio/demo-001/components/*` | Drawn in code (CSS/SVG shapes) | Original | Fictional and unbranded: no text, numbers or logos inside the UI |

Font-name note: the OFL Reserved Font Name rules concern distributing *modified* fonts. These files are unmodified copies, and `StudioInter` is only a CSS `font-family` alias inside this project. On this machine the system `sans-serif` also resolves to Inter, so the alias alone does not prove the bundled file loaded. That proof comes from the `status === 'loaded'` assertion in `src/studio/demo-001/fonts.ts` and the diagnostic still `qa/stills/diag-font-serif-fallback-16x9-f420.png`, which was rendered with a `serif` fallback and still shows Inter.
