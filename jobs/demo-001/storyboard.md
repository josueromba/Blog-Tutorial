# Storyboard - demo-001 ("studio demo")

Stage 1 (concept + timed storyboard). No code written, nothing rendered, no packages installed yet.
Formats: `Demo001Landscape` 1920x1080 and `Demo001Vertical` 1080x1920, 30 fps, 450 frames (15.0 s), hard cuts.

## 1. Concept

**"The video is its own proof."** A dark, precise canvas where every element moves on visible keyframes: a thin timeline strip with a playhead runs along the bottom, and each cut flashes a keyframe diamond on that strip in sync with a sound hit. The offer is shown being built: a fictional, unbranded SaaS dashboard assembles itself and then **recomposes from 16:9 to 9:16**, and an abstract code panel edits a value that changes the preview. Five punchy statements end on a studio end card.

### Palette (one palette, both formats)
| Role | Hex | Use |
|---|---|---|
| Ink (background) | `#0B0D17` | full-frame base |
| Surface | `#171B2E` | cards, code panel, device frames |
| Stroke | `#2A3050` | outlines, timeline track, dot grid |
| Paper (text) | `#F5F3EE` | all required copy (about 17:1 on Ink) |
| Coral (primary accent) | `#FF6B4A` | underline, active keyframe, edited value (about 6.9:1 on Ink) |
| Violet (secondary) | `#7C5CFF` | background glow, chart bars, code tokens |
| Mint (success) | `#3DDC97` | check mark in the revision scene only |

The background is Ink with a slow-drifting Violet radial glow (about 18% alpha) and a faint Stroke dot grid. Both are generated in CSS and seeded or frame-driven, with no images.

### Type
- **Inter only** (one family), weights 500 / 700 / 800, `letter-spacing: -0.02em` on headlines, `font-variant-numeric: tabular-nums`.
- **Offline bundling:** copy `Inter-Medium.otf`, `Inter-Bold.otf` and `Inter-ExtraBold.otf` from the system package `fonts-inter 4.0+ds-1` (`/usr/share/fonts/opentype/inter/`, licensed OFL-1.1) into `public/studio/demo-001/fonts/`, together with the OFL text. Load them via `loadFont()` from `@remotion/fonts` and `staticFile()`, which blocks rendering until they are ready. Nothing is fetched over the network.
- The fonts load under the **unique family name `StudioInter`**. Inter is also installed system-wide, so a failed load would otherwise fall back silently to system Inter and the stills would still look correct. With the unique name, a failure falls back to `sans-serif` (DejaVu) and is visibly wrong.
- **Not** Inter Display: `fc-list` reports it as a separate family.

### Sizes and safe area (8% margins)
| | 16:9 (1920x1080) | 9:16 (1080x1920) |
|---|---|---|
| Side margin / usable width | 153.6 px / 1613 px | 86.4 px / 907 px |
| Top/bottom margin / usable height | 86.4 px / 907 px | 153.6 px / 1613 px |
| Headline | 120-150 px, weight 800 | 104-120 px, weight 800 (min 96) |
| Body / tag | 56 px, weight 500-700 | 56 px, weight 500-700 (min 56) |

Width budget: at about 0.6 em per character for bold Inter, a 120 px line holds about 12-13 characters in 9:16, so every 9:16 headline is broken explicitly (see the table). All breaks get confirmed on stills at build time.

## 2. Scene table (both formats share timing and copy)

The scene durations 75 + 90 + 90 + 75 + 60 + 60 add up to **450 frames**. Every cut lands on a multiple of 15 (the beat at 120 BPM). Lines enter with a 10-frame rise and fade (`spring()` / `Easing.bezier(0.16,1,0.3,1)`) and never fade out before the cut, so each one stays at full opacity until its scene ends. The "full from" column counts from when the **last word of that line** lands.

| # | Scene | Frames (dur) | On-screen text (exact) | Line breaks 16:9 / 9:16 | Full opacity (frames) | Motion | Sound at cut |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0-74 (75) | `Your launch deserves motion.` | 16:9: `Your launch` / `deserves motion.` (150 px) - 9:16: `Your launch` / `deserves` / `motion.` (120 px) | Words land at f6 / f9 / f12 / f16. Line 1 is full from f9 and line 2 from f16, both until f74 = **59-66 f** | Frame 0 is not empty: background, glow, timeline strip, and "Your" at 60% opacity. Words pop in on a 3-frame stagger (f0, f3, f6, f9). A coral underline sweeps under "motion." f14-f26, the whole block drifts in scale 1.00 to 1.04 across the scene, and two rounded "keyframe" squares orbit behind. **At f30 the text is fully on screen and still drifting, with the orbit running.** | **f0 opening hit** (sub kick, click and air), soft ticks at f3/f6/f9 under the word pops, and the bed starts |
| 2 | Offer | 75-164 (90) | `15 s SaaS video` (NBSP inside "15 s") | Both formats: `15 s` (200 px 16:9, 180 px 9:16) / `SaaS video` (120 px 16:9, 112 px 9:16) | `15 s` lands f85 and `SaaS video` f89, both held to f164 = **76-80 f** | The mock dashboard card slides in f78-f96 (sidebar, 3 KPI tiles drawn as bars with no numbers, bar chart, line chart). Bars grow on a stagger f96-f120 and the line chart draws f105-f135. A thin coral arc around "15 s" fills over the scene. | **f75 hit** with an 8-frame noise riser ending on the transient, plus quiet blips at f96/f100/f104/f108 under the bars |
| 3 | Formats | 165-254 (90) | `16:9 + 9:16` | One line in both: 140 px in 16:9, 112 px in 9:16 | Tokens `16:9`, `+` and `9:16` land at f171 / f174 / f177, then held to f254 = **78 f** | The same dashboard sits in a landscape frame. A portrait frame appears f185-f195, and from f190 to f215 the dashboard blocks **reflow** (sidebar becomes top bar, tiles stack, chart goes full width) into the portrait frame by animating positions and sizes. This is "recomposed, not cropped" shown literally. | **f165 hit** with riser, plus a soft swish f190-f210 during the reflow |
| 4 | Source | 255-329 (75) | `Editable Remotion source` | Both formats: `Editable` / `Remotion` / `source` (120 px in 16:9, 112 px in 9:16) | Lines land at f265 / f269 / f273 and hold to f329 = **57-65 f** | Abstract code rows (rounded bars in Violet, Paper and Stroke, with no readable fake code) type on f258-f285 behind a frame-driven caret. At f290 one "value" bar is selected and swaps Violet to Coral (f290-f300), and the preview card next to it recolours in sync (f295-f305): you edit, it changes. | **f255 hit** with riser, very quiet key taps every 4 frames f262-f282, and a pop at f295 |
| 5 | Revision | 330-389 (60) | `1 revision included` | Both formats: `1 revision` / `included` (132 px in 16:9, 112 px in 9:16) | Lines land at f340 / f344 and hold to f389 = **46-50 f** | A Mint ring draws f330-f345, the check stroke draws f342-f354, and a small circular arrow does one rotation f330-f370. | **f330 hit** with riser, plus a two-note confirm chime at f352 as the check completes |
| 6 | End card | 390-449 (60) | `Claude Code Motion Design Studio` + tag `studio demo` | **The same break in both formats:** `Claude Code` / `Motion Design` / `Studio` (120 px in 16:9, 104 px in 9:16). The tag is a pill with a Coral outline and 56 px text in both formats. | Lines land at f398 / f400 / f402 and the tag at f404, all held to f449 = **46-52 f** | Lines rise in on a 2-frame stagger and the tag pill scales in. The last frame (f449) is the complete end card with no fade to black, and the glow settles. All six keyframe diamonds on the timeline strip are lit. | **f390 final hit** (largest, layered with the resolve chord) and a tail decaying by about f444 |

**Persistent layers in all scenes:** the background (glow and dot grid) and the timeline strip. The strip is a 6 px track inside the bottom safe margin, with 6 keyframe diamonds at the cut positions and a playhead moving at 1 px per frame-ratio. It is decorative and carries no text or numbers. A diamond flashes Coral for 6 frames on each cut.

**Copy discipline:** only the required copy appears, with exact punctuation. The mock UI and code panel contain no readable text, no numbers or percentages (they would read as result claims), no logos and no brand-like marks. There are no prices, contact details or client references.

## 3. 9:16 recomposition (per scene, not a crop)

| Scene | 16:9 layout | 9:16 layout |
|---|---|---|
| 1 Hook | Headline centred on 2 lines, orbiting squares behind and to the right | Headline on 3 lines, left-aligned in the upper-middle band (y about 520-1000), orbiting squares in the lower third (y about 1150-1550) |
| 2 Offer | Split: text column on the left (about 700 px), dashboard card on the right (about 820x540) | Stacked: text block on top (y about 230-640), dashboard card at full usable width below (907x680) using the dashboard's **portrait layout** (top bar, stacked tiles) |
| 3 Formats | Headline at the top centre, landscape and portrait frames side by side below (640x360 and 270x480) | Headline at the top, landscape frame (907x510) in the middle, portrait frame (300x533) centred below. The reflow animation runs inside the portrait frame. |
| 4 Source | Text column on the left (3 lines), code panel on the right (about 820x560) with the preview card overlapping its lower-right corner | Text block on top (3 lines), code panel full width in the middle (907x620), preview card overlapping the bottom edge (y up to about 1700) |
| 5 Revision | Check badge (320 px) on the left, text on 2 lines to its right, the pair centred together | Check badge (360 px) centred in the upper half, text centred on 2 lines below |
| 6 End card | Centred stack of 3 lines, tag pill underneath | The same stack and tag at the 9:16 sizes, vertically centred (identical elements and order) |

The layout is chosen from `useVideoConfig()` (`height > width` means portrait) inside each scene, so one component tree serves both compositions. The dashboard has two real layouts (landscape and portrait) and interpolates between them in scene 3.

## 4. Sound design (original and deterministic)

- **Tool:** a dependency-free Node 22 script, `scripts/studio/demo-001/synth-score.ts`, run with `node scripts/studio/demo-001/synth-score.ts` (Node 22.18+ strips types natively, with a fallback flag of `--experimental-strip-types`). It imports the cut list from `src/studio/demo-001/timing.ts`, so the picture and sound share one source of timing. Output is `public/studio/demo-001/score.wav`. No samples are downloaded or used.
- **Format:** 48 kHz, 16-bit PCM, stereo, **exactly 720,000 samples** (15.000 s, 1600 samples per frame).
- **Determinism:** all noise comes from a seeded `mulberry32(20261009)` PRNG, with no `Math.random()`. Re-running the script produces a byte-identical file, which gets checked by sha256 at build time.
- **Hits (one per cut):** frames **0, 75, 165, 255, 330, 390**. Each **transient peak sits at sample `frame * 1600`**. A hit is a sine kick sweeping 160 to 48 Hz with about 220 ms decay, plus a 3 ms noise click, plus a 60 ms band-passed noise snap. Cuts 75-390 also get a pre-roll filtered-noise riser of 8 frames that ends exactly on the transient. The f390 hit is about 2 dB louder and layered with a resolve chord.
- **Bed:** 120 BPM, so all cuts fall on beats. A low-passed detuned saw pad changes chord per scene (Am, F, C, G, Em, C) with quiet off-beat hat ticks from seeded noise. The bed sits about 12 dB below the hits and ducks 6 dB for 150 ms after each hit (a sidechain feel), which keeps the cuts clearly audible. It fades in over 2 frames (no click), the tail decays by about f444, and the WAV still runs the full 15.000 s.
- **Micro cues** about 14 dB below the hits: word ticks f3/f6/f9, bar blips f96-f108, key taps f262-f282, colour pop f295, check chime f352.
- **Level:** peak-normalised to -1.0 dBFS. The script asserts that no sample clips and prints the peak and RMS to `jobs/demo-001/qa/logs/synth.log`.
- **QA plan (build stage):** per-frame peak and RMS of the rendered MP4 via `ffmpeg -af asetnsamples=1600,astats=metadata=1:reset=1,ametadata=print`, checking that each cut frame (±1) is a local maximum well above the bed. Plus `ffprobe -count_frames` for 450 frames, codec and pixel-format checks, and the stream duration of the AAC track. Logs go in `jobs/demo-001/qa/logs/`.

## 5. Planned code structure

```
src/studio/index.ts                  registerRoot(StudioRoot)
src/studio/Root.tsx                  <Folder name="demo-001">: Demo001Landscape (1920x1080), Demo001Vertical (1080x1920), both 30 fps / 450 f, inline metadata
                                     <Folder name="demo-001-scenes">: each scene as a connected composition (1920x1080, natural duration)
src/studio/demo-001/Demo001.tsx      Background + <Series> of 6 <Series.Sequence name=... durationInFrames=... premountFor={fps}> + TimelineStrip + <Audio>
src/studio/demo-001/timing.ts        CUTS = [0,75,165,255,330,390,450] (erasable TS only, also imported by the synth script)
src/studio/demo-001/theme.ts         palette, useFormat() (landscape|portrait), safe-area and type scale per format
src/studio/demo-001/fonts.ts         loadFont() x3 for StudioInter 500/700/800 from staticFile()
src/studio/demo-001/scenes/          HookScene, OfferScene, FormatsScene, SourceScene, RevisionScene, EndCardScene
src/studio/demo-001/components/      Background, TimelineStrip, StaggerLines, MockDashboard (landscape/portrait + reflow), CodePanel, CheckBadge
scripts/studio/demo-001/synth-score.ts   WAV synthesiser (outside public/)
public/studio/demo-001/fonts/        StudioInter-{Medium,Bold,ExtraBold}.otf + OFL.txt
public/studio/demo-001/score.wav     generated
jobs/demo-001/assets/SOURCES.md      origins: Inter OTFs (fonts-inter 4.0+ds-1, OFL-1.1, system package), score.wav (synth-score.ts, seed 20261009), all visuals generated in code
```

**npm packages to add at build time** (none installed yet), pinned **exactly** to the installed `4.0.438`, added with `npx remotion add` and then checked in `package.json` and the lockfile:
- `@remotion/media@4.0.438` provides `<Audio>`. The fallback is the core `Audio` from `remotion` 4.0.438 if needed.
- `@remotion/fonts@4.0.438` provides `loadFont()` for local files.
- **Not adding** `@remotion/transitions`: hard cuts with `<Series>` keep cut frames exact and the sum at 450, where `TransitionSeries` would overlap scenes. Also not adding `@remotion/google-fonts`, because the font is local.

`remotion.config.ts` (entry `src/remotion-rssi`) and `src/remotion-rssi/` stay untouched. The studio entry is always passed explicitly on the CLI.

## 6. Environment check results (observed)

- `remotion`, `@remotion/cli` and `@remotion/bundler` are **4.0.438** in package.json (caret ranges) and node_modules. The latest on npm is 4.0.534. `@remotion/transitions`, `@remotion/google-fonts`, `@remotion/media` and `@remotion/fonts` are **not installed**, and all exist on npm at 4.0.438.
- **API gap:** the installed 4.0.438 type definitions contain **no `Interactive`, no `Easing.spring` and no `output: 'perceptual-scale'`**, which the skills assume. `Easing.bezier`, `spring()`, `interpolate`, `Series` and `Folder` are present.
- **Browser:** `.chrome-cache/` does not exist (it is only a gitignore entry). `node_modules/.remotion/` was absent at first. My no-flag run of `npx remotion compositions src/remotion-rssi/index.ts` succeeded and **downloaded `chrome-headless-shell` into `node_modules/.remotion/`** through the proxy. That download happened at setup, not at render time. The brief's render command now works without extra flags. A verified fallback is `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` (Chromium 141), which also listed compositions successfully. Logs are in `jobs/demo-001/qa/logs/browser-smoke*.log`.
- `ffmpeg` and `ffprobe` are on PATH (`/usr/bin`). Node is v22.22.0. Python 3 with numpy 2.5.3 is available but not needed.

## 7. Risks and open questions

1. **Remotion version vs skills:** the plan stays pinned to 4.0.438 and uses plain markup with `spring()` and `Easing.bezier`. As a result, **Studio interactive editing (`Interactive.*`, schema props) won't be available**, although the source is still editable as code. Upgrading to 4.0.534 would touch shared dependencies used by `src/remotion-rssi/`, so that is a decision for the main session or owner, not me.
2. **"Small tag" vs the 56 px minimum:** the brief calls "studio demo" a *small* tag but requires body text of at least 56 px in 9:16. The plan sets it at 56 px in both formats, visually subordinated by weight 500 and a pill, not by size. Please confirm.
3. **Names and licensing (owner's call before publishing):** the end card uses "Claude Code" (an Anthropic product name) and the copy names "Remotion". Commercial use of Remotion by a company may require a Remotion company license. This does not block a demo render.
4. **The 16:9 phone-readability minima** aren't specified in the brief. The plan applies the same 56 px body / 96 px+ headline floor to 16:9.
5. **"15 s" spacing:** a non-breaking space keeps "15 s" on one line. The text is still exactly `15 s SaaS video`.
6. **Line widths** are estimated at 0.6 em per character. If a 9:16 line overflows the 907 px usable width in stills, the size drops, with a floor of 104 px for headlines. The break points do not change.
7. **AAC priming** may report the audio duration at about 15.02 s. That is within ±1 frame, and it gets checked by ffprobe rather than assumed.
8. **Tight holds** are scenes 5 and 6 at 46 frames minimum, which passes the 36-frame rule with about 10 frames of slack. Re-timing would trade against the 60-frame end card.
