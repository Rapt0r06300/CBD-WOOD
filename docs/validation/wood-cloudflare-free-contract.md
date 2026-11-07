# WOOD — contrat de non-facturation Cloudflare

Date de vérification : 7 novembre 2026
Périmètre : prototype catalogue D1 en mode démo, aucune opération distante exécutée.

## Sources officielles consultées

- [Cloudflare D1 — Pricing](https://developers.cloudflare.com/d1/platform/pricing/)
- [Cloudflare D1 — Limits](https://developers.cloudflare.com/d1/platform/limits/)
- [Cloudflare Workers — Pricing](https://developers.cloudflare.com/workers/platform/pricing/)
- [Cloudflare Workers — Limits](https://developers.cloudflare.com/workers/platform/limits/)

## Constats utiles au prototype

- Workers Free inclut 100 000 requêtes par jour et 10 ms de CPU par requête.
- D1 Free inclut 5 millions de lignes lues par jour, 100 000 lignes écrites par jour et 5 Go de stockage total selon la page de tarification.
- La limite D1 Free indiquée par la page des limites est de 10 bases par compte, 500 Mo par base et 50 sous-requêtes D1 par invocation Worker.
- Le plan Workers Paid est facturé au minimum 5 USD par mois ; aucune bascule vers ce plan n'est autorisée par cette feuille de route démo.

## Règle fail-closed WOOD

1. Ne jamais lancer `wrangler deploy`, `wrangler d1 create`, `wrangler d1 migrations apply` ou une commande distante depuis le parcours de validation local.
2. Ne jamais renseigner `database_id`, secret, domaine payant ou identifiant de compte dans le dépôt démo.
3. Toute limite dépassée doit produire un échec explicite côté Worker et conserver le fallback catalogue local côté navigateur.
4. Toute opération distante exige une authentification Cloudflare explicite et une confirmation séparée de l'offre gratuite à 0 €.
5. Tant que cette confirmation n'existe pas, D1-005 et D1-016 à D1-020 restent `BLOCKED-EXTERNAL`.

## Preuve locale

Le Worker local limite `limit` à 50, utilise des requêtes préparées, renvoie `Cache-Control: public, max-age=60` pour les lectures réussies et répond `503` avec `fallback: local` si D1 est absent ou indisponible. Les tests associés sont dans `test/wood-d1-worker.test.mjs`.
