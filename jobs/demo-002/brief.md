# Brief - jobs/demo-002: Claude Dashboards + Claude Motion launch (unofficial explainer)

Owner's request (2026-10-09): "applique cette vidéo, sur la sortie du nouveau de claude dashboard et claude motion". Reuse demo-001's pipeline, format and studio style for the 2026-10-08 launch of Claude Dashboards and Claude Motion.

## Status of the piece
An **independent, unofficial explainer** made by the studio. It is NOT an Anthropic ad and must not look like one.
- No Anthropic or Claude logos, no spark/asterisk mark, and no recreation of the claude.ai interface. Any "/motion" input box or dashboard is the same kind of generic, fictional UI as in demo-001.
- Keep the studio palette (Ink/Coral/Violet/Mint) and Inter, the same as demo-001. Don't drift toward Anthropic brand colours.
- No third-party names or logos (data platforms, video tools).
- Publishing needs the owner's sign-off on Anthropic's trademark guidelines (https://www.anthropic.com/legal/trademark-guidelines). Nothing gets published.

## Audience
People who use Claude at work: team leads, analysts and ops people, scrolling LinkedIn or X on a phone.

## Message
Two new beta features in Claude: live dashboards from your data, and animated explainers you can download as MP4.

## Required text (exact, English) and claims table
Every factual line traces to the primary source, which the main session re-fetched on 2026-10-09: https://claude.com/resources/articles/dashboards-and-motion ("Build live dashboards and animate explainers with Claude", October 8, 2026).

| # | On-screen text (exact) | Source wording (verbatim) |
|---|---|---|
| 1 | `New in Claude: Dashboards + Motion` | Title: "Build live dashboards and animate explainers with Claude" |
| 2 | `Claude Dashboards` / `Your data, as a dashboard that stays current` | "Claude can turn your data into a dashboard that stays current" |
| 3 | `Click any number to see the query behind it` | "Click any number to see the query behind it, or ask Claude to explain it." |
| 4 | `Claude Motion` / `Type /motion for an animated explainer` | "Typing "/motion" in the Claude message box brings up the Motion option." + subtitle "animate explainers" |
| 5 | `Edit it, then download an MP4` / `No generated footage` | "You can adjust it in the editor or ask Claude to change it, then download it as an MP4 file." + "It doesn't use a video generation model, so there's no generated footage and no AI-generated people." |
| 6 | `Both in beta` / `Dashboards: paid plans` / `Motion: Team & Enterprise` | "is in beta on paid plans." + "Claude Motion is in beta on Team and Enterprise." |
| 7 | End card: `Unofficial explainer · not affiliated with Anthropic` / `Source: claude.com, Oct 8, 2026` / `Claude Code Motion Design Studio` + tag `studio demo` | (disclaimer, source line, studio sign-off) |

Plus a **persistent corner tag** `Unofficial explainer` from frame 0 to the end, at 40 px or more and inside the safe area.

Exact copy only. Don't add claims, numbers, dates or features beyond this table. If a line doesn't fit, tell the main session, which owns the copy.

## Formats and render (same as demo-001)
- `Demo002Landscape` 1920x1080 and `Demo002Vertical` 1080x1920 (recomposed), 30 fps, 450 frames (15.0 s), H.264 yuv420p + AAC.
- Render: `npx remotion render src/studio/index.ts <CompId> jobs/demo-002/qa/raw-renders/<f>.raw.mp4 --codec=h264 --pixel-format=yuv420p --audio-codec=aac --color-space=bt709`, then `scripts/studio/demo-001/finalize-audio.sh` (or a demo-002 copy) to `jobs/demo-002/out/demo-002-16x9.mp4` / `demo-002-9x16.mp4`.

## Acceptance criteria
Same as demo-001, plus two:
- The hook is visible and moving by frame 30. Phone floors: 9:16 body ≥ 56 px, headlines ≥ 96 px, 8% safe margins, each line ≥ 1.2 s at full opacity.
- The disclaimer and source on the end card meet the same 56 px and ≥ 1.2 s rules.
- The sound is original and deterministic, with a hit on every cut and audio synced to 0 ±1 frame after the priming fix.
- Both files pass the ffprobe acceptance check.
- No logos and no imitation of the Anthropic or Claude UI.

## Paths and constraints
- Source goes in `src/studio/demo-002/`, registered in `src/studio/Root.tsx`. You may import demo-001 components but must not change their behaviour. If you edit a shared file, show that `Demo001*` still renders identically (for example, an identical still hash at a few frames).
- Storyboard: `jobs/demo-002/storyboard.md`. QA: `jobs/demo-002/qa/`. Facts: `research/claude-launch/facts.md`.
- A French version is a copy swap later. Not now.
