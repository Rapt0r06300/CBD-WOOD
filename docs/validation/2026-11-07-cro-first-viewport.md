# CRO-009 — Compréhension du premier écran — 7 novembre 2026

## Contrôle local sans défilement

Le premier écran de la démo a été contrôlé en Chromium à 375×844, 390×844 et
1440×900. À chaque largeur, le nom WOOD, l'accroche `LE CBD AUTREMENT`, le
texte de différenciation et le média botanique sont présents. Les deux actions
ont des destinations distinctes : `Découvrir WOOD` vers les univers et `Nous
trouver` vers les boutiques.

Résultats mesurés :

- 375×844 : largeur document 375, bas des CTA à 828 px ;
- 390×844 : largeur document 390, bas des CTA à 828 px ;
- 1440×900 : largeur document 1440, hero et CTA présents sans débordement.

Les captures Chromium associées sont conservées dans `.playwright-cli` et le
contrôle structurel est verrouillé par `test/cro-first-viewport.test.mjs`.
Cette preuve mesure la compréhension fonctionnelle de l'écran, pas une étude
utilisateur statistique ; la relecture artistique WOOD reste séparée.

## Hiérarchie de valeur et destinations

Le hero porte une seule phrase de valeur : une autre vision du chanvre, une
sélection de caractère et de vrais conseils à Nice. `Découvrir WOOD` est le CTA
principal anis vers `#univers`; `Nous trouver` est le CTA secondaire bordé vers
`#boutique`. À 390 px, les deux gardent une hauteur tactile minimale de 48 px.
Ils ne présentent ni la même destination ni le même poids visuel.
