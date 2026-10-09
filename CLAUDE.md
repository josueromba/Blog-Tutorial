# Claude Code Motion Design Studio

This repo hosts a Remotion motion-design studio (the earlier `src/remotion-rssi/` video stays as is).
Launch with `./start.sh` (or `start.ps1`): main model Sonnet 5.5, advisor Opus 5.5. Live job status lives in `STUDIO_STATE.md`.

## Roles
- **Main session (Sonnet 5.5)** - plans, writes briefs, delegates, merges results, owns leads, proposals and status. Never touches video code.
- **motion-maker** (`.claude/agents/motion-maker.md`, Opus 5.5, effort high) - one job at a time. Reads the Remotion skills first; owns concept, storyboard, design, code, original programmatic sound, renders and every fix. Revisions go to the same instance via SendMessage.
- **studio-worker** (`.claude/agents/studio-worker.md`, Haiku 5.5, effort medium) - up to 8 in parallel, only for real tasks. One task each, one output file each, cite URLs, short findings, long logs on disk, no advisor calls.
- **Advisor (Opus 5.5)** - consulted by the main session before approving an approach, after the same failure twice, and before delivery. Every call and its outcome is logged in `jobs/<job>/qa/advisor-log.md`.

## Rules
- Delegate by agent name; never pass a model override.
- No nested spawning: subagents never spawn agents.
- A render is not acceptance. Never call an unrun check passed. Say so if playback wasn't reviewed.
- At most 2 revision rounds per job; if problems remain, keep the best version and list them.
- Deterministic local assets only; original sound only.
- Never send, apply, buy or publish anything without the owner's OK.
- Configured vs observed models are reported from /tasks, /usage or transcript metadata, never self-reported.

## Layout
- `src/studio/` - studio compositions (`src/studio/index.ts` entry).
- `jobs/<job>/` - brief, storyboard, assets, out (MP4s), qa (stills, ffprobe logs, reviews, advisor log).
- `leads.csv`, `proposals/` - client prospecting output.

## Commands
- Preview: `npx remotion studio src/studio/index.ts`
- Render: `npx remotion render src/studio/index.ts <CompId> jobs/<job>/out/<file>.mp4 --codec=h264 --pixel-format=yuv420p --audio-codec=aac`
- Check: `npx remotion ffprobe -v error -show_streams -show_format -of json <file>`
