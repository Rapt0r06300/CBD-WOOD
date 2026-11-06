# WOOD — matrice locale des moteurs navigateur

Date de vérification : 2026-11-05

Cette preuve couvre les moteurs locaux disponibles via Playwright CLI. Elle ne remplace pas une recette sur les appareils physiques de la propriétaire.

## Parcours vérifiés

Les quatre routes critiques suivantes ont été ouvertes avec Firefox et WebKit à 390 × 844 px :

- `/index.html` — accueil WOOD et premier écran ;
- `/fleurs.html` — catalogue et grille ;
- `/fleur.html?produit=fleurs-nimbus-3000` — fiche fleur, grammages et achat ;
- `/checkout.html` — récapitulatif de livraison.

Résultat : aucune `console.error`, aucune `pageerror` et navigation terminée sur chaque route dans les deux moteurs.

## Mesure de débordement

Sur l’accueil, Firefox et WebKit ont chacun renvoyé :

```text
innerWidth: 390
documentWidth: 390
bodyWidth: 390
```

La même page a également été relue à 1440 × 900 px ; les captures locales montrent le header, le hero, les boutons et l’illustration WOOD sans recouvrement.

Captures générées par la session locale :

- `.playwright-cli/page-2026-11-05T20-33-29-862Z.png` — Firefox, accueil mobile ;
- `.playwright-cli/page-2026-11-05T20-33-56-301Z.png` — WebKit, accueil mobile ;
- `.playwright-cli/page-2026-11-05T20-36-11-031Z.png` — Firefox, accueil desktop ;
- `.playwright-cli/page-2026-11-05T20-36-13-570Z.png` — WebKit, accueil desktop.

## Limites explicites

- Safari iOS/macOS installé sur un appareil réel, Firefox physique, clavier système, safe-area réelle et réseau mobile restent à valider ;
- les identifiants de production, Gmail, Viva Wallet, domaine, DNS, Hostinger et restauration distante restent hors de cette preuve ;
- aucune modification de données Supabase n’a été effectuée pendant cette vérification.
