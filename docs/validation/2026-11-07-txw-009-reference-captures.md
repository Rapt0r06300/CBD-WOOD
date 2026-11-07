# TXW-009 — Captures de référence visuelle

Date : 7 novembre 2026  
Périmètre : site de démonstration WOOD uniquement.  
Commit de référence : `17a3c42`.

## Matrice

Chaque route a été ouverte localement avec Chromium Playwright en capture
pleine page aux deux largeurs de comparaison : `390 × 844` et `1440 × 900`.
Les captures sont conservées dans `output/playwright/` et portent le préfixe
`txw009-`.

| Route | Mobile | Desktop |
|---|---|---|
| `index.html` | `txw009-home-390.png` | `txw009-home-1440.png` |
| `fleurs.html` | `txw009-fleurs-390.png` | `txw009-fleurs-1440.png` |
| `resines.html` | `txw009-resines-390.png` | `txw009-resines-1440.png` |
| `bien-etre.html` | `txw009-bien-etre-390.png` | `txw009-bien-etre-1440.png` |
| `wood-shop.html` | `txw009-wood-shop-390.png` | `txw009-wood-shop-1440.png` |
| `fleur.html` | `txw009-fleur-390.png` | `txw009-fleur-1440.png` |
| `produit.html` | `txw009-produit-390.png` | `txw009-produit-1440.png` |
| `compte.html` | `txw009-compte-390.png` | `txw009-compte-1440.png` |
| `checkout.html` | `txw009-checkout-390.png` | `txw009-checkout-1440.png` |
| `contact.html` | `txw009-contact-390.png` | `txw009-contact-1440.png` |
| `confirmation.html` | `txw009-confirmation-390.png` | `txw009-confirmation-1440.png` |
| `404.html` | `txw009-404-390.png` | `txw009-404-1440.png` |
| `rendez-vous.html` | `txw009-rendez-vous-390.png` | `txw009-rendez-vous-1440.png` |

États complémentaires :

- `txw009-home-menu-open-390.png` : menu mobile ouvert après activation
  explicite du bouton hamburger ;
- `txw009-checkout-empty-390.png` : checkout avec panier local vide, sans
  commande ni paiement ;
- le menu fermé est l'état initial de chaque route, avant action.

## Limites honnêtes

Cette matrice est une baseline locale répétable, pas une certification Safari
iOS, Android réel, Firefox ou appareil physique. Les captures ne contiennent
aucune donnée client, commande réelle, paiement ou e-mail envoyé.
