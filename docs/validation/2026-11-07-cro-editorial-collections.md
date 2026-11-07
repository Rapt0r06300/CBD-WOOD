# Validation — collections éditoriales WOOD — 7 novembre 2026

`CRO-143` est couvert par `docs/design/wood-editorial-collections.md` et les
zones existantes `#selection-wood`, `#humeurs` et `#runway`.

La vérification `node --test test/cro-editorial-collections.test.mjs` passe
**1/1**. Les collections restent des regroupements de découverte : aucun prix,
stock, best-seller, remise ou bénéfice n'est déduit de leur nom. Elles
réutilisent les références de la démo et restent remplaçables après validation
de la propriétaire.
