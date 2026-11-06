# Vérification finale — finition mobile WOOD

Date : 6 novembre 2026

## Périmètre

Cette vérification porte sur la démo publique WOOD, avec une couche mobile dédiée
qui conserve le même HTML, les mêmes séquences éditoriales et les mêmes contenus
que le bureau. Elle ajoute seulement la composition tactile nécessaire : rails
scrollables, indices de progression, CTA plus compacts, zone sûre et barre basse
directionnelle.

## Contrôles locaux

La page locale `index.html` a été vérifiée dans Chromium avec la barre mobile,
les rails, les cartes, les avis Google et les ancres.

| Largeur | Overflow racine | Hauteur observée | Contrôles complémentaires |
| ---: | :---: | ---: | --- |
| 360 px | non | 19 462 px | univers et services en une colonne, aucun contrôle < 44 px |
| 375 px | non | 18 176 px | rails tactiles et navigation basse vérifiés |
| 390 px | non | 17 969 px | 7 indices de rail, runway en défilement horizontal |
| 430 px | non | 17 812 px | composition compacte sans débordement |
| 1440 px | non | 16 186 px | grille desktop conservée, 4 cartes visibles |

Les vérifications comportementales confirment aussi :

- la barre basse se masque à la descente et revient au sommet, à la remontée ou
  lors d’un focus clavier ;
- les rails affichent une indication seulement quand plusieurs éléments sont
  réellement accessibles ;
- les avis changent automatiquement en fondu, sans flèches, sans compteur et
  avec un lien source Google ;
- `prefers-reduced-motion` désactive les animations et conserve la navigation ;
- la console navigateur ne produit aucune erreur ni avertissement sur mobile ;
- les images et les contrôles restent utilisables avec clavier et toucher.

Après publication, `https://rapt0r06300.github.io/CBD-WOOD/demo/` répond en
HTTP 200 et les deux assets `wood-mobile-finish.css` et
`wood-mobile-finish.js` répondent eux aussi en HTTP 200. Le HTML public charge
bien ces deux fichiers, ne montre plus le switch Base/Démo en en-tête et la
section d’avis ne contient ni bouton de sélection ni compteur d’avis.

## Contrôles automatisés

- `node --test test/mobile-finish-contract.test.mjs` : 4/4.
- `npm run check:js` : OK, 174 fichiers JavaScript.
- `npm run audit` : OK.
- `npm run readiness` : OK, 12 pages, 436 références, 35 ancres.
- `npm test -- --test-reporter=dot` : 354/354.

Les contrats historiques réconciliés dans cette passe couvrent également le
switch GitHub Pages, l’état de preuve Google, les versions d’assets, les fiches
produit, la page résines et le chemin d’artefact Pages actuel.

## Limites externes restantes

La démo reste une maquette WOOD : les photos propriétaires, prix, stocks,
promotions, paiements, données laboratoire et validation finale de la
propriétaire restent séparés du code. Les avis affichés sont des extraits
publics de la fiche Google, cités avec leur établissement, leur date et le lien
source ; ils devront être revalidés avant publication commerciale définitive.
