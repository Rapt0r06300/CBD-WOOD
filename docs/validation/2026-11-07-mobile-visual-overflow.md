# Vérification mobile — limites visuelles et rails tactiles

## Objectif

Empêcher les animations d’entrée et les graffitis décoratifs de contribuer à
la largeur horizontale de la page sur téléphone, tout en conservant le
défilement tactile local des rails éditoriaux.

## Correctif livré

- Les révélations gauche/droite deviennent verticales sous 800 px ; leur
  entrée ne pousse plus le contenu hors de la fenêtre.
- Trois graffitis qui dépassaient volontairement leur carte sont ré-ancrés à
  `right: 0` sur mobile.
- Le shell `main` coupe la largeur hors cadre avec `overflow-x: clip` ; les
  rails descendants gardent leur propre `overflow-x: auto`.
- Le contrat est couvert par `test/mobile-visual-overflow.test.mjs`.

## Vérification locale

- `node --test test/mobile-visual-overflow.test.mjs` : **1/1**.
- `npm run check` : **581/581 tests**, syntaxe JavaScript OK, audit statique
  OK, readiness OK (12 pages, 540 références, 35 ancres) et continuité OK.

## Vérification publique

Recette Chromium à 390 × 844 px après publication de `gh-pages` :

- 12 routes contrôlées : `/demo/index.html`, `wood-shop.html`, `fleurs.html`,
  `resines.html`, `bien-etre.html`, `fleur.html`, `produit.html`, `compte.html`,
  `checkout.html`, `contact.html`, `confirmation.html` et `404.html`.
- Toutes répondent en HTTP 200, avec un élément `main` présent.
- Console : **0 erreur, 0 avertissement** sur chaque route.
- Sur l’accueil, `scrollWidth` racine = `clientWidth` = **375 px** ; le corps
  reste contenu dans la fenêtre après le cache-bust du paquet.
- Les rails éditoriaux restent locaux et n’introduisent pas de débordement de
  page visible.

Publication : commit `837cca4` sur `gh-pages` pour la première passe ; le
correctif final `main` est publié dans le commit suivant. La racine de
sauvegarde `/` reste isolée de `/demo/`.

Cette finition améliore une zone déjà validée et ne modifie pas le compteur :
**347 / 347 — 100 %**. Les portes externes retirées et les tâches différées
restent séparées de la feuille active dans leurs registres dédiés.
