# Validation — recherche par caractéristiques sourcées — 7 novembre 2026

## Décision

Le catalogue de démonstration ne publie actuellement aucune caractéristique
d'arôme, de texture ou de type qui n'aurait pas une source WOOD explicite.
L'interface de recherche sait donc lire ces trois familles uniquement lorsque
les cartes portent les attributs `data-wood-characteristic-type`,
`data-wood-characteristic-texture` ou `data-wood-characteristic-aroma`.

Quand aucune carte ne porte un attribut, aucun filtre artificiel n'est ajouté :
la zone affiche simplement `Filtres de profil en attente de caractéristiques
WOOD sourcées.`. Les critères manquants restent non filtrables et ne sont pas
remplacés par des effets, des promesses ou des recommandations médicales.

## Preuves locales

- `wood-catalog-search.js` normalise les valeurs sourcées, les déduplique et
  applique les filtres seulement sur les cartes qui les exposent.
- `test/wood-catalog-search.test.mjs` vérifie les valeurs `type`, `texture` et
  `aroma`, le filtrage combinable et le repli vide.
- Les quatre catalogues restent partageables sans réseau : l'URL ne contient
  qu'une requête, un tri, un état média, un état de disponibilité ou une
  caractéristique effectivement exposée.

## Limites

La propriétaire doit fournir ou valider les métadonnées avant qu'une carte
réelle puisse afficher une valeur. Aucune caractéristique produit n'est
inventée pour faire fonctionner le filtre dans la démo.
