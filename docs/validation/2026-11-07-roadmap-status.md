# État sincère de la feuille de route — 7 novembre 2026

## Compteur réconcilié

Au commit `197b485`, l'inventaire source contient 371 tickets actifs :

- **249** cases `[x]` traçables avant ce ticket ;
- **115** cases `[ ]` encore ouvertes après le marquage de CRO-010 et CRO-011 ;
- **138** tâches différées conservées hors exécution active ;
- **509** tâches dans l'inventaire global.

Le compteur global vérifié après ces deux tickets était **256 / 509 — 50,29 %**.
Les deux validations précédemment présentes dans le ledger mais non rattachées
à une case ou à un identifiant de la feuille ne sont pas comptées. Elles restent
à réconcilier avant toute nouvelle progression créditée.

Le lot navigation/rythme `CRO-024`, `CRO-025`, `CRO-027` à `CRO-032` est
maintenant vérifié par `docs/validation/2026-11-07-cro-navigation-and-rhythm.md`
et son contrat automatisé. Le compteur courant est donc **264 / 509 — 51,87 %**,
avec **107** tickets actifs encore ouverts et **138 tâches différées**.

Le lot récit d’accueil `CRO-012`, `CRO-017`, `CRO-019` et `CRO-021` à
`CRO-023` est maintenant vérifié par `docs/validation/2026-11-07-cro-home-narrative.md`
et son contrat automatisé. Le compteur courant devient **270 / 509 — 53,05 %**,
avec **101** tickets actifs encore ouverts et **138 tâches différées**.

Le repli du hero `CRO-016` est livré et testé par
`docs/validation/2026-11-07-cro-hero-fallback.md`. Le compteur courant devient
**271 / 509 — 53,24 %**, avec **100** tickets actifs encore ouverts et
**138 tâches différées**.

Le lot démo `CRO-013`, `CRO-020`, `CRO-026`, `CRO-058`, `CRO-059`, `CRO-061`
et `CRO-129` est livré et vérifié par
`docs/validation/2026-11-07-cro-demo-detail-batch.md`. Le compteur courant devient
**278 / 509 — 54,62 %**, avec **93** tickets actifs encore ouverts et
**138 tâches différées**.

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
