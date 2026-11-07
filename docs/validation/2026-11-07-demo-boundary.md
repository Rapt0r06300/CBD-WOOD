# WOOD — frontière de la démo

Date de vérification : 7 novembre 2026

## Règle

Tout chemin servi sous `/demo/` reste une simulation locale. Les commandes, paiements, comptes, e-mails, newsletter, appels téléphoniques et liens mailto sont neutralisés par `demo-mode.js`. Le panier reste conceptuel et local.

## Contrôles réalisés

- `order-api.js` refuse `createPendingOrder` avant toute configuration, import dynamique ou requête réseau.
- `checkout.html` expose l’avertissement de simulation et ne collecte pas de coordonnées en mode démo : le script retire `required`, désactive les contrôles et bloque la soumission en capture.
- `compte.html` est également neutralisé en démo ; aucun client Supabase n’est créé par `account.js`.
- Les pages de catalogue ne lisent pas Supabase en démo par défaut ; l’adaptateur D1 est désactivé sauf configuration explicite.
- Le générateur GitHub Pages injecte les deux garde-fous dans chaque page HTML de `demo/` sans modifier la version de base.
- Les tests `test/demo-order-isolation.test.mjs` couvrent le refus avant réseau, les formulaires, les liens externes et l’injection de build.

## Limites conservées

- Les appels Supabase, Gmail, Viva et Cloudflare de production restent hors périmètre de cette démo.
- Aucune clé, aucun secret et aucune validation commerciale ne sont ajoutés.
