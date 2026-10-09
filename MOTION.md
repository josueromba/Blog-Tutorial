# MOTION.md : learn. (LEARN CYBERSECURITE)

À lire en entier avant de concevoir, générer ou animer quoi que ce soit pour cette marque.

Source : 5 captures du site https://learn.cybersecuriteenafrique.com/ (dossier `examples/`) et le CSS du site. Quand je n'ai pas pu trancher, c'est marqué **ASK ME**.

## 1. Couleurs

| Hex | Nom | Usage |
|---|---|---|
| #000000 | Noir | Fond des scènes d'ouverture et des scènes hero. Grand panneau aux coins arrondis. |
| #172033 | Marine / ébène | Texte titre sur fond clair, fonds sombres secondaires, cartes. |
| #1565C0 | Bleu primaire | Boutons d'action, blocs pleins (cartes de fonctionnalités), barres d'accent. |
| #0D47A1 | Bleu foncé | Fond de la scène d'appel à l'action finale. |
| #90CAF9 | Bleu clair | Curseur de frappe, prix et chiffres clés sur fond sombre, étiquette « PECB ». |
| #E8AC35 | Or | Étiquettes rares (« BEST-SELLER », offre). Une seule touche d'or par scène, au maximum. |
| #FFFFFF | Blanc | Titres sur fond sombre, fonds de sections claires. |
| #E3F2FD / #BBDEFB | Ciel / givre | Surfaces bleutées très légères derrière les icônes. |
| #53657A | Gris | Texte courant sur fond clair. Sur fond sombre, le texte courant passe en blanc à environ 70 % d'opacité. |
| #D7E3EF | Bordure | Séparateurs fins de 1 px sur fond clair. |
| #C4512D | Terracotta | Présent dans le CSS mais absent des captures. **ASK ME** avant de l'utiliser. |

## 2. Typographie

- **Titres : Plus Jakarta Sans**, graisse 800, lettres serrées (espacement légèrement négatif), point final toujours présent (« africaine. »). Interligne serré, environ 1,05.
- **Texte courant : DM Sans**, graisse 400, en gris ou en blanc atténué, interligne aéré (environ 1,6).
- **Étiquettes : DM Mono** en capitales, espacement de 0,16 em, petite taille (« PECB · ISO/IEC · 27001 », « BEST-SELLER »).
- **Chiffres clés** (330+, 37, 3) : Plus Jakarta Sans 800, très grands, avec une légende en capitales espacées en dessous.
- **Tailles pour une vidéo 1080 × 1920** (déduites des proportions du site) : titre 120–150 px, sous-titre 40–44 px, étiquette 24–28 px, chiffre clé 220–280 px. Marge de sécurité de 80 px.

## 3. Rythme

- **Entrée :** fondu de l'opacité de 0 à 1, plus une montée de 24 à 40 px, en 0,7 s avec la courbe `cubic-bezier(.22, 1, .36, 1)` (une sortie douce, celle du site).
- **Décalage :** 80 à 120 ms entre deux éléments d'un même groupe (titre, puis sous-titre, puis bouton).
- **Titre hero :** il se tape mot par mot, suivi d'un curseur vertical #90CAF9 qui clignote.
- **Maintien :** au moins 1,5 s après la fin de l'entrée, assez pour lire le texte.
- **Sortie :** fondu plus rapide que l'entrée, 0,3 à 0,5 s, avec la courbe `cubic-bezier(.4, 0, .2, 1)`.
- **Éléments en boucle** (défilement de témoignages ou de logos) : mouvement linéaire, lent et continu.

## 4. Mouvement

- Images par seconde : **ASK ME** (30 i/s par défaut avec Remotion).
- Mouvement propre, numérique et précis. Pas d'effet fait main ni d'animation par saccades.
- Photos : lent zoom avant (de 1,00 à 1,06) sous un voile sombre en dégradé.
- Les chiffres défilent jusqu'à leur valeur réelle, puis se posent.
- Les cartes arrivent en cascade, comme la rangée bleue 01 → 04.
- Sur fond noir, le logo avance doucement et en grand, puis se pose.

## 5. Texture et finition

- Aplats nets : noir, marine, bleu. Le seul dégradé autorisé est le voile sombre sur les photos.
- Grands panneaux arrondis (rayon de 24 px), cartes plus petites (rayon de 16 px), boutons en pilule, contours de 1 px.
- Photos réelles de professionnels africains, désaturées et assombries, avec le texte posé dessus.
- Pas de grain, pas de lueur, pas de néon.

## 6. Cinq interdits

1. Pas d'esthétique « hacker » cliché : pluie de code façon Matrix, néon vert, glitch, cagoules.
2. Pas plus d'une couleur d'accent vive par scène. L'or reste rare.
3. Pas de dégradés arc-en-ciel ou multicolores, pas de lueurs.
4. Pas d'autres polices que Plus Jakarta Sans, DM Sans et DM Mono.
5. Pas de chiffres ni de prix inventés. Uniquement ceux du site.
6. L'interdit propre à la marque : **ASK ME** (réponse à la question 7 en attente).

## 7. Exemple bien fait (reel 1080 × 1920, 15 s)

1. **0–2 s.** Fond noir. Le logo learn. avance et se pose. Le point bleu apparaît en dernier.
2. **2–5 s.** « Des certifications internationales, une expertise africaine. » se tape mot par mot en blanc, Plus Jakarta Sans 800, avec un curseur #90CAF9.
3. **5–8 s.** Une carte de formation monte en douceur : étiquette mono « BEST-SELLER » en or, « PECB » en bleu clair, titre « ISO/IEC 27001 Lead Implementer », prix « 400 000 FCFA » en #90CAF9.
4. **8–11 s.** Une photo assombrie sous voile, puis « 330+ », « 37 » et « 3 » défilent l'un après l'autre avec leur légende en capitales espacées.
5. **11–15 s.** Fond #0D47A1 : « Votre certification commence maintenant. », un bouton pilule « Voir les certifications », puis l'URL learn.cybersecuriteenafrique.com.
