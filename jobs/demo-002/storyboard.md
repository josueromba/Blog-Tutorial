# Storyboard - demo-002 (unofficial explainer: Claude Dashboards + Claude Motion)

Stage 1: concept and timed storyboard only. No code, no renders, no packages.
Formats: `Demo002Landscape` 1920x1080 and `Demo002Vertical` 1080x1920, 30 fps, 450 frames (15.0 s), hard cuts.
Pipeline, palette, type and sound approach are reused from demo-001 (`src/studio/demo-001/`, `scripts/studio/demo-001/`).

## 1. Concept

**"Two new tools, shown as generic sketches."** The same studio canvas as demo-001: Ink background, dot grid, and a keyframe timeline strip along the bottom. Six one-bar beats (60 frames each at 120 BPM) each carry one claim from the table, and a 90-frame end card gives the disclaimer and source room to read. Every product moment is a **fictional, unbranded wireframe** built from the demo-001 shapes:
- a dashboard that refreshes;
- a clicked value pill that opens an abstract query panel;
- a plain input field where `/motion` gets typed;
- a mini editor timeline with a download arrow.

Nothing imitates the claude.ai UI. There are no logos and no spark or asterisk shapes. A persistent **"Unofficial explainer"** tag sits in the top-left corner for the whole video.

### Palette (unchanged from demo-001)
| Role | Hex | Use in demo-002 |
|---|---|---|
| Ink | `#0B0D17` | background |
| Surface / Stroke | `#171B2E` / `#2A3050` | cards, input field, panels, corner tag border |
| Paper | `#F5F3EE` | all copy, including every occurrence of the word **"Claude"** |
| Coral | `#FF6B4A` | UI accents only: clicked pill, keyframe diamonds, download arrow, `/motion` text in the input field. **Never on the word "Claude"**, and never a coral rounded square containing an arrow (it reads as a send button). |
| Violet | `#7C5CFF` | glow, chart bars, highlighted feature names ("Dashboards", "Motion") |
| Mint | `#3DDC97` | the "No generated footage" check and the line chart |

The rule is to stay on the studio palette and avoid anything that drifts toward Anthropic brand styling.

### Type
Inter only. The same bundled OTFs and `useStudioFonts()` from `src/studio/demo-001/fonts.ts`, with the same status assertion; no new font files. Weights: 800 for headlines, 700 for statements, 500 for tags.

### Size floors (both formats, per the demo-001 ruling)
| Class | Size | Used for |
|---|---|---|
| Headline | ≥ 96 px (96-120) | hook, feature names, "Both in beta", studio name |
| Statement / body | ≥ 56 px (56-80) | claim sentences, plan lines, typed `/motion`, disclaimer, source, tags |
| **Corner tag** | **56 px** in both formats | The brief allows ≥ 40 px. I'm defaulting to 56 so it meets the body floor; the coordinator can lower it to the brief's 40 px if wanted. |

**Safe area (8%):** 16:9 x 154-1766, y 86-994. 9:16 x 86-994, y 154-1766.
- The corner tag (a pill about 650 x 88 px) occupies the top-left band: y 86-174 in 16:9 and y 154-242 in 9:16.
- **All scene content starts below y=200 (16:9) or y=270 (9:16).**
- The timeline strip occupies the bottom band, as in demo-001.

## 2. Scene table

The scene durations 60+60+60+60+60+60+90 add up to **450 frames**. The cuts fall at **0, 60, 120, 180, 240, 300, 360**, all multiples of 15 and each on a bar line at 120 BPM.

Lines rise in using the demo-001 `reveal()` and land at start+dur (dur = 10, or 8 on the end card), never fading out before the cut. "Hold" means full-opacity frames from the moment that line lands to the end of its scene, inclusive. The floor is 36 frames.

| # | Frames | Claims row | On-screen text (exact) | Breaks 16:9 | Breaks 9:16 | Lands → hold | Motion | Sound at cut |
|---|---|---|---|---|---|---|---|---|
| 1 Hook | 0-59 | 1 | `New in Claude: Dashboards + Motion` | `New in Claude:` / `Dashboards + Motion` (120 px) | `New in Claude:` / `Dashboards +` / `Motion` (104 px) | L1 f10 → **50**, L2 f14 → **46** (9:16 L3 f18 → **42**) | **Frame 0 is not empty:** the corner tag, the glow, and "New" at about 30% opacity. Two generic cards (a mini chart tile and a mini editor strip) slide in from opposite sides and lock together under the headline at f12. The block drifts in scale 1.00→1.03, so at f30 the text is full and still moving. "Dashboards" and "Motion" are Violet; "Claude" stays Paper. | **f0 opening hit**, plus a lock click at f12 |
| 2 Dashboards | 60-119 | 2 | `Claude Dashboards` / `Your data, as a dashboard that stays current` | Left column: `Claude` / `Dashboards` (112 px), then `Your data, as a dashboard` / `that stays current` (60 px). Dashboard card on the right. | `Claude` / `Dashboards` (112 px), then `Your data, as a dashboard` / `that stays current` (60 px), card below | f70 / f74 / f78 / f82 → tightest **38** (body L2) | The demo-001 `MockDashboard` card slides in (f60-76). At f100 a small rotating refresh glyph turns and the bars **re-grow to new heights**, showing "stays current" without digits or timestamps. | **f60 hit** with riser, plus a refresh tick at f100 |
| 3 Query | 120-179 | 3 | `Click any number to see the query behind it` | `Click any number to see` / `the query behind it` (72 px), on top | `Click any number` / `to see the query` / `behind it` (80 px), on top | f130 / f134 (/ f138) → tightest **42** | The dashboard sits at the bottom left. **The "number" is drawn as a value pill (a coloured rounded bar) on a KPI tile, with no digits**, because the brief bans added numbers. A generic arrow cursor moves to the pill and clicks at f138 (ring ripple), and an abstract **query panel** (rows of token bars, no readable code) slides out f142-158 next to it, joined by a thin connector line. | **f120 hit** with riser, plus a click at f138 and a short swish f142-152 |
| 4 Motion | 180-239 | 4 | `Claude Motion` / `Type /motion for an animated explainer` | Left: `Claude Motion` (112 px), then `Type /motion for an` / `animated explainer` (64 px). Input field on the right. | `Claude Motion` (112 px), then `Type /motion for an` / `animated explainer` (64 px), input field below | f190 / f194 / f198 → tightest **42**. **Typed `/motion`** (60 px in both formats) finishes at f202 → **38** | A plain rounded input field (Surface fill, Stroke border, no placeholder text, **no send button**). `/motion` types in at 2 frames per character, f188-202, in Coral with a Paper caret. At f204 an option chip pops under the field (icon and bar only, no text), then a small preview canvas (bars plus a sliding circle) animates f210-239. | **f180 hit** with riser, 7 key taps (f188, 190 … 200), a chip pop at f204 and a preview pop at f210 |
| 5 Edit + MP4 | 240-299 | 5 | `Edit it, then download an MP4` / `No generated footage` | Right: `Edit it, then` / `download an MP4` (80 px), then a Mint-check pill with `No generated footage` (60 px). Mini editor on the left. | `Edit it, then` / `download an MP4` (80 px), pill below it, editor below that | f250 / f254, pill f258 → tightest **42** | The mini editor shows a preview canvas over a keyframe track. The cursor drags one keyframe diamond f250-262 and the preview shape moves to match. At f266 a Coral down-arrow drops into a generic file shape (no label), and the file pops at f272. The pill's Mint check draws on f258-266. | **f240 hit** with riser, a drag tick at f262 and a download pop at f272 |
| 6 Beta | 300-359 | 6 | `Both in beta` / `Dashboards: paid plans` / `Motion: Team & Enterprise` | `Both in beta` (120 px), then two list rows (64 px) with Coral diamond bullets | `Both in beta` (112 px), then `Dashboards: paid plans` and `Motion: Team & Enterprise` (60 px), each on one line | f310 / f314 / f318 → tightest **42** | The headline rises. Each row slides in from the left behind a keyframe-diamond bullet that flashes when its row lands. The background glow shifts. | **f300 hit** with riser, plus soft ticks at f314 and f318 |
| 7 End card | 360-449 | 7 | `Claude Code Motion Design Studio` + tag `studio demo`, then `Unofficial explainer · not affiliated with Anthropic` and `Source: claude.com, Oct 8, 2026` | Centred stack: diamond mark; `Claude Code` / `Motion Design Studio` (96 px); `studio demo` pill (56 px); thin divider; `Unofficial explainer ·` / `not affiliated with Anthropic` (56 px); `Source: claude.com, Oct 8, 2026` (56 px, one line ≈ 960 px of 1613) | Same stack: `Claude Code` / `Motion Design` / `Studio` (96 px); pill (56 px); `Unofficial explainer ·` / `not affiliated` / `with Anthropic` (56 px); `Source: claude.com,` / `Oct 8, 2026` (56 px) | Name f368 / f370 (/ f372), tag f374, disclaimer f376-380, source f380-382 → tightest **68** (2.3 s) | Lines rise on a 2-frame stagger. The last frame is the complete card, with all seven timeline diamonds lit. | **f360 final hit** with the resolve chord, tail decaying by about f444, final frames silent |

**Persistent layers (video level, f0-f449):**
- The background (each scene renders the demo-001 `Backdrop` with its own glow anchor).
- The timeline strip, with **7 diamonds** at the demo-002 cuts.
- The **corner tag `Unofficial explainer`**: a 56 px Paper pill with a Stroke border and an 85% Ink fill so it stays legible over content, at top-left inside the safe area. It is drawn above all scenes.

**Holds:** every visual line holds at full opacity for at least 38 frames (1.27 s). The tightest are scene 2 body L2 and the typed `/motion` (38 frames each), then 42 frames in scenes 1 (9:16), 3, 4, 5 and 6. **All lines fit, and I'm not proposing any copy cut.**

**Timing-only alternative** (no copy change), if the advisor wants more breathing room for the denser middle cards: shorten the end card from 90 to 75 frames and give scenes 2 and 4 an extra 7-8 frames each. That breaks the one-bar grid, so I don't recommend it. The end-card disclaimer is the line that most needs time.

**Copy fidelity:** I've checked each line against claims rows 1-7, keeping `:`, `+`, `·`, `&`, `/motion` and `MP4` exactly. Line breaks are the only change. There are no added numbers, dates, features or names, and no digits appear in the UI.

## 3. 9:16 recomposition

| Scene | 16:9 | 9:16 |
|---|---|---|
| 1 Hook | Headline centred on 2 lines (y about 300-560), the two locking cards below (y about 640-880) | Headline left-aligned on 3 lines (y about 520-860), locking cards stacked in the lower third |
| 2 Dashboards | Split: text column x 154-1010, card 700x470 on the right (x 1066-1766) | Text on top (y about 290-700), card at full width 907x640 below (y about 760-1400) |
| 3 Query | Text on top (2 lines), then dashboard bottom-left (760x460) and query panel bottom-right (700x420), connector between | Text on top (3 lines), dashboard at full width (907x560), query panel overlapping its lower half from the right (600x420) |
| 4 Motion | Text column on the left, input field (760x150) top-right, option chip and preview canvas (760x400) under it | Text on top, input field at full width (907x150), then chip, then preview canvas (907x560) |
| 5 Edit + MP4 | Mini editor on the left (820x560), text and pill on the right | Text and pill on top, editor at full width below (907x700) |
| 6 Beta | Headline and list left-aligned, with a large faint diamond motif on the right | The same list left-aligned at full width, motif behind in the lower third |
| 7 End card | Stack centred, from y about 256 to about 893. The name uses 2 lines; 16:9 has the least room. | Stack centred vertically, name on 3 lines, disclaimer on 3 lines, source on 2 lines |

The layout is picked with `useFormat()` (portrait when height > width), the same as demo-001.

## 4. Sound plan (original, deterministic)

- **Script:** `scripts/studio/demo-002/synth-score.mts`, a copy of the demo-001 synth that imports `CUTS` and `CUES` from `src/studio/demo-002/timing.ts`. Output: `public/studio/demo-002/score.wav`, 48 kHz / 16-bit stereo, exactly 720,000 samples, seeded `mulberry32(20261008)`, byte-determinism checked twice by sha256 and logged to `jobs/demo-002/qa/logs/synth.log`.
- **Hits** (kick + click + snap, 8-frame riser before every cut after the first; transient peak at `frame*1600`): **f0, 60, 120, 180, 240, 300, 360**. The f360 hit is about 2 dB louder and carries the resolve chord.
- **Bed:** 120 BPM, one chord per scene bar (Am, F, C, G, Am, F, then a C resolve on the end card), off-beat hats until f360, a 6 dB sidechain duck after each hit, and a tail decaying by about f444. The last frames are digital silence.
- **Micro cues** (about 14 dB under the hits, all in `timing.ts`):

  | Cue | Frames |
  |---|---|
  | Lock click | 12 |
  | Refresh tick | 100 |
  | Click | 138 |
  | Swish | 142-152 |
  | Key taps | 188-200 every 2 frames |
  | Chip pop | 204 |
  | Preview pop | 210 |
  | Drag tick | 262 |
  | Download pop | 272 |
  | Row ticks | 314, 318 |

- **Delivery:** render with the brief's command (including `--color-space=bt709`), then reuse **`scripts/studio/demo-001/finalize-audio.sh` unchanged**. Its 2048-sample priming constant is not assumed: per-cut lag is **re-measured on demo-002's decoded MP4** with a demo-002 copy of `audio-sync.py`, logged to `jobs/demo-002/qa/logs/audio-sync.log`.

## 5. Code structure

```
src/studio/demo-002/
  timing.ts            FPS, TOTAL_FRAMES, CUTS [0,60,120,180,240,300,360,450], SCENE, CUES (erasable TS only)
  Demo002.tsx          <Series> of 7 scenes, CornerTag + TimelineStrip (video-level), <Audio> score
  components/
    CornerTag.tsx      persistent "Unofficial explainer" pill
    Cursor.tsx         generic arrow cursor + click ripple
    QueryPanel.tsx     abstract token-row panel; own timing, so CodePanel's built-in edit at f35 doesn't fire
    InputField.tsx     generic field, typed "/motion", caret, option chip (no send button)
    MiniEditor.tsx     preview canvas + keyframe track + download arrow/file
  scenes/              HookScene, DashboardsScene, QueryScene, MotionScene, EditScene, BetaScene, EndCardScene
scripts/studio/demo-002/  synth-score.mts, audio-peaks.sh, audio-sync.py (copies with demo-002 cuts)
public/studio/demo-002/score.wav
```

**Reused from demo-001** (import only, no behaviour change): `theme.ts` (C, FONT, reveal, headline, useFormat, EASE, CLAMP), `fonts.ts` (useStudioFonts), `Backdrop`, `Line`, `MockDashboard`, `CheckBadge` if needed. No new npm packages.

**Shared-file edits** (2), with an identity proof:
1. `src/studio/demo-001/components/TimelineStrip.tsx` gets an optional `cuts?: readonly number[]` prop, **defaulting to demo-001's `CUTS`**. Demo001 call sites stay untouched. A demo-002 copy is the fallback if the advisor prefers zero edits.
2. `src/studio/Root.tsx` gets a new `demo-002` folder (`Demo002Landscape`, `Demo002Vertical`) plus a `demo-002-scenes` folder.

**Proof:** after the edits, re-render demo-001 stills at f0, 75, 165, 255, 330, 449 in both formats from a fresh bundle and `cmp` them against the existing byte-identical baselines in `jobs/demo-001/qa/stills/`. Log to `jobs/demo-002/qa/logs/demo001-identity.log`.

## 6. Risks and open questions

1. **Trademark / affiliation (owner's call, not blocking):** the end card puts "Claude Code Motion Design Studio" (built on an Anthropic product name) on the same card as "not affiliated with Anthropic". "Claude Dashboards" and "Claude Motion" are Anthropic product names used descriptively. The brief already requires sign-off against Anthropic's trademark guidelines before anything is published.
2. **Corner tag size:** I've defaulted to 56 px for readability. The brief's minimum is 40 px; lowering it would free about 20 px of top band.
3. **16:9 end card height:** the stack (about 640 px) fits the about 750 px between the corner tag and the timeline strip with roughly 55 px margins. It must be confirmed on stills. Fallback: tighten line gaps; never shrink below the floors.
4. **Tight 9:16 widths** (est. at 0.58-0.6 em/char, to verify on stills):
   - `Your data, as a dashboard` at 60 px ≈ 870 of 907 px
   - `Motion: Team & Enterprise` at 60 px ≈ 870
   - `Click any number` at 80 px ≈ 760
   - Fallback if any overflows: a break after the colon or comma, or a size step down to the floor. The copy never changes.
5. **"Click any number" without numbers:** a value pill stands in for the number. If the coordinator thinks the claim needs a visible digit, that would mean adding a number, which the brief forbids. Please confirm the pill is acceptable.
6. **Generic UI vs imitation:** the input field has no placeholder text and no send button, the cursor is a plain arrow, and the chip and panels hold no text. Coral is never used on the word "Claude".
7. **Studio interactive editing** is still unavailable on Remotion 4.0.438, the same as demo-001.
