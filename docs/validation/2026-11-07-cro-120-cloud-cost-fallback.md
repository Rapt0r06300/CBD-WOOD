# CRO-120 — Quotas facturables et fragilité cloud

Statut : validé pour la démo locale, sans activation Cloudflare distante.

## Garde-fous livrés

- Le navigateur garde le catalogue local par défaut ; l’adaptateur ne lit D1
  que lorsque `WOOD_D1_DEMO_ENABLED === true` et qu’une URL explicite existe.
- Le Worker est en lecture seule : `GET`, `HEAD` et `OPTIONS` uniquement ; les
  mutations répondent 405 sans exécution d’écriture.
- La pagination est bornée à 50 éléments par appel, les réponses réussies sont
  cacheables 60 secondes et une absence de D1 renvoie `503` avec
  `fallback: local`.
- Une origine non autorisée est refusée ; aucune clé, `database_id` ou secret
  Cloudflare n’est inclus dans le paquet public ; aucune bascule automatique
  vers une offre payante n’est codée.

## Preuves locales

- `test/wood-d1-adapter.test.mjs` vérifie l’opt-in, l’absence d’appel par défaut,
  les lectures GET bornées et le repli sur `null` en cas d’échec.
- `test/wood-d1-worker.test.mjs` vérifie les méthodes, l’origine, la limite 50,
  le cache et la réponse 503 avec repli local.
- `docs/validation/wood-cloudflare-free-contract.md` conserve les limites,
  l’interdiction d’upgrade automatique et le protocole fail-closed.

## Limites externes maintenues

Les tâches OAuth, vérification de l’offre Free, création D1 distante, migrations
distantes, déploiement Worker et recette API restent `BLOCKED-EXTERNAL`. Il n’y a
pas de déploiement distant, aucune dépense et aucune donnée propriétaire n’ont été
introduits pour clore ce ticket.
