# Périmètre actif recalculé — feuille WOOD

## Décision

Les 24 portes qui nécessitent une validation propriétaire, un appareil physique
ou un compte externe ne font plus partie de la feuille de tâches active. Elles
sont conservées sans perte dans `docs/validation/2026-11-07-external-gates.md`
pour être réintroduites uniquement avec une preuve nouvelle.

## Recalcul vérifié

- Feuille active avant retrait : 371 tickets.
- Portes externes retirées : 24 tickets.
- Feuille active actuelle : 347 tickets.
- Tickets actifs validés : 347.
- Tâches différées conservées : 138.
- Total suivi par la feuille actuelle : 485 tickets.
- Avancement global actuel : **347 / 485 — 71,55 %**.

Le compteur est calculé à partir des cases réellement présentes dans la feuille
active et des 138 tâches différées conservées dans l'inventaire ; les 24 portes
externes sont hors dénominateur. Les tests `test/roadmap-status.test.mjs`,
`test/external-gates.test.mjs` et `test/deferred-register.test.mjs` vérifient
347 lignes actives, 347 cases cochées, aucune case ouverte et les 138 cases de
l'archive.
