# Rationalisation CSS — 7 novembre 2026

## Ordre canonique

Les pages publiques chargent les couches dans cet ordre :

1. `responsive.css` — garde-fous de largeur, images et points de rupture communs ;
2. `mobile.css` — shell mobile, navigation basse et cibles tactiles ;
3. `wood-graffiti.css` — décor optionnel, sans information critique ;
4. `wood-editorial.css` — scènes, cartes éditoriales et preuves démo ;
5. `wood-motion.css` — mouvement, rails et retours d'action ;
6. `wood-mobile-finish.css` — reflow mobile final, rails tactiles et safe areas.

Les feuilles catalogue et boutique viennent ensuite uniquement sur les pages qui
en ont besoin. Elles ne remplacent pas les garde-fous communs.

## Nettoyage effectué

- la règle `.wood-graffiti` est regroupée en une seule définition ;
- la déclaration `aria-hidden` invalide a été retirée du CSS : l'accessibilité
  décorative est portée par l'attribut HTML `aria-hidden="true"` ;
- aucune règle commerciale, prix, stock, bouton ou formulaire n'est décorée par
  le pack graffiti ;
- `wood-motion.css` conserve ses replis `prefers-reduced-motion` ;
- `wood-mobile-finish.css` reste la couche de reflow terminale pour les petits
  écrans, sans modifier le contrat desktop.

Les variantes `.wood-reveal` et `.wood-reveal-v2` restent séparées : elles
correspondent à deux contrats de compatibilité déjà utilisés par la démo. Elles
ne sont pas fusionnées sans capture avant/après et revue visuelle.

## Résultat

Le test `test/css-rationalisation.test.mjs` vérifie l'ordre canonique, l'absence
de déclaration CSS invalide et la présence des replis motion/mobile. La matrice
viewport locale reste à 60/60 après ce nettoyage ; aucun changement de contenu,
de prix ou de données propriétaire n'a été introduit.
