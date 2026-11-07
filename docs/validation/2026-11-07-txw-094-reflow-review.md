# TXW-094 — Double revue après reflow

Date : 7 novembre 2026  
Périmètre : site de démonstration WOOD uniquement.  
Référence avant : baseline `TXW-009`, commit `17a3c42`.  
État après : recette locale Chromium sur le code vérifié au commit `a3917e5`.

## Méthode

La revue compare la matrice visuelle de référence avec une nouvelle série de
captures après les contrôles de reflow 200/400 %. Les deux appareils de
comparaison sont représentés par les largeurs CSS `390 × 844` et `1440 × 900`.
Les états à risque sont rejoués explicitement : menu mobile ouvert, panier vide
et pages contenant des textes longs. Les captures sont conservées dans
`output/playwright/` avec le préfixe `txw094-`.

## Captures avant / après

| État contrôlé | Avant | Après |
|---|---|---|
| Accueil mobile | `txw009-home-390.png` | `txw094-after-home-390.png` |
| Accueil desktop | `txw009-home-1440.png` | `txw094-after-home-1440.png` |
| Accueil · menu mobile ouvert | `txw009-home-menu-open-390.png` | `txw094-after-home-menu-open-390.png` |
| Panier vide mobile | `txw009-checkout-empty-390.png` | `txw094-after-checkout-empty-390.png` |
| Page visite mobile | `txw009-rendez-vous-390.png` | `txw094-after-rendez-vous-390.png` |
| Page visite desktop | `txw009-rendez-vous-1440.png` | `txw094-after-rendez-vous-1440.png` |
| Contact · texte long mobile | `txw009-contact-390.png` | `txw094-after-contact-long-390.png` |
| Contact · texte long desktop | `txw009-contact-1440.png` | `txw094-after-contact-long-1440.png` |

## Résultats observés

| Route / état | Largeur | `scrollWidth` | `clientWidth` | Actions visibles |
|---|---:|---:|---:|---:|
| Accueil fermé | 390 | 390 | 390 | 68 |
| Accueil fermé | 1440 | 1440 | 1440 | 70 |
| Accueil menu ouvert | 390 | 390 | 390 | capture inspectée |
| Rendez-vous | 390 | 390 | 390 | 22 |
| Contact texte long | 390 | 390 | 390 | 28 |
| Contact texte long | 1440 | 1440 | 1440 | 31 |

Le document ne présente aucun débordement horizontal sur les états contrôlés.
Les titres fragmentés, les cartes, les boutons, le footer, la navigation basse,
le menu ouvert et l'état panier vide restent dans le flux. Les lignes de texte
longues se replient sans couper les actions. Aucune régression visuelle
bloquante n'a été observée entre les captures avant et après.

## Limites

Cette preuve couvre la recette Chromium locale et ne remplace pas une revue
Safari iOS, Android réel, Firefox, Dynamic Type ou une validation artistique
propriétaire. Aucun paiement, e-mail, compte ou appel fournisseur réel n'est
déclenché par la capture.
