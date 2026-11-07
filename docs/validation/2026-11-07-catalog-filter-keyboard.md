# Filtres catalogue — parcours clavier

## Vérification locale

- Page : `fleurs.html`, mode démo local.
- Viewport : 390 × 844 px.
- Ouverture : le bouton `Filtres` expose le panneau et porte
  `aria-expanded="true"`.
- Focus initial : le premier champ `Média` reçoit le focus.
- Application : `Appliquer les filtres` referme le panneau et le retour du
  focus revient au bouton `Filtres`.
- Annulation : `Escape` referme le panneau et restaure le focus sur le même
  bouton.
- Partage : la sélection `demo` conserve `?media=demo` dans l’URL.
- Sans animation : le contrat repose sur l’état et le focus, pas sur une
  transition visuelle.

## Limite connue

La vérification de VoiceOver/NVDA et des appareils physiques reste à faire
hors dépôt ; le comportement accessible est toutefois verrouillé par
`test/catalog-filter-keyboard.test.mjs`.
