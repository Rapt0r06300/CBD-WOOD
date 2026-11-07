# Audit runtime des interactions — 7 novembre 2026

## Périmètre

La matrice Chromium locale a ouvert les 12 routes publiques de la démo : accueil,
quatre catalogues, contact, fiche fleur, fiche générique, checkout, compte,
confirmation et 404. À chaque ouverture, les niveaux `error` et `warning` de la
console ont été lus.

Résultat : **12/12 routes, 0 erreur, 0 warning**.

## Correction appliquée

`wood-product-actions.js` insérait le bouton `Aperçu` avant le nœud `.product-meta`
dans ce même nœud. Chromium signalait alors `NotFoundError` sur les catalogues
qui possèdent cette structure. Le branchement est maintenant idempotent : le
bouton est ajouté au début de `.product-meta`, ou à la fin de `.product-body` si
le bloc meta n'existe pas. Les protections `data-motion-wired`,
`data-wood-pointer-wired` et `data-wood-preview` empêchent les doublons lors des
rafraîchissements de catalogue.

## Limites

Ce contrôle couvre Chromium local, les routes publiques et les interactions
chargées par la démo. Les appareils Safari/Android réels et les intégrations
externes restent des validations séparées.
