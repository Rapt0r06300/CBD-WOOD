# TXW-088 — Texte système agrandi

Date : 7 novembre 2026
Périmètre : site de démonstration WOOD uniquement.
Méthode : Chromium local, taille racine simulée à 125 %, 150 % et 200 %,
avec reflow contrôlé sur l'accueil et la page rendez-vous.

## Résultats

| Route | Vue | Taille simulée | `scrollWidth` / viewport | Texte coupé ou chevauché |
|---|---:|---:|---:|---:|
| Accueil | 390 × 844 | 125 % | 390 / 390 | 0 |
| Accueil | 390 × 844 | 150 % | 390 / 390 | 0 |
| Accueil | 390 × 844 | 200 % | 390 / 390 | 0 |
| Accueil | 1440 × 900 | 200 % | 1440 / 1440 | 0 |
| Rendez-vous | 390 × 844 | 200 % | 390 / 390 | 0 |

La vérification mesure l'overflow horizontal global, le `line-height` rendu et les éléments textuels
dont le contenu serait masqué par un conteneur à overflow non visible. Les
cartes « Pourquoi WOOD » passent en colonne sous 430 px afin de conserver une
largeur de lecture suffisante lorsque le texte est agrandi. Les rails restent
des zones horizontales autonomes et ne créent pas de défilement global.
Les états inspectés ne montrent aucun chevauchement.

Captures conservées dans `output/playwright/` :

- `txw088-home-390-text-125.png`
- `txw088-home-390-text-200.png`
- `txw088-rendez-vous-390-text-200.png`

## Limite honnête

Cette preuve couvre la taille de texte simulée en Chromium local. Elle ne
remplace pas une vérification Dynamic Type / taille de texte système sur
iPhone ou Android réel ; cette validation appareil reste une étape externe.

Contrat : `test/txw-088-text-scaling.test.mjs`.
