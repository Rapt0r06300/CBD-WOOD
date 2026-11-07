# WOOD — audit responsive de la démo

Date : 7 novembre 2026

## Parcours contrôlé

Les routes `index.html`, `fleurs.html`, `resines.html`, `bien-etre.html`, `wood-shop.html`, `fleur.html`, `contact.html`, `compte.html`, `checkout.html` et `confirmation.html` répondent en HTTP 200 dans le paquet `/demo/` local. Le runtime démo est présent sur les pages générées.

## Mesures navigateur

| Vue | Résultat |
|---|---|
| 390 × 844 | `scrollWidth` 375, aucun débordement horizontal, barre de navigation basse présente |
| 1440 × 900 | `scrollWidth` 1425, aucun débordement horizontal |

Captures locales :

- `output/playwright/demo-home-mobile.png`
- `output/playwright/demo-home-1440.png`
- `output/playwright/demo-checkout-mobile.png`

Le checkout démo vérifié dans le navigateur expose l’avertissement local, désactive les champs, verrouille le mode de réception et remplace le texte de commande par une simulation sans paiement ni e-mail.
