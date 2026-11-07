# CRO-096 — Frontière base / démo

La racine GitHub Pages sert le paquet de base issu de `origin/main`. Le chemin
`/demo/` reçoit les garde-fous `demo-mode.js` et `wood-d1-adapter.js` ; aucun de
ces scripts n'est injecté dans la racine. Le paquet est construit par une liste
explicite, puis vérifié avant publication.

La preuve locale est `test/cro-096-demo-boundary.test.mjs`, complétée par
`npm run verify:pages-package` et `scripts/verify-github-pages-live.mjs` après
publication. Les deux routes restent distinctes ; la démo interdit formulaires,
commandes, téléphone et e-mail réels, tandis que la base n'est pas contaminée
par le verrouillage démo.
