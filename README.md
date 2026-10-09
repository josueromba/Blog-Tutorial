# Blog-Tutorial
Source code to support blog posts on josueromba.wordpress.com

## Claude Code Motion Design Studio
A Remotion studio driven by Claude Code. Roles and rules are in `CLAUDE.md`, live status in `STUDIO_STATE.md`.

### Start the studio
```bash
./start.sh            # claude --model claude-sonnet-5-5 --advisor claude-opus-5-5
# Windows: ./start.ps1
```
In the desktop app: open this folder, choose Sonnet 5.5, then run `/advisor opus`.

### Preview
```bash
npm ci
npx remotion studio src/studio/index.ts
```

### Render demo-001
Render with the brief's flags plus `--color-space=bt709` (needed for yuv420p). Then run the AAC-priming remux:
```bash
npx remotion render src/studio/index.ts Demo001Landscape jobs/demo-001/qa/raw-renders/demo-001-16x9.raw.mp4 --codec=h264 --pixel-format=yuv420p --audio-codec=aac --color-space=bt709
scripts/studio/demo-001/finalize-audio.sh jobs/demo-001/qa/raw-renders/demo-001-16x9.raw.mp4 jobs/demo-001/out/demo-001-16x9.mp4
# Vertical: Demo001Vertical -> demo-001-9x16
```
Regenerate the score (deterministic): `node scripts/studio/demo-001/synth-score.mts`
Check a file: `npx remotion ffprobe -v error -show_streams -show_format -of json <file>`

### Example prompts
- **New video:** "New job jobs/acme-001: 15 s launch video for Acme (inputs in ~/acme/). Write the brief, have motion-maker storyboard it, consult the advisor, then build, render 16:9 + 9:16, run the worker ffprobe check and the scene review."
- **Revise demo-001:** "Revise demo-001: make the hook 'Ship your launch in motion.' and slow scene 3 by 15 frames. Send it to the same motion-maker, re-render, re-run the acceptance check."
- **Find clients:** "Run the client search again: up to 4 studio-workers on public sources, merge up to 10 into leads.csv, mark unverified items, and draft no more than 3 proposals. Don't send anything."

### Outputs
- Demo: `jobs/demo-001/out/` · QA: `jobs/demo-001/qa/` · report: `jobs/demo-001/REPORT.md`
- Leads: `leads.csv` (notes in `research/leads/`) · proposals: `proposals/` (drafts, not sent)
