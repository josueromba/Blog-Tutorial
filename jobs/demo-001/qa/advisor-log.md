# Advisor log - demo-001
Main session: claude-opus-5-5 (per get_session), advisor attached. The owner overrode the gate ("continue quand même ici").

| # | When | Caller | Trigger | Outcome | Evidence |
|---|---|---|---|---|---|
| 1 | 2026-10-09, setup | main | Gate review before declaring setup done | Confirmed the stop at the gate. Asked for branch-aware restart steps, accurate gate wording, a version note, and a check of the agent frontmatter against the docs. All applied. | Main transcript (advisor tool result) |
| 2 | 2026-10-09, storyboard | motion-maker | Before finalising the storyboard | Advice folded into storyboard.md, according to motion-maker. The main session hasn't read the advice text itself. | Transcript metadata: 1 `"name":"advisor"` occurrence in motion-maker's transcript (grep count). The content is self-reported. |
| 3 | 2026-10-09, approach approval | main | Before approving the approach | Approved the storyboard. Rulings: stay on 4.0.438, 56 px tag OK, same 16:9 type floor, naming/licence is owner sign-off before publishing. Build conditions: exact pins, rssi regression check, micro-cues in timing.ts, stills inspected, ffprobe acceptance by a studio-worker. | Main transcript (advisor tool result) |
| 4 | 2026-10-09, build | motion-maker | Font loading timeout during the full render (a failure) | motion-maker reports the advice: load fonts in the component lifecycle with a per-face check. Fix verified by a still with a `serif` fallback that rendered Inter. | Transcript metadata: `"name":"advisor"` count in motion-maker's transcript went 1 → 2. Content is self-reported. |
