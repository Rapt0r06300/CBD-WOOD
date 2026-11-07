# Galerie fleur mobile — 7 novembre 2026

La fiche fleur possède maintenant deux gestes complémentaires :

- appui sur la grande image ou activation clavier pour passer à la vue
  suivante ;
- balayage horizontal tactile de plus de 42 px pour passer à la vue suivante
  ou précédente.

La zone conserve `touch-action: pan-y` : un geste vertical continue de faire
défiler la page et ne devient pas un faux carrousel horizontal. Le libellé
`Vue 1 / 2` ou `Vue 2 / 2` est mis à jour dans une zone `aria-live`, les deux
images restent munies d'alternatives textuelles et le focus visible reste
disponible au clavier. Le repli `prefers-reduced-motion` supprime les
transitions de zoom sans supprimer le geste ni le bouton.

La vérification locale couvre le rendu mobile, l'activation clavier, le
balayage pointer/touch simulé et le mode reduced-motion. Les essais physiques
iOS/Android restent à confirmer avant publication commerciale.

Contrat : `test/flower-touch-gallery.test.mjs`.
