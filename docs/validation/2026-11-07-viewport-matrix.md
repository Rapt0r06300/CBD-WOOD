# Matrice viewport — 7 novembre 2026

## Périmètre validé

La démo locale a été parcourue avec le navigateur automatisé sur les six routes
publiques suivantes :

- `index.html`
- `fleurs.html`
- `resines.html`
- `bien-etre.html`
- `wood-shop.html`
- `contact.html`

Les largeurs portrait testées sont `320`, `360`, `375`, `390`, `430`, `768`,
`1024` et `1440` px. Les orientations paysage testées sont `844 × 390` et
`1440 × 700` px. Le jeu inclut donc une petite hauteur mobile et une petite
hauteur desktop.

## Résultat

**60 / 60 combinaisons validées.**

Pour chaque combinaison, le contrôle a vérifié :

- `document.documentElement.scrollWidth === innerWidth` : aucun débordement de
  la racine ;
- présence de l'en-tête ;
- présence d'un contenu de page non vide et parcourable ;
- hauteur de document positive, y compris lorsque le contenu dépasse le premier
  écran.

Le panneau panier fermé est un overlay fixe hors flux. Sa largeur n'est pas
prise comme un débordement de page : le contrôle porte sur la largeur racine du
document, pas sur la boîte technique de cet overlay.

## Limites honnêtes

Cette vérification couvre le rendu local Chromium à des tailles CSS précises.
Elle ne remplace pas la validation sur Safari iOS réel, Chromium Android réel,
les barres système, l'encoche ou le clavier virtuel ; ces points restent dans
TXW-084 et TXW-085.

Contrat : `test/viewport-matrix.test.mjs`.
