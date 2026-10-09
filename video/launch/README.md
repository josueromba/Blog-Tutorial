# Vidéo de lancement · learn.

Vidéo de 45 s, construite en code (skill `launch-video`), dans le style défini par `MOTION.md`.

- `index.html` : la vidéo. Ouvert normalement, elle tourne en boucle. Avec `?render`, elle attend `window.seek(secondes)`. Les paramètres `?w=` et `?h=` changent le format.
- `render.cjs` : le rendu image par image (Playwright), puis l'encodage avec ffmpeg en H.264, yuv420p, plage limitée, bt709 et une piste audio muette.
- `out/` : les MP4 (9:16 en 1080 × 1920, 4:5 en 1080 × 1350).

```bash
node render.cjs video 1080 1920 out/learn-launch-9x16.mp4 30
node render.cjs video 1080 1350 out/learn-launch-4x5.mp4 30
node render.cjs stills 1080 1920 /tmp/stills 2,6,13,20,25,30,36,42
```

## Plan des temps

| # | Temps | Temps fort | Fragment de phrase |
|---|---|---|---|
| 1 | 0–4 s | Fond noir, le logo avance et se pose, le titre se tape mot par mot avec un curseur #90CAF9 | « Des certifications internationales, » |
| 2 | 4–9 s | Photo assombrie (zoom 1,00 → 1,06), la suite de la phrase arrive, puis les organismes | « une expertise africaine. » |
| 3 | 9–17 s | Fenêtre de verre du catalogue : « 27001 » tapé dans la recherche, 38 → 3 résultats, les cartes en cascade, clic sur « Découvrir » | « Trouvez la vôtre. » |
| 4 | 17–22 s | Fond blanc, cinq éléments inclus cochés un par un | « Tout est inclus. » |
| 5 | 22–32 s | Les étapes 01 → 03 en blocs, puis le simulateur d'examen blanc | « De l'ambition à la certification. » |
| 6 | 32–38 s | 330+ et 37 défilent sur une photo, avec leur source | « Formés sur des incidents réels. » |
| 7 | 38–45 s | Fond #0D47A1 : appel à l'action, bouton, URL (tenu 5,6 s) | « Votre certification commence maintenant. » |

## Sources de chaque mot et de chaque chiffre

Tout vient de https://learn.cybersecuriteenafrique.com/, relevé le 2026-10-09.

| Élément | Page |
|---|---|
| « Des certifications internationales, une expertise africaine. » | accueil (titre principal) |
| 38 parcours / 38 résultats, PECB · ISC2 · ISACA | /certifications |
| 3 résultats pour 27001 (Lead Implementer, Lead Auditor, Foundation) | /certifications |
| 400 000 FCFA, Avancé, 5 jours, BEST-SELLER | /certifications |
| 400+ pages, coupon et seconde tentative, fiches premium, 31 crédits CPD, un an d'accompagnement | /certifications/iso-27001-li |
| 80 questions, 3 h, QCM à livre ouvert | /certifications/iso-27001-li (L'examen) |
| « Simulation chronométrée… surveillance des sorties et score final » | /simulateur-examen |
| Étapes 01–03, trois formats | accueil |
| 330+ organisations touchées depuis 2020, 37 pays | accueil (observatoire des ransomwares) |
| « Votre certification commence maintenant. », « Voir les certifications », « Formateurs certifiés PECB Trainer » | accueil |

Photos : celles du site (`assets/img`). Polices : celles du site (`assets/fonts`).

## Écarts assumés

- Le skill réserve l'effet machine à écrire au champ de saisie. `MOTION.md` en fait la signature du titre d'ouverture : il est donc gardé pour la première phrase seulement.
- L'effet verre du skill reste discret (panneau sombre translucide, contour de 1 px), sans lueur ni dégradé, pour respecter `MOTION.md`.
- Les quiz ne sont pas montrés : le site indique « Les premiers quiz arrivent bientôt ».
