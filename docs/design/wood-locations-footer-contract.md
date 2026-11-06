# Contrat boutiques et footer WOOD

Statut : contrat local versionné. Les coordonnées affichées sont des informations à relire par la propriétaire avant publication commerciale ; le contrat évite surtout les associations incorrectes ou les formulations inventées.

## Périmètre et source

Le périmètre couvre les blocs `#boutique`, les cartes Barla et Borriglione, les téléphones, les adresses, les horaires à confirmer, les liens de contact et le footer partagé des pages publiques. `index.html` porte les informations d'accueil, les templates portent les liens locaux, `mobile-shell.js` normalise le footer lors du repli mobile, et `boutique.css` porte la grille, les détails et les zones tactiles.

## Données et associations

Les associations canoniques sont :

| Boutique | Téléphone | Adresse |
| --- | --- | --- |
| Barla | `04 22 16 35 70` | `7 rue Barla, 06300 Nice` |
| Borriglione | `04 23 13 03 05` | `16 avenue Alfred Borriglione, 06100 Nice` |

Chaque numéro reste dans son propre lien `tel:` et chaque adresse reste lisible à côté de la boutique correspondante. Les titres `BARLA` et `BORRIGLIONE` ne reçoivent pas de point final. Les horaires sont présentés comme habituels ou à confirmer tant que la propriétaire ne les a pas validés. Aucun lieu, numéro ou avis n'est généré à partir d'une adresse supposée.

Le footer répète les contacts sans les mélanger, conserve le lien e-mail et propose les routes publiques utiles. Un changement d'adresse ou de téléphone doit être effectué dans la source contrôlée puis répercuté dans le shell et les tests ; il ne doit pas être corrigé par une chaîne opportuniste dans une seule vue.

## Responsive, interaction et fallback

- Ordinateur : les deux boutiques restent côte à côte avec une hiérarchie claire entre nom, adresse, horaires et actions.
- Tablette : la grille passe en une colonne sans fusionner les deux lieux ni perdre les liens téléphone.
- Mobile : les cartes et le footer se replient en sections lisibles ; les détails `summary` restent ouvrables au doigt et au clavier.
- Fallback : si le script mobile ne se charge pas, le HTML garde les coordonnées et les liens ; si un visuel de carte manque, le texte reste complet.

Les liens `tel:`, `mailto:` et itinéraire éventuel sont nommés explicitement. Les adresses ne dépendent pas d'une image, d'une carte distante, d'un hover ou d'une animation. Les safe areas et le padding bas de la navigation mobile ne doivent pas recouvrir les coordonnées.

## Accessibilité et limites commerciales

Les titres et listes de définition restent sémantiques, le contraste est maintenu sans couleur seule et les textes longs peuvent se replier. Les transitions du footer et des cartes sont supprimées sous `prefers-reduced-motion: reduce`. Les informations de livraison, frais, horaires et paiement restent séparées des coordonnées et portent leurs propres réserves ; aucune disponibilité de retrait, promotion ou paiement Viva n'est déduite d'une adresse.

La propriétaire et son conjoint doivent relire les coordonnées, les horaires et la présentation finale. Les tests sur navigateurs et appareils réels restent une validation séparée.

## Preuve et rollback

La preuve locale est constituée par `test/locations-footer-contract.test.mjs`, `test/location-contact.test.mjs`, les suites mobile/responsive/accessibilité et la vérification de l'accueil. Elle vérifie les deux titres, les deux `tel:`, les deux adresses, l'absence de point final et le repli footer.

Pour revenir en arrière, restaurer les coordonnées dans `index.html`, les templates de footer, `mobile-shell.js` et `boutique.css` vers le snapshot validé, puis rejouer `npm run check`. Le rollback ne modifie ni comptes, ni produits, ni stocks, ni commandes, ni secrets, ni migrations.
