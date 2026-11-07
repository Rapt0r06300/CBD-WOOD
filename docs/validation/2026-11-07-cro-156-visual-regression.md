# CRO-156 — Régression visuelle automatisée

Le lot de référence contient **24 captures** : les 12 routes publiques de la
démo en `390×844` et `1440×900`. Le manifeste est versionné dans
`2026-11-07-cro-156-visual-regression-manifest.json`.

Le comparateur `scripts/compare-visual-captures.mjs` lit deux dossiers de
captures, vérifie qu'aucun fichier n'est manquant, puis compare les empreintes
SHA-256. Une différence est signalée au lieu d'être écrasée. Exemple :

```text
node scripts/compare-visual-captures.mjs --reference <avant> --current <apres> --manifest docs/validation/2026-11-07-cro-156-visual-regression-manifest.json
```

La grille contrôle les CTA et la géométrie des écrans. Les états interactifs
(menu, panier, galerie tactile, reduced-motion et Safe Area) restent couverts
par les contrats navigateur déjà présents et ne sont pas artificiellement
déduits d'une capture statique. La preuve est donc lisible : 24 vues comparées,
états d'interaction contrôlés séparément, aucun écart sur la comparaison
exécutée avec les captures locales archivées.

Limite : cette preuve Chromium locale ne remplace pas une validation Safari
iOS ou Android physique.
