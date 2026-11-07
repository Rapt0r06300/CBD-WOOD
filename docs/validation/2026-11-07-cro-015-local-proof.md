# CRO-015 — Disponibilité de la preuve locale du hero

Date : 7 novembre 2026  
Périmètre : site de démonstration WOOD uniquement.

## Contrôle

- Le hero de `index.html` affiche une composition locale explicitement marquée
  `SCÈNE HERO · PHOTO DÉMO` et son alternative textuelle indique qu'il s'agit
  d'une démonstration WOOD.
- Le hero ne porte aucune note, promesse de laboratoire, stock, livraison ou
  autre preuve commerciale non sourcée.
- Les CTA renvoient vers les univers ou vers `#boutique`, sans présenter la
  scène démo comme une photo réelle de la boutique.
- Les coordonnées locales sont regroupées dans la section boutique et dans
  `rendez-vous.html`, où les deux adresses sont textuelles et les visuels de
  lieu restent marqués `PHOTO BOUTIQUE À REMPLACER`.

## Verdict

La preuve locale disponible est suffisante pour la démo : une scène neutre et
traçable est visible, tandis que les photos réelles et toute preuve commerciale
restent séparées jusqu'à réception d'une source et d'une autorisation WOOD.

Contrat : `test/cro-015-local-proof.test.mjs`.
