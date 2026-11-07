# Comparaison performance et poids — 7 novembre 2026

## Avant / après

La comparaison oppose le point de référence `47360de` à l'état courant
`a0ce769`. Les octets concernent les fichiers publics HTML/CSS/JS suivis par
Git, hors documentation, tests, scripts et paquets générés.

| Mesure | Avant `47360de` | Après `a0ce769` | Écart |
|---|---:|---:|---:|
| Tests Node validés | 439 | 452 | +13 |
| Fichiers publics HTML/CSS/JS | 64 | 64 | 0 |
| HTML | 175 386 o | 175 430 o | +44 o |
| CSS | 175 280 o | 175 976 o | +696 o |
| JavaScript | 239 420 o | 241 163 o | +1 743 o |

La couverture de contrôle progresse sans multiplication du nombre de fichiers
publics. L'écart de poids correspond aux validations et améliorations ajoutées
depuis le point de référence ; il n'est pas présenté comme un gain de vitesse.

## Budget média et mesure UX

- `npm run media:budget` : **52 / 52 références résolues**, **0 manquante** et
  **0 PNG référencé publiquement** ;
- `npm run ux:measure` : cinq événements de fixture restent locaux, avec
  `sent=false`, `stored=false` et `purchase=false` ;
- captures Chromium locales : 24 vues documentées dans
  `2026-11-07-render-captures.md` ;
- `npm run check --silent` : 452 tests, JavaScript, audit statique, readiness et
  continuité au vert.

## Limites

Cette comparaison ne fournit pas de score Lighthouse, LCP/CLS/INP certifié,
ni de mesure sur Safari, Android, batterie faible ou réseau mobile réel. Les
seuils du budget performance restent des objectifs de recette ; aucun paiement
ou envoi d'e-mail réel n'a été activé pour mesurer ces chiffres.

Contrat : `test/performance-comparison.test.mjs`.
