# Validation — bibliothèque visuelle WOOD — 7 novembre 2026

## Lot vérifié

- `CRO-130` : mur de quatre stickers WOOD originaux, décoratifs, masquables et
  lisibles au clavier/toucher ;
- `CRO-131` : quatre matières numériques légères (verre, bois, papier, encre)
  utilisées comme surfaces décoratives, jamais derrière une information
  critique ;
- `CRO-132` : campagne `studio-wood` identifiée séparément et désactivable par
  `?wood-campaign=off`, sans promo, prix, stock ni collecte ;
- `CRO-133` : bloc réservé aux vrais mots de la propriétaire, explicitement en
  attente de validation et sans citation inventée.

## Preuves

- `node --test test/cro-visual-library.test.mjs` : **3/3** ;
- 390 × 844 : quatre stickers, quatre matières, état propriétaire `pending`,
  largeur document 390 px ;
- `?wood-campaign=off` : campagne masquée, mur conservé, largeur 390 px ;
- capture desktop : [mur WOOD 1440](cro-visual-library/sticker-wall-desktop.png) ;
- capture mobile : [mur WOOD 390](cro-visual-library/sticker-wall-mobile.png) ;
- revue centrée mobile : [bloc propriétaire dégagé](cro-visual-library/owner-note-mobile-centered.png).

Le dossier reste une extension de la démo ; les assets et formulations sont
remplaçables après validation de la propriétaire.
