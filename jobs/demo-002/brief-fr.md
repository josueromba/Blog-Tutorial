# Brief - demo-002 FR (French version, copy swap)

Owner's request (2026-10-09): "fais la version française". Same video as demo-002 (timing, motion, sound, palette, layout logic); only the on-screen copy changes. The main session owns this copy. Product names stay in English, as officially named. French typography: a narrow no-break space (U+202F) before `:`; "Dashboards", "Motion", "Team", "Enterprise" and "MP4" are unchanged.

| # | EN (approved) | FR (exact) | Fidelity note (source: claude.com, 8 Oct 2026) |
|---|---|---|---|
| 1 | New in Claude: Dashboards + Motion | `Nouveau dans Claude : Dashboards + Motion` | title |
| 2 | Claude Dashboards / Your data, as a dashboard that stays current | `Claude Dashboards` / `Vos données en tableau de bord, toujours à jour` | "turn your data into a dashboard that stays current" |
| 3 | Click any number to see the query behind it | `Cliquez sur un chiffre pour voir sa requête` | "Click any number to see the query behind it" |
| 4 | Claude Motion / Type /motion for an animated explainer | `Claude Motion` / `Tapez /motion pour une vidéo explicative animée` | "/motion" + "animate explainers" |
| 5 | Edit it, then download an MP4 / No generated footage | `Modifiez-la, puis téléchargez un MP4` / `Aucune séquence générée` | "adjust it in the editor … download it as an MP4 file" + "no generated footage" |
| 6 | Both in beta / Dashboards: paid plans / Motion: Team & Enterprise | `Les deux en bêta` / `Dashboards : offres payantes` / `Motion : Team et Enterprise` | "in beta on paid plans" + "in beta on Team and Enterprise" |
| 7 | End card | `Claude Code Motion Design Studio` + tag `démo studio` / `Explication non officielle · sans lien avec Anthropic` / `Source : claude.com, 8 oct. 2026` | disclaimer + source |
| tag | Unofficial explainer | `Explication non officielle` | corner tag, whole video. This string is longer, so it may go down to 44-48 px but must stay ≥ 40 px and never overlap text. |

Rules: same as brief.md (phone floors, ≥ 1.2 s holds, safe area, no logos, no claude.ai look-alike, no added claims). If a French line doesn't fit, report the exact line and a proposed break or size. Do not reword the copy.

Formats: `Demo002FrLandscape` / `Demo002FrVertical`, 1920x1080 / 1080x1920, 30 fps, 450 frames. Outputs: `jobs/demo-002/out/demo-002-fr-16x9.mp4`, `demo-002-fr-9x16.mp4`, using the same render flags + finalize-audio. Same score WAV as EN, so timing is unchanged.
Integrity: the EN demo-002 and demo-001 MP4s and WAVs must stay byte-identical. Prove it with sha256 before and after.
