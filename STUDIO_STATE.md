# Studio state

## Status (2026-10-09)
| Stage | State |
|---|---|
| 1. Environment check | Done (see below) |
| 2. Remotion project + skills | Done: reused existing project; 12 Remotion skills in `.claude/skills/` |
| 3. Project settings + launchers | Done: `.claude/settings.json`, `start.sh`, `start.ps1` |
| 4. Agents | Done: `motion-maker`, `studio-worker` |
| 5. CLAUDE.md + this file | Done |
| 6. Gate | **STOPPED** - setup session observed as `claude-opus-5-5` (get_session: `session_context.model` and `last_served_model`), not Sonnet 5.5; the advisor tool only attached mid-session; the session started before `.claude/agents/` existed. Writing `.claude/settings.json` did not change this session's model. Restart required (see Restart below). |
| Job demo-001 | Done: 2 MP4s pass ffprobe acceptance; 1 revision round; scene review OK; playback not reviewed. See jobs/demo-001/REPORT.md |
| Clients (leads, proposals) | leads.csv 9 rows; 3 proposal drafts in proposals/ (not sent) |
| Deliver | README + jobs/demo-001/REPORT.md written; owner decisions listed there |

### Environment check
- Claude Code: `claude --version` and `/opt/claude-code/bin/claude --version` both report 2.1.295 (>= 2.1.293), and get_session reports container 2.1.295: OK. The env var `CLAUDE_CODE_VERSION=2.1.42` disagrees. It looks stale; noted, not relied on.
- Node v22.22.0, npm 10.9.4, ffprobe 6.1.1: OK
- Provider: Anthropic API (`ANTHROPIC_BASE_URL=https://api.anthropic.com`, no Bedrock/Vertex/Foundry vars): OK
- DISABLE_TELEMETRY, CLAUDE_CODE_DISABLE_ADVISOR_TOOL, CLAUDE_CODE_EFFORT_LEVEL, ANTHROPIC_MODEL: not set - OK
- availableModels: no user/managed settings restrict it - OK
- Note: this runs in a Claude Code cloud container; the desktop app's environment may differ, re-check there.

### Advisor log (setup)
- 2026-10-09, gate review: the advisor confirmed the stop at the gate and asked for branch-aware restart steps, accurate gate wording, a version note, and a check of the agent frontmatter against the sub-agents docs. All were applied; `skills` is now a YAML list.

## Observed models (transcript metadata, grep of `"model":"..."` in each agent's transcript)
| Agent | Configured | Observed |
|---|---|---|
| main session | claude-sonnet-5-5 (project setting) | claude-opus-5-5 (get_session: session_context.model and last_served_model). The gate was overridden by the owner. |
| motion-maker (storyboard) | claude-opus-5-5 | claude-opus-5-5 x37 |
| studio-worker x4 (leads) | claude-haiku-5-5 | claude-haiku-5-5 (18-36 entries each), plus 1 claude-opus-5-5 entry per transcript, probably parent/session metadata (not verified) |

## Restart
1. Get this branch: `git fetch origin claude/beautiful-dirac-48xhh5 && git checkout claude/beautiful-dirac-48xhh5` (or pick that branch when starting a session).
2. Open the repo root. In the desktop app, open the folder, choose Sonnet 5.5, and run `/advisor opus`. In a terminal, run `./start.sh`.
3. Paste: `Read STUDIO_STATE.md and CLAUDE.md. Continue the studio setup and first job.`

## Prompt (verbatim)

Build a motion-design studio in Claude Code and ship its first job. Opus 5.5 makes every video, Sonnet 5.5 runs the studio, Haiku 5.5 workers handle research and small tasks. Based on https://code.claude.com/docs/en/advisor (Sonnet main + Opus advisor) and https://www.remotion.dev/docs/ai/coding-agents. If the docs disagree with this prompt, follow the docs.

SETUP
1. Report OK/MISSING + fix: Claude Code >= 2.1.293, Node, npm, Anthropic API provider (the advisor doesn't run on Bedrock/Vertex/Foundry), and anything that disables the advisor or overrides models/effort: DISABLE_TELEMETRY, CLAUDE_CODE_DISABLE_ADVISOR_TOOL, CLAUDE_CODE_EFFORT_LEVEL, ANTHROPIC_MODEL, availableModels. Don't change global settings.
2. Reuse a Remotion project here or run `npx create-video --yes --blank motion-studio`. Install skills: `npx remotion skills add` (fallback: `npx skills add remotion-dev/skills`).
3. Merge into project .claude/settings.json: {"model": "claude-sonnet-5-5", "advisorModel": "claude-opus-5-5"} Launchers start.sh and start.ps1: claude --model claude-sonnet-5-5 --advisor claude-opus-5-5
4. In .claude/agents/, write a full body for each agent from ROLES below: motion-maker: model claude-opus-5-5, effort high, tools Read, Write, Edit, Bash, Glob, Grep; skills = installed Remotion skills. studio-worker: model claude-haiku-5-5, effort medium, tools Read, Write, Bash, Glob, Grep, WebSearch, WebFetch. No Agent tool for either (no nested spawning).
5. CLAUDE.md with roles and rules. STUDIO_STATE.md with this prompt verbatim + status.
6. GATE: continue only if this session is claude-sonnet-5-5, has the advisor, and started in the project root after .claude/agents/ existed. Otherwise stop and give me the restart command (desktop app: open the folder, choose Sonnet 5.5, run /advisor opus) plus the line "Read STUDIO_STATE.md and CLAUDE.md. Continue the studio setup and first job." Never claim that writing settings changed the current model. Never start another Claude process from this session. If access is missing, stop that stage and finish the independent setup work.

ROLES
- You (Sonnet): plan, brief, delegate, merge results, leads, proposals, status. You never touch video code.
- motion-maker (one at a time): reads the Remotion skills first; owns concept, storyboard, design, code, original programmatic sound, renders and every fix. Send revisions to the same instance via SendMessage.
- studio-workers (up to 8, only real tasks): one task each, own output file, cite URLs, return short findings, keep long logs on disk, no advisor calls.
- Advisor: consult before approving the approach, after the same failure twice, and before delivery. Log each call and its outcome.
- Delegate by agent name; never pass a model override.

JOB jobs/demo-001
Use inputs I provided and copy them to assets/ with their sources; otherwise make an original ad for this studio, labeled "studio demo".
Brief to motion-maker: audience, message, required text, assets, formats, acceptance criteria.
Two MP4s, 15.0 s, 30 fps, 450 frames, H.264 yuv420p + AAC: 1920x1080 and a recomposed 1080x1920. Render with --codec=h264 --pixel-format=yuv420p --audio-codec=aac. Hook in the first second, text readable on a phone, sound on the cuts, deterministic local assets.
Flow: concept + timed storyboard -> advisor -> build -> review stills -> render -> a worker checks both files with `npx remotion ffprobe` (size, 30/1, counted frames = 450, codec, pix_fmt, audio stream, duration within 1 frame, decodes cleanly) -> motion-maker reviews every scene and transition for clipping, overlap, typography, brand consistency, missing assets and layout -> at most 2 revision rounds. If problems remain, keep the best version and list them.
Save all QA in jobs/demo-001/qa/.

CLIENTS (in parallel)
Service: 15 s SaaS video + vertical, editable Remotion source, one revision.
Workers search public pages for SaaS product video, UI animation, Remotion and launch-video requests; check dates; prioritize recent explicit requests with budgets; label companies without a request "prospect"; skip jobs needing After Effects/Premiere source; no logins, no bypassing gated sites. Report fewer than 10 rather than padding.
Merge up to 10 into leads.csv:
company,url,date_checked,request_date,type,budget,deliverables,deadline,source_format,fit,next_action
Write up to 3 drafts in proposals/ based on the real demo; ask for the budget, don't invent one.

DELIVER
README: preview, render and start commands; example prompts for a new video, revising demo-001 and finding clients. Final report: links to the MP4s, source, QA, leads, proposals; configured vs observed models (observed = /tasks, /usage or transcript metadata, never self-report); real advisor calls.

RULES: a render is not acceptance. Never call an unrun check passed. Say so if playback wasn't reviewed. Never send, apply, buy or publish without my OK.
