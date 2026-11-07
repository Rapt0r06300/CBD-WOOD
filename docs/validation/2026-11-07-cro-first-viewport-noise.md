# Validation — bruit visuel du premier viewport — 7 novembre 2026

## Mesure locale Chromium

Le contrôle mesure les éléments réellement dans la fenêtre, sans compter les
sections plus basses qui restent hors écran :

| Viewport | Images | Graffitis visibles | Annotations/badges | CTA visibles | Largeur document |
|---|---:|---:|---:|---:|---:|
| `390×844` | 2 | 2 | 0 | 2 | 390 |
| `1440×900` | 4 | 5 | 2 | 2 actions hero | 1440 |

À 390 px, le message WOOD et les deux intentions `Découvrir WOOD` / `Nous
trouver` restent la lecture principale ; les graffitis de scène entrent plus
bas et ne recouvrent ni prix, ni formulaire, ni action. À 1440 px, les cinq
accents restent ancrés au hero et les deux annotations restent secondaires.

La décision est de ne pas supprimer les graffitis : ils portent l'identité
chill / graffiti demandée par la propriétaire. Leur densité est contenue par
le premier viewport mobile, leurs positions ancrées et le fallback sans décor.
Toute nouvelle décoration doit passer par la même mesure avant intégration.

Contrôles complémentaires : `test/cro-first-viewport.test.mjs`,
`test/cro-first-viewport-noise.test.mjs` et revue mobile/desktop du hero.
