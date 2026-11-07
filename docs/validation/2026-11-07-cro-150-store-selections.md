# CRO-150 — Sélections propres à chaque boutique

## Statut

`PARTIAL / pending-owner-confirmation` — contrat local préparé le 7 novembre 2026

Le contrat distingue Barla et Borriglione par leur adresse et réserve les
quatre univers WOOD sans attribuer de référence à une boutique. Les produits,
prix et stocks restent vides jusqu'à réception d'une source propriétaire
datée et vérifiée.

## Règles

- Une sélection locale doit être rattachée à un identifiant de boutique, une
  adresse confirmée et une source de stock fournie par WOOD.
- `products: []`, `stock: null` et `prices: null` sont obligatoires tant que la
  propriétaire n'a pas confirmé la différence entre les deux adresses.
- La page publique garde les deux adresses, les horaires « à confirmer » et les
  actions itinéraire/appel ; elle ne prétend pas qu'une référence est présente
  à Barla ou Borriglione.
- La validation finale devra aussi confirmer les textes, les droits photo et
  la fréquence de mise à jour avant toute sélection différenciée.

## Preuve

Le manifeste `2026-11-07-cro-150-store-selections.json` et le test
`test/cro-150-store-selections.test.mjs` vérifient le rattachement et le refus
des données commerciales inventées. Cette préparation ne clôt pas la tâche :
la sélection authentique reste en attente de la propriétaire.
