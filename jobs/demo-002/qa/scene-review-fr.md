# Scene review - demo-002 FR (FINAL MP4s)

**Source:** frames extracted with ffmpeg from the final files `jobs/demo-002/out/demo-002-fr-16x9.mp4` and `demo-002-fr-9x16.mp4` into `jobs/demo-002/qa/review-frames-fr/`.

**Frames, per format:** 0, 30, 59, 60, 61, 90, 119, 120, 121, 150, 179, 180, 181, 210, 239, 240, 241, 270, 299, 300, 301, 330, 359, 360, 361, 405, 449. That gives each scene's first, middle and last frame plus cut-1 and cut+1 at every cut: 54 PNGs, every one opened and viewed. 15 frames failed to display on the first attempt and were re-opened and viewed.

**Checks per row:**
- **Clip:** clipping or off-frame elements.
- **Overlap:** elements overlapping, including the corner tag.
- **Floors:** headline at least 96 px, body at least 56 px.
- **FR breaks:** French line breaks, with no orphaned ":".
- **EN:** consistency with the English version.
- **Safe:** everything inside the 8% safe area.
- **Look-alike:** no claude.ai look-alike.

**Not reviewed:** real-time playback with audio. Only still frames were inspected. Sync was measured numerically (`qa/logs/audio-sync-fr.log`: 0 samples at all 7 cuts), not listened to.

| Scene / transition | Frames | 16:9 | 9:16 |
|---|---|---|---|
| S1 Hook | 0, 30, 59 | OK. "Nouveau dans Claude :" on one line with the U+202F colon attached, "Dashboards + Motion" on line 2, 120 px. The cards lock in below. f0 is not empty. | OK. 104 px on 4 lines: "Nouveau dans" / "Claude :" / "Dashboards +" / "Motion". The colon stays with "Claude". Clear of the tag. |
| Cut 60 | 59, 60, 61 | OK | OK |
| S2 Dashboards | 61, 90, 119 | OK. 112 px name plus 60 px body: "Vos données en tableau" / "de bord, toujours à jour", inside the left column with no overlap with the card. | OK. Same breaks; text above the full-width card. |
| Cut 120 | 119, 120, 121 | OK | OK |
| S3 Query | 121, 150, 179 | OK. 72 px: "Cliquez sur un chiffre" / "pour voir sa requête". The connector runs above the dashboard into the panel; the value pill has no digits. | OK. 80 px on 2 lines (the line fits at about 818 of 908 px). The panel overlaps the dashboard by design and covers no text. |
| Cut 180 | 179, 180, 181 | OK | OK |
| S4 Motion | 181, 210, 239 | OK. 112 px name plus 64 px: "Tapez /motion pour une" / "vidéo explicative animée", clear of the field. The field uses Ink/Stroke surfaces with square-ish corners, no send button, no placeholder and no cream surface. | OK. Same breaks; field, chip and preview stacked; the preview circle stays inside its canvas. |
| Cut 240 | 239, 240, 241 | OK | OK |
| S5 Edit + MP4 | 241, 270, 299 | OK. 80 px: "Modifiez-la, puis" / "téléchargez un MP4"; the 56 px pill "Aucune séquence générée" ends about x=1750, inside the 1766 safe line (narrower editor, FR only). | OK. Text and pill on top, editor below. |
| Cut 300 | 299, 300, 301 | OK | OK |
| S6 Beta | 301, 330, 359 | OK. "Les deux en bêta" 120 px; rows "Dashboards : offres payantes" and "Motion : Team et Enterprise" at 64 px, each colon attached by U+202F. | OK. Headline 104 px (the 9:16 FR size; fits at about 895 of 908 px); rows at 58 px on one line each. |
| Cut 360 | 359, 360, 361 | OK | OK |
| S7 End card | 361, 405, 449 | OK. Name 96 px on 2 lines; `démo studio` pill 56 px; disclaimer 56 px "Explication non officielle ·" / "sans lien avec Anthropic"; source 56 px on one line "Source : claude.com, 8 oct. 2026". All above the timeline strip. | OK. Name on 3 lines; disclaimer on 2 lines; source on 2 lines "Source : claude.com," / "8 oct. 2026"; all 56 px or more, centred. |

**Corner tag:** "Explication non officielle" at 56 px in all 54 frames. It never overlaps a headline in either format, so neither the 44-48 px reduction nor the "Non officiel" fallback was used.

**Consistency with EN:** the same layout, motion, palette, Inter weights and end-card structure. Only the copy and line breaks differ, plus the FR-only narrower 16:9 editor in S5.

**Observation, not a defect:** in "Modifiez-la" the hyphen shows Inter Bold's normal sidebearings at 80 px. It is a plain U+002D with no added space; its measured advance equals the glyph's own width.

**Result:** no real issues found. FR revision round 1 was **not** used; the files are unchanged.
