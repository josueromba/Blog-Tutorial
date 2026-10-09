# Asset sources - demo-002 (unofficial explainer)

Every asset is local. There are no logos (Anthropic, Claude or third-party), no spark or asterisk marks, no screenshots, no stock media, no samples and no downloaded audio. Nothing is fetched at render time.

| Asset | Path | Origin | License | Notes |
|---|---|---|---|---|
| Inter Medium / Bold / ExtraBold | `public/studio/demo-001/fonts/StudioInter-*.otf` (shared with demo-001, unchanged) | System package `fonts-inter 4.0+ds-1` (see `jobs/demo-001/assets/SOURCES.md`) | SIL OFL 1.1 | Loaded via `useStudioFonts()` from `src/studio/demo-001/fonts.ts`, which asserts `status === 'loaded'` |
| Score (music + SFX) | `public/studio/demo-002/score.wav` | Original. Synthesised by `scripts/studio/demo-002/synth-score.mts` (a copy of the demo-001 synth; seeded PRNG `mulberry32(20261008)`). Cuts and micro-cues come from `src/studio/demo-002/timing.ts` | Original work for this job | 48 kHz / 16-bit / stereo, exactly 720,000 samples. sha256 `3cf43314077532d83dfe1a04360d81471c96f8140ede42350d784bf2a58e22a5`. Byte-identical on re-run (`qa/logs/synth.log`) |
| Fictional UI | `src/studio/demo-002/components/*`, plus the demo-001 `MockDashboard` and `Backdrop` | Drawn in code (CSS/SVG shapes) | Original | Generic and unbranded: a dashboard with digit-free value pills, an abstract query panel, an ink/stroke input field with no send button and no placeholder, a mini editor and a generic file icon. No claude.ai look-alike. |
| On-screen copy | scene components | The claims table in `jobs/demo-002/brief.md` (primary source: claude.com, Oct 8, 2026) | n/a | Exact wording. Line breaks are the only change. |
