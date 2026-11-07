# WOOD — inventaire de fondation TXW

Date : 7 novembre 2026
Scope : nouvelle feuille de route 509 tâches, démonstration locale uniquement.

## TXW-001 — état Git et publication

- Branche de travail : `codex/wood-tealerlab-visual-rebuild`.
- `main` observé : `26fca0026dd602e009ccd777b66bafc489fd9fff`.
- `gh-pages` observé : `feefacab8e2fb839ed9286d567dd6e69459530ff`.
- Référence de retour avant cette passe : `f126f621986306e57e1e4532dc0a8a8db0311474`.
- Procédure locale : tests → `npm run prepare:hostinger` → `node scripts/prepare-github-pages.mjs` → contrôle des arbres `base/` et `demo/`.

## TXW-003 — point de retour

Le commit `f126f62` reste la référence de retour de la passe avant les évolutions conseiller/badges/D1. Les commits ultérieurs sont ciblés et réversibles ; aucun reset ou écrasement de branche n'a été exécuté. Le dossier utilisateur `.headless-public-runway-final/` reste non suivi et intact.

## TXW-004 — routes de démonstration

Les routes et ancres sont inventoriées dans `docs/ops/public-routes.md` et vérifiées par `test/links.test.mjs`, `test/site-readiness.test.mjs` et la préparation GitHub Pages. Le paquet généré contient la version base et la version `/demo/`.

## TXW-005 / TXW-010 — frontière démo

`docs/validation/2026-11-07-demo-boundary.md` décrit les imports, l'ordre des garde-fous, les chemins Supabase/D1, les interdits commandes/paiements/comptes/e-mails et les tests négatifs. La démo reste locale et ne demande ni secret ni validation commerciale.

## TXW-113 / TXW-116 — recette de build

- `npm run check` : 383 tests, syntaxe JavaScript OK (177 fichiers), audit statique OK, readiness OK, continuité OK.
- `npm run prepare:github-pages` : paquet Hostinger 113 fichiers, arbres GitHub Pages base et demo présents.
- Aucun dossier utilisateur non suivi n'a été ajouté au commit.

## Statuts

- TXW-001 : `DONE`
- TXW-003 : `DONE`
- TXW-004 : `DONE`
- TXW-005 : `DONE`
- TXW-010 : `DONE`
- TXW-113 : `DONE`
- TXW-116 : `DONE`
- TXW-002 reste `PARTIAL` : les plans historiques absents de ce checkout ne sont pas recréés.
