# CRO-112 — Parcours sans animation et réseau dégradé

## Périmètre vérifié

Le mode démo conserve le HTML local comme source de continuité. Les améliorations
ne rendent pas le catalogue dépendant d'une API distante : l'adaptateur D1 est
opt-in, limite ses lectures à `GET` et renvoie `null` en cas de panne, ce qui
laisse les cartes pré-rendues en place.

Le contrat local couvre les cinq situations demandées :

1. `prefers-reduced-motion: reduce` rend immédiatement les révélations, le
   hero et les feedbacks non essentiels, sans retirer les liens ni les actions ;
2. `navigator.connection.saveData`, `2g` et `slow-2g` activent `wood-low-data`
   et coupent les mouvements décoratifs coûteux ;
3. un cache froid conserve un hero local avec dimensions explicites et un
   contenu HTML utilisable avant l'amélioration JavaScript ;
4. une image produit qui échoue reçoit le visuel botanique WOOD de repli, un
   alt explicite et la classe de fallback ;
5. une indisponibilité D1 renvoie au catalogue local, sans message de succès
   inventé ni tentative de mutation.

## Preuves

- `test/cro-112-resilience.test.mjs` vérifie les contrats de mouvement, média,
  D1 et parcours direct ;
- `test/wood-d1-adapter.test.mjs` vérifie le retour `null` sur lecture en échec ;
- `test/cro-hero-fallback.test.mjs` vérifie le repli du hero ;
- `test/wood-mobile-motion-contract.test.mjs` vérifie le comportement tactile,
  reduced-motion et faible donnée.

## Limites

Le cache froid, l'image cassée et l'API indisponible sont contrôlés par contrat
local et par la suite Chromium. La validation sur appareil physique, VoiceOver,
NVDA et réseaux opérateurs reste une étape externe et n'est pas déclarée comme
terminée ici.
