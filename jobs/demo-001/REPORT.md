# Final report - demo-001 and studio setup (2026-10-09)

## Deliverables
| Item | Path | Status |
|---|---|---|
| MP4 16:9 | `jobs/demo-001/out/demo-001-16x9.mp4` | ffprobe acceptance PASS |
| MP4 9:16 | `jobs/demo-001/out/demo-001-9x16.mp4` | ffprobe acceptance PASS |
| Source | `src/studio/` (+ `scripts/studio/demo-001/`, `public/studio/demo-001/`) | Remotion 4.0.438 |
| Brief / storyboard | `jobs/demo-001/brief.md`, `storyboard.md` | |
| QA | `jobs/demo-001/qa/`: `acceptance.md`, `scene-review.md`, `revisions.md`, `advisor-log.md`, `stills/`, `review-frames/`, `logs/` | |
| Leads | `leads.csv` (9 rows), `research/leads/` | 3 requests unverified, 6 prospects |
| Proposals | `proposals/01..03` | Drafts, NOT sent; each asks for the budget |

## QA
- **Acceptance (studio-worker, `npx remotion ffprobe`)**, both files: correct size, 30/1, 450 counted frames, h264, yuv420p, AAC. Video 15.000 s, audio and container 15.019 s (within 1 frame). Decode clean. Main session re-checked with ffprobe.
- **Revision rounds used: 1 of 2.** Fixed yuvj420p → yuv420p (`--color-space=bt709`, a flag beyond the brief's three), the AAC priming lag (+2048 samples → 0, measured on the decoded MP4), and the audio length (15.061 s → 15.019 s).
- **Scene review (motion-maker, 46 frames from the final MP4s):** no issues. Minor: in 16:9, the decorative dashboard card goes about 40 px past the safe line for frames 75-80 while sliding in. Left as is.
- **Playback was NOT reviewed.** Nobody watched real-time playback with audio. Sync was measured numerically. It relies on the player honouring the MP4 edit list (ffmpeg does). Check on a phone and in a browser before publishing.

## Models: configured vs observed
Observed means the `"model"` entries in each agent's transcript metadata, plus get_session for the main session. Nothing here is self-reported.
| Role | Configured | Observed |
|---|---|---|
| Main session | claude-sonnet-5-5 | **claude-opus-5-5** (get_session at delivery: session_context.model and last_served_model). The owner overrode the gate, so the studio ran from the setup session. |
| motion-maker | claude-opus-5-5 | claude-opus-5-5 (364 entries) |
| studio-worker (4 lead searches + 1 acceptance check) | claude-haiku-5-5 | claude-haiku-5-5. The single claude-opus-5-5 entry per transcript is an `advisor_tool` attachment (advisor available, model opus), not the serving model. 0 advisor calls observed. |
/usage and /tasks were not run (unavailable from this session).

## Advisor calls (real): 5
1. Main, at the setup gate.
2. motion-maker, on the storyboard.
3. Main, approving the approach.
4. motion-maker, after a font-load render failure.
Calls 2 and 4 are counted from transcript metadata (`"name":"advisor"`); their content is as reported by motion-maker. 5. Main, before delivery. All five are logged in `qa/advisor-log.md`.

## Owner decisions needed before anything is published or sent
1. Using "Claude Code" (an Anthropic product name) in the studio name/end card, and naming "Remotion" in the ad.
2. A Remotion company licence, if the studio is a company that needs one.
3. Whether to verify leads in a browser and send any proposal. Nothing has been sent, applied for or published.
4. Re-running the studio under Sonnet 5.5 + Opus advisor (`./start.sh`) if you want the configured setup observed for real.

## Known limits
- Remotion 4.0.438 has no Studio interactive editing. The source is still editable code. An upgrade would touch `src/remotion-rssi/` dependencies.
- Reddit is blocked in this environment, so the forum coverage is unverified. Upwork and Product Hunt pages returned 403 to direct fetch.
