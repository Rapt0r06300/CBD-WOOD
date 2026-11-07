# CRO-135/136/137/145 — repères produit locaux

## Périmètre

La démonstration ajoute quatre aides de visite sans compte et sans appel réseau :

- aperçu rapide depuis une carte, dans un `dialog` accessible avec fermeture native, bouton de fermeture et restitution du focus ;
- favoris enregistrés uniquement dans `localStorage` ;
- fiches récemment consultées, limitées à huit et effaçables ;
- partage natif quand le navigateur le propose, sinon copie du lien dans le presse-papiers.

Les boutons ne se substituent ni au nom, ni au prix, ni à l'action panier. Les données locales ne quittent jamais le navigateur et aucune réservation n'est créée.

## Vérification

- `test/wood-product-actions.test.mjs` vérifie les clés locales, les noms accessibles, le partage sans serveur, les six pages concernées et les replis mobile/reduced-motion.
- `npm test`, `npm run check:js`, `npm run audit` et `npm run prepare:github-pages` restent les portes de validation du paquet.
- Le module est inclus dans `dist-hostinger`, puis uniquement dans le paquet `/demo/` lors de la préparation GitHub Pages ; la racine base provient de `origin/main`.
