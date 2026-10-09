# Copy check - demo-002 (main session, 2026-10-09)
Method: I extracted the last frame of each of the 7 scenes (f59, 119, 179, 239, 299, 359, 449) from both final MP4s with ffmpeg (`qa/copy-frames/`, contact sheets `qa/sheet-16x9.png` and `qa/sheet-9x16.png`) and compared each visible string with the claims table in brief.md, character by character.

| Row | Expected | 16:9 | 9:16 |
|---|---|---|---|
| 1 | New in Claude: Dashboards + Motion | match | match |
| 2 | Claude Dashboards / Your data, as a dashboard that stays current | match | match |
| 3 | Click any number to see the query behind it | match | match |
| 4 | Claude Motion / Type /motion for an animated explainer | match (plus a generic "/motion" field) | match |
| 5 | Edit it, then download an MP4 / No generated footage | match | match |
| 6 | Both in beta / Dashboards: paid plans / Motion: Team & Enterprise | match | match |
| 7 | Claude Code Motion Design Studio / studio demo / Unofficial explainer · not affiliated with Anthropic / Source: claude.com, Oct 8, 2026 | match | match |
| tag | Unofficial explainer (corner, every scene) | present, no overlap | present, no overlap |

Result: PASS, with no added claims, digits or third-party names. The disclaimer is readable on the end card in both formats.
UI: generic ink/stroke surfaces only, no logo, no cream surfaces, no send button. It doesn't read as claude.ai.
Note: this is a still check, not a playback review.
