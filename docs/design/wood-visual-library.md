# Bibliothèque visuelle WOOD — proposition locale

Statut : proposition `demo`, réversible et soumise à la revue de la propriétaire et de son conjoint avant généralisation.

## Séparateurs

- `wood-accent-rule` : une ligne courte et un éventuel point accompagnent un kicker ; le texte reste le contenu principal.
- `wood-accent-frame` : un cadre fin reste attaché au bloc éditorial, derrière le contenu, sans agrandir la zone de clic.
- `wood-sticker` : une pastille éditoriale optionnelle, inclinée au maximum de `-2deg` sur grand écran et neutre sur petit écran ; elle ne remplace jamais un libellé.
- Les séparateurs utilisent uniquement les tokens WOOD existants et sont supprimables sans modifier la structure ou les informations.

## Bibliothèque de compositions

| Variante | Usage | Règle |
|---|---|---|
| `hero-split` | hero en deux masses | média et copie partagent la grille ; le CTA reste dans la copie |
| `hero-full` | moment éditorial unique | une image domine, avec une seule action lisible |
| `card-offset` | carte ou bloc de découverte | le décalage est décoratif et n’affecte ni prix ni CTA |
| `editorial-frame` | histoire, conseil, FAQ ou boutiques | cadre et repères restent dans le bloc et disparaissent au besoin |

La variété vient de la composition, des respirations et des points d’ancrage, jamais d’une nouvelle palette, d’un logo modifié ou d’une imitation de mise en page tierce.

## Vocabulaire graffiti proposé

- Tracé : ligne de `1px` pour le calme, `2px` pour un repère, `3px` seulement pour un accent isolé.
- Formes : angles doux, coins irréguliers très courts, points et cadres ouverts ; pas de motif continu derrière un prix ou un formulaire.
- Énergie : une inclinaison de `-2deg` au maximum sur un sticker éditorial ; aucune rotation permanente.
- Couleurs : `--lime`, `--ink`, `--wood`, `--pine`, `--line` et leurs transparences existantes uniquement.
- Ancrage : l’élément décoratif est enfant du bloc concerné, en `position: relative`, avec `pointer-events: none` lorsqu’il est purement décoratif.

## Responsive et repli

À `320–640px`, le cadre est réduit et l’inclinaison est retirée ; le texte et les actions restent inchangés. Avec `prefers-reduced-motion: reduce`, aucune transformation décorative ne subsiste. Un navigateur sans prise en charge du décor conserve le kicker, le titre et le contenu HTML.

Les stickers spécifiques, les motifs de catégorie et les planches d’illustrations restent des propositions séparées : leur choix, leur origine, leurs droits et leur publication finale exigent la validation humaine prévue par la feuille de route.
