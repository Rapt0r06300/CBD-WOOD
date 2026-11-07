# Validation — lot démo éditorial, boutique et fiche — 7 novembre 2026

## Périmètre

Ce lot approfondit la démo locale sans modifier la version de base en une offre
commerciale réelle :

- deux compositions d'accueil hors ligne via `?wood-variant=a` et
  `?wood-variant=b`, sans cookie, analytics, collecte ou prix promotionnel ;
- trois transitions narratives entre univers, sélection, mood et boutique ;
- séparation de WOOD Shop en familles `TEXTILE WOOD` et `OBJETS & ACCESSOIRES` ;
- grille de faits, aspect démonstratif et FAQ contextuelle sur les fiches fleurs ;
- entrée animée graffiti → cloche, avec déclenchement au scroll/toucher et repli
  statique pour reduced-motion, faible donnée ou absence d'IntersectionObserver.

## Preuves automatisées

- `node --test test/cro-demo-detail-batch.test.mjs` : **6/6** ;
- 1440 × 900 : trois transitions présentes, classe `wood-cloche-reveal`
  observée, aucun débordement horizontal ;
- 390 × 844 : trois transitions présentes, largeur de hero égale à 390 px,
  aucun débordement ; après défilement dans le hero, la révélation est activée ;
- `fleur.html?produit=fleurs-nimbus-3000` : trois faits, zone d'aspect et FAQ,
  aucun débordement ;
- `wood-shop.html` : deux familles, trois cartes, aucun débordement.

## Captures de revue propriétaire

- [variante A — mobile 390](cro-home-variants/variant-a-390.png)
- [variante B — mobile 390](cro-home-variants/variant-b-390.png)
- [variante A — desktop 1440](cro-home-variants/variant-a-1440.png)
- [variante B — desktop 1440](cro-home-variants/variant-b-1440.png)

La grille de choix et les critères de revue sont dans
`docs/design/cro-home-variants.md`. Le choix artistique final reste à la
propriétaire ; la démo publique garde par défaut la composition B / drop.

## Limites maintenues

Aucun paiement, e-mail commercial, stock réel, avis inventé, résultat de
laboratoire ou photo propriétaire n'est activé par ce lot. Les textes et
visuels marqués démo restent remplaçables par des éléments WOOD autorisés.
