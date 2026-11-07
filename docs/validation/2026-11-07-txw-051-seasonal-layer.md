# TXW-051 — Couche saisonnière WOOD

Statut : validé pour la démo locale, inactive par défaut.

## Comportement livré

- `wood-campaigns.js` accepte `?wood-season=halloween` ou
  `?wood-season=summer` et ajoute une scène visuelle isolée après la campagne
  `studio-wood`.
- Sans paramètre saisonnier, aucune scène n'est créée et la présentation
  permanente reste inchangée.
- La couche ne lit ni ne modifie le catalogue : aucun prix, stock, promotion,
  voucher ou checkout n'est ajouté.
- `?wood-campaign=off` continue de désactiver la campagne principale ; les
  deux mécanismes restent indépendants.
- Les textes indiquent qu'il s'agit d'un aperçu visuel et qu'une validation de
  la propriétaire est requise avant toute édition publiée.

## Vérifications

- `node --test test/seasonal-layer.test.mjs` : **2/2**.
- `npm run check` : suite globale et audits maintenus au vert après intégration.
- La couche est responsive dans `wood-editorial.css`, avec un repli en une
  colonne sous 760 px et un traitement sans mouvement supplémentaire en
  `prefers-reduced-motion`.

## Limite conservée

Les visuels saisonniers restent des aperçus de direction artistique dans la
démo. Aucun thème ne devient la version permanente et aucun asset soumis à
validation propriétaire n'est présenté comme approuvé.
