# CRO-054 — Variantes de recadrage responsive

Date : 7 novembre 2026  
Périmètre : site de démonstration WOOD uniquement.

## Livré

- Le brief photo fixe les formats `1:1` pour les cartes, `4:5` pour les fiches
  mobiles et `3:2`/`4:5` pour les fiches desktop.
- `wood-photo-crops.css` fournit des cadres réutilisables
  `wood-photo-crop--square`, `wood-photo-crop--portrait` et
  `wood-photo-crop--landscape`.
- Chaque cadre porte sa propre variable `--wood-photo-position` ; le mobile
  portrait dispose d'un repli `50% 42%` sans ancrage au viewport.
- Les règles sont chargées par l'accueil et les pages catalogue. Les prix,
  boutons, noms et statuts restent dans le HTML voisin et ne sont jamais
  intégrés à l'image recadrée.

## Recette

La matrice de conception couvre `320`, `375`, `390` et `430 px`. La zone sûre
conserve 8 % de marge autour du sujet essentiel. Les visuels de démonstration
restent centrés par défaut ; aucune photo réelle, étiquette ou logo propriétaire
n'est inventé pour valider un cadrage qui nécessiterait l'accord de WOOD.

Contrat : `test/cro-054-responsive-crops.test.mjs`.
