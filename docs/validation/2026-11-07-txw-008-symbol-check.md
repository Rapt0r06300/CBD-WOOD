# TXW-008 — Symbole « ? » dans la scène Studio WOOD

## Statut

`BLOCKED-EXTERNAL` — protection locale ajoutée le 7 novembre 2026

Le fichier `assets/editorial/wood-drop-studio.webp` est présent dans la démo
et la scène possède maintenant un repli lisible. Cela empêche le symbole « ? »
de remplacement du navigateur d'être présenté comme une composition WOOD si
le média échoue à charger.

## Contrôle local

- le WebP local est conservé avec ses dimensions `1672 × 941` ;
- l'image possède un texte alternatif et un emplacement de repli `role=status` ;
- une erreur de chargement ou un décodage sans largeur naturelle révèle le
  repli `SCÈNE STUDIO · REPLI LOCAL` ;
- les accents graffiti restent décoratifs et n'interceptent pas ce repli.

## Vérification iPhone à effectuer

La reproduction du symptôme doit encore être contrôlée sur Safari iOS réel à
100 %, avec cache froid puis cache chaud, réseau lent, rotation et barre Safari
visible. Vérifier le glyphe « ? », le décodage WebP, les SVG voisins, le
chargement de la police et le comportement après retour arrière. La vérification
ne sera pas comptée tant que cette session externe n'est pas consignée.

## Preuve locale

- `test/txw-008-symbol-fallback.test.mjs`
- `npm run check`
