# Premier viewport mobile — 7 novembre 2026

Le hero WOOD doit présenter la marque, la promesse, le graffiti de signature
et une action sans obliger la personne à deviner quoi faire. Le format compact
était le plus exigeant : le mot `AUTRE-` pouvait se casser avant les CTA.

Le correctif `responsive.css` sous 360 px :

- réduit les marges verticales du hero sans réduire la hiérarchie WOOD ;
- conserve `AUTRE-` sur une ligne pour éviter un tiret isolé ;
- garde le sous-titre lisible à 15 px ;
- laisse les deux CTA dans le flux, avec le premier immédiatement après la
  promesse ;
- ne modifie ni la palette, ni le logo, ni la composition des largeurs 375 à
  430 px.

Captures Playwright locales conservées :

- `output/playwright/demo-home-local-320.png`
- `output/playwright/demo-home-local-360.png`
- `output/playwright/demo-home-local-375.png`
- `output/playwright/demo-home-local-390.png`
- `output/playwright/demo-home-local-430.png`

Le contrôle confirme l'absence de débordement horizontal et la présence du
CTA « Découvrir WOOD » dans le premier viewport après le correctif. Un appareil
iOS/Android réel reste à confirmer avant publication commerciale.

Contrat : `test/mobile-first-viewport.test.mjs`.
