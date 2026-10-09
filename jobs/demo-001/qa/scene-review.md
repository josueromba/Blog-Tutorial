# Scene review - demo-001 (FINAL MP4s)

**Source:** frames extracted with ffmpeg from the final files `jobs/demo-001/out/demo-001-16x9.mp4` and `demo-001-9x16.mp4` (after `finalize-audio.sh`, bt709 / yuv420p) into `jobs/demo-001/qa/review-frames/`.

**Frames, per format:** 0, 37, 74, 75, 76, 120, 164, 165, 166, 210, 254, 255, 256, 292, 329, 330, 331, 360, 389, 390, 391, 420, 449. That gives each scene's first, middle and last frame plus cut-1 and cut+1 at every cut: 46 PNGs, each one opened and inspected.

**Checks per row:**
- **Clip:** clipping or off-frame text.
- **Overlap:** elements overlapping.
- **Type:** sizes against the floors (headline at least 96 px, body at least 56 px), line breaks, and whether the font is Inter.
- **Brand:** consistency across formats.
- **Assets:** nothing missing.
- **Safe:** everything inside the 8% safe area (16:9: x 154-1766, y 86-994; 9:16: x 86-994, y 154-1766).

**Not reviewed:** real-time playback with audio. Only still frames were inspected; audio sync was measured numerically (`qa/logs/audio-sync.log`), not listened to.

| Scene / transition | Frames | 16:9 | 9:16 |
|---|---|---|---|
| S1 Hook | 0, 37, 74 | OK. f0 shows "Your" at about 60% opacity plus orbits (not an empty frame). 150 px Inter ExtraBold, 2 lines. The underline sits under "motion." and the line spans x≈315-1605. | OK. 120 px, 3 lines, left-aligned at x=86. The orbit is in the lower third, clear of the text. |
| Cut 1 (f74→f75/76) | 74, 75, 76 | OK. Hard cut. "15 s" and the card enter at partial opacity, and the second timeline diamond flashes. | OK |
| S2 Offer | 76, 120, 164 | OK. "15 s" 200 px, "SaaS video" 120 px, card on the right, no overlap. **Minor, not text:** during the slide-in (about f75-80) the card's right edge reaches about x=1805, 40 px past the safe line but still inside the frame. Settled at x≤1766 from about f82. | OK. Stacked layout, card 907 px wide, inside safe. |
| Cut 2 (f164→f165/166) | 164, 165, 166 | OK | OK |
| S3 Formats | 166, 210, 254 | OK. "16:9 + 9:16" on one line at 140 px. The landscape frame and the recomposed portrait frame don't overlap. | OK. 112 px headline, frames stacked, portrait frame centred. |
| Cut 3 (f254→f255/256) | 254, 255, 256 | OK. The caret starts at the row start. | OK |
| S4 Source | 256, 292, 329 | OK. 3 lines at 120 px. The value token recolours (f292 mid-transition, f329 coral) and the preview card follows. The code panel and text column don't overlap. | OK. 112 px. The preview card overlaps the code panel by design and covers no text. |
| Cut 4 (f329→f330/331) | 329, 330, 331 | OK | OK |
| S5 Revision | 331, 360, 389 | OK. 132 px, 2 lines; check badge and loop arrow fully drawn. | OK. 112 px, centred. |
| Cut 5 (f389→f390/391) | 389, 390, 391 | OK | OK |
| S6 End card | 391, 420, 449 | OK. 3 lines at 120 px plus a 56 px tag pill, all six diamonds lit. f449 is the complete end card. | OK. 104 px, the same 3 lines, a 56 px tag and the same mark. |

**Brand consistency:** same palette, one type family (Inter, bundled; load proof is in `SOURCES.md`) and the same end-card elements and line breaks in both formats.

**Assets:** no missing fonts, frames or elements in any extracted frame.

**Result:** no real issues found. The one minor note (the 16:9 card briefly past the safe line while sliding in, around f75-80) is decorative motion, not text, and stays in frame. Revision round 2 was **not** used; the files are unchanged.
