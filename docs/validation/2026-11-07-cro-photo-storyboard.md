# Validation — storyboard photo et répétition produit — 7 novembre 2026

## Lot vérifié

- `CRO-018` : la carte `docs/design/wood-product-repetition-map.md` distingue
  signature, preuve visuelle, sélection, intention et runway ; la reprise d'un
  produit n'est acceptée que si le rôle et la lecture changent. Le runway ne
  reprend pas les quatre références de la sélection principale.
- `CRO-049` : `docs/design/wood-photo-storyboard.md` décrit les besoins hero,
  macro et échelle pour fleurs, résines, textile et soins.
- `CRO-050` : la même fiche fixe la signature sous cloche (verre, reflets,
  fond, lumière, fidélité de couleur) et la seconde vue hors cloche.

## Preuves

- `node --test test/cro-photo-repetition.test.mjs` : **2/2** ;
- `node --test test/home-selection-rhythm.test.mjs test/wood-photo-brief-contract.test.mjs` :
  vérification complémentaire du runway et de la séparation démo/réel ;
- aucune nouvelle photo ou information commerciale n'est publiée par ce lot.

La validation propriétaire des sujets, des droits et des futures prises de vue
reste nécessaire avant tout passage de `demo` à `approved`.
