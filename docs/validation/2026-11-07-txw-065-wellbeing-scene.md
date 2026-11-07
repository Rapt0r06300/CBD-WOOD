# TXW-065 — Scène bien-être WOOD

Statut : validé pour la démo locale.

## Comportement livré

- `bien-etre.html` présente une scène éditoriale dédiée aux huiles,
  cosmétiques et soins avant la grille catalogue.
- La composition reprend les codes WOOD de matière, plantes, bois suggéré et
  graffiti, tout en indiquant clairement qu'il s'agit d'une image conceptuelle
  de démonstration.
- Les trois repères mettent en avant la matière, le conseil en boutique et la
  fiche à valider, sans présenter de bénéfice médical.
- La scène passe en une colonne sous 760 px, puis empile ses repères sous
  370 px ; le mouvement de zoom est supprimé avec `prefers-reduced-motion`.

## Vérifications

- `node --test test/wellbeing-scene.test.mjs` : **2/2**.
- La page conserve ses produits non achetables et ses informations à valider.

## Limite conservée

Les vraies étagères, plantes, huiles et cosmétiques de la boutique restent à
photographier et à faire valider. La scène publiée ici est une direction
visuelle de démo, pas une photo du magasin.
