# Conseiller mobile — dégagement de la navigation basse

## Problème reproduit

À 390 × 844 px, le défilement vers le bas ajoute `wood-nav-hidden` au `body`
et masque la navigation basse. Le conseiller restait toutefois à `86px` du
bas, l’écart prévu pour cette navigation : il flottait inutilement au-dessus
du contenu éditorial.

## Correctif

`wood-advisor.css` conserve l’écart de `86px` lorsque la navigation est
visible, puis passe à `18px` lorsque `body.wood-nav-hidden` est actif. La
transition de `bottom` accompagne le mouvement sans changer la position fixe
du conseiller ni son accès clavier.

## Preuve

- Test de contrat : `test/advisor-mobile-clearance.test.mjs`.
- Recette locale sur le paquet `.github-pages/demo/`, viewport 390 × 844 :
  `wood-nav-hidden = true`, `getComputedStyle(.wood-advisor).bottom = 18px`.
- Capture de contrôle : `output/playwright/local-advisor-clearance-later.png`.
- Suite complète après le correctif : **580/580 tests**, syntaxe JavaScript OK,
  audit statique OK, readiness OK et continuité OK.

Cette finition ne clôture aucune porte externe et ne modifie pas le compteur
global, qui reste **347 / 509 — 68,17 %**.

## Publication démo

- Le paquet `/demo/` a été publié sur la branche `gh-pages` avec le commit
  `19f565a` ; la racine de sauvegarde n’a pas été modifiée.
- Après propagation, le fichier public `demo/wood-advisor.css` contient bien
  la règle de dégagement. La recette navigateur publique à 390 × 844 px,
  effectuée avec un cache-bust du CSS pour neutraliser le cache CDN, confirme
  `wood-nav-hidden = true` et `bottom = 18px`.
- La console publique reste à zéro erreur et zéro avertissement sur cette
  recette.
