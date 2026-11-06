# Contrat des grilles WOOD

Statut : contrat local versionné. La grille présente les produits avec un rythme WOOD stable, sans écraser les données, les actions d'achat ou les libellés lorsque la largeur diminue.

## Périmètre et source de vérité

Le contrat couvre les grilles catalogue des boutiques fleurs, résines, bien-être et WOOD Shop, les cartes produit, leurs médias, leurs états de disponibilité et leurs actions, ainsi que la grille des références associées sur les fiches. Les HTML publics restent la source de vérité des routes et des contenus ; `boutique.css` porte la grille commune, `mobile.css` ses adaptations étroites et `responsive.css` les garde-fous de largeur.

Les quatre boutiques utilisent `.product-grid` et conservent le même ordre de lecture, même lorsque le catalogue est réhydraté après Supabase. Une donnée absente, une image en attente ou un CTA indisponible ne retire pas la carte du flux et ne crée pas une colonne fantôme.

## Rythme desktop, tablette et mobile

- Desktop et tablette large : trois cartes équilibrées par ligne avec `minmax(0, 1fr)`, espacement constant et hauteur de carte stabilisée par une grille interne.
- Mobile courant : deux colonnes lisibles ; quatre références forment un rythme 2×2 sans débordement, tandis qu'un catalogue plus long continue naturellement sur les lignes suivantes.
- Téléphone étroit : une colonne à partir de 350px pour préserver le titre, le prix, le statut et l'action.
- Les références associées suivent le même principe 3 → 2 → 1, sans introduire une nouvelle densité ou un scroll horizontal obligatoire.

La carte est une colonne flex : le corps occupe l'espace disponible, les textes longs restent contenus, les médias gardent une hauteur adaptée et la zone de statut/action reste au même niveau visuel. La boutique WOOD, dont les métadonnées diffèrent des fleurs, empile son statut et son bouton à 500px ou moins.

## États de données et repli

Le chargement peut afficher un squelette ou une carte structurée, l'état vide explique l'absence de référence, et l'erreur conserve un message local et une route directe. Une image manquante reçoit le fallback WOOD ; un prix, un stock ou une disponibilité inconnus restent explicites et ne deviennent pas achetables.

La grille ne dépend ni d'un hover, ni d'une animation, ni d'une mesure JavaScript pour s'aligner. Les cartes créées après le rendu initial réutilisent les mêmes classes, les mêmes contrôles et les mêmes garde-fous. Toute opération de retrait ou de réduction de densité doit pouvoir être annulée sans changer les données métier.

## Accessibilité et performance

Les titres, alt text, niveaux WOOD, prix, poids, disponibilité et CTA conservent un ordre de lecture logique au clavier et pour les lecteurs d'écran. Les contrôles tactiles restent atteignables, les libellés ne sont pas supprimés par un ellipsis critique et aucune information commerciale ne dépend de la couleur seule.

Les styles évitent les largeurs fixes qui débordent, utilisent `minmax(0, 1fr)`, `overflow-wrap` pour les valeurs extrêmes et masquent le débordement horizontal global sans masquer une action. Le contrat reste compatible avec les safe areas et les replis reduced-motion ; la performance préfère une grille CSS statique aux recalculs de layout pilotés par script.

## Preuve, revue et rollback

La preuve locale est `test/wood-grid-contract.test.mjs`, complétée par `test/catalog-grid.test.mjs`, `test/responsive-layout.test.mjs`, les contrats de cartes et la matrice responsive Playwright. Elle vérifie les quatre boutiques, le rythme 3/2/1, les cartes flex, les actions WOOD Shop, les références associées et l'absence de débordement structurel.

La propriétaire et son conjoint valident séparément la densité visuelle, la lisibilité des noms et la priorité des actions ; la validation sur navigateurs et appareils réels reste externe. Pour revenir en arrière, restaurer le snapshot validé de `boutique.css`, `mobile.css`, `responsive.css` et des quatre templates boutique, puis rejouer `npm run check`. Le rollback ne modifie ni catalogue, ni panier, ni commande.
