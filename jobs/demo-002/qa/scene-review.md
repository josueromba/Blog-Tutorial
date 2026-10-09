# Scene review - demo-002 (FINAL MP4s)

**Source:** frames extracted with ffmpeg from the final files `jobs/demo-002/out/demo-002-16x9.mp4` and `demo-002-9x16.mp4` (after finalize-audio, bt709 / yuv420p) into `jobs/demo-002/qa/review-frames/`.

**Frames, per format:** 0, 30, 59, 60, 61, 90, 119, 120, 121, 150, 179, 180, 181, 210, 239, 240, 241, 270, 299, 300, 301, 330, 359, 360, 361, 405, 449. That gives each scene's first, middle and last frame plus cut-1 and cut+1 at every cut: 54 PNGs, each one opened and inspected.

**Checks per row:**
- **Clip:** clipping or off-frame elements.
- **Overlap:** elements overlapping, including the corner tag.
- **Type:** sizes against the floors (headline at least 96 px, body at least 56 px), and line breaks.
- **Brand:** consistency across formats.
- **Assets:** nothing missing.
- **Safe:** everything inside the 8% safe area (16:9: x 154-1766, y 86-994; 9:16: x 86-994, y 154-1766).
- **Look-alike:** no claude.ai look-alike.

**Not reviewed:** real-time playback with audio. Only still frames were inspected. Sync was measured numerically (`qa/logs/audio-sync.log`: 0 samples at all 7 cuts), not listened to.

| Scene / transition | Frames | 16:9 | 9:16 |
|---|---|---|---|
| S1 Hook | 0, 30, 59 | OK. f0 is not empty (corner tag plus partial headline and cards). Headline 120 px on 2 lines; "Claude" in Paper, "Dashboards"/"Motion" in Violet; the two generic cards sit below the text with no overlap. | OK. 104 px on 3 lines, left-aligned below the corner tag (headline top at about y=430; the tag ends at y≈242). The cards are stacked in the lower half. |
| Cut 60 | 59, 60, 61 | OK | OK |
| S2 Dashboards | 61, 90, 119 | OK. 112 px name plus 60 px body on 2 lines; card on the right, no digits. **Minor, not text:** during the slide-in (about f60-65) the card edge passes the right safe line by about 30 px, inside the frame. | OK. Text on top, full-width card below, all inside safe. |
| Cut 120 | 119, 120, 121 | OK | OK |
| S3 Query | 121, 150, 179 | OK. 72 px on 2 lines, below the tag. The connector leaves the pill upward, runs above the dashboard and drops into the query panel, crossing no other tile. The value pill has no digits. | OK. 80 px on 3 lines; the query panel overlaps the dashboard's lower half by design and covers no text. |
| Cut 180 | 179, 180, 181 | OK | OK |
| S4 Motion | 181, 210, 239 | OK. 112 px name plus 64 px body; the typed `/motion` is 60 px Coral. The field uses Ink/Stroke surfaces with square-ish corners, **no send button, no placeholder, no cream or beige surface**. The option chip and preview canvas contain no text. | OK. The same elements stacked; the preview circle stays inside the canvas (the clipping fixed before render). |
| Cut 240 | 239, 240, 241 | OK | OK |
| S5 Edit + MP4 | 241, 270, 299 | OK. 80 px on 2 lines plus the 56 px Mint pill "No generated footage". The editor's keyframe drag moves the preview shape; the generic file icon has no label. | OK. Text and pill on top, editor below. |
| Cut 300 | 299, 300, 301 | OK | OK |
| S6 Beta | 301, 330, 359 | OK. 120 px headline plus two 64 px rows with Coral diamond bullets; the diamond motif sits on the right, clear of the text. | OK. 112 px plus 58 px rows; "Motion: Team & Enterprise" fits on one line (ends about x=862 of 994). |
| Cut 360 | 359, 360, 361 | OK | OK |
| S7 End card | 361, 405, 449 | OK. Name 96 px on 2 lines; `studio demo` pill 56 px; disclaimer 56 px on 2 lines; source 56 px on one line (ends about y=895, above the timeline strip); everything fully on screen from about f382 through f449. | OK. Name on 3 lines; disclaimer on 3 lines; source on 2 lines; all 56 px or more, centred, inside safe. |

**Corner tag:** "Unofficial explainer" at 56 px, top-left inside safe, visible in all 54 frames with no overlap in any scene or format.

**Brand:** Inter only, studio palette only, the same end-card elements in both formats; "Claude" is never set in Coral. No logos, spark marks or third-party names in any frame.

**Assets:** nothing missing in any extracted frame.

**Result:** no real issues found. The one minor note (the dashboard card's slide-in overshoot around f60-65) is decorative and stays in frame. Revision round 1 for demo-002 was **not** used; the files are unchanged.
