# Revue de la fiche fleur — 7 novembre 2026

## Périmètre

La fiche `fleur.html` reste une fiche de démonstration locale. Elle ne transforme
aucun visuel en photographie réelle, ne crée aucune commande et conserve la
validation boutique pour les prix, stocks et informations détaillées.

## Parcours retenu

1. Le nom et la famille sont visibles immédiatement.
2. Le grand visuel de démonstration est affiché avant le choix de grammage.
3. Un appui ou un clic sur le visuel alterne entre la scène principale et une
   seconde vue de détail sous cloche, avec un libellé `Vue 1 / 2` ou `Vue 2 / 2`.
4. Le profil et les grammages disponibles dans la maquette restent lisibles,
   puis les tarifs sont consultables dans un tableau explicitement attribué à la
   carte de démonstration.
5. Le rappel de validation et le retour aux fleurs restent visibles sans sticky
   qui masque l’action sur mobile.

## Contrats vérifiés

- `flower-presentation.js` fournit une seconde vue de démonstration locale avec
  un fallback `wood-jar-detail.webp` lorsque l’asset dédié n’est pas disponible.
- `flower-detail.js` rend les deux images avec des alternatives textuelles,
  un contrôle clavier/tactile et un état `aria-live` pour l’indicateur de vue.
- `boutique.css` réserve la même scène de galerie sur desktop et mobile, avec
  repli tactile et `:focus-visible`.
- `test/product-detail.test.mjs` couvre le toggle, le libellé de seconde vue et
  les garde-fous visuels.

## Limites restantes

La photographie réelle sans contenant, la macro authentique, les textes finaux
et la validation propriétaire restent externes et ne sont pas simulés par cette
fiche.
