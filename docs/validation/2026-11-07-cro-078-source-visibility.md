# CRO-078 — Visibilité de la source d’information

Statut : **contrôle local validé pour la démo ; publication de preuve `pending`**.

## État visible

Les fiches `fleur.html` et `produit.html` conservent une zone de preuve
identifiable. Tant qu’aucun document vérifié n’est fourni, elles affichent
« Aucune source vérifiée à afficher » et « Source à fournir ». Aucun badge
« lab tested » ou résultat de laboratoire n’est publié.

## Porte de publication

Une preuve ne pourra être affichée qu’après réception d’un document vérifié
relié au produit ou au lot concerné, avec sa date et une source consultable.
Un COA générique, un résultat sans lot ou une URL non attribuée ne suffit pas.
La validation WOOD et, si nécessaire, la revue juridique restent nécessaires
avant toute publication commerciale.

## Vérification

- `test/cro-078-source-visibility.test.mjs`
- `test/cro-015-local-proof.test.mjs`
- `npm run check`

