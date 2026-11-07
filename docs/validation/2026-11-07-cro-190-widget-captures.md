# CRO-190 — captures visuelles du conseiller

Quatre états de la démo ont été capturés avec Playwright local et répertoriés
dans `2026-11-07-cro-190-widget-capture-manifest.json` : bulle compacte sur
l’accueil desktop, panneau ouvert sur l’accueil, panneau ouvert après
défilement sur fiche produit desktop à 1440×900 et panneau ouvert sur fiche
produit à 390×844.

Les fichiers PNG restent des artefacts locaux dans `output/playwright/` afin
de ne pas alourdir le paquet public. Le manifeste garde les routes, viewports,
états et chemins reproductibles. La conformité à l’identité finale, aux vrais
visuels et aux créations de la propriétaire reste une validation humaine
distincte ; cette tâche prouve seulement le rendu et les états de la démo. La
validation propriétaire de l’identité finale reste à faire.

Preuve automatisée :

```text
node --test test/cro-190-widget-captures.test.mjs
```

Résultat : **2 tests réussis, 0 échec**.
