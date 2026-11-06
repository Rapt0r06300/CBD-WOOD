# Contrat éditorial de l'accueil WOOD

Statut : contrat local versionné. Il organise un rythme de lecture riche et calme ; il ne constitue ni une copie de TealerLab, ni une validation propriétaire de chaque accroche ou photographie.

## Périmètre et sources

Le périmètre couvre le ticker, les quatre univers, la sélection d'accueil, le bloc histoire, les valeurs, les deux boutiques, la FAQ et le footer de `index.html`. La source de structure est `docs/design/wood-home-storyboard.md`, la direction et les contraintes viennent de `docs/design/wood-direction-register.md`, et les formulations sensibles suivent `docs/design/wood-microcopy.md`.

Les contenus éditoriaux WOOD doivent rester vérifiables, versionnés et séparés des données de produits, de stocks, de prix, de livraison, de paiement et de légal. Une phrase inspirée d'un rythme de campagne ne doit pas importer un slogan, une image, un personnage, un placement ou une preuve sociale d'une autre marque.

## Séquence éditoriale

L'accueil suit la séquence :

`identité → information → découverte → sélection éventuelle → respiration visuelle → aide → contact`.

Dans l'ordre du DOM, le ticker informe, les univers orientent, l'histoire explique WOOD, les valeurs donnent du contexte, la sélection démo reste distincte, les boutiques donnent les coordonnées, la FAQ répond aux questions et le footer termine par les liens utiles. Ce rythme alterne impact, sélection et calme ; il ne transforme pas la page en mur de cartes ni en tunnel promotionnel.

Chaque bloc possède une raison de lecture et un repli. Une section peut être masquée si son contenu réel manque sans supprimer les routes publiques, créer un rail horizontal ou déplacer une information critique. Les appels à l'action restent explicites et rejoignent une destination publique testée.

## Contenu, repli et confiance

Les adresses Barla et Borriglione, les téléphones, les horaires à confirmer, les univers, les mentions de démonstration et les limites du paiement sont écrits littéralement. Une phrase ne promet pas une promotion, un effet, un avis, un délai, un stock, un retrait ou un paiement Viva non validé.

La FAQ utilise des `details/summary` accessibles et conserve les réponses dans le DOM. Le ticker est informatif et non promotionnel. Les blocs de valeur peuvent être réécrits après revue de la propriétaire sans changer la géométrie d'achat. Les photos et illustrations restent remplaçables, avec un statut `demo` ou `approved`, une origine et un texte alternatif.

## Responsive, interaction et accessibilité

- Ordinateur : alternance de grandes zones et de grilles bornées, avec deux boutiques séparées et des rails communs.
- Tablette : les blocs passent en colonnes adaptées sans compresser les adresses, la FAQ ou les CTA.
- Mobile : les sections s'empilent, les cartes restent tactiles, les textes longs se replient par `overflow-wrap` et le body ne devient jamais un rail horizontal.
- Interaction : les liens et accordéons fonctionnent au clavier et au toucher ; aucun effet ne capture le scroll ou ne porte seul une information.

Les titres respectent la sémantique, les liens ont des noms explicites et les images décoratives ne remplacent pas le texte. Les contrastes et les états restent compréhensibles sans couleur seule. Les transitions se limitent aux propriétés composées déjà autorisées ; `prefers-reduced-motion: reduce` conserve le contenu et supprime les mouvements.

## Preuve et rollback

La preuve locale est constituée par `test/editorial-contract.test.mjs`, `test/homepage-shell.test.mjs`, `test/design-foundation.test.mjs`, `test/location-contact.test.mjs`, les suites responsive/accessibilité et la référence storyboard. Elle vérifie l'ordre éditorial, les deux boutiques, la FAQ, les garde-fous de contenu et le repli mobile.

La revue par la propriétaire et son conjoint reste nécessaire pour les accroches, les photos et l'intensité finale. Les navigateurs et appareils réels restent une validation séparée, non déduite des tests Node ou de Chromium local.

Pour revenir en arrière, restaurer `index.html`, `responsive.css`, les styles et la bibliothèque de micro-copy vers la version validée, puis rejouer `npm run check`. Le rollback ne touche ni les comptes, ni les produits, ni les stocks, ni les commandes, ni les secrets, ni les migrations.
