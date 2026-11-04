# Interface WOOD adaptative, app-like sans application native

## Intention produit

Le site GitHub Pages reste le même site WOOD : mêmes pages, textes, couleurs,
logo et logique boutique. Sur téléphone, l’interface doit toutefois se comporter
comme une application mobile simple et confortable, sans demander au visiteur
d’installer une application.

## Décision

Conserver le HTML, les scripts métier et la logique Supabase existants. Ajouter
une feuille `mobile.css` chargée après les feuilles actuelles et un petit
`mobile-shell.js` sans dépendance. Cette couche ne remplace aucun contenu : elle
ajuste uniquement la présentation et ajoute une navigation mobile complémentaire.

La détection ne repose pas sur le nom du téléphone ou un user-agent. Le rendu
utilise les caractéristiques réelles disponibles au navigateur : largeur du
viewport, largeur disponible, précision du pointeur, orientation, hauteur
disponible et safe areas iOS/Android. Ainsi, un téléphone pliable, une tablette,
un ordinateur tactile et un écran redimensionné restent cohérents.

## Règles d’interface

- Ordinateur : conserver le rendu desktop actuel.
- Tablette : conserver les grilles et la hiérarchie WOOD, avec des espacements
  intermédiaires et une navigation compacte si la largeur ne permet plus les
  liens complets.
- Téléphone : utiliser une barre supérieure compacte, des contrôles tactiles
  d’au moins 48 CSS px, une barre de navigation basse fixe, les safe areas et
  des panneaux faciles à parcourir au pouce.
- Produits : conserver la grille boutique à trois produits par ligne demandée
  pour les pages catalogue ; les cartes doivent rester contenues dans leur
  colonne, sans débordement horizontal ni texte coupé.
- Touch : ne pas appliquer d’effet de survol qui fait sauter une fiche ; garder
  les animations uniquement lorsqu’elles sont utiles et les désactiver pour les
  personnes qui demandent une réduction des mouvements.
- Accessibilité : préserver le zoom, l’ordre HTML, les liens clavier, les labels
  ARIA et le contenu textuel.

## Hors périmètre

Pas de modification de Supabase, des comptes, des commandes, des prix ou des
stocks dans cette évolution. Pas de déploiement et pas de migration d’hébergeur.
