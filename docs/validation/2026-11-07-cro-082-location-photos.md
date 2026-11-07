# CRO-082 — Photos de localisation vérifiées

Statut : **préparé localement ; `BLOCKED-EXTERNAL` pour la clôture**.

## Ce qui est livré dans la démo

La page `rendez-vous.html` possède maintenant un slot distinct pour `barla` et
`borriglione`. Chaque slot conserve le cadrage attendu — angle d’arrivée et
enseigne lisible —, un état `pending`, un fallback graphique sans photo réelle
et une légende indiquant qu’une photo de remplacement autorisée est attendue.
Le fallback ne prétend pas représenter une façade.

## Ce qui manque pour valider la tâche

L’image correcte de chaque établissement, son fichier source, les droits de
publication et l’accord WOOD ne sont pas présents dans le dépôt de démo. Les
photos transmises dans la conversation ne sont donc pas copiées ni publiées
automatiquement. La tâche reste ouverte jusqu’à réception et validation de ces
éléments.

## Vérification

- `test/cro-082-location-photos.test.mjs`
- `rendez-vous.html`
- `wood-visit.css`

