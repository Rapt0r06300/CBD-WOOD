# Validation — module « Pourquoi WOOD ? » — 7 novembre 2026

## Livré

La démo accueille maintenant un module de trois cartes éditoriales :

1. les deux adresses niçoises et le lien vers la boutique ;
2. les univers fleurs, résines et bien-être avec le lien vers la découverte ;
3. l'accueil et l'histoire WOOD avec le lien vers le récit de la maison.

Chaque carte utilise une image de démonstration déjà présente dans le dépôt,
porte une mention explicite de contexte et reste distincte des zones de prix,
stock et achat.

## Vérifications

- `test/cro-why-wood.test.mjs` vérifie la cardinalité de trois preuves, leurs
  ancres et la présence des trois visuels démo.
- Chromium local desktop : 3 cartes, largeur document = largeur viewport,
  aucun débordement.
- Chromium local mobile 390 px : 3 cartes réorganisées en lignes image/texte,
  `grid-template-columns` calculé à une seule colonne, aucun débordement.
- `prefers-reduced-motion` supprime les transitions propres au module.

## Limites

Les photos de lieu, textes propriétaires et éléments commerciaux restent à
valider par WOOD. Ce module ne prétend pas produire un avis client, une note,
une statistique ou une disponibilité en temps réel.
