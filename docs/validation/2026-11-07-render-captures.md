# Captures de rendu responsive — 7 novembre 2026

## Lot local

Un lot de **24 vues** a été généré avec Chromium local : les **12 pages** du
paquet public (`404`, accueil, catalogues, fiches, compte, checkout,
confirmation et contact), chacune en :

- mobile `390×844` ;
- desktop `1440×900`.

Les fichiers sont conservés dans :

`.superpowers/sdd/CBD_WOOD_FEUILLE_DE_ROUTE_INTEGRALE_509_TACHES_2026-11-07/artifacts/txw-117/`

Le nom contient la route et le viewport, par exemple
`index--mobile-390x844.jpg` et `index--desktop-1440x900.jpg`.

## Contrôles

- le rendu mobile et desktop est non vide ;
- la navigation et les contenus démo restent présents ;
- aucun paiement réel, envoi d'e-mail ou écriture distante n'est déclenché ;
- le paquet reste distinct entre base et démo.

## Limites honnêtes

Ce lot est une preuve Chromium locale. Safari iOS réel, Chrome Android réel,
Firefox réel, encoche, barres système et clavier virtuel restent à contrôler
sur appareils dédiés ; ils ne sont pas marqués comme validés ici.

Contrat : `test/render-captures.test.mjs`.
