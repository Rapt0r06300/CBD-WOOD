# Repères de maquette — 7 novembre 2026

La page d’accueil et les cartes catalogue utilisent désormais `MAQUETTE WOOD`
comme repère court pour les médias de démonstration. La mention plus explicite
`SCÈNE HERO · PHOTO DÉMO` reste une fois dans le hero afin que le statut de la
démo soit impossible à confondre avec une photo commerciale.

## Vérification

- `index.html` : 22 repères courts `MAQUETTE WOOD`, une seule mention visible
  `PHOTO DÉMO` dans le hero.
- `storefront.js` : les cartes de catalogue utilisent le même repère court.
- Les textes alternatifs restent descriptifs et indiquent la démonstration ;
  cette passe ne transforme aucun visuel en photo approuvée.
- Les messages de disponibilité, de prix et d’horaires à confirmer restent
  inchangés car ils portent une information commerciale réelle et prudente.
- Contrat automatisé : `test/demo-labels.test.mjs`.
