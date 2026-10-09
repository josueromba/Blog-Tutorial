# Report - demo-002: Claude Dashboards + Claude Motion (unofficial explainer), 2026-10-09

## Deliverables
| Item | Path | Status |
|---|---|---|
| MP4 16:9 | `jobs/demo-002/out/demo-002-16x9.mp4` | ffprobe acceptance PASS |
| MP4 9:16 | `jobs/demo-002/out/demo-002-9x16.mp4` | ffprobe acceptance PASS |
| Source | `src/studio/demo-002/`, `scripts/studio/demo-002/`, `public/studio/demo-002/` | Remotion 4.0.438 |
| Facts | `research/claude-launch/facts.md` | primary source re-fetched by main |
| Brief / storyboard | `jobs/demo-002/brief.md` (claims table), `storyboard.md` | |
| QA | `qa/acceptance.md`, `qa/copy-check.md`, `qa/scene-review.md`, `qa/advisor-log.md`, `qa/logs/` | |

## QA
- **Acceptance (studio-worker, `npx remotion ffprobe`), both files:** size, 30/1, 450 counted frames, h264, yuv420p and AAC are correct. The video lasts 15.000 s; audio and container 15.019 s. Decode is clean. Main re-checked with ffprobe.
- **Copy check (main):** all 7 cards match the claims table character for character in both formats. The corner disclaimer is present in every scene. No added claims, digits or third-party names, no logos, and no claude.ai look-alike UI.
- **Scene review (motion-maker, 54 frames from the final MP4s):** no issues. Minor: in 16:9 the decorative dashboard card goes about 30 px past the safe line for frames 60-65 while sliding in.
- **Revision rounds used:** 0 of 2.
- **demo-001 integrity:** motion-maker reports both demo-001 MP4s and its WAV have unchanged sha256, and the Demo001 stills are byte-identical (`qa/logs/demo001-integrity.log`).
- **Playback was NOT reviewed.** Sync was measured numerically (0 samples late at all 7 cuts) and relies on the player honouring the MP4 edit list.

## Models: configured vs observed (transcript metadata)
| Role | Configured | Observed |
|---|---|---|
| Main | claude-sonnet-5-5 | claude-opus-5-5 (get_session). The gate was overridden by the owner. |
| motion-maker | claude-opus-5-5 | claude-opus-5-5 |
| studio-worker (facts research, acceptance) | claude-haiku-5-5 | claude-haiku-5-5. The single opus entry is the advisor_tool attachment, with 0 advisor calls. |

## Advisor calls (real): 4
1. Main, at intake.
2. motion-maker, on the storyboard (transcript count; content self-reported).
3. Main, approving the approach.
4. Main, before delivery.

All four are logged in `qa/advisor-log.md`.

## Owner decisions before publishing
1. **Anthropic trademark guidelines** (https://www.anthropic.com/legal/trademark-guidelines): "only in materials we approve beforehand." This piece names Claude, Claude Dashboards and Claude Motion. Get legal or Anthropic sign-off, or keep it private.
2. **Studio name "Claude Code Motion Design Studio"** on a video about Claude features can read as Anthropic's own studio, even with the on-screen disclaimer.
3. **Facts are dated 2026-10-08/09**, and both features are in beta. Re-check the source before posting.

Nothing was published or sent.
