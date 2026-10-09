# Copy check - demo-002 FR (main, 2026-10-09)

## Source (codepoints)
`src/studio/demo-002/copy.ts`:
- `NNBSP` is U+202F, used before every ":" (4 places): `Claude :` (hook), `Dashboards : offres payantes`, `Motion : Team et Enterprise`, `Source : claude.com, …`.
- Every brief-fr.md string is present. Some are split over two lines for layout only; the words are unchanged.
- "Modifiez-la" uses U+002D.

## Frames (last frame of each scene, both final MP4s; `qa/copy-frames-fr/`, `qa/sheet-fr-*.png`)
| Row | FR expected | 16:9 | 9:16 |
|---|---|---|---|
| 1 | Nouveau dans Claude : Dashboards + Motion | match | match |
| 2 | Claude Dashboards / Vos données en tableau de bord, toujours à jour | match | match |
| 3 | Cliquez sur un chiffre pour voir sa requête | match | match |
| 4 | Claude Motion / Tapez /motion pour une vidéo explicative animée | match | match |
| 5 | Modifiez-la, puis téléchargez un MP4 / Aucune séquence générée | match | match |
| 6 | Les deux en bêta / Dashboards : offres payantes / Motion : Team et Enterprise | match | match |
| 7 | Claude Code Motion Design Studio / démo studio / Explication non officielle · sans lien avec Anthropic / Source : claude.com, 8 oct. 2026 | match | match |
| tag | Explication non officielle (56 px, every scene) | present, no overlap | present, no overlap |

Accents (é, è, ê, à) render in Inter, with no fallback glyphs. The colon never orphans. In the full-resolution crop, the hyphen in "Modifiez-la" is Inter's normal hyphen spacing.
Result: PASS. This is a still check, not a playback review.
