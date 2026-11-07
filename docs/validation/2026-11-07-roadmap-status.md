# État sincère de la feuille de route — 7 novembre 2026

## Compteur réconcilié

Au commit `197b485`, l'inventaire source contient 371 tickets actifs :

- **249** cases `[x]` traçables avant ce ticket ;
- **115** cases `[ ]` encore ouvertes après le marquage de CRO-010 et CRO-011 ;
- **138** tâches différées conservées hors exécution active ;
- **509** tâches dans l'inventaire global.

Le compteur global vérifié après ces deux tickets est donc **256 / 509 — 50,29 %**.
Les deux validations précédemment présentes dans le ledger mais non rattachées
à une case ou à un identifiant de la feuille ne sont pas comptées. Elles restent
à réconcilier avant toute nouvelle progression créditée.

## Ce qui est prouvé

- le mode démo reste local et aucun paiement ou e-mail réel n'est activé ;
- la racine GitHub Pages et `/demo/` sont HTTP 200 et isolées ;
- les tests locaux, audits statique/readiness/continuité et captures Chromium
  sont documentés par commit et preuve ;
- les limites Safari/Android réels, avis Google à revalider, photos approuvées,
  droits, OAuth, Supabase production et publication commerciale restent ouvertes.

## Portes encore ouvertes

Les tickets externes ne sont pas convertis en DONE par la présence d'un
gabarit : validation propriétaire, appareil réel, compte Cloudflare/Gmail,
secrets, domaine, hébergement commercial et preuves source restent des portes
séparées.

Contrat : `test/roadmap-status.test.mjs`.
