# Pack graffiti WOOD

Le pack est une bibliothèque de seize accents vectoriels originaux. Ils servent à donner du rythme aux blocs éditoriaux WOOD ; ils ne remplacent ni une photo, ni un titre, ni une information d’achat.

## Inventaire

| Accent | Fichier | Usage conseillé |
| --- | --- | --- |
| Flèche | `wood-arrow.svg` | guider vers une action ou un rail |
| Étoile | `wood-star.svg` | signaler une sélection éditoriale |
| Halo | `wood-halo.svg` | encadrer un visuel botanique |
| Tag | `wood-tag.svg` | ponctuer une accroche non commerciale |
| Ligne de vitesse | `wood-speed-line.svg` | donner du mouvement à un bloc |
| Sticker botanique | `wood-botanical-sticker.svg` | signer une zone récit |
| Tampon de section | `wood-section-stamp.svg` | identifier une section WOOD |
| Accent de carte | `wood-card-accent.svg` | souligner une carte produit ou éditoriale |
| Burst | `wood-burst.svg` | créer un impact de drop ou de preuve |
| Scribble | `wood-scribble.svg` | relier une accroche à une action |
| Zigzag | `wood-zigzag.svg` | rythmer une grille d’univers |
| Smiley | `wood-smiley.svg` | apporter une touche chill/humour |
| Couronne | `wood-crown.svg` | valoriser une sélection sans promesse commerciale |
| Splash | `wood-splash.svg` | habiller une carte sans masquer son contenu |
| Flèche en boucle | `wood-loop-arrow.svg` | guider la lecture d’un rail |
| Sticker GOOD MOOD | `wood-sticker-good.svg` | signer une zone éditoriale avec humour |

## Règles

- Chaque SVG est décoratif, porte `aria-hidden="true"` et `focusable="false"`.
- Un accent ne porte jamais seul un prix, une disponibilité, une allégation, une erreur, une validation ou une promotion.
- Les accents restent ancrés à leur bloc, ne sont jamais fixés au viewport et peuvent être masqués sans déplacer le contenu essentiel.
- Les variantes utilisent les tokens WOOD ; le pack ne copie pas TealerLab ou une autre marque.
- En `prefers-reduced-motion: reduce`, les accents restent statiques ou sont masqués ; le contenu demeure dans le même ordre.
- Sur mobile et à l’impression, une décoration peut disparaître sans perte d’information.

## Revue

Avant publication, vérifier desktop, mobile, zoom 200 %, navigation clavier, contraste des éléments voisins et retrait complet du pack. Toute photo ou déclinaison supplémentaire doit garder son état `demo`, `prepared`, `approved` ou `real-photo` explicite.
