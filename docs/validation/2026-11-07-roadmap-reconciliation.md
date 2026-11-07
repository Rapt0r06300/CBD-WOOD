# WOOD — réconciliation de la feuille de route 509 tâches

Date : 7 novembre 2026  
Périmètre : dépôt local et démonstration GitHub Pages uniquement.  
Référence : `docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md`.

## Inventaire de départ

La feuille de route contient exactement 509 cases numérotées : 371 tâches
actives (`TXW`, `CRO` et `D1`) et 138 tâches différées conservées dans la
section d’attente. Une case non numérotée ou une ligne de résumé ne compte pas
comme tâche. Le fichier `docs/validation/2026-11-07-txw-baseline-inventory.md`
documente le dépôt, la branche, le point de retour et la frontière de la démo.

Les sources historiques réconciliées sont :

- `docs/superpowers/plans/2026-11-04-wood-tealerlab-roadmap.md` ;
- `docs/superpowers/plans/2026-11-05-wood-tealerlab-visual-rebuild-roadmap.md` ;
- `docs/validation/2026-11-06-109-task-status.md` ;
- `docs/superpowers/plans/2026-11-06-wood-attente-identifiants-validations.md` ;
- `docs/design/wood-main-task-matrix.md` ;
- les tests exécutés par `npm test`, `npm run check:js`, `npm run audit`,
  `npm run readiness` et `npm run continuity`.

## Déjà livré localement

Les groupes suivants disposent d’un contrat, d’un test ou d’un artefact local
identifiable :

| Groupe | Preuve principale | Limite conservée |
|---|---|---|
| Frontière démo | `docs/validation/2026-11-07-demo-boundary.md`, `test/demo-order-isolation.test.mjs` | Aucun paiement, compte, e-mail ou commande réelle n’est activé |
| Identité | `docs/design/wood-direction-register.md`, `docs/design/wood-visual-direction-v2.md`, `test/wood-identity-contract.test.mjs` | Validation artistique propriétaire encore séparée |
| Photos et cloche | `docs/design/wood-photo-brief.md`, `docs/design/wood-product-photo-contract.md`, `test/wood-photo-brief-contract.test.mjs` | Les photos réelles et leurs droits ne sont pas fournis |
| Graffiti | `docs/design/wood-graffiti-pack.md`, `assets/graffiti/`, `test/wood-graffiti-pack.test.mjs` | Choix final de la propriétaire non présumé |
| Accueil et mobile | `test/home-editorial-sequences.test.mjs`, `test/mobile-finish-contract.test.mjs`, captures `output/playwright/` | Safari iOS et appareils physiques restent à vérifier |
| Catalogue | `wood-catalog-search.js`, `wood-compare.js`, `test/wood-catalog-search.test.mjs`, `test/wood-compare.test.mjs` | Les caractéristiques non sourcées restent filtrables uniquement si présentes |
| Fiches | `product-detail.js`, `flower-detail.js`, `test/product-detail.test.mjs`, `test/rich-product-presentation.test.mjs` | Les médias et données commerciales réels restent en attente |
| Publication | `scripts/verify-github-pages-live.mjs`, `docs/validation/2026-11-07-github-pages-live-verification.md` | Les services commerciaux externes restent désactivés |

La passe média a aussi validé `TXW-095`, `TXW-096`, `TXW-097`, `TXW-100`,
`TXW-101` et `TXW-102` : le budget public compte 52 références image résolues,
0 référence manquante et 0 PNG encore référencé ; les contrats dimensions,
fallbacks, rails et reduced-motion complètent ce contrôle statique. Les mesures
Lighthouse, appareils physiques, réseau réel et INP restent séparés.

La passe du 7 novembre a validé 90 cases locales supplémentaires après
vérification ciblée : `TXW-002`, l’identité `TXW-011…019`, les séquences
`TXW-021…041`, le registre média `TXW-043`, les contrats photo/catalogue
`TXW-047…064`, le shell/navigation `TXW-073…082`, la passe accessibilité
`TXW-089…093`, la voix et conformité démo `TXW-105`, `TXW-107`, `TXW-108`,
les tests d’identité/sécurité `TXW-114…115`, ainsi que les tickets CRO
correspondants de recherche, filtres, comparateur, médias, boutiques,
simulation locale, conformité de contenu, vrai logo et reduced-motion.

## Statuts à ne pas confondre

- `DONE` signifie que le livrable local et sa vérification sont présents.
- `PARTIAL` signifie que la structure est préparée mais qu’une vérification
  locale ou un artefact manque encore.
- `BLOCKED-EXTERNAL` signifie qu’une photo, un droit, un compte, un appareil,
  un avis source ou une validation humaine est nécessaire.
- Une tâche propriétaire ne devient jamais `DONE` par la seule présence d’un
  placeholder.

Le pourcentage affiché au fil de l’exécution compte uniquement les cases
`[x]` effectivement vérifiées dans le fichier de route, sur le dénominateur
fixe de 509. Les tâches différées restent comptées dans ce dénominateur et ne
sont pas déclarées terminées par défaut.
