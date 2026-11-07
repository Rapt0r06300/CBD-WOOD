# CRO-147 — Visite photographique WOOD

## Statut

`PARTIAL / demo-fallback` — séquence locale ajoutée le 7 novembre 2026

La page `rendez-vous.html` possède une séquence de trois images pour faire
comprendre l'arrivée, le détail et le gros plan. Chaque scène est une image de
démonstration locale, accompagnée de la mention `PHOTO DÉMO · À REMPLACER`.

## Garde-fous

- Les trois images ne sont pas présentées comme des photos réelles de boutique.
- Les futures photos devront fournir source, droits, établissement représenté,
  personnes visibles et texte alternatif avant remplacement.
- Le parcours garde un fallback statique : aucune animation ou galerie externe
  n'est nécessaire pour comprendre la visite.
- Les boutons itinéraire/appel restent séparés de la séquence photo et aucune
  disponibilité produit n'est déduite des images.

## Preuve

`test/cro-147-visit-tour.test.mjs` vérifie les trois scènes, leurs labels,
leurs assets et le reflow mobile. La tâche reste ouverte jusqu'à réception et
validation des photos authentiques et de leurs droits.
